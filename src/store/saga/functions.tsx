import { InsightState } from "../ducks/insight/types";
import { UserState } from "../ducks/user/types";

export const getUser = ({ userReducer }: { userReducer: UserState }) => userReducer;

export const getInsightReducer = ({ insightReducer }: { insightReducer: InsightState }) => insightReducer;
