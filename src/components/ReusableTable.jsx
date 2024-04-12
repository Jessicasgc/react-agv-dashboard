import PropTypes from 'prop-types';

function ReusableTable({ data, columns }) {
    return (
        <table className='reusable-table'>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map(column => (
                            <td key={column.key}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

ReusableTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            header: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ReusableTable;
