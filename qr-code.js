const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require('fs');
async function create(dataForQRcode, center_image, width, cwidth) {
  const canvas = createCanvas(width, width);
  fs.writeFileSync('canvas.jpg', canvas.toBuffer());
  QRCode.toCanvas(
    canvas,
    dataForQRcode,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }
  );

  const ctx = canvas.getContext("2d");
  const img = await loadImage('name.png');
  var width = canvas.width;
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  console.log(canvas.toBuffer());
  fs.writeFileSync('done.png', canvas.toBuffer());
}
value = fs.readFileSync('./asset/favicon.ico');
fs.writeFileSync('fi.jpg',value);
async function main() {
  let secIm = fs.readFileSync('asset/favicon.ico');
  console.log(secIm)
  await create(
    "./asseto",
    secIm,
    1,
    30
  );
}
main();
