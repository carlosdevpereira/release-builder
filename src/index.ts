import './config';
import * as core from '@actions/core';
import Tags from './tags';
import Release from './release';
import Version from './version';
import Changelog from './changelog';
import GithubConfig from './config/GithubConfig';

async function run() {
  try {
    const latestVersion = Version.readFromFile();

    const latestTag = await Tags.getLatest();
    const commitsAfterTag = await Tags.getCommitsAfter(latestTag);
    const commitMessages = await Tags.getLastNMessages(commitsAfterTag.length);
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

    // Create a release branch based on the target branch defined as an input
    // Update package.json with that new version
    // Write to CHANGELOG.md
    // Commit changes to the created branch
    // Force push created branch
    // Check if PR exists, otherwise creates the PR
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
