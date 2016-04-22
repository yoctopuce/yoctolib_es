/*********************************************************************
 *
 * $Id: yocto_poweroutput.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for PowerOutput functions
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
exports.YPowerOutputProxy = exports.YPowerOutput = exports.Y_VOLTAGE_INVALID = exports.Y_VOLTAGE_OUT5V = exports.Y_VOLTAGE_OUT3V3 = exports.Y_VOLTAGE_OFF = undefined;
exports.yFindPowerOutput = yFindPowerOutput;
exports.yFirstPowerOutput = yFirstPowerOutput;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YPowerOutput return codes)
//--- (end of YPowerOutput return codes)
//--- (YPowerOutput definitions)
var Y_VOLTAGE_OFF = exports.Y_VOLTAGE_OFF = 0;
var Y_VOLTAGE_OUT3V3 = exports.Y_VOLTAGE_OUT3V3 = 1;
var Y_VOLTAGE_OUT5V = exports.Y_VOLTAGE_OUT5V = 2;
var Y_VOLTAGE_INVALID = exports.Y_VOLTAGE_INVALID = -1;
//--- (end of YPowerOutput definitions)

//--- (YPowerOutput class start)
/**
 * YPowerOutput Class: External power supply control interface
 *
 * Yoctopuce application programming interface allows you to control
 * the power ouput featured on some devices such as the Yocto-Serial.
 */
//--- (end of YPowerOutput class start)

class YPowerOutput extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YPowerOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'PowerOutput';
        /** @member {number} **/
        this._voltage = Y_VOLTAGE_INVALID;
        this.imm_setConst({
            VOLTAGE_OFF: 0,
            VOLTAGE_OUT3V3: 1,
            VOLTAGE_OUT5V: 2,
            VOLTAGE_INVALID: -1
        });
        //--- (end of YPowerOutput constructor)
    }

    //--- (YPowerOutput implementation)

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
            var res = new YPowerOutputProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'voltage':
                this._voltage = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the voltage on the power ouput featured by
     * the module.
     *
     * @return {number} a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3 and
     * YPowerOutput.VOLTAGE_OUT5V corresponding to the voltage on the power ouput featured by
     *         the module
     *
     * On failure, throws an exception or returns YPowerOutput.VOLTAGE_INVALID.
     */
    get_voltage() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_VOLTAGE_INVALID;
                }
            }
            return _this2._voltage;
        })();
    }

    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YPowerOutput.VOLTAGE_OFF, YPowerOutput.VOLTAGE_OUT3V3 and
     * YPowerOutput.VOLTAGE_OUT5V corresponding to the voltage on the power output provided by the
     *         module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltage(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('voltage', rest_val);
        })();
    }

    /**
     * Retrieves a dual power  ouput control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power ouput control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power ouput control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power  ouput control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the power ouput control
     *
     * @return {YPowerOutput} a YPowerOutput object allowing you to drive the power ouput control.
     */
    static FindPowerOutput(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('PowerOutput', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a dual power  ouput control for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power ouput control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPowerOutput.isOnline() to test if the power ouput control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power  ouput control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the power ouput control
     *
     * @return {YPowerOutput} a YPowerOutput object allowing you to drive the power ouput control.
     */
    static FindPowerOutputInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'PowerOutput', func);
        if (obj == null) {
            obj = new YPowerOutput(yctx, func);
            _yocto_api.YFunction._AddToCache('PowerOutput', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of dual power ouput controls started using yFirstPowerOutput().
     *
     * @return {YPowerOutput} a pointer to a YPowerOutput object, corresponding to
     *         a dual power  ouput control currently online, or a null pointer
     *         if there are no more dual power ouput controls to enumerate.
     */
    nextPowerOutput() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPowerOutput.FindPowerOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of dual power ouput controls currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next dual power ouput controls.
     *
     * @return {YPowerOutput} a pointer to a YPowerOutput object, corresponding to
     *         the first dual power ouput control currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutput() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('PowerOutput');
        if (next_hwid == null) return null;
        return YPowerOutput.FindPowerOutput(next_hwid);
    }

    /**
     * Starts the enumeration of dual power ouput controls currently accessible.
     * Use the method YPowerOutput.nextPowerOutput() to iterate on
     * next dual power ouput controls.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPowerOutput} a pointer to a YPowerOutput object, corresponding to
     *         the first dual power ouput control currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerOutputInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('PowerOutput');
        if (next_hwid == null) return null;
        return YPowerOutput.FindPowerOutputInContext(yctx, next_hwid);
    }

    //--- (end of YPowerOutput implementation)
}

exports.YPowerOutput = YPowerOutput; //
// YPowerOutputProxy Class: synchronous proxy to YPowerOutput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPowerOutput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YPowerOutputProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YPowerOutput accessors declaration)

    /**
     * Returns the voltage on the power ouput featured by
     * the module.
     *
     * @return a value among Y_VOLTAGE_OFF, Y_VOLTAGE_OUT3V3 and Y_VOLTAGE_OUT5V corresponding to the
     * voltage on the power ouput featured by
     *         the module
     *
     * On failure, throws an exception or returns Y_VOLTAGE_INVALID.
     */
    get_voltage() {
        return this.liveFunc._voltage;
    }

    /**
     * Changes the voltage on the power output provided by the
     * module. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_VOLTAGE_OFF, Y_VOLTAGE_OUT3V3 and Y_VOLTAGE_OUT5V corresponding to
     * the voltage on the power output provided by the
     *         module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltage(newval) {
        this.liveFunc.set_voltage(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YPowerOutput accessors declaration)
}

exports.YPowerOutputProxy = YPowerOutputProxy; //--- (PowerOutput functions)

/**
 * Retrieves a dual power  ouput control for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the power ouput control is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPowerOutput.isOnline() to test if the power ouput control is
 * indeed online at a given time. In case of ambiguity when looking for
 * a dual power  ouput control by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the power ouput control
 *
 * @return {YPowerOutput} a YPowerOutput object allowing you to drive the power ouput control.
 */

function yFindPowerOutput(func) {
    return YPowerOutput.FindPowerOutput(func);
}

/**
 * Starts the enumeration of dual power ouput controls currently accessible.
 * Use the method YPowerOutput.nextPowerOutput() to iterate on
 * next dual power ouput controls.
 *
 * @return {YPowerOutput} a pointer to a YPowerOutput object, corresponding to
 *         the first dual power ouput control currently online, or a null pointer
 *         if there are none.
 */
function yFirstPowerOutput() {
    return YPowerOutput.FirstPowerOutput();
}

//--- (end of PowerOutput functions)
