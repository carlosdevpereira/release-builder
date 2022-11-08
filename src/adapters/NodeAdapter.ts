import * as fs from 'node:fs';
import PackageJson from '@/@types/PackageJson';

const VERSION_FILE = './package.json';

export class NodeAdapter {
  static getVersion(): string {
    const versionFileString = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!versionFileString)
      throw new Error('Version file "package.json" not found!');

    const packageJson = JSON.parse(versionFileString) as PackageJson;

    return packageJson.version;
  }

  static setVersion(version: string): void {
    const versionFileString = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!versionFileString) throw new Error('Package.json not found!');

    const packageJson = JSON.parse(versionFileString);
    packageJson.version = version;

    fs.writeFileSync(VERSION_FILE, JSON.stringify(packageJson, null, 2));
  }
}

export default NodeAdapter;
