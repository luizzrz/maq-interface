<template>
    <div class="content">
      <h1>{{ title }}</h1>
      <div class="content-inner">
        <!-- Add tree structure and other content here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Modo Automático',
        // Add other data needed for content
      };
    },
  };
  </script>
  
  <style scoped>
  .content {
    padding: 20px;
  }
  .content-inner {
    display: flex;
    /* Add styles for inner content */
  }
  </style>
  