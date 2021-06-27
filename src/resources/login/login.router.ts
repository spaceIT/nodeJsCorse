import express, { Router, Request, Response } from 'express';
import { promiseHandler, HTTP_STATUS, FORBIDDEN } from '../../utils/router.helpers';
import { getAuthToken } from './login.service';

const router: Router = express.Router();

router.route('/').post(
  promiseHandler(
    async (req: Request, res: Response): Promise<void> => {
      const token = await getAuthToken(req.body);

      if (token) {
        res.status(HTTP_STATUS.OK).json({ token });
      } else {
        res.status(HTTP_STATUS.FORBIDDEN).json({ message: FORBIDDEN });
      }
    }
  )
);

export default router;