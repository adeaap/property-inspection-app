<template>
  <div v-if="showingMap" class="flex flex-col gap-4">
    <div class="flex gap-4 items-center">
      <button
        @click="showingMap = null"
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
    <MapContainer v-model="showingMap" class="map-container" />
    <div
      class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer"
    >
      <div
        class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
      >
        <img
          :src="imgArrayBuffertoBase64(showingMap.photo)"
          :alt="showingMap.description"
          class="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div class="flex flex-1 flex-col space-y-2 p-4">
        <div class="flex items-center justify-between">
          <p class="text-base text-gray-900">
            <span aria-hidden="true" class="absolute inset-0" />
            #Id: {{ showingMap.findingId }}
          </p>
          <div class="flex items-center gap-4">
            <span
              :class="[
                actions[showingMap.type].iconBackground,
                actions[showingMap.type].iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white',
              ]"
            >
              <component
                :is="actions[showingMap.type].icon"
                class="h-6 w-6"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
        <p class="text-sm italic text-gray-500">
          {{ showingMap.type }}
        </p>

        <p class="text-sm text-gray-500">
          {{ showingMap.description }}
        </p>
      </div>
    </div>
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
          class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer"
          @click="showingMap = inspectionFinding"
        >
          <div
            class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
          >
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

            <!-- <div class="flex flex-1 flex-col justify-end">
              <p class="text-sm italic text-gray-500">{{ product.options }}</p>
              <p class="text-base font-medium text-gray-900">
                {{ product.price }}
              </p>
            </div> -->
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
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import type { AllInpectionInfo, InspectionFinding } from '@/db'
import { ref, watch } from 'vue'

// Components
import MapContainer from '@/features/inspections/MapContainer.vue'

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
