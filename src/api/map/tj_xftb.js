import mapboxgl from "mapbox-gl";
import mapConfig from "./mapConfig";
import axios from "axios";

/**
 * 罗简单：2023-03-29
 * 智慧大脑：下发图斑统计模块
 */
export default function getMap(map) {
  axios.get(mapConfig.MapConfig.statistics.gjtb_shi).then((resp1) => {    
    mapConfig.MapConfig.mapbox.TBSL_dataSource.forEach((ele) => {
      switch (ele.Type) {
        case "市级":
        case "县级":
          axios.get(ele.URL).then((respGeo) => {
            const Geos = respGeo.data;
            const Attrs = resp1.data.data;
            //合并图形数据和属性数据
            Geos.features.forEach((feature) => {
              let attr;
              if (ele.Type == "市级") {
                attr = Attrs.filter(
                  (item) => item.市名称 == feature.properties.Name
                );
              } else if (ele.Type == "县级") {
                attr = Attrs.filter(
                  (item) =>
                    item.市名称 == feature.properties.Shi &&
                    item.县名称 == feature.properties.Xian
                );
              }

              if (attr) {
                feature.properties.数量 = attr.reduce(
                  (total, obj) => total + obj.数量,
                  0
                );
                feature.properties.监测面积 = attr
                  .reduce((total, obj) => total + obj.监测面积, 0)
                  .toFixed(2);
                feature.properties.耕地面积 = attr
                  .reduce((total, obj) => total + obj.耕地面积, 0)
                  .toFixed(2);
                feature.properties.大于百亩数量 = attr.reduce(
                  (total, obj) => total + obj.大于百亩数量,
                  0
                );
                feature.properties.大于百亩监测面积 = attr
                  .reduce((total, obj) => total + obj.大于百亩监测面积, 0)
                  .toFixed(2);
                feature.properties.大于百亩耕地面积 = attr
                  .reduce((total, obj) => total + obj.大于百亩耕地面积, 0)
                  .toFixed(2);
              }
            });

            //添加地图数据
            map.addSource(ele.Name, {
              type: "geojson",
              data: Geos,
              attribution: "@自然资源陕西省卫星应用技术中心",
            });
            //添加地图图层
            ele.Layers.forEach((lyr) => {
              if (ele.Name == "TBSL_Shi_Polygon") {
                //获取最大数量
                const maxObj = Geos.features.reduce((max, current) => {
                  return max.properties.数量 > current.properties.数量
                    ? max
                    : current;
                });
                let lyrPaint = {
                  "fill-outline-color": "hsl(0, 1%, 79%)",
                  "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "数量"],
                    0,
                    "hsl(36, 100%, 90%)",
                    maxObj.properties.数量,
                    "hsl(29, 96%, 48%)",
                  ],
                };
                lyr.Layer.paint = lyrPaint;
              } else if (ele.Name == "TBSL_Xian_Polygon") {
                //获取最大数量
                const maxObj = Attrs.reduce((max, current) => {
                  return max.数量 > current.数量 ? max : current;
                });
                let lyrPaint = {
                  "fill-outline-color": "hsl(0, 1%, 79%)",
                  "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["get", "数量"],
                    0,
                    "hsl(36, 100%, 90%)",
                    maxObj.数量,
                    "hsl(29, 96%, 48%)",
                  ],
                };
                lyr.Layer.paint = lyrPaint;
              } else if (ele.Name == "TBSL_Shi_Point") {
                let lyrlayout = {
                  "text-field": [
                    "step",
                    ["zoom"],
                    ["to-string", ["get", "Name"]],
                    6,
                    ["concat", ["get", "Name"], "\n(", ["get", "数量"], "个)"],
                  ],
                  "text-size": ["interpolate", ["linear"], ["zoom"], 0, 14],
                  "text-font": [
                    "Open Sans ExtraBold",
                    "Arial Unicode MS Regular",
                  ],
                };
                lyr.Layer.layout = lyrlayout;
              } else if (ele.Name == "TBSL_Xian_Point") {
                let lyrlayout = {
                  "text-field": [
                    "step",
                    ["zoom"],
                    ["to-string", ["get", "Xian"]],
                    6,
                    ["concat", ["get", "Xian"], "\n(", ["get", "数量"], "个)"],
                  ],
                  "text-size": ["interpolate", ["linear"], ["zoom"], 0, 14],
                  "text-font": [
                    "Open Sans ExtraBold",
                    "Arial Unicode MS Regular",
                  ],
                };
                lyr.Layer.layout = lyrlayout;
              }

              map.addLayer(lyr.Layer);
            });
          });
          break;
        default:
          break;
      }
    });
    const datas=resp1.data.data;
    let divZTQK=document.getElementById("ztqk");
    divZTQK.innerHTML=`
    <p>部下发卫片图斑${datas.reduce((total,obj)=>total+obj.数量,0)}个，
    监测面积${(datas.reduce((total,obj)=>total+obj.监测面积,0)/10000).toFixed(2)}万亩、
    耕地面积${(datas.reduce((total,obj)=>total+obj.耕地面积,0)/10000).toFixed(2)}万亩。
    其中占耕地100亩以上图斑${datas.reduce((total,obj)=>total+obj.大于百亩数量,0)}个，
    监测面积${(datas.reduce((total,obj)=>total+obj.大于百亩监测面积,0)/10000).toFixed(2)}亩、
    耕地面积${(datas.reduce((total,obj)=>total+obj.大于百亩耕地面积,0)/10000).toFixed(2)}亩。
    </p>`;
  });

  map.on("click", "TBSL_Shi_Polygon", function(e) {
    var coordinates = [e.lngLat.lng, e.lngLat.lat];
    var prop = e.features[0].properties;
    var description = `
    <h3>1、下发图斑情况</h3>
    ${prop.Name}共下发图斑<strong>${prop.数量}</strong>个，监测面积${prop.监测面积}亩，耕地面积${prop.耕地面积}亩；<br>
    其中百亩大图斑${prop.大于百亩数量}个，监测面积${prop.大于百亩监测面积}亩，耕地面积${prop.大于百亩耕地面积}亩。
    `;
/* <br> */
/* <a href="http://124.114.203.222:8084/wp/file/demo01.png" target="_blank" title="点击查看详情">...点击查看详情...</a> */
    // 创建popup
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on("click", "TBSL_Xian_Polygon", function(e) {
    var coordinates = [e.lngLat.lng, e.lngLat.lat];
    var prop = e.features[0].properties;
    var description = `
    <h3>1、下发图斑情况</h3>
    ${prop.Shi}${prop.Xian}共下发图斑${prop.数量}个，监测面积${prop.监测面积}亩，耕地面积${prop.耕地面积}亩；<br>
    其中百亩大图斑${prop.大于百亩数量}个，监测面积${prop.大于百亩监测面积}亩，耕地面积${prop.大于百亩耕地面积}亩。<br>
    <a href="http://124.114.203.222:8084/wp/file/demo01.png" target="_blank" title="点击查看详情">...点击查看详情...</a>    
    `;

    // 创建popup
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });
}
