import './config';
import * as core from '@actions/core';
import Action from './action';

async function run() {
  try {
    new Action()
      .buildRelease()
      .buildChangelog()
      .updateRepositoryVersion()
      .createReleaseBranch()
      .commitAvailableChanges()
      .pushReleaseBranch()
      .createReleasePullRequest();
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
