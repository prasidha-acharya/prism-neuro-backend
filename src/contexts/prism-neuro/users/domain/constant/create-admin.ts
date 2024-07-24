import { ICreateAdmin } from '../interface/user-request.interface';

export const adminUser: ICreateAdmin = {
  email: 'admin@gmail.com',
  password: 'admin@@1',
  // userName: 'Prism Neuro',
  address: [{ address: 'Kathmandu,Nepal' }]
};

export const expiresAfter15Days = new Date(new Date().getTime() + 15 * 60 * 1000);
