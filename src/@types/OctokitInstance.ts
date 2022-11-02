import { graphql } from '@octokit/graphql/dist-types/types';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';

export interface OctokitInstance {
  graphql: graphql;
  rest: RestEndpointMethodTypes;
}
