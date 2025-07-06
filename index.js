import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import dotenv from 'dotenv';

dotenv.config();


const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRATE_ACCESS_KEY,
    }
});

async function putObject(key) {
    const command = new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: 'image/jpeg',
    });
    const url = await getSignedUrl(s3Client, command);

    console.log('url',url);
    return url;
};


async function init() {
    console.log("bucket URL ", await getObjectURL("images/pexels-hitesh-choudhry-1261427.jpeg"), await putObject('images/pexels-hitesh-choudhry-1261427.jpeg'));
}


init();