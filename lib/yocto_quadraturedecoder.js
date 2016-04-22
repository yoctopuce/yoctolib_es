/*********************************************************************
 *
 * $Id: yocto_quadraturedecoder.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for QuadratureDecoder functions
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
exports.YQuadratureDecoderProxy = exports.YQuadratureDecoder = exports.Y_SPEED_INVALID = exports.Y_DECODING_INVALID = exports.Y_DECODING_ON = exports.Y_DECODING_OFF = undefined;
exports.yFindQuadratureDecoder = yFindQuadratureDecoder;
exports.yFirstQuadratureDecoder = yFirstQuadratureDecoder;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YQuadratureDecoder return codes)
//--- (end of YQuadratureDecoder return codes)
//--- (YQuadratureDecoder definitions)
var Y_DECODING_OFF = exports.Y_DECODING_OFF = 0;
var Y_DECODING_ON = exports.Y_DECODING_ON = 1;
var Y_DECODING_INVALID = exports.Y_DECODING_INVALID = -1;
var Y_SPEED_INVALID = exports.Y_SPEED_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YQuadratureDecoder definitions)

//--- (YQuadratureDecoder class start)
/**
 * YQuadratureDecoder Class: QuadratureDecoder function interface
 *
 * The class YQuadratureDecoder allows you to decode a two-wire signal produced by a
 * quadrature encoder. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YQuadratureDecoder class start)

class YQuadratureDecoder extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YQuadratureDecoder constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'QuadratureDecoder';
        /** @member {number} **/
        this._speed = Y_SPEED_INVALID;
        /** @member {number} **/
        this._decoding = Y_DECODING_INVALID;
        this.imm_setConst({
            SPEED_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            DECODING_OFF: 0,
            DECODING_ON: 1,
            DECODING_INVALID: -1
        });
        //--- (end of YQuadratureDecoder constructor)
    }

    //--- (YQuadratureDecoder implementation)

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
            var res = new YQuadratureDecoderProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'speed':
                this._speed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'decoding':
                this._decoding = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitely activates the quadrature decoder.
     *
     * @param newval {number} : a floating point number corresponding to the current expected position of
     * the quadrature decoder
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
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
     * Returns the PWM frequency in Hz.
     *
     * @return {number} a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns YQuadratureDecoder.SPEED_INVALID.
     */
    get_speed() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_SPEED_INVALID;
                }
            }
            return _this3._speed;
        })();
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return {number} either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON,
     * according to the current activation state of the quadrature decoder
     *
     * On failure, throws an exception or returns YQuadratureDecoder.DECODING_INVALID.
     */
    get_decoding() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_DECODING_INVALID;
                }
            }
            return _this4._decoding;
        })();
    }

    /**
     * Changes the activation state of the quadrature decoder.
     *
     * @param newval {number} : either YQuadratureDecoder.DECODING_OFF or YQuadratureDecoder.DECODING_ON,
     * according to the activation state of the quadrature decoder
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_decoding(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('decoding', rest_val);
        })();
    }

    /**
     * Retrieves a quadrature decoder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the quadrature decoder
     *
     * @return {YQuadratureDecoder} a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoder(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('QuadratureDecoder', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a quadrature decoder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quadrature decoder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quadrature decoder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the quadrature decoder
     *
     * @return {YQuadratureDecoder} a YQuadratureDecoder object allowing you to drive the quadrature decoder.
     */
    static FindQuadratureDecoderInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'QuadratureDecoder', func);
        if (obj == null) {
            obj = new YQuadratureDecoder(yctx, func);
            _yocto_api.YFunction._AddToCache('QuadratureDecoder', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quadrature decoders started using yFirstQuadratureDecoder().
     *
     * @return {YQuadratureDecoder} a pointer to a YQuadratureDecoder object, corresponding to
     *         a quadrature decoder currently online, or a null pointer
     *         if there are no more quadrature decoders to enumerate.
     */
    nextQuadratureDecoder() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @return {YQuadratureDecoder} a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoder() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('QuadratureDecoder');
        if (next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoder(next_hwid);
    }

    /**
     * Starts the enumeration of quadrature decoders currently accessible.
     * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
     * next quadrature decoders.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YQuadratureDecoder} a pointer to a YQuadratureDecoder object, corresponding to
     *         the first quadrature decoder currently online, or a null pointer
     *         if there are none.
     */
    static FirstQuadratureDecoderInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('QuadratureDecoder');
        if (next_hwid == null) return null;
        return YQuadratureDecoder.FindQuadratureDecoderInContext(yctx, next_hwid);
    }

    //--- (end of YQuadratureDecoder implementation)
}

exports.YQuadratureDecoder = YQuadratureDecoder; //
// YQuadratureDecoderProxy Class: synchronous proxy to YQuadratureDecoder objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YQuadratureDecoder objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YQuadratureDecoderProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YQuadratureDecoder accessors declaration)

    /**
     * Changes the current expected position of the quadrature decoder.
     * Invoking this function implicitely activates the quadrature decoder.
     *
     * @param newval : a floating point number corresponding to the current expected position of the quadrature decoder
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentValue(newval) {
        this.liveFunc.set_currentValue(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the PWM frequency in Hz.
     *
     * @return a floating point number corresponding to the PWM frequency in Hz
     *
     * On failure, throws an exception or returns Y_SPEED_INVALID.
     */
    get_speed() {
        return this.liveFunc._speed;
    }

    /**
     * Returns the current activation state of the quadrature decoder.
     *
     * @return either Y_DECODING_OFF or Y_DECODING_ON, according to the current activation state of the
     * quadrature decoder
     *
     * On failure, throws an exception or returns Y_DECODING_INVALID.
     */
    get_decoding() {
        return this.liveFunc._decoding;
    }

    /**
     * Changes the activation state of the quadrature decoder.
     *
     * @param newval : either Y_DECODING_OFF or Y_DECODING_ON, according to the activation state of the
     * quadrature decoder
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_decoding(newval) {
        this.liveFunc.set_decoding(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YQuadratureDecoder accessors declaration)
}

exports.YQuadratureDecoderProxy = YQuadratureDecoderProxy; //--- (QuadratureDecoder functions)

/**
 * Retrieves a quadrature decoder for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the quadrature decoder is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YQuadratureDecoder.isOnline() to test if the quadrature decoder is
 * indeed online at a given time. In case of ambiguity when looking for
 * a quadrature decoder by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the quadrature decoder
 *
 * @return {YQuadratureDecoder} a YQuadratureDecoder object allowing you to drive the quadrature decoder.
 */

function yFindQuadratureDecoder(func) {
    return YQuadratureDecoder.FindQuadratureDecoder(func);
}

/**
 * Starts the enumeration of quadrature decoders currently accessible.
 * Use the method YQuadratureDecoder.nextQuadratureDecoder() to iterate on
 * next quadrature decoders.
 *
 * @return {YQuadratureDecoder} a pointer to a YQuadratureDecoder object, corresponding to
 *         the first quadrature decoder currently online, or a null pointer
 *         if there are none.
 */
function yFirstQuadratureDecoder() {
    return YQuadratureDecoder.FirstQuadratureDecoder();
}

//--- (end of QuadratureDecoder functions)
