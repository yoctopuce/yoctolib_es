import { YAPI, YErrorMsg, YPwmOutput } from 'yoctolib-es';

var pwmoutput1, pwmoutput2;

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
        let anyPwm = YPwmOutput.FirstPwmOutput();
        if(anyPwm) {
            let module = await anyPwm.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    pwmoutput1 = YPwmOutput.FindPwmOutput(serial+'.pwmOutput1');
    await pwmoutput1.set_frequency(1000);
    await pwmoutput1.set_enabled(Y_ENABLED_TRUE);

    pwmoutput2 = YPwmOutput.FindPwmOutput(serial+'.pwmOutput2');
    await pwmoutput2.set_frequency(1000);
    await pwmoutput2.set_enabled(Y_ENABLED_TRUE);

    if(await pwmoutput1.isOnline()) {
        document.getElementById('msg').value = '';
    } else {
        document.getElementById('msg').value = 'Module not connected';
        setTimeout(refresh, 500);
    }
}

window.updateDutyCycle = function(dutyCycle)
{
    pwmoutput1.set_dutyCycle(dutyCycle);      // immediate change
    pwmoutput2.dutyCycleMove(dutyCycle,3000); // smooth change
};

startDemo();
