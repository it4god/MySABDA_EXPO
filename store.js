import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};


const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
  // compose(
  //   applyMiddleware(thunk),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;