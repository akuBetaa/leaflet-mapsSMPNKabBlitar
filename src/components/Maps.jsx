import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { dataSekolah } from "@/lib/data";

const greenIcon = new L.Icon({
  iconUrl: "/marker-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: "/marker-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Maps = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const markersRef = useRef([]);
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  const handleMarkerMouseOver = (index) => {
    markersRef.current[index].openPopup();
    setShowPopup(true);
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(dataSekolah[index]);
    setShowPopup(false); // Close popup on click
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-5 px-5 pt-5">
      <div className="flex-1 md:flex-[3]">
        <MapContainer
          center={[-8.1, 112.3]}
          zoom={11}
          className="h-[300px] w-full md:h-[500px] rounded-2xl"
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {dataSekolah.map((sekolah, index) => (
            <Marker
              key={sekolah.id}
              position={[
                sekolah.coordinate.latitude,
                sekolah.coordinate.longitude,
              ]}
              icon={sekolah.accreditation === "A" ? greenIcon : redIcon}
              ref={(el) => (markersRef.current[index] = el)}
              eventHandlers={{
                mouseover: () => handleMarkerMouseOver(index),
                click: () => handleMarkerClick(index),
              }}
            >
              {showPopup && (
                <Popup>
                  <div className="max-w-xs overflow-hidden">
                    <img
                      src={sekolah.image}
                      alt={sekolah.name}
                      className="w-full h-36 object-cover mb-2"
                    />
                    <h3 className="text-lg font-bold m-0 p-0">{sekolah.name}</h3>
                    <p className="p-0 m-0">{sekolah.coordinate.latitude}, {sekolah.coordinate.longitude}</p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedMarker && (
        <div className="flex-1 md:w-96 p-4 shadow-lg border border-border rounded-xl">
          <div className="mt-3">
            <img
              src={selectedMarker.image}
              className="w-full h-48 object-cover rounded-md mb-2"
              alt={selectedMarker.name}
            />
            <h3 className="text-xl font-bold m-0">{selectedMarker.name}</h3>
            <p className="text-lg font-bold mt-2">Alamat:</p>
            <p className="text-base font-normal m-0">{selectedMarker.address}</p>
            <div className="mt-2">
              <table className="min-w-full">
                <tbody className="bg-white">
                  <tr>
                    <td className=" py-1 font-medium text-gray-900 whitespace-nowrap">
                      Akreditasi
                    </td>
                    <td className="py-1 text-gray-700 whitespace-nowrap">
                      {selectedMarker.accreditation}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-900 whitespace-nowrap">
                      Jumlah Siswa
                    </td>
                    <td className="py-1 text-gray-700 whitespace-nowrap">
                      {selectedMarker.total.student}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-900 whitespace-nowrap">
                      Jumlah Guru
                    </td>
                    <td className="py-1 text-gray-700 whitespace-nowrap">
                      {selectedMarker.total.teacher}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-900 whitespace-nowrap">
                      Luas Area
                    </td>
                    <td className="py-1 text-gray-700 whitespace-nowrap">
                      {selectedMarker.total.area}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maps;
