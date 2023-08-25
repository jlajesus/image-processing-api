import imageHelper from '../../helpers/image-helper';
import path from 'path';

const imagePathFull = path.resolve(
  __dirname,
  '../../../file-images/full/fjord.jpg'
);
const imagePathThumb = path.resolve(
  __dirname,
  '../../../file-images/thumb/fjord.jpg'
);

describe('Test imageResizer function', (): void => {
  it('Test 1: rejects promise if something went wrong', async (): Promise<void> => {
    await expectAsync(
      imageHelper.imageResize({
        passedWidth: 200,
        passedHeight: 300,
        imagePathFull: 'xxxxxx',
        imagePathThumb: 'bbbbbb'
      })
    ).toBeRejected();
  });
  it('Test 2: returns a buffer after sucessfully resizing an image', async () => {
    const imageBuffer: Buffer = await imageHelper.imageResize({
      passedWidth: 300,
      passedHeight: 300,
      imagePathFull,
      imagePathThumb
    });
    expect(imageBuffer).toBeInstanceOf(Buffer);
  });
});
