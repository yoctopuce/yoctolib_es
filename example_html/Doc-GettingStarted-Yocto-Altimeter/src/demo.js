import { YAPI, YErrorMsg, YAltitude, YTemperature, YPressure } from 'yoctolib-es';

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
        let anysensor = YAltitude.FirstAltitude();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let alti = YAltitude.FindAltitude(serial+".altitude");
    let temp = YTemperature.FindTemperature(serial+".temperature");
    let pres = YPressure.FindPressure(serial+".pressure");

    if (await alti.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("qnh").value = await alti.get_qnh();
        document.getElementById("alti").value = await alti.get_currentValue();
        document.getElementById("temp").value = await temp.get_currentValue();
        document.getElementById("pres").value = await pres.get_currentValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
