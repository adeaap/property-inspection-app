<template>
  <header class="bg-white shadow-md sticky top-0 z-10">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 truncate sm:text-3xl sm:tracking-tight"
          >
            In progress
          </h2>
        </div>
        <button
          @click="handleFinishInspection"
          type="button"
          class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finish
          <StopCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
  <main>
    <div class="container mx-auto sm:px-6 lg:px-8 py-8">
      <div
        class="divide-y divide-gray-200 overflow-hidden rounded-lg grid grid-cols-1 gap-8 divide-y-0 px-8"
      >
        <div
          v-for="action in actions"
          :key="action.title"
          class="group relative p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg"
          :class="[
            action.cardBackground,
            // actionIdx === 0
            //   ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
            //   : '',
            // actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
            // actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
            // actionIdx === actions.length - 1
            //   ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
            //   : '',
            // 'group relative  p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg',
          ]"
          @click="e => handleClick(action)"
        >
          <div>
            <span
              :class="[
                action.iconBackground,
                action.iconForeground,
                'inline-flex rounded-lg p-3 ring-4 ring-white',
              ]"
            >
              <component :is="action.icon" class="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div class="mt-8">
            <h3 class="text-2xl font-semibold leading-6 text-gray-900">
              <!-- Extend touch target to entire panel -->
              <span class="absolute inset-0" aria-hidden="true" />
              {{ action.title }}
            </h3>
            <!-- <p class="mt-2 text-sm text-gray-500">
              Doloribus dolores nostrum quia qui natus officia quod et dolorem.
              Sit repellendus qui ut at blanditiis et quo et molestiae.
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </main>
  <RequestingGeolocationDialog v-model="showingGeolocationDialog" />
  <InspectionFormDialog
    v-if="currentAction && currentLocation"
    v-model="showingInspectionFormDialog"
    :inspection-id="props.inspectionId"
    :currentLocation="currentLocation"
    :currentAction="currentAction"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  HandThumbUpIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  StopCircleIcon,
} from '@heroicons/vue/24/outline'

import type { InspectionAction } from '@/db'

// Services
import { updateInspection } from '@/services/db-api'

// Components
import RequestingGeolocationDialog from '@/features/inspections/RequestingGeolocationDialog.vue'
import InspectionFormDialog from '@/features/inspections/InspectionFormDialog.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  inspectionId: string
}>()
console.log('props', props)

const showingGeolocationDialog = ref(false)
const currentAction = ref<InspectionAction | null>(null)
const currentLocation = ref<GeolocationPosition | null>(null)
const showingInspectionFormDialog = ref(false)

const actions: InspectionAction[] = [
  {
    title: 'Good',
    icon: HandThumbUpIcon,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-green-50',
    cardBackground: 'bg-green-500',
    type: 'GOOD',
  },
  {
    title: 'Warning',
    icon: ExclamationTriangleIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
    cardBackground: 'bg-yellow-500',
    type: 'WARNING',
  },
  {
    title: 'Critical',
    icon: ExclamationCircleIcon,
    iconForeground: 'text-red-700',
    iconBackground: 'bg-red-50',
    cardBackground: 'bg-red-500',
    type: 'CRITICAL',
  },
]

// Methods

const handleClick = (action: InspectionAction) => {
  if (navigator.geolocation) {
    showingGeolocationDialog.value = true
    navigator.geolocation.getCurrentPosition(
      position => {
        handlePosition(position, action)
      },
      error => {
        console.error('Failed to add inspection:', error)
        showingGeolocationDialog.value = false
        alert(`Failed to add ${action.title}: ${error}`)
        // setOpenSnackbar(true)
        // setSnackbarInfo({
        //   severity: 'error',
        //   message: `Failed to add ${action.title}: ${error}`,
        // })
      },
      {
        maximumAge: 0,
        enableHighAccuracy: true,
      },
    )
  } else {
    showingGeolocationDialog.value = false
    alert('Geolocation is not supported by your browser.')
    // setOpenSnackbar(true)
    // setSnackbarInfo({
    //   severity: 'error',
    //   message: `Failed to add ${action.title}:  "Geolocation is not supported by your browser."`,
    // })
  }
}

const handlePosition = async (
  position: GeolocationPosition,
  action: InspectionAction,
) => {
  currentAction.value = action
  currentLocation.value = position
  showingGeolocationDialog.value = false
  showingInspectionFormDialog.value = true
  console.log('position', position)
}

const handleFinishInspection = async () => {
  try {
    await updateInspection(props.inspectionId, { status: 'completed' })
    router.push({ path: '/' })
  } catch (error) {
    console.error('Failed to finish inspection:', error)
  }
}
</script>
