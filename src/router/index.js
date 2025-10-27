import { createRouter, createWebHistory } from 'vue-router'

// Eager load home page for fast initial paint
import Home from '../views/Home.vue'

// Lazy load all other pages for better performance
const SemanticHTML = () => import('../views/SemanticHTML.vue')
const KeyboardNavigation = () => import('../views/KeyboardNavigation.vue')
const MediaAccessible = () => import('../views/MediaAccessible.vue')
const ColorContrast = () => import('../views/ColorContrast.vue')
const AccessibleForms = () => import('../views/AccessibleForms.vue')
const ARIAComponents = () => import('../views/ARIAComponents.vue')
const Performance = () => import('../views/Performance.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top when navigating to a new route
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/semantic-html',
      name: 'semantic',
      component: SemanticHTML
    },
    {
      path: '/keyboard-navigation',
      name: 'keyboard',
      component: KeyboardNavigation
    },
    {
      path: '/media-accessible',
      name: 'media',
      component: MediaAccessible
    },
    {
      path: '/color-contrast',
      name: 'contrast',
      component: ColorContrast
    },
    {
      path: '/accessible-forms',
      name: 'forms',
      component: AccessibleForms
    },
    {
      path: '/aria-components',
      name: 'aria',
      component: ARIAComponents
    },
    {
      path: '/performance',
      name: 'performance',
      component: Performance
    }
  ]
})

export default router