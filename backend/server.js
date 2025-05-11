import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/user.js';
import productRouter from './routes/product.js';
import instrumentRouter from './routes/instrument.js';
import mediaRouter from './routes/media.js';
import chemicalRouter from './routes/chemical.js';
import productIntimateRouter from './routes/productIntimate.js';
import batchRouter from './routes/batch.js';
import limsRouter from './routes/lims.js';
import dashboardRouter from './routes/dashboard.js';
import batchRawMaterialRouter from './routes/batchRawMaterial.js';
import inProcessQCRouter from './routes/inProcessQC.js';
import fileRouter from './routes/Files.js';
import finishProductRouter from './routes/finishProduct.js';
import etoSterlizationRouter from './routes/etoSterlization.js';
import microbiologicalRouter from './routes/microbiological.js';
import productionRouter from './routes/production.js';
import storeRouter from './routes/store.js';
import etoSterileStoreRouter from './routes/etoSterileStore.js';
import finishGoodStoreRouter from './routes/finishGoodStore.js';
import etoQuarantineStoreRouter from './routes/etoQuarantineStore.js';
import dispatchRouter from './routes/dispatchBay.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  '*',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://paktex.rapidfied.com',
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/instrument', instrumentRouter);
app.use('/chemical', chemicalRouter);
app.use('/media', mediaRouter);
app.use('/intimateProduct', productIntimateRouter);
app.use('/batch', batchRouter);
app.use('/lims', limsRouter);
app.use('/batchRawMaterial', batchRawMaterialRouter);
app.use('/inProcessQC', inProcessQCRouter);
app.use('/finishProduct', finishProductRouter);
app.use('/etoSterlization', etoSterlizationRouter);
app.use('/microbiological', microbiologicalRouter);
app.use('/store', storeRouter);
app.use('/finishGoodStore', finishGoodStoreRouter);
app.use('/etoSterileStore', etoSterileStoreRouter);
app.use('/etoQuarantineStore', etoQuarantineStoreRouter);
app.use('/dispatch', dispatchRouter);
app.use('/production', productionRouter);
app.use('/count', dashboardRouter);
app.use('/qms', fileRouter);

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const port = process.env.PORT || 7001;

app.get('/', (req, res) => {
  res.json({message: 'Hello, world from Paktex Backend!'});
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
