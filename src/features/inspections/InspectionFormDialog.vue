<template>
  <TransitionRoot as="template" :show="showingInspectionFormDialog">
    <Dialog class="relative z-10" @close="closeDialog">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <form @submit="handleFormSubmit">
                <div class="space-y-12 min-w-80">
                  <div class="border-b border-gray-900/10 pb-6">
                    <div class="flex items-center gap-4">
                      <span
                        :class="[
                          currentAction.iconBackground,
                          currentAction.iconForeground,
                          'inline-flex rounded-lg p-3 ring-4 ring-white',
                        ]"
                      >
                        <component
                          :is="currentAction.icon"
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </span>
                      <DialogTitle
                        as="h3"
                        class="text-base font-semibold leading-6 text-gray-900"
                      >
                        {{ currentAction.title }}
                      </DialogTitle>
                    </div>

                    <div class="sm:col-span-3 mt-4">
                      <div>
                        <label
                          for="inspection-description"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Description
                        </label>
                        <div class="mt-2">
                          <textarea
                            v-model="description"
                            required
                            rows="4"
                            name="inspection-description"
                            id="inspection-description"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="sm:col-span-3 mt-4 flex flex-col items-center">
                      <label
                        for="inspection-photo"
                        class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {{ fileInputValue ? 'Change photo' : 'Add photo' }}
                        <CameraIcon
                          class="-mr-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        <input
                          type="file"
                          id="inspection-photo"
                          name="inspection-form"
                          class="sr-only"
                          accept="image/*"
                          required
                          @change="handleFileChange"
                        />
                      </label>
                      <p
                        class="mt-2 text-sm text-gray-500"
                        id="email-description"
                      >
                        Required photo of the inspection
                      </p>
                      <div v-if="fileInputValue" class="mt-4 rounded-md">
                        <img
                          :src="getImageUrl(fileInputValue)"
                          alt="Inspection photo"
                          class="mt-4 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-end gap-x-6">
                  <button
                    @click="closeDialog"
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CameraIcon } from '@heroicons/vue/20/solid'

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import type { InspectionAction } from '@/db'

// Components

// Services
import { addInspectionFinding } from '@/services/db-api'

const props = defineProps<{
  inspectionId: string
  currentAction: InspectionAction
  currentLocation: GeolocationPosition
}>()

const description = ref<string>('')

const fileInputValue = ref<File>()

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files) {
    fileInputValue.value = files[0]
  }
}

const getImageUrl = (file: File) => {
  return URL.createObjectURL(file)
}

const showingInspectionFormDialog = defineModel({
  type: Boolean,
  default: false,
})

function closeDialog() {
  showingInspectionFormDialog.value = false
}

function blobToArrayBuffer(blob: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('loadend', () => {
      resolve(reader.result)
    })
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(blob)
  })
}

const resetForm = () => {
  description.value = ''
  fileInputValue.value = undefined
}

const handleFormSubmit = async (e: Event) => {
  e.preventDefault()

  try {
    if (!fileInputValue.value) {
      return
    }

    const formData = new FormData()
    formData.append('file', fileInputValue.value)
    formData.append('description', 'Inspection description')

    const imgArrayBuffer = await blobToArrayBuffer(fileInputValue.value)

    if (imgArrayBuffer instanceof ArrayBuffer) {
      addInspectionFinding({
        inspectionId: props.inspectionId,
        type: props.currentAction.type,
        description: description.value,
        latitude: props.currentLocation.coords.latitude,
        longitude: props.currentLocation.coords.longitude,
        photo: imgArrayBuffer,
      })
    }

    closeDialog()
    resetForm()
    alert('Inspection finding saved successfully.')
  } catch (error) {
    console.error('Failed to save inspection:', error)
    alert(
      `Failed to save inspection. If the problem persists, please contact support.`,
    )
  }
}
</script>
