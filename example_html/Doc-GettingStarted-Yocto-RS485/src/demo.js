import {YAPI, YErrorMsg, YSerialPort} from 'yoctolib-es';

var serialPort;
var slave;
var reg;
async function startDemo() {

    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }
    refresh();
}
async function refresh() {
    // Select specified device, or use first available one
    let serial = document.getElementById('serial').value;
    if (serial == '') {
        // by default use any connected module suitable for the demo
        let anyserial = YSerialPort.FirstSerialPort();
        if (anyserial) {
            let module = await anyserial.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    serialPort = YSerialPort.FirstSerialPort();
     if (await serialPort.isOnline()) {
        // display motor status
        document.getElementById('msg').value = '';
        document.getElementById('main').style.display = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}


function slavechanged() {
    slave = parseInt(document.getElementById('slaveinput').value);
    if (slave > 0) {
        document.getElementById('slaveinput').style.display = 'none';
        document.getElementById('slavevalue').innerHTML = slave;
        document.getElementById('regspan').style.display = '';
    }
}


async function regchanged() {
    reg = parseInt(document.getElementById('reginput').value);
    var res;
    if (reg > 0) {
        let value = await modbus_readvalue(slave, reg);
        document.getElementById('reginput').style.display = 'none';
        document.getElementById('regvalue').innerHTML = reg;
        document.getElementById('valuespan').style.display = '';
        document.getElementById('value').innerHTML = value;
    }
}



async function modbus_readvalue(slave, reg) {
    let val;
     if (reg >= 40001) {
        val = (await serialPort.modbusReadRegisters(slave, reg - 40001, 1))[0];
    } else if (reg >= 30001) {
        val = (await serialPort.modbusReadInputRegisters(slave, reg - 30001, 1))[0];
    } else if (reg >= 10001) {
        val = (await serialPort.modbusReadInputBits(slave, reg - 10001, 1))[0];
    } else {
        val = (await serialPort.modbusReadBits(slave, reg - 1, 1))[0];
    }
    console.log("Current value: " + val);
    return val;
}


window.slavechanged = slavechanged;
window.regchanged = regchanged;


startDemo();
