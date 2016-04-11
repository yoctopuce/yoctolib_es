import { YAPI, YErrorMsg, YGps } from 'yoctolib-es';

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
        let anysensor = YGps.FirstGps();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let gps = YGps.FindGps(serial+".gps");

    if (await gps.isOnline()) {
        document.getElementById('msg').value = '';
        if (await gps.get_isFixed() != YGps.ISFIXED_TRUE) {
            document.getElementById("gps").value = 'fixing...';
        } else {
            document.getElementById("gps").value = (await gps.get_latitude()) + ' ' + (await gps.get_longitude());
        }
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
