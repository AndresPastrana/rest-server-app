import express from "express";
import cors from "cors";
import { router as userRoutes } from "../routes/user.mjs";

// App endpoints

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3200;

    this.paths = {
      auth: "/api/auth",
      user: "/api/user",
    };

    // Middlewares
    this.applyInitMiddlewares();

    // App's routes
    this.routes();
  }

  applyInitMiddlewares() {
    // CORS
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
      })
    );

    // Lectura y parseo a JSON del body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.user, userRoutes);
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}/`);
    });
  }
}

export default Server;
