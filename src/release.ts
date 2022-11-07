import semver, { ReleaseType } from 'semver';
import ReleaseConfig from './config/ReleaseConfig';
import Version from './version';

const MAJOR_CHANGE_IDENTIFIERS = ReleaseConfig.validCommitTypes;
const MINOR_CHANGE_IDENTIFIERS = ['feat', 'feature'];

export class Release {
  /** Defines the type of release */
  type: ReleaseType;

  /** Commit messages that compose the release */
  messages: Array<string>;

  /** Defines the version of the release */
  version: string;

  constructor(messages: Array<string>) {
    this.messages = messages;
    this.type = this.hasBreakingChanges
      ? 'major'
      : this.hasMinorChanges
      ? 'minor'
      : 'patch';

    const releaseVersion = semver.inc(Version.current, this.type);
    if (!releaseVersion) throw new Error('Error calculating release version');

    this.version = releaseVersion.toString();
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
