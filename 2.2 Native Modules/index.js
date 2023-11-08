// const fs = require("fs");

// fs.writeFile("message.txt", "Hello From Node Js", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

// fs.readFile("message.txt","utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
  
import { readFile } from "node:fs";

readFile("message.txt", "utf-8" , (err, data) => {
  if (err) throw err;
  console.log(data);
});


// fs.open("message.txt", "r", (err, fd) => {
//   if (err) {
//     if (err.code === "ENOENT") {
//       console.error("message does not exist");
//       return;
//     }

//     throw err;
//   }

//   try {
//     readMyData(fd);
//   } finally {
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   }
// });

// import { openSync, closeSync, appendFileSync } from 'node:fs';

// let fd;

// try {
//   fd = openSync('message.txt', 'a');
//   appendFileSync(fd, 'data to append', 'utf8');
// } catch (err) {
//   /* Handle the error */
// } finally {
//   if (fd !== undefined)
//     closeSync(fd);
// }
