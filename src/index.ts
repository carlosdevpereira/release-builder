import './config';
import * as core from '@actions/core';
import Tags from './tags';

async function run() {
  try {
    const latestTag = await Tags.getLatest();
    const commitsAfterTag = await Tags.getCommitsAfterTag(latestTag);

    console.log('Latest tag: ', latestTag);
    console.log('Commits after tag: ', commitsAfterTag);
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
