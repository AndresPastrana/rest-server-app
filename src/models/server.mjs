import express from "express";
import cors from "cors";
import {
  authRouter,
  userRouter,
  roleRouter,
  categoriesRouter,
  productRouter,
  searchRouter,uploadRouter
} from "../routes/index.mjs";
import { trydbConection } from "../database/conection.mjs";
import { upload } from "../middlewares/multer.mjs";
import multer from "multer";

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3200;
    this.paths = {
      auth: "/api/auth",
      user: "/api/user",
      role: "/api/role",
      categories: "/api/categories",
      prodcuts: "/api/product",
      search: "/api/search",
      upload: "/api/upload",
    };

    // Middlewares
    this.applyInitMiddlewares();

    // App's routes
    this.routes();

    // DB Conection
    this.dbConection();
  }

  applyInitMiddlewares() {
    // CORS
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
      })
    );

    // Lectura y parseo de application/json
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/ping", (req, resp) => {
      return resp.status(200).json({ ok: "PONG !" });
    });
    this.app.use(this.paths.user, userRouter);
    this.app.use(this.paths.role, roleRouter);
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.prodcuts, productRouter);
    this.app.use(this.paths.search, searchRouter);
    this.app.use(this.paths.upload,uploadRouter);
  }

  dbConection() {
    trydbConection(this.app.get("env"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}/`);
    });
  }
}

export default Server;
