/*********************************************************************
 *
 * $Id: yocto_lightsensor.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for LightSensor functions
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
exports.YLightSensorProxy = exports.YLightSensor = exports.Y_MEASURETYPE_INVALID = exports.Y_MEASURETYPE_HIGH_ENERGY = exports.Y_MEASURETYPE_HIGH_RATE = exports.Y_MEASURETYPE_INFRARED = exports.Y_MEASURETYPE_WIDE_SPECTRUM = exports.Y_MEASURETYPE_HUMAN_EYE = undefined;
exports.yFindLightSensor = yFindLightSensor;
exports.yFirstLightSensor = yFirstLightSensor;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YLightSensor return codes)
//--- (end of YLightSensor return codes)
//--- (YLightSensor definitions)
var Y_MEASURETYPE_HUMAN_EYE = exports.Y_MEASURETYPE_HUMAN_EYE = 0;
var Y_MEASURETYPE_WIDE_SPECTRUM = exports.Y_MEASURETYPE_WIDE_SPECTRUM = 1;
var Y_MEASURETYPE_INFRARED = exports.Y_MEASURETYPE_INFRARED = 2;
var Y_MEASURETYPE_HIGH_RATE = exports.Y_MEASURETYPE_HIGH_RATE = 3;
var Y_MEASURETYPE_HIGH_ENERGY = exports.Y_MEASURETYPE_HIGH_ENERGY = 4;
var Y_MEASURETYPE_INVALID = exports.Y_MEASURETYPE_INVALID = -1;
//--- (end of YLightSensor definitions)

//--- (YLightSensor class start)
/**
 * YLightSensor Class: LightSensor function interface
 *
 * The Yoctopuce class YLightSensor allows you to read and configure Yoctopuce light
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 * For some light sensors with several working modes, this class can select the
 * desired working mode.
 */
//--- (end of YLightSensor class start)

class YLightSensor extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YLightSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'LightSensor';
        /** @member {number} **/
        this._measureType = Y_MEASURETYPE_INVALID;
        this.imm_setConst({
            MEASURETYPE_HUMAN_EYE: 0,
            MEASURETYPE_WIDE_SPECTRUM: 1,
            MEASURETYPE_INFRARED: 2,
            MEASURETYPE_HIGH_RATE: 3,
            MEASURETYPE_HIGH_ENERGY: 4,
            MEASURETYPE_INVALID: -1
        });
        //--- (end of YLightSensor constructor)
    }

    //--- (YLightSensor implementation)

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
            var res = new YLightSensorProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'measureType':
                this._measureType = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    set_currentValue(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this2._setAttr('currentValue', rest_val);
        })();
    }

    /**
     * Changes the sensor-specific calibration parameter so that the current value
     * matches a desired target (linear scaling).
     *
     * @param calibratedVal {number} : the desired target value.
     *
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    calibrate(calibratedVal) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(calibratedVal * 65536.0));
            return yield _this3._setAttr('currentValue', rest_val);
        })();
    }

    /**
     * Returns the type of light measure.
     *
     * @return {number} a value among YLightSensor.MEASURETYPE_HUMAN_EYE,
     * YLightSensor.MEASURETYPE_WIDE_SPECTRUM, YLightSensor.MEASURETYPE_INFRARED,
     * YLightSensor.MEASURETYPE_HIGH_RATE and YLightSensor.MEASURETYPE_HIGH_ENERGY corresponding to the
     * type of light measure
     *
     * On failure, throws an exception or returns YLightSensor.MEASURETYPE_INVALID.
     */
    get_measureType() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_MEASURETYPE_INVALID;
                }
            }
            return _this4._measureType;
        })();
    }

    /**
     * Modify the light sensor type used in the device. The measure can either
     * approximate the response of the human eye, focus on a specific light
     * spectrum, depending on the capabilities of the light-sensitive cell.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YLightSensor.MEASURETYPE_HUMAN_EYE,
     * YLightSensor.MEASURETYPE_WIDE_SPECTRUM, YLightSensor.MEASURETYPE_INFRARED,
     * YLightSensor.MEASURETYPE_HIGH_RATE and YLightSensor.MEASURETYPE_HIGH_ENERGY
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_measureType(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('measureType', rest_val);
        })();
    }

    /**
     * Retrieves a light sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the light sensor
     *
     * @return {YLightSensor} a YLightSensor object allowing you to drive the light sensor.
     */
    static FindLightSensor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('LightSensor', func);
        if (obj == null) {
            obj = new YLightSensor(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('LightSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a light sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the light sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YLightSensor.isOnline() to test if the light sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a light sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the light sensor
     *
     * @return {YLightSensor} a YLightSensor object allowing you to drive the light sensor.
     */
    static FindLightSensorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'LightSensor', func);
        if (obj == null) {
            obj = new YLightSensor(yctx, func);
            _yocto_api.YFunction._AddToCache('LightSensor', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of light sensors started using yFirstLightSensor().
     *
     * @return {YLightSensor} a pointer to a YLightSensor object, corresponding to
     *         a light sensor currently online, or a null pointer
     *         if there are no more light sensors to enumerate.
     */
    nextLightSensor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YLightSensor.FindLightSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     *
     * @return {YLightSensor} a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLightSensor() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('LightSensor');
        if (next_hwid == null) return null;
        return YLightSensor.FindLightSensor(next_hwid);
    }

    /**
     * Starts the enumeration of light sensors currently accessible.
     * Use the method YLightSensor.nextLightSensor() to iterate on
     * next light sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YLightSensor} a pointer to a YLightSensor object, corresponding to
     *         the first light sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstLightSensorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('LightSensor');
        if (next_hwid == null) return null;
        return YLightSensor.FindLightSensorInContext(yctx, next_hwid);
    }

    //--- (end of YLightSensor implementation)
}

exports.YLightSensor = YLightSensor; //
// YLightSensorProxy Class: synchronous proxy to YLightSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YLightSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YLightSensorProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YLightSensor accessors declaration)

    set_currentValue(newval) {
        this.liveFunc.set_currentValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the type of light measure.
     *
     * @return a value among Y_MEASURETYPE_HUMAN_EYE, Y_MEASURETYPE_WIDE_SPECTRUM, Y_MEASURETYPE_INFRARED,
     * Y_MEASURETYPE_HIGH_RATE and Y_MEASURETYPE_HIGH_ENERGY corresponding to the type of light measure
     *
     * On failure, throws an exception or returns Y_MEASURETYPE_INVALID.
     */
    get_measureType() {
        return this.liveFunc._measureType;
    }

    /**
     * Modify the light sensor type used in the device. The measure can either
     * approximate the response of the human eye, focus on a specific light
     * spectrum, depending on the capabilities of the light-sensitive cell.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_MEASURETYPE_HUMAN_EYE, Y_MEASURETYPE_WIDE_SPECTRUM,
     * Y_MEASURETYPE_INFRARED, Y_MEASURETYPE_HIGH_RATE and Y_MEASURETYPE_HIGH_ENERGY
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_measureType(newval) {
        this.liveFunc.set_measureType(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YLightSensor accessors declaration)
}

exports.YLightSensorProxy = YLightSensorProxy; //--- (LightSensor functions)

/**
 * Retrieves a light sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the light sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YLightSensor.isOnline() to test if the light sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a light sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the light sensor
 *
 * @return {YLightSensor} a YLightSensor object allowing you to drive the light sensor.
 */

function yFindLightSensor(func) {
    return YLightSensor.FindLightSensor(func);
}

/**
 * Starts the enumeration of light sensors currently accessible.
 * Use the method YLightSensor.nextLightSensor() to iterate on
 * next light sensors.
 *
 * @return {YLightSensor} a pointer to a YLightSensor object, corresponding to
 *         the first light sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstLightSensor() {
    return YLightSensor.FirstLightSensor();
}

//--- (end of LightSensor functions)
