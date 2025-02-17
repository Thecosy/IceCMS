import httpRequest from "../service/index";

/**
 * @description 关注某个用户
 * @param followerId 关注者ID
 * @param followingId 被关注者ID
 * @return Promise<any>
 */
export const tofollow = (followerId: string | number, followingId: string | number) => {
  return httpRequest.get<any>(`/follow/tofollow/${followerId}/${followingId}`);
};

/**
 * @description 取消关注某个用户
 * @param followerId 关注者ID
 * @param followingId 被关注者ID
 * @return Promise<any>
 */
export const unfollow = (followerId: string | number, followingId: string | number) => {
  return httpRequest.get<any>(`/follow/unfollow/${followerId}/${followingId}`);
};

/**
 * @description 获取某个用户的所有粉丝
 * @param followerId 用户ID
 * @return Promise<any>
 */
export const followers = (followerId: string | number) => {
  return httpRequest.get<any>(`/follow/followers/${followerId}`);
};
