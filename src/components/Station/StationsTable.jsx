import React, { useState, useEffect } from 'react';
import ReusableTable from '../ReusableTable';
import useStations from '../../custom_hooks/GET_HOOKS/useStations';
import useItemTypes from '../../custom_hooks/GET_HOOKS/useItemTypes';
import DeleteButton from '../DeleteButton';
import ThemeContext from '../../contexts/ThemeContext';
import EditStationButton from './EditStationButton';
import { deleteStationById } from '../../utils/crud_api';
import LocaleContext from '../../contexts/LocaleContext';
import AddStationButton from './AddStationButton';

function StationsTable() {
    const { locale } = React.useContext(LocaleContext);
    const { theme } = React.useContext(ThemeContext);
    const { itemtypes, loading: itemTypeLoading } = useItemTypes();
    const { stations, loading, fetchStations, setStations } = useStations();
    const [stationsColumns, setStationsColumns] = useState([]);

    useEffect(() => {
        const updatedColumns = [
            { dataIndex: 'No', title: 'No' },
            { dataIndex: 'id', title: 'ID' },
            {
                dataIndex: 'id_type',
                title: locale === 'id' ? 'Nama Tipe' : 'Type Name',
                render: (typeId) => {
                    const foundType = itemtypes.find(type => type.id === typeId);
                    return foundType ? foundType.type_name : itemTypeLoading ? 'Loading...' : 'Unknown';
                }
            },
            { dataIndex: 'station_name', title: locale === 'id' ? 'Nama Stasiun' : 'Station Name' },
            { dataIndex: 'x', title: locale === 'id' ? 'Koordinat X' : 'X Coordinate' },
            { dataIndex: 'y', title: locale === 'id' ? 'Koordinat Y' : 'Y Coordinate' },
            { dataIndex: 'stock', title: locale === 'id' ? 'Stok' : 'Stock' },
            { dataIndex: 'max_capacity', title: locale === 'id' ? 'Kapasitas Maksimal' : 'Max Capacity' },
            {
                title: locale === 'id' ? 'Aksi' : 'Action',
                key: 'action',
                render: (_, record) => (
                    <div className='set-icon'>
                        <EditStationButton id={record.id} onStationEdited={fetchStations}/>
                        <DeleteButton id={record.id} onDelete={() => handleDelete(record.id)} />
                    </div>
                )
            }
        ];

        if (stations.length > 0) {
            for (let i = 0; i < stations.length; i++) {
                stations[i]['No'] = i + 1;
            }
            setStationsColumns(updatedColumns);
        } else {
            setStationsColumns([]); // Jika stations kosong, set kolom ke array kosong
        }
    }, [locale, stations, itemtypes, itemTypeLoading, fetchStations]);

    const handleDelete = (id) => {
        deleteStationById(id);
        setStations(prevStations => prevStations.filter(station => station.id !== id));
        console.log('Deleting station with ID:', id);
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <AddStationButton onStationAdded={fetchStations} />
                    {stations.length > 0 && (
                        <ReusableTable data={stations} columns={stationsColumns} theme={theme} />
                    )}
                </>
            )}
        </div>
    );
}

export default StationsTable;
