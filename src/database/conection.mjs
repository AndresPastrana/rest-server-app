import mongoose from "mongoose";

export const trydbConection = async () => {
  // Initial conection
  const CDN = process.env.MONGO_CDN_DEV || process.env.MONGO_CDN_DEV;
  try {
    // Conection events handlers
    mongoose.connection.on("connecting", () => {
      console.log("DB : Starting connection....");
    });
    mongoose.connection.on("connected", () => {
      console.log("DB : Initial connection stablished .");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("DB :  Connection re stablished .");
    });
    // mongoose.connection.on("disconnected", () => {
    //   console.error("DB : Database server's conection lost.");
    // });

    // mongoose.connection.on("open", () => {
    //   console.log("DB : Open");
    // });
    mongoose.connection.on("error", () => {
      console.error("Error conecting to the database");
    });

    await mongoose.connect(CDN, {
      autoCreate: true,
      bufferCommands: true,
    });
  } catch (error) {
    console.log("DB : Error on initial conection to the database server");
    console.log(error);
  }
};
