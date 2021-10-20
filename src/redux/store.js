import rootReducer from '../redux/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;