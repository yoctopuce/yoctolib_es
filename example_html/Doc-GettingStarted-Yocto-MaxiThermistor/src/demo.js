import { YAPI, YErrorMsg, YTemperature } from 'yoctolib-es';

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
        let anysensor = YTemperature.FirstTemperature();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let temp1 = YTemperature.FindTemperature(serial+".temperature1");
    let temp6 = YTemperature.FindTemperature(serial+".temperature6");

    if (await temp1.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("temp1").value = (await temp1.get_currentValue()) + (await temp1.get_unit());
        document.getElementById("temp6").value = (await temp6.get_currentValue()) + (await temp6.get_unit());
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
