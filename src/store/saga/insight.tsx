//Libs
import { all, call, cancel, fork, put, select, take } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";

//Envs
import { rsf } from "../../settings/env";

//Types
import { UserState } from "../ducks/user/types";

//Redux
import { ApplicationState } from "..";
import { User } from "../ducks/auth/types";
import {
  AccountWithCampaign,
  AdAccount,
  AdAccountsResponse,
  Campaign,
} from "../ducks/insight/types";
import { getInsightSuccess } from "../ducks/insight/actions";

export const getUserData = ({ authReducer }: ApplicationState) =>
  authReducer.data;

export function* getInsight({ payload }: any): SagaIterator {
  try {
    const userData: User = yield select(getUserData);

    const response = yield call(
      fetch,
      `https://graph.facebook.com/v12.0/me/adaccounts?access_token=${userData.accessToken}`
    );

    const response2 = yield call(
      fetch,
      `https://graph.facebook.com/v12.0/me/accounts?fields=id,name,picture.type(large)&access_token=${userData.accessToken}`
    );

    const data: AdAccountsResponse = yield response.json();
    const data2: AdAccountsResponse = yield response2.json();
    console.log(data2);
    const responseInsight: AccountWithCampaign[] = yield call(
      fetchInsightsForAccounts,
      data.data
    );

    yield put(getInsightSuccess(responseInsight));
  } catch (error) {}
}

function* fetchInsightsForAccount(account: AdAccount): SagaIterator {
  try {
    const userData: User = yield select(getUserData);

    const response2 = yield call(
      fetch,
      `https://graph.facebook.com/v12.0/act_${account.account_id}/campaigns?fields=account_id,account_name,updated_time,start_time,end_time,status,name,insights.date_preset(this_year).fields(spend,cpc)&access_token=${userData.accessToken}`
    );
    // const data = yield response.json();
    const data2 = yield response2.json();

    // console.log(data)
    console.log(data2);

    // const response2 = yield call(fetch, `https://graph.facebook.com/v12.0/me/accounts?fields=id,name,picture.type(large)&access_token=${userData.accessToken}`);
    // const data2: any = yield response2.json();
    // console.log('accountId', JSON.stringify(data2, null, 4))
    // console.log('data', data)

    data2.data.sort(
      (a: any, b: any) =>
        new Date(b.updated_time).getTime() - new Date(a.updated_time).getTime()
    );

    return {
      account: account,
      campaigns: data2,
    };
  } catch (error) {
    console.log("error", error);
  }
}

function* fetchInsightsForAccounts(accounts: AdAccount[]): SagaIterator {
  return yield all(
    accounts.map((account) => {
      return call(fetchInsightsForAccount, account);
    })
  );
}
