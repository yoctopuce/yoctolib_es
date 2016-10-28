import {YAPI, YErrorMsg, YDisplay, YDisplayLayer} from 'yoctolib-es';

var disp, l1;
var h, w, y, x, vx, vy;


async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
    }

    // Select specified device, or use first available one
    let serial = document.getElementById('serial').value;
    if (serial == '') {
        // by default use any connected module suitable for the demo
        let anydiplay = YDisplay.FirstDisplay();
        if (anydiplay) {
            let module = await anydiplay.module();
            serial = await module.get_serialNumber();
                 document.getElementById('serial').value = serial;
        }
    }
    disp = YDisplay.FindDisplay(serial + ".display");

    //clean up
    await disp.resetAll();

    // retreive the display size
    w = await disp.get_displayWidth();
    h = await disp.get_displayHeight();

    // reteive the first layer
    let l0 = await disp.get_displayLayer(0);
    // display a text in the middle of the screen
    await l0.drawText(w / 2, h / 2, l0.ALIGN_CENTER, "Hello world!");

    // visualize each corner
    await l0.moveTo(0, 5);
    await l0.lineTo(0, 0);
    await l0.lineTo(5, 0);
    await l0.moveTo(0, h - 6);
    await l0.lineTo(0, h - 1);
    await l0.lineTo(5, h - 1);
    await l0.moveTo(w - 1, h - 6);
    await l0.lineTo(w - 1, h - 1);
    await l0.lineTo(w - 6, h - 1);
    await l0.moveTo(w - 1, 5);
    await l0.lineTo(w - 1, 0);
    await l0.lineTo(w - 6, 0);

    // draw a circle in the top left corner of layer 1
    l1 = await disp.get_displayLayer(1);
    await l1.clear();
    await l1.drawCircle(h / 8, h / 8, h / 8);

    // and animate the layer
    x = 0;
    y = 0;
    vx = 1;
    vy = 1;
    refresh();
}

async function refresh() {
    if (await disp.isOnline()) {
        x += vx;
        y += vy;
        if ((x < 0) || (x > w - (h / 4))) vx = -vx;
        if ((y < 0) || (y > h - (h / 4))) vy = -vy;
        await l1.setLayerPosition(x, y, 0);
    } else {
        document.getElementById('msg').value ='Module not connected';
    }
    setTimeout(refresh, 5);
}

startDemo();
