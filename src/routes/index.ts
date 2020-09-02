import { Router } from 'express';

import matchesRouter from './matches.routes';

const routes = Router();

routes.use('/matches', matchesRouter);

export default routes;
