<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-indigo-600" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=300"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-indigo-700 text-white'
                      : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="relative rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                  >
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem
                      v-for="item in userNavigation"
                      :key="item.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >{{ item.name }}</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'bg-indigo-700 text-white'
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-indigo-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-indigo-300">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full border-2 border-transparent bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

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
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'

const router = useRouter()

// Local DB
import { db } from '@/db'
import type { AllInpectionInfo } from '@/db'

// Components
import StatusTag from '@/components/StatusTag.vue'
import InspectionFindingList from '@/features/inspections/InspectionFindingList.vue'

const props = defineProps<{
  inspectionId: string
}>()
console.log(props.inspectionId)

const allInpectionInfo = ref<AllInpectionInfo | null>(null)

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Inspections', href: '#', current: true },
  { name: 'Properties', href: '#', current: false },
  { name: 'Clients', href: '#', current: false },
  { name: 'Inspectors', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

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
