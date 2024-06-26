async function connectModbus(ip, port) {
  try {
    const result = await window.modbus.connect(ip, port);
    return result;
  } catch (error) {
    return { status: 'error', message: error.message || 'Unknown error occurred' };
  }
}

async function readModbus(address, length) {
  try {
    const result = await window.modbus.read(address, length);
    return result;
  } catch (error) {
    return { status: 'error', message: error.message || 'Unknown error occurred' };
  }
}

async function writeModbus(address, value) {
  try {
    const result = await window.modbus.write(address, value);
    return result;
  } catch (error) {
    return { status: 'error', message: error.message || 'Unknown error occurred' };
  }
}

export { connectModbus, readModbus, writeModbus };
