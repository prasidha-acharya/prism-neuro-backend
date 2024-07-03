import { NextFunction, Request, Response, Router } from 'express';

export const testRouteHandlers = (router: Router): Router => {
  router.get(
    '/test',
    (_req: Request, res: Response, next: NextFunction) => {
      try {
        res.send('Ok');
      } catch (error) {
        next(error);
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
