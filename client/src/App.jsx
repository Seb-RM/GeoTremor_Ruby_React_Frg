import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import PageLimitSelector from "./components/PageLimitSelector";
import "./App.scss";

function formatDate(timestamp) {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleString();
}

function App() {

  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [magTypeFilter, setMagTypeFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/features?page=${currentPage}&per_page=${perPage}&mag_type=${magTypeFilter}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFeatures(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, magTypeFilter, perPage]);

  useEffect(() => {
    setCurrentPage(pagination.current_page || 1);
    setTotalPages(pagination.total || 1);
  }, [pagination]);

  const handleFilterChange = (filterValue) => {
    setMagTypeFilter(filterValue);
  };

  const handlePageLimitChange = (newPerPage) => {
    setPerPage(newPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="App">
      <h1>GeoTremor App</h1>
      <h2>Datos de eventos sismológicos del ultimo mes:</h2>
      <Filter onChange={handleFilterChange} />
      <PageLimitSelector onChange={handlePageLimitChange} perPage={perPage} />
      <ul className="feature-list">
        {features.map((feature) => (
          <li key={feature.id}>
            <h3>{feature.attributes.title}</h3>
            <p>
              <strong>Magnitude:</strong> {feature.attributes.magnitude}
            </p>
            <p>
              <strong>Place:</strong> {feature.attributes.place}
            </p>
            <p>
              <strong>Time:</strong> {formatDate(feature.attributes.time)}
            </p>
            <p>
              <strong>TSunami:</strong>{" "}
              {feature.attributes.tsunami ? "Yes" : "No"}
            </p>
            <p>
              <strong>MagType:</strong> {feature.attributes.mag_type}
            </p>
            <p>
              <strong>Coordinates:</strong>{" "}
              {feature.attributes.coordinates
                ? `${feature.attributes.coordinates.longitude}, ${feature.attributes.coordinates.latitude}`
                : "N/A"}
            </p>
            <p>
              <strong>External URL:</strong>{" "}
              <a
                href={feature.links ? feature.links.external_url : "#"}
                target="_blank"
                rel="noopener noreferrer">
                {feature.links ? feature.links.external_url : "N/A"}
              </a>
            </p>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
