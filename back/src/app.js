import express from 'express';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
import { readFileSync } from 'fs';


const swaggerFile = JSON.parse(readFileSync('./src/swagger.json', 'utf8'));
const app = express();

app.use(cors());
app.use(express.json());

console.log(swaggerFile);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(userRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
