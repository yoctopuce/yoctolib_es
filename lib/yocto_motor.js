/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for Motor functions
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
exports.YMotor = exports.Y_COMMAND_INVALID = exports.Y_FAILSAFETIMEOUT_INVALID = exports.Y_STARTERTIME_INVALID = exports.Y_FREQUENCY_INVALID = exports.Y_OVERCURRENTLIMIT_INVALID = exports.Y_CUTOFFVOLTAGE_INVALID = exports.Y_BRAKINGFORCE_INVALID = exports.Y_DRIVINGFORCE_INVALID = exports.Y_MOTORSTATUS_INVALID = exports.Y_MOTORSTATUS_FAILSF = exports.Y_MOTORSTATUS_HIHEAT = exports.Y_MOTORSTATUS_HICURR = exports.Y_MOTORSTATUS_LOVOLT = exports.Y_MOTORSTATUS_BACKWD = exports.Y_MOTORSTATUS_FORWD = exports.Y_MOTORSTATUS_BRAKE = exports.Y_MOTORSTATUS_IDLE = undefined;
exports.yFindMotor = yFindMotor;
exports.yFirstMotor = yFirstMotor;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YMotor return codes)
//--- (end of YMotor return codes)
//--- (YMotor definitions)
const Y_MOTORSTATUS_IDLE = exports.Y_MOTORSTATUS_IDLE = 0;
const Y_MOTORSTATUS_BRAKE = exports.Y_MOTORSTATUS_BRAKE = 1;
const Y_MOTORSTATUS_FORWD = exports.Y_MOTORSTATUS_FORWD = 2;
const Y_MOTORSTATUS_BACKWD = exports.Y_MOTORSTATUS_BACKWD = 3;
const Y_MOTORSTATUS_LOVOLT = exports.Y_MOTORSTATUS_LOVOLT = 4;
const Y_MOTORSTATUS_HICURR = exports.Y_MOTORSTATUS_HICURR = 5;
const Y_MOTORSTATUS_HIHEAT = exports.Y_MOTORSTATUS_HIHEAT = 6;
const Y_MOTORSTATUS_FAILSF = exports.Y_MOTORSTATUS_FAILSF = 7;
const Y_MOTORSTATUS_INVALID = exports.Y_MOTORSTATUS_INVALID = -1;
const Y_DRIVINGFORCE_INVALID = exports.Y_DRIVINGFORCE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_BRAKINGFORCE_INVALID = exports.Y_BRAKINGFORCE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_CUTOFFVOLTAGE_INVALID = exports.Y_CUTOFFVOLTAGE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_OVERCURRENTLIMIT_INVALID = exports.Y_OVERCURRENTLIMIT_INVALID = _yocto_api.YAPI.INVALID_INT;
const Y_FREQUENCY_INVALID = exports.Y_FREQUENCY_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_STARTERTIME_INVALID = exports.Y_STARTERTIME_INVALID = _yocto_api.YAPI.INVALID_INT;
const Y_FAILSAFETIMEOUT_INVALID = exports.Y_FAILSAFETIMEOUT_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YMotor definitions)

//--- (YMotor class start)
/**
 * YMotor Class: Motor function interface
 *
 * Yoctopuce application programming interface allows you to drive the
 * power sent to the motor to make it turn both ways, but also to drive accelerations
 * and decelerations. The motor will then accelerate automatically: you will not
 * have to monitor it. The API also allows to slow down the motor by shortening
 * its terminals: the motor will then act as an electromagnetic brake.
 */
//--- (end of YMotor class start)

class YMotor extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YMotor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Motor';
        /** @member {number} **/
        this._motorStatus = Y_MOTORSTATUS_INVALID;
        /** @member {number} **/
        this._drivingForce = Y_DRIVINGFORCE_INVALID;
        /** @member {number} **/
        this._brakingForce = Y_BRAKINGFORCE_INVALID;
        /** @member {number} **/
        this._cutOffVoltage = Y_CUTOFFVOLTAGE_INVALID;
        /** @member {number} **/
        this._overCurrentLimit = Y_OVERCURRENTLIMIT_INVALID;
        /** @member {number} **/
        this._frequency = Y_FREQUENCY_INVALID;
        /** @member {number} **/
        this._starterTime = Y_STARTERTIME_INVALID;
        /** @member {number} **/
        this._failSafeTimeout = Y_FAILSAFETIMEOUT_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            MOTORSTATUS_IDLE: 0,
            MOTORSTATUS_BRAKE: 1,
            MOTORSTATUS_FORWD: 2,
            MOTORSTATUS_BACKWD: 3,
            MOTORSTATUS_LOVOLT: 4,
            MOTORSTATUS_HICURR: 5,
            MOTORSTATUS_HIHEAT: 6,
            MOTORSTATUS_FAILSF: 7,
            MOTORSTATUS_INVALID: -1,
            DRIVINGFORCE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            BRAKINGFORCE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            CUTOFFVOLTAGE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            OVERCURRENTLIMIT_INVALID: _yocto_api.YAPI.INVALID_INT,
            FREQUENCY_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            STARTERTIME_INVALID: _yocto_api.YAPI.INVALID_INT,
            FAILSAFETIMEOUT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YMotor constructor)
    }

    //--- (YMotor implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'motorStatus':
                this._motorStatus = parseInt(val);
                return 1;
            case 'drivingForce':
                this._drivingForce = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'brakingForce':
                this._brakingForce = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'cutOffVoltage':
                this._cutOffVoltage = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'overCurrentLimit':
                this._overCurrentLimit = parseInt(val);
                return 1;
            case 'frequency':
                this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'starterTime':
                this._starterTime = parseInt(val);
                return 1;
            case 'failSafeTimeout':
                this._failSafeTimeout = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Return the controller state. Possible states are:
     * IDLE   when the motor is stopped/in free wheel, ready to start;
     * FORWD  when the controller is driving the motor forward;
     * BACKWD when the controller is driving the motor backward;
     * BRAKE  when the controller is braking;
     * LOVOLT when the controller has detected a low voltage condition;
     * HICURR when the controller has detected an overcurrent condition;
     * HIHEAT when the controller has detected an overheat condition;
     * FAILSF when the controller switched on the failsafe security.
     *
     * When an error condition occurred (LOVOLT, HICURR, HIHEAT, FAILSF), the controller
     * status must be explicitly reset using the resetStatus function.
     *
     * @return {number} a value among YMotor.MOTORSTATUS_IDLE, YMotor.MOTORSTATUS_BRAKE,
     * YMotor.MOTORSTATUS_FORWD, YMotor.MOTORSTATUS_BACKWD, YMotor.MOTORSTATUS_LOVOLT,
     * YMotor.MOTORSTATUS_HICURR, YMotor.MOTORSTATUS_HIHEAT and YMotor.MOTORSTATUS_FAILSF
     *
     * On failure, throws an exception or returns YMotor.MOTORSTATUS_INVALID.
     */
    get_motorStatus() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_MOTORSTATUS_INVALID;
                }
            }
            return _this._motorStatus;
        })();
    }

    set_motorStatus(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this2._setAttr('motorStatus', rest_val);
        })();
    }

    /**
     * Changes immediately the power sent to the motor. The value is a percentage between -100%
     * to 100%. If you want go easy on your mechanics and avoid excessive current consumption,
     * try to avoid brutal power changes. For example, immediate transition from forward full power
     * to reverse full power is a very bad idea. Each time the driving power is modified, the
     * braking power is set to zero.
     *
     * @param newval {number} : a floating point number corresponding to immediately the power sent to the motor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_drivingForce(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this3._setAttr('drivingForce', rest_val);
        })();
    }

    /**
     * Returns the power sent to the motor, as a percentage between -100% and +100%.
     *
     * @return {number} a floating point number corresponding to the power sent to the motor, as a
     * percentage between -100% and +100%
     *
     * On failure, throws an exception or returns YMotor.DRIVINGFORCE_INVALID.
     */
    get_drivingForce() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_DRIVINGFORCE_INVALID;
                }
            }
            return _this4._drivingForce;
        })();
    }

    /**
     * Changes immediately the braking force applied to the motor (in percents).
     * The value 0 corresponds to no braking (free wheel). When the braking force
     * is changed, the driving power is set to zero. The value is a percentage.
     *
     * @param newval {number} : a floating point number corresponding to immediately the braking force
     * applied to the motor (in percents)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_brakingForce(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this5._setAttr('brakingForce', rest_val);
        })();
    }

    /**
     * Returns the braking force applied to the motor, as a percentage.
     * The value 0 corresponds to no braking (free wheel).
     *
     * @return {number} a floating point number corresponding to the braking force applied to the motor,
     * as a percentage
     *
     * On failure, throws an exception or returns YMotor.BRAKINGFORCE_INVALID.
     */
    get_brakingForce() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_BRAKINGFORCE_INVALID;
                }
            }
            return _this6._brakingForce;
        })();
    }

    /**
     * Changes the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevent damage to a battery that can
     * occur when drawing current from an "empty" battery.
     * Note that whatever the cutoff threshold, the controller switches to undervoltage
     * error state if the power supply goes under 3V, even for a very brief time.
     *
     * @param newval {number} : a floating point number corresponding to the threshold voltage under which
     * the controller automatically switches to error state
     *         and prevents further current draw
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_cutOffVoltage(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this7._setAttr('cutOffVoltage', rest_val);
        })();
    }

    /**
     * Returns the threshold voltage under which the controller automatically switches to error state
     * and prevents further current draw. This setting prevents damage to a battery that can
     * occur when drawing current from an "empty" battery.
     *
     * @return {number} a floating point number corresponding to the threshold voltage under which the
     * controller automatically switches to error state
     *         and prevents further current draw
     *
     * On failure, throws an exception or returns YMotor.CUTOFFVOLTAGE_INVALID.
     */
    get_cutOffVoltage() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_CUTOFFVOLTAGE_INVALID;
                }
            }
            return _this8._cutOffVoltage;
        })();
    }

    /**
     * Returns the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit.
     *
     * @return {number} an integer corresponding to the current threshold (in mA) above which the
     * controller automatically
     *         switches to error state
     *
     * On failure, throws an exception or returns YMotor.OVERCURRENTLIMIT_INVALID.
     */
    get_overCurrentLimit() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_OVERCURRENTLIMIT_INVALID;
                }
            }
            return _this9._overCurrentLimit;
        })();
    }

    /**
     * Changes the current threshold (in mA) above which the controller automatically
     * switches to error state. A zero value means that there is no limit. Note that whatever the
     * current limit is, the controller switches to OVERCURRENT status if the current
     * goes above 32A, even for a very brief time.
     *
     * @param newval {number} : an integer corresponding to the current threshold (in mA) above which the
     * controller automatically
     *         switches to error state
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_overCurrentLimit(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this10._setAttr('overCurrentLimit', rest_val);
        })();
    }

    /**
     * Changes the PWM frequency used to control the motor. Low frequency is usually
     * more efficient and may help the motor to start, but an audible noise might be
     * generated. A higher frequency reduces the noise, but more energy is converted
     * into heat.
     *
     * @param newval {number} : a floating point number corresponding to the PWM frequency used to control the motor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this11._setAttr('frequency', rest_val);
        })();
    }

    /**
     * Returns the PWM frequency used to control the motor.
     *
     * @return {number} a floating point number corresponding to the PWM frequency used to control the motor
     *
     * On failure, throws an exception or returns YMotor.FREQUENCY_INVALID.
     */
    get_frequency() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_FREQUENCY_INVALID;
                }
            }
            return _this12._frequency;
        })();
    }

    /**
     * Returns the duration (in ms) during which the motor is driven at low frequency to help
     * it start up.
     *
     * @return {number} an integer corresponding to the duration (in ms) during which the motor is driven
     * at low frequency to help
     *         it start up
     *
     * On failure, throws an exception or returns YMotor.STARTERTIME_INVALID.
     */
    get_starterTime() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_STARTERTIME_INVALID;
                }
            }
            return _this13._starterTime;
        })();
    }

    /**
     * Changes the duration (in ms) during which the motor is driven at low frequency to help
     * it start up.
     *
     * @param newval {number} : an integer corresponding to the duration (in ms) during which the motor is
     * driven at low frequency to help
     *         it start up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_starterTime(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this14._setAttr('starterTime', rest_val);
        })();
    }

    /**
     * Returns the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     *
     * @return {number} an integer corresponding to the delay in milliseconds allowed for the controller
     * to run autonomously without
     *         receiving any instruction from the control process
     *
     * On failure, throws an exception or returns YMotor.FAILSAFETIMEOUT_INVALID.
     */
    get_failSafeTimeout() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_FAILSAFETIMEOUT_INVALID;
                }
            }
            return _this15._failSafeTimeout;
        })();
    }

    /**
     * Changes the delay in milliseconds allowed for the controller to run autonomously without
     * receiving any instruction from the control process. When this delay has elapsed,
     * the controller automatically stops the motor and switches to FAILSAFE error.
     * Failsafe security is disabled when the value is zero.
     *
     * @param newval {number} : an integer corresponding to the delay in milliseconds allowed for the
     * controller to run autonomously without
     *         receiving any instruction from the control process
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_failSafeTimeout(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this16._setAttr('failSafeTimeout', rest_val);
        })();
    }

    get_command() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this17._command;
        })();
    }

    set_command(newval) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this18._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a motor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMotor.isOnline() to test if the motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the motor
     *
     * @return {YMotor} a YMotor object allowing you to drive the motor.
     */
    static FindMotor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Motor', func);
        if (obj == null) {
            obj = new YMotor(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Motor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a motor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the motor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMotor.isOnline() to test if the motor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a motor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the motor
     *
     * @return {YMotor} a YMotor object allowing you to drive the motor.
     */
    static FindMotorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Motor', func);
        if (obj == null) {
            obj = new YMotor(yctx, func);
            _yocto_api.YFunction._AddToCache('Motor', func, obj);
        }
        return obj;
    }

    /**
     * Rearms the controller failsafe timer. When the motor is running and the failsafe feature
     * is active, this function should be called periodically to prove that the control process
     * is running properly. Otherwise, the motor is automatically stopped after the specified
     * timeout. Calling a motor <i>set</i> function implicitely rearms the failsafe timer.
     */
    keepALive() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.set_command('K');
        })();
    }

    /**
     * Reset the controller state to IDLE. This function must be invoked explicitely
     * after any error condition is signaled.
     */
    resetStatus() {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.set_motorStatus(Y_MOTORSTATUS_IDLE);
        })();
    }

    /**
     * Changes progressively the power sent to the moteur for a specific duration.
     *
     * @param targetPower {number} : desired motor power, in percents (between -100% and +100%)
     * @param delay {number} : duration (in ms) of the transition
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drivingForceMove(targetPower, delay) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return yield _this21.set_command('P' + String(Math.round(Math.round(targetPower * 10))) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Changes progressively the braking force applied to the motor for a specific duration.
     *
     * @param targetPower {number} : desired braking force, in percents
     * @param delay {number} : duration (in ms) of the transition
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    brakingForceMove(targetPower, delay) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.set_command('B' + String(Math.round(Math.round(targetPower * 10))) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Continues the enumeration of motors started using yFirstMotor().
     *
     * @return {YMotor} a pointer to a YMotor object, corresponding to
     *         a motor currently online, or a null pointer
     *         if there are no more motors to enumerate.
     */
    nextMotor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YMotor.FindMotorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of motors currently accessible.
     * Use the method YMotor.nextMotor() to iterate on
     * next motors.
     *
     * @return {YMotor} a pointer to a YMotor object, corresponding to
     *         the first motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMotor() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Motor');
        if (next_hwid == null) return null;
        return YMotor.FindMotor(next_hwid);
    }

    /**
     * Starts the enumeration of motors currently accessible.
     * Use the method YMotor.nextMotor() to iterate on
     * next motors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMotor} a pointer to a YMotor object, corresponding to
     *         the first motor currently online, or a null pointer
     *         if there are none.
     */
    static FirstMotorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Motor');
        if (next_hwid == null) return null;
        return YMotor.FindMotorInContext(yctx, next_hwid);
    }

    //--- (end of YMotor implementation)
}

exports.YMotor = YMotor; //--- (Motor functions)

/**
 * Retrieves a motor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the motor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMotor.isOnline() to test if the motor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a motor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the motor
 *
 * @return {YMotor} a YMotor object allowing you to drive the motor.
 */

function yFindMotor(func) {
    return YMotor.FindMotor(func);
}

/**
 * Starts the enumeration of motors currently accessible.
 * Use the method YMotor.nextMotor() to iterate on
 * next motors.
 *
 * @return {YMotor} a pointer to a YMotor object, corresponding to
 *         the first motor currently online, or a null pointer
 *         if there are none.
 */
function yFirstMotor() {
    return YMotor.FirstMotor();
}

//--- (end of Motor functions)