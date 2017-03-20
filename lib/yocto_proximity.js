/*********************************************************************
 *
 * $Id: pic24config.php 26780 2017-03-16 14:02:09Z mvuilleu $
 *
 * Implements the high-level API for Proximity functions
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
exports.YProximityProxy = exports.YProximity = exports.Y_PULSETIMER_INVALID = exports.Y_PULSECOUNTER_INVALID = exports.Y_LASTTIMEREMOVED_INVALID = exports.Y_LASTTIMEAPPROACHED_INVALID = exports.Y_DETECTIONTHRESHOLD_INVALID = exports.Y_SIGNALVALUE_INVALID = exports.Y_PROXIMITYREPORTMODE_INVALID = exports.Y_PROXIMITYREPORTMODE_PULSECOUNT = exports.Y_PROXIMITYREPORTMODE_PRESENCE = exports.Y_PROXIMITYREPORTMODE_NUMERIC = exports.Y_ISPRESENT_INVALID = exports.Y_ISPRESENT_TRUE = exports.Y_ISPRESENT_FALSE = undefined;
exports.yFindProximity = yFindProximity;
exports.yFirstProximity = yFirstProximity;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YProximity return codes)
//--- (end of YProximity return codes)
//--- (YProximity definitions)
var Y_ISPRESENT_FALSE = exports.Y_ISPRESENT_FALSE = 0;
var Y_ISPRESENT_TRUE = exports.Y_ISPRESENT_TRUE = 1;
var Y_ISPRESENT_INVALID = exports.Y_ISPRESENT_INVALID = -1;
var Y_PROXIMITYREPORTMODE_NUMERIC = exports.Y_PROXIMITYREPORTMODE_NUMERIC = 0;
var Y_PROXIMITYREPORTMODE_PRESENCE = exports.Y_PROXIMITYREPORTMODE_PRESENCE = 1;
var Y_PROXIMITYREPORTMODE_PULSECOUNT = exports.Y_PROXIMITYREPORTMODE_PULSECOUNT = 2;
var Y_PROXIMITYREPORTMODE_INVALID = exports.Y_PROXIMITYREPORTMODE_INVALID = -1;
var Y_SIGNALVALUE_INVALID = exports.Y_SIGNALVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_DETECTIONTHRESHOLD_INVALID = exports.Y_DETECTIONTHRESHOLD_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LASTTIMEAPPROACHED_INVALID = exports.Y_LASTTIMEAPPROACHED_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_LASTTIMEREMOVED_INVALID = exports.Y_LASTTIMEREMOVED_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_PULSECOUNTER_INVALID = exports.Y_PULSECOUNTER_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_PULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YProximity definitions)

//--- (YProximity class start)
/**
 * YProximity Class: Proximity function interface
 *
 * The Yoctopuce class YProximity allows you to use and configure Yoctopuce proximity
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * to register callback functions, to access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of YProximity class start)

class YProximity extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YProximity constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Proximity';
        /** @member {number} **/
        this._signalValue = Y_SIGNALVALUE_INVALID;
        /** @member {number} **/
        this._detectionThreshold = Y_DETECTIONTHRESHOLD_INVALID;
        /** @member {number} **/
        this._isPresent = Y_ISPRESENT_INVALID;
        /** @member {number} **/
        this._lastTimeApproached = Y_LASTTIMEAPPROACHED_INVALID;
        /** @member {number} **/
        this._lastTimeRemoved = Y_LASTTIMEREMOVED_INVALID;
        /** @member {number} **/
        this._pulseCounter = Y_PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer = Y_PULSETIMER_INVALID;
        /** @member {number} **/
        this._proximityReportMode = Y_PROXIMITYREPORTMODE_INVALID;
        this.imm_setConst({
            SIGNALVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            DETECTIONTHRESHOLD_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ISPRESENT_FALSE: 0,
            ISPRESENT_TRUE: 1,
            ISPRESENT_INVALID: -1,
            LASTTIMEAPPROACHED_INVALID: _yocto_api.YAPI.INVALID_LONG,
            LASTTIMEREMOVED_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PULSECOUNTER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PULSETIMER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            PROXIMITYREPORTMODE_NUMERIC: 0,
            PROXIMITYREPORTMODE_PRESENCE: 1,
            PROXIMITYREPORTMODE_PULSECOUNT: 2,
            PROXIMITYREPORTMODE_INVALID: -1
        });
        //--- (end of YProximity constructor)
    }

    //--- (YProximity implementation)

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
            var res = new YProximityProxy(_this);
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
            case 'detectionThreshold':
                this._detectionThreshold = parseInt(val);
                return 1;
            case 'isPresent':
                this._isPresent = parseInt(val);
                return 1;
            case 'lastTimeApproached':
                this._lastTimeApproached = parseInt(val);
                return 1;
            case 'lastTimeRemoved':
                this._lastTimeRemoved = parseInt(val);
                return 1;
            case 'pulseCounter':
                this._pulseCounter = parseInt(val);
                return 1;
            case 'pulseTimer':
                this._pulseTimer = parseInt(val);
                return 1;
            case 'proximityReportMode':
                this._proximityReportMode = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return {number} a floating point number corresponding to the current value of signal measured by
     * the proximity sensor
     *
     * On failure, throws an exception or returns YProximity.SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_SIGNALVALUE_INVALID;
                }
            }
            res = Math.round(_this2._signalValue * 1000) / 1000;
            return res;
        })();
    }

    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return {number} an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns YProximity.DETECTIONTHRESHOLD_INVALID.
     */
    get_detectionThreshold() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_DETECTIONTHRESHOLD_INVALID;
                }
            }
            res = _this3._detectionThreshold;
            return res;
        })();
    }

    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param newval {number} : an integer corresponding to the threshold used to determine the logical
     * state of the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_detectionThreshold(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('detectionThreshold', rest_val);
        })();
    }

    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return {number} either YProximity.ISPRESENT_FALSE or YProximity.ISPRESENT_TRUE, according to true
     * if the input (considered as binary) is active (detection value is smaller than the specified
     * threshold), and false otherwise
     *
     * On failure, throws an exception or returns YProximity.ISPRESENT_INVALID.
     */
    get_isPresent() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_ISPRESENT_INVALID;
                }
            }
            res = _this5._isPresent;
            return res;
        })();
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEAPPROACHED_INVALID.
     */
    get_lastTimeApproached() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_LASTTIMEAPPROACHED_INVALID;
                }
            }
            res = _this6._lastTimeApproached;
            return res;
        })();
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns YProximity.LASTTIMEREMOVED_INVALID.
     */
    get_lastTimeRemoved() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_LASTTIMEREMOVED_INVALID;
                }
            }
            res = _this7._lastTimeRemoved;
            return res;
        })();
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YProximity.PULSECOUNTER_INVALID.
     */
    get_pulseCounter() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_PULSECOUNTER_INVALID;
                }
            }
            res = _this8._pulseCounter;
            return res;
        })();
    }

    set_pulseCounter(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('pulseCounter', rest_val);
        })();
    }

    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns YProximity.PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_PULSETIMER_INVALID;
                }
            }
            res = _this10._pulseTimer;
            return res;
        })();
    }

    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return {number} a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT corresponding
     * to the parameter (sensor value, presence or pulse count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns YProximity.PROXIMITYREPORTMODE_INVALID.
     */
    get_proximityReportMode() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_PROXIMITYREPORTMODE_INVALID;
                }
            }
            res = _this11._proximityReportMode;
            return res;
        })();
    }

    /**
     * Modifies the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval {number} : a value among YProximity.PROXIMITYREPORTMODE_NUMERIC,
     * YProximity.PROXIMITYREPORTMODE_PRESENCE and YProximity.PROXIMITYREPORTMODE_PULSECOUNT
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_proximityReportMode(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this12._setAttr('proximityReportMode', rest_val);
        })();
    }

    /**
     * Retrieves a proximity sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the proximity sensor
     *
     * @return {YProximity} a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximity(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Proximity', func);
        if (obj == null) {
            obj = new YProximity(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Proximity', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a proximity sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the proximity sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YProximity.isOnline() to test if the proximity sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a proximity sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the proximity sensor
     *
     * @return {YProximity} a YProximity object allowing you to drive the proximity sensor.
     */
    static FindProximityInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Proximity', func);
        if (obj == null) {
            obj = new YProximity(yctx, func);
            _yocto_api.YFunction._AddToCache('Proximity', func, obj);
        }
        return obj;
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.set_pulseCounter(0);
        })();
    }

    /**
     * Continues the enumeration of proximity sensors started using yFirstProximity().
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         a proximity sensor currently online, or a null pointer
     *         if there are no more proximity sensors to enumerate.
     */
    nextProximity() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YProximity.FindProximityInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximity() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Proximity');
        if (next_hwid == null) return null;
        return YProximity.FindProximity(next_hwid);
    }

    /**
     * Starts the enumeration of proximity sensors currently accessible.
     * Use the method YProximity.nextProximity() to iterate on
     * next proximity sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YProximity} a pointer to a YProximity object, corresponding to
     *         the first proximity sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstProximityInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Proximity');
        if (next_hwid == null) return null;
        return YProximity.FindProximityInContext(yctx, next_hwid);
    }

    //--- (end of YProximity implementation)
}

exports.YProximity = YProximity; //
// YProximityProxy Class: synchronous proxy to YProximity objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YProximity objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YProximityProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YProximity accessors declaration)

    /**
     * Returns the current value of signal measured by the proximity sensor.
     *
     * @return a floating point number corresponding to the current value of signal measured by the proximity sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        return this.liveFunc._signalValue;
    }

    /**
     * Returns the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @return an integer corresponding to the threshold used to determine the logical state of the
     * proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * On failure, throws an exception or returns Y_DETECTIONTHRESHOLD_INVALID.
     */
    get_detectionThreshold() {
        return this.liveFunc._detectionThreshold;
    }

    /**
     * Changes the threshold used to determine the logical state of the proximity sensor, when considered
     * as a binary input (on/off).
     *
     * @param newval : an integer corresponding to the threshold used to determine the logical state of
     * the proximity sensor, when considered
     *         as a binary input (on/off)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_detectionThreshold(newval) {
        this.liveFunc.set_detectionThreshold(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the input (considered as binary) is active (detection value is smaller than the
     * specified threshold), and false otherwise.
     *
     * @return either Y_ISPRESENT_FALSE or Y_ISPRESENT_TRUE, according to true if the input (considered as
     * binary) is active (detection value is smaller than the specified threshold), and false otherwise
     *
     * On failure, throws an exception or returns Y_ISPRESENT_INVALID.
     */
    get_isPresent() {
        return this.liveFunc._isPresent;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from absent to present).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from absent to present)
     *
     * On failure, throws an exception or returns Y_LASTTIMEAPPROACHED_INVALID.
     */
    get_lastTimeApproached() {
        return this.liveFunc._lastTimeApproached;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last observed
     * detection (the input contact transitioned from present to absent).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last observed
     *         detection (the input contact transitioned from present to absent)
     *
     * On failure, throws an exception or returns Y_LASTTIMEREMOVED_INVALID.
     */
    get_lastTimeRemoved() {
        return this.liveFunc._lastTimeRemoved;
    }

    /**
     * Returns the pulse counter value. The value is a 32 bit integer. In case
     * of overflow (>=2^32), the counter will wrap. To reset the counter, just
     * call the resetCounter() method.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    get_pulseCounter() {
        return this.liveFunc._pulseCounter;
    }

    set_pulseCounter(newval) {
        this.liveFunc.set_pulseCounter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the timer of the pulse counter (ms).
     *
     * @return an integer corresponding to the timer of the pulse counter (ms)
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        return this.liveFunc._pulseTimer;
    }

    /**
     * Returns the parameter (sensor value, presence or pulse count) returned by the get_currentValue
     * function and callbacks.
     *
     * @return a value among Y_PROXIMITYREPORTMODE_NUMERIC, Y_PROXIMITYREPORTMODE_PRESENCE and
     * Y_PROXIMITYREPORTMODE_PULSECOUNT corresponding to the parameter (sensor value, presence or pulse
     * count) returned by the get_currentValue function and callbacks
     *
     * On failure, throws an exception or returns Y_PROXIMITYREPORTMODE_INVALID.
     */
    get_proximityReportMode() {
        return this.liveFunc._proximityReportMode;
    }

    /**
     * Modifies the  parameter  type (sensor value, presence or pulse count) returned by the
     * get_currentValue function and callbacks.
     * The edge count value is limited to the 6 lowest digits. For values greater than one million, use
     * get_pulseCounter().
     *
     * @param newval : a value among Y_PROXIMITYREPORTMODE_NUMERIC, Y_PROXIMITYREPORTMODE_PRESENCE and
     * Y_PROXIMITYREPORTMODE_PULSECOUNT
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_proximityReportMode(newval) {
        this.liveFunc.set_proximityReportMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Resets the pulse counter value as well as its timer.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter() {
        this.liveFunc.resetCounter();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YProximity accessors declaration)
}

exports.YProximityProxy = YProximityProxy; //--- (Proximity functions)

/**
 * Retrieves a proximity sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the proximity sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YProximity.isOnline() to test if the proximity sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a proximity sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the proximity sensor
 *
 * @return {YProximity} a YProximity object allowing you to drive the proximity sensor.
 */

function yFindProximity(func) {
    return YProximity.FindProximity(func);
}

/**
 * Starts the enumeration of proximity sensors currently accessible.
 * Use the method YProximity.nextProximity() to iterate on
 * next proximity sensors.
 *
 * @return {YProximity} a pointer to a YProximity object, corresponding to
 *         the first proximity sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstProximity() {
    return YProximity.FirstProximity();
}

//--- (end of Proximity functions)
