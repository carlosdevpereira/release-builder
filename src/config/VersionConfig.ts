import * as core from '@actions/core';
import ReleaseConfig from './ReleaseConfig';

const SUFFIX = core.getInput('suffix');

export default {
  /** Defines the suffix that will be applied to the end of the version tag */
  suffix: ReleaseConfig.isPreRelease && SUFFIX === '' ? '-rc' : SUFFIX
};
