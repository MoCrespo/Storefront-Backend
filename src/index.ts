import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import cors from 'cors';

// Routes
import usersRoutes from './handlers/users.routes';
import productsRoutes from './handlers/products.routes';
import ordersRoutes from './handlers/orders.routes';
import dashboardRoutes from './handlers/dashboard.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  });
});

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);
dashboardRoutes(app);
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT} 🚀`);
});

export default app;
