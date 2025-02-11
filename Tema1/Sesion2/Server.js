// async function getProductsAsync() {
//     return new Promise((resolve, reject) => {
//         resolve([
//             {
//                 nombre: "PC-Gaming",
//                 marca: "Asus",
//                 precio: 1200
//             },
//             {
//                 nombre: "Tablet",
//                 marca: "Samsung",
//                 precio: 300
//             },
//             {
//                 nombre: "Cámara-Reflex",
//                 marca: "Canon",
//                 precio: 650
//             }
//         ]);
//     });
// }
//
// console.log(getProductsAsync());
//
// getProductsAsync().then((result) => {
//     console.log(result);
// })

const http = require('http');
const server = http.createServer((req, res) => {
    res.end("Hello World!");
})
const PORT = process.env.PORT || 3000;
server.listen(PORT);