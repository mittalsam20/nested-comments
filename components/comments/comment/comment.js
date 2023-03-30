import React from "react";
import Image from "next/image";

import { getReplies } from "@/utils/helperFunctions";

import userAvatar from "../../../public/user-icon.png";

const getActionButton = ({ userId, currentUserId, postedBy = "1" }) => {
  const isUser = currentUserId == userId;
  const isAuthor = postedBy == currentUserId;
  console.log({ userId, currentUserId, postedBy, isUser, isAuthor });
  return [
    {
      id: "REPLY",
      label: "Reply",
      show: true,
      action: () => {},
    },
    {
      id: "EDIT",
      label: "Edit",
      show: isUser,
      action: () => {},
    },
    {
      id: "DELETE",
      label: "Delete",
      show: isUser || isAuthor,
      action: () => {},
    },
  ];
};

const Comment = (props) => {
  const {
    id,
    body,
    userName,
    userId,
    parentId,
    createdAt,
    comments,
    replies,
    currentUserId = 1,
  } = props;
  const actionButtons = getActionButton({ userId, currentUserId });

  return (
    <div className="comment">
      <div className="comment-image-container">
        <Image src={userAvatar} alt="userAvatar" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{userName}</div>
          <>{createdAt}</>
        </div>
        <div className="comment-text">{body}</div>
        <div className="comment-actions">
          {actionButtons.map(({ id, label, show, action }) => {
            return (
              show && (
                <div key={id} className={"comment-action"}>
                  {label}
                </div>
              )
            );
          })}
        </div>
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
