import execa from 'execa';
import type { ParamsContext } from '../../params';

export async function installDependencies(
  context: ParamsContext,
): Promise<void> {
  await execa('yarn', [], { cwd: context.targetDir, stdio: 'inherit' });
}
