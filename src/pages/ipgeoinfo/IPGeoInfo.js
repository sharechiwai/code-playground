import React, {useState, useEffect} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

const IPGeoInfo = () => {
  const [activeIPInfo, setActiveIPInfo] = useState(null);
  const [lat, setLat] = useState(22.302711);
  const [lng, setLng] = useState(114.177216);

  useEffect(() => {
    fetch('http://ip-api.com/json')
      .then((res) => res.json())
      .then(
        (result) => {
          setLat(result.lat);
          setLng(result.lon);
          setActiveIPInfo(result);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  return (
    <div>
      <Map center={[lat, lng]} zoom={13}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {activeIPInfo != null ? (
          <Marker
            position={[activeIPInfo.lat, activeIPInfo.lon]}
            onClick={() => {
              setActiveIPInfo(activeIPInfo);
            }}
          >
            <Popup
              position={[activeIPInfo.lat, activeIPInfo.lon]}
              onClose={() => {
                setActiveIPInfo(activeIPInfo);
              }}
            >
              <div>
                <h2>{activeIPInfo.query}</h2>
                <table>
                  <tbody>
                    <tr>
                      <th>ISP</th>
                      <td>{activeIPInfo.isp}</td>
                    </tr>
                    <tr>
                      <th>Organisation</th>
                      <td>{activeIPInfo.org}</td>
                    </tr>
                    <tr>
                      <th>Lat</th>
                      <td>{activeIPInfo.lat}</td>
                    </tr>
                    <tr>
                      <th>Lng</th>
                      <td>{activeIPInfo.lon}</td>
                    </tr>
                    <tr>
                      <th>timezone</th>
                      <td>{activeIPInfo.timezone}</td>
                    </tr>
                    <tr>
                      <th>Region Name</th>
                      <td>{activeIPInfo.regionName}</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>{activeIPInfo.city}</td>
                    </tr>
                    <tr>
                      <th>Country</th>
                      <td>{activeIPInfo.country}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Popup>
          </Marker>
        ) : null}
      </Map>
    </div>
  );
};

export default IPGeoInfo;
