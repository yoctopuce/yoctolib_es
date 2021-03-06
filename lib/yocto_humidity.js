/*********************************************************************
 *
 * $Id: yocto_humidity.js 26826 2017-03-17 11:20:57Z mvuilleu $
 *
 * Implements the high-level API for Humidity functions
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
exports.YHumidityProxy = exports.YHumidity = exports.Y_ABSHUM_INVALID = exports.Y_RELHUM_INVALID = undefined;
exports.yFindHumidity = yFindHumidity;
exports.yFirstHumidity = yFirstHumidity;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YHumidity return codes)
//--- (end of YHumidity return codes)
//--- (YHumidity definitions)
var Y_RELHUM_INVALID = exports.Y_RELHUM_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_ABSHUM_INVALID = exports.Y_ABSHUM_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YHumidity definitions)

//--- (YHumidity class start)
/**
 * YHumidity Class: Humidity function interface
 *
 * The Yoctopuce class YHumidity allows you to read and configure Yoctopuce humidity
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 */
//--- (end of YHumidity class start)

class YHumidity extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YHumidity constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Humidity';
        /** @member {number} **/
        this._relHum = Y_RELHUM_INVALID;
        /** @member {number} **/
        this._absHum = Y_ABSHUM_INVALID;
        this.imm_setConst({
            RELHUM_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            ABSHUM_INVALID: _yocto_api.YAPI.INVALID_DOUBLE
        });
        //--- (end of YHumidity constructor)
    }

    //--- (YHumidity implementation)

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
            var res = new YHumidityProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'relHum':
                this._relHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'absHum':
                this._absHum = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the primary unit for measuring humidity. That unit is a string.
     * If that strings starts with the letter 'g', the primary measured value is the absolute
     * humidity, in g/m3. Otherwise, the primary measured value will be the relative humidity
     * (RH), in per cents.
     *
     * Remember to call the saveToFlash() method of the module if the modification
     * must be kept.
     *
     * @param newval {string} : a string corresponding to the primary unit for measuring humidity
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this2._setAttr('unit', rest_val);
        })();
    }

    /**
     * Returns the current relative humidity, in per cents.
     *
     * @return {number} a floating point number corresponding to the current relative humidity, in per cents
     *
     * On failure, throws an exception or returns YHumidity.RELHUM_INVALID.
     */
    get_relHum() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_RELHUM_INVALID;
                }
            }
            res = _this3._relHum;
            return res;
        })();
    }

    /**
     * Returns the current absolute humidity, in grams per cubic meter of air.
     *
     * @return {number} a floating point number corresponding to the current absolute humidity, in grams
     * per cubic meter of air
     *
     * On failure, throws an exception or returns YHumidity.ABSHUM_INVALID.
     */
    get_absHum() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_ABSHUM_INVALID;
                }
            }
            res = _this4._absHum;
            return res;
        })();
    }

    /**
     * Retrieves a humidity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the humidity sensor
     *
     * @return {YHumidity} a YHumidity object allowing you to drive the humidity sensor.
     */
    static FindHumidity(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Humidity', func);
        if (obj == null) {
            obj = new YHumidity(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Humidity', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a humidity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the humidity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHumidity.isOnline() to test if the humidity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a humidity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the humidity sensor
     *
     * @return {YHumidity} a YHumidity object allowing you to drive the humidity sensor.
     */
    static FindHumidityInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Humidity', func);
        if (obj == null) {
            obj = new YHumidity(yctx, func);
            _yocto_api.YFunction._AddToCache('Humidity', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of humidity sensors started using yFirstHumidity().
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         a humidity sensor currently online, or a null pointer
     *         if there are no more humidity sensors to enumerate.
     */
    nextHumidity() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YHumidity.FindHumidityInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstHumidity() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Humidity');
        if (next_hwid == null) return null;
        return YHumidity.FindHumidity(next_hwid);
    }

    /**
     * Starts the enumeration of humidity sensors currently accessible.
     * Use the method YHumidity.nextHumidity() to iterate on
     * next humidity sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YHumidity} a pointer to a YHumidity object, corresponding to
     *         the first humidity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstHumidityInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Humidity');
        if (next_hwid == null) return null;
        return YHumidity.FindHumidityInContext(yctx, next_hwid);
    }

    //--- (end of YHumidity implementation)
}

exports.YHumidity = YHumidity; //
// YHumidityProxy Class: synchronous proxy to YHumidity objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YHumidity objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YHumidityProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YHumidity accessors declaration)

    /**
     * Changes the primary unit for measuring humidity. That unit is a string.
     * If that strings starts with the letter 'g', the primary measured value is the absolute
     * humidity, in g/m3. Otherwise, the primary measured value will be the relative humidity
     * (RH), in per cents.
     *
     * Remember to call the saveToFlash() method of the module if the modification
     * must be kept.
     *
     * @param newval : a string corresponding to the primary unit for measuring humidity
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval) {
        this.liveFunc.set_unit(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current relative humidity, in per cents.
     *
     * @return a floating point number corresponding to the current relative humidity, in per cents
     *
     * On failure, throws an exception or returns Y_RELHUM_INVALID.
     */
    get_relHum() {
        return this.liveFunc._relHum;
    }

    /**
     * Returns the current absolute humidity, in grams per cubic meter of air.
     *
     * @return a floating point number corresponding to the current absolute humidity, in grams per cubic meter of air
     *
     * On failure, throws an exception or returns Y_ABSHUM_INVALID.
     */
    get_absHum() {
        return this.liveFunc._absHum;
    }
    //--- (end of YHumidity accessors declaration)
}

exports.YHumidityProxy = YHumidityProxy; //--- (Humidity functions)

/**
 * Retrieves a humidity sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the humidity sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHumidity.isOnline() to test if the humidity sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a humidity sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the humidity sensor
 *
 * @return {YHumidity} a YHumidity object allowing you to drive the humidity sensor.
 */

function yFindHumidity(func) {
    return YHumidity.FindHumidity(func);
}

/**
 * Starts the enumeration of humidity sensors currently accessible.
 * Use the method YHumidity.nextHumidity() to iterate on
 * next humidity sensors.
 *
 * @return {YHumidity} a pointer to a YHumidity object, corresponding to
 *         the first humidity sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstHumidity() {
    return YHumidity.FirstHumidity();
}

//--- (end of Humidity functions)
