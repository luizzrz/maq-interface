<template>
  <div class="flex flex-col bg-gray-800 text-white h-full">
    <!-- Status Indicators -->
    <div class="p-4 flex flex-col space-y-2">
      <div class="flex items-center space-x-2">
        <div class="w-5 h-5 bg-green-500 rounded-full"></div>
        <span>PLC</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-5 h-5 bg-red-500 rounded-full"></div>
        <span>Err</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-5 h-5 bg-green-500 rounded-full"></div>
        <span>72 - 0</span>
      </div>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col space-y-2 p-2">
      <button class="bg-white p-2 flex justify-center items-center rounded-md">
        <img src="path-to-icon1" alt="Button 1" class="w-8 h-8"/>
      </button>
      <button class="bg-white p-2 flex justify-center items-center rounded-md">
        <img src="path-to-icon2" alt="Button 2" class="w-8 h-8"/>
      </button>
      <button class="bg-white p-2 flex justify-center items-center rounded-md">
        <img src="path-to-icon3" alt="Button 3" class="w-8 h-8"/>
      </button>
      <button class="bg-white p-2 flex justify-center items-center rounded-md">
        <img src="path-to-icon4" alt="Button 4" class="w-8 h-8"/>
      </button>
      <button class="bg-white p-2 flex justify-center items-center rounded-md">
        <img src="path-to-icon5" alt="Button 5" class="w-8 h-8"/>
      </button>
    </div>

    <!-- Footer Button -->
    <div class="mt-auto p-2">
      <button class="bg-gray-200 p-2 flex justify-center items-center w-full rounded-md">
        <img src="path-to-monitor-icon" alt="Monitor" class="w-8 h-8"/>
        <span class="ml-2">Monitor</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Add paths to your icons
      buttons: [
        { id: 1, icon: 'path-to-icon1', label: 'Button 1' },
        { id: 2, icon: 'path-to-icon2', label: 'Button 2' },
        { id: 3, icon: 'path-to-icon3', label: 'Button 3' },
        { id: 4, icon: 'path-to-icon4', label: 'Button 4' },
        { id: 5, icon: 'path-to-icon5', label: 'Button 5' },
      ],
    };
  },
};
</script>

<style scoped>
/* You can add scoped styles here if needed */
</style>
