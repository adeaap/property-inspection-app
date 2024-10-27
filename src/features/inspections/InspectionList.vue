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
          <!-- <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
            <circle cx="1" cy="1" r="1" />
          </svg> -->
          <!-- <p class="truncate">Created by {{ inspection.inspectorId }}</p> -->
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

        <!-- <a
          href="#"
          class="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
          >Start inspection<span class="sr-only"
            >, {{ inspection.inspectionId }}</span
          >
        </a> -->
        <!-- <Menu as="div" class="relative flex-none">
          <MenuButton
            class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
          >
            <span class="sr-only">Open options</span>
            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900',
                  ]"
                  >Edit<span class="sr-only"
                    >, {{ inspection.inspectionId }}</span
                  ></a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900',
                  ]"
                  >Move<span class="sr-only"
                    >, {{ inspection.inspectionId }}</span
                  ></a
                >
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a
                  href="#"
                  :class="[
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900',
                  ]"
                  >Delete<span class="sr-only"
                    >, {{ inspection.inspectionId }}</span
                  ></a
                >
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu> -->
      </div>
    </li>
  </ul>
  <!--
  <div class="-mx-4 mt-8 sm:-mx-0">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Name
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Title
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Email
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Role
          </th>
          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <tr v-for="person in people" :key="person.email">
          <td
            class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
          >
            {{ person.name }}
          </td>
          <td
            class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell"
          >
            {{ person.title }}
          </td>
          <td
            class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
          >
            {{ person.email }}
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            {{ person.role }}
          </td>
          <td
            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
          >
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >Edit<span class="sr-only">, {{ person.name }}</span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  // EllipsisVerticalIcon,
  PlayCircleIcon,
} from '@heroicons/vue/20/solid'

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
// const projects = [
//   {
//     id: 1,
//     name: 'GraphQL API',
//     href: '#',
//     status: 'Complete' as Status,
//     createdBy: 'Leslie Alexander',
//     dueDate: 'March 17, 2023',
//     dueDateTime: '2023-03-17T00:00Z',
//   },
//   {
//     id: 2,
//     name: 'New benefits plan',
//     href: '#',
//     status: 'In progress' as Status,
//     createdBy: 'Leslie Alexander',
//     dueDate: 'May 5, 2023',
//     dueDateTime: '2023-05-05T00:00Z',
//   },
//   {
//     id: 3,
//     name: 'Onboarding emails',
//     href: '#',
//     status: 'Canceled' as Status,
//     createdBy: 'Courtney Henry',
//     dueDate: 'May 25, 2023',
//     dueDateTime: '2023-05-25T00:00Z',
//   },
//   {
//     id: 4,
//     name: 'iOS app',
//     href: '#',
//     status: 'In progress' as Status,
//     createdBy: 'Leonard Krasner',
//     dueDate: 'June 7, 2023',
//     dueDateTime: '2023-06-07T00:00Z',
//   },
//   {
//     id: 5,
//     name: 'Marketing site redesign',
//     href: '#',
//     status: 'Scheduled' as Status,
//     createdBy: 'Courtney Henry',
//     dueDate: 'June 10, 2023',
//     dueDateTime: '2023-06-10T00:00Z',
//   },
// ]

// const people = [
//   {
//     name: 'Lindsay Walton',
//     title: 'Front-end Developer',
//     email: 'lindsay.walton@example.com',
//     role: 'Member',
//   },
//   // More people...
// ]
</script>
