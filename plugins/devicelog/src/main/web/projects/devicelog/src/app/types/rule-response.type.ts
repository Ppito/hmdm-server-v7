import { TRuleDTO } from './rule-dto.type';

export type TRuleResponse = {
  logsPreservePeriod: number;
  id: number;
  customerId: number;
  identifier: string;
  common: boolean;
  rules: TRuleDTO[];
};
