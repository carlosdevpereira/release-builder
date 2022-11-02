import './config/Inputs';
import core from '@actions/core';
import TagService from './services/TagService';

async function run() {
  try {
    TagService.getLatestTag();
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
