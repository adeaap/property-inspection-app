<template>
  <button
    @click="open = true"
    type="button"
    class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add
    <PlusCircleIcon class="-mr-0.5 h-5 w-5" aria-hidden="true" />
  </button>
  <!--
  <button
    type="button"
    class="block sm:hidden rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    <PlusIcon class="h-5 w-5" aria-hidden="true" />
  </button> -->
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

                  <!-- <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div
                      class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-3">
                        <label
                          for="first-name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >First name</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label
                          for="last-name"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Last name</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-4">
                        <label
                          for="email"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Email address</label
                        >
                        <div class="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label
                          for="country"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Country</label
                        >
                        <div class="mt-2">
                          <select
                            id="country"
                            name="country"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-span-full">
                        <label
                          for="street-address"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >Street address</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2 sm:col-start-1">
                        <label
                          for="city"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >City</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="city"
                            id="city"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="region"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >State / Province</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="region"
                            id="region"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label
                          for="postal-code"
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >ZIP / Postal code</label
                        >
                        <div class="mt-2">
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <!--
                  <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">
                      Notifications
                    </h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">
                      We'll always let you know about important changes, but you
                      pick what else you want to hear about.
                    </p>

                    <div class="mt-10 space-y-10">
                      <fieldset>
                        <legend
                          class="text-sm font-semibold leading-6 text-gray-900"
                        >
                          By Email
                        </legend>
                        <div class="mt-4 space-y-6">
                          <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div class="text-sm leading-6">
                              <label
                                for="comments"
                                class="font-medium text-gray-900"
                                >Comments</label
                              >
                              <p class="text-gray-500">
                                Get notified when someones posts a comment on a
                                posting.
                              </p>
                            </div>
                          </div>
                          <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                              <input
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div class="text-sm leading-6">
                              <label
                                for="candidates"
                                class="font-medium text-gray-900"
                                >Candidates</label
                              >
                              <p class="text-gray-500">
                                Get notified when a candidate applies for a job.
                              </p>
                            </div>
                          </div>
                          <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                              <input
                                id="offers"
                                name="offers"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                            </div>
                            <div class="text-sm leading-6">
                              <label
                                for="offers"
                                class="font-medium text-gray-900"
                                >Offers</label
                              >
                              <p class="text-gray-500">
                                Get notified when a candidate accepts or rejects
                                an offer.
                              </p>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend
                          class="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Push Notifications
                        </legend>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          These are delivered via SMS to your mobile phone.
                        </p>
                        <div class="mt-4 space-y-6">
                          <div class="flex items-center gap-x-3">
                            <input
                              id="push-everything"
                              name="push-notifications"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              for="push-everything"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Everything</label
                            >
                          </div>
                          <div class="flex items-center gap-x-3">
                            <input
                              id="push-email"
                              name="push-notifications"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              for="push-email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Same as email</label
                            >
                          </div>
                          <div class="flex items-center gap-x-3">
                            <input
                              id="push-nothing"
                              name="push-notifications"
                              type="radio"
                              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              for="push-nothing"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >No push notifications</label
                            >
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div> -->
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
