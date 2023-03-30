import React from "react";
import Image from "next/image";

import { getReplies } from "@/utils/helperFunctions";

import userAvatar from "../../../public/user-icon.png";

const onClickDelete = ({ comments, setComments, commentId }) => {
  const filteredComments = comments.filter(({ id }) => id !== commentId);
  setComments(filteredComments);
};

const getActionButton = ({
  userId,
  currentUserId,
  postedBy = "1",
  createdAt,
  commentId,
  comments,
  setComments,
  onClickDelete,
}) => {
  const isUser = currentUserId == userId;
  const isAuthor = postedBy == currentUserId;
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(createdAt) > fiveMinutes;

  return [
    {
      id: "REPLY",
      label: "Reply",
      show: Boolean(currentUserId),
      onClick: () => {},
    },
    {
      id: "EDIT",
      label: "Edit",
      show: isUser,
      onClick: () => {},
    },
    {
      id: "DELETE",
      label: "Delete",
      show: isUser || isAuthor,
      onClick: () => onClickDelete({ comments, setComments, commentId }),
    },
  ];
};

const Comment = (props) => {
  const {
    id,
    body,
    userId,
    replies,
    comments,
    parentId,
    userName,
    createdAt,
    setComments,
    currentUserId = 1,
  } = props;

  const actionButtons = getActionButton({
    userId,
    currentUserId,
    createdAt,
    commentId: id,
    comments,
    setComments,
    onClickDelete,
  });
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="comment">
      <div className="comment-image-container">
        <Image src={userAvatar} alt="userAvatar" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{userName}</div>
          <>{formattedDate}</>
        </div>
        <div className="comment-text">{body}</div>
        <div className="comment-actions">
          {actionButtons.map(({ id, label, show, onClick }) => {
            return (
              show && (
                <div key={id} className={"comment-action"} onClick={onClick}>
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
                <Comment
                  key={id}
                  id={id}
                  {...rest}
                  replies={nestedReplies}
                  comments={comments}
                  setComments={setComments}
                  currentUserId={currentUserId}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
