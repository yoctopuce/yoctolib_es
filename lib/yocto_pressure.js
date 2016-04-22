/*********************************************************************
 *
 * $Id: yocto_pressure.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Pressure functions
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
exports.YPressureProxy = exports.YPressure = undefined;
exports.yFindPressure = yFindPressure;
exports.yFirstPressure = yFirstPressure;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YPressure return codes)
//--- (end of YPressure return codes)
//--- (YPressure definitions)
//--- (end of YPressure definitions)

//--- (YPressure class start)
/**
 * YPressure Class: Pressure function interface
 *
 * The Yoctopuce class YPressure allows you to read and configure Yoctopuce pressure
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YPressure class start)

class YPressure extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YPressure constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Pressure';
        //--- (end of YPressure constructor)
    }

    //--- (YPressure implementation)

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
            var res = new YPressureProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    /**
     * Retrieves a pressure sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the pressure sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPressure.isOnline() to test if the pressure sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a pressure sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the pressure sensor
     *
     * @return {YPressure} a YPressure object allowing you to drive the pressure sensor.
     */
    static FindPressure(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Pressure', func);
        if (obj == null) {
            obj = new YPressure(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Pressure', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a pressure sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the pressure sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPressure.isOnline() to test if the pressure sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a pressure sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the pressure sensor
     *
     * @return {YPressure} a YPressure object allowing you to drive the pressure sensor.
     */
    static FindPressureInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Pressure', func);
        if (obj == null) {
            obj = new YPressure(yctx, func);
            _yocto_api.YFunction._AddToCache('Pressure', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of pressure sensors started using yFirstPressure().
     *
     * @return {YPressure} a pointer to a YPressure object, corresponding to
     *         a pressure sensor currently online, or a null pointer
     *         if there are no more pressure sensors to enumerate.
     */
    nextPressure() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPressure.FindPressureInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of pressure sensors currently accessible.
     * Use the method YPressure.nextPressure() to iterate on
     * next pressure sensors.
     *
     * @return {YPressure} a pointer to a YPressure object, corresponding to
     *         the first pressure sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPressure() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Pressure');
        if (next_hwid == null) return null;
        return YPressure.FindPressure(next_hwid);
    }

    /**
     * Starts the enumeration of pressure sensors currently accessible.
     * Use the method YPressure.nextPressure() to iterate on
     * next pressure sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPressure} a pointer to a YPressure object, corresponding to
     *         the first pressure sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPressureInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Pressure');
        if (next_hwid == null) return null;
        return YPressure.FindPressureInContext(yctx, next_hwid);
    }

    //--- (end of YPressure implementation)
}

exports.YPressure = YPressure; //
// YPressureProxy Class: synchronous proxy to YPressure objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPressure objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YPressureProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YPressure accessors declaration)
    //--- (end of YPressure accessors declaration)
}

exports.YPressureProxy = YPressureProxy; //--- (Pressure functions)

/**
 * Retrieves a pressure sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the pressure sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPressure.isOnline() to test if the pressure sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a pressure sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the pressure sensor
 *
 * @return {YPressure} a YPressure object allowing you to drive the pressure sensor.
 */

function yFindPressure(func) {
    return YPressure.FindPressure(func);
}

/**
 * Starts the enumeration of pressure sensors currently accessible.
 * Use the method YPressure.nextPressure() to iterate on
 * next pressure sensors.
 *
 * @return {YPressure} a pointer to a YPressure object, corresponding to
 *         the first pressure sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstPressure() {
    return YPressure.FirstPressure();
}

//--- (end of Pressure functions)
