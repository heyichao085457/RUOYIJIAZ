const serverURL = "http://124.114.203.222:8084/wp/file/";
const serverURL1 = "http://124.114.203.222:8084/wpzf/search/type?";
const MapConfig = {
  baseURL: "http://124.114.203.222:8084/wp/",
  mapbox: {
    sprite: "http://198.12.100.40:8090/static/GeoData/images/sprite", //图标
    glyphs:
      "http://198.12.100.40:8090/static/GeoData/font/{fontstack}/{range}.pbf", //字体文件
    styles: {},
    TBSL_dataSource: [
      {
        Name: "TBSL_Shi_Polygon",
        Type: "市级",
        URL: `${serverURL}TBSX_Shi_Polygon.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：面，市级
              id: "TBSL_Shi_Polygon",
              type: "fill",
              source: "TBSL_Shi_Polygon",
              maxzoom: 7,
              layout: {},
              paint: {
                "fill-outline-color": "hsl(0, 1%, 79%)",
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "TBSL"],
                  0,
                  "hsl(36, 100%, 90%)",
                  20000,
                  "hsl(29, 96%, 48%)",
                ],
              },
            },
          },
        ],
      },
      {
        Name: "TBSX_ShiJieXian",
        Type: "市级",
        URL: `${serverURL}TBSX_ShiJieXian.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：面，市级
              id: "TBSL_Shi_Line",
              type: "line",
              source: "TBSX_ShiJieXian",
              minzoom: 7.1,
              maxzoom: 15,
              layout: {},
              paint: {
                "line-color": "hsl(35, 76%, 98%)",
                "line-width": 2,
                "line-opacity": 0.8,
              },
            },
          },
        ],
      },

      {
        Name: "TBSL_Shi_Point",
        Type: "市级",
        URL: `${serverURL}TBSX_Shi_Point.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：标注点，市级
              id: "TBSL_Shi_Point",
              type: "symbol",
              source: "TBSL_Shi_Point",
              maxzoom: 7,
              layout: {
                "text-field": [
                  "step",
                  ["zoom"],
                  ["to-string", ["get", "Name"]],
                  6,
                  ["concat", ["get", "Name"], "\n(", ["get", "TBSL"], "个)"],
                ],
                "text-size": ["interpolate", ["linear"], ["zoom"], 0, 14],
                "text-font": [
                  "Open Sans ExtraBold",
                  "Arial Unicode MS Regular",
                ],
              },
              paint: {
                "text-color": "hsl(0, 12%, 90%)",
                "text-halo-width": 1,
                "text-halo-blur": 1,
                "text-halo-color": "hsl(18, 1%, 6%)",
              },
            },
          },
        ],
      },
      {
        Name: "TBSL_Xian_Polygon",
        Type: "县级",
        URL: `${serverURL}TBSX_Xian_Polygon.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：面，县级
              id: "TBSL_Xian_Polygon",
              type: "fill",
              source: "TBSL_Xian_Polygon",
              minzoom: 7.1,
              maxzoom: 15,
              layout: {},
              paint: {
                "fill-outline-color": "hsl(0, 1%, 79%)",
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "数量"],
                  0,
                  "hsl(36, 100%, 90%)",
                  5000,
                  "hsl(29, 96%, 48%)",
                ],
              },
            },
          },
        ],
      },
      {
        Name: "TBSL_Xian_Point",
        Type: "县级",
        URL: `${serverURL}TBSX_Xian_Point.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：标注点，县级
              id: "TBSL_Xian_Point",
              type: "symbol",
              source: "TBSL_Xian_Point",
              minzoom: 7.1,
              maxzoom: 15,
              layout: {
                "text-field": [
                  "step",
                  ["zoom"],
                  ["to-string", ["get", "Xian"]],
                  8,
                  ["concat", ["get", "Xian"], "\n(", ["get", "数量"], "个)"],
                ],
                "text-size": ["interpolate", ["linear"], ["zoom"], 0, 13],
                "text-font": [
                  "Open Sans ExtraBold",
                  "Arial Unicode MS Regular",
                ],
              },
              paint: {
                "text-color": "hsl(0, 12%, 90%)",
                "text-halo-width": 1,
                "text-halo-blur": 1,
                "text-halo-color": "hsl(18, 1%, 6%)",
              },
            },
          },
        ],
      },
    ],
    ZXTJ_dataSources: [
      {
        Name: "ZXTJ_Polygon",
        URL: `${serverURL}ZXBHQ.json`,
        Layers: [
          {
            Layer: {
              //图斑数量：面
              id: "ZXTJ_PolygonLayer",
              type: "fill",
              source: "ZXTJ_Polygon",
              maxzoom: 17,
              layout: {},
              paint: {
                "fill-outline-color": "hsl(0, 1%, 79%)",
                "fill-color": [
                  "interpolate",
                  ["linear"],
                  ["get", "TBSL"],
                  0,
                  "hsl(36, 100%, 90%)",
                  20000,
                  "hsl(29, 96%, 48%)",
                ],
              },
            },
          },
          {
            Layer: {
              id: "ZXTJ_PolygonLabel",
              type: "symbol",
              source: "ZXTJ_Polygon",
              maxzoom: 17,
              layout: {
                "text-field": [
                  "step",
                  ["zoom"],
                  ["to-string", ["get", "fwmc"]],
                  8,
                  ["concat", ["get", "fwmc"], "\n(", ["get", "数量"], "个)"],
                ],
                "text-size": ["interpolate", ["linear"], ["zoom"], 0, 13],
                "text-font": [
                  "Open Sans ExtraBold",
                  "Arial Unicode MS Regular",
                ],
              },
              paint: {
                "text-color": "hsl(0, 12%, 90%)",
                "text-halo-width": 1,
                "text-halo-blur": 1,
                "text-halo-color": "hsl(18, 1%, 6%)",
              },
            },
          },
        ],
      },
    ],
  },
  statistics: {
    gjtb_shi: `${serverURL1}type=市级_下发图斑详情`, //市级_下发图斑详情
    gjtb_zxtj: `${serverURL1}type=专项工作统计`, //市级_下发图斑详情
  },
  localTiles:[   
    {
      name:"2021第2季度(1米)",
      tileURL:"shanxi_2021s2_1m"
    },
    {
      name:"2021第3季度(2米)",
      tileURL:"shanxi_2021s3_2m"
    },
    {
      name:"2021第4季度(2米)",
      tileURL:"shanxi_2021s4_2m"
    },
    {
      name:"2022第1季度(2米)",
      tileURL:"shanxi_2022_2m"
    },
    {
      name:"2022第2季度(2米)",
      tileURL:"shanxi_2022s2_2m"
    },
    {
      name:"2022第3季度(2米)",
      tileURL:"shanxi_2022s3_2m"
    },
    {
      name:"2022第4季度(2米)",
      tileURL:"shanxi_2022s4_2m"
    },
    {
      name:"2023第1季度(2米)",
      tileURL:"shanxi_2023s1_2m"
    }
  ]
};

export default { MapConfig };
