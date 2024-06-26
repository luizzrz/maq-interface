<template>
  <div :class="containerClass">
    <div class="controls">
      <input v-model="ip" placeholder="IP Address" class="input" />
      <input v-model.number="port" type="number" placeholder="Port" class="input ml-2" />
      <button @click="connectModbus" class="button bg-blue-500 ml-2">Connect</button>
      <span v-if="connectionMessage" :class="messageClass" class="ml-2">{{ connectionMessage }}</span>
    </div>
    <div v-if="connected" class="controls">
      <input v-model.number="readAddress" type="number" placeholder="Read Address" class="input" />
      <input v-model.number="readLength" type="number" placeholder="Length" class="input ml-2" />
      <button @click="readModbus" class="button bg-green-500 ml-2">Read</button>
      <span v-if="errorMessage" :class="messageClass" class="ml-2">{{ errorMessage }}</span>
    </div>
    <div class="controls">
      <button @click="loadJson" class="button bg-blue-500 ml-2">Load JSON</button>
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
    </div>
    <div class="table-container">
      <table id="projects-table" class="display w-full">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" :class="headerClass">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.address }}</td>
            <td>{{ project['function-name-group'] }}</td>
            <td>{{ project['data-type'] }}</td>
            <td>{{ project['offset-clp'] }}</td>
            <td>{{ project['starting-value'] }}</td>
            <td>{{ project['nominal-value'] }}</td>
            <td>
              <input 
                type="number" 
                :value="project['current-value']" 
                class="input"
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
import { connectModbus, readModbus, writeModbus } from '../../utils/ModbusLogic';

export default {
  data() {
    return {
      ip: '192.168.0.43',
      port: 502,
      connected: false,
      readAddress: 0,
      readLength: 1,
      readData: [],
      errorMessage: '',
      connectionMessage: '',
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
      return this.color === 'light' ? 'bg-blueGray-50 text-blueGray-500' : 'bg-emerald-800 text-emerald-300';
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
    async connectModbus() {
      const result = await connectModbus(this.ip, this.port);
      this.connectionMessage = result.message;
      this.errorMessage = result.message;
      this.connected = result.status === 'connected';
    },
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
                return `<input type="number" value="${data}" class="input" data-index="${meta.row}">`;
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
.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  color: white;
}

.controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.table-container {
  overflow-x: auto;
}

.display {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
}

.table-cell {
  padding: 0.75rem;
}
</style>
