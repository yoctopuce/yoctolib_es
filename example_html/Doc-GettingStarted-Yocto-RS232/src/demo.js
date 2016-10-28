import {YAPI, YErrorMsg, YSerialPort} from 'yoctolib-es';

var serialPort;

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }


    let serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        let anySerial = YSerialPort.FirstSerialPort();
        if(anySerial) {
            let module = await anySerial.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    serialPort = YSerialPort.FindSerialPort(serial + ".serialPort");

    await serialPort.set_serialMode("9600,8N1");
    await serialPort.set_protocol("Line");
    await serialPort.reset();

    refresh();
}

async function refresh()
{

    var line;
    if (await serialPort.isOnline()) {
        line = await serialPort.readLine();
        document.getElementById('returned_value').value +=line;
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

window.send_data = function()
{
    var tosend = document.getElementById('line_input').value;
    serialPort.writeLine(tosend);
};


startDemo();

