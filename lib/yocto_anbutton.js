/*********************************************************************
 *
 * $Id: yocto_anbutton.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for AnButton functions
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
exports.YAnButtonProxy = exports.YAnButton = exports.Y_PULSETIMER_INVALID = exports.Y_PULSECOUNTER_INVALID = exports.Y_LASTTIMERELEASED_INVALID = exports.Y_LASTTIMEPRESSED_INVALID = exports.Y_SENSITIVITY_INVALID = exports.Y_CALIBRATIONMIN_INVALID = exports.Y_CALIBRATIONMAX_INVALID = exports.Y_RAWVALUE_INVALID = exports.Y_CALIBRATEDVALUE_INVALID = exports.Y_ISPRESSED_INVALID = exports.Y_ISPRESSED_TRUE = exports.Y_ISPRESSED_FALSE = exports.Y_ANALOGCALIBRATION_INVALID = exports.Y_ANALOGCALIBRATION_ON = exports.Y_ANALOGCALIBRATION_OFF = undefined;
exports.yFindAnButton = yFindAnButton;
exports.yFirstAnButton = yFirstAnButton;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YAnButton return codes)
//--- (end of YAnButton return codes)
//--- (YAnButton definitions)
var Y_ANALOGCALIBRATION_OFF = exports.Y_ANALOGCALIBRATION_OFF = 0;
var Y_ANALOGCALIBRATION_ON = exports.Y_ANALOGCALIBRATION_ON = 1;
var Y_ANALOGCALIBRATION_INVALID = exports.Y_ANALOGCALIBRATION_INVALID = -1;
var Y_ISPRESSED_FALSE = exports.Y_ISPRESSED_FALSE = 0;
var Y_ISPRESSED_TRUE = exports.Y_ISPRESSED_TRUE = 1;
var Y_ISPRESSED_INVALID = exports.Y_ISPRESSED_INVALID = -1;
var Y_CALIBRATEDVALUE_INVALID = exports.Y_CALIBRATEDVALUE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_RAWVALUE_INVALID = exports.Y_RAWVALUE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CALIBRATIONMAX_INVALID = exports.Y_CALIBRATIONMAX_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CALIBRATIONMIN_INVALID = exports.Y_CALIBRATIONMIN_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_SENSITIVITY_INVALID = exports.Y_SENSITIVITY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LASTTIMEPRESSED_INVALID = exports.Y_LASTTIMEPRESSED_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_LASTTIMERELEASED_INVALID = exports.Y_LASTTIMERELEASED_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_PULSECOUNTER_INVALID = exports.Y_PULSECOUNTER_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_PULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YAnButton definitions)

//--- (YAnButton class start)
/**
 * YAnButton Class: AnButton function interface
 *
 * Yoctopuce application programming interface allows you to measure the state
 * of a simple button as well as to read an analog potentiometer (variable resistance).
 * This can be use for instance with a continuous rotating knob, a throttle grip
 * or a joystick. The module is capable to calibrate itself on min and max values,
 * in order to compute a calibrated value that varies proportionally with the
 * potentiometer position, regardless of its total resistance.
 */
//--- (end of YAnButton class start)

class YAnButton extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YAnButton constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'AnButton';
        /** @member {number} **/
        this._calibratedValue = Y_CALIBRATEDVALUE_INVALID;
        /** @member {number} **/
        this._rawValue = Y_RAWVALUE_INVALID;
        /** @member {number} **/
        this._analogCalibration = Y_ANALOGCALIBRATION_INVALID;
        /** @member {number} **/
        this._calibrationMax = Y_CALIBRATIONMAX_INVALID;
        /** @member {number} **/
        this._calibrationMin = Y_CALIBRATIONMIN_INVALID;
        /** @member {number} **/
        this._sensitivity = Y_SENSITIVITY_INVALID;
        /** @member {number} **/
        this._isPressed = Y_ISPRESSED_INVALID;
        /** @member {number} **/
        this._lastTimePressed = Y_LASTTIMEPRESSED_INVALID;
        /** @member {number} **/
        this._lastTimeReleased = Y_LASTTIMERELEASED_INVALID;
        /** @member {number} **/
        this._pulseCounter = Y_PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer = Y_PULSETIMER_INVALID;
        this.imm_setConst({
            CALIBRATEDVALUE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            RAWVALUE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ANALOGCALIBRATION_OFF: 0,
            ANALOGCALIBRATION_ON: 1,
            ANALOGCALIBRATION_INVALID: -1,
            CALIBRATIONMAX_INVALID: _yocto_api.YAPI.INVALID_UINT,
            CALIBRATIONMIN_INVALID: _yocto_api.YAPI.INVALID_UINT,
            SENSITIVITY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ISPRESSED_FALSE: 0,
            ISPRESSED_TRUE: 1,
            ISPRESSED_INVALID: -1,
            LASTTIMEPRESSED_INVALID: _yocto_api.YAPI.INVALID_LONG,
            LASTTIMERELEASED_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PULSECOUNTER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PULSETIMER_INVALID: _yocto_api.YAPI.INVALID_LONG
        });
        //--- (end of YAnButton constructor)
    }

    //--- (YAnButton implementation)

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
            var res = new YAnButtonProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'calibratedValue':
                this._calibratedValue = parseInt(val);
                return 1;
            case 'rawValue':
                this._rawValue = parseInt(val);
                return 1;
            case 'analogCalibration':
                this._analogCalibration = parseInt(val);
                return 1;
            case 'calibrationMax':
                this._calibrationMax = parseInt(val);
                return 1;
            case 'calibrationMin':
                this._calibrationMin = parseInt(val);
                return 1;
            case 'sensitivity':
                this._sensitivity = parseInt(val);
                return 1;
            case 'isPressed':
                this._isPressed = parseInt(val);
                return 1;
            case 'lastTimePressed':
                this._lastTimePressed = parseInt(val);
                return 1;
            case 'lastTimeReleased':
                this._lastTimeReleased = parseInt(val);
                return 1;
            case 'pulseCounter':
                this._pulseCounter = parseInt(val);
                return 1;
            case 'pulseTimer':
                this._pulseTimer = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return {number} an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATEDVALUE_INVALID.
     */
    get_calibratedValue() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_CALIBRATEDVALUE_INVALID;
                }
            }
            return _this2._calibratedValue;
        })();
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the current measured input value as-is (between 0 and
     * 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.RAWVALUE_INVALID.
     */
    get_rawValue() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_RAWVALUE_INVALID;
                }
            }
            return _this3._rawValue;
        })();
    }

    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return {number} either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns YAnButton.ANALOGCALIBRATION_INVALID.
     */
    get_analogCalibration() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_ANALOGCALIBRATION_INVALID;
                }
            }
            return _this4._analogCalibration;
        })();
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     *
     * @param newval {number} : either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_analogCalibration(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('analogCalibration', rest_val);
        })();
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the maximal value measured during the calibration
     * (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMAX_INVALID.
     */
    get_calibrationMax() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_CALIBRATIONMAX_INVALID;
                }
            }
            return _this6._calibrationMax;
        })();
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the maximal calibration value for the input
     * (between 0 and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMax(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('calibrationMax', rest_val);
        })();
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the minimal value measured during the calibration
     * (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMIN_INVALID.
     */
    get_calibrationMin() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_CALIBRATIONMIN_INVALID;
                }
            }
            return _this8._calibrationMin;
        })();
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the minimal calibration value for the input
     * (between 0 and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMin(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('calibrationMin', rest_val);
        })();
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return {number} an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns YAnButton.SENSITIVITY_INVALID.
     */
    get_sensitivity() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_SENSITIVITY_INVALID;
                }
            }
            return _this10._sensitivity;
        })();
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the sensibility for the input (between 1 and
     * 1000) for triggering user callbacks
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensitivity(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this11._setAttr('sensitivity', rest_val);
        })();
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return {number} either YAnButton.ISPRESSED_FALSE or YAnButton.ISPRESSED_TRUE, according to true if
     * the input (considered as binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns YAnButton.ISPRESSED_INVALID.
     */
    get_isPressed() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_ISPRESSED_INVALID;
                }
            }
            return _this12._isPressed;
        })();
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitioned from open to closed).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last time
     *         the input button was pressed (the input contact transitioned from open to closed)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMEPRESSED_INVALID.
     */
    get_lastTimePressed() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_LASTTIMEPRESSED_INVALID;
                }
            }
            return _this13._lastTimePressed;
        })();
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitioned from closed to open).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last time
     *         the input button was released (the input contact transitioned from closed to open)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMERELEASED_INVALID.
     */
    get_lastTimeReleased() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_LASTTIMERELEASED_INVALID;
                }
            }
            return _this14._lastTimeReleased;
        })();
    }

    /**
     * Returns the pulse counter value.
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YAnButton.PULSECOUNTER_INVALID.
     */
    get_pulseCounter() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_PULSECOUNTER_INVALID;
                }
            }
            return _this15._pulseCounter;
        })();
    }

    set_pulseCounter(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this16._setAttr('pulseCounter', rest_val);
        })();
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YAnButton.PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_PULSETIMER_INVALID;
                }
            }
            return _this17._pulseTimer;
        })();
    }

    /**
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the analog input
     *
     * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButton(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('AnButton', func);
        if (obj == null) {
            obj = new YAnButton(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('AnButton', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an analog input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the analog input
     *
     * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButtonInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'AnButton', func);
        if (obj == null) {
            obj = new YAnButton(yctx, func);
            _yocto_api.YFunction._AddToCache('AnButton', func, obj);
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
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.set_pulseCounter(0);
        })();
    }

    /**
     * Continues the enumeration of analog inputs started using yFirstAnButton().
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         an analog input currently online, or a null pointer
     *         if there are no more analog inputs to enumerate.
     */
    nextAnButton() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButton() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButtonInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AnButton');
        if (next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(yctx, next_hwid);
    }

    //--- (end of YAnButton implementation)
}

exports.YAnButton = YAnButton; //
// YAnButtonProxy Class: synchronous proxy to YAnButton objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAnButton objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YAnButtonProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YAnButton accessors declaration)

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATEDVALUE_INVALID.
     */
    get_calibratedValue() {
        return this.liveFunc._calibratedValue;
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns Y_RAWVALUE_INVALID.
     */
    get_rawValue() {
        return this.liveFunc._rawValue;
    }

    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns Y_ANALOGCALIBRATION_INVALID.
     */
    get_analogCalibration() {
        return this.liveFunc._analogCalibration;
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     *
     * @param newval : either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_analogCalibration(newval) {
        this.liveFunc.set_analogCalibration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATIONMAX_INVALID.
     */
    get_calibrationMax() {
        return this.liveFunc._calibrationMax;
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMax(newval) {
        this.liveFunc.set_calibrationMax(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATIONMIN_INVALID.
     */
    get_calibrationMin() {
        return this.liveFunc._calibrationMin;
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMin(newval) {
        this.liveFunc.set_calibrationMin(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns Y_SENSITIVITY_INVALID.
     */
    get_sensitivity() {
        return this.liveFunc._sensitivity;
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensitivity(newval) {
        this.liveFunc.set_sensitivity(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return either Y_ISPRESSED_FALSE or Y_ISPRESSED_TRUE, according to true if the input (considered as
     * binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns Y_ISPRESSED_INVALID.
     */
    get_isPressed() {
        return this.liveFunc._isPressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitioned from open to closed).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitioned from open to closed)
     *
     * On failure, throws an exception or returns Y_LASTTIMEPRESSED_INVALID.
     */
    get_lastTimePressed() {
        return this.liveFunc._lastTimePressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitioned from closed to open).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitioned from closed to open)
     *
     * On failure, throws an exception or returns Y_LASTTIMERELEASED_INVALID.
     */
    get_lastTimeReleased() {
        return this.liveFunc._lastTimeReleased;
    }

    /**
     * Returns the pulse counter value.
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
    //--- (end of YAnButton accessors declaration)
}

exports.YAnButtonProxy = YAnButtonProxy; //--- (AnButton functions)

/**
 * Retrieves an analog input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the analog input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAnButton.isOnline() to test if the analog input is
 * indeed online at a given time. In case of ambiguity when looking for
 * an analog input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the analog input
 *
 * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
 */

function yFindAnButton(func) {
    return YAnButton.FindAnButton(func);
}

/**
 * Starts the enumeration of analog inputs currently accessible.
 * Use the method YAnButton.nextAnButton() to iterate on
 * next analog inputs.
 *
 * @return {YAnButton} a pointer to a YAnButton object, corresponding to
 *         the first analog input currently online, or a null pointer
 *         if there are none.
 */
function yFirstAnButton() {
    return YAnButton.FirstAnButton();
}

//--- (end of AnButton functions)
