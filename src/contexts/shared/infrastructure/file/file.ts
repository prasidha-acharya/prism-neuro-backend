import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Configuration, s3Client } from 'config';

export class FileUpload {
  constructor(private config: Configuration) {}

  async invoke(file: Express.Multer.File): Promise<string> {
    const randomText = ((length: number): string => {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    })(20);

    const fileExtension = file.originalname.split('.').pop();

    const fileName = `${randomText}-${Date.now()}.${fileExtension}`;

    const key = `profile/${fileName}`;

    const bucket = this.config.AWS.BUCKET_NAME;

    const uploadParams: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key, // Set the key of the image file
      Body: file.buffer,
      ACL: 'private' // Set ACL permissions for the uploaded file to private
    };

    // Upload the file to S3
    await s3Client.send(new PutObjectCommand(uploadParams));

    const commandParams = {
      Bucket: bucket,
      Key: key,
      Expires: 3600 // URL expires in 1 hour (adjust as needed)
    };
    return getSignedUrl(s3Client, new GetObjectCommand(commandParams), { expiresIn: 3600 });
  }
}
