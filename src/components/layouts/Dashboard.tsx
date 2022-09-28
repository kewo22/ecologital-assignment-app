import { Navigate, useOutlet } from 'react-router-dom';
import { Layout, Col, Button, Typography } from 'antd';

import { useAuth } from '../../hooks/useAuth';

export default function DashboardLayout() {


    const { user, logout } = useAuth();
    const outlet = useOutlet();

    const { Title } = Typography;
    const { Header, Content } = Layout;

    if (!user) {
        return <Navigate to="/login" />;
    }

    const onLogoutClick = () => {
        logout!();
    }

    return (
        <>

            <Layout className='dashboard-layout'>
                <Header className='dashboard-header-wrapper'>
                    <div>
                        <Title level={5}>Welcome {user.firstName} {user.lastName}</Title>
                    </div>
                    <Button type="primary" htmlType="button" onClick={onLogoutClick}>
                        Log out
                    </Button>
                </Header>
                <Content className='dashboard-layout-content'>
                    <Col span={24}> {outlet} </Col>
                </Content>
            </Layout>

        </>
    )
}
