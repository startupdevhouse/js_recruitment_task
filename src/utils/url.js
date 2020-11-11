import { getFormattedDate, getDateWithBackdays } from './date';
import { apiUrl } from '../config/api';

export const URL_SEARCH_TYPE = 'search';
export const URL_SECTIONS_TYPE = 'sections';

const urlType = {
  search: URL_SEARCH_TYPE,
  sections: URL_SECTIONS_TYPE,
};

const defaultSearchParams = {
  search: [
    'api-key=test',
    `from-date=${getFormattedDate(getDateWithBackdays())}`,
  ],
  sections: ['api-key=test'],
};

const getUrlType = (type) => ({
  pathname: urlType[type] || urlType.search,
  defaultSearch: defaultSearchParams[type] || defaultSearchParams[type],
});

export function getUrl(type, searchParams = {}) {
  const { pathname, defaultSearch } = getUrlType(type);
  const search = defaultSearch
    .concat(
      Object.entries(searchParams).map(([key, value]) => `${key}=${value}`)
    )
    .join('&');

  return `${apiUrl}${pathname}?${search}`;
}
