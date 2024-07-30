import { NextFunction, Request, Response, Router } from 'express';
import { IAuthorizer } from '../../../../../contexts/shared/domain/model/authentication/authorizer';
import * as controllers from '../../controllers/index';

interface IHandler {
  userLogoutController: controllers.UserLogoutController;
  generateAccessTokenController: controllers.GenerateAccessTokenController;
  forgotPasswordController: controllers.ForgotPasswordController;
  changePasswordController: controllers.ChangePasswordController;
  resetPasswordController: controllers.ResetPasswordController;
  deleteAccountController: controllers.DeleteAccountController;
  getUserDetailController: controllers.GetUserDetailController;
}

export const userRoutesHandler = (
  {
    userLogoutController,
    generateAccessTokenController,
    deleteAccountController,
    forgotPasswordController,
    changePasswordController,
    resetPasswordController,
    getUserDetailController
  }: IHandler,
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
        #swagger.description="Get access token"
        #swagger.description="End point "
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/refresTokenResponse"
          }
        }
        */
  );

  router.post(
    '/logout',
    userAuthorizer.authorize,
    userLogoutController.invoke.bind(userLogoutController)
    /*
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.tags = ['User']
        #swagger.summary = "Logout"
        #swagger.description = "End point to logout"
        #swagger.responses[200] = {
          schema: {
            $ref: "#/components/schemas/successReponse"
          }
        }
        */
  );

  router.post(
    '/forgot-password',
    forgotPasswordController.invoke.bind(forgotPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.summary = "Generate otp to reset password"
        #swagger.description = "End point to generate otp for changing password for all user"
        #swagger.responses[200]
           #swagger.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" },
                }
              }
            }
          }
        }
        */
  );

  router.post(
    '/reset-password',
    resetPasswordController.validate,
    resetPasswordController.invoke.bind(resetPasswordController)
    /*
        #swagger.tags = ['User']
        #swagger.summary = "Reset Password"
        #swagger.description = "End point to reset password"
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
        #swagger.summary = "Change password"
        #swagger.description = "End point to change password for all users "
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

  router.put(
    '/delete-account',
    userAuthorizer.authorize,
    deleteAccountController.invoke.bind(deleteAccountController)
    /*
        #swagger.tags = ['User']
        #swagger.summary = "Change password"
        #swagger.description = "End point to change password for all users "
        #swagger.security = [{
              "bearerAuth": []
            }]

           #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["password"],
            properties: {
              password: { type: "string", minLength: 6 },
            }
          }
        }
      }
    }
      #swagger.responses[201]  = {
      schema: {
        $ref: "#/components/schemas/successReponse"
      }
    }
        */
  );

  router.get(
    '/user-detail',
    userAuthorizer.authorize,
    getUserDetailController.invoke.bind(getUserDetailController)

    /*
        #swagger.tags = ['User']
        #swagger.description="Get user detail"
        #swagger.description="End point to fetch user detail "
        #swagger.security = [{
              "bearerAuth": []
            }]
        #swagger.responses[200] 
        */
  );

  return router;
};
