import express from "express";
import cors from "cors";
import { router as userRoutes } from "../routes/user.mjs";
import { router as roleRoutes } from "../routes/role.mjs";
import { router as authRoutes } from "../routes/auth.mjs";
import { trydbConection } from "../database/conection.mjs";
// App endpointsc

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3200;

    this.paths = {
      auth: "/api/auth",
      user: "/api/user",
      role: "/api/role",
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
    this.app.use("/ping", (req, resp) => {
      return resp.status(200).json({ ok: "PONG !" });
    });
    // Lectura y parseo a JSON del body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.user, userRoutes);
    this.app.use(this.paths.role, roleRoutes);
    this.app.use(this.paths.auth, authRoutes);
  }

  dbConection() {
    trydbConection();
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on http://localhost:${this.PORT}/`);
    });
  }
}

export default Server;
