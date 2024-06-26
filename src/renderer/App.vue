<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { connectModbus } from './utils/ModbusLogic';

export default {
  data() {
    return {
      ip: '192.168.0.43',
      port: 502,
      connectionMessage: '',
      connected: false,
    };
  },
  methods: {
    async connectModbus() {
      const result = await connectModbus(this.ip, this.port);
      this.connectionMessage = result.message;
      this.connected = result.status === 'connected';
    },
  },
  mounted() {
    this.connectModbus();
  },
};
</script>

<style>
/* Add any global styles here */
</style>
