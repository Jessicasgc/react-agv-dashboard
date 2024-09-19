import React from 'react';
import { Table, Space, Tag } from 'antd';
import PropTypes from 'prop-types';

function ReusableTable({ data, columns, theme }) {
    return (
        <div className={`table-container ${theme === 'dark' ? 'dark-theme' : ''}`}>
            <Table className={`reusable-table ${theme}`} dataSource={data}>
                {columns.map(column => {
                    if (column.children) {
                        return (
                            <Table.ColumnGroup key={column.title} title={column.title} className={`reusable-table ${theme}`}>
                                {column.children.map((child) => (
                                    <Table.Column
                                        key={child.dataIndex}
                                        title={child.title}
                                        dataIndex={child.dataIndex}
                                    />
                                ))}
                            </Table.ColumnGroup>
                        );
                    } else {
                        return (
                            <Table.Column
                                key={column.dataIndex}
                                title={column.title}
                                dataIndex={column.dataIndex}
                                render={(text, record) => {
                                    if (column.render) {
                                        return column.render(text, record);
                                    } else {
                                        return text;
                                    }
                                }}
                            />
                        );
                    }
                })}
                {/* <Table.Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a>Invite {record.lastName}</a>
                            <a>Delete</a>
                        </Space>
                    )}
                /> */}
            </Table>
        </div>
    );
}

ReusableTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataIndex: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    dataIndex: PropTypes.string.isRequired,
                    title: PropTypes.string.isRequired
                })
            ),
            render: PropTypes.func // Added render prop type
        })
    ).isRequired,
    theme: PropTypes.string.isRequired

};

export default ReusableTable;
