import mapboxgl from "mapbox-gl";
import wellknown from "wellknown";
let map;
var photoView;
/**
 * 2022-10-11 罗简单
 * 地图操作模块
 * 地图引擎：Mapbox GL，需进行本地化
 */
export function loadMap(data) {
  let defaultCenterWKT = "POINT(108.9470278 34.25941667)"; //钟楼坐标
  let mapDiv = document.getElementById("map");
  mapboxgl.accessToken =
    "pk.eyJ1IjoibHVvamlhbmRhbiIsImEiOiJjbHZ1czByamsxZ3B4MmtwYTk5MHZseTN0In0.oLFupRoAJTjPTnK-y6nwzg";

  map = new mapboxgl.Map({
    container: mapDiv,
    //style: "mapbox://styles/luojiandan/clbi0asy6000m14mawdcok4m1", //3D结构
    style: "mapbox://styles/luojiandan/clj4epgjl00t601r71z8s3kxe", //blank map
    // center: [108.961, 34.242], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });
  window.mapObj = map;

  /**
   * 罗简单 2023-03-19
   * 地图初始化
   */
  map.on("load", async function () {
    // console.log(data);

    //添加天地图服务
    AddTDTMap(map);

    if (data == undefined || data == null) {
      map.setCenter([108.9470278, 34.25941667]);
      map.setZoom(17);
      return;
    }

    if (data.freckleGeomList.length == 0) {
      map.setCenter([108.9470278, 34.25941667]);
      map.setZoom(17);
      return;
    }
    // if (data == null) return;
    if (getSymbos() == false) return; //加载图片        
    let geoData = getGeoData(data);
    map.setCenter(geoData.TB_Pt[0].geometry.coordinates); //设置地图中心
    map.setZoom(17);
    //地块编号标注
    map.addSource("TB_LabelPt", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: geoData.TB_Pt,
      },
      attribution: "@自然资源陕西省卫星应用技术中心(数据源：天地图)",
    });
    //地块面
    map.addSource("TB_Polygon", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: geoData.TB_Pg,
      },
    });
    //外业照片
    map.addSource("DK_PicPt", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: geoData.Dk_Pt_Pics,
      },
    });

    map.addLayer({
      //标注点
      id: "TB_LabelPtLayer",
      type: "symbol",
      source: "TB_LabelPt",
      maxzoom: 20,
      layout: {
        "text-field": ["to-string", ["get", "tbbh"]],
        "text-size": ["interpolate", ["linear"], ["zoom"], 0, 15],
        "text-font": ["Open Sans ExtraBold", "Arial Unicode MS Regular"],
      },
      paint: {
        "text-color": "hsl(0, 12%, 190%)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
        "text-halo-color": "hsl(18, 1%, 6%)",
      },
    });
    map.addLayer({
      //地块面
      id: "TK_PolygonLayer",
      type: "line",
      source: "TB_Polygon",
      maxzoom: 20,
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "hsl(0, 91%, 61%)",
        "line-width": 2,
        "line-opacity": 0.8,
      },
    });
    map.addLayer({
      //外业照片
      id: "DK_PicLayer",
      type: "symbol",
      source: "DK_PicPt",
      layout: {
        "icon-image": "arrow",
        "icon-size": 0.68,
        "icon-allow-overlap": true,
        "icon-rotate": ["get", "azimuth"],
      },
    });

    // map.addLayer({
    //   //标注点
    //   id: "DK_LabelPtLayer",
    //   type: "symbol",
    //   source: "DK_LabelPt",
    //   maxzoom: 20,
    //   layout: {
    //     "text-field": ["to-string", ["get", "dkbh"]],
    //     "text-size": ["interpolate", ["linear"], ["zoom"], 0, 15],
    //     "text-font": ["Open Sans ExtraBold", "Arial Unicode MS Regular"],
    //   },
    //   paint: {
    //     "text-color": "hsl(0, 12%, 190%)",
    //     "text-halo-width": 1,
    //     "text-halo-blur": 1,
    //     "text-halo-color": "hsl(18, 1%, 6%)",
    //   },
    // });
    //添加地块数据
    if (geoData.DK_Pg.length > 0) {
      map.addSource("DK_Polygon", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: geoData.DK_Pg,
        },
      });
      map.addLayer({
        //地块面
        id: "DK_PolygonLayer",
        type: "line",
        source: "DK_Polygon",
        maxzoom: 20,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "hsl(35, 76%, 98%)",
          "line-width": 2,
          "line-opacity": 0.8,
        },
      });
    }

    //addWMSService(map); //添加Geoserver WMS地图服务
  });

  map.on("idle", () => {
    // setLayersVisible(map); //控制图层显示状态
  });

  /**
   * 2023-12-21 罗简单
   * 点击地图事件，如果点击照片，则需要高亮显示，且有图片预览交互
   */
  map.on("click", function (e) {
    // 尝试获取点击位置的特征
    var features = map.queryRenderedFeatures(e.point, {
      layers: ["DK_PicLayer"],
    });

    if (features.length > 0) {
      // 如果有特征，则处理这些特征
      let feature = features[0];
      if (feature != null) {
        var item = JSON.parse(feature.properties.picObj);
        loadPhotoMap(item); //这里调用照片地图交互

        //在这里与照片预览进行交互
        // var photoViewer = document.getElementById("picViewerContainer");
        // var photo = document.getElementById("picViewer");
        // photo.src = item.picUrl;
        // photoViewer.style.display = "block";

        photoView.onpreview(feature.properties.index);
        // photoView.handleImageChange(feature.properties.index);
      }
    } else {
      // 如果没有特征，即点击的是空白处
      loadPhotoMap(null);
    }
  });

  /**
   * 罗简单 2023-03-21
   * @param {*} datas
   * @returns 返回图斑和地块数据
   */
  function getGeoData(data) {
    // console.log(data, 'data');
    var TB_LabelPt = []; //图斑标注点
    var TB_Polygon = []; //下发图斑
    var DK_LabelPt = []; //地块：标注点
    var DK_Polygon = []; //地块面
    var DK_PicPt = []; //外业照片数据

    //图斑注记点和图斑面
    data.freckleGeomList.forEach((ele) => {
      TB_LabelPt.push({
        type: "Feature",
        geometry: wellknown(ele.center == null ? defaultCenterWKT : ele.center),
        properties: {
          tbbh: ele.freckleCode,
        },
      });

      TB_Polygon.push({
        type: "Feature",
        geometry: wellknown(ele.geom),
        properties: {
          tbbh: ele.freckleCode,
        },
      });
    });

    //如果有地块数据，则添加
    if (data.geom != null) {
      //地块注记点
      DK_LabelPt.push({
        type: "Feature",
        geometry: wellknown(data.geomCenter),
        properties: {
          dkbh: getValue(data.landList, "地块编号"),
        },
      });
      //地块面
      DK_Polygon.push({
        type: "Feature",
        geometry: wellknown(data.geom),
        properties: {
          id: null,
        },
      });
    }

    // var Pics = data.photos;
    // console.log(Pics, 'Pics');
    // if (Pics != null) {
    //   Pics.forEach((Pic) => {
    //     Pic.fields.forEach((ele, index) => {
    //       DK_PicPt.push({
    //         type: "Feature",
    //         geometry: wellknown(`POINT(${ele.xcoordinate} ${ele.ycoordinate})`),
    //         properties: {
    //           picId: ele.picId,
    //           picObj: ele,
    //           index: index,
    //           azimuth: ele.azimuth == null ? 0 : parseInt(ele.azimuth),
    //         },
    //       });
    //     });
    //   });
    // }


    var Pics = data.photos;
    if (Pics != null) {
      Pics.forEach((Pic) => {
        if (Pic.fields && Pic.fields.length > 0) {
          Pic.fields.forEach((ele, index) => {
            // console.log(ele);
            DK_PicPt.push({
              type: "Feature",
              geometry: wellknown(`POINT(${ele.xcoordinate} ${ele.ycoordinate})`),
              properties: {
                picId: ele.picId,
                picObj: ele,
                index: index,
                azimuth: ele.azimuth == null ? 0 : parseInt(ele.azimuth),
              },
            });
          });
        } else {
          Pics.forEach((ele, index) => {
            DK_PicPt.push({
              type: "Feature",
              geometry: wellknown(`POINT(${ele.xcoordinate} ${ele.ycoordinate})`),
              properties: {
                picId: ele.picId,
                picObj: ele,
                index: index,
                azimuth: ele.azimuth == null ? 0 : parseInt(ele.azimuth),
              },
            });
          });
        }
      });
    }

    var dataResult = {
      TB_Pg: TB_Polygon,
      TB_Pt: TB_LabelPt,
      DK_Pg: DK_Polygon,
      DK_Pt: DK_LabelPt,
      Dk_Pt_Pics: DK_PicPt,
    }
    return dataResult;
  }

  //从属性数组中获取对应值
  function getValue(attrs, fieldName) {
    let value = "";
    attrs.forEach((el) => {
      if (el.label == fieldName) {
        value = el.value;
        return value;
      }
    });

    return value;
  }

  function getSymbos() {
    //箭头 
    // const baseUrl = process.env.NODE_ENV === 'production' ? 'http://124.114.203.222:8084' : '';
    let baseUrl = '';
    if (process.env.NODE_ENV === 'production') {
      const host = window.location.hostname;
      if (host === '124.114.203.222') {
        baseUrl = 'http://124.114.203.222:8084';
      } else if (host === '10.0.34.5') {
        baseUrl = 'http://10.0.34.5:8084';
      } else {
        baseUrl = '';
      }
    }
    map.loadImage(
      `${baseUrl}/wp/file/arrow.png`,
      // '/img/wp/file/arrow.png',

      (error, image) => {
        if (error) return false;
        map.addImage("arrow", image);
      }
    );
    //选中箭头
    map.loadImage(
      `${baseUrl}/wp/file/arrow_selected.png`,
      // '/img/wp/file/arrow_selected.png',

      (error, image) => {
        if (error) return false;
        map.addImage("arrow_selected", image);
      }
    );

    return true;
  }
}

/**
 * 罗简单 2023-12-20
 * 读取照片坐标信息，并标注在地图上
 * @param {*} data
 */
export function loadPhotoMap(data, viewer) {
  // console.log(data, '2data');
  var picData = null; //当前选择图片
  var sourceId = "DK_Pic_Selected";

  if (map.getLayer("DK_Pic_SelectedLayer")) {
    map.removeLayer("DK_Pic_SelectedLayer");
  }
  if (viewer != null) {
    photoView = viewer;
  }
  if (data != null) {
    var wkt = wellknown(`POINT(${data.xcoordinate} ${data.ycoordinate})`);
    // map.panTo([data.xcoordinate, data.ycoordinate], {
    //   animate: true,
    //   duration: 5000,
    // });
    map.flyTo({
      center: [data.xcoordinate, data.ycoordinate],
      speed: 0.68,
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
    //如果不存在，则添加
    picData = {
      type: "FeatureCollection",
      features: [
        {
          type: "feature",
          geometry: wkt,
          properties: {
            azimuth: data.azimuth == null ? 0 : parseInt(data.azimuth),
          },
        },
      ],
    };

    var sourceData = map.getSource(sourceId);
    if (sourceData) {
      //如果存在，则更新
      sourceData.setData(picData);
    } else {
      map.addSource(sourceId, {
        type: "geojson",
        data: picData,
      });
    }
    map.addLayer({
      id: "DK_Pic_SelectedLayer",
      type: "symbol",
      source: sourceId,
      layout: {
        "icon-image": "arrow_selected",
        "icon-size": 0.8,
        "icon-allow-overlap": true,
        "icon-rotate": ["get", "azimuth"],
      },
    });
  }
}

export function MapInit(viewer) {
  photoView = viewer;
}
/**
 罗简单 2023-03-21
 返回坐标数组
 */
function GetCoors(geoStr) {
  let coors01 = geoStr.split(",");
  let coors = [[]];
  coors01.forEach((el) => {
    let coors02 = el.split(" ");
    coors[0].push([coors02[0] * 1.0, coors02[1] * 1.0]);
  });

  return coors;
}

/**
 * 罗简单 2023-6-19
 * 控制图层显示与否
 */
function setLayersVisible(map) {
  //图层控制
  var checkboxs = document.getElementsByClassName("lyrCheckbox");
  Array.prototype.forEach.call(checkboxs, (ele) => {
    ele.onclick = function (e) {
      let lyrName = ele.nextSibling.nodeValue;
      let lyrs;
      switch (lyrName) {
        case "下发图斑":
          lyrs = ["TK_PolygonLayer", "TB_LabelPtLayer"];
          break;
        case "填报地块":
          lyrs = ["DK_PolygonLayer"];
          break;
        case "2022年地块":
          lyrs = ["DK2022"];
          break;
        case "2023年地块":
          lyrs = ["DK2023"];
          break;
        default:
          break;
      }
      lyrs.forEach((lyr) => {
        if (ele.checked) {
          map.setLayoutProperty(lyr, "visibility", "visible");
        } else {
          map.setLayoutProperty(lyr, "visibility", "none");
        }
      });
    };
  });
}
/**
 * 罗简单 2022-6-19
 * @param {地图} map
 * 添加GeoServer发布的WMS服务http://124.114.203.222:8084
 */
function addWMSService(map) {
  let strLayers = ["DK2022", "DK2023"];
  strLayers.forEach((ele) => {
    map.addSource(`${ele}`, {
      type: "raster",
      tiles: [
        `/img/geoserver/wpzf/wms?service=WMS&bbox={bbox-epsg-3857}&transparent=true&version=1.1.0&request=GetMap&layers=wpzf:${ele}&width=256&height=256&srs=EPSG:3857&styles=wpzf:dk&format=image/png`,
      ],
      tileSize: 256,
    });
    map.addLayer(
      {
        id: `${ele}`,
        type: "raster",
        source: `${ele}`,
        paint: {},
      },
      "DK_PolygonLayer"
    );
  });
}

/**
 * 罗简单 2024-1-19
 * 添加天地图服务
 */
function AddTDTMap(map) {
  //天地图全球影像服务
  map.addSource("tdt-source-img", {
    type: "raster",
    tiles: [
      "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8c6b202e6c1be4cf359a477e7e3c2d27",
    ],
    tileSize: 256,

  });
  //天地图全球影像注记服务
  map.addSource("tdt-source-cia", {
    type: "raster",
    tiles: [
      "http://t3.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=8c6b202e6c1be4cf359a477e7e3c2d27",
    ],
    tileSize: 256,
  });

  map.addLayer({
    id: "tdt-layer-img",
    type: "raster",
    source: "tdt-source-img",
    minzoom: 0,
    maxzoom: 21,
  });
  map.addLayer({
    id: "tdt-layer-cia",
    type: "raster",
    source: "tdt-source-cia",
    minzoom: 0,
    maxzoom: 21,
  });
}