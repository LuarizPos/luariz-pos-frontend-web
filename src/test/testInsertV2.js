const axios = require("axios");
const faker = require("faker");
const request = require("request-promise-native");

const generator = "https://www.themealdb.com/api/json/v1/1/random.php";
const totalProducts = 7; // Make 7 dummies
const baseURL = "http://127.0.0.1:5000";
// const baseURL = "https://app-luariz-post.herokuapp.com";

for (let index = 0; index < totalProducts; index++) {
  var imageDataUrl = "";
  axios({
    method: "get",
    url: generator,
    encoding: null,
  }).then((result) => {
    result.data.meals.map((element) => {
      request({
        url: element.strMealThumb,
        method: "GET",
        encoding: null, // This is actually important, or the image string will be encoded to the default encoding
      }).then((result) => {
        let imageBuffer = Buffer.from(result);
        let imageBase64 = imageBuffer.toString("base64");
        var imageDataUrl = imageBase64;

        let data = JSON.stringify({
          Product: [
            {
              name: element.strMeal,
              id_category: 7,
              description: `${element.strCategory} (${element.strArea})`,
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

        //   console.log(data);

        const config = {
          method: "post",
          url: `${baseURL}/v1/insert_product`,
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
    });
  });
}
