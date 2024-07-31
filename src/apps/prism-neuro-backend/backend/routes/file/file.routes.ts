import { Router } from 'express';
import httpStatus from 'http-status';
import multer from 'multer';
import { JWTAdminAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/admin.authorizer';
import { JWTUserAuthorizer } from '../../../../../contexts/shared/infrastructure/authorizer/user.authorizer';
import { regex } from '../../../../../contexts/shared/infrastructure/utils/constant';
import { getCurrentTimeStamp } from '../../../../../contexts/shared/infrastructure/utils/date';
import * as controller from '../../controllers/index';

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'public/images/mode');
  },
  filename(req, file, callback) {
    const fileInfo = file.originalname.split('.');

    const fileExtension = fileInfo.pop();

    const fileName = fileInfo.pop()?.replace(regex, '_');

    const key = `${fileName}_${getCurrentTimeStamp()}.${fileExtension}`;

    callback(null, key);
  }
});

export const imageUpload = multer();

const uploadImageToPublic = multer({ storage: storage });

interface IHandler {
  uploadModeFilesController: controller.UploadModeFilesController;
  getModeFilesController: controller.GetModeFilesController;
  deleteFilesController: controller.DeleteFilesController;
  uploadProfileImageController: controller.UploadProfileImageController;
}

export const fileRoutesHandler = (
  { getModeFilesController, deleteFilesController, uploadProfileImageController }: IHandler,
  adminAuthorizer: JWTAdminAuthorizer,
  userAuthorizer: JWTUserAuthorizer,
  router: Router
): Router => {
  router.post(
    '/upload-profile',
    userAuthorizer.authorize,
    imageUpload.single('file'),
    uploadProfileImageController.validate,
    uploadProfileImageController.invoke.bind(uploadProfileImageController)

    /*
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags =["File"]
    #swagger.requestBody = {
    content:{
    "multipart/form-data" :{
    schema:{
    type:"object",
    required:["file"],
    properties:{
    file:{
    type:"string",
    format:"binary"
    },
    uploadFor:{
    enum:["PATIENT","ADMIN","PHYSIO"]
    }
    }
    }
    }
    }
    }
    #swagger.responses[200] = {
  
    }
    */
  );

  // router.post(
  //   '/admin/upload-files',
  //   adminAuthorizer.authorize,
  //   imageUpload.array('files', 25),
  //   uploadModeFilesController.validate,
  //   uploadModeFilesController.invoke.bind(uploadModeFilesController)
  //   /*
  //     #swagger.security = [{
  //           "bearerAuth": []
  //   }]
  //   #swagger.tags = ['File']
  //   #swagger.requestBody = {
  //   content:{
  //   "multipart/form-data": {
  //   schema:{
  //   type: "object",
  //   required: ["files"],
  //   properties:{
  //   files:{
  //   type:"array",
  //   items:{
  //   type:"string",
  //   format:"binary"
  //   }
  //   },
  //   type:{enum :["LEFT_RIGHT_MODE","VISUAL_BALANCE_MODE"]},
  //   isLeftMode:{type:"boolean"},
  //   isRightMode:{type:"boolean"}
  //   }
  //   }
  //   }
  //   }
  //   }
  //    */
  // );

  router.get(
    '/admin/files',
    adminAuthorizer.authorize,
    getModeFilesController.invoke.bind(getModeFilesController)
    /* 
    #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['File']
    #swagger.summary = "Get files"
     #swagger.parameters['type'] = {
    in:"query",
    type:"string",
    required:"true",
    schema:{
    '@enum':["LEFT_RIGHT_MODE","VISUAL_BALANCE_MODE"]
    }
    }
    #swagger.parameters['isLeftMode'] = {
    in:"query",
    type:"boolean",
    }
    #swagger.parameters['isRightMode'] = {
    in:"query",
    type:"boolean",

    }

    */
  );

  router.post(
    '/delete/file',
    userAuthorizer.authorize,
    deleteFilesController.invoke.bind(deleteFilesController)
    /*
    #swagger.security = [{
      "bearerAuth": []
    }] 
  #swagger.tags = ['File']
  #swagger.summary = 'Delete file'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["key"],
            properties: {
            key:{type:"string"}
            }
          }
        }
      }
    }
  }
  */
  );

  router.post(
    '/upload-modes',
    uploadImageToPublic.array('files', 25),
    (__, res, ___) => {
      res.status(httpStatus.OK).json({
        status: 'SUCCESS'
      });
    }
    /*
      #swagger.security = [{
            "bearerAuth": []
    }] 
    #swagger.tags = ['File']
    #swagger.requestBody = {
    content:{
    "multipart/form-data": {
    schema:{
    type: "object",
    required: ["files"],
    properties:{
    files:{
    type:"array",
    items:{
    type:"string",
    format:"binary"
    }
    },
    }
    }
    }
    }
    }
     */
  );

  return router;
};
