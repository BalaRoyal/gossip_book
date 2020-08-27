import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import gossipReducer from './reducers/post/gossip';
import questionReducer from './reducers/post/question';
import userAnswers from './reducers/user/answers';
import authReducer from './reducers/user/auth';
import signupReducer from './reducers/user/signup';

const baseReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  question: questionReducer,
  gossip: gossipReducer,
  userAnswers: userAnswers,
});

const store = createStore(
  baseReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
export default store;
