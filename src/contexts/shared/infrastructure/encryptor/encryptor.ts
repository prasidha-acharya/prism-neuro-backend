import * as bcrypt from 'bcrypt';

export const hashPassword = (string: string): string => {
  const hash = bcrypt.hashSync(string, Number(process.env.SALT_ROUNDS || '10'));
  return hash;
};

export const comparePassword = (string: string, hash: string): boolean => {
  return bcrypt.compareSync(string, hash);
};
