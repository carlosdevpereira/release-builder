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
