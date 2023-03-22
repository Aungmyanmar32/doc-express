import express from "express";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import {run} from "./libs/fileMananger.js"


const app = express();
const port = 3000;

app.use(express.static("public"));


// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});




const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "aung-myanmar/" + file.originalname);
    },
  }),
}).array("files", 1);

app.post("/cloudUpload", (request, response, next)=> {
  upload(request, response, async(error)=> {
    if (error) {
      console.log(error);
      return response.send({ message: "file upload error" });
    }
    console.log("File uploaded successfully.");
    const contentData  = await run();
    console.log(contentData);
   const fileContents = contentData.Contents
    response.send({ message: "file upload successful", fileContents});
  });
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // 177343724-dog.jpg
//   },
// });

// const upload = multer({ storage });

// app.post("/upload", (req, res) => {
//   const fileStream = fs.createWriteStream(`image.jpg`);
//   req.pipe(fileStream);
//   res.send({ message: "Upload successful" });
// });

// app.post("/upload-multiple", upload.array("files"), (req, res) => {
//   res.send({ message: "files upload ok !" });
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
