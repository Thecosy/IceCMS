import { h as useDollarGet } from './server.mjs';

const getAnnouncementslist = () => {
  return useDollarGet("/WebAnnouncements/getAnnouncementslist");
};
const getAnnouncementslistByNum = (num) => {
  return useDollarGet(`/WebAnnouncements/getAnnouncementslistByNum/${num}`);
};

export { getAnnouncementslist as a, getAnnouncementslistByNum as g };
//# sourceMappingURL=webannouncements-Cw9vJNJn.mjs.map
