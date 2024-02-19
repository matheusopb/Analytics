//libs
import { all, takeLatest } from 'redux-saga/effects';

//types
import { InsightTypes } from '../ducks/insight/types';
import { UserTypes } from '../ducks/user/types';
import { AuthTypes } from '../ducks/auth/types';


//Sagas
import { getInsight } from './insight';
import { getUser, getUserAsync, setDocument } from './user';


export default function* rootSaga(): any {
    return yield all([

        //Users sagas
        takeLatest(UserTypes.SYNC_DATA, getUserAsync),
        takeLatest(UserTypes.LOAD_REQUEST, getUser),
        takeLatest(UserTypes.LOAD_ADD, setDocument),

        //Insight sagas
        takeLatest(InsightTypes.GET_DATA, getInsight),
    ])
}