import {YAPI, YErrorMsg, YRangeFinder, YLightSensor, YTemperature} from 'yoctolib-es';

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
    }
    await refresh();
}

async function refresh() {
    let serial = document.getElementById('serial').value;
    if (serial == '') {
        // by default use any connected module suitable for the demo
        let anysensor = YRangeFinder.FirstRangeFinder();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let rf = YRangeFinder.FindRangeFinder(serial + ".rangeFinder1");
    let ir = YLightSensor.FindLightSensor(serial + ".lightSensor1");
    let tmp = YTemperature.FindTemperature(serial + ".temperature1");


    if (await rf.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("rf").value = await rf.get_currentValue();
        document.getElementById("ir").value = await ir.get_currentValue();
        document.getElementById("tmp").value = await tmp.get_currentValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
