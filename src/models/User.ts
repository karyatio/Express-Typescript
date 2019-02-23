import { Schema, model } from "mongoose";

let UserSchema: Schema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  username: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  featuredImage: {
    type: String,
    default: ""
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  createdAt: Date,
  updatedAt: Date
});

export default model("User", UserSchema);
