/*********************************************************************
 *
 * $Id: yocto_led.js 23579 2016-03-23 10:18:01Z mvuilleu $
 *
 * Implements the high-level API for Led functions
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
exports.YLedProxy = exports.YLed = exports.Y_LUMINOSITY_INVALID = exports.Y_BLINKING_INVALID = exports.Y_BLINKING_PANIC = exports.Y_BLINKING_CALL = exports.Y_BLINKING_RUN = exports.Y_BLINKING_AWARE = exports.Y_BLINKING_RELAX = exports.Y_BLINKING_STILL = exports.Y_POWER_INVALID = exports.Y_POWER_ON = exports.Y_POWER_OFF = undefined;
exports.yFindLed = yFindLed;
exports.yFirstLed = yFirstLed;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YLed return codes)
//--- (end of YLed return codes)
//--- (YLed definitions)
var Y_POWER_OFF = exports.Y_POWER_OFF = 0;
var Y_POWER_ON = exports.Y_POWER_ON = 1;
var Y_POWER_INVALID = exports.Y_POWER_INVALID = -1;
var Y_BLINKING_STILL = exports.Y_BLINKING_STILL = 0;
var Y_BLINKING_RELAX = exports.Y_BLINKING_RELAX = 1;
var Y_BLINKING_AWARE = exports.Y_BLINKING_AWARE = 2;
var Y_BLINKING_RUN = exports.Y_BLINKING_RUN = 3;
var Y_BLINKING_CALL = exports.Y_BLINKING_CALL = 4;
var Y_BLINKING_PANIC = exports.Y_BLINKING_PANIC = 5;
var Y_BLINKING_INVALID = exports.Y_BLINKING_INVALID = -1;
var Y_LUMINOSITY_INVALID = exports.Y_LUMINOSITY_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YLed definitions)

//--- (YLed class start)
/**
 * YLed Class: Led function interface
 *
 * Yoctopuce application programming interface
 * allows you not only to drive the intensity of the LED, but also to
 * have it blink at various preset frequencies.
 */
//--- (end of YLed class start)

class YLed extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YLed constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Led';
        /** @member {number} **/
        this._power = Y_POWER_INVALID;
        /** @member {number} **/
        this._luminosity = Y_LUMINOSITY_INVALID;
        /** @member {number} **/
        this._blinking = Y_BLINKING_INVALID;
        this.imm_setConst({
            POWER_OFF: 0,
            POWER_ON: 1,
            POWER_INVALID: -1,
            LUMINOSITY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKING_STILL: 0,
            BLINKING_RELAX: 1,
            BLINKING_AWARE: 2,
            BLINKING_RUN: 3,
            BLINKING_CALL: 4,
            BLINKING_PANIC: 5,
            BLINKING_INVALID: -1
        });
        //--- (end of YLed constructor)
    }

    //--- (YLed implementation)

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
            var res = new YLedProxy(_this);
            yield res._asyncInit();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'power':
                this._power = parseInt(val);
                return 1;
            case 'luminosity':
                this._luminosity = parseInt(val);
                return 1;
            case 'blinking':
                this._blinking = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current LED state.
     *
     * @return {number} either YLed.POWER_OFF or YLed.POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns YLed.POWER_INVALID.
     */
    get_power() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_POWER_INVALID;
                }
            }
            return _this2._power;
        })();
    }

    /**
     * Changes the state of the LED.
     *
     * @param newval {number} : either YLed.POWER_OFF or YLed.POWER_ON, according to the state of the LED
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_power(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('power', rest_val);
        })();
    }

    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return {number} an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns YLed.LUMINOSITY_INVALID.
     */
    get_luminosity() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_LUMINOSITY_INVALID;
                }
            }
            return _this4._luminosity;
        })();
    }

    /**
     * Changes the current LED intensity (in per cent).
     *
     * @param newval {number} : an integer corresponding to the current LED intensity (in per cent)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_luminosity(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('luminosity', rest_val);
        })();
    }

    /**
     * Returns the current LED signaling mode.
     *
     * @return {number} a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX, YLed.BLINKING_AWARE,
     * YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns YLed.BLINKING_INVALID.
     */
    get_blinking() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_BLINKING_INVALID;
                }
            }
            return _this6._blinking;
        })();
    }

    /**
     * Changes the current LED signaling mode.
     *
     * @param newval {number} : a value among YLed.BLINKING_STILL, YLed.BLINKING_RELAX,
     * YLed.BLINKING_AWARE, YLed.BLINKING_RUN, YLed.BLINKING_CALL and YLed.BLINKING_PANIC corresponding to
     * the current LED signaling mode
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinking(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('blinking', rest_val);
        })();
    }

    /**
     * Retrieves a LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLed.isOnline() to test if the LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * a LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the LED
     *
     * @return {YLed} a YLed object allowing you to drive the LED.
     */
    static FindLed(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Led', func);
        if (obj == null) {
            obj = new YLed(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Led', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLed.isOnline() to test if the LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * a LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the LED
     *
     * @return {YLed} a YLed object allowing you to drive the LED.
     */
    static FindLedInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Led', func);
        if (obj == null) {
            obj = new YLed(yctx, func);
            _yocto_api.YFunction._AddToCache('Led', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of LEDs started using yFirstLed().
     *
     * @return {YLed} a pointer to a YLed object, corresponding to
     *         a LED currently online, or a null pointer
     *         if there are no more LEDs to enumerate.
     */
    nextLed() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YLed.FindLedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of LEDs currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next LEDs.
     *
     * @return {YLed} a pointer to a YLed object, corresponding to
     *         the first LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstLed() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Led');
        if (next_hwid == null) return null;
        return YLed.FindLed(next_hwid);
    }

    /**
     * Starts the enumeration of LEDs currently accessible.
     * Use the method YLed.nextLed() to iterate on
     * next LEDs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YLed} a pointer to a YLed object, corresponding to
     *         the first LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstLedInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Led');
        if (next_hwid == null) return null;
        return YLed.FindLedInContext(yctx, next_hwid);
    }

    //--- (end of YLed implementation)
}

exports.YLed = YLed; //
// YLedProxy Class: synchronous proxy to YLed objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YLed objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YLedProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YLed accessors declaration)

    /**
     * Returns the current LED state.
     *
     * @return either Y_POWER_OFF or Y_POWER_ON, according to the current LED state
     *
     * On failure, throws an exception or returns Y_POWER_INVALID.
     */
    get_power() {
        return this.liveFunc._power;
    }

    /**
     * Changes the state of the LED.
     *
     * @param newval : either Y_POWER_OFF or Y_POWER_ON, according to the state of the LED
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_power(newval) {
        this.liveFunc.set_power(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current LED intensity (in per cent).
     *
     * @return an integer corresponding to the current LED intensity (in per cent)
     *
     * On failure, throws an exception or returns Y_LUMINOSITY_INVALID.
     */
    get_luminosity() {
        return this.liveFunc._luminosity;
    }

    /**
     * Changes the current LED intensity (in per cent).
     *
     * @param newval : an integer corresponding to the current LED intensity (in per cent)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_luminosity(newval) {
        this.liveFunc.set_luminosity(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current LED signaling mode.
     *
     * @return a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     * Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * On failure, throws an exception or returns Y_BLINKING_INVALID.
     */
    get_blinking() {
        return this.liveFunc._blinking;
    }

    /**
     * Changes the current LED signaling mode.
     *
     * @param newval : a value among Y_BLINKING_STILL, Y_BLINKING_RELAX, Y_BLINKING_AWARE, Y_BLINKING_RUN,
     * Y_BLINKING_CALL and Y_BLINKING_PANIC corresponding to the current LED signaling mode
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinking(newval) {
        this.liveFunc.set_blinking(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YLed accessors declaration)
}

exports.YLedProxy = YLedProxy; //--- (Led functions)

/**
 * Retrieves a LED for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the LED is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLed.isOnline() to test if the LED is
 * indeed online at a given time. In case of ambiguity when looking for
 * a LED by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the LED
 *
 * @return {YLed} a YLed object allowing you to drive the LED.
 */

function yFindLed(func) {
    return YLed.FindLed(func);
}

/**
 * Starts the enumeration of LEDs currently accessible.
 * Use the method YLed.nextLed() to iterate on
 * next LEDs.
 *
 * @return {YLed} a pointer to a YLed object, corresponding to
 *         the first LED currently online, or a null pointer
 *         if there are none.
 */
function yFirstLed() {
    return YLed.FirstLed();
}

//--- (end of Led functions)
