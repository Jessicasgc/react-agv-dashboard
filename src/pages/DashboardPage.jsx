import Map from '../components/Map';
import PropTypes from 'prop-types';
import SideDashboard from '../components/SideDashboard';
import { Canvas } from '@react-three/fiber';
import { Layout  } from 'antd';
import { Content } from 'antd/es/layout/layout';


function DashboardPage({isDrawerOpen}) {
    return (
        <Layout style={{minHeight: "100%"}}>
            <SideDashboard isDrawerOpen={isDrawerOpen}/>
            <Content style={{width : "80%", minHeight: "100%"}}>
                <Canvas camera={{orthographic: true}} style={{ maxWidth:"100%"}}>
                    <Map/>
                </Canvas>
            </Content>
        </Layout> 
        
    )
        
}

DashboardPage.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,
};

export default DashboardPage;