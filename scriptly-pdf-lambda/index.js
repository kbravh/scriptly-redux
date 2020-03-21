const AWS = require('aws-sdk')
const log = require('lambda-log')
const fs = require('fs')
const {
  convertTo
} = require('@shelf/aws-lambda-libreoffice')
const s3 = new AWS.S3()

var srcBucket = process.env.S3_BUCKET_INPUT;
var dstBucket = process.env.S3_BUCKET_OUTPUT;
const CLOUDFRONT_DISTRO = process.env.CLOUDFRONT_DISTRO
const CLOUDFRONT_ID = process.env.CLOUDFRONT_ID
const CLOUDFRONT_PKEY = process.env.CLOUDFRONT_PKEY.replace(/\\n/gm, '\n')
const LINK_EXPIRY = parseInt(process.env.LINK_EXPIRY)

var cfSigner = new AWS.CloudFront.Signer(CLOUDFRONT_ID, CLOUDFRONT_PKEY);

exports.handler = async (event) => {

  //destructure the srcKey out of the incoming request
  const {
    srcKey
  } = event;
  log.info(`Data from the event: ${event.bucket}:${event.srcKey}`)

  if (!/.*docx$/.test(srcKey)) {
    throw JSON.stringify({
      message: `Invalid document type provided`
    })
  }
  //the destination file will have the same name with pdf extension
  const dstKey = srcKey.replace(/docx?/, 'pdf');

  // Output input URL for ease of inspection
  log.info("https://s3.console.aws.amazon.com/s3/object/" + srcBucket + "/" + srcKey);

  let response;
  try {
    // get the docx
    let data = await s3.getObject({
      Bucket: srcBucket,
      Key: srcKey
    }).promise();

    // save the docx to file
    fs.writeFileSync('/tmp/document.docx', data.Body)
    log.info('Document saved to /tmp/document.docx')

    // convert the docx
    let pdfPath = await convertTo('document.docx', 'pdf')
    log.info(`PDF path is ${pdfPath}`)

    // read in pdf file
    let pdf = fs.readFileSync(pdfPath)

    // upload the result to s3
    log.debug("uploading to s3 " + dstBucket);
    let uploadPromise = s3.upload({
      ACL: 'public-read',
      Bucket: dstBucket,
      Key: dstKey,
      Body: Buffer.from(pdf),
      ContentType: 'application/pdf'
    }).promise();

    await uploadPromise.then(data => {
      log.info('RESULT: Success ' + dstKey);
      // Create Signed URL
      const url = `${CLOUDFRONT_DISTRO}/${data.Key}`
      const options = {
        url,
        expires: Date.now() + LINK_EXPIRY * 60000
      }
      response = {
        body: {
          Location: cfSigner.getSignedUrl(options)
        }
      }
    })
  } catch (error) {
    log.error(error)
    throw JSON.stringify({
      message: `Unknown error has occurred`,
      error
    })
  }

  // Return a result
  return response;
}