<template>
  <div v-if="showingMap" class="flex flex-col gap-4">
    <InspectionMapView v-model="showingMap" class="map-container" />
  </div>
  <div v-else class="bg-white">
    <div class="mx-auto max-w-2xl px-6 py-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Inspection findings</h2>

      <div
        class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10"
      >
        <div
          v-for="inspectionFinding in props.allInpectionInfo.inspectionFindings"
          :key="inspectionFinding.inspectionId"
          class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer hover:shadow-lg"
          @click="showingMap = inspectionFinding"
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
                #Id: {{ inspectionFinding.findingId.split('-')[0] }}
              </p>
              <div class="flex items-center gap-4">
                <span
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
                </span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HandThumbUpIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/vue/24/outline'

import type { AllInpectionInfo, InspectionFinding } from '@/db'
import { ref, watch } from 'vue'

// Components
import InspectionMapView from '@/views/InspectionMapView.vue'

const props = defineProps<{
  allInpectionInfo: AllInpectionInfo
}>()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const showingMap = ref<InspectionFinding | null>(null)

watch(showingMap, () => {
  scrollToTop()
})

const actions = {
  GOOD: {
    title: 'Good',
    icon: HandThumbUpIcon,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-green-50',
    cardBackground: 'bg-green-500',
    type: 'GOOD',
  },
  WARNING: {
    title: 'Warning',
    icon: ExclamationTriangleIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    cardBackground: 'bg-yellow-500',
    type: 'WARNING',
  },
  CRITICAL: {
    title: 'Critical',
    icon: ExclamationCircleIcon,
    iconForeground: 'text-red-700',
    iconBackground: 'bg-red-50',
    cardBackground: 'bg-red-500',
    type: 'CRITICAL',
  },
}

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
