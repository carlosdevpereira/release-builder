import { execSync } from 'node:child_process';
import GithubConfig from './config/GithubConfig';
import VersionConfig from './config/VersionConfig';

export class Tags {
  static async getLatest() {
    execSync(`git fetch --all --tags`);

    const tag = execSync(
      `git tag --sort=-taggerdate -l "v*.*.*${VersionConfig.suffix}" | head -n 1`
    ).toString();

    return tag;
  }

  static async getCommitsAfterTag(tag: string): Promise<Array<string>> {
    const commitHash = execSync(`git rev-list -n 1 ${tag}`).toString();
    const commits = execSync(
      `git rev-list ${commitHash}..${GithubConfig.head}`
    ).toString();

    return commits.split('\n');
  }
}

export default Tags;
