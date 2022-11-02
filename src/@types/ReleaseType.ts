/**
 * Defines the possible values for the "release-type" input
 * (what type of project the action is running on..)
 *
 * @value **node** *(Current version saved in package.json)*
 * @value **text** *(Current version saved in version.txt)*
 */
export type ReleaseType = 'node' | 'text';
