import express from 'express';
import routes from './routes/index';
import fs from 'fs';
import path from 'path';

const app: express.Application = express();
const port: number = 3000;

// Add routes
app.use(routes);

// Start server
app.listen(port, (): void => {
  // make sure thumb folder exists
  const thumbPath = path.resolve(__dirname, '../file-images/thumb');

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  console.log(`Running on port ${port}`);
});

export default app;
