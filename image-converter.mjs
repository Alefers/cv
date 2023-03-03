import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImagePool } from '@squoosh/lib';
import glob from 'glob-all';
import { cpus } from 'os';


const imagePool = new ImagePool(cpus().length);

const imagePaths = glob.sync([
  'apps/**/*.{jpg,png,jpeg}',
]);

const handleFile = async (input) => {
  try {
    const file = await readFile(input);
    const img = imagePool.ingestImage(file);
    await img.encode({ webp: { quality: 100, loseless: 1 } });
    const { binary, extension } = img.encodedWith.webp;
    const { dir, name } = path.parse(input);
    const output = path.join(dir, `${name}.${extension}`);
    await writeFile(output, binary);
    console.log(`Converted ${input} to ${output}`);
  } catch (err) {
    throw `Error in file: ${input}\n\n${err}`;
  }
};

(() => {
  return Promise.all(imagePaths.map(handleFile)).then(
    async (data) => {
      await imagePool.close();
      console.log('\x1b[32m', `Converted ${data.length} images`);
    },
  );
})();
