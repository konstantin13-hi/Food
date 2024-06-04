import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
    try {
        const data = await req.formData();

        if (!data.has('file')) {
            return new Response('No file provided', { status: 400 });
        }

        const file = data.get('file');

        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });

        const ext = file.name.split('.').pop();
        const newFileName = `${uniqid()}.${ext}`;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const bucket = 'food-kanstantsin';
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: newFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: buffer,
        });

      const dAATA =  await s3Client.send(command);


        const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
        return new Response(JSON.stringify({ link }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } catch (error) {
        console.error('Error uploading file:', error);
        return new Response('Error uploading file', { status: 500 });
    }
}
