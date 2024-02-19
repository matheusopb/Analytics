
/**
 * Actions Types
 */
export enum InsightTypes {
    GET_DATA = '@insight/GET_DATA',
    GET_SUCCESS = '@insight/GET_SUCCESS',
    GET_ERROR = '@insight/GET_ERROR',
}

/**
 * Data types
 */
export interface Insight {
    id: string,
    name: string,
    showVote?: number,
    hideVotes?: boolean
}

/**
 * State types
 */
export interface InsightState {
    readonly AccountWithCampaign: AccountWithCampaign[] | [],
    readonly loadings: {
        get: boolean,

    }
    readonly errors: {
        get: boolean,

    }
}

export interface InsightActions {
    getInsight(): void,

}


export interface CampaignInsightData {
    spend: string;
    cpc: string;
    date_start: string;
    date_stop: string;
}

export interface CampaignInsight {
    data: CampaignInsightData[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
}

export interface Campaign {
    id: string;
    updated_time: string;
    start_time: string;
    status: string;
    insights?: CampaignInsight;
    name: string;
}

export interface CampaignsResponse {
    data: Campaign[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
        next?: string;
    };
}

export interface AdAccount {
    account_id: string;
    id: string;
}

export interface PagingCursors {
    before: string;
    after: string;
}

export interface Paging {
    cursors: PagingCursors;
}

export interface AdAccountsResponse {
    data: AdAccount[];
    paging: Paging;
}


export interface AccountWithCampaign {
    campaigns: CampaignsResponse;
    adAccount: AdAccount
}