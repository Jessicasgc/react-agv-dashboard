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
const { Sider } = Layout;


function DashboardPage({isDrawerOpen}) {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [loading, setLoading] = React.useState(true);
    // const [activeNotes, setActiveNotes] = React.useState([]);
    // const [keyword, setKeyword] = React.useState(()=>{
    //     return searchParams.get('keyword') || ''
    // })
    const {locale} = React.useContext(LocaleContext);
    
    // React.useEffect(() => {
    //     getActiveNotes().then(({data}) => {
    //         setActiveNotes(data);
    //         setLoading(false);
    //     })
    // }, []);
    
    // function onKeywordChangeHandler(keyword){
    //     setKeyword(keyword);
    //     setSearchParams({keyword});
    // }
    
    // const filteredActiveNotes = activeNotes.filter((note) => { 
    //     return note.title.toLowerCase().includes(
    //         keyword.toLowerCase()
    //     );
    // });

    // if (loading) {
    //     return <p className='notes-loading'>Loading...</p>
    // }
        
    return (
        <section>
            {/* <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler}/>
            {activeNotes.length > 0 &&
                <NoteList notes={filteredActiveNotes} />
            }
            {activeNotes.length === 0 &&
                <div className='notes-list-empty'>
                    <p>There are no active notes</p>
                </div>
            }
            <Link to={`/notes/new`}>
                <div className='homepage__action'>
                    <button className='action'><BiPlus/></button>
                </div>
        </Link> */}  
          {/* <h1>{locale === 'id' ? 'Ini adalah Halaman Dashboard' : 'This is Dashboard Page'}</h1> */}
          <Sider width="25%" className='siderStyle'>
            <SideDashboard isDrawerOpen={isDrawerOpen}/>
          </Sider>
          {/* {
            agvs.map((agv) => {
                return ( <div>AGV {agv.agv_code} : {agv.agv_status ? "Online" : "Offline"}</div> )
            } )
          }  */}
          {/* <PathApp/> */}
          <div style={{width : "1000px", height: "75vh"}}>
        <Canvas >
          <Map/>
            
            </Canvas></div>
        </section> 
        
    )
        
}

DashboardPage.propTypes = {
    isDrawerOpen: PropTypes.bool.isRequired,


};
export default DashboardPage;