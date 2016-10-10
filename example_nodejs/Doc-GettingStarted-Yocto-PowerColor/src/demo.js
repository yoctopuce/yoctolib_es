import { YAPI, YErrorMsg, YColorLed } from 'yoctolib-es';

async function startDemo(args)
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        console.log('Cannot contact VirtualHub on 127.0.0.1: '+errmsg.msg);
        return;
    }

    // Select the relay to use
    let target;
    if(args[0] == "any") {
        let anyLed = YColorLed.FirstColorLed();
        if (anyLed == null) {
            console.log("No module connected (check USB cable)\n");
            process.exit(1);
        }
        let module = await anyLed.get_module();
        target = await module.get_serialNumber();
    } else {
        target = args[0];
    }

    let led1 = YColorLed.FindColorLed(target+'.colorLed1');

    let color;
    if (args[1] == "red")
        color = 0xFF0000;
    else if (args[1] == "green")
        color = 0x00FF00;
    else if (args[1] == "blue")
        color = 0x0000FF;
    else
        color = parseInt(args[1],16);

    if(await led1.isOnline()) {
        // Change the color in two different ways
        led1.rgbMove(color,1000);  // smooth transition
    } else {
        console.log("Module not connected (check identification and USB cable)\n");
    }

    await YAPI.FreeAPI();
}

if(process.argv.length < 5) {
    console.log("usage: jspm run src/demo.js <serial_number> [ color | rgb ]");
    console.log("       jspm run src/demo.js <logical_name> [ color | rgb ]");
    console.log("       jspm run src/demo.js any [ color | rgb ]       (use any discovered device)");
    console.log("Eg.");
    console.log("   jspm run src/demo.js any FF1493 ");
    console.log("   jspm run src/demo.js YRGBLED1-123456 red");
} else {
    startDemo(process.argv.slice(process.argv.length - 2));
}

