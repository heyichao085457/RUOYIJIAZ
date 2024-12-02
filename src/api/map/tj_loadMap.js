import mapboxgl from "mapbox-gl";
import getMap from "./tj_xftb";
import getMap_zxtj from "./tj_zxtj";
import getMap_heatmap22 from "./tj_heatmap22";
/**
 * 2022-10-11 罗简单
 * 地图操作模块
 * 地图引擎：Mapbox GL，需进行本地化
 * tjlx：统计类型，根据它来判断不同菜单，然后读取不同数据
 */
export default function loadMap(map, tjlx) {
  debugger;
  console.log("统计类型：" + tjlx);
  /**
   * 罗简单 2023-03-19
   * 地图初始化
   */

  map.on("load", getData(map, tjlx));
}

function getData(map, tjlx) {  
  switch (tjlx) {
    case "市级_下发图斑详情":
      getMap(map);
      break;
    case "专项工作统计":
      getMap_zxtj(map);
      break;
    case "2022年违法图斑热力图":
      getMap_heatmap22(map);
      break;
    default:
      break;
  }
}
