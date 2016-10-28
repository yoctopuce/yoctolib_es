import { YAPI, YErrorMsg, YPwmInput } from 'yoctolib-es';

var pwm1, pwm2;

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select specified device, or use first available one
    let serial = process.argv[process.argv.length-1];
    if(serial[8] != '-') {
        // by default use any connected module suitable for the demo
        let anyPwm = YPwmInput.FirstPwmInput();
        if(anyPwm) {
            let module = await anyPwm.module();
            serial = await module.get_serialNumber();
        } else {
            console.log('No matching sensor connected, check cable !');
            return;
        }
    }
    console.log('Using device '+serial);
    pwm1  = YPwmInput.FindPwmInput(serial + ".pwmInput1");
    pwm2  = YPwmInput.FindPwmInput(serial + ".pwmInput2");

    refresh();
}

async function refresh()
{
    if (await pwm1.isOnline()) {
        console.log("PWM1 : " + (await pwm1.get_frequency()) + "Hz "
                         + (await pwm1.get_dutyCycle()) + "% "
                         + (await pwm1.get_pulseCounter()) +" pulse edges ");
        console.log("PWM2 : " + (await pwm2.get_frequency()) + "Hz "
                         + (await pwm2.get_dutyCycle()) + "% "
                         + (await pwm2.get_pulseCounter()) + " pulse edges ");
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
