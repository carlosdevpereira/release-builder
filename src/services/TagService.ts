import type { GetLatestTagResults } from '@/graphql/GetLatestTag.query';
import GetLatestTagQuery from '@/graphql/GetLatestTag.query';
import GithubService from './GithubService';

export default class TagService {
  static async getLatestTag() {
    const result = await GithubService.graphql<GetLatestTagResults>(
      GetLatestTagQuery,
      {
        owner: 'carlosdevpereira',
        repositoryName: 'release-builder'
      }
    );

    console.log('Latest:', result.repository.refs.edges[0].node.name);
  }
}
