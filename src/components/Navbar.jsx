import React from 'react';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router untuk routing antar halaman

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#3498db', padding: '10px 0' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>SMPN Kab. Blitar</Link>
        </div>
        <div>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
            <li style={{ marginLeft: '15px' }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Maps</Link>
            </li>
            <li style={{ marginLeft: '15px' }}>
              <Link to="/zonasi" style={{ color: '#fff', textDecoration: 'none' }}>Fitur Penentuan Jarak Rumah</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
