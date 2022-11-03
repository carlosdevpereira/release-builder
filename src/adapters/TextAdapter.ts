import * as fs from 'node:fs';

const VERSION_FILE = 'version.txt';

export class TextAdapter {
  static getVersion(): string {
    const version = fs.readFileSync(VERSION_FILE, 'utf-8');
    if (!version) throw new Error('Version file "version.txt" not found!');

    return version;
  }

  static setVersion(version: string): void {
    fs.writeFileSync(VERSION_FILE, version);
  }
}

export default TextAdapter;
