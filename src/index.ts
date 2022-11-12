import './config';
import * as core from '@actions/core';
import Action from './action';
import ReleaseConfig, {
  VALID_RELEASE_STRATEGIES
} from './config/ReleaseConfig';

async function run() {
  try {
    if (ReleaseConfig.strategy === 'pull-request') {
      // @TODO: Get latest version from a git tag and only if no tag is available use version file as fallback
      new Action()
        .buildRelease()
        .buildChangelog()
        .updateRepositoryVersion()
        .createReleaseBranch()
        .commitAvailableChanges()
        .pushReleaseBranch()
        .createOrUpdateReleasePullRequest();
    } else if (ReleaseConfig.strategy === 'release-only') {
      new Action().buildRelease().buildChangelog().createOrUpdateDraftRelease();
    } else {
      throw new Error(
        'Invalid release strategy! Valid values are: ' +
          VALID_RELEASE_STRATEGIES.join(', ')
      );
    }
  } catch (error: unknown) {
    if (!(error instanceof Error)) return;

    core.setFailed(error.message);
  }
}

// 🚀 Execute Github Action
run();

export default run;
