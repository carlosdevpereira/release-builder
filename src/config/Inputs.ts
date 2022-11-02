import * as core from '@actions/core';

const GITHUB_TOKEN = core.getInput('github-token', { required: true });
const RELEASE_TYPE = core.getInput('release-type', { required: true });
const TARGET_BRANCH = core.getInput('target-branch', { required: true });

const SUFFIX = core.getInput('suffix');
const IS_PRE_RELEASE = core.getInput('pre-release') === 'true';
const CHANGELOG_SECTIONS = core.getInput('changelog-sections', {
  required: false
});

export default {
  github: {
    token: GITHUB_TOKEN
  },
  release: {
    type: RELEASE_TYPE,
    preRelease: IS_PRE_RELEASE,
    targetBranch: TARGET_BRANCH
  },
  version: {
    suffix: IS_PRE_RELEASE && SUFFIX === '' ? '-rc' : SUFFIX
  },
  changelog: {
    sections: CHANGELOG_SECTIONS
  }
};
