import React, { useState, useEffect } from "react";

import { getComments, getReplies } from "@/utils/helperFunctions";

import Comment from "./comment";
import CommentForm from "./commentForm";

const addComment = ({ text, parentId, comments }) => {
  console.log(text, parentId, comments);
};

const Comments = (props) => {
  const { currentUserId = 1 } = props;
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
          addComment({ text, parentId: "s", comments })
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
            />
          ); //TODO: add lazy loading for thousands of replies
        })}
      </div>
    </div>
  );
};

export default Comments;
