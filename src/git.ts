import { execSync } from 'child_process';

export class Git {
  static getLatestTag(suffix: string) {
    const gitCmd = `git tag --sort=-taggerdate -l "v*.*.*${suffix}"`;

    return execSync(`${gitCmd} | head -n 1`).toString();
  }

  static getTagCommitHash(tag: string) {
    const gitCmd = `git rev-list -n 1 ${tag}`;

    return execSync(gitCmd).toString().replace(/\s/g, '');
  }

  static listCommitsSince(tag: string) {
    const gitCmd = `git rev-list ${tag}..HEAD`;

    return execSync(gitCmd)
      .toString()
      .split('\n')
      .filter((len) => !!len);
  }

  static listLatestNCommitMessages(offset: number) {
    const gitCmd = `git log -n ${offset} --pretty=format:"%s (%h) (%as)"`;

    return execSync(gitCmd)
      .toString()
      .split('\n')
      .filter((len) => !!len);
  }

  static checkoutBranch(name: string) {
    execSync(`git branch -D "${name}" &>/dev/null || true`);

    execSync(`git checkout -b ${name}`);

    return this;
  }

  static commitAvailableChanges(message: string) {
    execSync('git add .');

    execSync(`git commit -m "${message}"`);

    return this;
  }

  static forcePush(branchName: string) {
    execSync(`git push origin ${branchName} -f`);

    return this;
  }
}

export default Git;
