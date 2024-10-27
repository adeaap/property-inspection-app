import { createRouter, createWebHistory } from 'vue-router'
import InspectionsView from '@/views/InspectionsView.vue'
import StartInspectionView from '@/views/StartInspectionView.vue'
import InspectionDetailsView from '@/views/InspectionDetailsView.vue'
import ExampleView from '@/views/ExampleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inspections',
      component: InspectionsView,
    },
    {
      path: '/examples/:routeName',
      name: 'examples',
      props: true,
      component: ExampleView,
    },
    {
      path: '/inspection/details/:inspectionId',
      name: 'inspection-details',
      props: true,
      component: InspectionDetailsView,
    },
    {
      path: '/start/:inspectionId',
      name: 'start-inspection',
      props: true,
      component: StartInspectionView,
    },
  ],
})

export default router
