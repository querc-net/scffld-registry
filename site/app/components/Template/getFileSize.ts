import { filesize } from 'filesize';

export const getFileSize = (content: string) => {
  return filesize(content.length, { round: 0 });
};
