import { Command, flags } from '@oclif/command';
import { renderToFolder } from 'template-file';
import * as path from 'path';
import * as fse from 'fs-extra';

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

    await renderToFolder(`${sourceDir}/*.*`, targetDir, data);
    fse.copySync(`${templateDir}/_dotfiles`, targetDir);
  }
}

export = CreateKromeApp;
