import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { dataSekolah } from "@/lib/data";
import styles from "@/style/maps.module.css"; // Import the CSS module

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
    <div
      className={`${styles.mapContainer} ${
        selectedMarker ? styles.withInfo : ""
      }`}
    >
      <div className={styles.map}>
        <MapContainer
          center={[-8.1, 112.3]}
          zoom={11}
          style={{ height: "720px", width: "100%" }}
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
                  <div
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      // padding: '16px',
                    }}
                  >
                    <img
                      src={sekolah.image}
                      alt={sekolah.name}
                      style={{
                        width: "300px",
                        height: "150px",
                        objectFit: "cover",
                        marginBottom: "8px",
                      }}
                    />
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "0",
                      }}
                    >
                      {sekolah.name}
                    </h3>
                  </div>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedMarker && (
        <div className={styles.info}>
          <div style={{ marginTop: "20px" }}>
            <img
              src={selectedMarker.image}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
              alt=""
            />
            <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
              {selectedMarker.name}
            </h3>
            <p style={{ fontSize: "16px", fontWeight: "bold", margin: "" }}>
              Alamat:{" "}
            </p>
            <p style={{ fontSize: "16px", fontWeight: "normal", margin: "0" }}>
              {selectedMarker.address}
            </p>
            <div style={{ marginTop: "8px" }}>
              <p>Akreditasi: {selectedMarker.accreditation}</p>
              <p>Jumlah Siswa: {selectedMarker.total.student}</p>
              <p>Jumlah Guru: {selectedMarker.total.teacher}</p>
              <p>Luas Area: {selectedMarker.total.area}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maps;
