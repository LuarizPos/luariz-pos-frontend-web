const axios = require("axios");
const faker = require("faker");
const request = require("request-promise-native");
require("dotenv").config();

const generator = process.env.REACT_APP_BEVERAGES_API;
let counterInsertedData = [];

exports.insertBeverages = function (params) {
  for (let index = 0; index < params.jumlah; index++) {
    var imageDataUrl = "";
    axios({
      method: "get",
      url: generator,
      encoding: null,
    }).then((result) => {
      result.data.drinks.map((element) => {
        request({
          url: element.strDrinkThumb,
          method: "GET",
          encoding: null, // This is actually important, or the image string will be encoded to the default encoding
        }).then((result) => {
          let imageBuffer = Buffer.from(result);
          let imageBase64 = imageBuffer.toString("base64");
          var imageDataUrl = imageBase64;

          let data = JSON.stringify({
            Product: [
              {
                name: element.strDrink,
                id_category: 2,
                description: `${element.strCategory}`,
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

          const config = {
            method: "post",
            url: `${params.baseURL}/v1/insert_product`,
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          axios(config)
            .then(function (response) {
              if (response.data.API_LuarizPos.Message.Code == 200) {
                counterInsertedData.push(1);
              } else {
                null;
              }
            })
            .then(function () {
              console.log(
                "Sukses input data minuman ke DB dengan total " +
                  counterInsertedData.length +
                  " data."
              );
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      });
    });
  }
};
