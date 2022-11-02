export type ConventionalType =
  | 'feat'
  | 'feature'
  | 'fix'
  | 'bugfix'
  | 'test'
  | 'docs'
  | 'chore'
  | 'maintenance'
  | 'refactor'
  | 'style'
  | 'build'
  | 'ci'
  | 'perf'
  | 'performance';

/**
 * Defines the structure of a section
 * in the version changelog
 */
export interface ChangelogSection {
  type: ConventionalType[];
  title: string;
  order: number;
}

export default ChangelogSection;
