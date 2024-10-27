<template>
  <div v-if="mapData && inspectionFinding" class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <button
        @click="mapData = null"
        type="button"
        class="rounded-full bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <h2
        class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        Map view
      </h2>
    </div>
    <MapContainer v-model="mapData" class="map-container" />
    <div
      class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      <div class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96">
        <img
          :src="imgArrayBuffertoBase64(inspectionFinding.photo)"
          :alt="inspectionFinding.description"
          class="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div class="flex flex-1 flex-col space-y-2 p-4">
        <div class="flex items-center justify-between">
          <p class="text-base text-gray-900">
            <span aria-hidden="true" class="absolute inset-0" />
            #Id: {{ inspectionFinding.findingId }}
          </p>
          <div class="flex items-center gap-4">
            <span
              v-if="inspectionFinding.type === 'GOOD'"
              class="bg-green-100 text-green-800 inline-flex rounded-lg p-3 ring-4 ring-white"
            >
              <HandThumbUpIcon class="h-6 w-6" aria-hidden="true" />
            </span>
            <span
              v-else-if="inspectionFinding.type === 'WARNING'"
              class="bg-yellow-100 text-yellow-800 inline-flex rounded-lg p-3 ring-4 ring-white"
            >
              <ExclamationTriangleIcon class="h-6 w-6" aria-hidden="true" />
            </span>
            <span
              v-else-if="inspectionFinding.type === 'CRITICAL'"
              class="bg-red-100 text-red-800 inline-flex rounded-lg p-3 ring-4 ring-white"
            >
              <ExclamationCircleIcon class="h-6 w-6" aria-hidden="true" />
            </span>
            <!-- <span
              :class="[
                actions[inspectionFinding.type].iconBackground,
                actions[inspectionFinding.type].iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white',
              ]"
            >
              <component
                :is="actions[inspectionFinding.type].icon"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </span> -->
          </div>
        </div>
        <p class="text-sm italic text-gray-500">
          {{ inspectionFinding.type }}
        </p>

        <p class="text-sm text-gray-500">
          {{ inspectionFinding.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HandThumbUpIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import type { InspectionFinding } from '@/db'
import MapContainer from '@/features/inspections/MapContainer.vue'
import { onMounted, ref, watch } from 'vue'

const mapData = defineModel<InspectionFinding | null>({
  type: Object,
  required: true,
})

const inspectionFinding = ref<InspectionFinding | null>(null)

onMounted(() => {
  if (mapData.value) {
    inspectionFinding.value = mapData.value
  }
})

watch(mapData, newVal => {
  if (newVal) {
    console.log('newVal mapData =>', newVal)
  }
})

const imgArrayBuffertoBase64 = (arrayBuffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(arrayBuffer)
  let byteString = ''
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  return `data:image/jpeg;base64,${btoa(byteString)}`
}
</script>

<style scoped>
.map-container {
  min-height: 400px;
  border-radius: 8px;
  height: auto;
}
</style>
