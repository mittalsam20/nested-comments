import React from "react";
import Image from "next/image";

import { getReplies } from "@/utils/helperFunctions";

import userAvatar from "../../../public/user-icon.png";

const Comment = (props) => {
  const { id, body, username, userId, parentId, createdAt, comments, replies } =
    props;

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
        {replies.length > 0 && (
          <div className="replies">
            {replies.map(({ id, ...rest }) => {
              const nestedReplies = getReplies({ comments, commentId: id });
              return (
                <Comment key={id} id={id} {...rest} replies={nestedReplies} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
