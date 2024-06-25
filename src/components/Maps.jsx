import React, { useState, useRef } from "react";
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

  const handleMarkerMouseOver = (index) => {
    markersRef.current[index].openPopup();
    setShowPopup(true);
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(dataSekolah[index]);
    setShowPopup(false); // Close popup on click
  };

  return (
    <div className="flex h-full w-full">
      <div className="">
        <MapContainer
          center={[-8.1, 112.3]}
          zoom={11}
          style={{ height: "750px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://github.com/akuBetaa/">AkuBetaa</a> contributors'
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
                  <div>
                    <h2>{sekolah.name}</h2>
                    <p>
                      <strong>Alamat:</strong> {sekolah.address}
                    </p>
                    <p>
                      <strong>Akreditasi:</strong> {sekolah.accreditation}
                    </p>
                    <p>
                      <strong>Jumlah Siswa:</strong> {sekolah.total.student}
                    </p>
                    <p>
                      <strong>Jumlah Guru:</strong> {sekolah.total.teacher}
                    </p>
                    <p>
                      <strong>Luas Area:</strong> {sekolah.total.area}
                    </p>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="">
        {selectedMarker && (
          <div>
            <h3>Informasi Sekolah Terpilih:</h3>
            <p>Nama: {selectedMarker.name}</p>
            <p>Alamat: {selectedMarker.address}</p>
            <p>Akreditasi: {selectedMarker.accreditation}</p>
            <p>Jumlah Siswa: {selectedMarker.total.student}</p>
            <p>Jumlah Guru: {selectedMarker.total.teacher}</p>
            <p>Luas Area: {selectedMarker.total.area}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
