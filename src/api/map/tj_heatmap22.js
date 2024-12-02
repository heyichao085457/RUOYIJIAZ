/**
 * 罗简单：2023-06-20
 * 智慧大脑：2022年违法图斑聚合图
 */
export default function getMap_heatmap22(map) {
    console.log("地图："+map);
  map.addSource("DK2022", {
    type: "raster",
    tiles: [
      `http://124.114.203.222:8084/geoserver/wpzf/wms?service=WMS&bbox={bbox-epsg-3857}&transparent=true&version=1.1.0&request=GetMap&layers=wpzf:DK2022&width=256&height=256&srs=EPSG:3857&styles=wpzf:dk&format=image/png`,
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: `DK2022`,
    type: "raster",
    source: `DK2022`,
    paint: {},
  });
  map.addSource("DK2023", {
    type: "raster",
    tiles: [
      `http://124.114.203.222:8084/geoserver/wpzf/wms?service=WMS&bbox={bbox-epsg-3857}&transparent=true&version=1.1.0&request=GetMap&layers=wpzf:DK2023&width=256&height=256&srs=EPSG:3857&styles=wpzf:dk&format=image/png`,
    ],
    tileSize: 256,
  });
  map.addLayer({
    id: `DK2023`,
    type: "raster",
    source: `DK2023`,
    paint: {},
  });
  //添加地图数据
  map.addSource("dk2022", {
    type: "geojson",
    data: "http://124.114.203.222:8084/wp/file/DK2022Point.json",
    cluster: true,
    clusterMaxZoom: 14, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "dk2022",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        10,
        "#f1f075",
        100,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 800, 40],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "dk2022",
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "dk2022",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-opacity": 0.68,
      "circle-radius": 3,
      "circle-stroke-width": 0.68,
      "circle-stroke-color": "#fff",
    },
  });
}
