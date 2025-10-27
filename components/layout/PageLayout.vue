<template>
  <div class="page-layout">
    <Breadcrumb v-if="showBreadcrumb" />
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumb from '../common/Breadcrumb.vue'

const route = useRoute()

// Ne pas afficher le breadcrumb sur la page d'accueil
const showBreadcrumb = computed(() => route.path !== '/')
</script>

<style scoped>
.page-layout {
  width: 100%;
}
</style>
