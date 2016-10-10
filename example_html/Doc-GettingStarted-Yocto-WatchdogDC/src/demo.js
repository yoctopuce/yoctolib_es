import { YAPI, YErrorMsg, YWatchdog } from 'yoctolib-es';

var watchdog;

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
        let anyWatchdog = YWatchdog.FirstWatchdog();
        if(anyWatchdog) {
            let module = await anyWatchdog.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    watchdog = YWatchdog.FindWatchdog(serial+".watchdog1");
    if(await watchdog.isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';         
    }
    setTimeout(refresh, 500);
}

window.sw = function(state)
{
    if(state == 'on') watchdog.set_running(YWatchdog.RUNNING_ON);
    if(state == 'off') watchdog.set_running(YWatchdog.RUNNING_OFF);
    if(state == 'reset') watchdog.resetWatchdog();
};

startDemo();
