import * as core from '@actions/core';

export default {
  type: core.getInput('release-type', { required: true }),
  isPreRelease: core.getInput('pre-release', { required: false }) === 'true',
  targetBranch: core.getInput('target-branch', { required: true })
};
