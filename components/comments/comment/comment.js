import React from "react";
import Image from "next/image";

import userAvatar from "../../../public/user-icon.png";

const Comment = (props) => {
  const { id, body, username, userId, parentId, createdAt } = props;
  return (
    <div className="comment">
      <div className="comment-image-container">
        <Image src={userAvatar} alt="userAvatar" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{username}</div>
          <>{createdAt}</>
        </div>
        <div className="comment-text">{body}</div>
      </div>
    </div>
  );
};

export default Comment;
