import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../resources/openapi.json' assert { type: 'json' };


const app = express();
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const port = process.env.PORT ?? 4000;


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running at port', port);
  open(`http://localhost:${port}`);
})
