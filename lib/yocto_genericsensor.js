/*********************************************************************
 *
 * $Id: yocto_genericsensor.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for GenericSensor functions
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
exports.YGenericSensorProxy = exports.YGenericSensor = exports.Y_SIGNALBIAS_INVALID = exports.Y_VALUERANGE_INVALID = exports.Y_SIGNALRANGE_INVALID = exports.Y_SIGNALUNIT_INVALID = exports.Y_SIGNALVALUE_INVALID = exports.Y_SIGNALSAMPLING_INVALID = exports.Y_SIGNALSAMPLING_LOW_NOISE_FILTERED = exports.Y_SIGNALSAMPLING_LOW_NOISE = exports.Y_SIGNALSAMPLING_HIGH_RATE_FILTERED = exports.Y_SIGNALSAMPLING_HIGH_RATE = undefined;
exports.yFindGenericSensor = yFindGenericSensor;
exports.yFirstGenericSensor = yFirstGenericSensor;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YGenericSensor return codes)
//--- (end of YGenericSensor return codes)
//--- (YGenericSensor definitions)
var Y_SIGNALSAMPLING_HIGH_RATE = exports.Y_SIGNALSAMPLING_HIGH_RATE = 0;
var Y_SIGNALSAMPLING_HIGH_RATE_FILTERED = exports.Y_SIGNALSAMPLING_HIGH_RATE_FILTERED = 1;
var Y_SIGNALSAMPLING_LOW_NOISE = exports.Y_SIGNALSAMPLING_LOW_NOISE = 2;
var Y_SIGNALSAMPLING_LOW_NOISE_FILTERED = exports.Y_SIGNALSAMPLING_LOW_NOISE_FILTERED = 3;
var Y_SIGNALSAMPLING_INVALID = exports.Y_SIGNALSAMPLING_INVALID = -1;
var Y_SIGNALVALUE_INVALID = exports.Y_SIGNALVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_SIGNALUNIT_INVALID = exports.Y_SIGNALUNIT_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SIGNALRANGE_INVALID = exports.Y_SIGNALRANGE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_VALUERANGE_INVALID = exports.Y_VALUERANGE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SIGNALBIAS_INVALID = exports.Y_SIGNALBIAS_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YGenericSensor definitions)

//--- (YGenericSensor class start)
/**
 * YGenericSensor Class: GenericSensor function interface
 *
 * The YGenericSensor class allows you to read and configure Yoctopuce signal
 * transducers. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure the automatic conversion between the
 * measured signal and the corresponding engineering unit.
 */
//--- (end of YGenericSensor class start)

class YGenericSensor extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YGenericSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'GenericSensor';
        /** @member {number} **/
        this._signalValue = Y_SIGNALVALUE_INVALID;
        /** @member {string} **/
        this._signalUnit = Y_SIGNALUNIT_INVALID;
        /** @member {string} **/
        this._signalRange = Y_SIGNALRANGE_INVALID;
        /** @member {string} **/
        this._valueRange = Y_VALUERANGE_INVALID;
        /** @member {number} **/
        this._signalBias = Y_SIGNALBIAS_INVALID;
        /** @member {number} **/
        this._signalSampling = Y_SIGNALSAMPLING_INVALID;
        this.imm_setConst({
            SIGNALVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            SIGNALUNIT_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SIGNALRANGE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            VALUERANGE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SIGNALBIAS_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            SIGNALSAMPLING_HIGH_RATE: 0,
            SIGNALSAMPLING_HIGH_RATE_FILTERED: 1,
            SIGNALSAMPLING_LOW_NOISE: 2,
            SIGNALSAMPLING_LOW_NOISE_FILTERED: 3,
            SIGNALSAMPLING_INVALID: -1
        });
        //--- (end of YGenericSensor constructor)
    }

    //--- (YGenericSensor implementation)

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
            var res = new YGenericSensorProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'signalValue':
                this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'signalUnit':
                this._signalUnit = val;
                return 1;
            case 'signalRange':
                this._signalRange = val;
                return 1;
            case 'valueRange':
                this._valueRange = val;
                return 1;
            case 'signalBias':
                this._signalBias = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'signalSampling':
                this._signalSampling = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured value
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
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return {number} a floating point number corresponding to the current value of the electrical
     * signal measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_SIGNALVALUE_INVALID;
                }
            }
            return Math.round(_this3._signalValue * 1000) / 1000;
        })();
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return {string} a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALUNIT_INVALID.
     */
    get_signalUnit() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration == 0) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_SIGNALUNIT_INVALID;
                }
            }
            return _this4._signalUnit;
        })();
    }

    /**
     * Returns the electric signal range used by the sensor.
     *
     * @return {string} a string corresponding to the electric signal range used by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALRANGE_INVALID.
     */
    get_signalRange() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_SIGNALRANGE_INVALID;
                }
            }
            return _this5._signalRange;
        })();
    }

    /**
     * Changes the electric signal range used by the sensor.
     *
     * @param newval {string} : a string corresponding to the electric signal range used by the sensor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalRange(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this6._setAttr('signalRange', rest_val);
        })();
    }

    /**
     * Returns the physical value range measured by the sensor.
     *
     * @return {string} a string corresponding to the physical value range measured by the sensor
     *
     * On failure, throws an exception or returns YGenericSensor.VALUERANGE_INVALID.
     */
    get_valueRange() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_VALUERANGE_INVALID;
                }
            }
            return _this7._valueRange;
        })();
    }

    /**
     * Changes the physical value range measured by the sensor. As a side effect, the range modification may
     * automatically modify the display resolution.
     *
     * @param newval {string} : a string corresponding to the physical value range measured by the sensor
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_valueRange(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this8._setAttr('valueRange', rest_val);
        })();
    }

    /**
     * Changes the electric signal bias for zero shift adjustment.
     * If your electric signal reads positif when it should be zero, setup
     * a positive signalBias of the same value to fix the zero shift.
     *
     * @param newval {number} : a floating point number corresponding to the electric signal bias for zero
     * shift adjustment
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalBias(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this9._setAttr('signalBias', rest_val);
        })();
    }

    /**
     * Returns the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is underreporting the measure.
     *
     * @return {number} a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALBIAS_INVALID.
     */
    get_signalBias() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_SIGNALBIAS_INVALID;
                }
            }
            return _this10._signalBias;
        })();
    }

    /**
     * Returns the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @return {number} a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE and
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED corresponding to the electric signal sampling method to use
     *
     * On failure, throws an exception or returns YGenericSensor.SIGNALSAMPLING_INVALID.
     */
    get_signalSampling() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_SIGNALSAMPLING_INVALID;
                }
            }
            return _this11._signalSampling;
        })();
    }

    /**
     * Changes the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @param newval {number} : a value among YGenericSensor.SIGNALSAMPLING_HIGH_RATE,
     * YGenericSensor.SIGNALSAMPLING_HIGH_RATE_FILTERED, YGenericSensor.SIGNALSAMPLING_LOW_NOISE and
     * YGenericSensor.SIGNALSAMPLING_LOW_NOISE_FILTERED corresponding to the electric signal sampling method to use
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalSampling(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this12._setAttr('signalSampling', rest_val);
        })();
    }

    /**
     * Retrieves a generic sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the generic sensor
     *
     * @return {YGenericSensor} a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('GenericSensor', func);
        if (obj == null) {
            obj = new YGenericSensor(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('GenericSensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a generic sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the generic sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGenericSensor.isOnline() to test if the generic sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a generic sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the generic sensor
     *
     * @return {YGenericSensor} a YGenericSensor object allowing you to drive the generic sensor.
     */
    static FindGenericSensorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'GenericSensor', func);
        if (obj == null) {
            obj = new YGenericSensor(yctx, func);
            _yocto_api.YFunction._AddToCache('GenericSensor', func, obj);
        }
        return obj;
    }

    /**
     * Adjusts the signal bias so that the current signal value is need
     * precisely as zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    zeroAdjust() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currSignal;
            /** @type {number} **/
            let currBias;
            currSignal = yield _this13.get_signalValue();
            currBias = yield _this13.get_signalBias();
            return yield _this13.set_signalBias(currSignal + currBias);
        })();
    }

    /**
     * Continues the enumeration of generic sensors started using yFirstGenericSensor().
     *
     * @return {YGenericSensor} a pointer to a YGenericSensor object, corresponding to
     *         a generic sensor currently online, or a null pointer
     *         if there are no more generic sensors to enumerate.
     */
    nextGenericSensor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @return {YGenericSensor} a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensor() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('GenericSensor');
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensor(next_hwid);
    }

    /**
     * Starts the enumeration of generic sensors currently accessible.
     * Use the method YGenericSensor.nextGenericSensor() to iterate on
     * next generic sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YGenericSensor} a pointer to a YGenericSensor object, corresponding to
     *         the first generic sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstGenericSensorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('GenericSensor');
        if (next_hwid == null) return null;
        return YGenericSensor.FindGenericSensorInContext(yctx, next_hwid);
    }

    //--- (end of YGenericSensor implementation)
}

exports.YGenericSensor = YGenericSensor; //
// YGenericSensorProxy Class: synchronous proxy to YGenericSensor objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YGenericSensor objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YGenericSensorProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YGenericSensor accessors declaration)

    /**
     * Changes the measuring unit for the measured value.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the measuring unit for the measured value
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
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        return this.liveFunc._signalValue;
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     */
    get_signalUnit() {
        return this.liveFunc._signalUnit;
    }

    /**
     * Returns the electric signal range used by the sensor.
     *
     * @return a string corresponding to the electric signal range used by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALRANGE_INVALID.
     */
    get_signalRange() {
        return this.liveFunc._signalRange;
    }

    /**
     * Changes the electric signal range used by the sensor.
     *
     * @param newval : a string corresponding to the electric signal range used by the sensor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalRange(newval) {
        this.liveFunc.set_signalRange(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the physical value range measured by the sensor.
     *
     * @return a string corresponding to the physical value range measured by the sensor
     *
     * On failure, throws an exception or returns Y_VALUERANGE_INVALID.
     */
    get_valueRange() {
        return this.liveFunc._valueRange;
    }

    /**
     * Changes the physical value range measured by the sensor. As a side effect, the range modification may
     * automatically modify the display resolution.
     *
     * @param newval : a string corresponding to the physical value range measured by the sensor
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_valueRange(newval) {
        this.liveFunc.set_valueRange(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the electric signal bias for zero shift adjustment.
     * If your electric signal reads positif when it should be zero, setup
     * a positive signalBias of the same value to fix the zero shift.
     *
     * @param newval : a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalBias(newval) {
        this.liveFunc.set_signalBias(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the electric signal bias for zero shift adjustment.
     * A positive bias means that the signal is over-reporting the measure,
     * while a negative bias means that the signal is underreporting the measure.
     *
     * @return a floating point number corresponding to the electric signal bias for zero shift adjustment
     *
     * On failure, throws an exception or returns Y_SIGNALBIAS_INVALID.
     */
    get_signalBias() {
        return this.liveFunc._signalBias;
    }

    /**
     * Returns the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @return a value among Y_SIGNALSAMPLING_HIGH_RATE, Y_SIGNALSAMPLING_HIGH_RATE_FILTERED,
     * Y_SIGNALSAMPLING_LOW_NOISE and Y_SIGNALSAMPLING_LOW_NOISE_FILTERED corresponding to the electric
     * signal sampling method to use
     *
     * On failure, throws an exception or returns Y_SIGNALSAMPLING_INVALID.
     */
    get_signalSampling() {
        return this.liveFunc._signalSampling;
    }

    /**
     * Changes the electric signal sampling method to use.
     * The HIGH_RATE method uses the highest sampling frequency, without any filtering.
     * The HIGH_RATE_FILTERED method adds a windowed 7-sample median filter.
     * The LOW_NOISE method uses a reduced acquisition frequency to reduce noise.
     * The LOW_NOISE_FILTERED method combines a reduced frequency with the median filter
     * to get measures as stable as possible when working on a noisy signal.
     *
     * @param newval : a value among Y_SIGNALSAMPLING_HIGH_RATE, Y_SIGNALSAMPLING_HIGH_RATE_FILTERED,
     * Y_SIGNALSAMPLING_LOW_NOISE and Y_SIGNALSAMPLING_LOW_NOISE_FILTERED corresponding to the electric
     * signal sampling method to use
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_signalSampling(newval) {
        this.liveFunc.set_signalSampling(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Adjusts the signal bias so that the current signal value is need
     * precisely as zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    zeroAdjust() {
        this.liveFunc.zeroAdjust();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YGenericSensor accessors declaration)
}

exports.YGenericSensorProxy = YGenericSensorProxy; //--- (GenericSensor functions)

/**
 * Retrieves a generic sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the generic sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGenericSensor.isOnline() to test if the generic sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a generic sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the generic sensor
 *
 * @return {YGenericSensor} a YGenericSensor object allowing you to drive the generic sensor.
 */

function yFindGenericSensor(func) {
    return YGenericSensor.FindGenericSensor(func);
}

/**
 * Starts the enumeration of generic sensors currently accessible.
 * Use the method YGenericSensor.nextGenericSensor() to iterate on
 * next generic sensors.
 *
 * @return {YGenericSensor} a pointer to a YGenericSensor object, corresponding to
 *         the first generic sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstGenericSensor() {
    return YGenericSensor.FirstGenericSensor();
}

//--- (end of GenericSensor functions)
