import * as core from '@actions/core';

export default {
  sections: core.getInput('changelog-sections', {
    required: false
  })
};
