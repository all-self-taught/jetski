import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import configureStore, { history } from './store';

export { connect } from 'react-redux';
export { Link } from 'react-router-dom';
export { selectData, selectForm } from './store/selectors';
export { dispatcher } from './store/actions/dispatch';


let routeConfig;

export const configure = config => {
  routeConfig = config;
  return configureStore({}, config);
}

export default ({ store }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {routeConfig.pages.map((page, i) => 
          <Route key={i} {...page.route} />)}
      </Switch>
    </ConnectedRouter>
  </Provider>