import {YAPI, YErrorMsg, YMotor, YCurrent, YVoltage, YTemperature} from 'yoctolib-es';

var motor, current, voltage, temperature;

async function startDemo() {
    await YAPI.LogUnhandledPromiseRejections();
    await YAPI.DisableExceptions();

    // Setup the API to use the VirtualHub on local machine
    let errmsg = new YErrorMsg();
    if (await YAPI.RegisterHub('127.0.0.1', errmsg) != YAPI.SUCCESS) {
        alert('Cannot contact VirtualHub on 127.0.0.1: ' + errmsg.msg);
        return;
    }
    refresh();
}

async function refresh() {
    // Select specified device, or use first available one
    let serial = document.getElementById('serial').value;
    if(serial == '') {
        // by default use any connected module suitable for the demo
        let anyMotor = YMotor.FirstMotor();
        if (anyMotor) {
            let module = await anyMotor.module();
            serial = await module.get_serialNumber();
            document.getElementById('serial').value = serial;
        }
    }

    motor = YMotor.FindMotor(serial + ".motor");
    current = YCurrent.FindCurrent(serial + ".current");
    voltage = YVoltage.FindVoltage(serial + ".voltage");
    temperature = YTemperature.FindTemperature(serial + ".temperature");
    //power is a integer between -100 and 100%

    // if motor is in error state, reset it.
    if (await motor.get_motorStatus() >= YMotor.MOTORSTATUS_LOVOLT) {
        await motor.resetStatus();
    }


    if (await motor.isOnline()) {
        // display motor status
        document.getElementById('msg').value = '';
        document.getElementById("status").value = await motor.get_advertisedValue();
        document.getElementById("current").value = await current.get_currentValue();
        document.getElementById("voltage").value = await voltage.get_currentValue();
        document.getElementById("temperature").value = await temperature.get_currentValue();
    } else {
        document.getElementById('msg').value = 'Module not connected';
    }
    setTimeout(refresh, 500);
}

window.SetPower = function(power)
{
    motor.drivingForceMove(power, 2000);  // ramp up to power in 2 seconds
};


startDemo();
