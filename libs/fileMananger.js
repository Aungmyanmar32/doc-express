import { S3 } from "@aws-sdk/client-s3";
import { ListObjectsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3({
  endpoint: "https://sgp1.digitaloceanspaces.com/",
  region: "asia",
  credentials: {
    accessKeyId: "DO00BP7U9JNXC6LDEM3J",
    secretAccessKey: "N3vZ3itN4GBvEJtZsCR5yac5dwfSWNKQaRwYoWQF5P8",
  },
});

const bucketParams = { Bucket: "msquarefdc" };

export const run = async () => {
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
