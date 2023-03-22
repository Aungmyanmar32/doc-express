const fileInput = document.getElementById("formFile");
const imgFileTag = document.querySelector(".imgFile")
const uploadBtn = document.querySelector(".uploadBtn")

const uploadFile = async () => {
//change button to loading
uploadBtn.innerHTML = `
<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
Uploading...
`


  const filesList = fileInput.files;
  const fileArray = [...filesList];
  console.log(fileArray);

  const formData = new FormData();

  fileArray.forEach((file) => formData.append("files", file));

  const response = await fetch("http://localhost:3000/cloudUpload", {
    method: "POST",
    body: formData,
  });

  //change bottuon to upload
  uploadBtn.innerHTML ="Upload"


  const data = await response.json();
  console.log(data);
  //{message: "file uploaded successful!",fileContents : [.......]}

  // filter Contents with folder-name
  const myFilesList = data.fileContents.filter(file => file.Key.includes("aung-myanmar"))
  console.log(myFilesList);

  //Show all img in filtered array (myFilesList)

  for (let i = 0; i < myFilesList.length; i++) {
    const imgSrc = encodeURIComponent(myFilesList[i].Key)
    const fileDiv = document.createElement("div")
    fileDiv.innerHTML =`
    <img src="https://msquarefdc.sgp1.digitaloceanspaces.com/${imgSrc}" width="200px" class="p-2"/>
    `
    imgFileTag.append(fileDiv)
  }
};
