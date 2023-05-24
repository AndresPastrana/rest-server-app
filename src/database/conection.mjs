import mongoose from "mongoose";

export const trydbConection = async (env) => {
  // Initial conection
  let cdn;
  if (env === 'development') {
    cdn = process.env.MONGO_CDN_DEV;
  }
  if (env === 'production') {
    cdn = process.env.MONGO_CDN;
  }

  try {
    // Conection events handlers
    mongoose.connection.on("connecting", () => {
      console.log("DB : Starting connection....");
    });
    mongoose.connection.on("connected", () => {
      console.log("DB : Initial connection stablished" + " (" + env +") " );
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

    await mongoose.connect(cdn, {
      autoCreate: true,
      bufferCommands: true,
    });
  } catch (error) {
    console.log("DB : Error on initial conection to the database server");
    console.log(error);
  }
};
