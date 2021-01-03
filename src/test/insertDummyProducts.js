const axios = require("axios");
const faker = require("faker");
const request = require("request-promise-native");

let imageUrl = "https://source.unsplash.com/640x320/?dish,burger";
let totalProducts = 10; // Make 10 dummies

for (let index = 0; index < totalProducts; index++) {
  request({
    url: imageUrl,
    method: "GET",
    encoding: null, // This is actually important, or the image string will be encoded to the default encoding
  }).then((result) => {
    let imageBuffer = Buffer.from(result);
    let imageBase64 = imageBuffer.toString("base64");
    let imageDataUrl = imageBase64;

    // console.log(imageDataUrl);

    const headers = {
      Authorization: "",
      Token: "",
      "Access-Control-Allow-Origin": "*",
    };

    let data = JSON.stringify({
      Product: [
        {
          name: faker.fake("{{commerce.productName}}"),
          id_category: 7,
          description: faker.fake("{{commerce.productDescription}}"),
          image: {
            name: faker.fake("{{random.uuid}}"),
            type: "jpg",
            image_blob: imageDataUrl,
          },
          stock: 200,
          price: Number(faker.fake("{{commerce.price}}")),
        },
      ],
    });

    // console.log(data);

    const config = {
      method: "post",
      url: "https://app-luariz-post.herokuapp.com/v1/insert_product",
      headers: {
        Authorization:
          "d5ef9bf84492f777e60ecd81d4bd1e227b20cf1336a0c49fb4cfc7717760d228418",
        Token:
          "eyJuYW1lIjzYtogImFkaXJzIiwgImVtYWlsIjogImFkaXJzQG1haWwuY29tIiwgInJvbGVfaWQiOiAxLCAic3RhdHVzIjogdHJ1ZSwgInBvc2l0aW9uIjogImFkbWluIiwgImV4cGlyZWRfc2Vzc2lvbiI6ICIyMDIwLzExLzA4IDE2OjM5OjA0In0=",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}
