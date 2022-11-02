import core from '@actions/core';

export default {
  github: {
    token: core.getInput('github-token', { required: true })
  },
  release: {
    type: core.getInput('release-type', { required: true }),
    preRelease: core.getInput('pre-release', { required: false }),
    targetBranch: core.getInput('target-branch', { required: true })
  },
  version: {
    suffix: core.getInput('suffix', { required: false })
  },
  changelog: {
    sections: core.getInput('changelog-sections', { required: false })
  }
};
