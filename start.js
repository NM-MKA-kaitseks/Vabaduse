// Aluskaardi tailid on L-EST'97s. seadistame kaardi.
// crs on "koordinaatsüsteem".
var crs = new L.Proj.CRS(
  'EPSG:3301',
  '+proj=lcc +lat_1=59.33333333333334 +lat_2=58 +lat_0=57.51755393055556 ' +
  '+lon_0=24 +x_0=500000 +y_0=6375000 ' +
  '+ellps=GRS80 ' +
  '+towgs84=0,0,0,0,0,0,0 ' +
  '+units=m +no_defs',
  {
    resolutions: [
      4000, 2000, 1000, 500, 250, 125, 62.5, 31.25, 15.625, 7.8125, 3.90625,
      1.953125, 0.9765625, 0.48828125, 0.244140625, 0.1220703125, 0.06103515625,
      0.030517578125, 0.0152587890625, 0.00762939453125, 0.003814697265625
    ],
    transformation: new L.Transformation(1, -40500, -1, 7017000.000000),
    //origin: [40500, 5993000.000000],
    bounds: L.bounds(
      L.point(40500, 5993000.000000),
      L.point(1064500.000000, 7017000.000000)
    )
  }
);

// Kaart ise. Läheb div elementi "map".
var map = L.map(
  'Kaart',
  {
    crs: crs,
    center: L.latLng(59.375150, 24.717757),
    zoom: 10, // Oli: 7.
    minZoom: 3,
    maxZoom: 24,
    maxBounds: L.latLngBounds(
      [[53.87677644829216, 17.023771159524344],
      [62.85582385242469, 35.106036681873526]]),
  }
);

var baselayers = {};
var overlays = {};
var layerControl = L.control.groupedLayer(baselayers, overlays);

layerControl.addTo(map);

var aboutWindow = L.control.about();

updateMap(config.map);

initBasemaps(config.basemaps);

// Hävitatud puu ikoon
var treeIcon = L.IconMaterial.icon({
  icon: 'cancel',            // Name of Material icon
  iconColor: 'white',              // Material icon color (could be rgba, hex, html name...)
  markerColor: 'saddlebrown',  // Marker fill color
  outlineColor: 'yellow',            // Marker outline color
  outlineWidth: 1,                   // Marker outline width 
  iconSize: [31, 42]                 // Width and height of the icon
})

// Kuva punktid GPX-failist - 31.05.2022 mõõtmised.
var gpx = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Created with BasicAirData GPS Logger for Android - ver. 3.1.4 -->
<!-- Track 14 = 3 TrackPoints + 13 Placemarks -->

<!-- Track Statistics (based on Total Time | Time in Movement): -->
<!--  Distance = 2 m -->
<!--  Duration = 00:02 | 00:00 -->
<!--  Altitude Gap = 0 m -->
<!--  Max Speed = 0 km/h -->
<!--  Avg Speed = 5,0 |  km/h -->
<!--  Activity = other -->

<gpx version="1.0"
     creator="BasicAirData GPS Logger 3.1.4"
     xmlns="http://www.topografix.com/GPX/1/0"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.topografix.com/GPX/1/0 http://www.topografix.com/GPX/1/0/gpx.xsd">
<name>GPS Logger 20220531-221208</name>
<desc>Kōlakoda 2 mõõtmine</desc>
<time>2022-06-01T22:33:25Z</time>
<keywords>other</keywords>
<bounds minlat="59.37942358" minlon="24.68233021" maxlat="59.37944841" maxlon="24.68233369" />

<wpt lat="59.37942282" lon="24.68231420"><ele>79.652</ele><time>2022-05-31T19:12:28Z</time><name>32</name><sat>21</sat></wpt>

<wpt lat="59.37942110" lon="24.68231622"><ele>79.631</ele><time>2022-05-31T19:12:49Z</time><name>34</name><sat>23</sat></wpt>

<wpt lat="59.37945176" lon="24.68245097"><ele>74.546</ele><time>2022-05-31T19:13:27Z</time><name>36</name><sat>17</sat></wpt>

<wpt lat="59.37960951" lon="24.68259192"><ele>73.893</ele><time>2022-05-31T19:13:51Z</time><name>32</name><sat>28</sat></wpt>

<wpt lat="59.37954069" lon="24.68227338"><ele>70.936</ele><time>2022-05-31T19:14:16Z</time><name>34</name><sat>24</sat></wpt>

<wpt lat="59.37947366" lon="24.68224494"><ele>80.268</ele><time>2022-05-31T19:14:32Z</time><name>28</name><sat>25</sat></wpt>

<wpt lat="59.37946675" lon="24.68220785"><ele>78.407</ele><time>2022-05-31T19:14:50Z</time><name>30</name><sat>29</sat></wpt>

<wpt lat="59.37944897" lon="24.68215060"><ele>79.854</ele><time>2022-05-31T19:15:10Z</time><name>31</name><sat>17</sat></wpt>

<wpt lat="59.37953084" lon="24.68226402"><ele>76.623</ele><time>2022-05-31T19:15:36Z</time><name>41</name><sat>22</sat></wpt>

<wpt lat="59.37956559" lon="24.68222284"><ele>70.654</ele><time>2022-05-31T19:15:57Z</time><name>39</name><sat>19</sat></wpt>

<wpt lat="59.37957131" lon="24.68219196"><ele>71.328</ele><time>2022-05-31T19:16:12Z</time><name>16</name><sat>22</sat></wpt>

<wpt lat="59.37958484" lon="24.68209278"><ele>79.266</ele><time>2022-05-31T19:16:30Z</time><name>29</name><sat>28</sat></wpt>

<wpt lat="59.37959823" lon="24.68206855"><ele>79.814</ele><time>2022-05-31T19:16:50Z</time><name>26</name><sat>27</sat></wpt>

</gpx>
`;

new L.GPX(gpx, {
  async: true,
  parseElements: ['waypoint'],
  marker_options: {
    wptIcons: {
      '': treeIcon
    }
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// Kuva katastriüksuse piir.
var katastriüksus =
`<?xml version="1.0"?>
<gpx version="1.1" creator="GDAL 2.2.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ogr="http://osgeo.org/gdal" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
<metadata><bounds minlat="59.351800829368003" minlon="24.550349116543337" maxlat="59.591577246963908" maxlon="24.926283826078784"/></metadata>                  

<trk>
  <extensions>
    <ogr:TUNNUS>78404:401:0066</ogr:TUNNUS>
    <ogr:HKOOD>0524</ogr:HKOOD>
    <ogr:MK_NIMI>Harju maakond</ogr:MK_NIMI>
    <ogr:OV_NIMI>Tallinn</ogr:OV_NIMI>
    <ogr:AY_NIMI>N?mme linnaosa</ogr:AY_NIMI>
    <ogr:L_AADRESS>Sihi tn 98</ogr:L_AADRESS>
    <ogr:REGISTR>2004/12/21</ogr:REGISTR>
    <ogr:MUUDET>2018/12/21</ogr:MUUDET>
    <ogr:SIHT1>?ldkasutatav maa</ogr:SIHT1>
    <ogr:SO_PRTS1>100</ogr:SO_PRTS1>
    <ogr:SO_PRTS2>0</ogr:SO_PRTS2>
    <ogr:SO_PRTS3>0</ogr:SO_PRTS3>
    <ogr:PINDALA>59253.0</ogr:PINDALA>
    <ogr:RUUMPIND>59253.0</ogr:RUUMPIND>
    <ogr:REG_YHIK>M</ogr:REG_YHIK>
    <ogr:HARITAV>0.0</ogr:HARITAV>
    <ogr:ROHUMAA>0.0</ogr:ROHUMAA>
    <ogr:METS>54459.0</ogr:METS>
    <ogr:OUEMAA>0.0</ogr:OUEMAA>
    <ogr:MUUMAA>4794.0</ogr:MUUMAA>
    <ogr:KINNISTU>25930101</ogr:KINNISTU>
    <ogr:MOOTVIIS>kaardi ja plaani alusel</ogr:MOOTVIIS>
    <ogr:MOOTJA>Omavalitsus</ogr:MOOTJA>
    <ogr:OMVIIS>K? vastavusseviimine uue seadusega</ogr:OMVIIS>
    <ogr:OMVORM>Munitsipaalomand</ogr:OMVORM>
    <ogr:MAKS_HIND>250050.0</ogr:MAKS_HIND>
    <ogr:MARKETEKST>Pindala on ebat?pne (01.07.2018)</ogr:MARKETEKST>
    <ogr:EKSPORT>2022/05/27</ogr:EKSPORT>
  </extensions>
  <trkseg>
    <trkpt lat="59.379584989266917" lon="24.680688850177184">
    </trkpt>
    <trkpt lat="59.380508185430209" lon="24.685127707788716">
    </trkpt>
    <trkpt lat="59.378681284765371" lon="24.686540630339969">
    </trkpt>
    <trkpt lat="59.37777697154953" lon="24.68210498581994">
    </trkpt>
    <trkpt lat="59.379584989266917" lon="24.680688850177184">
    </trkpt>
  </trkseg>
</trk>

</gpx>

`;

new L.GPX(katastriüksus, {
  async: true,
  parseElements: ['track'],
  polyline_options: {
    color: 'green',
    weight: 3
  }
}).on('loaded', function(e) {
  map.fitBounds(e.target.getBounds());
}).addTo(map);

// markerOnClick käivitub markerile klõpsamisel. Kuvab teabe punkti kohta.
function markerOnClick(e) {
  console.debug("Klõpsatud markerile: " + this.options.title);
  kpn = this.options.title; // Klõpsatud punkti nimi.
  kp = pMap.get(kpn); // Klõpsatud punkt.
}

