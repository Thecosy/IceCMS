import { useDollarGet, useFetchPost } from "../service/useDollarFetchRequest";

/**
 * @description 获取所有标签
 * @returns Promise<Tag[]>
 */
export const getAllTag = (): Promise<Tag[]> => {
  return useDollarGet('Tag/getAllTag');
};
