import { getAssetPath } from '../config';

export const useAssetPath = () => {
  return {
    getPath: getAssetPath
  };
};