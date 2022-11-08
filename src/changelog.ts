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

    for (let i = 0; i < ChangelogConfig.sections.length; i++) {
      const section = ChangelogConfig.sections[i];
      const sectionMessages = this.getSectionMessages(messages, section);

      if (!sectionMessages.length) continue;

      versionLog += `\n\n### ${section.title}\n`;
      sectionMessages.forEach((message) => {
        versionLog += `\n* ${message}`;
      });
    }

    this.content = this.content.replace(
      '# CHANGELOG\n\n',
      `# CHANGELOG\n\n${versionLog}`
    );

    return this;
  }

  getSectionMessages(messages: Array<string>, section: ChangelogSection) {
    const sectionMessages = [];

    for (let i = 0; i < section.type.length; i++) {
      const type = section.type[i];

      const typeMessages = messages
        .filter(
          (message) =>
            message.startsWith(`${type}: `) ||
            message.startsWith(`${type}!: `) ||
            message.match(new RegExp(`^(${type}(.*): )`, 'gi')) ||
            message.match(new RegExp(`^(${type}(.*)!: )`, 'gi'))
        )
        .map((message) => {
          return message
            .replace(`${type}: `, '')
            .replace(`${type}!: `, '')
            .replace(new RegExp(`^(${type}(.*): )`, 'gi'), '')
            .replace(new RegExp(`^(${type}(.*)!: )`, 'gi'), '');
        });

      sectionMessages.push(...typeMessages);
    }

    return sectionMessages;
  }

  save() {
    console.log('Will save:');
    console.log(this.content);
    writeFileSync(CHANGELOG_FILE_PATH, this.content, 'utf-8');
  }
}

export default Changelog;
