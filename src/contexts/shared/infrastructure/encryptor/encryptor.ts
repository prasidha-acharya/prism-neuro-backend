import * as bcrypt from 'bcrypt';

export const hashPassword = (string: string): string => {
  const hash = bcrypt.hashSync(string, Number(process.env.SALT_ROUNDS || '10'));
  return hash;
};

export const comparePassword = (string: string, hash: string): boolean => {
  return bcrypt.compareSync(string, hash);
};

export const generatePassword = (): string => {
  const length = 8;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?';

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
