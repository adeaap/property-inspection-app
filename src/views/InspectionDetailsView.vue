<template>
  <div class="min-h-full">
    <NavBar />
    <header class="bg-white shadow-md sticky top-0 z-10">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <div class="flex gap-4 items-center">
              <button
                @click="router.push('/')"
                type="button"
                class="rounded-full bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <ArrowLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <h2
                class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
              >
                Inspection details
              </h2>
            </div>

            <div
              v-if="allInpectionInfo"
              class="mt-1 flex sm:mt-0 flex-row flex-wrap sm:space-x-6 gap-4"
            >
              <div class="mt-2 flex items-center text-sm text-gray-500">
                #Id:
                {{ allInpectionInfo.inspectionInfo.inspectionId.split('-')[0] }}
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Date: {{ allInpectionInfo.inspectionInfo.inspectionDate }}
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <StatusTag
                  :inspectionStatus="allInpectionInfo.inspectionInfo.status"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div
        class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 inspection-list-container"
      >
        <div v-if="allInpectionInfo">
          <InspectionFindingList :allInpectionInfo="allInpectionInfo" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { CalendarIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'

const router = useRouter()

// Local DB
import { db } from '@/db'
import type { AllInpectionInfo } from '@/db'

// Components
import NavBar from '@/components/NavBar.vue'
import StatusTag from '@/components/StatusTag.vue'
import InspectionFindingList from '@/features/inspections/InspectionFindingList.vue'

const props = defineProps<{
  inspectionId: string
}>()

const allInpectionInfo = ref<AllInpectionInfo | null>(null)

function getInspectionDetails() {
  return db.transaction(
    'r',
    [
      db.inspections,
      db.clients,
      db.inspectionFindings,
      db.inspectors,
      db.properties,
    ],
    async () => {
      const inspectionInfo = await db.inspections.get({
        inspectionId: props.inspectionId,
      })

      if (!inspectionInfo) {
        return null
      }

      const clientInfo = await db.clients.get({
        clientId: inspectionInfo.clientId,
      })

      const propertyInfo = await db.properties.get({
        propertyId: inspectionInfo.propertyId,
      })

      const inspectorInfo = await db.inspectors.get({
        inspectorId: inspectionInfo.inspectorId,
      })

      const inspectionFindings = await db.inspectionFindings
        .where({ inspectionId: props.inspectionId })
        .toArray()

      if (!clientInfo || !propertyInfo || !inspectorInfo) {
        return null
      }
      return {
        inspectionInfo,
        clientInfo,
        propertyInfo,
        inspectorInfo,
        inspectionFindings,
      }
    },
  )
}

watch(
  props,
  async props => {
    if (props.inspectionId) {
      allInpectionInfo.value = await getInspectionDetails()
    }
  },
  { immediate: true },
)
</script>
