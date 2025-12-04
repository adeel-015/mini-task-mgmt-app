const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
app.use(cors());
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mini-task-mgmt";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    const gracefulShutdown = () => {
      console.log("Shutting down gracefully...");
      server.close(() => {
        process.on("SIGINT", async () => {
          try {
            await mongoose.connection.close();
            console.log("Mongoose connection disconnected");
            process.exit(0);
          } catch (err) {
            console.error("Error during disconnection", err);
            process.exit(1);
          }
        });
      });
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
