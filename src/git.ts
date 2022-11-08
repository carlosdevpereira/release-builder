import { execSync } from 'child_process';

export class Git {
  static fetchAll() {
    execSync('git fetch --all --tags');
    execSync(`git fetch --prune --no-recurse-submodules --unshallow`);
  }

  static getLatestTag(suffix: string) {
    const gitCmd = `git tag --sort=-taggerdate -l "v*.*.*${suffix}"`;

    return execSync(`${gitCmd} | head -n 1`).toString();
  }

  static getTagCommitHash(tag: string) {
    return execSync(`git rev-list -n 1 ${tag}`).toString().replace(/\s/g, '');
  }

  static listCommitsSince(sinceHash: string) {
    return execSync(`git rev-list ${sinceHash}..HEAD`)
      .toString()
      .split('\n')
      .filter((len) => !!len);
  }

  static listCommitMessages(offset: number) {
    return execSync(`git log -n ${offset} --pretty=format:"%s (%h) (%as)"`)
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
