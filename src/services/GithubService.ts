import * as github from '@actions/github';
import GithubConfig from '@/config/GithubConfig';
import { OctokitInstance } from '@/@types/OctokitInstance';

const octokit: OctokitInstance = github.getOctokit(GithubConfig.token);

export class GithubService {
  static rest: OctokitInstance['rest'] = octokit.rest;

  static async graphql<T>(query: string, variables: unknown) {
    const result = await octokit.graphql(query, variables);

    return result as T;
  }
}

export default GithubService;
