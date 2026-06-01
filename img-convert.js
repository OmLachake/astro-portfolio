import sharp from "sharp";

const src = process.argv[2];
if (!src) { console.error("Usage: bun img-convert.js <image>"); process.exit(1); }

const dest = src.replace(/\.\w+$/, ".webp");
await sharp(src).webp({ quality: 80 }).toFile(dest);
console.log(`${src} → ${dest}`);
