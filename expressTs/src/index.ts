import express from "express";
import cors from "cors";
import { route } from "./route";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

route(app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:3000`);
});
