import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SemanticHTML from '../views/SemanticHTML.vue'
import KeyboardNavigation from '../views/KeyboardNavigation.vue'
import MediaAccessible from '../views/MediaAccessible.vue'
import ColorContrast from '../views/ColorContrast.vue'
import AccessibleForms from '../views/AccessibleForms.vue'
import ARIAComponents from '../views/ARIAComponents.vue'
import Performance from '../views/Performance.vue'

const router = createRouter({
  history: createWebHistory(),
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