/*********************************************************************
 *
 * $Id: yocto_magnetometer.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Magnetometer functions
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
exports.YMagnetometerProxy = exports.YMagnetometer = exports.Y_ZVALUE_INVALID = exports.Y_YVALUE_INVALID = exports.Y_XVALUE_INVALID = undefined;
exports.yFindMagnetometer = yFindMagnetometer;
exports.yFirstMagnetometer = yFirstMagnetometer;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YMagnetometer return codes)
//--- (end of YMagnetometer return codes)
//--- (YMagnetometer definitions)
var Y_XVALUE_INVALID = exports.Y_XVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_YVALUE_INVALID = exports.Y_YVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_ZVALUE_INVALID = exports.Y_ZVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YMagnetometer definitions)

//--- (YMagnetometer class start)
/**
 * YMagnetometer Class: Magnetometer function interface
 *
 * The YSensor class is the parent class for all Yoctopuce sensors. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of YMagnetometer class start)

class YMagnetometer extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YMagnetometer constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Magnetometer';
        /** @member {number} **/
        this._xValue = Y_XVALUE_INVALID;
        /** @member {number} **/
        this._yValue = Y_YVALUE_INVALID;
        /** @member {number} **/
        this._zValue = Y_ZVALUE_INVALID;
        this.imm_setConst({
            XVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            YVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            ZVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE
        });
        //--- (end of YMagnetometer constructor)
    }

    //--- (YMagnetometer implementation)

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
            var res = new YMagnetometerProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'xValue':
                this._xValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'yValue':
                this._yValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'zValue':
                this._zValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the X component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.XVALUE_INVALID.
     */
    get_xValue() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_XVALUE_INVALID;
                }
            }
            return _this2._xValue;
        })();
    }

    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the Y component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.YVALUE_INVALID.
     */
    get_yValue() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_YVALUE_INVALID;
                }
            }
            return _this3._yValue;
        })();
    }

    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the Z component of the magnetic field, as
     * a floating point number
     *
     * On failure, throws an exception or returns YMagnetometer.ZVALUE_INVALID.
     */
    get_zValue() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_ZVALUE_INVALID;
                }
            }
            return _this4._zValue;
        })();
    }

    /**
     * Retrieves a magnetometer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the magnetometer
     *
     * @return {YMagnetometer} a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometer(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Magnetometer', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a magnetometer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the magnetometer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMagnetometer.isOnline() to test if the magnetometer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a magnetometer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the magnetometer
     *
     * @return {YMagnetometer} a YMagnetometer object allowing you to drive the magnetometer.
     */
    static FindMagnetometerInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Magnetometer', func);
        if (obj == null) {
            obj = new YMagnetometer(yctx, func);
            _yocto_api.YFunction._AddToCache('Magnetometer', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of magnetometers started using yFirstMagnetometer().
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         a magnetometer currently online, or a null pointer
     *         if there are no more magnetometers to enumerate.
     */
    nextMagnetometer() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometer() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Magnetometer');
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometer(next_hwid);
    }

    /**
     * Starts the enumeration of magnetometers currently accessible.
     * Use the method YMagnetometer.nextMagnetometer() to iterate on
     * next magnetometers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
     *         the first magnetometer currently online, or a null pointer
     *         if there are none.
     */
    static FirstMagnetometerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Magnetometer');
        if (next_hwid == null) return null;
        return YMagnetometer.FindMagnetometerInContext(yctx, next_hwid);
    }

    //--- (end of YMagnetometer implementation)
}

exports.YMagnetometer = YMagnetometer; //
// YMagnetometerProxy Class: synchronous proxy to YMagnetometer objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMagnetometer objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YMagnetometerProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YMagnetometer accessors declaration)

    /**
     * Returns the X component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the X component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    get_xValue() {
        return this.liveFunc._xValue;
    }

    /**
     * Returns the Y component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Y component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    get_yValue() {
        return this.liveFunc._yValue;
    }

    /**
     * Returns the Z component of the magnetic field, as a floating point number.
     *
     * @return a floating point number corresponding to the Z component of the magnetic field, as a
     * floating point number
     *
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    get_zValue() {
        return this.liveFunc._zValue;
    }
    //--- (end of YMagnetometer accessors declaration)
}

exports.YMagnetometerProxy = YMagnetometerProxy; //--- (Magnetometer functions)

/**
 * Retrieves a magnetometer for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the magnetometer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMagnetometer.isOnline() to test if the magnetometer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a magnetometer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the magnetometer
 *
 * @return {YMagnetometer} a YMagnetometer object allowing you to drive the magnetometer.
 */

function yFindMagnetometer(func) {
    return YMagnetometer.FindMagnetometer(func);
}

/**
 * Starts the enumeration of magnetometers currently accessible.
 * Use the method YMagnetometer.nextMagnetometer() to iterate on
 * next magnetometers.
 *
 * @return {YMagnetometer} a pointer to a YMagnetometer object, corresponding to
 *         the first magnetometer currently online, or a null pointer
 *         if there are none.
 */
function yFirstMagnetometer() {
    return YMagnetometer.FirstMagnetometer();
}

//--- (end of Magnetometer functions)
