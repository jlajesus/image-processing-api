import express from 'express';
import image from './api/image-h-w';

const routes: express.Router = express.Router();

routes.use('/api/images', image);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    // Quick solution:
    response.send(
      '<h1>Welcome to image-processing-api</h1><p> Please pass a valid filename (encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica), width and height to set the size.</p><p>Example:<ul><li><a href="/api/images?filename=fjord&width=200&height=200">/api/images?filename=fjord&width=200&height=200</a></li></ul></p>'
    );
  }
);

export default routes;
