import ReleaseConfig from '@/config/ReleaseConfig';
import NodeAdapter from '@/adapters/NodeAdapter';
import TextAdapter from '@/adapters/TextAdapter';

export class Version {
  static getCurrent() {
    switch (ReleaseConfig.type) {
      case 'node':
        return NodeAdapter.getVersion();

      case 'text':
        return TextAdapter.getVersion();
    }
  }
}

export default Version;
