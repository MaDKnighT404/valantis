import md5 from 'md5';

export const generateAuthHeader = (password: string) => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  return md5(`${password}_${timestamp}`);
};
