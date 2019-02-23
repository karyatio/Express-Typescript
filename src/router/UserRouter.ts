import { Router, Request, Response, NextFunction } from "express";
import User from "../models/User";

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetUsers(req: Request, res: Response): void {
    User.find({})
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public GetUser(req: Request, res: Response): void {
    const { username } = req.params;
    User.findOne({ username })
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public CreateUser(req: Request, res: Response): void {
    const { name, username, email, password, featuredImage } = req.body;
    const posts: string[] = req.body;

    const user = new User({
      name,
      username,
      email,
      password,
      featuredImage,
      posts
    });

    user
      .save()
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public UpdateUser(req: Request, res: Response): void {
    const { username } = req.params;

    User.findOneAndUpdate({ username }, req.body)
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public DeleteUser(req: Request, res: Response): void {
    const { username } = req.params;
    User.findOneAndDelete({ username })
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  routes() {
    this.router.get("/", this.GetUsers);
    this.router.get("/:username", this.GetUser);
    this.router.post("/", this.CreateUser);
    this.router.put("/:username", this.UpdateUser);
    this.router.delete("/:username", this.DeleteUser);
  }
}

// export
const UserRoutes = new UserRouter();
UserRoutes.routes();

export default UserRoutes.router;
