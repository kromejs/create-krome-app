import * as path from 'path';
import { Command, flags } from '@oclif/command';
import execa from 'execa';
import * as fse from 'fs-extra';
import * as inquirer from 'inquirer';
import { bold, underline } from 'kleur';
import ora from 'ora';
import { renderToFolder } from 'template-file';
import { Params, PROMPT_CONFIGS, paramArgs, paramFlags } from './params';

class CreateKromeApp extends Command {
  static description = 'Generate the krome starter app';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    force: flags.boolean({ char: 'f' }),
    ...paramFlags,
  };

  static args = [...paramArgs];

  async run(): Promise<void> {
    const params = await this._getParams();
    const { appName, templateName } = params;

    const templateDir = path.resolve(__dirname, '../templates');
    const sourceDir = path.resolve(templateDir, templateName);
    const targetDir = path.resolve('.', appName);

    this.log('');
    const spinner = ora({ text: 'Copy files', indent: 2 }).start();
    await renderToFolder(`${sourceDir}/*.*`, targetDir, params);
    await fse.copy(`${templateDir}/_dotfiles`, targetDir);
    spinner.succeed();

    spinner.text = 'Install dependencies';
    spinner.start();
    await execa('yarn', [], { cwd: targetDir, stdio: 'inherit' });
    spinner.succeed();

    this.log('');
    this.log(bold(underline('Quickstart')));
    this.log('');
    this.log(`  cd ${appName}`);
    this.log(`  yarn start`);
    this.log('');
  }

  /**
   * Collect all the required information from args, flags, or prompt
   */
  async _getParams(): Promise<Params> {
    const {
      args,
      flags: { author = '', description = '', templateName = '' },
    } = this.parse(CreateKromeApp);

    const params: Params = {
      appName: args.appName,
      author,
      description,
      templateName,
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
