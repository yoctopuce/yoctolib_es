import { YAPI, YErrorMsg, YColorLed } from 'yoctolib-es';

var led1, led2;

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
        let anyLed = YColorLed.FirstColorLed();
        if(anyLed) {
            let module = await anyLed.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    led1 = YColorLed.FindColorLed(serial+'.colorLed1');
    led2 = YColorLed.FindColorLed(serial+'.colorLed2');

    if(await led1.isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

window.setColor = function(pos)
{
    // Change the color in two different ways
    led1.set_rgbColor(color);  // immediate switch
    led2.rgbMove(color,1000);  // smooth transition
};

startDemo();
