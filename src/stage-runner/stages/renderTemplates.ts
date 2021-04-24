import { renderToFolder } from 'template-file';
import type { ParamsContext } from '../../params';

export async function renderTemplates(context: ParamsContext): Promise<void> {
  const { appName, author, description, targetDir } = context;

  // TODO: create PR on template-file
  await renderToFolder(`${targetDir}/*.*`, targetDir, {
    appName,
    author,
    description,
  });
  await renderToFolder(`${targetDir}/LICENSE`, targetDir, {
    appName,
    author,
    description,
  });
  await renderToFolder(`${targetDir}/src/*.*`, `${targetDir}/src`, {
    appName,
    author,
    description,
  });
}
