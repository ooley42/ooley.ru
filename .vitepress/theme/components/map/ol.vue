<script setup>
import { useStorage } from '@vueuse/core'
import 'ol/ol.css'
import { Map, View } from 'ol';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Circle, Style, Stroke, Fill, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import PinchZoom from 'ol/interaction/PinchZoom';
import Select from 'ol/interaction/Select';
import Stamen from 'ol/source/Stamen';

//https://openlayers.org/en/latest/examples/icon.html
//https://openlayers.org/en/latest/examples/animation.html


const props = defineProps({
  showLines: Boolean,
  showCenter: Boolean,
  center: { type: Array, default: [37.72265776708658, 55.79885477019039] },
  routes: { type: Array, default: [] },
  route: { type: String },
  page: { type: Object },
})

const sel = useStorage('map-sel', null)

const places = computed(() => {
  const pl = []
  if (props.showCenter) pl.push(props.page)
  for (let r of props.routes) {
    if (r.path.includes(props.route) && r.coord) {
      pl.push(r)
    }
  }
  return pl
})

const place = computed(() => places.value.find(el => el.path == sel.value))

onMounted(() => {
  const cities = places.value.map((city, c) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat([city.coord[1], city.coord[0]])),
      title: city.title,
      path: city.path,
      icon: city.icon,
    })

    if (false && city.icon) {

      const image = new Icon({
        anchor: [0.5, 0.5],
        src: city.icon,
        scale: 0.05
      })
      const style = new Style({
        image,
      })

      feature.setStyle(style)
    } else {
      feature.setStyle(new Style({
        image: new Circle({
          radius: 12,
          stroke: new Stroke({ color: '#f80', width: 8 }),
          fill: new Stroke({ color: '#f805' }),
        }),
      }))
    }
    return feature
  })

  // cities.forEach((city, c) => {
  //   const size = 80
  //   const img = new Image()
  //   img.src = city.getProperties()?.icon
  //   img.onload = () => {
  //     cities[c].getStyle().getImage().setScale(size / img.width)
  //   }
  // })

  const pointSource = new VectorSource({
    features: cities,
  });

  const pointLayer = new VectorLayer({
    source: pointSource,
  });

  const lines = places.value.map((city, c) => {
    let line = new Feature({
      geometry: new LineString([fromLonLat(props.center), fromLonLat([city.coord[1], city.coord[0]])])
    })
    line.setStyle(new Style({
      stroke: new Stroke({
        color: '#ff8800',
        width: 2,
      }),
    }))
    return line
  })

  const lineSource = new VectorSource({
    features: lines,
  });

  const lineLayer = new VectorLayer({
    source: lineSource,
  });

  const layers = [

    new TileLayer({
      source: new Stamen({
        layer: 'watercolor',
      }),
    }),
    new TileLayer({
      source: new Stamen({
        layer: 'terrain-labels',
      }),
    }),
    new TileLayer({ source: new OSM(), opacity: 0.4 }),
    pointLayer,
  ]

  if (props.showLines) {
    layers.push(lineLayer)
  }

  const map = new Map({
    layers,
    view: new View({
      center: fromLonLat(props.center),
      zoom: 4,
    }),
    target: 'map',
  });

  const selected = new Style({
    fill: new Fill({
      color: '#993300',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 1,
    }),
  });

  const selectSingleClick = new Select({});

  selectSingleClick.on('select', (e) => {
    if (e.deselected?.[0]) {
      sel.value = null
    }
    if (!e.selected?.[0]) return
    sel.value = e?.selected?.[0].getProperties().path

  })

  map.addInteraction(selectSingleClick);

});



</script>

<template lang="pug">
div.relative
  #map.h-820px.max-h-80vh.overflow-hidden.cursor-pointer(tabindex="1")
  transition(name="fade" mode="out-in")
    a.flex.flex-wrap.absolute.bottom-0.z-2.bg-light-200.w-full.bg-opacity-80.dark-bg-dark-200.dark-bg-opacity-80.backdrop-filter.backdrop-blur-sm(v-if="place" :key="place" :href="place.path") 
      .p-2.flex-1.justify-center.flex.items-center
        img.w-20.max-w-40vw(:src="place.icon")
      .px-2.py-6.flex-auto.gap-1.flex.flex-col
        .text-xl.font-bold {{ place.title }}
        .text-md {{ place.description }}
        .text-sm.font-bold {{ place.city }}
</template>

<style scoped></style>