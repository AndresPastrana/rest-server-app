import Server from "./src/models/server.mjs";
import dotenv from "dotenv";
dotenv.config();
const server = new Server();
server.listen();

// TODO:
// 1 Finalizar la paginacion , solamente usauarios con estate+ true
// Delete users , validaciones
// Estudiar varaible de entorno
