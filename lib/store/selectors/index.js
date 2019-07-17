import { matchPath } from 'react-router-dom';
import { createSelector } from 'reselect';

export const getLocation = state =>
  state.router && state.router.location && state.router.location.pathname;

export const getPageHistory = state =>
  state.app.appData.pageHistory || []

export const getPageData = state =>
  state.page.pageData || {}

export const getPage = config => createSelector(getLocation, location => {
    if (location) {
      const page = config.pages.find(
        p =>
          p.route.path !== '*' &&
          new RegExp(`^${p.route.path.replace('/', '\/').replace(/:\w+/g, '.*')}$`).test(location) ||
          p.route.path === '*'
      );
      const matched = matchPath(location, { path: page && page.route.path });
      let params = {};
      /* eslint-disable-next-line */
      if (matched && matched.params) params = matched.params;
      return { page, params };
    }
    return {};
  });

export const selectData = key => createSelector(getPageData, pageData => {
  return pageData[key] || {};
});

export const selectForm = state =>
  state.page.formData || {}