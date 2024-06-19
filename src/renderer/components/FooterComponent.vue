<template>
    <div class="footer">
      <button class="footer-button" v-for="button in buttons" :key="button.id">
        {{ button.label }}
      </button>
      <div class="status">
        <span>Status da Máquina: {{ machineStatus }}</span>
        <span>Total Produzido: {{ totalProduced }}</span>
        <span>Qtde em Trabalho: {{ workQuantity }}</span>
      </div>
    </div>
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
  
  <style scoped>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #eee;
  }
  .footer-button {
    margin: 0 5px;
  }
  .status {
    display: flex;
    flex-direction: column;
  }
  </style>
  