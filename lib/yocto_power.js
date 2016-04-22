/*********************************************************************
 *
 * $Id: yocto_power.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Power functions
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
exports.YPowerProxy = exports.YPower = exports.Y_METERTIMER_INVALID = exports.Y_METER_INVALID = exports.Y_COSPHI_INVALID = undefined;
exports.yFindPower = yFindPower;
exports.yFirstPower = yFirstPower;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YPower return codes)
//--- (end of YPower return codes)
//--- (YPower definitions)
var Y_COSPHI_INVALID = exports.Y_COSPHI_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_METER_INVALID = exports.Y_METER_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_METERTIMER_INVALID = exports.Y_METERTIMER_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YPower definitions)

//--- (YPower class start)
/**
 * YPower Class: Power function interface
 *
 * The Yoctopuce class YPower allows you to read and configure Yoctopuce power
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to access the energy counter and the power factor.
 */
//--- (end of YPower class start)

class YPower extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YPower constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Power';
        /** @member {number} **/
        this._cosPhi = Y_COSPHI_INVALID;
        /** @member {number} **/
        this._meter = Y_METER_INVALID;
        /** @member {number} **/
        this._meterTimer = Y_METERTIMER_INVALID;
        this.imm_setConst({
            COSPHI_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            METER_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            METERTIMER_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YPower constructor)
    }

    //--- (YPower implementation)

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
            var res = new YPowerProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'cosPhi':
                this._cosPhi = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'meter':
                this._meter = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'meterTimer':
                this._meterTimer = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the power factor (the ratio between the real power consumed,
     * measured in W, and the apparent power provided, measured in VA).
     *
     * @return {number} a floating point number corresponding to the power factor (the ratio between the
     * real power consumed,
     *         measured in W, and the apparent power provided, measured in VA)
     *
     * On failure, throws an exception or returns YPower.COSPHI_INVALID.
     */
    get_cosPhi() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_COSPHI_INVALID;
                }
            }
            return _this2._cosPhi;
        })();
    }

    set_meter(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this3._setAttr('meter', rest_val);
        })();
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time.
     * Note that this counter is reset at each start of the device.
     *
     * @return {number} a floating point number corresponding to the energy counter, maintained by the
     * wattmeter by integrating the power consumption over time
     *
     * On failure, throws an exception or returns YPower.METER_INVALID.
     */
    get_meter() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_METER_INVALID;
                }
            }
            return _this4._meter;
        })();
    }

    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     *
     * @return {number} an integer corresponding to the elapsed time since last energy counter reset, in seconds
     *
     * On failure, throws an exception or returns YPower.METERTIMER_INVALID.
     */
    get_meterTimer() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_METERTIMER_INVALID;
                }
            }
            return _this5._meterTimer;
        })();
    }

    /**
     * Retrieves a electrical power sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the electrical power sensor
     *
     * @return {YPower} a YPower object allowing you to drive the electrical power sensor.
     */
    static FindPower(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Power', func);
        if (obj == null) {
            obj = new YPower(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Power', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a electrical power sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the electrical power sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YPower.isOnline() to test if the electrical power sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a electrical power sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the electrical power sensor
     *
     * @return {YPower} a YPower object allowing you to drive the electrical power sensor.
     */
    static FindPowerInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Power', func);
        if (obj == null) {
            obj = new YPower(yctx, func);
            _yocto_api.YFunction._AddToCache('Power', func, obj);
        }
        return obj;
    }

    /**
     * Resets the energy counter.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            return yield _this6.set_meter(0);
        })();
    }

    /**
     * Continues the enumeration of electrical power sensors started using yFirstPower().
     *
     * @return {YPower} a pointer to a YPower object, corresponding to
     *         a electrical power sensor currently online, or a null pointer
     *         if there are no more electrical power sensors to enumerate.
     */
    nextPower() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YPower.FindPowerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     *
     * @return {YPower} a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPower() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Power');
        if (next_hwid == null) return null;
        return YPower.FindPower(next_hwid);
    }

    /**
     * Starts the enumeration of electrical power sensors currently accessible.
     * Use the method YPower.nextPower() to iterate on
     * next electrical power sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YPower} a pointer to a YPower object, corresponding to
     *         the first electrical power sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstPowerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Power');
        if (next_hwid == null) return null;
        return YPower.FindPowerInContext(yctx, next_hwid);
    }

    //--- (end of YPower implementation)
}

exports.YPower = YPower; //
// YPowerProxy Class: synchronous proxy to YPower objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YPower objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YPowerProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YPower accessors declaration)

    /**
     * Returns the power factor (the ratio between the real power consumed,
     * measured in W, and the apparent power provided, measured in VA).
     *
     * @return a floating point number corresponding to the power factor (the ratio between the real power consumed,
     *         measured in W, and the apparent power provided, measured in VA)
     *
     * On failure, throws an exception or returns Y_COSPHI_INVALID.
     */
    get_cosPhi() {
        return this.liveFunc._cosPhi;
    }

    set_meter(newval) {
        this.liveFunc.set_meter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the energy counter, maintained by the wattmeter by integrating the power consumption over time.
     * Note that this counter is reset at each start of the device.
     *
     * @return a floating point number corresponding to the energy counter, maintained by the wattmeter by
     * integrating the power consumption over time
     *
     * On failure, throws an exception or returns Y_METER_INVALID.
     */
    get_meter() {
        return this.liveFunc._meter;
    }

    /**
     * Returns the elapsed time since last energy counter reset, in seconds.
     *
     * @return an integer corresponding to the elapsed time since last energy counter reset, in seconds
     *
     * On failure, throws an exception or returns Y_METERTIMER_INVALID.
     */
    get_meterTimer() {
        return this.liveFunc._meterTimer;
    }

    /**
     * Resets the energy counter.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset() {
        this.liveFunc.reset();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YPower accessors declaration)
}

exports.YPowerProxy = YPowerProxy; //--- (Power functions)

/**
 * Retrieves a electrical power sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the electrical power sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YPower.isOnline() to test if the electrical power sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a electrical power sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the electrical power sensor
 *
 * @return {YPower} a YPower object allowing you to drive the electrical power sensor.
 */

function yFindPower(func) {
    return YPower.FindPower(func);
}

/**
 * Starts the enumeration of electrical power sensors currently accessible.
 * Use the method YPower.nextPower() to iterate on
 * next electrical power sensors.
 *
 * @return {YPower} a pointer to a YPower object, corresponding to
 *         the first electrical power sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstPower() {
    return YPower.FirstPower();
}

//--- (end of Power functions)
