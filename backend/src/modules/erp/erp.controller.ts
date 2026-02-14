import { Request, Response } from 'express';
import { DashboardMetric, CostCenter, DashboardData, ApiResponse } from '../../shared/types';

// Mock data
const metrics: DashboardMetric[] = [
  {
    id: '1',
    metricType: 'revenue',
    value: 4600000,
    period: '2024-Q1',
    updatedAt: '2024-03-31T00:00:00Z',
  },
  {
    id: '2',
    metricType: 'expenses',
    value: 3100000,
    period: '2024-Q1',
    updatedAt: '2024-03-31T00:00:00Z',
  },
  {
    id: '3',
    metricType: 'profit',
    value: 1500000,
    period: '2024-Q1',
    updatedAt: '2024-03-31T00:00:00Z',
  },
];

const costCenters: CostCenter[] = [
  { id: '1', code: 'CC-IT-001', name: 'Information Technology', type: 'indirect' },
  { id: '2', code: 'CC-HR-001', name: 'Human Resources', type: 'admin' },
  { id: '3', code: 'CC-SALES-001', name: 'Sales Department', type: 'direct' },
  { id: '4', code: 'CC-MKT-001', name: 'Marketing', type: 'direct' },
];

export const getDashboardData = (_req: Request, res: Response): void => {
  const totalRevenue = metrics.find(m => m.metricType === 'revenue')?.value || 0;
  const totalExpenses = metrics.find(m => m.metricType === 'expenses')?.value || 0;
  const netProfit = metrics.find(m => m.metricType === 'profit')?.value || 0;
  
  const data: DashboardData = {
    metrics,
    costCenters,
    summary: {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin: totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
    },
  };
  
  const response: ApiResponse<DashboardData> = {
    success: true,
    data,
  };
  
  res.json(response);
};
