import { execSync } from 'node:child_process';
import VersionConfig from './config/VersionConfig';

export class Tags {
  static async getLatest(): Promise<string> {
    execSync(`git fetch --all --tags`);

    const tag = execSync(
      `git tag --sort=-taggerdate -l "v*.*.*${VersionConfig.suffix}" | head -n 1`
    ).toString();

    return tag;
  }

  static async getCommitsAfterTag(tag: string): Promise<Array<string>> {
    const tagCommitHash = execSync(`git rev-list -n 1 ${tag}`)
      .toString()
      .replace(/\s/g, '');
    console.log('tag commit hash', tagCommitHash);

    const commits = execSync(`git rev-list ${tagCommitHash}..HEAD`).toString();
    console.log('commits', commits);

    return commits.split('\n').filter((len) => !!len);
  }

  static async getLastNCommitMessages(offset: number): Promise<Array<string>> {
    const messages = execSync(`git log -n ${offset} --pretty=format:%s`)
      .toString()
      .split('\n')
      .filter((len) => !!len);

    return messages;
  }
}

export default Tags;
