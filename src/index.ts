import './config';
import * as core from '@actions/core';
import Release from './release';
import Version from './version';
import Changelog from './changelog';
import GithubConfig from './config/GithubConfig';
import Git from './git';
import ReleaseConfig from './config/ReleaseConfig';

async function run() {
  try {
    Git.fetchAll();

    const latestTag = Git.getLatestTag(ReleaseConfig.suffix);
    const latestTagCommit = Git.getTagCommitHash(latestTag);
    const commitsAfterTag = Git.listCommitsSince(latestTagCommit);
    const commitMessages = Git.listCommitMessages(commitsAfterTag.length);

    const latestVersion = Version.readFromFile();
    const release = new Release(latestVersion, commitMessages);

    // Generate the CHANGELOG of the release
    new Changelog()
      .setCurrentVersion(latestVersion)
      .setNextVersion(release.nextVersion)
      .setRepositoryUrl(
        `https://github.com/${GithubConfig.repository.owner}/${GithubConfig.repository.name}/compare/${latestVersion}..${release.nextVersion}`
      )
      .buildLog(commitMessages)
      .save();

    // Update project version file with the new version
    new Version(release.nextVersion).save();

    const commitMessage = `🚀 Release ${release.nextVersion}`;
    const releaseBranchName = `release-builder--${release.nextVersion}`;
    Git.checkoutBranch(releaseBranchName)
      .commitAvailableChanges(commitMessage)
      .forcePush(releaseBranchName);

    // Check if PR exists, otherwise creates the PR
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
