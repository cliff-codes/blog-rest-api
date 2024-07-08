import { Blog } from "../models/blogModel.js";
import { Comment } from "../models/commentModel.js";

export const postComment = async (req, res, next) => {
  const { content } = req.body;

  if (!content) return next(errorHandler(400, "Content is required"));
  if (!req.user.id)
    return next(errorHandler(400, "Login is required, to post a comment"));
  if (!req.params.blogId)
    return next(errorHandler(400, "cannot post a comment on no blog"));

  try {
    const comment = new Comment({
      content,
      author: req.user.id,
      blog: req.params.blogId,
    });

    await comment.save();

    await Blog.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment._id },
    });

    await res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error posting comment"));
  }
};

//------------------------------edit comment------------------------------

export const editComment = async (req, res, next) => {
  const { content } = req.body;

  if (!content) return next(errorHandler(400, "Content is required"));
  if (!req.user.id)
    return next(errorHandler(400, "Login is required, to edit a comment"));
  if (!req.params.commentId)
    return next(errorHandler(400, "cannot edit a comment on no comment"));

  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return next(
        errorHandler(
          404,
          "Comment with id " + req.params.commentId + " not found"
        )
      );

    //authorize user if comment is found.

    if (comment.author.toString() !== req.user.id)
      return next(
        errorHandler(401, "Access denied. you cannot edit this comment")
      );

    const response = await Comment.updateOne(
        {_id: req.params.commentId},
        {$set: {content}}
    )
    await res.status(201).json(response);
    
  } catch (error) {
    console.log(error);
    next(errorHandler(500, "Error editing comment"));
  }
};
