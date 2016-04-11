import { YAPI, YErrorMsg, YVoltage } from 'yoctolib-es';

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
        let anysensor = YVoltage.FirstVoltage();
        if(anysensor) {
            let module = await anysensor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let dcVolt = YVoltage.FindVoltage(serial+".voltage1");
    let acVolt = YVoltage.FindVoltage(serial+".voltage2");

    if (await dcVolt.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("dcVolt").value = (await dcVolt.get_currentValue()) + (await dcVolt.get_unit());
        document.getElementById("acVolt").value = (await acVolt.get_currentValue()) + (await acVolt.get_unit());
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
