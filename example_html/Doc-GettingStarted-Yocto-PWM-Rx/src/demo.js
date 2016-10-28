import { YAPI, YErrorMsg, YPwmInput } from 'yoctolib-es';

var pwm1, pwm2;
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
        let anyPwm = YPwmInput.FirstPwmInput();
        if(anyPwm) {
            let module = await anyPwm.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    pwm1  = YPwmInput.FindPwmInput(serial + ".pwmInput1");
    pwm2  = YPwmInput.FindPwmInput(serial + ".pwmInput2");

    if (await pwm1.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById('pwm1-state').value = (await pwm1.get_frequency()) + "Hz "
                         + (await pwm1.get_dutyCycle()) + "% "
                         + (await pwm1.get_pulseCounter()) +" pulse edges ";
        document.getElementById('pwm2-state').value = (await pwm2.get_frequency()) + "Hz "
                         + (await pwm2.get_dutyCycle()) + "% "
                         + (await pwm2.get_pulseCounter()) + " pulse edges ";
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
