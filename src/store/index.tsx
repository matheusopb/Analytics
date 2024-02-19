//Libs
import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';

//Roots
import rootReducer from './ducks';
import rootSaga from './saga';

//Types
import { AuthState } from './ducks/auth/types';
import { InsightState } from './ducks/insight/types';
import { UserState } from './ducks/user/types';
export interface ApplicationState {
    insightReducer: InsightState,
    authReducer: AuthState,
    userReducer: UserState,
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;