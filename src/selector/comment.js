import {createSelector} from 'reselect';

export const getComments = state => state.comment.list;
export const commentSelector = createSelector(
  [getComments], comments => comments.map(comment => ({
    id: comment.id,
    md: comment.md,
    userId: comment.user_id,
    nickName: comment.user_nick,
    avatar: comment.user_headpic,
    createdAt: comment.createdAt,
  }))
);
