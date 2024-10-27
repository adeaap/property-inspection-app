import { createRouter, createWebHistory } from 'vue-router'
import InspectionsView from '@/views/InspectionsView.vue'
import StartInspectionView from '@/views/StartInspectionView.vue'
import InspectionDetailsView from '@/views/InspectionDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inspections',
      component: InspectionsView,
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
