/**
 * Defines the possible commit types (as described
 * by Conventional commit standard) that will be
 * splitted through the changelog sections
 *
 * @value **feat** | **feature** *(A new feature or improvement in the project)*
 * @value **fix** | **bugfix** *(A fix for a bug)*
 * @value **test** *(Adding new tests or fixing broken tests)*
 * @value **docs** *(Adding or updating project documentation)*
 * @value **chore** | **maintenance** | **refactor** | **build** *(Code base quality/maintenance related improvements)*
 * @value **style** *(Overall aspect of the project that doesn't compromise functionality)*
 * @value **ci** *(CI environment optimizations and commands)*
 * @value **perf** | **performance** *(Performance improvements to the project)*
 */
export type ConventionalType =
  | 'feat'
  | 'feature'
  | 'fix'
  | 'bugfix'
  | 'hotfix'
  | 'test'
  | 'docs'
  | 'chore'
  | 'maintenance'
  | 'refactor'
  | 'build'
  | 'style'
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
