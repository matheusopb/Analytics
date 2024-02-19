import { InsightState, InsightTypes } from "./types";
import { Reducer } from 'redux';

const INICIAL_STATE: InsightState = {
    AccountWithCampaign: [],
    errors: {
        get: false,

    },
    loadings: {
        get: false,
    },
}

const reducer: Reducer<InsightState> = (state = INICIAL_STATE, action) => {
    switch (action.type) {
        case InsightTypes.GET_DATA:
            return { ...state, loadings: { ...state.loadings, data: true }, errors: { ...state.errors, data: false }, AccountWithCampaign: [] };
        case InsightTypes.GET_SUCCESS:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, AccountWithCampaign: action.payload };
        case InsightTypes.GET_ERROR:
            return { ...state, loadings: { ...state.loadings, data: false }, errors: { ...state.errors, data: false }, AccountWithCampaign: [] };
        default:
            return state;
    }
}

export default reducer