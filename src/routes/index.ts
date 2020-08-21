import { Router } from 'express';

import matchesRouter from './matches.routes';

const routes = Router();

routes.use('/data', matchesRouter);

export default routes;
