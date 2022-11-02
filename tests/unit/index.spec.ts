describe('Index', () => {
  it.todo('reads input to config');
  it.todo('gets latest tag in the repository');
  it.todo('calculates the new version based on changes');
  it.todo('updates version file with new version');
  it.todo('generates CHANGELOG.md');
  it.todo('commits updated version file and changelog to a release branch');
  it.todo('creates a pull request from release branch to the target branch');

  describe('when release pull request is merged', () => {
    it.todo('create git commit tag');
    it.todo('create github release');
  });
});
