import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import DeleteButton from '../DeleteButton';
import ThemeContext from '../../contexts/ThemeContext';
import EditUserButton from './EditUserButton';
import { deleteUserById, updateUserStatusById, register } from '../../utils/crud_api';
import LocaleContext from '../../contexts/LocaleContext';
import useUsers from '../../custom_hooks/GET_HOOKS/useUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import RegisterInput from './RegisterInput';
import { Link } from 'react-router-dom';

function UsersTable() {
    const {locale} = React.useContext(LocaleContext);
    const {theme} = React.useContext(ThemeContext);
    const { users, loading, setUsers } = useUsers();
    const [usersColumns, setUsersColumns] = useState([]);
    const [activeStatus, setActiveStatus] = useState({});
    
    const handleToggleStatus = async (id, is_active) => {
      
            const response = await updateUserStatusById(id, {is_active: !is_active} );
            console.log(response)
            setActiveStatus(prevStatus => ({
                ...prevStatus,
                [id]: !is_active
            }));
            console.log('Toggling status for item with ID:', id);
       
    };

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            { dataIndex: 'name', title: locale === 'id' ? 'Nama' : 'Name'},
            { dataIndex: 'email', title: 'Email'},
            { dataIndex: 'role', title: locale === 'id' ? 'Peran' : 'Role' },
            // { dataIndex: 'password', title: locale === 'id' ? 'Kata Sandi' : 'Password' },
            {
                dataIndex: 'is_active',
                title: locale === 'id' ? 'Status' : 'isActive',
                render: (_, record) => (
                    <button className="action" onClick={() => handleToggleStatus(record.id, record.is_active)}>
                        <FontAwesomeIcon icon={record.is_active ? faToggleOn : faToggleOff} />
                    </button>
                )
            },
            {
                title: locale === 'id' ? 'Aksi' : 'Action',
                key: 'action',
                render: (_, record) => (
                    <div className='set-icon'>
                        <EditUserButton id={record.id} onUserEdited={handleUserEdit}/>
                        <DeleteButton id={record.id} onDelete={() => handleDelete(record.id)} />
                    </div>
                    
                )
            }
        ];

        useEffect(() => {
            if (updatedColumns.length > 0) {
                for (let i = 0; i < users.length; i++) {
                    users[i]['No'] = i + 1;
                }
            }
            setUsersColumns(updatedColumns);
        }, [locale, users]);

        const handleUserEdit = (updatedUser) => {
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                )
            );
        };
        const handleDelete = async(id) => {
            await deleteUserById(id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            console.log('Deleting item with ID:', id)
        };
        const handleUserRegister = async (newUser) => {
            setUsers(prevUsers => [...prevUsers, newUser]);
        };

    return (
        <div>
            {/* <h2>Items</h2> */}
            <section>
                <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun' : 'Fill the form for account registration'}</h2>
                <RegisterInput onRegister={handleUserRegister} />
            </section>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ReusableTable data={users.map(user => ({
                    ...user,
                    is_active: activeStatus[user.id] !== undefined ? activeStatus[user.id] : user.is_active
                }))} columns={usersColumns} theme={theme}/>
            )}
        </div>
    );
}

export default UsersTable;
