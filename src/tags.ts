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
    const headCommitHash = GithubConfig.head;
    const tagCommitHash = execSync(`git rev-list -n 1 ${tag}`)
      .toString()
      .replace(/\s/g, '');

    const commits = execSync(
      `git rev-list ${tagCommitHash}..${headCommitHash}`
    ).toString();

    return commits.split('\n');
  }
}

export default Tags;
