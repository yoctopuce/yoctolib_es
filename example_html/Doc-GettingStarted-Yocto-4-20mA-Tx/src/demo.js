import { YAPI, YErrorMsg, YCurrentLoopOutput } from 'yoctolib-es';

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
    let loop, serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        loop = YCurrentLoopOutput.FirstCurrentLoopOutput();
        if(loop) {
            let module = await loop.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    loop = YCurrentLoopOutput.FindCurrentLoopOutput(serial + ".currentLoopOutput");

    if (await loop.isOnline()) {
        document.getElementById('msg').innerHTML = '';
        var pwrState = '';
        switch (await loop.get_loopPower()) {
            case YCurrentLoopOutput.LOOPPOWER_POWEROK:
                pwrState = 'Loop is powered';
                break;
            case YCurrentLoopOutput.LOOPPOWER_LOWPWR :
                pwrState = 'Insufficient loop Voltage';
                break;
            default :
                pwrState = 'Loop is not powered';
                break;
        }
        document.getElementById('loopPwr').innerHTML=pwrState;
        var input = document.getElementById('current');
        if (document.activeElement == input) {
            await loop.set_current(parseFloat(input.value));
        } else {
            input.value = await loop.get_current();
        }
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
