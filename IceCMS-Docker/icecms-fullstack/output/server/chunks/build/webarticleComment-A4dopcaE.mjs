import { h as useDollarGet } from './server.mjs';

const getArticleCommentnum = (id) => {
  return useDollarGet(`/WebArticleComment/getArticleCommentnum/${id}`);
};
const getNewArticleComment = (num) => {
  return useDollarGet(`/WebArticleComment/getNewArticleComment/${num}`);
};

export { getNewArticleComment as a, getArticleCommentnum as g };
//# sourceMappingURL=webarticleComment-A4dopcaE.mjs.map
