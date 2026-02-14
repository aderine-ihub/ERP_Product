import { Router } from 'express';
import * as controller from './erp.controller';

const router = Router();

router.get('/dashboard', controller.getDashboardData);

export default router;
