import * as core from '@actions/core';

/** Defines if the release is a pre-release or not */
const IS_PRE_RELEASE =
  core.getInput('pre-release', { required: false }) === 'true';

/** Defines the pre-release suffix (pre-release identifier) */
const SUFFIX = core.getInput('suffix');

/**
 * Defines what release strategies are available
 *
 * `pull-request` - Creates release pull request with release version bump.\
 * `release-only` - Creates/updates a github release draft when new changes are added to the release branch.
 */
export const VALID_RELEASE_STRATEGIES = ['pull-request', 'release-only'];

export default {
  /** What type of project the action is running on (node/text/...) */
  type: core.getInput('release-type', { required: true }),

  /** What type of release strategy will be used (pull-request, release-only) */
  strategy: core.getInput('release-strategy'),

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
