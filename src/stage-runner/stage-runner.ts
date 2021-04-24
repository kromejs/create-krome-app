import type { ParamsContext } from '../params';
import type { Stage } from './interfaces';
import { copyFiles, renderTemplates, installDependencies } from './stages';

export class StageRunner {
  beforeEach: (stage: Stage) => void = () => null;
  afterEach: (stage: Stage) => void = () => null;

  private stages: Stage[] = [];

  constructor(private context: ParamsContext) {
    this.initStages();
  }

  async runAll(): Promise<void> {
    for (const stage of this.stages) {
      const shouldRun = stage.shouldRun || (() => true);
      this.beforeEach(stage);
      if (shouldRun(this.context)) {
        await stage.callback(this.context);
      }
      this.afterEach(stage);
    }
  }

  private initStages() {
    this.stages = [
      {
        label: 'Copy files',
        callback: copyFiles,
      },
      {
        label: 'Render templates',
        callback: renderTemplates,
      },
      {
        label: 'Install dependencies',
        callback: installDependencies,
        shouldRun: () => this.context.doInstall,
      },
    ];
  }
}
