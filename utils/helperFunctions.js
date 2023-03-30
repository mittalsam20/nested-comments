import { getComments as fetchComments } from "@/utils/localAPI";

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

export const createComment = () => {
  return {};
};
