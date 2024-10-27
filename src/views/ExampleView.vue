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
              {{ props.routeName }}
            </h2>
          </div>
        </div>
      </div>
    </header>
    <main
      class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">: (</p>
        <h1
          class="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
        >
          Not implemented yet
        </h1>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Go back home</a
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Components
import NavBar from '@/components/NavBar.vue'

// Props
const props = defineProps<{
  routeName: string
}>()
</script>
