import { NextFunction, Request, Response, Router } from 'express';

export const testRouteHandlers = (router: Router) => {
  router.get(
    '/test',
    (req: Request, res: Response, nextFunction: NextFunction) => {

      try {
        
      } catch (error) {
        
      }
    }
    /* 
   #swagger.tags = ['tests']
   #swagger.summary = 'Some summary...'
   #swagger.description = 'Some description...'
  #swagger.responses[200]
  */
  );

  return router;
};
