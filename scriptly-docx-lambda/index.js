var AWS = require('aws-sdk');
const dayjs = require('dayjs')
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

const CLOUDFRONT = process.env.CLOUDFRONT

exports.handler = async (event) => {

    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(__dirname, `${event.template}.docx`), 'binary');

    var zip = new PizZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

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
        ACL: 'public-read',
        Bucket: 'patriarchal-files',
        Key: `${event.firstName}${event.lastName}-${time}.docx`,
        Body: buf,
        ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }).promise();

    let response

    await uploadPromise.then(data => {
        console.log("Success!", data);
        response = {
            statusCode: 200,
            body: {
                Location:CLOUDFRONT + '/' + data.Key,
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
