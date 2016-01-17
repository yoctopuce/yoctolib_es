/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for PwmOutput functions
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
exports.YPwmOutput = exports.Y_DUTYCYCLEATPOWERON_INVALID = exports.Y_PWMTRANSITION_INVALID = exports.Y_PULSEDURATION_INVALID = exports.Y_DUTYCYCLE_INVALID = exports.Y_PERIOD_INVALID = exports.Y_FREQUENCY_INVALID = exports.Y_ENABLEDATPOWERON_INVALID = exports.Y_ENABLEDATPOWERON_TRUE = exports.Y_ENABLEDATPOWERON_FALSE = exports.Y_ENABLED_INVALID = exports.Y_ENABLED_TRUE = exports.Y_ENABLED_FALSE = undefined;
exports.yFindPwmOutput = yFindPwmOutput;
exports.yFirstPwmOutput = yFirstPwmOutput;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YPwmOutput return codes)
//--- (end of YPwmOutput return codes)
//--- (YPwmOutput definitions)
const Y_ENABLED_FALSE = exports.Y_ENABLED_FALSE = 0;
const Y_ENABLED_TRUE = exports.Y_ENABLED_TRUE = 1;
const Y_ENABLED_INVALID = exports.Y_ENABLED_INVALID = -1;
const Y_ENABLEDATPOWERON_FALSE = exports.Y_ENABLEDATPOWERON_FALSE = 0;
const Y_ENABLEDATPOWERON_TRUE = exports.Y_ENABLEDATPOWERON_TRUE = 1;
const Y_ENABLEDATPOWERON_INVALID = exports.Y_ENABLEDATPOWERON_INVALID = -1;
const Y_FREQUENCY_INVALID = exports.Y_FREQUENCY_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_PERIOD_INVALID = exports.Y_PERIOD_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_DUTYCYCLE_INVALID = exports.Y_DUTYCYCLE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_PULSEDURATION_INVALID = exports.Y_PULSEDURATION_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_PWMTRANSITION_INVALID = exports.Y_PWMTRANSITION_INVALID = _yocto_api.YAPI.INVALID_STRING;
const Y_DUTYCYCLEATPOWERON_INVALID = exports.Y_DUTYCYCLEATPOWERON_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YPwmOutput definitions)

//--- (YPwmOutput class start)
/**
 * YPwmOutput Class: PwmOutput function interface
 *
 * The Yoctopuce application programming interface allows you to configure, start, and stop the PWM.
 */
//--- (end of YPwmOutput class start)

class YPwmOutput extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YPwmOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'PwmOutput';
        /** @member {number} **/
        this._enabled = Y_ENABLED_INVALID;
        /** @member {number} **/
        this._frequency = Y_FREQUENCY_INVALID;
        /** @member {number} **/
        this._period = Y_PERIOD_INVALID;
        /** @member {number} **/
        this._dutyCycle = Y_DUTYCYCLE_INVALID;
        /** @member {number} **/
        this._pulseDuration = Y_PULSEDURATION_INVALID;
        /** @member {string} **/
        this._pwmTransition = Y_PWMTRANSITION_INVALID;
        /** @member {number} **/
        this._enabledAtPowerOn = Y_ENABLEDATPOWERON_INVALID;
        /** @member {number} **/
        this._dutyCycleAtPowerOn = Y_DUTYCYCLEATPOWERON_INVALID;
        this.imm_setConst({
            ENABLED_FALSE: 0,
            ENABLED_TRUE: 1,
            ENABLED_INVALID: -1,
            FREQUENCY_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PERIOD_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            DUTYCYCLE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PULSEDURATION_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PWMTRANSITION_INVALID: _yocto_api.YAPI.INVALID_STRING,
            ENABLEDATPOWERON_FALSE: 0,
            ENABLEDATPOWERON_TRUE: 1,
            ENABLEDATPOWERON_INVALID: -1,
            DUTYCYCLEATPOWERON_INVALID: _yocto_api.YAPI.INVALID_DOUBLE
        });
        //--- (end of YPwmOutput constructor)
    }

    //--- (YPwmOutput implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'enabled':
                this._enabled = parseInt(val);
                return 1;
            case 'frequency':
                this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'period':
                this._period = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'dutyCycle':
                this._dutyCycle = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'pulseDuration':
                this._pulseDuration = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'pwmTransition':
                this._pwmTransition = val;
                return 1;
            case 'enabledAtPowerOn':
                this._enabledAtPowerOn = parseInt(val);
                return 1;
            case 'dutyCycleAtPowerOn':
                this._dutyCycleAtPowerOn = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the PWMs.
     *
     * @return {number} either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE, according to the state of the PWMs
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLED_INVALID.
     */
    get_enabled() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_ENABLED_INVALID;
                }
            }
            return _this._enabled;
        })();
    }

    /**
     * Stops or starts the PWM.
     *
     * @param newval {number} : either YPwmOutput.ENABLED_FALSE or YPwmOutput.ENABLED_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this2._setAttr('enabled', rest_val);
        })();
    }

    /**
     * Changes the PWM frequency. The duty cycle is kept unchanged thanks to an
     * automatic pulse width change.
     *
     * @param newval {number} : a floating point number corresponding to the PWM frequency
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this3._setAttr('frequency', rest_val);
        })();
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return {number} a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmOutput.FREQUENCY_INVALID.
     */
    get_frequency() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_FREQUENCY_INVALID;
                }
            }
            return _this4._frequency;
        })();
    }

    /**
     * Changes the PWM period in milliseconds.
     *
     * @param newval {number} : a floating point number corresponding to the PWM period in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_period(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this5._setAttr('period', rest_val);
        })();
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return {number} a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmOutput.PERIOD_INVALID.
     */
    get_period() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_PERIOD_INVALID;
                }
            }
            return _this6._period;
        })();
    }

    /**
     * Changes the PWM duty cycle, in per cents.
     *
     * @param newval {number} : a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycle(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this7._setAttr('dutyCycle', rest_val);
        })();
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return {number} a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLE_INVALID.
     */
    get_dutyCycle() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_DUTYCYCLE_INVALID;
                }
            }
            return _this8._dutyCycle;
        })();
    }

    /**
     * Changes the PWM pulse length, in milliseconds. A pulse length cannot be longer than period,
     * otherwise it is truncated.
     *
     * @param newval {number} : a floating point number corresponding to the PWM pulse length, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pulseDuration(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this9._setAttr('pulseDuration', rest_val);
        })();
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the PWM pulse length in milliseconds, as
     * a floating point number
     *
     * On failure, throws an exception or returns YPwmOutput.PULSEDURATION_INVALID.
     */
    get_pulseDuration() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_PULSEDURATION_INVALID;
                }
            }
            return _this10._pulseDuration;
        })();
    }

    get_pwmTransition() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_PWMTRANSITION_INVALID;
                }
            }
            return _this11._pwmTransition;
        })();
    }

    set_pwmTransition(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this12._setAttr('pwmTransition', rest_val);
        })();
    }

    /**
     * Returns the state of the PWM at device power on.
     *
     * @return {number} either YPwmOutput.ENABLEDATPOWERON_FALSE or YPwmOutput.ENABLEDATPOWERON_TRUE,
     * according to the state of the PWM at device power on
     *
     * On failure, throws an exception or returns YPwmOutput.ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_ENABLEDATPOWERON_INVALID;
                }
            }
            return _this13._enabledAtPowerOn;
        })();
    }

    /**
     * Changes the state of the PWM at device power on. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : either YPwmOutput.ENABLEDATPOWERON_FALSE or
     * YPwmOutput.ENABLEDATPOWERON_TRUE, according to the state of the PWM at device power on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this14._setAttr('enabledAtPowerOn', rest_val);
        })();
    }

    /**
     * Changes the PWM duty cycle at device power on. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : a floating point number corresponding to the PWM duty cycle at device power on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_dutyCycleAtPowerOn(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this15._setAttr('dutyCycleAtPowerOn', rest_val);
        })();
    }

    /**
     * Returns the PWMs duty cycle at device power on as a floating point number between 0 and 100
     *
     * @return {number} a floating point number corresponding to the PWMs duty cycle at device power on as
     * a floating point number between 0 and 100
     *
     * On failure, throws an exception or returns YPwmOutput.DUTYCYCLEATPOWERON_INVALID.
     */
    get_dutyCycleAtPowerOn() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_DUTYCYCLEATPOWERON_INVALID;
                }
            }
            return _this16._dutyCycleAtPowerOn;
        })();
    }

    /**
     * Retrieves a PWM for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the PWM
     *
     * @return {YPwmOutput} a YPwmOutput object allowing you to drive the PWM.
     */
    static FindPwmOutput(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('PwmOutput', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a PWM for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmOutput.isOnline() to test if the PWM is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the PWM
     *
     * @return {YPwmOutput} a YPwmOutput object allowing you to drive the PWM.
     */
    static FindPwmOutputInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'PwmOutput', func);
        if (obj == null) {
            obj = new YPwmOutput(yctx, func);
            _yocto_api.YFunction._AddToCache('PwmOutput', func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of the pulse duration toward a given value. Any period,
     * frequency, duty cycle or pulse width change will cancel any ongoing transition process.
     *
     * @param ms_target   : new pulse duration at the end of the transition
     *         (floating-point number, representing the pulse duration in milliseconds)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulseDurationMove(ms_target, ms_duration) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let newval;
            if (ms_target < 0.0) {
                ms_target = 0.0;
            }
            newval = String(Math.round(Math.round(ms_target * 65536))) + 'ms:' + String(Math.round(ms_duration));
            return yield _this17.set_pwmTransition(newval);
        })();
    }

    /**
     * Performs a smooth change of the pulse duration toward a given value.
     *
     * @param target      : new duty cycle at the end of the transition
     *         (floating-point number, between 0 and 1)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    dutyCycleMove(target, ms_duration) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let newval;
            if (target < 0.0) {
                target = 0.0;
            }
            if (target > 100.0) {
                target = 100.0;
            }
            newval = String(Math.round(Math.round(target * 65536))) + ':' + String(Math.round(ms_duration));
            return yield _this18.set_pwmTransition(newval);
        })();
    }

    /**
     * Continues the enumeration of PWMs started using yFirstPwmOutput().
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         a PWM currently online, or a null pointer
     *         if there are no more PWMs to enumerate.
     */
    nextPwmOutput() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of PWMs currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWMs.
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         the first PWM currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutput() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('PwmOutput');
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutput(next_hwid);
    }

    /**
     * Starts the enumeration of PWMs currently accessible.
     * Use the method YPwmOutput.nextPwmOutput() to iterate on
     * next PWMs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
     *         the first PWM currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmOutputInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmOutput');
        if (next_hwid == null) return null;
        return YPwmOutput.FindPwmOutputInContext(yctx, next_hwid);
    }

    //--- (end of YPwmOutput implementation)
}

exports.YPwmOutput = YPwmOutput; //--- (PwmOutput functions)

/**
 * Retrieves a PWM for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the PWM is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmOutput.isOnline() to test if the PWM is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the PWM
 *
 * @return {YPwmOutput} a YPwmOutput object allowing you to drive the PWM.
 */

function yFindPwmOutput(func) {
    return YPwmOutput.FindPwmOutput(func);
}

/**
 * Starts the enumeration of PWMs currently accessible.
 * Use the method YPwmOutput.nextPwmOutput() to iterate on
 * next PWMs.
 *
 * @return {YPwmOutput} a pointer to a YPwmOutput object, corresponding to
 *         the first PWM currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmOutput() {
    return YPwmOutput.FirstPwmOutput();
}

//--- (end of PwmOutput functions)
