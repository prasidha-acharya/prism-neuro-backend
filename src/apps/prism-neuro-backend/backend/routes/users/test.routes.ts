import { NextFunction, Request, Response, Router } from 'express';

export const testRouteHandlers = (router: Router): Promise<void> => {
  router.get(
    '/test',

    (req: Request, res: Response, next: NextFunction) => {
      console.log(req.body, 'herererere');
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
