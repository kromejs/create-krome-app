import execa from 'execa';
import * as fse from 'fs-extra';
import type { ParamsContext } from '../../params';

export async function initVersionControl(
  context: ParamsContext,
): Promise<void> {
  const { targetDir } = context;
  const execaOption: execa.Options = { cwd: targetDir };

  if (
    fse.pathExistsSync(`${targetDir}/.npmignore`) &&
    !fse.pathExistsSync(`${targetDir}/.gitignore`)
  ) {
    await fse.move(`${targetDir}/.npmignore`, `${targetDir}/.gitignore`);
  }
  await execa('git', ['init'], execaOption);
  await execa('git', ['add', '-A'], execaOption);
  await execa(
    'git',
    ['commit', '-m', 'Initialize by create-krome-app'],
    execaOption,
  );
}
