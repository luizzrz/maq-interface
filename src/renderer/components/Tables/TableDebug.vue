<template>
  <div :class="containerClass">
    <div class="flex flex-wrap mb-4 space-x-2">
      <input v-model.number="readAddress" type="number" placeholder="Read Address" class="input border p-2 rounded" />
      <input v-model.number="readLength" type="number" placeholder="Length" class="input border p-2 rounded ml-2" />
      <button @click="readModbus" class="button bg-green-500 text-white p-2 rounded ml-2">Read</button>
      <span v-if="errorMessage" :class="messageClass" class="ml-2">{{ errorMessage }}</span>
    </div>
    <div class="flex mb-4">
      <button @click="loadJson" class="button bg-blue-500 text-white p-2 rounded ml-2">Load JSON</button>
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
    </div>
    <div class="overflow-x-auto">
      <table id="projects-table" class="min-w-full bg-white">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" :class="headerClass">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td class="border px-4 py-2">{{ project.address }}</td>
            <td class="border px-4 py-2">{{ project['function-name-group'] }}</td>
            <td class="border px-4 py-2">{{ project['data-type'] }}</td>
            <td class="border px-4 py-2">{{ project['offset-clp'] }}</td>
            <td class="border px-4 py-2">{{ project['starting-value'] }}</td>
            <td class="border px-4 py-2">{{ project['nominal-value'] }}</td>
            <td class="border px-4 py-2">
              <input 
                type="number" 
                :value="project['current-value']" 
                class="input border p-2 rounded"
                :data-index="index"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'datatables.net';
import { readModbus, writeModbus } from '../../utils/ModbusLogic';

export default {
  data() {
    return {
      readAddress: 0,
      readLength: 1,
      readData: [],
      errorMessage: '',
      projects: [],
    };
  },
  props: {
    color: {
      default: 'light',
      validator: value => ['light', 'dark'].includes(value),
    },
  },
  computed: {
    containerClass() {
      return this.color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white';
    },
    headerClass() {
      return this.color === 'light' ? 'bg-gray-200 text-gray-600 p-4' : 'bg-emerald-800 text-emerald-300 p-4';
    },
    messageClass() {
      return this.errorMessage ? 'text-red-500' : 'text-green-500';
    },
    headers() {
      return [
        'Address',
        'Function Name Group',
        'Data Type',
        'CLP Offset',
        'Value Starting',
        'Value Nominal',
        'Value Current',
      ];
    },
  },
  methods: {
    async readModbus() {
      const result = await readModbus(this.readAddress, this.readLength);
      if (result.status === 'success') {
        this.readData = result.data;
        this.updateCurrentValues();
        this.errorMessage = '';
      } else {
        this.errorMessage = result.message;
      }
    },
    async writeModbus(address, value) {
      const result = await writeModbus(address, value);
      if (result.status === 'success') {
        this.errorMessage = '';
      } else {
        this.errorMessage = result.message;
      }
    },
    updateCurrentValues() {
      this.projects = this.projects.map(project => {
        const addressOffset = project.address - this.readAddress;
        if (addressOffset >= 0 && addressOffset < this.readData.length) {
          return { ...project, 'current-value': this.readData[addressOffset] };
        }
        return project;
      });
      this.updateDataTable();
    },
    loadJson() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const data = JSON.parse(e.target.result);
            this.projects = data;
            this.updateDataTable();
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
        reader.readAsText(file);
      }
    },
    updateDataTable() {
      if ($.fn.dataTable.isDataTable('#projects-table')) {
        $('#projects-table').DataTable().clear().rows.add(this.projects).draw();
      } else {
        $('#projects-table').DataTable({
          data: this.projects,
          columns: [
            { title: 'Address', data: 'address' },
            { title: 'Function Name Group', data: 'function-name-group' },
            { title: 'Data Type', data: 'data-type' },
            { title: 'CLP Offset', data: 'offset-clp' },
            { title: 'Value Starting', data: 'starting-value' },
            { title: 'Value Nominal', data: 'nominal-value' },
            { 
              title: 'Value Current', 
              data: 'current-value',
              render: (data, type, row, meta) => {
                return `<input type="number" value="${data}" class="input border p-2 rounded" data-index="${meta.row}">`;
              }
            }
          ],
          createdRow: (row, data, dataIndex) => {
            $(row).find('input').on('input', (event) => {
              const value = event.target.value;
              this.updateValue(dataIndex, value);
            });
          }
        });
      }
    },
    updateValue(index, value) {
      const project = this.projects[index];
      project['current-value'] = value;
      this.writeModbus(project.address, value);
    },
  },
  mounted() {
    this.updateDataTable();
  },
  watch: {
    projects() {
      this.updateDataTable();
    },
  },
};
</script>

<style scoped>
.ml-2 {
  margin-left: 0.5rem;
}
</style>
