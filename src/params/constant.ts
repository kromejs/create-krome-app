import { flags } from '@oclif/command';
import type * as inquirer from 'inquirer';
import type { Params } from './interfaces';

export const PROMPT_CONFIGS: Record<
  keyof Params,
  inquirer.QuestionCollection
> = {
  appName: {
    name: 'appName',
    message: 'app name',
    type: 'input',
    validate: (v: string) => !!v || 'can not be empty',
  },
  description: {
    name: 'description',
    message: 'app description',
    type: 'input',
    default: '',
  },
  author: {
    name: 'author',
    message: 'author name',
    type: 'input',
    default: '',
  },
  templateName: {
    name: 'templateName',
    message: 'template to use',
    type: 'list',
    choices: [
      {
        name: 'load content script automatically',
        value: 'autoload',
        short: 'autoload',
      },
      {
        name: 'load content script manually',
        value: 'manually-load',
        short: 'manually-load',
      },
    ],
  },
  framework: {
    name: 'framework',
    message: 'framework to use',
    type: 'list',
    choices: [
      {
        name: 'None',
        value: '_blank',
        short: 'None',
      },
      {
        name: 'Svelte',
        value: '_svelte',
        short: 'Svelte',
      },
    ],
  },
  doInstall: {
    name: 'doInstall',
    message: 'install dependencies',
    type: 'confirm',
    default: true,
  },
};

export const paramArgs = [{ name: 'appName', description: 'the app name' }];

export const paramFlags = {
  templateName: flags.string({
    char: 't',
    description: 'template to use',
  }),
  framework: flags.string({
    char: 'f',
    description: 'framework to use',
  }),
  author: flags.string({
    char: 'a',
    description: 'author name',
  }),
  description: flags.string({
    description: 'app description',
  }),
  doInstall: flags.boolean({
    description: 'install dependencies',
  }),
};
