import mg from "mongoose";

const CommentSchema = new mg.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const model = mg.model("Comment", CommentSchema);

export default model;
