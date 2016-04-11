import { YAPI, YErrorMsg, YGenericSensor } from 'yoctolib-es';

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        let anysensor = YGenericSensor.FirstGenericSensor();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let sensor1  = YGenericSensor.FindGenericSensor(serial+".genericSensor1");

    if (await sensor1.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("sensor-val1").value = (await sensor1.get_currentValue()) + (await sensor1.get_unit());
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
