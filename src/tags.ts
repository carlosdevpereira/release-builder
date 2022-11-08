import { execSync } from 'node:child_process';
import ReleaseConfig from './config/ReleaseConfig';

export class Tags {
  static async getLatest(): Promise<string> {
    execSync(`git fetch --all --tags`);

    const tag = execSync(
      `git tag --sort=-taggerdate -l "v*.*.*${ReleaseConfig.suffix}" | head -n 1`
    ).toString();

    return tag;
  }

  static async getCommitsAfter(tag: string): Promise<Array<string>> {
    execSync(`git fetch --prune --no-recurse-submodules --unshallow`);

    const tagCommitHash = execSync(`git rev-list -n 1 ${tag}`)
      .toString()
      .replace(/\s/g, '');

    const commits = execSync(`git rev-list ${tagCommitHash}..HEAD`)
      .toString()
      .split('\n')
      .filter((len) => !!len);

    return commits;
  }

  static async getLastNMessages(offset: number): Promise<Array<string>> {
    const messages = execSync(
      `git log -n ${offset} --pretty=format:"%s (%cn <%ce>) (%h)"`
    )
      .toString()
      .split('\n')
      .filter((len) => !!len);

    return messages;
  }
}

export default Tags;
