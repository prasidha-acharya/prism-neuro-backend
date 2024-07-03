import { Router } from 'express';
import * as controllers from '../controllers';
import { physioRoutesHandler } from './admin/physio.routes';

export const masterRouter = (createDoctorController: controllers.CreateDoctorController): Router => {
  const apiRouter = Router();

  physioRoutesHandler({ createDoctorController }, apiRouter);

  return apiRouter;
};
