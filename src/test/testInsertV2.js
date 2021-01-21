const prompt = require("prompt");
const ib = require("./insertBeverages");
const im = require("./insertMeals");
// import insertBeverages from "./insertBeverages";

const properties = [
  {
    name: "jenis",
    validator: /^[0-9]*$/,
    warning: "Jenis harus berupa angka.",
    message: `\n ID Jenis Dummy : \n 1 >> Makanan(Meals) \n 2 >> Minuman(Drinks) \n Masukkan pilihan`,
  },
  {
    name: "jumlah",
    validator: /^[0-9]*$/,
    warning: "Jumlah dummy harus berupa angka.",
    message: `\n Berapa dummy yang anda inginkan? \n Masukkan pilihan`,
  },
];

prompt.start();

prompt.get(properties, function (err, result) {
  const baseURL = process.env.REACT_APP_BASEURL_SERVER;

  if (err) {
    return onErr(err);
  } else {
    console.log("==================================");
    console.log("Summary command-line input");
    console.log("==================================");
    console.log(
      "ID Jenis Dummy : \n 1 >> Makanan(Meals) \n 2 >> Minuman(Drinks) "
    );
    console.log("  jenis: " + result.jenis);
    console.log("  jumlah: " + result.jumlah);
    console.log("baseURL", baseURL);

    const config = { jumlah: result.jumlah, baseURL: baseURL };

    if (result.jenis == 1) {
      im.insertMeals(config);
    } else if (result.jenis == 2) {
      ib.insertBeverages(config);
    }
  }
});

function onErr(err) {
  console.log(err);
  return 1;
}
