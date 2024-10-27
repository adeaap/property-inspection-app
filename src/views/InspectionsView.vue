<template>
  <div class="min-h-full">
    <NavBar />

    <header class="bg-white shadow-md sticky top-0 z-10">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="min-w-0 flex-1">
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 truncate sm:text-3xl sm:tracking-tight"
            >
              Inspections
            </h2>
          </div>
          <AddInspection />
        </div>
      </div>
    </header>
    <main>
      <div
        class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 inspection-list-container"
      >
        <InspectionList />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Components
import NavBar from '@/components/NavBar.vue'
import InspectionList from '@/features/inspections/InspectionList.vue'
import AddInspection from '@/features/inspections/AddInspection.vue'
</script>
