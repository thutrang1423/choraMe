import express from 'express';
import cors from "cors";
import {route} from './route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

route(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:3000`);
});