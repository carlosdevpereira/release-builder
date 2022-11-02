import * as fs from 'node:fs';
import PackageJson from '@/@types/PackageJson';

const VERSION_FILE = './package.json';

export default class NodeAdapter {
  version(): string {
    const versionFileString = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!versionFileString)
      throw new Error('Version file "package.json" not found!');

    const packageJson = JSON.parse(versionFileString) as PackageJson;

    return packageJson.version;
  }

  setVersion(version: string): void {
    const versionFileString = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!versionFileString) throw new Error('Package.json not found!');

    const packageJson = JSON.parse(versionFileString);
    packageJson.version = version;

    fs.writeFileSync(VERSION_FILE, JSON.stringify(packageJson));
  }
}
