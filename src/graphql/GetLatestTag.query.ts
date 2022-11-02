export interface GetLatestTagResults {
  repository: {
    refs: {
      edges: Array<{
        node: {
          name: string;
          target: { oid: string };
        };
      }>;
    };
  };
}

export default `
query GetLatestTag($owner: String!, $repositoryName: String!) {
  repository(owner: $owner, name: $repositoryName) {
    refs(
      refPrefix: "refs/tags/"
      first: 100
      orderBy: { field: TAG_COMMIT_DATE, direction: DESC }
    ) {
      edges {
        node {
          name
          target {
            oid
            ... on Tag {
              commitUrl
              tagger {
                date
              }
            }
          }
        }
      }
    }
  }
}
`;
