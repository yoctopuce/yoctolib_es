/*********************************************************************
 *
 * $Id: yocto_gps.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Gps functions
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
exports.YGpsProxy = exports.YGps = exports.Y_COMMAND_INVALID = exports.Y_UTCOFFSET_INVALID = exports.Y_DATETIME_INVALID = exports.Y_UNIXTIME_INVALID = exports.Y_DIRECTION_INVALID = exports.Y_GROUNDSPEED_INVALID = exports.Y_ALTITUDE_INVALID = exports.Y_DILUTION_INVALID = exports.Y_LONGITUDE_INVALID = exports.Y_LATITUDE_INVALID = exports.Y_SATCOUNT_INVALID = exports.Y_COORDSYSTEM_INVALID = exports.Y_COORDSYSTEM_GPS_D = exports.Y_COORDSYSTEM_GPS_DM = exports.Y_COORDSYSTEM_GPS_DMS = exports.Y_ISFIXED_INVALID = exports.Y_ISFIXED_TRUE = exports.Y_ISFIXED_FALSE = undefined;
exports.yFindGps = yFindGps;
exports.yFirstGps = yFirstGps;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YGps return codes)
//--- (end of YGps return codes)
//--- (YGps definitions)
var Y_ISFIXED_FALSE = exports.Y_ISFIXED_FALSE = 0;
var Y_ISFIXED_TRUE = exports.Y_ISFIXED_TRUE = 1;
var Y_ISFIXED_INVALID = exports.Y_ISFIXED_INVALID = -1;
var Y_COORDSYSTEM_GPS_DMS = exports.Y_COORDSYSTEM_GPS_DMS = 0;
var Y_COORDSYSTEM_GPS_DM = exports.Y_COORDSYSTEM_GPS_DM = 1;
var Y_COORDSYSTEM_GPS_D = exports.Y_COORDSYSTEM_GPS_D = 2;
var Y_COORDSYSTEM_INVALID = exports.Y_COORDSYSTEM_INVALID = -1;
var Y_SATCOUNT_INVALID = exports.Y_SATCOUNT_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_LATITUDE_INVALID = exports.Y_LATITUDE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_LONGITUDE_INVALID = exports.Y_LONGITUDE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_DILUTION_INVALID = exports.Y_DILUTION_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_ALTITUDE_INVALID = exports.Y_ALTITUDE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_GROUNDSPEED_INVALID = exports.Y_GROUNDSPEED_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_DIRECTION_INVALID = exports.Y_DIRECTION_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_UNIXTIME_INVALID = exports.Y_UNIXTIME_INVALID = _yocto_api.YAPI.INVALID_LONG;
var Y_DATETIME_INVALID = exports.Y_DATETIME_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_UTCOFFSET_INVALID = exports.Y_UTCOFFSET_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YGps definitions)

//--- (YGps class start)
/**
 * YGps Class: GPS function interface
 *
 * The Gps function allows you to extract positionning
 * data from the GPS device. This class can provides
 * complete positionning information: However, if you
 * whish to define callbacks on position changes, you
 * should use the YLatitude et YLongitude classes.
 */
//--- (end of YGps class start)

class YGps extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YGps constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Gps';
        /** @member {number} **/
        this._isFixed = Y_ISFIXED_INVALID;
        /** @member {number} **/
        this._satCount = Y_SATCOUNT_INVALID;
        /** @member {number} **/
        this._coordSystem = Y_COORDSYSTEM_INVALID;
        /** @member {string} **/
        this._latitude = Y_LATITUDE_INVALID;
        /** @member {string} **/
        this._longitude = Y_LONGITUDE_INVALID;
        /** @member {number} **/
        this._dilution = Y_DILUTION_INVALID;
        /** @member {number} **/
        this._altitude = Y_ALTITUDE_INVALID;
        /** @member {number} **/
        this._groundSpeed = Y_GROUNDSPEED_INVALID;
        /** @member {number} **/
        this._direction = Y_DIRECTION_INVALID;
        /** @member {number} **/
        this._unixTime = Y_UNIXTIME_INVALID;
        /** @member {string} **/
        this._dateTime = Y_DATETIME_INVALID;
        /** @member {number} **/
        this._utcOffset = Y_UTCOFFSET_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            ISFIXED_FALSE: 0,
            ISFIXED_TRUE: 1,
            ISFIXED_INVALID: -1,
            SATCOUNT_INVALID: _yocto_api.YAPI.INVALID_LONG,
            COORDSYSTEM_GPS_DMS: 0,
            COORDSYSTEM_GPS_DM: 1,
            COORDSYSTEM_GPS_D: 2,
            COORDSYSTEM_INVALID: -1,
            LATITUDE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            LONGITUDE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            DILUTION_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            ALTITUDE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            GROUNDSPEED_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            DIRECTION_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            UNIXTIME_INVALID: _yocto_api.YAPI.INVALID_LONG,
            DATETIME_INVALID: _yocto_api.YAPI.INVALID_STRING,
            UTCOFFSET_INVALID: _yocto_api.YAPI.INVALID_INT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YGps constructor)
    }

    //--- (YGps implementation)

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
            var res = new YGpsProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'isFixed':
                this._isFixed = parseInt(val);
                return 1;
            case 'satCount':
                this._satCount = parseInt(val);
                return 1;
            case 'coordSystem':
                this._coordSystem = parseInt(val);
                return 1;
            case 'latitude':
                this._latitude = val;
                return 1;
            case 'longitude':
                this._longitude = val;
                return 1;
            case 'dilution':
                this._dilution = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'altitude':
                this._altitude = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'groundSpeed':
                this._groundSpeed = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'direction':
                this._direction = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'unixTime':
                this._unixTime = parseInt(val);
                return 1;
            case 'dateTime':
                this._dateTime = val;
                return 1;
            case 'utcOffset':
                this._utcOffset = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return {number} either YGps.ISFIXED_FALSE or YGps.ISFIXED_TRUE, according to TRUE if the receiver
     * has found enough satellites to work
     *
     * On failure, throws an exception or returns YGps.ISFIXED_INVALID.
     */
    get_isFixed() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_ISFIXED_INVALID;
                }
            }
            return _this2._isFixed;
        })();
    }

    /**
     * Returns the count of visible satellites.
     *
     * @return {number} an integer corresponding to the count of visible satellites
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    get_satCount() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_SATCOUNT_INVALID;
                }
            }
            return _this3._satCount;
        })();
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return {number} a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    get_coordSystem() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_COORDSYSTEM_INVALID;
                }
            }
            return _this4._coordSystem;
        })();
    }

    /**
     * Changes the representation system used for positioning data.
     *
     * @param newval {number} : a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_coordSystem(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('coordSystem', rest_val);
        })();
    }

    /**
     * Returns the current latitude.
     *
     * @return {string} a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    get_latitude() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_LATITUDE_INVALID;
                }
            }
            return _this6._latitude;
        })();
    }

    /**
     * Returns the current longitude.
     *
     * @return {string} a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    get_longitude() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_LONGITUDE_INVALID;
                }
            }
            return _this7._longitude;
        })();
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return {number} a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns YGps.DILUTION_INVALID.
     */
    get_dilution() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_DILUTION_INVALID;
                }
            }
            return _this8._dilution;
        })();
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return {number} a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    get_altitude() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_ALTITUDE_INVALID;
                }
            }
            return _this9._altitude;
        })();
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return {number} a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    get_groundSpeed() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_GROUNDSPEED_INVALID;
                }
            }
            return _this10._groundSpeed;
        })();
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return {number} a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns YGps.DIRECTION_INVALID.
     */
    get_direction() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_DIRECTION_INVALID;
                }
            }
            return _this11._direction;
        })();
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return {number} an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns YGps.UNIXTIME_INVALID.
     */
    get_unixTime() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_UNIXTIME_INVALID;
                }
            }
            return _this12._unixTime;
        })();
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return {string} a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    get_dateTime() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_DATETIME_INVALID;
                }
            }
            return _this13._dateTime;
        })();
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return {number} an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    get_utcOffset() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_UTCOFFSET_INVALID;
                }
            }
            return _this14._utcOffset;
        })();
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     *
     * @param newval {number} : an integer corresponding to the number of seconds between current time and
     * UTC time (time zone)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this15._setAttr('utcOffset', rest_val);
        })();
    }

    get_command() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this16._command;
        })();
    }

    set_command(newval) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this17._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a GPS for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the GPS is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the GPS is
     * indeed online at a given time. In case of ambiguity when looking for
     * a GPS by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the GPS
     *
     * @return {YGps} a YGps object allowing you to drive the GPS.
     */
    static FindGps(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Gps', func);
        if (obj == null) {
            obj = new YGps(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Gps', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a GPS for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the GPS is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGps.isOnline() to test if the GPS is
     * indeed online at a given time. In case of ambiguity when looking for
     * a GPS by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the GPS
     *
     * @return {YGps} a YGps object allowing you to drive the GPS.
     */
    static FindGpsInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Gps', func);
        if (obj == null) {
            obj = new YGps(yctx, func);
            _yocto_api.YFunction._AddToCache('Gps', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of GPS started using yFirstGps().
     *
     * @return {YGps} a pointer to a YGps object, corresponding to
     *         a GPS currently online, or a null pointer
     *         if there are no more GPS to enumerate.
     */
    nextGps() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YGps.FindGpsInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of GPS currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next GPS.
     *
     * @return {YGps} a pointer to a YGps object, corresponding to
     *         the first GPS currently online, or a null pointer
     *         if there are none.
     */
    static FirstGps() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Gps');
        if (next_hwid == null) return null;
        return YGps.FindGps(next_hwid);
    }

    /**
     * Starts the enumeration of GPS currently accessible.
     * Use the method YGps.nextGps() to iterate on
     * next GPS.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YGps} a pointer to a YGps object, corresponding to
     *         the first GPS currently online, or a null pointer
     *         if there are none.
     */
    static FirstGpsInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Gps');
        if (next_hwid == null) return null;
        return YGps.FindGpsInContext(yctx, next_hwid);
    }

    //--- (end of YGps implementation)
}

exports.YGps = YGps; //
// YGpsProxy Class: synchronous proxy to YGps objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YGps objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YGpsProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YGps accessors declaration)

    /**
     * Returns TRUE if the receiver has found enough satellites to work.
     *
     * @return either Y_ISFIXED_FALSE or Y_ISFIXED_TRUE, according to TRUE if the receiver has found
     * enough satellites to work
     *
     * On failure, throws an exception or returns Y_ISFIXED_INVALID.
     */
    get_isFixed() {
        return this.liveFunc._isFixed;
    }

    /**
     * Returns the count of visible satellites.
     *
     * @return an integer corresponding to the count of visible satellites
     *
     * On failure, throws an exception or returns Y_SATCOUNT_INVALID.
     */
    get_satCount() {
        return this.liveFunc._satCount;
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return a value among Y_COORDSYSTEM_GPS_DMS, Y_COORDSYSTEM_GPS_DM and Y_COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns Y_COORDSYSTEM_INVALID.
     */
    get_coordSystem() {
        return this.liveFunc._coordSystem;
    }

    /**
     * Changes the representation system used for positioning data.
     *
     * @param newval : a value among Y_COORDSYSTEM_GPS_DMS, Y_COORDSYSTEM_GPS_DM and Y_COORDSYSTEM_GPS_D
     * corresponding to the representation system used for positioning data
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_coordSystem(newval) {
        this.liveFunc.set_coordSystem(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current latitude.
     *
     * @return a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns Y_LATITUDE_INVALID.
     */
    get_latitude() {
        return this.liveFunc._latitude;
    }

    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns Y_LONGITUDE_INVALID.
     */
    get_longitude() {
        return this.liveFunc._longitude;
    }

    /**
     * Returns the current horizontal dilution of precision,
     * the smaller that number is, the better .
     *
     * @return a floating point number corresponding to the current horizontal dilution of precision,
     *         the smaller that number is, the better
     *
     * On failure, throws an exception or returns Y_DILUTION_INVALID.
     */
    get_dilution() {
        return this.liveFunc._dilution;
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns Y_ALTITUDE_INVALID.
     */
    get_altitude() {
        return this.liveFunc._altitude;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns Y_GROUNDSPEED_INVALID.
     */
    get_groundSpeed() {
        return this.liveFunc._groundSpeed;
    }

    /**
     * Returns the current move bearing in degrees, zero
     * is the true (geographic) north.
     *
     * @return a floating point number corresponding to the current move bearing in degrees, zero
     *         is the true (geographic) north
     *
     * On failure, throws an exception or returns Y_DIRECTION_INVALID.
     */
    get_direction() {
        return this.liveFunc._direction;
    }

    /**
     * Returns the current time in Unix format (number of
     * seconds elapsed since Jan 1st, 1970).
     *
     * @return an integer corresponding to the current time in Unix format (number of
     *         seconds elapsed since Jan 1st, 1970)
     *
     * On failure, throws an exception or returns Y_UNIXTIME_INVALID.
     */
    get_unixTime() {
        return this.liveFunc._unixTime;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns Y_DATETIME_INVALID.
     */
    get_dateTime() {
        return this.liveFunc._dateTime;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns Y_UTCOFFSET_INVALID.
     */
    get_utcOffset() {
        return this.liveFunc._utcOffset;
    }

    /**
     * Changes the number of seconds between current time and UTC time (time zone).
     * The timezone is automatically rounded to the nearest multiple of 15 minutes.
     * If current UTC time is known, the current time is automatically be updated according to the selected time zone.
     *
     * @param newval : an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_utcOffset(newval) {
        this.liveFunc.set_utcOffset(newval);
        return this._yapi.SUCCESS;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YGps accessors declaration)
}

exports.YGpsProxy = YGpsProxy; //--- (Gps functions)

/**
 * Retrieves a GPS for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the GPS is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGps.isOnline() to test if the GPS is
 * indeed online at a given time. In case of ambiguity when looking for
 * a GPS by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the GPS
 *
 * @return {YGps} a YGps object allowing you to drive the GPS.
 */

function yFindGps(func) {
    return YGps.FindGps(func);
}

/**
 * Starts the enumeration of GPS currently accessible.
 * Use the method YGps.nextGps() to iterate on
 * next GPS.
 *
 * @return {YGps} a pointer to a YGps object, corresponding to
 *         the first GPS currently online, or a null pointer
 *         if there are none.
 */
function yFirstGps() {
    return YGps.FirstGps();
}

//--- (end of Gps functions)
