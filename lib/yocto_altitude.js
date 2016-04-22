/*********************************************************************
 *
 * $Id: yocto_altitude.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Altitude functions
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
exports.YAltitudeProxy = exports.YAltitude = exports.Y_TECHNOLOGY_INVALID = exports.Y_QNH_INVALID = undefined;
exports.yFindAltitude = yFindAltitude;
exports.yFirstAltitude = yFirstAltitude;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YAltitude return codes)
//--- (end of YAltitude return codes)
//--- (YAltitude definitions)
var Y_QNH_INVALID = exports.Y_QNH_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_TECHNOLOGY_INVALID = exports.Y_TECHNOLOGY_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YAltitude definitions)

//--- (YAltitude class start)
/**
 * YAltitude Class: Altitude function interface
 *
 * The Yoctopuce class YAltitude allows you to read and configure Yoctopuce altitude
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure the barometric pressure adjusted to
 * sea level (QNH) for barometric sensors.
 */
//--- (end of YAltitude class start)

class YAltitude extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YAltitude constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Altitude';
        /** @member {number} **/
        this._qnh = Y_QNH_INVALID;
        /** @member {string} **/
        this._technology = Y_TECHNOLOGY_INVALID;
        this.imm_setConst({
            QNH_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            TECHNOLOGY_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YAltitude constructor)
    }

    //--- (YAltitude implementation)

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
            var res = new YAltitudeProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'qnh':
                this._qnh = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'technology':
                this._technology = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current estimated altitude. This allows to compensate for
     * ambient pressure variations and to work in relative mode.
     *
     * @param newval {number} : a floating point number corresponding to the current estimated altitude
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
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions.
     *
     * @param newval {number} : a floating point number corresponding to the barometric pressure adjusted
     * to sea level used to compute
     *         the altitude (QNH)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_qnh(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this3._setAttr('qnh', rest_val);
        })();
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     *
     * @return {number} a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     *
     * On failure, throws an exception or returns YAltitude.QNH_INVALID.
     */
    get_qnh() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_QNH_INVALID;
                }
            }
            return _this4._qnh;
        })();
    }

    /**
     * Returns the technology used by the sesnor to compute
     * altitude. Possibles values are  "barometric" and "gps"
     *
     * @return {string} a string corresponding to the technology used by the sesnor to compute
     *         altitude
     *
     * On failure, throws an exception or returns YAltitude.TECHNOLOGY_INVALID.
     */
    get_technology() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_TECHNOLOGY_INVALID;
                }
            }
            return _this5._technology;
        })();
    }

    /**
     * Retrieves an altimeter for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the altimeter
     *
     * @return {YAltitude} a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitude(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Altitude', func);
        if (obj == null) {
            obj = new YAltitude(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Altitude', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an altimeter for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the altimeter is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAltitude.isOnline() to test if the altimeter is
     * indeed online at a given time. In case of ambiguity when looking for
     * an altimeter by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the altimeter
     *
     * @return {YAltitude} a YAltitude object allowing you to drive the altimeter.
     */
    static FindAltitudeInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Altitude', func);
        if (obj == null) {
            obj = new YAltitude(yctx, func);
            _yocto_api.YFunction._AddToCache('Altitude', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of altimeters started using yFirstAltitude().
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         an altimeter currently online, or a null pointer
     *         if there are no more altimeters to enumerate.
     */
    nextAltitude() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitude() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Altitude');
        if (next_hwid == null) return null;
        return YAltitude.FindAltitude(next_hwid);
    }

    /**
     * Starts the enumeration of altimeters currently accessible.
     * Use the method YAltitude.nextAltitude() to iterate on
     * next altimeters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAltitude} a pointer to a YAltitude object, corresponding to
     *         the first altimeter currently online, or a null pointer
     *         if there are none.
     */
    static FirstAltitudeInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Altitude');
        if (next_hwid == null) return null;
        return YAltitude.FindAltitudeInContext(yctx, next_hwid);
    }

    //--- (end of YAltitude implementation)
}

exports.YAltitude = YAltitude; //
// YAltitudeProxy Class: synchronous proxy to YAltitude objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAltitude objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YAltitudeProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YAltitude accessors declaration)

    /**
     * Changes the current estimated altitude. This allows to compensate for
     * ambient pressure variations and to work in relative mode.
     *
     * @param newval : a floating point number corresponding to the current estimated altitude
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
     * Changes the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH). This enables you to compensate for atmospheric pressure
     * changes due to weather conditions.
     *
     * @param newval : a floating point number corresponding to the barometric pressure adjusted to sea
     * level used to compute
     *         the altitude (QNH)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_qnh(newval) {
        this.liveFunc.set_qnh(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the barometric pressure adjusted to sea level used to compute
     * the altitude (QNH).
     *
     * @return a floating point number corresponding to the barometric pressure adjusted to sea level used to compute
     *         the altitude (QNH)
     *
     * On failure, throws an exception or returns Y_QNH_INVALID.
     */
    get_qnh() {
        return this.liveFunc._qnh;
    }

    /**
     * Returns the technology used by the sesnor to compute
     * altitude. Possibles values are  "barometric" and "gps"
     *
     * @return a string corresponding to the technology used by the sesnor to compute
     *         altitude
     *
     * On failure, throws an exception or returns Y_TECHNOLOGY_INVALID.
     */
    get_technology() {
        return this.liveFunc._technology;
    }
    //--- (end of YAltitude accessors declaration)
}

exports.YAltitudeProxy = YAltitudeProxy; //--- (Altitude functions)

/**
 * Retrieves an altimeter for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the altimeter is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAltitude.isOnline() to test if the altimeter is
 * indeed online at a given time. In case of ambiguity when looking for
 * an altimeter by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the altimeter
 *
 * @return {YAltitude} a YAltitude object allowing you to drive the altimeter.
 */

function yFindAltitude(func) {
    return YAltitude.FindAltitude(func);
}

/**
 * Starts the enumeration of altimeters currently accessible.
 * Use the method YAltitude.nextAltitude() to iterate on
 * next altimeters.
 *
 * @return {YAltitude} a pointer to a YAltitude object, corresponding to
 *         the first altimeter currently online, or a null pointer
 *         if there are none.
 */
function yFirstAltitude() {
    return YAltitude.FirstAltitude();
}

//--- (end of Altitude functions)
