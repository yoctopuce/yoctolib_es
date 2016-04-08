import { YAPI, YModule, YErrorMsg } from 'yoctolib-es';

var module;

async function startDemo()
{
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if(await YAPI.RegisterHub('ws://127.0.0.1', errmsg) != YAPI.SUCCESS) {
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
    module = YModule.FindModule(serial);
    if(await module.isOnline()) {
        document.getElementById('msg').value = '';
        document.getElementById('curName').value = await module.get_logicalName();
    } else {
        document.getElementById('msg').value = 'Module not connected, check USB cable';
    }
    setTimeout(refresh, 500);
}

export async function save()
{
    var newname = document.getElementById('newName').value;
    if (!await YAPI.CheckLogicalName(newname)) {
        alert('invalid logical name');
        return;
    }
    await module.set_logicalName(newname);
    await module.saveToFlash();
}

startDemo();
