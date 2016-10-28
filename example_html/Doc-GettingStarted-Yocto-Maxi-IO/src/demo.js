import {YAPI, YErrorMsg, YDigitalIO} from 'yoctolib-es';

var io, outputdata;

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial =  document.getElementById('serial').value;
    if (serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YDigitalIO.FirstDigitalIO();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        }
    }

    io = YDigitalIO.FindDigitalIO(serial + '.digitalIO');
    // lets configure the channels direction
    // bits 0..3 as output
    // bits 4..7 as input
    await io.set_portDirection(0x0F);
    await io.set_portPolarity(0); // polarity set to regular
    await io.set_portOpenDrain(0); // No open drain
    outputdata = 0;
    refresh();
}

async function refresh() {
    if (await io.isOnline()) {
        document.getElementById('msg').value = '';
        outputdata = (outputdata + 1) % 16; // cycle ouput 0..15
        await io.set_portState(outputdata); // We could have used set_bitState as well
        let inputdata = await io.get_portState(); // read port values
        let line = "";  // display port value as binary
        for (let i = 0; i < 8; i++) {
            if ((inputdata & (128 >> i)) > 0) {
                line = line + '1';
            } else {
                line = line + '0';
            }
        }
        document.getElementById('state').value = line;
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 1000);
}

startDemo();
