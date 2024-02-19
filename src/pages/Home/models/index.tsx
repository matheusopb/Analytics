import { AuthState, AuthActions } from "../../../store/ducks/auth/types"
import { AccountWithCampaign, Insight, InsightActions, InsightState } from "../../../store/ducks/insight/types"

interface StateProps {
    authReducer: AuthState,
}

interface DispatchProps {
    actions?: {
        authActions?: AuthActions,
        insightActions?: InsightActions,
    }
    insightReducer: InsightState
}

interface OwnProps {

}

export type HomeProps = StateProps & DispatchProps & OwnProps

export interface HomeViewProps {
    buscarAnuncios: () => void
    accountWithCampaign: AccountWithCampaign[] | undefined
    selectedCampaing: string
    setSelectedCampaing: (value: string) => void
}