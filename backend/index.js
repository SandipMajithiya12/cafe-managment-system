import express from 'express';
import cors from 'cors';
import connection from './connection.js';
import userRoute from './routes/user.js';
import categoryRoute from './routes/category.js';
import productRoute from './routes/product.js';
import billRoute from './routes/bill.js';
import dashboardRoute from './routes/deshboard.js'; // Corrected the typo from 'deshboard' to 'dashboard'

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/deshboard', dashboardRoute); // Corrected the typo from 'deshboard' to 'dashboard'

export default app;
