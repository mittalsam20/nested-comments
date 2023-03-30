import React from "react";
import Image from "next/image";

import { getReplies } from "@/utils/helperFunctions";

import userAvatar from "../../../public/user-icon.png";
import CommentForm from "../commentForm/commentForm";

const onClickDelete = ({ comments, setComments, commentId }) => {
  const filteredComments = comments.filter(({ id }) => id !== commentId);
  console.log(comments, filteredComments);
  setComments(filteredComments);
};

const getActionButton = ({
  userId,
  comments,
  createdAt,
  commentId,
  setComments,
  currentUserId,
  onClickDelete,
  postedBy = "1",
  setActiveComment,
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
      onClick: () => setActiveComment({ id: commentId, mode: "REPLYING" }),
    },
    {
      id: "EDIT",
      label: "Edit",
      show: isUser,
      onClick: () => setActiveComment({ id: commentId, mode: "EDITING" }),
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
    comment,
    replies,
    comments,
    addComment,
    setComments,
    activeComment,
    setActiveComment,
    currentUserId = 1,
  } = props;

  const { id: activeCommentId, mode } = activeComment;
  const { id, body, userName, userId, parentId, createdAt } = comment;

  const submitLabel = mode == "EDITING" ? "Edit" : "Write";
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const actionButtons = getActionButton({
    mode,
    userId,
    currentUserId,
    createdAt,
    commentId: id,
    comments,
    setComments,
    onClickDelete,
    setActiveComment,
  });
  // mode == "REPLYING"
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
        {activeCommentId == id && mode == "EDITING" ? (
          <CommentForm
            submitLabel={submitLabel}
            handleSubmit={({ text }) =>
              addComment({
                text,
                mode,
                comment,
                comments,
                setComments,
                currentUserId,
              })
            }
          />
        ) : (
          replies.length > 0 && (
            <div className={"replies"}>
              {replies.map((reply) => {
                const { id } = reply;
                const nestedReplies = getReplies({ comments, commentId: id });
                return (
                  <Comment
                    key={id}
                    comment={reply}
                    replies={nestedReplies}
                    comments={comments}
                    setComments={setComments}
                    currentUserId={currentUserId}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                  />
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Comment;
