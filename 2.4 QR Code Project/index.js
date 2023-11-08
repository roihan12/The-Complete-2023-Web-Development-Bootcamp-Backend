/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qrcode from "qr-image";
import fs from "fs";

const questions = [
  {
    type: "input",
    name: "Url",
    message: "What's your Url want to generate qr-code: ",
  },
];

inquirer
  .prompt(questions)
  .then((answers) => {
    const url = answers.Url;

    let qr_png = qrcode.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("url.png"));

    fs.writeFile("Url-1.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });
