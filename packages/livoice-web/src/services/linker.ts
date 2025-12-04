import type { PathParam } from 'react-router';
import { generatePath } from 'react-router';

type ParamObject = Record<PathParam<string>, string | null>;
type SearchObject = string | string[][] | Record<string, string | undefined> | undefined;

export enum ROUTER_PATHS {
  ROOT = '/',
  TRANSCRIPTS = '/transcripts',
  TRANSCRIPT_DETAIL = '/transcripts/:transcriptId',
  NOT_FOUND = '*'
}

const normalizeSearchParams = (searchParams: SearchObject = {}) =>
  Object.fromEntries(Object.entries(searchParams).filter(([, value]) => typeof value !== 'undefined'));

const asPath = (basePath: string, params?: ParamObject, searchParams?: SearchObject) => {
  const path = generatePath(basePath, params);
  const searchParamsString = new URLSearchParams(normalizeSearchParams(searchParams)).toString();
  return [path, searchParamsString].filter(Boolean).join('?');
};

export const toRoot = () => asPath(ROUTER_PATHS.ROOT);
export const toTranscripts = () => asPath(ROUTER_PATHS.TRANSCRIPTS);
export const toTranscript = ({ transcriptId }: { transcriptId: string }) =>
  asPath(ROUTER_PATHS.TRANSCRIPT_DETAIL, { transcriptId });
export const toNotFound = () => asPath(ROUTER_PATHS.NOT_FOUND);
