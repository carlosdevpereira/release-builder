import * as github from '@actions/github';
import { graphql } from '@octokit/graphql/dist-types/types';
import Inputs from '@/config/Inputs';
import GetLatestTagQuery from '@/graphql/GetLatestTag.query';
import { GetLatestTagResults } from '@/graphql/GetLatestTag';

interface Octokit {
  graphql: graphql;
}

export default class TagService {
  static async getLatestTag() {
    const octokit: Octokit = github.getOctokit(Inputs.github.token);

    const result = (await octokit.graphql(GetLatestTagQuery, {
      owner: 'carlosdevpereira',
      repositoryName: 'release-builder'
    })) as GetLatestTagResults;

    console.log('Latest:', result.repository.refs.edges[0].node.name);
  }
}
