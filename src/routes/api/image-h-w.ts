import path from 'path';
import imageHelper from '../../helpers/image-helper';
import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import { Stats } from 'fs';

const imageRouter = express.Router();
imageRouter.get('/', async (rq: Request, res: Response): Promise<void> => {
  const passedHeight = Number(rq.query['height']);
  const passedWidth = Number(rq.query['width']);
  const passedFilename = rq.query['filename'];
  // check values passed
  if (!passedFilename && !passedHeight && !passedWidth) {
    res.status(400).send('Please pass filename, height and width params');
    return;
  }
  if (!passedFilename) {
    res.status(400).send('Please pass filename params');
    return;
  }
  if (passedFilename && (!passedWidth || !passedHeight)) {
    res.status(400).send('Please pass height and width params');
    return;
  }
  // file full and thumb path
  const imagePathFull = `${path.resolve(
    __dirname,
    `../../../file-images/full/${passedFilename}.jpg`
  )}`;
  const imagePathThumb = `${path.resolve(
    __dirname,
    `../../../file-images/thumb/${passedFilename}-${passedHeight}x${passedWidth}.jpg`
  )}`;

  // Check if filename exists in full folder
  const fullImage: Stats | undefined = await fs
    .stat(imagePathFull)
    .catch(() => {
      res.status(404).send('You have entered an invalid file name');
      return undefined;
    });
  if (!fullImage) {
    return;
  }
  // Check if thumb was already created
  const checkThumb: Stats | undefined = await fs
    .stat(imagePathThumb)
    .catch(() => {
      return undefined;
    });
  if (checkThumb) {
    fs.readFile(imagePathThumb)
      .then((thumbData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbData);
      })
      .catch(() => {
        res.status(500).send('Error: processing the image');
      });
  } else {
    // resize image
    imageHelper
      .imageResize({
        imagePathFull,
        imagePathThumb,
        passedHeight,
        passedWidth
      })
      .then((resizedImage: Buffer) => {
        res.status(200).contentType('jpg').send(resizedImage);
      })
      .catch(() => {
        res.status(500).send('Error: occured processing the image');
      });
  }
});

export default imageRouter;
