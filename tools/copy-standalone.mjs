import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const webRoot = resolve('dist/web/browser');
await mkdir(resolve(webRoot, 'embed'), { recursive: true });
await mkdir(resolve(webRoot, 'examples/vanilla'), { recursive: true });
await copyFile(resolve('dist/web-component/investigation-board.js'), resolve(webRoot, 'embed/investigation-board.js'));
await copyFile(resolve('dist/web-component/investigation-board.js.map'), resolve(webRoot, 'embed/investigation-board.js.map'));
await copyFile(resolve('examples/vanilla-html/index.html'), resolve(webRoot, 'examples/vanilla/index.html'));
console.log('✓ Web Component et exemple autonome copiés dans le build Pages');
