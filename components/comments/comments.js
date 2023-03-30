import React, { useState, useEffect } from "react";

import {
  getReplies,
  getComments,
  handleSubmit,
  createComment,
} from "@/utils/helperFunctions";

import Comment from "./comment";
import CommentForm from "./commentForm";

const addComment = ({
  text,
  mode,
  comment = {},
  comments,
  setComments,
  currentUserId = null,
  currentUserName = null,
}) => {
  let updatedComments;
  const { id, userName, parentId } = comment;
  if (mode == "COMMENTING" || mode == "REPLYING") {
    const newComment = createComment({
      text,
      userId: currentUserId,
      userName: currentUserName || userName,
      parentId: parentId == null ? null : id,
    });
    updatedComments = [newComment, ...comments];
  } else if (mode == "EDITING") {
    updatedComments = comments.map((comment) => {
      if (comment.id == id) return { ...comment, body: text };
      return comment;
    });
  }

  setComments(updatedComments);
};

const Comments = (props) => {
  const { currentUserId = 1, currentUserName = "Sam" } = props;
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState({
    id: null,
    mode: "VIEW",
  });

  const rootComments = comments.filter(({ parentId }) => parentId === null);

  useEffect(() => {
    setComments(getComments());
  }, []);

  const handleSubmit = ({ text, mode, comment = null }) => {
    addComment({
      text,
      mode,
      comment,
      comments,
      currentUserId,
      currentUserName,
      setComments,
    });
    setActiveComment({ id: null, mode: "VIEW" });
  };

  return (
    <div className={"comments"}>
      <h3 className={"comments-title"}>{"Comments"}</h3>
      <div className={"comment-form-title"}>{"Write Comment"}</div>
      <CommentForm
        submitLabel={"write"}
        handleSubmit={({ text }) => handleSubmit({ text, mode: "COMMENTING" })}
      />
      <div className="comments-container">
        {rootComments.map((comment) => {
          const { id } = comment;
          const replies = getReplies({ comments, commentId: id });
          return (
            <Comment
              key={id}
              comment={comment}
              replies={replies}
              comments={comments}
              addComment={addComment}
              setComments={setComments}
              handleSubmit={handleSubmit}
              currentUserId={currentUserId}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          ); //TODO: add lazy loading for thousands of replies
        })}
      </div>
    </div>
  );
};

export default Comments;
