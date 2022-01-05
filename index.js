const { promisify } = require("util");
const fs = require("fs");
const convert = require("heic-convert");

(async () => {
  const imagesHEIC = await promisify(fs.readdir)("./src/");
  const inputsBuffer = imagesHEIC.map(async (image) =>
    promisify(fs.readFile)(`./src/${image}`)
  );
  const res = await Promise.all(inputsBuffer);

  for (let idx in res) {
    const outputBuffer = await convert({
      buffer: res[idx],
      format: "JPEG",
    });
    await promisify(fs.writeFile)(`./output/result-${idx}.jpg`, outputBuffer);
    console.log(`./output/result-${idx}.jpg`);
  }
})();
