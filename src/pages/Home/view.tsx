import { HomeViewProps } from './models';
import { AccountWithCampaign } from '../../store/ducks/insight/types';
import './style.scss';


const campaignsDashboard = (
    accountsWithCampaigns: AccountWithCampaign[] | undefined,
    selectedCampaing: string,
    setSelectedCampaing: (value: string) => void
) => {
    console.log(accountsWithCampaigns)
    return (
        <div className="card">
            <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '10p' }}>ID</th>
                            <th style={{ width: '10p' }}>Conta</th>
                            <th>Campanha</th>
                            <th>Status</th>
                            <th>Data Ultimo Update</th>
                            <th>Insights</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountsWithCampaigns?.map((account) => (
                            account?.campaigns?.data?.map((campaign) => (
                                <>
                                    <tr>
                                        <td>{campaign.id}</td>

                                        <td>Conta</td>
                                        <td>{campaign.name}</td>
                                        <td>
                                            {campaign.status === 'ACTIVE' ?
                                                <span className="badge badge-success">Ativo</span> :
                                                <span className="badge badge-danger">Pausado</span>
                                            }
                                        </td>
                                        <td>
                                            {new Date(campaign?.updated_time).toLocaleString('pt-BR', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            })}
                                        </td>
                                        <th>
                                            {
                                                campaign?.insights?.data?.length ?
                                                    <button type="button"
                                                        className="btn btn-block bg-gradient-primary btn-xs"
                                                        onClick={() => setSelectedCampaing(selectedCampaing === campaign.id ? '' : campaign.id)}>
                                                        Ver Mais
                                                    </button> :
                                                    <span className="badge badge-danger">Insights indisponiveis</span>
                                            }
                                        </th>
                                    </tr>
                                    {selectedCampaing === campaign.id && (
                                        <tr>
                                            <td colSpan={6}>
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Data inicío</th>
                                                                <th>Data fim</th>
                                                                <th>custo</th>
                                                                <th>cpc</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {campaign?.insights?.data?.map((insights) => (
                                                                <tr>
                                                                    <td>
                                                                        {new Date(insights.date_start).toLocaleString('pt-BR', {
                                                                            day: 'numeric',
                                                                            month: 'numeric',
                                                                            year: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                        })}
                                                                    </td>
                                                                    <td>
                                                                        {new Date(insights.date_stop).toLocaleString('pt-BR', {
                                                                            day: 'numeric',
                                                                            month: 'numeric',
                                                                            year: 'numeric',
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                        })}
                                                                    </td>
                                                                    <td>
                                                                        {insights.spend}
                                                                    </td>
                                                                    <td>
                                                                        {insights.cpc}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};




function HomeView({
    buscarAnuncios,
    accountWithCampaign,
    selectedCampaing,
    setSelectedCampaing
}: HomeViewProps) {
    return (

        <div>
            {campaignsDashboard(accountWithCampaign, selectedCampaing, setSelectedCampaing)}
            <button onClick={() => { buscarAnuncios() }} >{'buscarAnuncios'}</button>
        </div >
    );
}

export default HomeView;
