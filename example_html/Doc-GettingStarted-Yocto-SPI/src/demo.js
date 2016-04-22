import { YAPI, YErrorMsg, YSpiPort } from 'yoctolib-es';

var spiPort;

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
        let anySpi = YSpiPort.FirstSpiPort();
        if(anySpi) {
            let module = await anySpi.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    spiPort = YSpiPort.FindSpiPort(serial+'.spiPort');
    if(await spiPort.isOnline()) {
        document.getElementById('msg').value = '';
        await spiPort.set_spiMode("250000,2,msb");
        await spiPort.set_ssPolarity(YSpiPort.SSPOLARITY_ACTIVE_LOW);
        await spiPort.set_protocol("Frame:5ms");
        await spiPort.reset();
        await spiPort.writeHex('0c01'); // Exit from shutdown state
        await spiPort.writeHex('09ff'); // Enable BCD for all digits
        await spiPort.writeHex('0b07'); // Enable digits 0-7 (=8 in total)
        await spiPort.writeHex('0a0a'); // Set medium brightness
    } else {
        document.getElementById('msg').value = 'Module not connected';
        setTimeout(refresh, 500);
    }
}

window.updateValue = function(value)
{
    value = parseInt(value);
    for(let i = 1; i <= 8; i++) {
        let digit = value % 10;
        spiPort.writeArray([i, digit]);
        value = parseInt(value / 10);
    }
};

startDemo();
