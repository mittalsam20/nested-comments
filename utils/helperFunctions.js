import { getComments as fetchComments } from "@/utils/localAPI";
import { nanoid } from "nanoid";

export const getComments = () => {
  const comments = fetchComments();
  return comments;
};

export const getMilliseconds = ({ timeStamp }) => {
  return new Date(timeStamp).getTime();
};

export const getReplies = ({ comments = [], commentId }) => {
  return comments
    .filter(({ parentId }) => parentId === commentId)
    .sort(
      (a, b) =>
        getMilliseconds({ timeStamp: a.createdAt }) -
        getMilliseconds({ timeStamp: b.createdAt })
    );
};

export const createComment = ({ text, userName, userId, parentId }) => {
  return {
    id: nanoid(),
    body: text,
    userName,
    userId,
    parentId,
    createdAt: new Date().toISOString(),
  };
};
