import { Command, flags } from '@oclif/command';
import execa from 'execa';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import { bold, underline } from 'kleur';
import ora from 'ora';
import { renderToFolder } from 'template-file';
import {
  Params,
  ParamsContext,
  PROMPT_CONFIGS,
  paramArgs,
  paramFlags,
} from './params';

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
  spinner = ora({ indent: 2 });

  async run(): Promise<void> {
    await this.initContext();

    this.log('');

    await this.copyFiles();
    this.log('');

    await this.renderTemplates();
    this.log('');

    if (this.context.doInstall) {
      await this.installDependencies();
      this.log('');
    }

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

  async copyFiles(): Promise<void> {
    const { baseDir, sourceDir, frameworkDir, targetDir } = this.context;
    this.spinner.text = 'Copy files';

    await fse.copy(baseDir, targetDir);
    await fse.copy(sourceDir, targetDir);
    await fse.copy(frameworkDir, targetDir);

    this.spinner.succeed();
  }

  async renderTemplates(): Promise<void> {
    const { appName, author, description } = this.context;
    this.spinner.text = 'Render templates';

    // TODO: create PR on template-file
    await renderToFolder(
      `${this.context.targetDir}/*.*`,
      this.context.targetDir,
      { appName, author, description },
    );
    await renderToFolder(
      `${this.context.targetDir}/LICENSE`,
      this.context.targetDir,
      { appName, author, description },
    );
    await renderToFolder(
      `${this.context.targetDir}/src/*.*`,
      `${this.context.targetDir}/src`,
      { appName, author, description },
    );
    this.spinner.succeed();
  }

  async installDependencies(): Promise<void> {
    await execa('yarn', [], { cwd: this.context.targetDir, stdio: 'inherit' });
    this.spinner.text = 'Install dependencies';
    this.spinner.succeed();
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
}

export = CreateKromeApp;
