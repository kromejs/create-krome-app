import { Command, flags } from '@oclif/command';

class CreateKromeApp extends Command {
  static description = 'Generate the krome starter app';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' }),
  };

  static args = [{ name: 'appName', required: true, description: 'the app name' }];

  async run() {
    const { args, flags } = this.parse(CreateKromeApp);

    const name = flags.name ?? 'world';
    this.log(`hello ${name} from ./src/index.ts`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}

export = CreateKromeApp;
