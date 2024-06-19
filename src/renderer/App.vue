<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

window.electronAPI.sendMessage('Hello from App.vue!');
</script> -->

<template>
  <div id="app">
    <StatusComponent />
    <div class="main-layout">
      <SidebarComponent />
      <ContentComponent />
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import SidebarComponent from './components/SidebarComponent.vue';
import StatusComponent from './components/StatusComponent.vue';
import ContentComponent from './components/ContentComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

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
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-layout {
  display: flex;
  flex: 1;
}
</style>

