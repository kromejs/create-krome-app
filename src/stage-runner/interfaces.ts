import type { ParamsContext } from '../params';

export interface Stage {
  label: string;
  callback: (context: ParamsContext) => Promise<unknown>;
  shouldRun?: (context: ParamsContext) => boolean;
}
