import * as core from '@actions/core';

export default {
  /** What type of project the action is running on (node/text/...) */
  type: core.getInput('release-type', { required: true }),

  /** Defines if the action should generate a pre release or not */
  isPreRelease: core.getInput('pre-release', { required: false }) === 'true',

  /** Defines what branch will be the target of release pull requests */
  targetBranch: core.getInput('target-branch', { required: true }),

  validCommitTypes: [
    'feat',
    'feature',
    'fix',
    'bugfix',
    'test',
    'docs',
    'chore',
    'maintenance',
    'refactor',
    'build',
    'style',
    'ci',
    'perf',
    'performance'
  ]
};
