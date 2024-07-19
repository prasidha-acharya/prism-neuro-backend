import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';
interface IHandler {
  deletePatientByAdminController: controllers.DeletePatientByAdminController;
}

export const adminPatientRoutesHandler = (
  { deletePatientByAdminController }: IHandler,
  adminAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.delete(
    '/admin/delete-patient/:patientId',
    adminAuthorizer.authorize,
    deletePatientByAdminController.invoke.bind(deletePatientByAdminController)
    /*
          #swagger.security = [{
                "bearerAuth": []
        }]
          #swagger.tags = ['Admin']
          #swagger.summary = 'Delete user'
          #swagger.description = 'End point to delete user'
          #swagger.responses[200]
        */
  );

  return router;
};
