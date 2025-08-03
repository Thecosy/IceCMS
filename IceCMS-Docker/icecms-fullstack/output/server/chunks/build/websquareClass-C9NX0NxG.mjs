import { h as useDollarGet } from './server.mjs';

const getSquareClasslist = () => {
  return useDollarGet("/WebaSquareClass/getSquareClasslist");
};
const getArticleClassByotherName = (otherName) => useDollarGet(`/WebaSquareClass/getArticleClassByotherName/${otherName}`);

export { getArticleClassByotherName as a, getSquareClasslist as g };
//# sourceMappingURL=websquareClass-C9NX0NxG.mjs.map
