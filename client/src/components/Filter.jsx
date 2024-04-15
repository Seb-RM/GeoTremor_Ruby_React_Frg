
const Filter = ({ onChange }) => {
    const handleFilterChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className="filter">
        <label htmlFor="magTypeFilter">Filtrado por Magnitude Type:</label>
        <select id="magTypeFilter" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="md">md</option>
            <option value="ml">ml</option>
            <option value="ms">ms</option>
            <option value="mw">mw</option>
            <option value="me">me</option>
            <option value="mi">mi</option>
            <option value="mb">mb</option>
            <option value="mlg">mlg</option>
        </select>
        </div>
    );
};

export default Filter;