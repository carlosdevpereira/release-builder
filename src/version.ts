import ReleaseConfig from '@/config/ReleaseConfig';
import NodeAdapter from '@/adapters/NodeAdapter';
import TextAdapter from '@/adapters/TextAdapter';

export class Version {
  static get current() {
    switch (ReleaseConfig.type) {
      case 'node':
        return NodeAdapter.getVersion();

      case 'text':
        return TextAdapter.getVersion();

      default:
        throw new Error(
          "Couldn't find the current project version. Maybe project type not supported yet?"
        );
    }
  }
}

export default Version;
