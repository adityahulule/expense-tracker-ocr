import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://expense-tracker-ocr-6.onrender.com';
function GovernmentSchemes() {

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/api/schemes`
      );

      setSchemes(response.data || []);

    } catch (err) {

      console.error(
        'Error loading government schemes:',
        err
      );

      setError(
        'Unable to load government schemes.'
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.icon}>🏛️</div>
        <h2>Loading Government Schemes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        ❌ {error}
      </div>
    );
  }

  return (
    <div>

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            🏛️ Government Schemes
          </h1>

          <p style={styles.subtitle}>
            Government schemes available for farmers
          </p>
        </div>

      </div>

      {schemes.length === 0 ? (

        <div style={styles.emptyCard}>

          <div style={styles.bigIcon}>
            🏛️
          </div>

          <h2>
            No Government Schemes Available
          </h2>

          <p>
            Government schemes will appear here
            when they are added by the administrator.
          </p>

        </div>

      ) : (

        <div style={styles.grid}>

          {schemes.map((scheme) => (

            <div
              key={scheme.id}
              style={styles.card}
            >

              <div style={styles.cardHeader}>

                <h2>
                  {scheme.schemeName}
                </h2>

                <span style={styles.status}>
                  {scheme.status || 'Active'}
                </span>

              </div>

              <p style={styles.description}>
                {scheme.description}
              </p>

              <div style={styles.info}>

                <div>
                  <strong>Eligibility</strong>
                  <p>
                    {scheme.eligibility || 'Not specified'}
                  </p>
                </div>

                <div>
                  <strong>Benefits</strong>
                  <p>
                    {scheme.benefits || 'Not specified'}
                  </p>
                </div>

                <div>
                  <strong>Department</strong>
                  <p>
                    {scheme.department || 'Government Department'}
                  </p>
                </div>

                <div>
                  <strong>Year</strong>
                  <p>
                    {scheme.year || 'N/A'}
                  </p>
                </div>

              </div>

              {scheme.officialLink && (

                <a
                  href={scheme.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  🔗 View Official Website
                </a>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}


const styles = {

  header: {
    marginBottom: '25px'
  },

  title: {
    color: '#14532d',
    marginBottom: '5px'
  },

  subtitle: {
    color: '#64748b'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns:
      'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px'
  },

  card: {
    background: 'white',
    padding: '25px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow:
      '0 4px 12px rgba(0,0,0,0.06)'
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '15px'
  },

  status: {
    background: '#dcfce7',
    color: '#15803d',
    padding: '5px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  },

  description: {
    color: '#475569',
    lineHeight: '1.6',
    marginTop: '15px'
  },

  info: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },

  link: {
    display: 'inline-block',
    marginTop: '20px',
    background: '#15803d',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600'
  },

  emptyCard: {
    background: 'white',
    padding: '60px 30px',
    textAlign: 'center',
    borderRadius: '16px',
    border: '1px solid #e2e8f0'
  },

  bigIcon: {
    fontSize: '55px',
    marginBottom: '15px'
  },

  center: {
    textAlign: 'center',
    padding: '60px'
  },

  icon: {
    fontSize: '45px'
  },

  error: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '20px',
    borderRadius: '10px'
  }

};

export default GovernmentSchemes;