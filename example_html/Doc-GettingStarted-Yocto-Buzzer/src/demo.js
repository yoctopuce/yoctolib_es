import { YAPI, YErrorMsg, YBuzzer, YLed, YAnButton } from 'yoctolib-es';


async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }
    refresh();
}

async function refresh()
{

    let serial = document.getElementById('serial').value;
    if(serial == '') {
        let buzzer = YBuzzer.FirstBuzzer();
        if(buzzer) {
            let module = await buzzer.module();
            serial = await module.get_serialNumber();
        }
    }
    let buz = YBuzzer.FindBuzzer(serial + ".buzzer");
    let led1 = YLed.FindLed(serial + ".led1");
    let led2 = YLed.FindLed(serial + ".led2");
    let button1 = YAnButton.FindAnButton(serial + ".anButton1");
    let button2 = YAnButton.FindAnButton(serial + ".anButton2");


    if (await buz.isOnline()) {
        var frequency;
        var b1 = (await button1.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        var b2 = (await button2.get_isPressed() == YAnButton.ISPRESSED_TRUE);
        if (b1 || b2) {
            let led;
            if (b1) {
                led = led1;
                frequency = 1500;
            } else {
                led = led2;
                frequency = 750;
            }
            await led.set_power(YLed.POWER_ON);
            await led.set_luminosity(100);
            await led.set_blinking(YLed.BLINKING_PANIC);
            for (let i = 0; i < 5; i++) { // this can be done using sequence as well
                buz.set_frequency(frequency);
                buz.freqMove(2 * frequency, 250);
                await YAPI.Sleep(250);
            }
            await buz.set_frequency(0);
            led.set_power(YLed.POWER_OFF);
        }
    } else {
        console.log('Module not connected');
    }
    setTimeout(refresh, 500);
}

startDemo();
