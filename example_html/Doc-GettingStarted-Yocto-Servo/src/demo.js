import { YAPI, YErrorMsg, YServo } from 'yoctolib-es';

var s1, s5;

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
        let anyServo = YServo.FirstServo();
        if(anyServo) {
            let module = await anyServo.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    s1 = YServo.FindServo(serial+'.servo1');
    s5 = YServo.FindServo(serial+'.servo5');

    if(await s1.isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

window.moveTo = function(pos)
{
    // Show two different types of move
    s1.set_position(pos); // move as fast as possible
    s5.move(pos,3000);    // move in 3 seconds
};

startDemo();
