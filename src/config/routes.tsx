import * as React from 'react';
import { Route, Switch} from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

/**
 * Import views (containers)
 */
import Home from '../containers/home/Home';


/**
 * Define the container of routes
 * @param props 
 * @returns {Object}
 */
const Routes = ({props}:any) =>  {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path="/" component={Home} exact/>
      </Switch>
    </ConnectedRouter>
  )
}
export default Routes;