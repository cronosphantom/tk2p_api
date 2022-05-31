import { Endpoint, S3 } from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";
import fs from "fs";


export const LinodeS3Upload = (base64File: string, fileName: string): Promise<string> => {

  return new Promise<string>(async (res, rej) => {
     

    let linodeEndpoint : any = process.env.LINODE_ENDPOINT;
    let linodeAccessKey : any = process.env.LINODE_ACCESS_KEY;
    let linodeSecretKey : any = process.env.LINODE_SECRET_KEY;
    let bucketRegion : any = process.env.LINODE_BUCKET_REGION;

    if (base64File == '') rej('failed');
   // fs.writeFileSync(fileName, base64File, 'base64');
   // const fileReadStream = fs.createReadStream(fileName)

    const endPoint = new Endpoint(linodeEndpoint);

    const s3 = new S3({
      endpoint: endPoint,
      accessKeyId: linodeAccessKey,
      secretAccessKey: linodeSecretKey,
      region: bucketRegion
    })
    let buff = Buffer.from(base64File, 'base64');
    const params = {
      Bucket: 'mobile-assets',
      Key: fileName, // File name you want to save as in S3
      ACL: 'public-read',
      ContentType: 'image/jpg',
      ContentEncoding: "base64",
      Body: buff
    };
    try {
      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      
       // fs.unlinkSync(fileName);
  
        if (err) {
          console.log('Error ===>', err);
          rej('error');
          // throw err;
        }
  
        console.log('data ===>', data);
        res(data.Location);
      })
    } catch (e) {
      rej('error');
    }

  })
}

export const LinodeS3Delete = (objName: string): Promise<string> => {

  return new Promise<string>(async (res, rej) => {
    let linodeEndpoint : any = process.env.LINODE_ENDPOINT;
    let linodeAccessKey : any = process.env.LINODE_ACCESS_KEY;
    let linodeSecretKey : any = process.env.LINODE_SECRET_KEY;
    let bucketRegion : any = process.env.LINODE_BUCKET_REGION;

    const endPoint = new Endpoint(linodeEndpoint);

    const s3 = new S3({
      endpoint: endPoint,
      accessKeyId: linodeAccessKey,
      secretAccessKey: linodeSecretKey,
      region: bucketRegion
    })

    const params = {
      Bucket: 'entwine-photos',
      Key: objName
    };

    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('Error ===>', err);
        rej('error');
      }

      console.log('data ===>', data);
      res('success');
    })
  })
}