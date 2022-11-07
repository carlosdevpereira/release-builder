import ChangelogSection from '@/@types/ChangelogSection';
import * as core from '@actions/core';

const changelogSections = core.getInput('changelog-sections', {
  required: false
});

const DEFAULT_CHANGELOG_SECTIONS: Array<ChangelogSection> = [
  { title: '🚒 Hotfixes', type: ['hotfix'], order: 1 },
  { title: '🚀 Features', type: ['feat', 'feature'], order: 2 },
  { title: '🚨 Bug fixes', type: ['fix', 'bugfix'], order: 3 },
  {
    title: '👷 Maintenance',
    type: ['chore', 'maintenance', 'refactor'],
    order: 4
  },
  {
    title: '📚 Documentation',
    type: ['docs'],
    order: 5
  }
];

export default {
  /** Defines the sections used to group the changes in the CHANGELOG.md
   * and in the releases generated on Github */
  sections: changelogSections
    ? (JSON.parse(changelogSections) as Array<ChangelogSection>)
    : DEFAULT_CHANGELOG_SECTIONS
};
