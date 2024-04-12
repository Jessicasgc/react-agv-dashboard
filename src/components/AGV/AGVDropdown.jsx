import PropTypes from 'prop-types';

function AGVDropdown({ agvData, onChange }) {
    const handleAGVChange = (event) => {
        onChange(event.target.value); // Pass selected AGV to parent component
    };

    return (
        <select onChange={handleAGVChange}>
            <option value="">Select AGV</option>
            {agvData.map((agv) => (
                <option key={agv.id} value={agv.id}>
                    {agv.agv_name} {/* Assuming each AGV object has a name property */}
                </option>
            ))}
        </select>
    );
}

AGVDropdown.propTypes = {
    agvData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            agv_name: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default  AGVDropdown;
