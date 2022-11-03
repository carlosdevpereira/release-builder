import { execSync } from 'node:child_process';
import VersionConfig from './config/VersionConfig';

export class Tags {
  static async getLatest() {
    execSync(`git fetch --all --tags`);

    const tag = execSync(
      `git tag --sort=-taggerdate -l "v*.*.*${VersionConfig.suffix}" | head -n 1`
    ).toString();

    return tag;
  }
}

export default Tags;
