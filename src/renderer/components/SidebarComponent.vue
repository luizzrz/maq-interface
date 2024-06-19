<template>
    <div class="sidebar">
      <button v-for="button in buttons" :key="button.id" class="sidebar-button">
        <img :src="button.icon" :alt="button.label" />
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { id: 1, icon: 'path-to-icon1', label: 'Button 1' },
          { id: 2, icon: 'path-to-icon2', label: 'Button 2' },
          // Add all buttons here
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    width: 100px; /* Adjust width as needed */
  }
  .sidebar-button {
    width: 100%;
    height: 60px; /* Adjust height as needed */
    margin-bottom: 10px;
  }
  </style>
  