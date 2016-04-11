import { YAPI, YErrorMsg, YCurrent } from 'yoctolib-es';

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
        let anysensor = YCurrent.FirstCurrent();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let dcAmp = YCurrent.FindCurrent(serial+".current1");
    let acAmp = YCurrent.FindCurrent(serial+".current2");

    if (await dcAmp.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("dcAmp").value = (await dcAmp.get_currentValue()) + (await dcAmp.get_unit());
        document.getElementById("acAmp").value = (await acAmp.get_currentValue()) + (await acAmp.get_unit());
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
