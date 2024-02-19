import React, { useEffect, useState } from "react";

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import *  as AuthActions from '../../store/ducks/auth/actions'
import { LoginProps } from "./models";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './style.scss';
import FacebookLogin from 'react-facebook-login';
import { loadFailure, loadSuccess } from "../../store/ducks/user/actions";
import { encryptData } from '../../utils';
import { AccountWithCampaign } from "../../store/ducks/insight/types";

// function AutoLayoutSizingExample() {
//   return (
//     <Container>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={6}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>
//       <Row>
//         <Col>1 of 3</Col>
//         <Col xs={5}>2 of 3 (wider)</Col>
//         <Col>3 of 3</Col>
//       </Row>
//     </Container>
//   );
// }

const SignIn = ({ loadRequest, authReducer, loadSuccess }: LoginProps) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (loading && !authReducer?.loading && authReducer?.error === true) {
            setLoading(false)
        }
    }, [authReducer?.error, authReducer?.loading, loading])

    useEffect(() => {
        if (!authReducer?.loading && authReducer?.data) {


            navigate('/home')
            setLoading(false)
        }
    }, [authReducer?.data, authReducer?.loading, loading, navigate])

    // useEffect(() => {
    //     loadRequestCredential()
    //     setLoading(true)
    // }, [loadRequestCredential])

    const responseFacebook = (response: any) => {
        loadSuccess(response)
        localStorage.setItem('authToken', encryptData(response.accessToken));
    }
    interface CampaignsDashboardProps {
        accountsWithCampaigns: AccountWithCampaign[];
    }

    return (
        <div className="containerLogin">
            <h1 className="title">Conecte-se com o Facebook</h1>
            <p className="subtext">
                {`Acesse agora e acompanhe o desempenho dos seus anúncios em tempo real.\n
                Tenha controle total e insights valiosos para otimizar suas campanhas.`}
            </p>
            <div className="searchBox">

                <div>
                    <FacebookLogin
                        appId="868921201516349"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,ads_read,read_insights,pages_show_list,pages_read_engagement,pages_read_user_content"
                        onClick={loadRequest}
                        onFailure={loadFailure}
                        callback={responseFacebook}
                    />
                </div>
            </div>
        </div>

    );

};

const mapStateToProps = ({ authReducer }: ApplicationState) => ({
    authReducer: authReducer,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);