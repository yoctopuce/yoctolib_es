import { YAPI, YErrorMsg, YRelay } from 'yoctolib-es';

var relays = [];

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
        let anyRelay = YRelay.FirstRelay();
        if(anyRelay) {
            let module = await anyRelay.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    for(let i = 1; i <= 2; i++) {
        relays[i] = YRelay.FindRelay(serial+".relay"+i);
    }
    if(await relays[1].isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';         
    }
    setTimeout(refresh, 500);
}

window.sw = function(index,state)
{
    relays[index].set_output(state ? YRelay.OUTPUT_ON : YRelay.OUTPUT_OFF);
};

startDemo();
