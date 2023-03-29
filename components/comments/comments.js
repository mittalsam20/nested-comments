import React, { useState, useEffect } from "react";
import { getComments as fetchComments } from "@/utils/localAPI";

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
      <div className="comments-container"></div>
    </div>
  );
};

export default Comments;
