<template>
  <p
    :class="[
      statuses[props.inspectionStatus],
      'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
    ]"
  >
    {{ props.inspectionStatus }}
  </p>
</template>

<script setup lang="ts">
import type { InspectionStatus } from '@/db'
const props = defineProps<{
  inspectionStatus: InspectionStatus
}>()

const statuses = {
  completed: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  scheduled: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  canceled: 'text-red-700 bg-red-50 ring-red-600/20',
}
</script>
