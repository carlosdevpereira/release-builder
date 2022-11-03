import * as core from '@actions/core';

export default {
  /** Defines the sections used to group the changes in the CHANGELOG.md
   * and in the releases generated on Github */
  sections: core.getInput('changelog-sections', {
    required: false
  })
};
