import * as fs from 'node:fs';

const VERSION_FILE = 'version.txt';

export default class TextAdapter {
  version(): string {
    const version = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!version) throw new Error('Version file "version.txt" not found!');

    return version;
  }

  setVersion(version: string): void {
    fs.writeFileSync(VERSION_FILE, version);
  }
}
