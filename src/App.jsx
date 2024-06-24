import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { dataSekolah } from '@/lib/data';

// Memperbaiki masalah ikon default Leaflet yang tidak muncul
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function App() {
  return (
    <div className='p-4 flex flex-col '>
      <h1 className='text-center'>Peta Zonasi SMP</h1>
      <MapContainer center={[-8.1, 112.3]} zoom={11} style={{ height: "600px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         {dataSekolah.map(sekolah => (
        <Marker key={sekolah.id} position={[sekolah.coordinate.latitude, sekolah.coordinate.longitude]}>
          <Popup>
            <div>
              <h2>{sekolah.name}</h2>
              <p><strong>Alamat:</strong> {sekolah.address}</p>
              <p><strong>Akreditasi:</strong> {sekolah.accreditation}</p>
              <p><strong>Jumlah Siswa:</strong> {sekolah.total.student}</p>
              <p><strong>Jumlah Guru:</strong> {sekolah.total.teacher}</p>
              <p><strong>Luas Area:</strong> {sekolah.total.area}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      </MapContainer>
    </div>
  );
}

export default App;
