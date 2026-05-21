import express, {
  Application,
  Request,
  Response
} from "express";

import dotenv from "dotenv";

import cors from "cors";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";

import testRoutes from "./routes/testRoutes";

import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app: Application = express();

/*
========================
DATABASE CONNECTION
========================
*/
connectDB();

/*
========================
MIDDLEWARES
========================
*/
app.use(cors());

app.use(express.json());

/*
========================
HOME ROUTE
========================
*/
app.get(
  "/",
  (req: Request, res: Response) => {
    res.send(
      "Smart Leads Dashboard API Running"
    );
  }
);

/*
========================
AUTH ROUTES
========================
*/
app.use(
  "/api/auth",
  authRoutes
);

/*
========================
TEST PROTECTED ROUTES
========================
*/
app.use(
  "/api/test",
  testRoutes
);

/*
========================
LEAD ROUTES
========================
*/
app.use(
  "/api/leads",
  leadRoutes
);

/*
========================
SERVER
========================
*/
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});