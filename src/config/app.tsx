
/****
 * Styles
 */
import '../assets/sass/app.scss'


/****
 * Polyfill for relay
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';


import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';


import { createBrowserHistory } from 'history'
import  {connectRouter,routerMiddleware} from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import reducers from './reducers'

const history:any = createBrowserHistory()

/**
 * Create the store
 */
let store = {}
store = createStore(
    connectRouter(history)(reducers), // new root reducer with router state
    {}, //initial state
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        logger
      )
    ),
  )

/**
 * Imports routes
 */
import Routes from './routes';

//Define app
const App : any = (props:any)=>{
  return( 
    <Provider store={props.store}>
      <Routes props={props}/>
    </Provider>
  )
}
/****
 * Define the properties from app
 */
App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

/****
 * Render the aplicaction
 */
ReactDOM.render(
    <App store={store} history={history} />
  ,document.getElementById("app")
)   

