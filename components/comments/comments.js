import React, { useState, useEffect } from "react";

import { getComments as fetchComments } from "@/utils/localAPI";

import Comment from "./comment";

const getComments = () => {
  const comments = fetchComments();
  console.log(comments);
  return comments;
};

const Comments = (props) => {
  const { currentUserId = 1 } = props;
  const [comments, setComments] = useState([]);
  const rootComments = comments.filter(({ parentId }) => parentId === null);
  console.log("s", rootComments);

  useEffect(() => {
    setComments(getComments());
  }, []);

  return (
    <div className={"comments"}>
      <h3 className={"comments-title"}>{"Comments"}</h3>
      <div className="comments-container">
        {rootComments.map(({ id, ...rest }) => {
          return <Comment key={id} id={id} {...rest} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
