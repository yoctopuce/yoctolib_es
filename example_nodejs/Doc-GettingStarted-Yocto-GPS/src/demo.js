import { YAPI, YErrorMsg, YGps } from 'yoctolib-es';

var gps;

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length-1];
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anysensor = YGps.FirstGps();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    gps = YGps.FindGps(serial+".gps");

    refresh();
}

async function refresh()
{
    if (!await gps.isOnline()) {
        console.log('Module not connected');
    } else if (await gps.get_isFixed() != YGps.ISFIXED_TRUE) {
        console.log('fixing...');
    } else {
        console.log('Position : '+(await gps.get_latitude()) + ' ' + (await gps.get_longitude()));
    }
    setTimeout(refresh, 500);
}

startDemo();
