import { YAPI, YErrorMsg, YLed } from 'yoctolib-es';

var led;

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('ws://127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
    }
    refresh();
}

async function refresh()
{
    let serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        let anyLed = YLed.FirstLed();
        if(anyLed) {
            let module = await anyLed.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    led = YLed.FindLed(serial+".led");
    if(await led.isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';         
    }
    setTimeout(refresh, 500);
}

window.sw = function(state)
{
    led.set_power(state ? YLed.POWER_ON : YLed.POWER_OFF);
};

startDemo();
