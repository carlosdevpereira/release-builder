import semver from 'semver';
import ReleaseConfig from './config/ReleaseConfig';

const MAJOR_CHANGE_IDENTIFIERS = ReleaseConfig.validCommitTypes;
const MINOR_CHANGE_IDENTIFIERS = ['feat', 'feature'];

export class Release {
  /** Commit messages that compose the release */
  messages: Array<string>;

  /** Defines the latest release version */
  latest: string;

  /** Defines the next release version that should be created */
  nextVersion: string;

  constructor(latest: string, messages: Array<string>) {
    this.latest = latest;
    this.messages = messages;
    this.nextVersion = this.getNextVersion();
  }

  getNextVersion(): string {
    let version;

    if (ReleaseConfig.isPreRelease) {
      version = semver.inc(this.latest, 'prerelease', ReleaseConfig.suffix);
    } else {
      const releaseType = this.hasBreakingChanges
        ? 'major'
        : this.hasMinorChanges
        ? 'minor'
        : 'patch';

      version = semver.inc(this.latest, releaseType);
    }

    if (!version) throw new Error('Error calculating release version');

    return version;
  }

  get hasBreakingChanges() {
    return this.messages.find((message) => {
      for (let i = 0; i < MAJOR_CHANGE_IDENTIFIERS.length; i++) {
        if (message.startsWith(MAJOR_CHANGE_IDENTIFIERS[i] + '!: ')) {
          return true;
        }
      }
    });
  }

  get hasMinorChanges() {
    return this.messages.find((message) => {
      for (let i = 0; i < MINOR_CHANGE_IDENTIFIERS.length; i++) {
        if (message.startsWith(MINOR_CHANGE_IDENTIFIERS[i] + ': ')) {
          return true;
        }
      }
    });
  }
}

export default Release;
