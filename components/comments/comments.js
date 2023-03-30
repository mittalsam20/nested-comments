import React, { useState, useEffect } from "react";

import {
  getReplies,
  getComments,
  createComment,
} from "@/utils/helperFunctions";

import Comment from "./comment";
import CommentForm from "./commentForm";

const addComment = ({ text, userName, userId, parentId, setComments }) => {
  const newComment = createComment({ text, userName, userId, parentId });
  setComments((prevState) => [newComment, ...prevState]);
};

const Comments = (props) => {
  const { currentUserId = 1, userName = "Sam" } = props;
  const [comments, setComments] = useState([]);
  const rootComments = comments.filter(({ parentId }) => parentId === null);

  useEffect(() => {
    setComments(getComments());
  }, []);

  return (
    <div className={"comments"}>
      <h3 className={"comments-title"}>{"Comments"}</h3>
      <div className="comment-form-title">{"Write Comment"}</div>
      <CommentForm
        submitLabel={"write"}
        handleSubmit={({ text }) =>
          addComment({
            text,
            userName,
            setComments,
            parentId: null,
            userId: currentUserId,
          })
        }
      />
      <div className="comments-container">
        {rootComments.map(({ id, ...rest }) => {
          const replies = getReplies({ comments, commentId: id });
          return (
            <Comment
              key={id}
              id={id}
              {...rest}
              replies={replies}
              comments={comments}
              setComments={setComments}
              currentUserId={currentUserId}
            />
          ); //TODO: add lazy loading for thousands of replies
        })}
      </div>
    </div>
  );
};

export default Comments;
