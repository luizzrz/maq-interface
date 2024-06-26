import {app, BrowserWindow, ipcMain, session} from 'electron';
import {join} from 'path';
const ModbusRTU = require('modbus-serial');

const client = new ModbusRTU();

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1320,
    height: 700,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools({ mode: 'detach' }); // Open the DevTools in a separate window

  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

// ipcMain.on('message', (event, message) => {
//   console.log(message);
// })

// Handle Modbus connection
ipcMain.handle('connect-modbus', async (event, ip: string, port: number) => {
  try {
    await client.connectTCP(ip, { port: port });
    client.setID(1);
    return { status: 'connected' };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    } else {
      return { status: 'error', message: 'Unknown error occurred' };
    }
  }
});

// Handle Modbus read
ipcMain.handle('read-modbus', async (event, address: number, length: number) => {
  try {
    const data = await client.readHoldingRegisters(address, length);
    console.log(address, length)
    return { status: 'success', data: data.data };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    } else {
      return { status: 'error', message: 'Unknown error occurred' };
    }
  }
});

// Handle Modbus write
ipcMain.handle('write-modbus', async (event, address: number, value: number) => {
  try {
    console.log(address, value);
    await client.writeRegister(address, value);
    return { status: 'success' };
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error.message };
    } else {
      return { status: 'error', message: 'Unknown error occurred' };
    }
  }
});