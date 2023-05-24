import Server from "./src/models/server.mjs";
import dotenv from "dotenv";
dotenv.config();
const server = new Server();
server.listen();

// TODO: Finish the product endponit

// TODO: Do the serach endpont path api/:collection/:termino
// Solamnete buscar en las colecciones permitidas
