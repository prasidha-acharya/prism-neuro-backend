import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from 'src/contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  userLogoutController: controllers.UserLogoutController;
  generateAccessTokenController: controllers.GenerateAccessTokenController;
  forgotPasswordController: controllers.ForgotPasswordController;
  changePasswordController: controllers.ChangePasswordController;
  resetPasswordController: controllers.ResetPasswordController;
}

export const userRoutesHandler = (
  { userLogoutController, generateAccessTokenController, forgotPasswordController, changePasswordController, resetPasswordController }: IHandler,
  userAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  refreshAuthorizer: IAuthorizer<Request, Response, NextFunction>,
  router: Router
): Router => {
  router.get(
    '/refresh',
    refreshAuthorizer.authorize,
    generateAccessTokenController.invoke.bind(generateAccessTokenController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/customerRefreshSchema"
          }
        }
        */
  );
  router.get(
    '/logout',
    userAuthorizer.authorize,
    userLogoutController.invoke.bind(userLogoutController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/customerRefreshSchema"
          }
        }
        */
  );
  router.post(
    '/forgot-password',
    forgotPasswordController.invoke.bind(forgotPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200]
        */
  );

  router.post(
    '/reset-password',
    resetPasswordController.invoke.bind(resetPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
   #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "otp", "newPassword", "confirmPassword"],
                properties: {
                  email: { type: "string", format: "email" },
                  otp: { type: "string", minLength: 5, description: "OTP must be at least 5 characters long." },
                  password: { type: "string", minLength: 6, description: "Password must be at least 6 characters long." },
                  confirmPassword: { type: "string", minLength: 6, description: "Must match the password." }
                }
              }
            }
          }
        }
        #swagger.responses[200]
        */
  );

  router.post(
    '/change-password',
    userAuthorizer.authorize,
    changePasswordController.invoke.bind(changePasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["oldPassword", "newPassword", "confirmPassword"],
                properties: {
                  oldPassword: { type: "string", minLength: 6, description: "The current password of the user." },
                  newPassword: { type: "string", minLength: 6, description: "The new password to be set." },
                  confirmPassword: { type: "string", minLength: 6, description: "The new password for confirmation, must match the new password." }
                }
              }
            }
          }
        }
        #swagger.responses[200]
        */
  );
  return router;
};
