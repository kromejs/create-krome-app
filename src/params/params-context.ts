import * as path from 'path';
import type { Params } from './interfaces';

export class ParamsContext implements Params {
  static create(): ParamsContext {
    return new ParamsContext();
  }

  appName = '';
  description = '';
  author = '';
  templateName = '';
  framework = '';
  doInstall = true;

  templateDir = path.resolve(__dirname, '../templates');
  baseDir = path.resolve(this.templateDir, '_base');

  get sourceDir(): string {
    return path.resolve(this.templateDir, this.templateName);
  }

  get frameworkDir(): string {
    return path.resolve(this.templateDir, this.framework);
  }

  get targetDir(): string {
    return path.resolve('.', this.appName);
  }
}
