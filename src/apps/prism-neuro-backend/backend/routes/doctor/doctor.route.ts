import { Router } from 'express';

interface IHandler {}
export const doctorRoutesHandler = ({}: IHandler, router: Router): Router => {
  router.post('/doctor/login');
  return router;
};
