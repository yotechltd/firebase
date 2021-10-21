const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require('fs');
async function create(dataForQRcode, center_image, width, centerImagewidth) {
  const canvas = createCanvas(width, width);
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
  var width = canvas.width;
  let img = await loadImage(center_image);
  const center = (width - centerImagewidth) / 2;
  ctx.drawImage(img, center, center, centerImagewidth, centerImagewidth);
  return canvas;
}

async function main() {
  let centerImage = fs.readFileSync('asset/favicon.ico');
  let value = await create(
    "./asseto",
    centerImage,
    1,
    10
  );
  fs.writeFileSync('done.jpg', value.toBuffer());
}
main();
