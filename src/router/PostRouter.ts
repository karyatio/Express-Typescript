import { Router, Request, Response, NextFunction } from "express";
import Post from "../models/Post";

class PostRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetPosts(req: Request, res: Response): void {
    Post.find({})
      .then(posts => {})
      .catch(err => {});
  }

  public GetPost(req: Request, res: Response): void {}

  public CreatePost(req: Request, res: Response): void {}

  public UpdatePost(req: Request, res: Response): void {}

  public DeletePost(req: Request, res: Response): void {}

  routes() {}
}
