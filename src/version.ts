import ReleaseConfig from '@/config/ReleaseConfig';
import NodeAdapter from '@/adapters/NodeAdapter';
import TextAdapter from '@/adapters/TextAdapter';

export class Version {
  current: string;

  constructor(version: string) {
    this.current = version;
  }

  static readFromFile() {
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

  save() {
    switch (ReleaseConfig.type) {
      case 'node':
        NodeAdapter.setVersion(this.current);
        break;

      case 'text':
        TextAdapter.setVersion(this.current);
        break;

      default:
        throw new Error(
          "Couldn't set the new project version. Maybe project type not supported yet?"
        );
    }
  }
}

export default Version;
