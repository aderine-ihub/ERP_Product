import { Router } from 'express';
import * as controller from './papm.controller';

const router = Router();

// Cost Allocation routes
router.get('/cost-allocation', controller.getCostAllocations);
router.post('/cost-allocation', controller.createCostAllocation);

// Profitability Analysis routes
router.get('/profitability-analysis', controller.getProfitabilityReports);

export default router;
