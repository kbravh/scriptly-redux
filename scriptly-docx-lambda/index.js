var AWS = require('aws-sdk');

const dayjs = require('dayjs')
require('dayjs/locale/es')

const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

AWS.config.update({
    region: 'us-east-1'
})
var s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

const CLOUDFRONT_DISTRO = process.env.CLOUDFRONT_DISTRO
const CLOUDFRONT_ID = process.env.CLOUDFRONT_ID
const CLOUDFRONT_PKEY = process.env.CLOUDFRONT_PKEY
const LINK_EXPIRY = parseInt(process.env.LINK_EXPIRY)

exports.handler = async (event) => {

    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(__dirname, `${event.template}.docx`), 'binary');

    var zip = new PizZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the day.js locale
    dayjs.locale(event.locale)

    //set the templateVariables
    doc.setData({
        firstName: event.firstName,
        lastName: event.lastName,
        fullName: event.fullName,
        patriarchName: event.patriarch,
        stakeName: event.stake,
        parentage: event.parentage,
        blessingFirstLetter: event.blessingFirstLetter,
        blessing: event.blessing,
        memberTitle: event.memberTitle,
        blessingDate: dayjs(event.blessingDate).format('LL')
    });

    try {
        doc.render()
        console.log("render was successful")
    } catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({
            error: e
        }));
        throw JSON.stringify({
            message: `Processing error! Document render was unsuccessful!`,
            error
        });
    }

    // buf is a nodejs buffer
    var buf = doc.getZip()
        .generate({
            type: 'nodebuffer'
        });
    console.log('buffer generated successfully')

    let time = new Date().getTime()

    let uploadPromise = s3.upload({
        Bucket: 'patriarchal-files',
        Key: `${event.firstName}${event.lastName}-${time}.docx`,
        Body: buf,
        ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }).promise();

    let response

    //Get private key
    let privatekey = await s3.getObject({
        Bucket: `patriarchal-assets`,
        Key: CLOUDFRONT_PKEY
    }).promise()

    privatekey = privatekey.Body.toString(`ascii`)

    var cfSigner = new AWS.CloudFront.Signer(CLOUDFRONT_ID, privatekey);

    await uploadPromise.then(data => {
        console.log("Success!", data);
        // Create Signed URL
        const url = `${CLOUDFRONT_DISTRO}/${data.Key}`
        const options = {
            url,
            // This has to be reduced from ms to sec
            expires: Math.round((Date.now() + LINK_EXPIRY * 60000)/1000)
        }

        response = {
            statusCode: 200,
            body: {
                Location: cfSigner.getSignedUrl(options),
                Key: data.Key
            }
        }
    }).catch(error => {
        console.log(error)
        throw JSON.stringify({
            message: `Processing error! Unable to upload document to bucket.`,
            error
        })
    })
    return response;
};