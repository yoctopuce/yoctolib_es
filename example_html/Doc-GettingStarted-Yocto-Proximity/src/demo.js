import {YAPI, YErrorMsg, YProximity, YLightSensor} from 'yoctolib-es';

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
        let anysensor = YProximity.FirstProximity();
        if (anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let proximity = YProximity.FindProximity(serial + ".proximity1");
    let amb_light = YLightSensor.FindLightSensor(serial + ".lightSensor1");
    let ir_light = YLightSensor.FindLightSensor(serial + ".lightSensor2");


    if (await proximity.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("proximity").value = await proximity.get_currentValue();
        document.getElementById("am_light").value = await amb_light.get_currentValue();
        document.getElementById("ir_light").value = await ir_light.get_currentValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
