import sharp from 'sharp';
import fs from 'fs/promises';

interface imageResizeArray {
  passedWidth: number;
  passedHeight: number;
  imagePathFull: string;
  imagePathThumb: string;
}
/** 
resize an image path and saves it to the thumb
and returns the buffer of resized image on success
*/
const imageResize = async ({
  passedWidth,
  passedHeight,
  imagePathFull,
  imagePathThumb
}: imageResizeArray): Promise<Buffer> => {
  const data: Buffer | null = await fs
    .readFile(imagePathFull)
    .catch(() => null);

  if (!data) {
    return Promise.reject();
  }
  const imageBuffer: Buffer | null = await sharp(data)
    .resize(passedWidth, passedHeight)
    .toBuffer()
    .catch(() => null);
  if (!imageBuffer) {
    return Promise.reject();
  }
  return fs
    .writeFile(imagePathThumb, imageBuffer)
    .then(() => {
      return imageBuffer;
    })
    .catch(() => {
      return Promise.reject();
    });
};

export default { imageResize };
