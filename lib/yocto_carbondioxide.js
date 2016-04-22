/*********************************************************************
 *
 * $Id: yocto_carbondioxide.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for CarbonDioxide functions
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
exports.YCarbonDioxideProxy = exports.YCarbonDioxide = exports.Y_COMMAND_INVALID = exports.Y_ABCPERIOD_INVALID = undefined;
exports.yFindCarbonDioxide = yFindCarbonDioxide;
exports.yFirstCarbonDioxide = yFirstCarbonDioxide;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YCarbonDioxide return codes)
//--- (end of YCarbonDioxide return codes)
//--- (YCarbonDioxide definitions)
var Y_ABCPERIOD_INVALID = exports.Y_ABCPERIOD_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YCarbonDioxide definitions)

//--- (YCarbonDioxide class start)
/**
 * YCarbonDioxide Class: CarbonDioxide function interface
 *
 * The Yoctopuce class YCarbonDioxide allows you to read and configure Yoctopuce CO2
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to perform manual calibration if reuired.
 */
//--- (end of YCarbonDioxide class start)

class YCarbonDioxide extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YCarbonDioxide constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'CarbonDioxide';
        /** @member {number} **/
        this._abcPeriod = Y_ABCPERIOD_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            ABCPERIOD_INVALID: _yocto_api.YAPI.INVALID_INT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YCarbonDioxide constructor)
    }

    //--- (YCarbonDioxide implementation)

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
            var res = new YCarbonDioxideProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'abcPeriod':
                this._abcPeriod = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return {number} an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns YCarbonDioxide.ABCPERIOD_INVALID.
     */
    get_abcPeriod() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_ABCPERIOD_INVALID;
                }
            }
            return _this2._abcPeriod;
        })();
    }

    /**
     * Modifies Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400ppm CO2), set the
     * period to -1. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_abcPeriod(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('abcPeriod', rest_val);
        })();
    }

    get_command() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this4._command;
        })();
    }

    set_command(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this5._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a CO2 sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the CO2 sensor
     *
     * @return {YCarbonDioxide} a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxide(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('CarbonDioxide', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a CO2 sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the CO2 sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a CO2 sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the CO2 sensor
     *
     * @return {YCarbonDioxide} a YCarbonDioxide object allowing you to drive the CO2 sensor.
     */
    static FindCarbonDioxideInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'CarbonDioxide', func);
        if (obj == null) {
            obj = new YCarbonDioxide(yctx, func);
            _yocto_api.YFunction._AddToCache('CarbonDioxide', func, obj);
        }
        return obj;
    }

    /**
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400ppm.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggetBaselineCalibration() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            return yield _this6.set_command('BC');
        })();
    }

    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggetZeroCalibration() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            return yield _this7.set_command('ZC');
        })();
    }

    /**
     * Continues the enumeration of CO2 sensors started using yFirstCarbonDioxide().
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         a CO2 sensor currently online, or a null pointer
     *         if there are no more CO2 sensors to enumerate.
     */
    nextCarbonDioxide() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxide() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('CarbonDioxide');
        if (next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxide(next_hwid);
    }

    /**
     * Starts the enumeration of CO2 sensors currently accessible.
     * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
     * next CO2 sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
     *         the first CO2 sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCarbonDioxideInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('CarbonDioxide');
        if (next_hwid == null) return null;
        return YCarbonDioxide.FindCarbonDioxideInContext(yctx, next_hwid);
    }

    //--- (end of YCarbonDioxide implementation)
}

exports.YCarbonDioxide = YCarbonDioxide; //
// YCarbonDioxideProxy Class: synchronous proxy to YCarbonDioxide objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCarbonDioxide objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YCarbonDioxideProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YCarbonDioxide accessors declaration)

    /**
     * Returns the Automatic Baseline Calibration period, in hours. A negative value
     * means that automatic baseline calibration is disabled.
     *
     * @return an integer corresponding to the Automatic Baseline Calibration period, in hours
     *
     * On failure, throws an exception or returns Y_ABCPERIOD_INVALID.
     */
    get_abcPeriod() {
        return this.liveFunc._abcPeriod;
    }

    /**
     * Modifies Automatic Baseline Calibration period, in hours. If you need
     * to disable automatic baseline calibration (for instance when using the
     * sensor in an environment that is constantly above 400ppm CO2), set the
     * period to -1. Remember to call the saveToFlash() method of the
     * module if the modification must be kept.
     *
     * @param newval : an integer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_abcPeriod(newval) {
        this.liveFunc.set_abcPeriod(newval);
        return this._yapi.SUCCESS;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Triggers a baseline calibration at standard CO2 ambiant level (400ppm).
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a baseline calibration, make sure to put the sensor
     * in a standard environment (e.g. outside in fresh air) at around 400ppm.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggetBaselineCalibration() {
        this.liveFunc.triggetBaselineCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Triggers a zero calibration of the sensor on carbon dioxide-free air.
     * It is normally not necessary to manually calibrate the sensor, because
     * the built-in automatic baseline calibration procedure will automatically
     * fix any long-term drift based on the lowest level of CO2 observed over the
     * automatic calibration period. However, if you disable automatic baseline
     * calibration, you may want to manually trigger a calibration from time to
     * time. Before starting a zero calibration, you should circulate carbon
     * dioxide-free air within the sensor for a minute or two, using a small pipe
     * connected to the sensor. Please contact support@yoctopuce.com for more details
     * on the zero calibration procedure.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggetZeroCalibration() {
        this.liveFunc.triggetZeroCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YCarbonDioxide accessors declaration)
}

exports.YCarbonDioxideProxy = YCarbonDioxideProxy; //--- (CarbonDioxide functions)

/**
 * Retrieves a CO2 sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the CO2 sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCarbonDioxide.isOnline() to test if the CO2 sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a CO2 sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the CO2 sensor
 *
 * @return {YCarbonDioxide} a YCarbonDioxide object allowing you to drive the CO2 sensor.
 */

function yFindCarbonDioxide(func) {
    return YCarbonDioxide.FindCarbonDioxide(func);
}

/**
 * Starts the enumeration of CO2 sensors currently accessible.
 * Use the method YCarbonDioxide.nextCarbonDioxide() to iterate on
 * next CO2 sensors.
 *
 * @return {YCarbonDioxide} a pointer to a YCarbonDioxide object, corresponding to
 *         the first CO2 sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstCarbonDioxide() {
    return YCarbonDioxide.FirstCarbonDioxide();
}

//--- (end of CarbonDioxide functions)
