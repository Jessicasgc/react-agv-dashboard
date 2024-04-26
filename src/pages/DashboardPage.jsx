import React, { useEffect, } from 'react';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import Map from '../components/Map';
import PropTypes from 'prop-types';
// import { useSearchParams } from 'react-router-dom';
// import NoteList from '../components/NoteList';
// import SearchBar from '../components/SearchBar';
// import {  getActiveNotes } from '../utils/network-data';
// import { BiPlus } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
// import PathApp from '../components/Map/PathApp';
import SideDashboard from '../components/SideDashboard';
import { Canvas } from '@react-three/fiber';
import { Layout  } from 'antd';
import { Content } from 'antd/es/layout/layout';
const { Sider } = Layout;


function DashboardPage({isDrawerOpen}) {
    const {locale} = React.useContext(LocaleContext);
    
        
    return (
        <Layout>

            <SideDashboard isDrawerOpen={isDrawerOpen}/>
          {/* </Sider> */}
          {/* {
            agvs.map((agv) => {
                return ( <div>AGV {agv.agv_code} : {agv.agv_status ? "Online" : "Offline"}</div> )
            } )
          }  */}
          {/* <PathApp/> */}
            <Content style={{width : "75%", height: "75vh"}}>
                <Canvas camera={{orthographic: true}} style={{backgroundColor: "#abcaf3"}}>
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