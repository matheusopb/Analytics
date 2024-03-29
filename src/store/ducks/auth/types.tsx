
/**
 * Actions Types
 */
export enum AuthTypes {
    LOAD_REQUEST = '@AuthTypes/LOAD_REQUEST',
    LOAD_SUCCESS = '@AuthTypes/LOAD_SUCCESS',
    LOAD_FAILURE = '@AuthTypes/LOAD_FAILURE',
    LOAD_LOGOFF = '@AuthTypes/LOAD_LOGOFF',
    LOAD_REQUEST_CREDENTIAL = '@AuthTypes/LOAD_REQUEST_CREDENTIAL',
}

/**
 * Data types
 */

export type User = {
    name: string;
    email: string;
    picture: {
        data: {
            height: number;
            is_silhouette: boolean;
            url: string;
            width: number;
        };
    };
    id: string;
    userID: string;
    expiresIn: number;
    accessToken: string;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
};

export type Auth = User | undefined
/**
 * State types
 */
export interface AuthState {
    readonly data: User | undefined,
    readonly loading: boolean,
    readonly error: boolean
}

export interface AuthActions {
    loadRequest: () => void,
    loadLogoff: () => void,
}
