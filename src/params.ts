import { flags } from '@oclif/command';
import * as inquirer from 'inquirer';

export type Params = {
  appName: string;
  description: string;
  author: string;
  templateName: string;
};

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
    message: 'choose the app template',
    type: 'list',
    choices: ['minimal-typescript'],
  },
};

export const paramArgs = [{ name: 'appName', description: 'the app name' }];

export const paramFlags = {
  templateName: flags.string({
    char: 't',
    description: 'template to use',
  }),
  author: flags.string({
    char: 'a',
    description: 'author name',
  }),
  description: flags.string({
    description: 'app description',
  }),
};
