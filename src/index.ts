import { Command, flags } from '@oclif/command';
import { renderToFolder } from 'template-file';
import * as path from 'path';
import * as fse from 'fs-extra';
import ora from 'ora';

class CreateKromeApp extends Command {
  static description = 'Generate the krome starter app';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    templateName: flags.string({ char: 't', required: true, description: 'template to use' }),
    force: flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'APP_NAME', required: true, description: 'the app name' }];

  async run() {
    const { args, flags } = this.parse(CreateKromeApp);

    const appName = args['APP_NAME'];
    const templateDir = path.resolve(__dirname, '../templates');
    const sourceDir = path.resolve(templateDir, flags.templateName);
    const targetDir = path.resolve('.', appName);
    const data = {
      app: {
        name: appName,
        description: '',
      },
    };

    const spinner = ora({ text: 'Copy files', indent: 2 }).start();
    await renderToFolder(`${sourceDir}/*.*`, targetDir, data);
    await fse.copy(`${templateDir}/_dotfiles`, targetDir);
    spinner.succeed();
  }
}

export = CreateKromeApp;
