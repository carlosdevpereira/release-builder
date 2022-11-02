import * as github from '@actions/github';
import Inputs from '@/config/Inputs';
import { OctokitInstance } from '@/@types/OctokitInstance';

const octokit: OctokitInstance = github.getOctokit(Inputs.github.token);

export default class GithubService {
  static rest: OctokitInstance['rest'] = octokit.rest;

  static async graphql<T>(query: string, variables: unknown) {
    const result = await octokit.graphql(query, variables);

    return result as T;
  }
}
