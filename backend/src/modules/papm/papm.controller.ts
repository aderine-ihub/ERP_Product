import { Request, Response } from 'express';
import { CostAllocation, ProfitabilityReport, ApiResponse } from '../../shared/types';

// Mock data
const allocations: CostAllocation[] = [
  {
    id: '1',
    name: 'IT Cost Distribution',
    sourceCostCenter: 'CC-IT-001',
    targetCostCenter: 'CC-SALES-001',
    allocationKey: 'percentage',
    percentage: 30,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'HR Admin Allocation',
    sourceCostCenter: 'CC-HR-001',
    targetCostCenter: 'CC-MKT-001',
    allocationKey: 'activity_based',
    percentage: 25,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const reports: ProfitabilityReport[] = [
  {
    id: '1',
    period: '2024-Q1',
    segment: 'Product Line A',
    revenue: 1500000,
    directCosts: 900000,
    allocatedCosts: 150000,
    margin: 450000,
    marginPercent: 30.0,
  },
  {
    id: '2',
    period: '2024-Q1',
    segment: 'Product Line B',
    revenue: 2300000,
    directCosts: 1380000,
    allocatedCosts: 230000,
    margin: 690000,
    marginPercent: 30.0,
  },
];

export const getCostAllocations = (_req: Request, res: Response): void => {
  const response: ApiResponse<CostAllocation[]> = {
    success: true,
    data: allocations,
  };
  res.json(response);
};

export const createCostAllocation = (req: Request, res: Response): void => {
  const body = req.body;
  
  const newAllocation: CostAllocation = {
    id: Date.now().toString(),
    name: body.name,
    sourceCostCenter: body.sourceCostCenter,
    targetCostCenter: body.targetCostCenter,
    allocationKey: body.allocationKey,
    percentage: body.percentage,
    fixedAmount: body.fixedAmount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  allocations.push(newAllocation);
  
  const response: ApiResponse<CostAllocation> = {
    success: true,
    data: newAllocation,
  };
  res.status(201).json(response);
};

export const getProfitabilityReports = (req: Request, res: Response): void => {
  const period = req.query.period as string | undefined;
  
  let data = reports;
  if (period) {
    data = reports.filter(r => r.period === period);
  }
  
  const response: ApiResponse<ProfitabilityReport[]> = {
    success: true,
    data,
  };
  res.json(response);
};
