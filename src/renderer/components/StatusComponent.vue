<template>
    <div class="status">
      <div class="status-item" v-for="status in statuses" :key="status.id">
        <div :class="['status-indicator', status.color]"></div>
        <span>{{ status.label }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        statuses: [
          { id: 1, label: 'PLC', color: 'green' },
          { id: 2, label: 'Err', color: 'red' },
          { id: 3, label: '12 - 0', color: 'green' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .status {
    display: flex;
    flex-direction: column;
  }
  .status-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .status-indicator {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .status-indicator.green {
    background-color: green;
  }
  .status-indicator.red {
    background-color: red;
  }
  </style>
  