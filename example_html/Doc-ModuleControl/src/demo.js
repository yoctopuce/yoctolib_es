import { YAPI, YModule, YErrorMsg } from 'yoctolib-es';

var module;

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
        module = YModule.FirstModule();
        if(module) {
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }
    let html = '';
    module = YModule.FindModule(serial);
    if(await module.isOnline()) {
        document.getElementById('msg').value = '';
        html += 'serial:       '+await module.get_serialNumber()+'<br>';
        html += 'logical name: '+await module.get_logicalName()+'<br>';
        html += 'luminosity:   '+await module.get_luminosity()+'%'+'<br>';
        html += 'beacon:       '+(await module.get_beacon()==YModule.BEACON_ON?'ON':'OFF')+'<br>';
        html += 'upTime:       '+parseInt(await module.get_upTime()/1000)+' sec'+'<br>';
        html += 'USB current:  '+await module.get_usbCurrent()+' mA'+'<br>';
        html += 'logs:'+'<br>';
        html += await module.get_lastLogs()+'<br>';
    } else {
        document.getElementById('msg').value = 'Module not connected, check USB cable';
    }
    document.getElementById('data').innerHTML = html;
    setTimeout(refresh, 500);
}

export function sw(state)
{
    module.set_beacon(state ? YModule.BEACON_ON : YModule.BEACON_OFF);
}

startDemo();
