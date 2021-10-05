import safeJsonStringify from 'safe-json-stringify';

/**
 * Workaroaund,
 * see: https://github.com/vercel/next.js/discussions/10992#discussioncomment-103826
 */
export function fixCircularReferenceIssue(rawInput: unknown): unknown {
  const stringifyInput = safeJsonStringify(rawInput);
  return JSON.parse(stringifyInput);
}
