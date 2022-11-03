import './config';
import * as core from '@actions/core';
import Tags from './tags';
import GithubConfig from './config/GithubConfig';

async function run() {
  try {
    console.log(
      'Latest tag: ',
      await Tags.getLatestForBranch(GithubConfig.branch)
    );
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
