import * as fse from 'fs-extra';
import type { ParamsContext } from '../../params';

export async function copyFiles(context: ParamsContext): Promise<void> {
  const { baseDir, sourceDir, frameworkDir, targetDir } = context;

  await fse.copy(baseDir, targetDir);
  await fse.copy(sourceDir, targetDir);
  await fse.copy(frameworkDir, targetDir);
}
