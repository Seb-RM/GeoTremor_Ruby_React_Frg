
function Pagination({ currentPage, totalPages, onPageChange }) {
    const nearbyPages = 2; 

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];

        buttons.push(
            <button
            key="first"
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}>
            &lt;&lt;
            </button>
        );


        buttons.push(
            <button
                key="previous"
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}>
                Anterior
            </button>
        );

        for (
            let page = currentPage - nearbyPages;
            page <= currentPage + nearbyPages;
            page++
        ) {
            if (page > 0 && page <= totalPages) {
            buttons.push(
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={currentPage === page ? "active" : ""}>
                    {page}
                </button>
            );
            }
        }

        buttons.push(
            <button
                key="next"
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Siguiente
            </button>
        );

        buttons.push(
            <button
                key="last"
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages}>
                &gt;&gt;
            </button>
        );

        return buttons;
    };

    return <div className="pagination">{renderPageButtons()}</div>;
}

export default Pagination;