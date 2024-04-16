import { useState } from 'react';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { Link } from 'react-router-dom';
import { Drawer, Button, Menu } from 'antd';
import { MenuOutlined, DashboardOutlined, AppstoreOutlined, ScheduleOutlined } from '@ant-design/icons';
const { Item } = Menu;

function NavSlide() {
    const [visible, setVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleMenuItemClick = (e) => {
        setSelectedKey(e.key);
    };
    return (
        <LocaleConsumer>
        {({ theme }) => {
            return (
                <div className='nav-drawer' style={{ backgroundColor: theme === 'light' ? 'var(--background-light)' : 'var(--background-dark)' }}>
                    <Button className="burger-button" type="primary" onClick={showDrawer} style={{ backgroundColor: 'var(--on-primary)' }}>
                        <MenuOutlined />
                    </Button>
                    <Drawer
                        title={<span style={{ color: theme === 'light' ? 'var(--on-background)' : 'var(--on-surface)', fontSize: 20 }}>Navigation</span>}
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        className="custom-drawer"
                        width={250}
                        style={{ backgroundColor: theme === 'light' ? 'var(--on-background-light)' : 'var(--on-background-dark)' }}
                    >
                        <Menu mode="inline" className='menu-nav' style={{ backgroundColor: theme === 'light' ? 'var(--background-dark)' : 'var(--background-light)' }} selectedKeys={[selectedKey]} onClick={handleMenuItemClick}>
                            <Item key="1" icon={<DashboardOutlined style={{ fontSize: '24px' }}/>} style={{ color: selectedKey === '1' ? (theme === 'light' ? 'var(--on-background-light)' : 'var(--on-background-dark)') : 'var(--on-background)' }}><Link to='/'>Dashboard</Link></Item>
                            <Item key="2" icon={<AppstoreOutlined style={{ fontSize: '24px' }}/>} style={{ color: selectedKey === '2' ? (theme === 'light' ? 'var(--on-background-light)' : 'var(--on-background-dark)') : 'var(--on-background)'}}><Link to='/item'>Item</Link></Item>
                            <Item key="3" icon={<ScheduleOutlined style={{ fontSize: '24px' }}/>} style={{ color: selectedKey === '3' ? (theme === 'light' ? 'var(--on-background-light)' : 'var(--on-background-dark)') : 'var(--on-background)' }}><Link to='/task'>Task</Link></Item>
                        </Menu>
                    </Drawer>
                </div>
            )
        }}
    </LocaleConsumer>
    )
}

export default NavSlide;
