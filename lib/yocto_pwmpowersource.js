/*********************************************************************
 *
 * $Id: yocto_pwmpowersource.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for PwmPowerSource functions
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
exports.YPwmPowerSourceProxy = exports.YPwmPowerSource = exports.Y_POWERMODE_INVALID = exports.Y_POWERMODE_OPNDRN = exports.Y_POWERMODE_EXT_V = exports.Y_POWERMODE_USB_3V = exports.Y_POWERMODE_USB_5V = undefined;
exports.yFindPwmPowerSource = yFindPwmPowerSource;
exports.yFirstPwmPowerSource = yFirstPwmPowerSource;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YPwmPowerSource return codes)
//--- (end of YPwmPowerSource return codes)
//--- (YPwmPowerSource definitions)
var Y_POWERMODE_USB_5V = exports.Y_POWERMODE_USB_5V = 0;
var Y_POWERMODE_USB_3V = exports.Y_POWERMODE_USB_3V = 1;
var Y_POWERMODE_EXT_V = exports.Y_POWERMODE_EXT_V = 2;
var Y_POWERMODE_OPNDRN = exports.Y_POWERMODE_OPNDRN = 3;
var Y_POWERMODE_INVALID = exports.Y_POWERMODE_INVALID = -1;
//--- (end of YPwmPowerSource definitions)

//--- (YPwmPowerSource class start)
/**
 * YPwmPowerSource Class: PwmPowerSource function interface
 *
 * The Yoctopuce application programming interface allows you to configure
 * the voltage source used by all PWM on the same device.
 */
//--- (end of YPwmPowerSource class start)

class YPwmPowerSource extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YPwmPowerSource constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'PwmPowerSource';
        /** @member {number} **/
        this._powerMode = Y_POWERMODE_INVALID;
        this.imm_setConst({
            POWERMODE_USB_5V: 0,
            POWERMODE_USB_3V: 1,
            POWERMODE_EXT_V: 2,
            POWERMODE_OPNDRN: 3,
            POWERMODE_INVALID: -1
        });
        //--- (end of YPwmPowerSource constructor)
    }

    //--- (YPwmPowerSource implementation)

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
            var res = new YPwmPowerSourceProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'powerMode':
                this._powerMode = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the selected power source for the PWM on the same device.
     *
     * @return {number} a value among YPwmPowerSource.POWERMODE_USB_5V, YPwmPowerSource.POWERMODE_USB_3V,
     * YPwmPowerSource.POWERMODE_EXT_V and YPwmPowerSource.POWERMODE_OPNDRN corresponding to the selected
     * power source for the PWM on the same device
     *
     * On failure, throws an exception or returns YPwmPowerSource.POWERMODE_INVALID.
     */
    get_powerMode() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_POWERMODE_INVALID;
                }
            }
            return _this2._powerMode;
        })();
    }

    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     *
     * @param newval {number} : a value among YPwmPowerSource.POWERMODE_USB_5V,
     * YPwmPowerSource.POWERMODE_USB_3V, YPwmPowerSource.POWERMODE_EXT_V and
     * YPwmPowerSource.POWERMODE_OPNDRN corresponding to  the PWM power source
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerMode(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('powerMode', rest_val);
        })();
    }

    /**
     * Retrieves a voltage source for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the voltage source
     *
     * @return {YPwmPowerSource} a YPwmPowerSource object allowing you to drive the voltage source.
     */
    static FindPwmPowerSource(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('PwmPowerSource', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a voltage source for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage source is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage source by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the voltage source
     *
     * @return {YPwmPowerSource} a YPwmPowerSource object allowing you to drive the voltage source.
     */
    static FindPwmPowerSourceInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'PwmPowerSource', func);
        if (obj == null) {
            obj = new YPwmPowerSource(yctx, func);
            _yocto_api.YFunction._AddToCache('PwmPowerSource', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Voltage sources started using yFirstPwmPowerSource().
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         a voltage source currently online, or a null pointer
     *         if there are no more Voltage sources to enumerate.
     */
    nextPwmPowerSource() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Voltage sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next Voltage sources.
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         the first source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSource() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('PwmPowerSource');
        if (next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSource(next_hwid);
    }

    /**
     * Starts the enumeration of Voltage sources currently accessible.
     * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
     * next Voltage sources.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
     *         the first source currently online, or a null pointer
     *         if there are none.
     */
    static FirstPwmPowerSourceInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PwmPowerSource');
        if (next_hwid == null) return null;
        return YPwmPowerSource.FindPwmPowerSourceInContext(yctx, next_hwid);
    }

    //--- (end of YPwmPowerSource implementation)
}

exports.YPwmPowerSource = YPwmPowerSource; //
// YPwmPowerSourceProxy Class: synchronous proxy to YPwmPowerSource objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPwmPowerSource objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YPwmPowerSourceProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YPwmPowerSource accessors declaration)

    /**
     * Returns the selected power source for the PWM on the same device.
     *
     * @return a value among Y_POWERMODE_USB_5V, Y_POWERMODE_USB_3V, Y_POWERMODE_EXT_V and
     * Y_POWERMODE_OPNDRN corresponding to the selected power source for the PWM on the same device
     *
     * On failure, throws an exception or returns Y_POWERMODE_INVALID.
     */
    get_powerMode() {
        return this.liveFunc._powerMode;
    }

    /**
     * Changes  the PWM power source. PWM can use isolated 5V from USB, isolated 3V from USB or
     * voltage from an external power source. The PWM can also work in open drain  mode. In that
     * mode, the PWM actively pulls the line down.
     * Warning: this setting is common to all PWM on the same device. If you change that parameter,
     * all PWM located on the same device are  affected.
     * If you want the change to be kept after a device reboot, make sure  to call the matching
     * module saveToFlash().
     *
     * @param newval : a value among Y_POWERMODE_USB_5V, Y_POWERMODE_USB_3V, Y_POWERMODE_EXT_V and
     * Y_POWERMODE_OPNDRN corresponding to  the PWM power source
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerMode(newval) {
        this.liveFunc.set_powerMode(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YPwmPowerSource accessors declaration)
}

exports.YPwmPowerSourceProxy = YPwmPowerSourceProxy; //--- (PwmPowerSource functions)

/**
 * Retrieves a voltage source for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the voltage source is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPwmPowerSource.isOnline() to test if the voltage source is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage source by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the voltage source
 *
 * @return {YPwmPowerSource} a YPwmPowerSource object allowing you to drive the voltage source.
 */

function yFindPwmPowerSource(func) {
    return YPwmPowerSource.FindPwmPowerSource(func);
}

/**
 * Starts the enumeration of Voltage sources currently accessible.
 * Use the method YPwmPowerSource.nextPwmPowerSource() to iterate on
 * next Voltage sources.
 *
 * @return {YPwmPowerSource} a pointer to a YPwmPowerSource object, corresponding to
 *         the first source currently online, or a null pointer
 *         if there are none.
 */
function yFirstPwmPowerSource() {
    return YPwmPowerSource.FirstPwmPowerSource();
}

//--- (end of PwmPowerSource functions)
