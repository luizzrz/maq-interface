import {contextBridge, ipcRenderer} from 'electron';

// contextBridge.exposeInMainWorld('electronAPI', {
//   sendMessage: (message: string) => ipcRenderer.send('message', message)
// })

contextBridge.exposeInMainWorld('modbus', {
  connect: (ip: string, port: number) => ipcRenderer.invoke('connect-modbus', ip, port),
  read: (address: number, length: number) => ipcRenderer.invoke('read-modbus', address, length),
  write: (address: number, value: number) => ipcRenderer.invoke('write-modbus', address, value),
});