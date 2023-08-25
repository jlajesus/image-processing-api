import sizeOf from 'image-size';
import app from '../../index';
import { Stats } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import request from 'supertest';

describe('Test URL response', () => {
  it('Test 1: responds 400, if filename, heigh, and width not passed', () => {
    request(app).get('/api/images').expect(400);
  });

  it('Test 2:responds with 400, if width not passed', () => {
    request(app)
      .get('/api/images?filename=encenadaport&height=100&width=')
      .expect(400);
  });

  it('Test 3:responds with 404, if called correctly but image does not exist', () => {
    request(app)
      .get('/api/images?filename=testFileName&height=100&width=100')
      .expect(404);
  });

  it('Test 4:responds with 200, filename, heigh, and width passed', () => {
    request(app)
      .get('/api/images?filename=encenadaport&height=100&width=100')
      .expect(200);
  });
});

describe('Test thumb folder (image copy)', () => {
  it('Test 1: creat image copy with the correct height and width', () => {
    request(app)
      .get('/api/images?filename=encenadaport&height=300&width=300')
      .then(() => {
        const dimensions = sizeOf(
          path.resolve(
            __dirname,
            '../../../file-images/thumb/encenadaport-300x300.jpg'
          )
        );
        expect(dimensions.height).toEqual(100);
        expect(dimensions.width).toEqual(150);
      });
  });
  it('Test 2:creat a copy version of the image in thumb folder', () => {
    request(app)
      .get('/api/images?filename=encenadaport&height=200&width=200')
      .then(() => {
        fs.stat(
          path.resolve(
            __dirname,
            '../../../file-images/thumb/encenadaport-200x200.jpg'
          )
        ).then((fileStat: Stats) => expect(fileStat).not.toBeNull());
      });
  });
});
