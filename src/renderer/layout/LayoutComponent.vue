<template>
  <div id="app" class="flex flex-col h-screen">
    <ContentComponent />
  </div>
</template>

<script>
import SidebarComponent from '../components/layout/sidebar/SidebarComponent.vue';
import StatusComponent from '../components/layout/status/StatusComponent.vue';
import ContentComponent from '../components/layout/content/ContentComponent.vue';
import FooterComponent from '../components/layout/footer/FooterComponent.vue';

export default {
  components: {
    SidebarComponent,
    StatusComponent,
    ContentComponent,
    FooterComponent,
  },
};
</script>

<style>
/* Add any global styles here if needed */
</style>