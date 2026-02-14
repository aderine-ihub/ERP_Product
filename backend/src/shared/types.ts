import { Request, Response, NextFunction } from 'express';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CostAllocation {
  id: string;
  name: string;
  sourceCostCenter: string;
  targetCostCenter: string;
  allocationKey: 'percentage' | 'fixed' | 'activity_based';
  percentage: number;
  fixedAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfitabilityReport {
  id: string;
  period: string;
  segment: string;
  revenue: number;
  directCosts: number;
  allocatedCosts: number;
  margin: number;
  marginPercent: number;
}

export interface DashboardMetric {
  id: string;
  metricType: 'revenue' | 'expenses' | 'profit' | 'cash_flow';
  value: number;
  period: string;
  updatedAt: string;
}

export interface CostCenter {
  id: string;
  code: string;
  name: string;
  type: 'direct' | 'indirect' | 'admin';
  parentId?: string;
}

export interface DashboardData {
  metrics: DashboardMetric[];
  costCenters: CostCenter[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
  };
}
