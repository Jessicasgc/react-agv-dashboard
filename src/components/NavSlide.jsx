import React, { useState } from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { Link } from 'react-router-dom';
import { Drawer, Button, Divider, Menu } from 'antd';
import { MenuOutlined, DashboardOutlined, AppstoreOutlined, ScheduleOutlined } from '@ant-design/icons';
const { Item } = Menu;
function NavSlide(){
    const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
    return (
        <LocaleConsumer>
            {() => {
                return (
             <div className='nav-drawer'>
                 <Button className="burger-button" type="primary" onClick={showDrawer}>
                          <MenuOutlined />
                        </Button>
                        <Drawer
        title="Navigation"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
                   <Menu mode="inline" className='menu-nav'>
                <Item key="1" icon={<DashboardOutlined />}><Link to='/'>Dashboard</Link></Item>
                <Item key="2" icon={<AppstoreOutlined />}><Link to='/item'>Item</Link></Item>
                <Item key="3" icon={<ScheduleOutlined />}><Link to='/task'>Task</Link></Item>
              </Menu>
                        </Drawer>
             </div>
                        
                    
                    
                )
            }
        }
        </LocaleConsumer>
    )
}
  

export default NavSlide;
