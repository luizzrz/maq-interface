<template>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { id: 1, label: 'Start' },
          { id: 2, label: 'Manual' },
          // Add other buttons here
        ],
        machineStatus: 'Manual',
        totalProduced: 0,
        workQuantity: 0,
      };
    },
  };
  </script>
