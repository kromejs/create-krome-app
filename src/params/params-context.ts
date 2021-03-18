import * as path from 'path';
import { Params } from './interfaces';

export class ParamsContext implements Params {
  static create(): ParamsContext {
    return new ParamsContext();
  }

  appName = '';
  description = '';
  author = '';
  templateName = '';

  templateDir = path.resolve(__dirname, '../../templates');

  get sourceDir(): string {
    return path.resolve(this.templateDir, this.templateName);
  }

  get targetDir(): string {
    return path.resolve('.', this.appName);
  }
}
