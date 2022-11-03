import * as core from '@actions/core';

export default {
  token: core.getInput('github-token', { required: true })
};
