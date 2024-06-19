<template>
    <div id="app" class="flex flex-col h-screen">
      <ContentComponent/>
    </div>
  </template>
  
  <script>
  import SidebarComponent from './sidebar/SidebarComponent.vue';
  import StatusComponent from './status/StatusComponent.vue';
  import ContentComponent from './content/ContentComponent.vue';
  import FooterComponent from './footer/FooterComponent.vue';
  
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
  