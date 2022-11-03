import * as core from '@actions/core';
import ReleaseConfig from './ReleaseConfig';

const SUFFIX = core.getInput('suffix');

export default {
  suffix: ReleaseConfig.isPreRelease && SUFFIX === '' ? '-rc' : SUFFIX
};
