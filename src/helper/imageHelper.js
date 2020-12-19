export const getFileExtension = (filename) => {
  return filename.split(".").pop();
};

export const getFileName = (filename) => {
  return filename.split(".").shift();
};

// export const encodeBase64 = (file) => {
//   const actualImage = file[0];

//   let reader = new FileReader();
//   reader.readAsDataURL(actualImage);
//   reader.onload = function () {
//     console.log("reader.result : ", reader.result);
//     return reader.result;
//   };
//   reader.onerror = function (error) {
//     console.log("Error: ", error);
//   };
// };
