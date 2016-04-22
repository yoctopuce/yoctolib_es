/*********************************************************************
 *
 * $Id: yocto_compass.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Compass functions
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
exports.YCompassProxy = exports.YCompass = exports.Y_MAGNETICHEADING_INVALID = exports.Y_AXIS_INVALID = exports.Y_AXIS_Z = exports.Y_AXIS_Y = exports.Y_AXIS_X = undefined;
exports.yFindCompass = yFindCompass;
exports.yFirstCompass = yFirstCompass;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YCompass return codes)
//--- (end of YCompass return codes)
//--- (YCompass definitions)
var Y_AXIS_X = exports.Y_AXIS_X = 0;
var Y_AXIS_Y = exports.Y_AXIS_Y = 1;
var Y_AXIS_Z = exports.Y_AXIS_Z = 2;
var Y_AXIS_INVALID = exports.Y_AXIS_INVALID = -1;
var Y_MAGNETICHEADING_INVALID = exports.Y_MAGNETICHEADING_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YCompass definitions)

//--- (YCompass class start)
/**
 * YCompass Class: Compass function interface
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
//--- (end of YCompass class start)

class YCompass extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YCompass constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Compass';
        /** @member {number} **/
        this._axis = Y_AXIS_INVALID;
        /** @member {number} **/
        this._magneticHeading = Y_MAGNETICHEADING_INVALID;
        this.imm_setConst({
            AXIS_X: 0,
            AXIS_Y: 1,
            AXIS_Z: 2,
            AXIS_INVALID: -1,
            MAGNETICHEADING_INVALID: _yocto_api.YAPI.INVALID_DOUBLE
        });
        //--- (end of YCompass constructor)
    }

    //--- (YCompass implementation)

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
            var res = new YCompassProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'axis':
                this._axis = parseInt(val);
                return 1;
            case 'magneticHeading':
                this._magneticHeading = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    get_axis() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_AXIS_INVALID;
                }
            }
            return _this2._axis;
        })();
    }

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return {number} a floating point number corresponding to the magnetic heading, regardless of the
     * configured bearing
     *
     * On failure, throws an exception or returns YCompass.MAGNETICHEADING_INVALID.
     */
    get_magneticHeading() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_MAGNETICHEADING_INVALID;
                }
            }
            return _this3._magneticHeading;
        })();
    }

    /**
     * Retrieves a compass for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the compass is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCompass.isOnline() to test if the compass is
     * indeed online at a given time. In case of ambiguity when looking for
     * a compass by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the compass
     *
     * @return {YCompass} a YCompass object allowing you to drive the compass.
     */
    static FindCompass(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Compass', func);
        if (obj == null) {
            obj = new YCompass(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Compass', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a compass for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the compass is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCompass.isOnline() to test if the compass is
     * indeed online at a given time. In case of ambiguity when looking for
     * a compass by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the compass
     *
     * @return {YCompass} a YCompass object allowing you to drive the compass.
     */
    static FindCompassInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Compass', func);
        if (obj == null) {
            obj = new YCompass(yctx, func);
            _yocto_api.YFunction._AddToCache('Compass', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of compasses started using yFirstCompass().
     *
     * @return {YCompass} a pointer to a YCompass object, corresponding to
     *         a compass currently online, or a null pointer
     *         if there are no more compasses to enumerate.
     */
    nextCompass() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YCompass.FindCompassInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of compasses currently accessible.
     * Use the method YCompass.nextCompass() to iterate on
     * next compasses.
     *
     * @return {YCompass} a pointer to a YCompass object, corresponding to
     *         the first compass currently online, or a null pointer
     *         if there are none.
     */
    static FirstCompass() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Compass');
        if (next_hwid == null) return null;
        return YCompass.FindCompass(next_hwid);
    }

    /**
     * Starts the enumeration of compasses currently accessible.
     * Use the method YCompass.nextCompass() to iterate on
     * next compasses.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCompass} a pointer to a YCompass object, corresponding to
     *         the first compass currently online, or a null pointer
     *         if there are none.
     */
    static FirstCompassInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Compass');
        if (next_hwid == null) return null;
        return YCompass.FindCompassInContext(yctx, next_hwid);
    }

    //--- (end of YCompass implementation)
}

exports.YCompass = YCompass; //
// YCompassProxy Class: synchronous proxy to YCompass objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCompass objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YCompassProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YCompass accessors declaration)

    get_axis() {
        return this.liveFunc._axis;
    }

    /**
     * Returns the magnetic heading, regardless of the configured bearing.
     *
     * @return a floating point number corresponding to the magnetic heading, regardless of the configured bearing
     *
     * On failure, throws an exception or returns Y_MAGNETICHEADING_INVALID.
     */
    get_magneticHeading() {
        return this.liveFunc._magneticHeading;
    }
    //--- (end of YCompass accessors declaration)
}

exports.YCompassProxy = YCompassProxy; //--- (Compass functions)

/**
 * Retrieves a compass for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the compass is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCompass.isOnline() to test if the compass is
 * indeed online at a given time. In case of ambiguity when looking for
 * a compass by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the compass
 *
 * @return {YCompass} a YCompass object allowing you to drive the compass.
 */

function yFindCompass(func) {
    return YCompass.FindCompass(func);
}

/**
 * Starts the enumeration of compasses currently accessible.
 * Use the method YCompass.nextCompass() to iterate on
 * next compasses.
 *
 * @return {YCompass} a pointer to a YCompass object, corresponding to
 *         the first compass currently online, or a null pointer
 *         if there are none.
 */
function yFirstCompass() {
    return YCompass.FirstCompass();
}

//--- (end of Compass functions)
