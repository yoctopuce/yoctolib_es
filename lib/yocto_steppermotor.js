/*********************************************************************
 *
 * $Id: pic24config.php 26780 2017-03-16 14:02:09Z mvuilleu $
 *
 * Implements the high-level API for StepperMotor functions
 *
 * - - - - - - - - - License information: - - - - - - - - - 
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate this
 *  file into your software for the sole purpose of interfacing
 *  with Yoctopuce products.
 *
 *  You may reproduce and distribute copies of this file in
 *  source or object form, as long as the sole purpose of this
 *  code is to interface with Yoctopuce products. You must retain
 *  this notice in the distributed source file.
 *
 *  You should refer to Yoctopuce General Terms and Conditions
 *  for additional information regarding your rights and
 *  obligations.
 *
 *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED 'AS IS' WITHOUT
 *  WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING 
 *  WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY, FITNESS
 *  FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO
 *  EVENT SHALL LICENSOR BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
 *  INDIRECT OR CONSEQUENTIAL DAMAGES, LOST PROFITS OR LOST DATA,
 *  COST OF PROCUREMENT OF SUBSTITUTE GOODS, TECHNOLOGY OR
 *  SERVICES, ANY CLAIMS BY THIRD PARTIES (INCLUDING BUT NOT
 *  LIMITED TO ANY DEFENSE THEREOF), ANY CLAIMS FOR INDEMNITY OR
 *  CONTRIBUTION, OR OTHER SIMILAR COSTS, WHETHER ASSERTED ON THE
 *  BASIS OF CONTRACT, TORT (INCLUDING NEGLIGENCE), BREACH OF
 *  WARRANTY, OR OTHERWISE.
 *
 *********************************************************************/

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YStepperMotorProxy = exports.YStepperMotor = exports.Y_COMMAND_INVALID = exports.Y_AUXSIGNAL_INVALID = exports.Y_AUXMODE_INVALID = exports.Y_ALERTMODE_INVALID = exports.Y_TCURRRUN_INVALID = exports.Y_TCURRSTOP_INVALID = exports.Y_OVERCURRENT_INVALID = exports.Y_MAXSPEED_INVALID = exports.Y_MAXACCEL_INVALID = exports.Y_PULLINSPEED_INVALID = exports.Y_SPEED_INVALID = exports.Y_STEPPOS_INVALID = exports.Y_DIAGS_INVALID = exports.Y_STEPPING_INVALID = exports.Y_STEPPING_FULLSTEP = exports.Y_STEPPING_HALFSTEP = exports.Y_STEPPING_MICROSTEP4 = exports.Y_STEPPING_MICROSTEP8 = exports.Y_STEPPING_MICROSTEP16 = exports.Y_MOTORSTATE_INVALID = exports.Y_MOTORSTATE_BATCH = exports.Y_MOTORSTATE_RUN = exports.Y_MOTORSTATE_STOP = exports.Y_MOTORSTATE_HI_Z = exports.Y_MOTORSTATE_ALERT = exports.Y_MOTORSTATE_ABSENT = undefined;
exports.yFindStepperMotor = yFindStepperMotor;
exports.yFirstStepperMotor = yFirstStepperMotor;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YStepperMotor return codes)
//--- (end of YStepperMotor return codes)
//--- (YStepperMotor definitions)
var Y_MOTORSTATE_ABSENT = exports.Y_MOTORSTATE_ABSENT = 0;
var Y_MOTORSTATE_ALERT = exports.Y_MOTORSTATE_ALERT = 1;
var Y_MOTORSTATE_HI_Z = exports.Y_MOTORSTATE_HI_Z = 2;
var Y_MOTORSTATE_STOP = exports.Y_MOTORSTATE_STOP = 3;
var Y_MOTORSTATE_RUN = exports.Y_MOTORSTATE_RUN = 4;
var Y_MOTORSTATE_BATCH = exports.Y_MOTORSTATE_BATCH = 5;
var Y_MOTORSTATE_INVALID = exports.Y_MOTORSTATE_INVALID = -1;
var Y_STEPPING_MICROSTEP16 = exports.Y_STEPPING_MICROSTEP16 = 0;
var Y_STEPPING_MICROSTEP8 = exports.Y_STEPPING_MICROSTEP8 = 1;
var Y_STEPPING_MICROSTEP4 = exports.Y_STEPPING_MICROSTEP4 = 2;
var Y_STEPPING_HALFSTEP = exports.Y_STEPPING_HALFSTEP = 3;
var Y_STEPPING_FULLSTEP = exports.Y_STEPPING_FULLSTEP = 4;
var Y_STEPPING_INVALID = exports.Y_STEPPING_INVALID = -1;
var Y_DIAGS_INVALID = exports.Y_DIAGS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_STEPPOS_INVALID = exports.Y_STEPPOS_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_SPEED_INVALID = exports.Y_SPEED_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_PULLINSPEED_INVALID = exports.Y_PULLINSPEED_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_MAXACCEL_INVALID = exports.Y_MAXACCEL_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_MAXSPEED_INVALID = exports.Y_MAXSPEED_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_OVERCURRENT_INVALID = exports.Y_OVERCURRENT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_TCURRSTOP_INVALID = exports.Y_TCURRSTOP_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_TCURRRUN_INVALID = exports.Y_TCURRRUN_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_ALERTMODE_INVALID = exports.Y_ALERTMODE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_AUXMODE_INVALID = exports.Y_AUXMODE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_AUXSIGNAL_INVALID = exports.Y_AUXSIGNAL_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YStepperMotor definitions)

//--- (YStepperMotor class start)
/**
 * YStepperMotor Class: StepperMotor function interface
 *
 * The Yoctopuce application programming interface allows you to drive a stepper motor.
 */
//--- (end of YStepperMotor class start)

class YStepperMotor extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YStepperMotor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'StepperMotor';
        /** @member {number} **/
        this._motorState = Y_MOTORSTATE_INVALID;
        /** @member {number} **/
        this._diags = Y_DIAGS_INVALID;
        /** @member {number} **/
        this._stepPos = Y_STEPPOS_INVALID;
        /** @member {number} **/
        this._speed = Y_SPEED_INVALID;
        /** @member {number} **/
        this._pullinSpeed = Y_PULLINSPEED_INVALID;
        /** @member {number} **/
        this._maxAccel = Y_MAXACCEL_INVALID;
        /** @member {number} **/
        this._maxSpeed = Y_MAXSPEED_INVALID;
        /** @member {number} **/
        this._stepping = Y_STEPPING_INVALID;
        /** @member {number} **/
        this._overcurrent = Y_OVERCURRENT_INVALID;
        /** @member {number} **/
        this._tCurrStop = Y_TCURRSTOP_INVALID;
        /** @member {number} **/
        this._tCurrRun = Y_TCURRRUN_INVALID;
        /** @member {string} **/
        this._alertMode = Y_ALERTMODE_INVALID;
        /** @member {string} **/
        this._auxMode = Y_AUXMODE_INVALID;
        /** @member {number} **/
        this._auxSignal = Y_AUXSIGNAL_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            MOTORSTATE_ABSENT: 0,
            MOTORSTATE_ALERT: 1,
            MOTORSTATE_HI_Z: 2,
            MOTORSTATE_STOP: 3,
            MOTORSTATE_RUN: 4,
            MOTORSTATE_BATCH: 5,
            MOTORSTATE_INVALID: -1,
            DIAGS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            STEPPOS_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            SPEED_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PULLINSPEED_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            MAXACCEL_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            MAXSPEED_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            STEPPING_MICROSTEP16: 0,
            STEPPING_MICROSTEP8: 1,
            STEPPING_MICROSTEP4: 2,
            STEPPING_HALFSTEP: 3,
            STEPPING_FULLSTEP: 4,
            STEPPING_INVALID: -1,
            OVERCURRENT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            TCURRSTOP_INVALID: _yocto_api.YAPI.INVALID_UINT,
            TCURRRUN_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ALERTMODE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            AUXMODE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            AUXSIGNAL_INVALID: _yocto_api.YAPI.INVALID_INT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YStepperMotor constructor)
    }

    //--- (YStepperMotor implementation)

    get_syncProxy() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                try {
                    yield _this.load(_this._yapi.defaultCacheValidity);
                } catch (e) {
                    // device might be offline
                }
            }
            var res = new YStepperMotorProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'motorState':
                this._motorState = parseInt(val);
                return 1;
            case 'diags':
                this._diags = parseInt(val);
                return 1;
            case 'stepPos':
                this._stepPos = val / 16.0;
                return 1;
            case 'speed':
                this._speed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'pullinSpeed':
                this._pullinSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'maxAccel':
                this._maxAccel = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'maxSpeed':
                this._maxSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'stepping':
                this._stepping = parseInt(val);
                return 1;
            case 'overcurrent':
                this._overcurrent = parseInt(val);
                return 1;
            case 'tCurrStop':
                this._tCurrStop = parseInt(val);
                return 1;
            case 'tCurrRun':
                this._tCurrRun = parseInt(val);
                return 1;
            case 'alertMode':
                this._alertMode = val;
                return 1;
            case 'auxMode':
                this._auxMode = val;
                return 1;
            case 'auxSignal':
                this._auxSignal = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the motor working state.
     *
     * @return {number} a value among YStepperMotor.MOTORSTATE_ABSENT, YStepperMotor.MOTORSTATE_ALERT,
     * YStepperMotor.MOTORSTATE_HI_Z, YStepperMotor.MOTORSTATE_STOP, YStepperMotor.MOTORSTATE_RUN and
     * YStepperMotor.MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns YStepperMotor.MOTORSTATE_INVALID.
     */
    get_motorState() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_MOTORSTATE_INVALID;
                }
            }
            res = _this2._motorState;
            return res;
        })();
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return {number} an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns YStepperMotor.DIAGS_INVALID.
     */
    get_diags() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_DIAGS_INVALID;
                }
            }
            res = _this3._diags;
            return res;
        })();
    }

    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to setup
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval {number} : a floating point number corresponding to the current logical motor
     * position, measured in steps
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepPos(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 100.0) / 100.0);
            return yield _this4._setAttr('stepPos', rest_val);
        })();
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return {number} a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPOS_INVALID.
     */
    get_stepPos() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_STEPPOS_INVALID;
                }
            }
            res = _this5._stepPos;
            return res;
        })();
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return {number} a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.SPEED_INVALID.
     */
    get_speed() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_SPEED_INVALID;
                }
            }
            res = _this6._speed;
            return res;
        })();
    }

    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval {number} : a floating point number corresponding to the motor speed immediately
     * reachable from stop state, measured in steps per second
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pullinSpeed(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this7._setAttr('pullinSpeed', rest_val);
        })();
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return {number} a floating point number corresponding to the motor speed immediately reachable
     * from stop state, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.PULLINSPEED_INVALID.
     */
    get_pullinSpeed() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_PULLINSPEED_INVALID;
                }
            }
            res = _this8._pullinSpeed;
            return res;
        })();
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval {number} : a floating point number corresponding to the maximal motor acceleration,
     * measured in steps per second^2
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxAccel(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this9._setAttr('maxAccel', rest_val);
        })();
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return {number} a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * On failure, throws an exception or returns YStepperMotor.MAXACCEL_INVALID.
     */
    get_maxAccel() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_MAXACCEL_INVALID;
                }
            }
            res = _this10._maxAccel;
            return res;
        })();
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval {number} : a floating point number corresponding to the maximal motor speed, measured
     * in steps per second
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxSpeed(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this11._setAttr('maxSpeed', rest_val);
        })();
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return {number} a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns YStepperMotor.MAXSPEED_INVALID.
     */
    get_maxSpeed() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_MAXSPEED_INVALID;
                }
            }
            res = _this12._maxSpeed;
            return res;
        })();
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return {number} a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * On failure, throws an exception or returns YStepperMotor.STEPPING_INVALID.
     */
    get_stepping() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_STEPPING_INVALID;
                }
            }
            res = _this13._stepping;
            return res;
        })();
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval {number} : a value among YStepperMotor.STEPPING_MICROSTEP16,
     * YStepperMotor.STEPPING_MICROSTEP8, YStepperMotor.STEPPING_MICROSTEP4,
     * YStepperMotor.STEPPING_HALFSTEP and YStepperMotor.STEPPING_FULLSTEP corresponding to the stepping
     * mode used to drive the motor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepping(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this14._setAttr('stepping', rest_val);
        })();
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return {number} an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.OVERCURRENT_INVALID.
     */
    get_overcurrent() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_OVERCURRENT_INVALID;
                }
            }
            res = _this15._overcurrent;
            return res;
        })();
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the overcurrent alert and emergency stop
     * threshold, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overcurrent(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this16._setAttr('overcurrent', rest_val);
        })();
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return {number} an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRSTOP_INVALID.
     */
    get_tCurrStop() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_TCURRSTOP_INVALID;
                }
            }
            res = _this17._tCurrStop;
            return res;
        })();
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the torque regulation current when the motor
     * is stopped, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrStop(newval) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this18._setAttr('tCurrStop', rest_val);
        })();
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return {number} an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * On failure, throws an exception or returns YStepperMotor.TCURRRUN_INVALID.
     */
    get_tCurrRun() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this19._cacheExpiration <= _this19._yapi.GetTickCount()) {
                if ((yield _this19.load(_this19._yapi.defaultCacheValidity)) != _this19._yapi.SUCCESS) {
                    return Y_TCURRRUN_INVALID;
                }
            }
            res = _this19._tCurrRun;
            return res;
        })();
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval {number} : an integer corresponding to the torque regulation current when the motor
     * is running, measured in mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrRun(newval) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this20._setAttr('tCurrRun', rest_val);
        })();
    }

    get_alertMode() {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this21._cacheExpiration <= _this21._yapi.GetTickCount()) {
                if ((yield _this21.load(_this21._yapi.defaultCacheValidity)) != _this21._yapi.SUCCESS) {
                    return Y_ALERTMODE_INVALID;
                }
            }
            res = _this21._alertMode;
            return res;
        })();
    }

    set_alertMode(newval) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this22._setAttr('alertMode', rest_val);
        })();
    }

    get_auxMode() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this23._cacheExpiration <= _this23._yapi.GetTickCount()) {
                if ((yield _this23.load(_this23._yapi.defaultCacheValidity)) != _this23._yapi.SUCCESS) {
                    return Y_AUXMODE_INVALID;
                }
            }
            res = _this23._auxMode;
            return res;
        })();
    }

    set_auxMode(newval) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this24._setAttr('auxMode', rest_val);
        })();
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return {number} an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns YStepperMotor.AUXSIGNAL_INVALID.
     */
    get_auxSignal() {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this25._cacheExpiration <= _this25._yapi.GetTickCount()) {
                if ((yield _this25.load(_this25._yapi.defaultCacheValidity)) != _this25._yapi.SUCCESS) {
                    return Y_AUXSIGNAL_INVALID;
                }
            }
            res = _this25._auxSignal;
            return res;
        })();
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval {number} : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_auxSignal(newval) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this26._setAttr('auxSignal', rest_val);
        })();
    }

    get_command() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this27._cacheExpiration <= _this27._yapi.GetTickCount()) {
                if ((yield _this27.load(_this27._yapi.defaultCacheValidity)) != _this27._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            res = _this27._command;
            return res;
        })();
    }

    set_command(newval) {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this28._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a stepper motor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the stepper motor
     *
     * @return {YStepperMotor} a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('StepperMotor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a stepper motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the stepper motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YStepperMotor.isOnline() to test if the stepper motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a stepper motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the stepper motor
     *
     * @return {YStepperMotor} a YStepperMotor object allowing you to drive the stepper motor.
     */
    static FindStepperMotorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'StepperMotor', func);
        if (obj == null) {
            obj = new YStepperMotor(yctx, func);
            _yocto_api.YFunction._AddToCache('StepperMotor', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            return yield _this29.set_command(command);
        })();
    }

    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset() {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            return yield _this30.sendCommand('Z');
        })();
    }

    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed {number} : desired speed, in steps per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed) {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            return yield _this31.sendCommand('H' + String(Math.round(Math.round(1000 * speed))));
        })();
    }

    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed {number} : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    changeSpeed(speed) {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            return yield _this32.sendCommand('R' + String(Math.round(Math.round(1000 * speed))));
        })();
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos {number} : absolute position, measured in steps from the origin.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos) {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            return yield _this33.sendCommand('M' + String(Math.round(Math.round(16 * absPos))));
        })();
    }

    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos {number} : relative position, measured in steps from the current position.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            return yield _this34.sendCommand('m' + String(Math.round(Math.round(16 * relPos))));
        })();
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs {number} : wait time, specified in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs) {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            return yield _this35.sendCommand('_' + String(Math.round(waitMs)));
        })();
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop() {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            return yield _this36.sendCommand('!');
        })();
    }

    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occures even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    alertStepOut() {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            return yield _this37.sendCommand('.');
        })();
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake() {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            return yield _this38.sendCommand('B');
        })();
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ() {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            return yield _this39.sendCommand('z');
        })();
    }

    /**
     * Continues the enumeration of stepper motors started using yFirstStepperMotor().
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         a stepper motor currently online, or a null pointer
     *         if there are no more stepper motors to enumerate.
     */
    nextStepperMotor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotor() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('StepperMotor');
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotor(next_hwid);
    }

    /**
     * Starts the enumeration of stepper motors currently accessible.
     * Use the method YStepperMotor.nextStepperMotor() to iterate on
     * next stepper motors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
     *         the first stepper motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstStepperMotorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('StepperMotor');
        if (next_hwid == null) return null;
        return YStepperMotor.FindStepperMotorInContext(yctx, next_hwid);
    }

    //--- (end of YStepperMotor implementation)
}

exports.YStepperMotor = YStepperMotor; //
// YStepperMotorProxy Class: synchronous proxy to YStepperMotor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YStepperMotor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YStepperMotorProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YStepperMotor accessors declaration)

    /**
     * Returns the motor working state.
     *
     * @return a value among Y_MOTORSTATE_ABSENT, Y_MOTORSTATE_ALERT, Y_MOTORSTATE_HI_Z,
     * Y_MOTORSTATE_STOP, Y_MOTORSTATE_RUN and Y_MOTORSTATE_BATCH corresponding to the motor working state
     *
     * On failure, throws an exception or returns Y_MOTORSTATE_INVALID.
     */
    get_motorState() {
        return this.liveFunc._motorState;
    }

    /**
     * Returns the stepper motor controller diagnostics, as a bitmap.
     *
     * @return an integer corresponding to the stepper motor controller diagnostics, as a bitmap
     *
     * On failure, throws an exception or returns Y_DIAGS_INVALID.
     */
    get_diags() {
        return this.liveFunc._diags;
    }

    /**
     * Changes the current logical motor position, measured in steps.
     * This command does not cause any motor move, as its purpose is only to setup
     * the origin of the position counter. The fractional part of the position,
     * that corresponds to the physical position of the rotor, is not changed.
     * To trigger a motor move, use methods moveTo() or moveRel()
     * instead.
     *
     * @param newval : a floating point number corresponding to the current logical motor position, measured in steps
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepPos(newval) {
        this.liveFunc.set_stepPos(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current logical motor position, measured in steps.
     * The value may include a fractional part when micro-stepping is in use.
     *
     * @return a floating point number corresponding to the current logical motor position, measured in steps
     *
     * On failure, throws an exception or returns Y_STEPPOS_INVALID.
     */
    get_stepPos() {
        return this.liveFunc._stepPos;
    }

    /**
     * Returns current motor speed, measured in steps per second.
     * To change speed, use method changeSpeed().
     *
     * @return a floating point number corresponding to current motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    get_speed() {
        return this.liveFunc._speed;
    }

    /**
     * Changes the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the motor speed immediately reachable from
     * stop state, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pullinSpeed(newval) {
        this.liveFunc.set_pullinSpeed(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the motor speed immediately reachable from stop state, measured in steps per second.
     *
     * @return a floating point number corresponding to the motor speed immediately reachable from stop
     * state, measured in steps per second
     *
     * On failure, throws an exception or returns Y_PULLINSPEED_INVALID.
     */
    get_pullinSpeed() {
        return this.liveFunc._pullinSpeed;
    }

    /**
     * Changes the maximal motor acceleration, measured in steps per second^2.
     *
     * @param newval : a floating point number corresponding to the maximal motor acceleration, measured
     * in steps per second^2
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxAccel(newval) {
        this.liveFunc.set_maxAccel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal motor acceleration, measured in steps per second^2.
     *
     * @return a floating point number corresponding to the maximal motor acceleration, measured in steps per second^2
     *
     * On failure, throws an exception or returns Y_MAXACCEL_INVALID.
     */
    get_maxAccel() {
        return this.liveFunc._maxAccel;
    }

    /**
     * Changes the maximal motor speed, measured in steps per second.
     *
     * @param newval : a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxSpeed(newval) {
        this.liveFunc.set_maxSpeed(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal motor speed, measured in steps per second.
     *
     * @return a floating point number corresponding to the maximal motor speed, measured in steps per second
     *
     * On failure, throws an exception or returns Y_MAXSPEED_INVALID.
     */
    get_maxSpeed() {
        return this.liveFunc._maxSpeed;
    }

    /**
     * Returns the stepping mode used to drive the motor.
     *
     * @return a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * On failure, throws an exception or returns Y_STEPPING_INVALID.
     */
    get_stepping() {
        return this.liveFunc._stepping;
    }

    /**
     * Changes the stepping mode used to drive the motor.
     *
     * @param newval : a value among Y_STEPPING_MICROSTEP16, Y_STEPPING_MICROSTEP8, Y_STEPPING_MICROSTEP4,
     * Y_STEPPING_HALFSTEP and Y_STEPPING_FULLSTEP corresponding to the stepping mode used to drive the motor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stepping(newval) {
        this.liveFunc.set_stepping(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @return an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * On failure, throws an exception or returns Y_OVERCURRENT_INVALID.
     */
    get_overcurrent() {
        return this.liveFunc._overcurrent;
    }

    /**
     * Changes the overcurrent alert and emergency stop threshold, measured in mA.
     *
     * @param newval : an integer corresponding to the overcurrent alert and emergency stop threshold, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overcurrent(newval) {
        this.liveFunc.set_overcurrent(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the torque regulation current when the motor is stopped, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is stopped, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRSTOP_INVALID.
     */
    get_tCurrStop() {
        return this.liveFunc._tCurrStop;
    }

    /**
     * Changes the torque regulation current when the motor is stopped, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * stopped, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrStop(newval) {
        this.liveFunc.set_tCurrStop(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the torque regulation current when the motor is running, measured in mA.
     *
     * @return an integer corresponding to the torque regulation current when the motor is running, measured in mA
     *
     * On failure, throws an exception or returns Y_TCURRRUN_INVALID.
     */
    get_tCurrRun() {
        return this.liveFunc._tCurrRun;
    }

    /**
     * Changes the torque regulation current when the motor is running, measured in mA.
     *
     * @param newval : an integer corresponding to the torque regulation current when the motor is
     * running, measured in mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_tCurrRun(newval) {
        this.liveFunc.set_tCurrRun(newval);
        return this._yapi.SUCCESS;
    }

    get_alertMode() {
        return this.liveFunc._alertMode;
    }

    set_alertMode(newval) {
        this.liveFunc.set_alertMode(newval);
        return this._yapi.SUCCESS;
    }

    get_auxMode() {
        return this.liveFunc._auxMode;
    }

    set_auxMode(newval) {
        this.liveFunc.set_auxMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current value of the signal generated on the auxiliary output.
     *
     * @return an integer corresponding to the current value of the signal generated on the auxiliary output
     *
     * On failure, throws an exception or returns Y_AUXSIGNAL_INVALID.
     */
    get_auxSignal() {
        return this.liveFunc._auxSignal;
    }

    /**
     * Changes the value of the signal generated on the auxiliary output.
     * Acceptable values depend on the auxiliary output signal type configured.
     *
     * @param newval : an integer corresponding to the value of the signal generated on the auxiliary output
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_auxSignal(newval) {
        this.liveFunc.set_auxSignal(newval);
        return this._yapi.SUCCESS;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(command) {
        this.liveFunc.sendCommand(command);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Reinitialize the controller and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset() {
        this.liveFunc.reset();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts the motor backward at the specified speed, to search for the motor home position.
     *
     * @param speed : desired speed, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed) {
        this.liveFunc.findHomePosition(speed);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts the motor at a given speed. The time needed to reach the requested speed
     * will depend on the acceleration parameters configured for the motor.
     *
     * @param speed : desired speed, in steps per second. The minimal non-zero speed
     *         is 0.001 pulse per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    changeSpeed(speed) {
        this.liveFunc.changeSpeed(speed);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts the motor to reach a given absolute position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param absPos : absolute position, measured in steps from the origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos) {
        this.liveFunc.moveTo(absPos);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts the motor to reach a given relative position. The time needed to reach the requested
     * position will depend on the acceleration and max speed parameters configured for
     * the motor.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos) {
        this.liveFunc.moveRel(relPos);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs) {
        this.liveFunc.pause(waitMs);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop() {
        this.liveFunc.emergencyStop();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Move one step in the direction opposite the direction set when the most recent alert was raised.
     * The move occures even if the system is still in alert mode (end switch depressed). Caution.
     * use this function with great care as it may cause mechanical damages !
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    alertStepOut() {
        this.liveFunc.alertStepOut();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake() {
        this.liveFunc.abortAndBrake();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ() {
        this.liveFunc.abortAndHiZ();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YStepperMotor accessors declaration)
}

exports.YStepperMotorProxy = YStepperMotorProxy; //--- (StepperMotor functions)

/**
 * Retrieves a stepper motor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the stepper motor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YStepperMotor.isOnline() to test if the stepper motor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a stepper motor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the stepper motor
 *
 * @return {YStepperMotor} a YStepperMotor object allowing you to drive the stepper motor.
 */

function yFindStepperMotor(func) {
    return YStepperMotor.FindStepperMotor(func);
}

/**
 * Starts the enumeration of stepper motors currently accessible.
 * Use the method YStepperMotor.nextStepperMotor() to iterate on
 * next stepper motors.
 *
 * @return {YStepperMotor} a pointer to a YStepperMotor object, corresponding to
 *         the first stepper motor currently online, or a null pointer
 *         if there are none.
 */
function yFirstStepperMotor() {
    return YStepperMotor.FirstStepperMotor();
}

//--- (end of StepperMotor functions)
