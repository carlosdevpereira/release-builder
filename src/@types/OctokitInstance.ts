import { graphql } from '@octokit/graphql/dist-types/types';

export interface OctokitInstance {
  graphql: graphql;
}
