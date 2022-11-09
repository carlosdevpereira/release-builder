import { execSync } from 'child_process';
import Changelog from './changelog';
import Config from './config';
import GithubConfig from './config/GithubConfig';
import ReleaseConfig from './config/ReleaseConfig';
import Git from './git';
import Release from './release';
import GithubService, { Octokit } from './services/GithubService';
import Version from './version';

type ActionConfig = typeof Config;

const RELEASE_BRANCH_NAME_BASE = 'release-builder--';

export class Action {
  config: ActionConfig;

  release?: Release;

  changelog?: Changelog;

  constructor() {
    this.config = Config;

    this.setupGit();
    this.fetchFullHistory();
  }

  public buildRelease() {
    const latestVersion = Version.readFromFile();

    const latestTag = Git.getLatestTag(ReleaseConfig.suffix);
    const latestTagHash = Git.getTagCommitHash(latestTag);
    const commitsSinceTag = Git.listCommitsSince(latestTagHash);
    const commitMessages = Git.listLatestNCommitMessages(
      commitsSinceTag.length
    );

    this.release = new Release(latestVersion, commitMessages);

    return this;
  }

  public buildChangelog() {
    if (!this.release) {
      throw new Error('Cannot build a changelog without a release!');
    }

    this.changelog = new Changelog();
    this.changelog.setCurrentVersion(this.release.latest);
    this.changelog.setNextVersion(this.release.nextVersion);
    this.changelog.setRepositoryUrl(
      `https://github.com/${this.config.github.repository.owner}/${this.config.github.repository.name}/compare/${this.release.latest}..${this.release.nextVersion}`
    );
    this.changelog.buildLog(this.release.messages);
    this.changelog.save();

    return this;
  }

  public updateRepositoryVersion() {
    if (!this.release) {
      throw new Error('Cannot update version without a new release!');
    }

    new Version(this.release.nextVersion).save();

    return this;
  }

  public createReleaseBranch() {
    if (!this.release) {
      throw new Error('Cannot create release branch without a release!');
    }

    Git.checkoutBranch(RELEASE_BRANCH_NAME_BASE + this.release.nextVersion);

    return this;
  }

  public commitAvailableChanges() {
    if (!this.release) {
      throw new Error('Cannot commit changes without a release!');
    }

    Git.commitAvailableChanges(`🚀 Release ${this.release.nextVersion}`);

    return this;
  }

  public pushReleaseBranch() {
    if (!this.release) {
      throw new Error('Cannot push changes without a release!');
    }

    Git.forcePush(RELEASE_BRANCH_NAME_BASE + this.release.nextVersion);

    return this;
  }

  public async createReleasePullRequest() {
    if (!this.release) {
      throw new Error('Cannot create a pull request without a release!');
    }

    await GithubService.rest.pulls.create({
      owner: this.config.github.repository.owner,
      repo: this.config.github.repository.name,
      head: RELEASE_BRANCH_NAME_BASE + this.release.nextVersion,
      base: this.config.release.targetBranch,
      title: `🚀 Release ${this.release.nextVersion}`,
      body: this.changelog?.content
    });
  }

  // @private

  private setupGit() {
    execSync(`git config --global user.name "${GithubConfig.author.name}"`);
    execSync(`git config --global user.email "${GithubConfig.author.email}"`);
  }

  private fetchFullHistory() {
    execSync(`git fetch --all --tags --prune --unshallow`);
  }
}

export default Action;
