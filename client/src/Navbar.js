import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard.js';
import './index.css';

function Home() {
    // Stores all properties fetched from the backend
    const [properties, setProperties] = useState([]);
    
    // Stores properties that match the user's filters
    const [filteredProperties, setFilteredProperties] = useState([]);
    
    // Stores user-entered filter values
    const [filters, setFilters] = useState({
        minPrice: '',  // Minimum price filter
        maxPrice: '',  // Maximum price filter
        minRooms: '',  // Minimum number of rooms filter
        maxRooms: ''   // Maximum number of rooms filter
    });

    // Fetch properties from the backend when the page loads
    useEffect(() => {
        fetch('http://localhost:5000/properties')
            .then(response => response.json()) // Convert response to JSON
            .then(data => {
                setProperties(data);        // Store all properties
                setFilteredProperties(data); // Show all properties by default
            })
            .catch(error => console.error('Error fetching properties:', error));
    }, []);

    // Function to filter properties based on user input
    const applyFilters = () => {
        let filtered = properties;

        // Filter by price range if both min and max values are provided
        if (filters.minPrice !== '' && filters.maxPrice !== '') {
            filtered = filtered.filter(property =>
                property.price >= filters.minPrice && property.price <= filters.maxPrice
            );
        }

        // Filter by room count if both min and max values are provided
        if (filters.minRooms !== '' && filters.maxRooms !== '') {
            filtered = filtered.filter(property =>
                property.room >= filters.minRooms && property.room <= filters.maxRooms
            );
        }

        setFilteredProperties(filtered); // Update the list of displayed properties
    };

    // Function to update filter values when user types in input fields
    const handleFilterChange = event => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value }); // Update filter state
    };

    return (
        <div className="home-container">
            {/* Filter Section */}
            <div className="filter">
                <label>Minimum Price:</label>
                <input type="number" name="minPrice"
                    value={filters.minPrice} onChange={handleFilterChange} />
                
                <label>Maximum Price:</label>
                <input type="number" name="maxPrice"
                    value={filters.maxPrice} onChange={handleFilterChange} />
                
                <label>Minimum Rooms:</label>
                <input type="number" name="minRooms"
                    value={filters.minRooms} onChange={handleFilterChange} />
                
                <label>Maximum Rooms:</label>
                <input type="number" name="maxRooms"
                    value={filters.maxRooms} onChange={handleFilterChange} />
                
                {/* Button to apply filters */}
                <button onClick={applyFilters}>Apply</button>
            </div>
            
            {/* Display filtered properties */}
            <div className='parent-property'>
                <div className="property-list">
                    {/* Show properties that match filters */}
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <p>No properties found</p> // Message when no properties match the filter
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
