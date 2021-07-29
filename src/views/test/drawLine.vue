<template>
  <div class="container">
    <div id="mapboxContainer" class="map-container"></div>

    <!-- 右侧面板 -->
    <div class="map-r-warp" :show="showFlightList">
      <div
        class="flight-list-hide-btn"
        :show="showFlightList"
        @click="showFlightList = !showFlightList"
      />
      <ListTable
        class="flight-list-content"
        @onItemClick="drawLine"
        @drwaAllLine="drawLines"
        @hideAllLine="hideAllLine"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, nextTick, ref } from "vue";
import UserConfig from "@/types/UserConfig";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import lineData from "@/api/mock/data/lineData.json";
import GisUtil from "@/utils/GisUtil";
import ListTable from "./LineList.vue";

export default defineComponent({
  name: "MapBoxMap",
  components: {
    ListTable,
  },
  setup() {
    let mapbox: mapboxgl.Map | null = null;
    const showFlightList = ref(true); //显示目标列表

    onMounted(() => {
      nextTick(() => {
        initMapBox().then(() => {
          drawLines();
        });
      });
    });

    function drawLine(record: any) {
      let lines: Array<GeoJSON.Feature> = [];
      let points: Array<[number, number]> = record.points;
      if (points) {
        GisUtil.handleMapboxCoords(points);
        let lineFeature: GeoJSON.Feature = {
          type: "Feature",
          properties: {
            name: record.name,
            desc: record.desc,
            width: 2,
            color: "red",
          },
          geometry: {
            type: "LineString",
            coordinates: points,
          },
        };
        lines.push(lineFeature);
      }
      let features: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: lines,
      };
      (mapbox?.getSource("lineSource") as mapboxgl.GeoJSONSource)?.setData(
        features
      );
    }

    function hideAllLine() {
      let features: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      (mapbox?.getSource("lineSource") as mapboxgl.GeoJSONSource)?.setData(
        features
      );
    }

    function drawLines() {
      let lines: Array<GeoJSON.Feature> = [];
      lineData.forEach((item: any) => {
        let points: Array<[number, number]> = item.points;
        if (points) {
          GisUtil.handleMapboxCoords(points);
          let lineFeature: GeoJSON.Feature = {
            type: "Feature",
            properties: {
              name: item.name,
              desc: item.desc,
              width: 2,
              color: "red",
            },
            geometry: {
              type: "LineString",
              coordinates: points,
            },
          };
          lines.push(lineFeature);
        }
      });
      let features: GeoJSON.FeatureCollection = {
        type: "FeatureCollection",
        features: lines,
      };
      (mapbox?.getSource("lineSource") as mapboxgl.GeoJSONSource)?.setData(
        features
      );
    }

    function initMapBox() {
      return new Promise((resolve, reject) => {
        try {
          mapbox = new mapboxgl.Map({
            container: "mapboxContainer",
            center: [180, 28],
            zoom: 1.8,
            minZoom: 1.5,
            style: {
              version: 8,
              sprite: `${window.location.origin}/mapbox/sprites1/sprite`,
              glyphs: `${window.location.origin}/mapbox/fonts/{fontstack}/{range}.pbf`,
              sources: {
                mapSource: {
                  type: "raster",
                  tiles: [UserConfig.Instance.MAP_SOURCE ?? ""],
                  tileSize: 256,
                },
                lineSource: {
                  type: "geojson",
                  lineMetrics: true,
                  data: { type: "FeatureCollection", features: [] },
                },
              },
              layers: [
                {
                  id: "mapLayer",
                  type: "raster",
                  source: "mapSource",
                },
                {
                  id: "lineLayer",
                  type: "line",
                  source: "lineSource",
                  minzoom: 0,
                  maxzoom: 24,
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": ["get", "color"],
                    "line-width": ["get", "width"],
                  },
                },
              ],
            },
          });

          mapbox.on("load", () => {
            //比例尺
            var scale = new mapboxgl.ScaleControl({
              maxWidth: 100,
              unit: "metric",
            });
            mapbox?.addControl(scale, "bottom-left");
            resolve(1);
          });
        } catch (error) {
          reject(error);
        }
      });
    }

    return { showFlightList, drawLine, drawLines, hideAllLine };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .map-container {
    width: 100%;
    height: 100%;
  }

  .map-r-warp {
    z-index: 1;
    width: 550px;
    height: 100%;
    // overflow-y: auto;
    position: absolute;
    transition: all 0.3s;
    top: 0;
    right: 0;
    background: rgba(200, 200, 200, 0.9);

    &[show="false"] {
      width: 0;
    }
    .flight-list-hide-btn {
      position: absolute;
      top: 0;
      left: -16px;
      height: 36px;
      width: 16px;
      cursor: pointer;
      border-radius: 0 0 0 8px;
      background-color: rgba(214, 214, 214, 0.8);
      // background-color: red;
      background-image: url("../../assets/images/r.png");
      background-repeat: no-repeat;
      background-position: center center;

      &[show="false"] {
        background-image: url("../../assets/images/l.png");
      }
    }

    // 地图操作面板
    .zs-map-actions-warp {
      z-index: 1;
      width: 30px;
      height: 60px;
      position: absolute;
      top: 90px;
      left: -30px;
      background-color: rgba(0, 0, 0, 0.8);

      & > div {
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 26px 26px;
        &:hover {
          background-color: rgba(214, 214, 214, 0.6);
          cursor: pointer;
        }
      }
      // 图层按钮
      .map-action-layers {
        background-image: url("../../assets/images/layers.png");
      }
      // 定位按钮
      .map-action-position {
        background-image: url("../../assets/images/position.png");
      }
    }

    .flight-list-stat-warp {
      position: absolute;
      top: 5px;
      left: -200px;
      width: 172px;
      height: 78px;
      background-color: rgba(60, 60, 60, 0.7);
      color: #ffffff;
      // line-height: 26px;
      border-radius: 4px;
      padding: 0 6px;

      .tb-fstat-col1 {
        width: 85px;
        text-align: right;
      }
      .tb-fstat-col2 {
        width: 55px;
      }
      .tb-fstat-col3 {
        width: 20px;
        font-size: 12px;

        & > span {
          cursor: pointer;
          &[show="false"] {
            color: #aaaaaa;
          }
        }
      }
    }

    .flight-list-content {
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: auto;
    }

    .filter-flightNature {
      // position: absolute;
      top: 10px;
      right: 10px;
      z-index: 1;
      width: 180px;
    }

    .filter-targetNum {
      // position: absolute;
      top: 40px;
      right: 10px;
      z-index: 1;
      width: 180px;
    }
  }
}
</style>