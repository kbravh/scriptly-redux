# Docx creation function

## Description
This function takes an incoming data packet from the frontend application and fills a .docx template with the relevant information. It uploads the document to an S3 bucket and returns a link to the file.

## Usage


## Environment Variables
| Variable Name     	| Value                                                	|
|-------------------	|------------------------------------------------------	|
| CLOUDFRONT_DISTRO 	| cloudfront distro for document downloads             	|
| CLOUDFRONT_ID     	| cloudfront ID                                        	|
| CLOUDFRONT_PKEY   	| name of private key file in S3 bucket for cloudfront 	|
| LINK_EXPIRY       	| minutes until link expires                           	|