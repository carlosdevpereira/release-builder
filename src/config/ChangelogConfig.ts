import ChangelogSection from '@/@types/ChangelogSection';
import * as core from '@actions/core';

const changelogSections = core.getInput('changelog-sections', {
  required: false
});

const DEFAULT_CHANGELOG_SECTIONS: Array<ChangelogSection> = [];

export default {
  /** Defines the sections used to group the changes in the CHANGELOG.md
   * and in the releases generated on Github */
  sections: changelogSections
    ? (JSON.parse(changelogSections) as Array<ChangelogSection>)
    : DEFAULT_CHANGELOG_SECTIONS
};
