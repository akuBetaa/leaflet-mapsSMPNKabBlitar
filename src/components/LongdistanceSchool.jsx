import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { dataSekolah } from '@/lib/data'; // Mengimpor data sekolah (disesuaikan dengan struktur folder Anda)
import { haversineDistance } from '@/lib/haversine'; // Mengimpor fungsi haversineDistance (disesuaikan dengan struktur folder Anda)

const LongdistanceSchool = () => {
  const [markerPosition, setMarkerPosition] = useState([-8.101820370932009, 112.27687703867429]); // Koordinat default
  const [formState, setFormState] = useState({
    studentName: '',
    latitude: '-8.101820370932009',
    longitude: '112.27687703867429',
  });
  const [distances, setDistances] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  // Fungsi untuk menghitung jarak dari semua sekolah ke markerPosition dan menentukan rekomendasi
  const calculateDistances = () => {
    const updatedDistances = dataSekolah.map((sekolah) => {
      const { latitude, longitude } = sekolah.coordinate;
      const distance = haversineDistance(latitude, longitude, markerPosition[0], markerPosition[1]);
      return {
        id: sekolah.id,
        name: sekolah.name,
        distance: distance.toFixed(2), // Jarak diambil dua angka desimal
      };
    });

    // Mengurutkan distances berdasarkan jarak terdekat ke terjauh
    updatedDistances.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

    // Memotong agar hanya 12 jarak terdekat yang ditampilkan
    const nearestDistances = updatedDistances.slice(0, 12);

    setDistances(nearestDistances);

    // Menetapkan rekomendasi berdasarkan sekolah terdekat
    const nearestSchool = nearestDistances[0]; // Ambil sekolah terdekat
    setRecommendation(`Hai <strong>${formState.studentName}</strong>! Berikut rekomendasi pemilihan sekolah berdasarkan jarak untukmu: ${nearestSchool.name}`);
  };

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    setFormState({
      ...formState,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateDistances();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* Peta di sebelah kiri */}
      <div style={{ flex: '2', borderRight: '1px solid #ccc', paddingRight: '20px' }}>
        <MapContainer center={[-8.101820370932009, 112.27687703867429]} zoom={13} style={{ height: '750px' }} onClick={handleClick}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={markerPosition} draggable={true} eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              setMarkerPosition([lat, lng]);
              setFormState({
                ...formState,
                latitude: lat.toString(),
                longitude: lng.toString(),
              });
            },
          }} />
        </MapContainer>
      </div>

      {/* Form di sebelah kanan */}
      <div style={{ flex: '1', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleCalculate} style={{ marginBottom: '20px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Nama Siswa:
            <input
              type="text"
              name="studentName"
              value={formState.studentName}
              onChange={handleInputChange}
              style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }}
            />
          </label>
          <br />
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Latitude:
            <input
              type="text"
              name="latitude"
              value={formState.latitude}
              readOnly
              style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }}
            />
          </label>
          <br />
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formState.longitude}
              readOnly
              style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px', border: '1px solid #ccc', width: '100%' }}
            />
          </label>
          <br />
          <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3182CE', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Hitung Jarak</button>
        </form>

        {distances.length > 0 && (
          <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {recommendation && (
              <p style={{ marginBottom: '10px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: recommendation }} />
            )}
            <p style={{ fontWeight: 'bold' }}>12 Jarak Terdekat:</p>
            <ol style={{ paddingLeft: '20px' }}>
              {distances.map((item) => (
                <li key={item.id} style={{ marginBottom: '5px' }}>
                  {item.name}: {item.distance} km
                </li>
              ))}
            </ol>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default LongdistanceSchool;
