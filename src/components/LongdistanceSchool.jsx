import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { dataSekolah } from '@/lib/data'; 
import { haversineDistance } from '@/lib/haversine';
import { Input } from '@/components/ui/input';
import { FormField , Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const LongdistanceSchool = () => {
  const [markerPosition, setMarkerPosition] = useState([-8.101820370932009, 112.27687703867429]); // Default coordinates
  const [formState, setFormState] = useState({
    studentName: '',
    latitude: '-8.101820370932009',
    longitude: '112.27687703867429',
  });
  const [distances, setDistances] = useState([]);
  const [recommendation, setRecommendation] = useState('');

  const calculateDistances = () => {
    const updatedDistances = dataSekolah.map((sekolah) => {
      const { latitude, longitude } = sekolah.coordinate;
      const distance = haversineDistance(latitude, longitude, markerPosition[0], markerPosition[1]);
      return {
        id: sekolah.id,
        name: sekolah.name,
        distance: distance.toFixed(2),
      };
    });

    updatedDistances.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    const nearestDistances = updatedDistances.slice(0, 5);

    setDistances(nearestDistances);

    const nearestSchool = nearestDistances[0];
    setRecommendation(`Hai <strong>${formState.studentName}</strong>! <br> Rekomendasi sekolah terdekat untukmu: ${nearestSchool.name}`);
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
    <div className="flex flex-col md:flex-row gap-5 items-center px-5 md:px-20">
      <div className="flex-1 flex-col flex items-center justify-center pt-5">
        <MapContainer center={[-8.101820370932009, 112.27687703867429]} zoom={13} className="h-[300px] w-[100%] md:h-[500px] rounded-2xl" onClick={handleClick}>
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
        <div className=''>
          <p className='text-sm pt-2'>Note : Pindah titik diatas berdasarkan lokasi rumahmu</p>
        </div>
      </div>

      <div className="flex-1 p-5 rounded md:min-h-[550px]">
        <div>
          <h3 className="text-xl font-bold mb-3">Form Pemilihan Sekolah</h3>
        </div>
        <form onSubmit={handleCalculate} className="mb-5">
          <label className="block mb-2">
            Nama Siswa:
            <input
              type="text"
              name="studentName"
              value={formState.studentName}
              onChange={handleInputChange}
              className="ml-2 p-2 rounded border border-gray-300 w-full"
            />
          </label>
          <label className="block mb-2">
            Latitude:
            <input
              type="text"
              name="latitude"
              value={formState.latitude}
              readOnly
              className="ml-2 p-2 rounded border border-gray-300 w-full"
            />
          </label>
          <label className="block mb-2">
            Longitude:
            <input
              type="text"
              name="longitude"
              value={formState.longitude}
              readOnly
              className="ml-2 p-2 rounded border border-gray-300 w-full"
            />
          </label>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full mt-2">Hitung Jarak</button>
        </form>

        {distances.length > 0 && (
          <div className="">
            {recommendation && (
              <p className="mb-2 font-bold" dangerouslySetInnerHTML={{ __html: recommendation }} />
            )}
            <p className="font-bold">Sekolah Jarak Terdekat:</p>
            <ol className="pl-5 list-decimal">
              {distances.map((item) => (
                <li key={item.id} className="mb-1">
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
