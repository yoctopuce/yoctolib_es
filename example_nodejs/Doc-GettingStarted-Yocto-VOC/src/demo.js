import { YAPI, YErrorMsg, YVoc } from 'yoctolib-es';

var voc;

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
        let anysensor = YVoc.FirstVoc();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    voc = YVoc.FindVoc(serial+".voc");

    refresh();
}

async function refresh()
{
    if (await voc.isOnline()) {
        console.log('VOC : '+(await voc.get_currentValue()) + ' ppm');
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
