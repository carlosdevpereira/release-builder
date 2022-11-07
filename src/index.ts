import './config';
import * as core from '@actions/core';
import Tags from './tags';
import Release from './release';

async function run() {
  try {
    const latestTag = await Tags.getLatest();
    const commitsAfterTag = await Tags.getCommitsAfterTag(latestTag);
    const commitMessages = await Tags.getLastNCommitMessages(
      commitsAfterTag.length
    );
    const release = new Release(commitMessages);

    console.log('Latest tag: ', latestTag);
    console.log('Commits after tag: ', commitsAfterTag);
    console.log('Next release version', release.version);
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
