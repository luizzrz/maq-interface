<template>
    <div id="app" class="p-4">
      <div class="mb-4">
        <input v-model="ip" placeholder="IP Address" class="p-2 border" />
        <input v-model.number="port" type="number" placeholder="Port" class="p-2 border ml-2" />
        <button @click="connectModbus" class="p-2 bg-blue-500 text-white ml-2">Connect</button>
      </div>
      <div v-if="connected">
        <div class="mb-4">
          <input v-model.number="readAddress" type="number" placeholder="Read Address" class="p-2 border" />
          <input v-model.number="readLength" type="number" placeholder="Length" class="p-2 border ml-2" />
          <button @click="readModbus" class="p-2 bg-green-500 text-white ml-2">Read</button>
          <div v-if="readData.length > 0" class="mt-2">
            <h2 class="text-lg">Read Data:</h2>
            <pre>{{ readData }}</pre>
          </div>
        </div>
        <div>
          <input v-model.number="writeAddress" type="number" placeholder="Write Address" class="p-2 border" />
          <input v-model.number="writeValue" type="number" placeholder="Value" class="p-2 border ml-2" />
          <button @click="writeModbus" class="p-2 bg-red-500 text-white ml-2">Write</button>
        </div>
      </div>
      <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ip: '192.168.0.1',
        port: 502,
        connected: false,
        readAddress: 0,
        readLength: 1,
        readData: [],
        writeAddress: 0,
        writeValue: 0,
        errorMessage: '',
      };
    },
    methods: {
      async connectModbus() {
        try {
          const result = await window.modbus.connect(this.ip, this.port);
          if (result.status === 'connected') {
            this.connected = true;
            this.errorMessage = '';
          } else {
            this.errorMessage = result.message;
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      async readModbus() {
        try {
          const result = await window.modbus.read(this.readAddress, this.readLength);
          if (result.status === 'success') {
            this.readData = result.data;
            this.errorMessage = '';
          } else {
            this.errorMessage = result.message;
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      async writeModbus() {
        try {
          const result = await window.modbus.write(this.writeAddress, this.writeValue);
          if (result.status === 'success') {
            this.errorMessage = '';
          } else {
            this.errorMessage = result.message;
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add any global styles here if needed */
  </style>
  