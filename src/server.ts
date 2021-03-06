import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as compression from "compression";
import * as cors from "cors";

// import routers
import PostRouter from "./router/PostRouter";
import UserRouter from "./router/UserRouter";

// Server class
class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public config() {
    // Setup mongoose
    const MONGO_URI =
      "mongodb://karyaTio:mongodb1@ds231589.mlab.com:31589/testingall";
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true
    });

    // config
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(cors());
  }

  routes(): void {
    let router: express.Router;
    router = express.Router();

    this.app.use("/", router);
    this.app.use("/api/v1/posts", PostRouter);
    this.app.use("/api/v1/users", UserRouter);
  }
}

// export
export default new Server().app;
