/*********************************************************************
 *
 * $Id: yocto_pwminput.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for PwmInput functions
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
exports.YPwmInputProxy = exports.YPwmInput = exports.Y_PULSETIMER_INVALID = exports.Y_PULSECOUNTER_INVALID = exports.Y_PERIOD_INVALID = exports.Y_FREQUENCY_INVALID = exports.Y_PULSEDURATION_INVALID = exports.Y_DUTYCYCLE_INVALID = exports.Y_PWMREPORTMODE_INVALID = exports.Y_PWMREPORTMODE_PWM_EDGECOUNT = exports.Y_PWMREPORTMODE_PWM_PULSEDURATION = exports.Y_PWMREPORTMODE_PWM_FREQUENCY = exports.Y_PWMREPORTMODE_PWM_DUTYCYCLE = undefined;
exports.yFindPwmInput = yFindPwmInput;
exports.yFirstPwmInput = yFirstPwmInput;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YPwmInput return codes)
//--- (end of YPwmInput return codes)
//--- (YPwmInput definitions)
var Y_PWMREPORTMODE_PWM_DUTYCYCLE = exports.Y_PWMREPORTMODE_PWM_DUTYCYCLE = 0;
var Y_PWMREPORTMODE_PWM_FREQUENCY = exports.Y_PWMREPORTMODE_PWM_FREQUENCY = 1;
var Y_PWMREPORTMODE_PWM_PULSEDURATION = exports.Y_PWMREPORTMODE_PWM_PULSEDURATION = 2;
var Y_PWMREPORTMODE_PWM_EDGECOUNT = exports.Y_PWMREPORTMODE_PWM_EDGECOUNT = 3;
var Y_PWMREPORTMODE_INVALID = exports.Y_PWMREPORTMODE_INVALID = -1;
var Y_DUTYCYCLE_INVALID = exports.Y_DUTYCYCLE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_PULSEDURATION_INVALID = exports.Y_PULSEDURATION_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_FREQUENCY_INVALID = exports.Y_FREQUENCY_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_PERIOD_INVALID = exports.Y_PERIOD_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_PULSECOUNTER_INVALID = exports.Y_PULSECOUNTER_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_PULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YPwmInput definitions)

//--- (YPwmInput class start)
/**
 * YPwmInput Class: PwmInput function interface
 *
 * The Yoctopuce class YPwmInput allows you to read and configure Yoctopuce PWM
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure the signal parameter used to transmit
 * information: the duty cycle, the frequency or the pulse width.
 */
//--- (end of YPwmInput class start)

class YPwmInput extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YPwmInput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'PwmInput';
        /** @member {number} **/
        this._dutyCycle = Y_DUTYCYCLE_INVALID;
        /** @member {number} **/
        this._pulseDuration = Y_PULSEDURATION_INVALID;
        /** @member {number} **/
        this._frequency = Y_FREQUENCY_INVALID;
        /** @member {number} **/
        this._period = Y_PERIOD_INVALID;
        /** @member {number} **/
        this._pulseCounter = Y_PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer = Y_PULSETIMER_INVALID;
        /** @member {number} **/
        this._pwmReportMode = Y_PWMREPORTMODE_INVALID;
        this.imm_setConst({
            DUTYCYCLE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PULSEDURATION_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            FREQUENCY_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PERIOD_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            PULSECOUNTER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PULSETIMER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PWMREPORTMODE_PWM_DUTYCYCLE: 0,
            PWMREPORTMODE_PWM_FREQUENCY: 1,
            PWMREPORTMODE_PWM_PULSEDURATION: 2,
            PWMREPORTMODE_PWM_EDGECOUNT: 3,
            PWMREPORTMODE_INVALID: -1
        });
        //--- (end of YPwmInput constructor)
    }

    //--- (YPwmInput implementation)

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
            var res = new YPwmInputProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'dutyCycle':
                this._dutyCycle = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'pulseDuration':
                this._pulseDuration = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'frequency':
                this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'period':
                this._period = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'pulseCounter':
                this._pulseCounter = parseInt(val);
                return 1;
            case 'pulseTimer':
                this._pulseTimer = parseInt(val);
                return 1;
            case 'pwmReportMode':
                this._pwmReportMode = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return {number} a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns YPwmInput.DUTYCYCLE_INVALID.
     */
    get_dutyCycle() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_DUTYCYCLE_INVALID;
                }
            }
            return _this2._dutyCycle;
        })();
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the PWM pulse length in milliseconds, as
     * a floating point number
     *
     * On failure, throws an exception or returns YPwmInput.PULSEDURATION_INVALID.
     */
    get_pulseDuration() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_PULSEDURATION_INVALID;
                }
            }
            return _this3._pulseDuration;
        })();
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return {number} a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YPwmInput.FREQUENCY_INVALID.
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
     * Returns the PWM period in milliseconds.
     *
     * @return {number} a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns YPwmInput.PERIOD_INVALID.
     */
    get_period() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_PERIOD_INVALID;
                }
            }
            return _this5._period;
        })();
    }

    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YPwmInput.PULSECOUNTER_INVALID.
     */
    get_pulseCounter() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_PULSECOUNTER_INVALID;
                }
            }
            return _this6._pulseCounter;
        })();
    }

    set_pulseCounter(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('pulseCounter', rest_val);
        })();
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YPwmInput.PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_PULSETIMER_INVALID;
                }
            }
            return _this8._pulseTimer;
        })();
    }

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return {number} a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION and
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT corresponding to the parameter (frequency/duty cycle, pulse
     * width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YPwmInput.PWMREPORTMODE_INVALID.
     */
    get_pwmReportMode() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_PWMREPORTMODE_INVALID;
                }
            }
            return _this9._pwmReportMode;
        })();
    }

    /**
     * Modifies the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval {number} : a value among YPwmInput.PWMREPORTMODE_PWM_DUTYCYCLE,
     * YPwmInput.PWMREPORTMODE_PWM_FREQUENCY, YPwmInput.PWMREPORTMODE_PWM_PULSEDURATION and
     * YPwmInput.PWMREPORTMODE_PWM_EDGECOUNT
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pwmReportMode(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this10._setAttr('pwmReportMode', rest_val);
        })();
    }

    /**
     * Retrieves a PWM input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the PWM input
     *
     * @return {YPwmInput} a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInput(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('PwmInput', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a PWM input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the PWM input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmInput.isOnline() to test if the PWM input is
     * indeed online at a given time. In case of ambiguity when looking for
     * a PWM input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the PWM input
     *
     * @return {YPwmInput} a YPwmInput object allowing you to drive the PWM input.
     */
    static FindPwmInputInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'PwmInput', func);
        if (obj == null) {
            obj = new YPwmInput(yctx, func);
            _yocto_api.YFunction._AddToCache('PwmInput', func, obj);
        }
        return obj;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.set_pulseCounter(0);
        })();
    }

    /**
     * Continues the enumeration of PWM inputs started using yFirstPwmInput().
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         a PWM input currently online, or a null pointer
     *         if there are no more PWM inputs to enumerate.
     */
    nextPwmInput() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPwmInput.FindPwmInputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInput() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('PwmInput');
        if (next_hwid == null) return null;
        return YPwmInput.FindPwmInput(next_hwid);
    }

    /**
     * Starts the enumeration of PWM inputs currently accessible.
     * Use the method YPwmInput.nextPwmInput() to iterate on
     * next PWM inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
     *         the first PWM input currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmInputInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmInput');
        if (next_hwid == null) return null;
        return YPwmInput.FindPwmInputInContext(yctx, next_hwid);
    }

    //--- (end of YPwmInput implementation)
}

exports.YPwmInput = YPwmInput; //
// YPwmInputProxy Class: synchronous proxy to YPwmInput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPwmInput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YPwmInputProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YPwmInput accessors declaration)

    /**
     * Returns the PWM duty cycle, in per cents.
     *
     * @return a floating point number corresponding to the PWM duty cycle, in per cents
     *
     * On failure, throws an exception or returns Y_DUTYCYCLE_INVALID.
     */
    get_dutyCycle() {
        return this.liveFunc._dutyCycle;
    }

    /**
     * Returns the PWM pulse length in milliseconds, as a floating point number.
     *
     * @return a floating point number corresponding to the PWM pulse length in milliseconds, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_PULSEDURATION_INVALID.
     */
    get_pulseDuration() {
        return this.liveFunc._pulseDuration;
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    get_frequency() {
        return this.liveFunc._frequency;
    }

    /**
     * Returns the PWM period in milliseconds.
     *
     * @return a floating point number corresponding to the PWM period in milliseconds
     *
     * On failure, throws an exception or returns Y_PERIOD_INVALID.
     */
    get_period() {
        return this.liveFunc._period;
    }

    /**
     * Returns the pulse counter value. Actually that
     * counter is incremented twice per period. That counter is
     * limited  to 1 billion
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    get_pulseCounter() {
        return this.liveFunc._pulseCounter;
    }

    set_pulseCounter(newval) {
        this.liveFunc.set_pulseCounter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        return this.liveFunc._pulseTimer;
    }

    /**
     * Returns the parameter (frequency/duty cycle, pulse width, edges count) returned by the
     * get_currentValue function and callbacks. Attention
     *
     * @return a value among Y_PWMREPORTMODE_PWM_DUTYCYCLE, Y_PWMREPORTMODE_PWM_FREQUENCY,
     * Y_PWMREPORTMODE_PWM_PULSEDURATION and Y_PWMREPORTMODE_PWM_EDGECOUNT corresponding to the parameter
     * (frequency/duty cycle, pulse width, edges count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns Y_PWMREPORTMODE_INVALID.
     */
    get_pwmReportMode() {
        return this.liveFunc._pwmReportMode;
    }

    /**
     * Modifies the  parameter  type (frequency/duty cycle, pulse width, or edge count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among Y_PWMREPORTMODE_PWM_DUTYCYCLE, Y_PWMREPORTMODE_PWM_FREQUENCY,
     * Y_PWMREPORTMODE_PWM_PULSEDURATION and Y_PWMREPORTMODE_PWM_EDGECOUNT
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pwmReportMode(newval) {
        this.liveFunc.set_pwmReportMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter() {
        this.liveFunc.resetCounter();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YPwmInput accessors declaration)
}

exports.YPwmInputProxy = YPwmInputProxy; //--- (PwmInput functions)

/**
 * Retrieves a PWM input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the PWM input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmInput.isOnline() to test if the PWM input is
 * indeed online at a given time. In case of ambiguity when looking for
 * a PWM input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the PWM input
 *
 * @return {YPwmInput} a YPwmInput object allowing you to drive the PWM input.
 */

function yFindPwmInput(func) {
    return YPwmInput.FindPwmInput(func);
}

/**
 * Starts the enumeration of PWM inputs currently accessible.
 * Use the method YPwmInput.nextPwmInput() to iterate on
 * next PWM inputs.
 *
 * @return {YPwmInput} a pointer to a YPwmInput object, corresponding to
 *         the first PWM input currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmInput() {
    return YPwmInput.FirstPwmInput();
}

//--- (end of PwmInput functions)
