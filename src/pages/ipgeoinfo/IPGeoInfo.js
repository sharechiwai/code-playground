import React, {useState, useEffect} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Button, InputLabel, TextField} from '@material-ui/core';

const IPGeoInfo = () => {
  const [activeIPInfo, setActiveIPInfo] = useState(null);
  const [ip, setIP] = useState(22.302711);
  const [lat, setLat] = useState(22.302711);
  const [lng, setLng] = useState(114.177216);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((result) => {
        const ip = result.ip;
        setIP(ip);
        fetch(`https://powertoys.vercel.app/geoipservices/${ip}`)
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
      });
  }, []);

  function openPopup(marker) {
    if (marker && marker.leafletElement) {
      window.setTimeout(() => {
        marker.leafletElement.openPopup();
      });
    }
  }

  function getIpGeoInfo() {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ip,
      )
    ) {
      fetch(`https://powertoys.vercel.app/geoipservices/${ip}`)
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
    } else {
      alert('Please enter valid IP address');
    }
  }

  return (
    <div>
      <form noValidate autoComplete='off'>
        <InputLabel>IP:</InputLabel>
        <TextField
          label='IP Address'
          variant='outlined'
          color='secondary'
          value={ip}
          onChange={(e) => setIP(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={getIpGeoInfo}>
          Search
        </Button>
      </form>
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
            ref={openPopup}
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
