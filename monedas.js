/* global L, fetch, Papa */
const map = L.map('map').setView([0, 0], 3)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// L.marker([49.45, -2.58]).addTo(map)
//   .bindPopup('Guernsey pound<br/>1815–P')

const debug = (x) => {
  console.log(x)
  return x
}

fetch('monedas.csv')
  .then(res => res.text())
  .then(csvText => {
    const ccs = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true
    })
    for (const cc of ccs.data) {
      if (cc.lat !== undefined) {
        L.marker([cc.lat, cc.lon]).addTo(map)
          .bindPopup(`${cc.name}<br/>${cc.startdate}–${cc.enddate}`)
      }
    }
  })
  .catch(err => console.error(err))
