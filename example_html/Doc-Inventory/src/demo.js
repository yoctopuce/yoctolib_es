import { YAPI, YModule, YErrorMsg } from 'yoctolib-es';

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
    let errmsg = new YErrorMsg();
    await YAPI.UpdateDeviceList(errmsg);

    let html = '';
    let module = YModule.FirstModule();
    while(module) {
        html += await module.get_serialNumber();
        html += '(' + (await module.get_productName()) + ')<br>';
        module = module.nextModule();
    }
    document.getElementById('list').innerHTML = html;
    setTimeout(refresh, 500);
}

startDemo();
