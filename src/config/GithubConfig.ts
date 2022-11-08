import * as core from '@actions/core';
import * as github from '@actions/github';

export default {
  /** Github Authentication Token (Used to authenticate Octokit client) */
  token: core.getInput('github-token', { required: true }),

  /** Repository that is running the action */
  repository: {
    owner: github.context.repo.owner,
    name: github.context.repo.repo
  },

  /** Current branch that triggered the workflow run */
  branch: github.context.ref.replace('refs/heads/', ''),

  /** Current git HEAD SHA */
  head: github.context.sha
};
