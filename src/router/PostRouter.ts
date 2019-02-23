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
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public GetPost(req: Request, res: Response): void {
    const { slug } = req.params;
    Post.findOne({ slug })
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public CreatePost(req: Request, res: Response): void {
    const { title, body, featuredImage, slug } = req.body;

    const post = new Post({
      title,
      body,
      slug,
      featuredImage
    });

    post
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

  public UpdatePost(req: Request, res: Response): void {
    const { slug } = req.params;

    Post.findOneAndUpdate({ slug }, req.body)
      .then(data => {
        const status = res.statusCode;
        res.json({ status, data });
      })
      .catch(err => {
        const status = req.statusCode;
        res.json({ status, err });
      });
  }

  public DeletePost(req: Request, res: Response): void {
    const { slug } = req.params;
    Post.findOneAndDelete({ slug })
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
    this.router.get("/", this.GetPosts);
    this.router.get("/:slug", this.GetPost);
    this.router.post("/", this.CreatePost);
    this.router.put("/:slug", this.UpdatePost);
    this.router.delete("/:slug", this.DeletePost);
  }
}

// export
const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;
