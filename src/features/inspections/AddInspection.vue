<template>
  <button
    @click="open = true"
    type="button"
    class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add
    <PlusCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
  </button>

  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
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
                <div class="space-y-12">
                  <div class="border-b border-gray-900/10 pb-6">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add Inspection
                    </DialogTitle>

                    <p class="mt-1 text-sm leading-6 text-gray-600">
                      Fill out the form below to add a new inspection.
                    </p>

                    <div class="sm:col-span-3 mt-4">
                      <label
                        for="country"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Client
                      </label>
                      <div class="mt-2">
                        <select
                          id="client"
                          name="client"
                          required
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          v-model="clientSelected"
                        >
                          <option
                            disabled
                            selected
                            value=""
                            aria-label="Select a client"
                          >
                            Select a client
                          </option>
                          <option
                            v-for="client in clients"
                            :key="client.clientId"
                            :value="client.clientId"
                          >
                            {{ client.firstName }}
                            {{ client.lastName }}
                          </option>
                        </select>
                      </div>
                      <p
                        class="mt-2 text-sm text-gray-500"
                        id="email-description"
                      >
                        Client that requested the inspection
                      </p>
                    </div>

                    <div class="sm:col-span-3 mt-4">
                      <label
                        for="country"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Inspector
                      </label>
                      <div class="mt-2">
                        <select
                          id="inspector"
                          name="inspector"
                          required
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          v-model="inspectorSelected"
                        >
                          <option
                            disabled
                            selected
                            value=""
                            aria-label="Select an inspector"
                          >
                            Select an inspector
                          </option>
                          <option
                            v-for="inspector in inspectors"
                            :key="inspector.inspectorId"
                            :value="inspector.inspectorId"
                          >
                            {{ inspector.firstName }}
                            {{ inspector.lastName }}
                          </option>
                        </select>
                      </div>
                      <p
                        class="mt-2 text-sm text-gray-500"
                        id="email-description"
                      >
                        Inspector that will perform the inspection
                      </p>
                    </div>

                    <div class="sm:col-span-3 mt-4">
                      <label
                        for="property"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Property
                      </label>
                      <div class="mt-2">
                        <select
                          id="property"
                          name="property"
                          required
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          v-model="propertySelected"
                        >
                          <option
                            disabled
                            selected
                            value=""
                            aria-label="Select a client"
                          >
                            Select a property
                          </option>
                          <option
                            v-for="property in properties"
                            :key="property.propertyId"
                            :value="property.propertyId"
                          >
                            Property at {{ property.city }} -
                            {{ property.address }}
                          </option>
                        </select>
                      </div>
                      <p
                        class="mt-2 text-sm text-gray-500"
                        id="email-description"
                      >
                        Property to be inspected
                      </p>
                    </div>

                    <div class="sm:col-span-3 mt-4">
                      <label
                        for=""
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Inspection Date
                      </label>
                      <div class="mt-2">
                        <input
                          type="date"
                          name="inspection-date"
                          id="inspection-date"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          v-model="inspectionDate"
                        />
                      </div>
                      <p
                        class="mt-2 text-sm text-gray-500"
                        id="email-description"
                      >
                        Date the inspection will take place
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-end gap-x-6">
                  <button
                    @click="open = false"
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
import { PlusCircleIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

import { db } from '@/db'
import { liveQuery } from 'dexie'
import { from, useObservable } from '@vueuse/rxjs'

// Services
import { addInspection } from '@/services/db-api'

const open = ref(false)
const clientSelected = ref()

const clients = useObservable(
  from(
    liveQuery(async () => {
      return await db.clients.toArray()
    }),
  ),
)
const inspectorSelected = ref()
const inspectors = useObservable(
  from(
    liveQuery(async () => {
      return await db.inspectors.toArray()
    }),
  ),
)
const propertySelected = ref()
const properties = useObservable(
  from(
    liveQuery(async () => {
      return await db.properties.toArray()
    }),
  ),
)

const inspectionDate = ref()

// Methods

const handleFormSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    await addInspection({
      clientId: clientSelected.value,
      inspectorId: inspectorSelected.value,
      propertyId: propertySelected.value,
      inspectionDate: inspectionDate.value,
      status: 'scheduled',
    })
    open.value = false
  } catch (error) {
    console.error(error)
  }
}
</script>
