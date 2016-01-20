import { YAPI, YErrorMsg, YAnButton } from 'yoctolib-es';

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
        let anyInput = YAnButton.FirstAnButton();
        if(anyInput) {
            let module = await anyInput.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let input1 = YAnButton.FindAnButton(serial+".anButton1");
    let input5 = YAnButton.FindAnButton(serial+".anButton5");
    if (await input1.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById("inp1-chk").checked = await input1.get_isPressed();
        document.getElementById("inp1-val").value = await input1.get_calibratedValue();
        document.getElementById("inp5-chk").checked = await input5.get_isPressed();
        document.getElementById("inp5-val").value = await input5.get_calibratedValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

startDemo();
