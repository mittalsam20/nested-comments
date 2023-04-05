import React, { Fragment } from 'react'

import CommentForm from '../commentForm'
import styles from '../styles.module.css'
import { getReplies } from '../utils/helperFunctions'

const onClickDelete = ({ comments, setComments, commentId }) => {
  const filteredComments = comments.filter(({ id }) => id !== commentId)
  setComments(filteredComments)
}

const getActionButton = ({
  mode,
  userId,
  comments,
  createdAt,
  commentId,
  setComments,
  currentUserId,
  onClickDelete,
  postedBy = '1',
  setActiveComment
}) => {
  const isUser = currentUserId === userId
  const isAuthor = postedBy === currentUserId
  // const fiveMinutes = 300000
  // const timePassed = new Date() - new Date(createdAt) > fiveMinutes

  const onClickEdit = () => {
    setActiveComment({ id: commentId, mode: 'EDITING' })
  }

  return [
    {
      id: 'REPLY',
      label: 'Reply',
      show: Boolean(currentUserId),
      disabled: mode !== 'VIEW',
      onClick: () => setActiveComment({ id: commentId, mode: 'REPLYING' })
    },
    {
      id: 'EDIT',
      label: 'Edit',
      show: isUser,
      disabled: mode !== 'VIEW',
      onClick: onClickEdit
    },
    {
      id: 'DELETE',
      label: 'Delete',
      show: isUser || isAuthor,
      disabled: mode !== 'VIEW',
      onClick: () => onClickDelete({ comments, setComments, commentId })
    }
  ]
}

const Comment = (props) => {
  const {
    comment,
    replies,
    comments,
    setComments,
    handleSubmit,
    activeComment,
    setActiveComment,
    currentUserId = 1
  } = props

  const { id: activeCommentId, mode } = activeComment
  const { id, body, userName, userId, parentId, createdAt } = comment

  const submitLabel = mode === 'EDITING' ? 'Save' : 'Comment'
  const formattedDate = new Date(createdAt).toLocaleDateString()
  const actionButtons = getActionButton({
    mode,
    userId,
    parentId,
    currentUserId,
    createdAt,
    commentId: id,
    comments,
    setComments,
    onClickDelete,
    setActiveComment
  })

  return (
    <div
      className={styles.comment}
      style={
        parentId !== null && replies.length > 0 ? { marginBottom: '0' } : {}
      }
    >
      <div className={styles.commentImageContainer}>
        <img src='/user-icon.png' alt='us' />
      </div>
      <div className={styles.commentRightPart}>
        {activeCommentId === id && mode === 'EDITING' ? (
          <CommentForm
            previousComment={body}
            submitLabel={submitLabel}
            setActiveComment={setActiveComment}
            handleSubmit={({ text }) => handleSubmit({ text, mode, comment })}
          />
        ) : (
          <>
            <div className={styles.commentContent}>
              <div className={styles.commentAuthor}>{userName}</div>
              <>{formattedDate}</>
            </div>
            <div className={styles.commentText}>{body}</div>
            <div className={styles.commentActions}>
              {actionButtons.map(({ id, label, show, onClick }) => {
                return (
                  show && (
                    <div
                      key={id}
                      onClick={onClick}
                      className={styles.commentAction}
                    >
                      {label}
                    </div>
                  )
                )
              })}
            </div>
          </>
        )}

        {activeCommentId === id && mode === 'REPLYING' && (
          <div className={styles.replyTextAreaContainer}>
            <div className={styles.commentImageContainer}>
              <img src='/user-icon.png' alt='ava' />
            </div>
            <CommentForm
              submitLabel={submitLabel}
              setActiveComment={setActiveComment}
              handleSubmit={({ text }) => handleSubmit({ text, mode, comment })}
            />
          </div>
        )}

        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => {
              const { id } = reply
              const nestedReplies = getReplies({ comments, commentId: id })
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
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
