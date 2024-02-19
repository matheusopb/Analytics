
//Libs
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

//Js
import { ApplicationState } from '../../store';
import { HomeProps } from './models';

//Actions
import *  as AuthActions from '../../store/ducks/auth/actions'
import *  as InsightActions from '../../store/ducks/insight/actions'

//Components
import HomeView from './view';
import { AccountWithCampaign } from '../../store/ducks/insight/types';

function Home({
    actions,
    insightReducer
}: HomeProps) {

    function buscarAnuncios() {
        actions?.insightActions?.getInsight()
    }
    console.log('insightReducer', insightReducer)

    const [selectedCampaing, setSelectedCampaing] = useState<string>('');

    interface CampaignsDashboardProps {
        accountsWithCampaigns: AccountWithCampaign[];
    }



    return (<HomeView
        accountWithCampaign={insightReducer.AccountWithCampaign}
        buscarAnuncios={buscarAnuncios}
        selectedCampaing={selectedCampaing}
        setSelectedCampaing={setSelectedCampaing}
    />);
}

const mapStateToProps = ({ authReducer, insightReducer }: ApplicationState) => ({
    authReducer: authReducer,
    insightReducer: insightReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        actions: {
            insightActions: bindActionCreators(InsightActions, dispatch),
            authActions: bindActionCreators(AuthActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

