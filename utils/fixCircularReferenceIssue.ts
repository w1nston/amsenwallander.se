import safeJsonStringify from 'safe-json-stringify';
import { Recipe } from '../@types/index';

/**
 * Workaroaund,
 * see: https://github.com/vercel/next.js/discussions/10992#discussioncomment-103826
 */
export function fixCircularReferenceIssue(rawInput: unknown): Recipe[] {
  const stringifyInput = safeJsonStringify(rawInput);
  return JSON.parse(stringifyInput);
}
