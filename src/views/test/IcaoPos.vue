<!--展示后端给定的Icao的位置-->
<template>
  <div class="t-icao-container">
    <div class="t-icon-warp" id="tMapContainer"></div>
  </div>
</template>

<script lang="ts">
import mapboxgl from "mapbox-gl";
import { defineComponent, ref, onMounted, nextTick } from "vue";
import UserConfig from "@/types/UserConfig";

import { getAllAirport } from "@/api/test/IcaoTest";

export default defineComponent({
  name: "IcaoPos",
  setup() {
    let mapbox: mapboxgl.Map | null = null;

    onMounted(() => {
      nextTick(() => {
        initMapbox().finally(() => {
          console.log("地图初始化完成");
          getIcaoList();
        });
      });
    });

    function initMapbox(): Promise<number> {
      return new Promise((resolve, reject) => {
        try {
          mapbox = new mapboxgl.Map({
            container: "tMapContainer",
            center: [180, 28],
            zoom: 2.5,
            // minZoom: 2.5,
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
                airportSource: {
                  type: "geojson",
                  data: { type: "FeatureCollection", features: [] },
                },
              },
              layers: [
                {
                  id: "mapLayer",
                  type: "raster",
                  source: "mapSource",
                },
                //机场
                {
                  id: "airportLayer",
                  type: "symbol",
                  source: "airportSource",
                  minzoom: 0,
                  maxzoom: 24,
                  layout: {
                    visibility: "visible",
                    "icon-image": "2",
                    "icon-size": 0.25,
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true,

                    "text-field": ["get", "name"],
                    "text-size": 10,
                    "text-allow-overlap": true,
                    "text-ignore-placement": true,
                    "text-font": ["Microsoft YaHei"],
                    // "text-anchor": "top",
                    "text-offset": [0, 1.5],
                  },
                  paint: {
                    // "icon-color": ["get", "color"],
                    "text-color": "#000",
                  },
                },
              ],
            },
          });
          resolve(1);
        } catch {
          reject(-1);
        }
      });
    }

    function getIcaoList() {
      getAllAirport().then((res) => {
        if (res.code === 1 && mapbox != null) {
          let airportGeoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
            type: "FeatureCollection",
            features: [],
          };
          res.data.forEach((a) => {
            airportGeoJson.features.push({
              type: "Feature",
              properties: a,
              geometry: {
                type: "Point",
                coordinates: [a.lng, a.lat],
              },
            });
          });
          (
            mapbox.getSource("airportSource") as mapboxgl.GeoJSONSource
          )?.setData(airportGeoJson);
        }
      });
    }

    return {};
  },
});
</script>

<style lang="less" scoped>
.t-icao-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .t-icon-warp {
    width: 100%;
    height: 100%;
  }
}
</style>