import { YAPI, YErrorMsg, YTilt, YCompass, YGyro, YAccelerometer } from 'yoctolib-es';

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
        let anysensor = YTilt.FirstTilt();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let tilt1         = yFindTilt(serial+".tilt1");
    let tilt2         = yFindTilt(serial+".tilt2");
    let compass       = yFindCompass(serial+".compass");
    let gyro          = yFindGyro(serial+".gyro");
    let accelerometer = yFindAccelerometer(serial+".accelerometer");
    if (await tilt1.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("tilt1-val").value    = await tilt1.get_currentValue();
        document.getElementById("tilt2-val").value    = await tilt2.get_currentValue();
        document.getElementById("compass-val").value  = await compass.get_currentValue();
        document.getElementById("gyro-val").value     = await gyro.get_currentValue();
        document.getElementById("accelerometer-val").value = await accelerometer.get_currentValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
