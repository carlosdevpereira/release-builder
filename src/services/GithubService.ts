import * as github from '@actions/github';
import GithubConfig from '@/config/GithubConfig';
export { Octokit } from '@octokit/rest';

const octokit = github.getOctokit(GithubConfig.token);

export class GithubService {
  static rest = octokit.rest;
  static graphql = octokit.graphql;
}

export default GithubService;
