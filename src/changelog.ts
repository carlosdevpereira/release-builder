import { existsSync, readFileSync, writeFileSync } from 'fs';
import ChangelogSection from './@types/ChangelogSection';
import ChangelogConfig from './config/ChangelogConfig';

const CHANGELOG_FILE_PATH = './CHANGELOG.md';

export class Changelog {
  content: string;

  currentVersion?: string;
  nextVersion?: string;
  repositoryUrl?: string;

  constructor() {
    if (!existsSync(CHANGELOG_FILE_PATH)) {
      this.content = '# CHANGELOG\n\n';
    } else {
      this.content = readFileSync(CHANGELOG_FILE_PATH, 'utf-8').toString();
    }
  }

  setCurrentVersion(version: string) {
    this.currentVersion = version;

    return this;
  }

  setNextVersion(version: string) {
    this.nextVersion = version;

    return this;
  }

  setRepositoryUrl(url: string) {
    this.repositoryUrl = url;

    return this;
  }

  buildLog(messages: Array<string>) {
    let versionLog = `## [${this.nextVersion}](${this.repositoryUrl})`;

    ChangelogConfig.sections.forEach((section: ChangelogSection) => {
      versionLog += `\n\n### ${section.title}\n`;
      versionLog += '\n* dummy commit message (@owner) (#commit-hash)';
    });

    this.content.replace('# CHANGELOG\n\n', `# CHANGELOG\n\n${versionLog}`);

    return this;
  }

  save() {
    console.log('Will save:');
    console.log(this.content);
    writeFileSync(CHANGELOG_FILE_PATH, this.content, 'utf-8');
  }
}

export default Changelog;
