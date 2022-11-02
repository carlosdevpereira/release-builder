import github from '@actions/github';
import Inputs from '@/config/Inputs';
import GetLatestTagQuery from '@/graphql/GetLatestTag.query';
import core from '@actions/core';

export default class TagService {
  static async getLatestTag() {
    core.info('Mounting octokit: ' + JSON.stringify(Inputs));
    const octokit = github.getOctokit(Inputs.github.token);

    const result = await octokit.graphql(GetLatestTagQuery, {
      owner: 'carlosdevpereira',
      repositoryName: 'release-builder'
    });

    console.log(result);
    core.info(JSON.stringify(result));
  }
}
