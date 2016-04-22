/*********************************************************************
 *
 * $Id: yocto_latitude.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Latitude functions
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
exports.YLatitudeProxy = exports.YLatitude = undefined;
exports.yFindLatitude = yFindLatitude;
exports.yFirstLatitude = yFirstLatitude;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YLatitude return codes)
//--- (end of YLatitude return codes)
//--- (YLatitude definitions)
//--- (end of YLatitude definitions)

//--- (YLatitude class start)
/**
 * YLatitude Class: Latitude function interface
 *
 * The Yoctopuce class YLatitude allows you to read the latitude from Yoctopuce
 * geolocalization sensors. It inherits from the YSensor class the core functions to
 * read measurements, register callback functions, access the autonomous
 * datalogger.
 */
//--- (end of YLatitude class start)

class YLatitude extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YLatitude constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Latitude';
        //--- (end of YLatitude constructor)
    }

    //--- (YLatitude implementation)

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
            var res = new YLatitudeProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    /**
     * Retrieves a latitude sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the latitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLatitude.isOnline() to test if the latitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a latitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the latitude sensor
     *
     * @return {YLatitude} a YLatitude object allowing you to drive the latitude sensor.
     */
    static FindLatitude(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Latitude', func);
        if (obj == null) {
            obj = new YLatitude(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Latitude', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a latitude sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the latitude sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLatitude.isOnline() to test if the latitude sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a latitude sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the latitude sensor
     *
     * @return {YLatitude} a YLatitude object allowing you to drive the latitude sensor.
     */
    static FindLatitudeInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Latitude', func);
        if (obj == null) {
            obj = new YLatitude(yctx, func);
            _yocto_api.YFunction._AddToCache('Latitude', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of latitude sensors started using yFirstLatitude().
     *
     * @return {YLatitude} a pointer to a YLatitude object, corresponding to
     *         a latitude sensor currently online, or a null pointer
     *         if there are no more latitude sensors to enumerate.
     */
    nextLatitude() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YLatitude.FindLatitudeInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of latitude sensors currently accessible.
     * Use the method YLatitude.nextLatitude() to iterate on
     * next latitude sensors.
     *
     * @return {YLatitude} a pointer to a YLatitude object, corresponding to
     *         the first latitude sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLatitude() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Latitude');
        if (next_hwid == null) return null;
        return YLatitude.FindLatitude(next_hwid);
    }

    /**
     * Starts the enumeration of latitude sensors currently accessible.
     * Use the method YLatitude.nextLatitude() to iterate on
     * next latitude sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YLatitude} a pointer to a YLatitude object, corresponding to
     *         the first latitude sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLatitudeInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Latitude');
        if (next_hwid == null) return null;
        return YLatitude.FindLatitudeInContext(yctx, next_hwid);
    }

    //--- (end of YLatitude implementation)
}

exports.YLatitude = YLatitude; //
// YLatitudeProxy Class: synchronous proxy to YLatitude objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YLatitude objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YLatitudeProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YLatitude accessors declaration)
    //--- (end of YLatitude accessors declaration)
}

exports.YLatitudeProxy = YLatitudeProxy; //--- (Latitude functions)

/**
 * Retrieves a latitude sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the latitude sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLatitude.isOnline() to test if the latitude sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a latitude sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the latitude sensor
 *
 * @return {YLatitude} a YLatitude object allowing you to drive the latitude sensor.
 */

function yFindLatitude(func) {
    return YLatitude.FindLatitude(func);
}

/**
 * Starts the enumeration of latitude sensors currently accessible.
 * Use the method YLatitude.nextLatitude() to iterate on
 * next latitude sensors.
 *
 * @return {YLatitude} a pointer to a YLatitude object, corresponding to
 *         the first latitude sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLatitude() {
    return YLatitude.FirstLatitude();
}

//--- (end of Latitude functions)
