import * as core from '@actions/core';

/** Defines if the release is a pre-release or not */
const IS_PRE_RELEASE =
  core.getInput('pre-release', { required: false }) === 'true';

/** Defines the pre-release suffix (pre-release identifier) */
const SUFFIX = core.getInput('suffix');

export default {
  /** What type of project the action is running on (node/text/...) */
  type: core.getInput('release-type', { required: true }),

  /** Defines if the action should generate a pre release or not */
  isPreRelease: IS_PRE_RELEASE,

  /** Defines the pre-release suffix (pre-release identifier) */
  suffix: IS_PRE_RELEASE && SUFFIX === '' ? '-rc' : SUFFIX,

  /** Defines what branch will be the target of release pull requests */
  targetBranch: core.getInput('target-branch', { required: true }),

  /** Defines the valid commit type that will be read from the history */
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
