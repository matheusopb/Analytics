import { action } from 'typesafe-actions'
import { AccountWithCampaign, InsightTypes } from './types'

export const getInsight = () => action(InsightTypes.GET_DATA)

export const getInsightSuccess = (data: AccountWithCampaign[]) => action(InsightTypes.GET_SUCCESS, data)

export const getInsightError = () => action(InsightTypes.GET_ERROR)

