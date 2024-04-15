
const PageLimitSelector = ({ onChange, perPage }) => {
    const handlePageLimitChange = (event) => {
        onChange(parseInt(event.target.value));
    };

    return (
        <div className="page-limit-selector">
            <label htmlFor="pageLimit">Elementos por página:</label>
            <select id="pageLimit" value={perPage} onChange={handlePageLimitChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    );
};

export default PageLimitSelector;