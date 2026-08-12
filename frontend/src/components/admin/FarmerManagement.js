import React, { useEffect, useState } from 'react';
import {
  getAllFarmers,
  getFarmerById
} from '../../services/adminService';

import './FarmerManagement.css';

function FarmerManagement({ onManagePermissions }) {

  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  // ==========================================
  // LOAD ALL FARMERS
  // ==========================================

  const loadFarmers = async () => {

    try {

      setLoading(true);
      setError('');

      const data = await getAllFarmers();

      setFarmers(
        Array.isArray(data) ? data : []
      );

    } catch (error) {

      console.error(
        'Error loading farmers:',
        error
      );

      setError(
        'Unable to load farmers. Please check the backend.'
      );

      setFarmers([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadFarmers();
  }, []);

  // ==========================================
  // VIEW FARMER DETAILS
  // ==========================================

  const handleViewDetails = async (id) => {

    try {

      setDetailsLoading(true);
      setSelectedFarmer(null);

      const data = await getFarmerById(id);

      setSelectedFarmer(data);

    } catch (error) {

      console.error(
        'Error loading farmer details:',
        error
      );

      alert(
        'Unable to load farmer details.'
      );

    } finally {

      setDetailsLoading(false);

    }
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeDetails = () => {
    setSelectedFarmer(null);
  };

  // ==========================================
  // SEARCH FARMERS
  // ==========================================

  const filteredFarmers = farmers.filter((farmer) => {

    const search =
      searchTerm.toLowerCase().trim();

    return (

      String(farmer.fullName || '')
        .toLowerCase()
        .includes(search)

      ||

      String(farmer.name || '')
        .toLowerCase()
        .includes(search)

      ||

      String(farmer.email || '')
        .toLowerCase()
        .includes(search)

      ||

      String(
        farmer.mobile ||
        farmer.phone ||
        ''
      )
        .toLowerCase()
        .includes(search)

    );
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="farmer-management">

        <div className="farmer-loading">
          🌾 Loading farmers...
        </div>

      </div>

    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="farmer-management">

      {/* HEADER */}

      <div className="farmer-page-header">

        <div>

          <h2>
            👨‍🌾 Farmer Management
          </h2>

          <p>
            View and manage registered farmers
          </p>

        </div>

        <div className="farmer-count">

          <span>
            {farmers.length}
          </span>

          <small>
            Total Farmers
          </small>

        </div>

      </div>


      {/* SEARCH TOOLBAR */}

      <div className="farmer-toolbar">

        <div className="farmer-search">

          🔍

          <input
            type="text"
            placeholder="Search farmer by name, email or mobile..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />

        </div>


        <button
          className="refresh-farmer-btn"
          onClick={loadFarmers}
        >
          🔄 Refresh
        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="farmer-error">

          ⚠️ {error}

        </div>

      )}


      {/* FARMER LIST */}

      {filteredFarmers.length === 0 ? (

        <div className="farmer-empty">

          <div className="empty-farmer-icon">
            👨‍🌾
          </div>

          <h3>
            No Farmers Found
          </h3>

          <p>

            {searchTerm

              ? 'No farmer matches your search.'

              : 'No farmers are registered yet.'

            }

          </p>

        </div>

      ) : (

        <div className="farmer-table-card">

          {/* TABLE HEADER */}

          <div className="farmer-table-header">

            <div>Farmer</div>
            <div>Email</div>
            <div>Mobile</div>
            <div>Role</div>
            <div>Action</div>

          </div>


          {/* FARMERS */}

          {filteredFarmers.map((farmer) => (

            <div
              className="farmer-table-row"
              key={farmer.id}
            >

              {/* FARMER */}

              <div className="farmer-name-cell">

                <div className="farmer-avatar">

                  {(
                    farmer.fullName ||
                    farmer.name ||
                    'F'
                  )
                    .charAt(0)
                    .toUpperCase()}

                </div>


                <div>

                  <strong>

                    {farmer.fullName ||
                      farmer.name ||
                      'Unknown Farmer'}

                  </strong>

                  <small>

                    ID: {farmer.id}

                  </small>

                </div>

              </div>


              {/* EMAIL */}

              <div className="farmer-email">

                {farmer.email || 'N/A'}

              </div>


              {/* MOBILE */}

              <div>

                {farmer.mobile ||
                  farmer.phone ||
                  'N/A'}

              </div>


              {/* ROLE */}

              <div>

                <span className="farmer-role">

                  {farmer.role || 'FARMER'}

                </span>

              </div>


              {/* ACTION */}

              <div>

                <button
                  className="view-farmer-btn"
                  onClick={() =>
                    handleViewDetails(
                      farmer.id
                    )
                  }
                >

                  👁️ View Details

                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* ==========================================
          FARMER DETAILS MODAL
      ========================================== */}

      {(selectedFarmer || detailsLoading) && (

        <div
          className="farmer-modal-overlay"
          onClick={() => {

            if (!detailsLoading) {
              closeDetails();
            }

          }}
        >

          <div
            className="farmer-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="farmer-modal-header">

              <div>

                <h3>
                  👨‍🌾 Farmer Details
                </h3>

                <p>
                  Complete farmer information
                </p>

              </div>


              <button
                className="modal-close-btn"
                onClick={closeDetails}
              >

                ✕

              </button>

            </div>


            {/* LOADING */}

            {detailsLoading ? (

              <div className="details-loading">

                🌾 Loading farmer details...

              </div>

            ) : (

              <>

                {/* DETAILS */}

                <div className="farmer-details-grid">

                  <div className="detail-box">

                    <span>
                      Full Name
                    </span>

                    <strong>

                      {selectedFarmer?.fullName ||
                        selectedFarmer?.name ||
                        'N/A'}

                    </strong>

                  </div>


                  <div className="detail-box">

                    <span>
                      Email
                    </span>

                    <strong>

                      {selectedFarmer?.email ||
                        'N/A'}

                    </strong>

                  </div>


                  <div className="detail-box">

                    <span>
                      Mobile
                    </span>

                    <strong>

                      {selectedFarmer?.mobile ||
                        selectedFarmer?.phone ||
                        'N/A'}

                    </strong>

                  </div>


                  <div className="detail-box">

                    <span>
                      Role
                    </span>

                    <strong>

                      {selectedFarmer?.role ||
                        'FARMER'}

                    </strong>

                  </div>


                  <div className="detail-box">

                    <span>
                      Farmer ID
                    </span>

                    <strong>

                      {selectedFarmer?.id}

                    </strong>

                  </div>


                  <div className="detail-box">

                    <span>
                      Account Status
                    </span>

                    <strong className="status-active">

                      Active

                    </strong>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="farmer-modal-actions">

                  <button
                    className="permission-btn"
                    onClick={() => {

                      if (
                        onManagePermissions &&
                        selectedFarmer?.id
                      ) {

                        onManagePermissions(
                          selectedFarmer.id
                        );

                      }

                      closeDetails();

                    }}
                  >

                    🔐 Manage Permissions

                  </button>


                  <button
                    className="modal-cancel-btn"
                    onClick={closeDetails}
                  >

                    Close

                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default FarmerManagement;