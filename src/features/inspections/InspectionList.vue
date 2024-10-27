<template>
  <ul role="list" class="divide-y divide-gray-300 bg-white p-4 rounded-md">
    <li
      v-for="inspection in inspections"
      :key="inspection.inspectionId"
      class="flex items-center justify-between gap-x-6 py-5"
    >
      <div class="min-w-0">
        <div class="flex items-start gap-x-3">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            # Id: {{ inspection.inspectorId.split('-')[0] }}
          </p>
          <p
            :class="[
              statuses[inspection.status],
              'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
            ]"
          >
            {{ inspection.status }}
          </p>
        </div>
        <div
          class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
        >
          <p class="whitespace-nowrap">
            Inpection date:
            <time :datetime="inspection.inspectionDate">{{
              inspection.inspectionDate
            }}</time>
          </p>
        </div>
      </div>
      <div class="flex flex-none items-center gap-x-4">
        <RouterLink :to="`/start/${inspection.inspectionId}`">
          <button
            v-if="inspection.status === 'scheduled'"
            type="button"
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Start
            <PlayCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </RouterLink>

        <RouterLink :to="`/inspection/details/${inspection.inspectionId}`">
          <button
            v-if="inspection.status !== 'scheduled'"
            type="button"
            class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Details<span class="sr-only">, {{ inspection.inspectionId }}</span>
          </button>
        </RouterLink>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { PlayCircleIcon } from '@heroicons/vue/20/solid'

// Local DB
import { db } from '@/db'
import { liveQuery } from 'dexie'
import { from, useObservable } from '@vueuse/rxjs'

const inspections = useObservable(
  from(
    liveQuery(async () => {
      return await db.inspections.toArray()
    }),
  ),
)

const statuses = {
  completed: 'text-green-700 bg-green-50 ring-green-600/20',
  'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  scheduled: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  canceled: 'text-red-700 bg-red-50 ring-red-600/20',
}
</script>
