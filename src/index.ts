import { Command, flags } from '@oclif/command';
import * as inquirer from 'inquirer';
import { bold, underline } from 'kleur';
import ora from 'ora';
import {
  Params,
  ParamsContext,
  PROMPT_CONFIGS,
  paramArgs,
  paramFlags,
} from './params';
import { StageRunner, Stage } from './stage-runner';

class CreateKromeApp extends Command {
  static description = 'Generate the krome starter app';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    ...paramFlags,
  };

  static args = [...paramArgs];

  // TODO: better way to inject {@link ParamsContext}
  context: ParamsContext = ParamsContext.create();
  stageRunner: StageRunner = new StageRunner(this.context);
  spinner = ora({ indent: 2 });

  async run(): Promise<void> {
    await this.initContext();
    this.configStageRunner();

    this.log('');

    await this.stageRunner.runAll();

    this.log('');
    this.log(bold(underline('Quickstart')));
    this.log('');
    this.log(`  cd ${this.context.appName}`);
    this.log(`  yarn start`);
    this.log('');
  }

  async initContext(): Promise<void> {
    const params = await this.getParams();
    Object.assign(this.context, params);
  }

  /**
   * Collect all the required information from args, flags, or prompt
   */
  async getParams(): Promise<Params> {
    const {
      args,
      flags: {
        author = '',
        description = '',
        templateName = '',
        framework = '',
        doInstall,
      },
    } = this.parse(CreateKromeApp);

    const params: Params = {
      appName: args.appName,
      author,
      description,
      templateName,
      framework,
      doInstall,
    };

    const promptConfigs = (Object.entries(params) as [
      keyof Params,
      inquirer.QuestionCollection,
    ][])
      .filter(([, v]) => !v)
      .map(([k]) => PROMPT_CONFIGS[k]);

    const safeParams = await inquirer.prompt(promptConfigs);

    return {
      ...params,
      ...safeParams,
    };
  }

  configStageRunner(): void {
    this.stageRunner.beforeEach = (stage: Stage) => {
      this.spinner.text = stage.label;
    };

    this.stageRunner.afterEach = () => {
      this.spinner.succeed();
    };
  }
}

export = CreateKromeApp;
