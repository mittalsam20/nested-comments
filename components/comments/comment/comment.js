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
  mode,
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

  const onClickEdit = () => {
    setActiveComment({ id: commentId, mode: "EDITING" });
  };

  return [
    {
      id: "REPLY",
      label: "Reply",
      show: Boolean(currentUserId),
      disabled: mode !== "VIEW",
      onClick: () => setActiveComment({ id: commentId, mode: "REPLYING" }),
    },
    {
      id: "EDIT",
      label: "Edit",
      show: isUser,
      disabled: mode !== "VIEW",
      onClick: () => onClickEdit(),
    },
    {
      id: "DELETE",
      label: "Delete",
      show: isUser || isAuthor,
      disabled: mode !== "VIEW",
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
    handleSubmit,
    activeComment,
    setActiveComment,
    currentUserId = 1,
  } = props;

  const { id: activeCommentId, mode } = activeComment;
  const { id, body, userName, userId, parentId, createdAt } = comment;

  const submitLabel = mode == "EDITING" ? "Save" : "Comment";
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
  // mode == "REPLYING";
  return (
    <div className="comment">
      <div className="comment-image-container">
        <Image src={userAvatar} alt="userAvatar" />
      </div>
      <div className="comment-right-part">
        {activeCommentId == id && mode == "EDITING" ? (
          <CommentForm
            previousComment={body}
            submitLabel={submitLabel}
            handleSubmit={({ text }) => handleSubmit({ text, mode, comment })}
          />
        ) : (
          <>
            <div className="comment-content">
              <div className="comment-author">{userName}</div>
              <>{formattedDate}</>
            </div>
            <div className="comment-text">{body}</div>
            <div className="comment-actions">
              {actionButtons.map(({ id, label, show, onClick }) => {
                return (
                  show && (
                    <div
                      key={id}
                      className={"comment-action"}
                      onClick={onClick}
                    >
                      {label}
                    </div>
                  )
                );
              })}
            </div>
          </>
        )}

        {replies.length > 0 && (
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
                  handleSubmit={handleSubmit}
                  currentUserId={currentUserId}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
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
