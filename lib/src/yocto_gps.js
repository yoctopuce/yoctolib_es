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
import { YAPI, YAPI_SUCCESS, YFunction, YModule, YSensor, YFunctionProxy, YSensorProxy } from 'yoctolib-es/src/yocto_api'

//--- (YGps return codes)
//--- (end of YGps return codes)
//--- (YGps definitions)
export var Y_ISFIXED_FALSE                 = 0;
export var Y_ISFIXED_TRUE                  = 1;
export var Y_ISFIXED_INVALID               = -1;
export var Y_COORDSYSTEM_GPS_DMS           = 0;
export var Y_COORDSYSTEM_GPS_DM            = 1;
export var Y_COORDSYSTEM_GPS_D             = 2;
export var Y_COORDSYSTEM_INVALID           = -1;
export var Y_SATCOUNT_INVALID              = YAPI.INVALID_LONG;
export var Y_LATITUDE_INVALID              = YAPI.INVALID_STRING;
export var Y_LONGITUDE_INVALID             = YAPI.INVALID_STRING;
export var Y_DILUTION_INVALID              = YAPI.INVALID_DOUBLE;
export var Y_ALTITUDE_INVALID              = YAPI.INVALID_DOUBLE;
export var Y_GROUNDSPEED_INVALID           = YAPI.INVALID_DOUBLE;
export var Y_DIRECTION_INVALID             = YAPI.INVALID_DOUBLE;
export var Y_UNIXTIME_INVALID              = YAPI.INVALID_LONG;
export var Y_DATETIME_INVALID              = YAPI.INVALID_STRING;
export var Y_UTCOFFSET_INVALID             = YAPI.INVALID_INT;
export var Y_COMMAND_INVALID               = YAPI.INVALID_STRING;
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

export class YGps extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YGps constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Gps';
        /** @member {number} **/
        this._isFixed                    = Y_ISFIXED_INVALID;
        /** @member {number} **/
        this._satCount                   = Y_SATCOUNT_INVALID;
        /** @member {number} **/
        this._coordSystem                = Y_COORDSYSTEM_INVALID;
        /** @member {string} **/
        this._latitude                   = Y_LATITUDE_INVALID;
        /** @member {string} **/
        this._longitude                  = Y_LONGITUDE_INVALID;
        /** @member {number} **/
        this._dilution                   = Y_DILUTION_INVALID;
        /** @member {number} **/
        this._altitude                   = Y_ALTITUDE_INVALID;
        /** @member {number} **/
        this._groundSpeed                = Y_GROUNDSPEED_INVALID;
        /** @member {number} **/
        this._direction                  = Y_DIRECTION_INVALID;
        /** @member {number} **/
        this._unixTime                   = Y_UNIXTIME_INVALID;
        /** @member {string} **/
        this._dateTime                   = Y_DATETIME_INVALID;
        /** @member {number} **/
        this._utcOffset                  = Y_UTCOFFSET_INVALID;
        /** @member {string} **/
        this._command                    = Y_COMMAND_INVALID;
        this.imm_setConst({
            ISFIXED_FALSE                : 0,
            ISFIXED_TRUE                 : 1,
            ISFIXED_INVALID              : -1,
            SATCOUNT_INVALID             : YAPI.INVALID_LONG,
            COORDSYSTEM_GPS_DMS          : 0,
            COORDSYSTEM_GPS_DM           : 1,
            COORDSYSTEM_GPS_D            : 2,
            COORDSYSTEM_INVALID          : -1,
            LATITUDE_INVALID             : YAPI.INVALID_STRING,
            LONGITUDE_INVALID            : YAPI.INVALID_STRING,
            DILUTION_INVALID             : YAPI.INVALID_DOUBLE,
            ALTITUDE_INVALID             : YAPI.INVALID_DOUBLE,
            GROUNDSPEED_INVALID          : YAPI.INVALID_DOUBLE,
            DIRECTION_INVALID            : YAPI.INVALID_DOUBLE,
            UNIXTIME_INVALID             : YAPI.INVALID_LONG,
            DATETIME_INVALID             : YAPI.INVALID_STRING,
            UTCOFFSET_INVALID            : YAPI.INVALID_INT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
        //--- (end of YGps constructor)
    }

    //--- (YGps implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YGpsProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
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
    async get_isFixed()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ISFIXED_INVALID;
            }
        }
        return this._isFixed;
    }

    /**
     * Returns the count of visible satellites.
     *
     * @return {number} an integer corresponding to the count of visible satellites
     *
     * On failure, throws an exception or returns YGps.SATCOUNT_INVALID.
     */
    async get_satCount()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_SATCOUNT_INVALID;
            }
        }
        return this._satCount;
    }

    /**
     * Returns the representation system used for positioning data.
     *
     * @return {number} a value among YGps.COORDSYSTEM_GPS_DMS, YGps.COORDSYSTEM_GPS_DM and
     * YGps.COORDSYSTEM_GPS_D corresponding to the representation system used for positioning data
     *
     * On failure, throws an exception or returns YGps.COORDSYSTEM_INVALID.
     */
    async get_coordSystem()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_COORDSYSTEM_INVALID;
            }
        }
        return this._coordSystem;
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
    async set_coordSystem(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('coordSystem',rest_val);
    }

    /**
     * Returns the current latitude.
     *
     * @return {string} a string corresponding to the current latitude
     *
     * On failure, throws an exception or returns YGps.LATITUDE_INVALID.
     */
    async get_latitude()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_LATITUDE_INVALID;
            }
        }
        return this._latitude;
    }

    /**
     * Returns the current longitude.
     *
     * @return {string} a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns YGps.LONGITUDE_INVALID.
     */
    async get_longitude()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_LONGITUDE_INVALID;
            }
        }
        return this._longitude;
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
    async get_dilution()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_DILUTION_INVALID;
            }
        }
        return this._dilution;
    }

    /**
     * Returns the current altitude. Beware:  GPS technology
     * is very inaccurate regarding altitude.
     *
     * @return {number} a floating point number corresponding to the current altitude
     *
     * On failure, throws an exception or returns YGps.ALTITUDE_INVALID.
     */
    async get_altitude()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ALTITUDE_INVALID;
            }
        }
        return this._altitude;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return {number} a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns YGps.GROUNDSPEED_INVALID.
     */
    async get_groundSpeed()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_GROUNDSPEED_INVALID;
            }
        }
        return this._groundSpeed;
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
    async get_direction()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_DIRECTION_INVALID;
            }
        }
        return this._direction;
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
    async get_unixTime()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_UNIXTIME_INVALID;
            }
        }
        return this._unixTime;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return {string} a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns YGps.DATETIME_INVALID.
     */
    async get_dateTime()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_DATETIME_INVALID;
            }
        }
        return this._dateTime;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return {number} an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns YGps.UTCOFFSET_INVALID.
     */
    async get_utcOffset()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_UTCOFFSET_INVALID;
            }
        }
        return this._utcOffset;
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
    async set_utcOffset(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('utcOffset',rest_val);
    }

    async get_command()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        return this._command;
    }

    async set_command(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('command',rest_val);
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
    static FindGps(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Gps', func);
        if (obj == null) {
            obj = new YGps(YAPI, func);
            YFunction._AddToCache('Gps',  func, obj);
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
    static FindGpsInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Gps', func);
        if (obj == null) {
            obj = new YGps(yctx, func);
            YFunction._AddToCache('Gps',  func, obj);
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
    nextGps()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
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
    static FirstGps()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Gps');
        if(next_hwid == null) return null;
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
    static FirstGpsInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Gps');
        if(next_hwid == null) return null;
        return YGps.FindGpsInContext(yctx, next_hwid);
    }

    //--- (end of YGps implementation)
}

//
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
export class YGpsProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
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
    get_isFixed()
    {
        return this.liveFunc._isFixed;
    }

    /**
     * Returns the count of visible satellites.
     *
     * @return an integer corresponding to the count of visible satellites
     *
     * On failure, throws an exception or returns Y_SATCOUNT_INVALID.
     */
    get_satCount()
    {
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
    get_coordSystem()
    {
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
    set_coordSystem(newval)
    {
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
    get_latitude()
    {
        return this.liveFunc._latitude;
    }

    /**
     * Returns the current longitude.
     *
     * @return a string corresponding to the current longitude
     *
     * On failure, throws an exception or returns Y_LONGITUDE_INVALID.
     */
    get_longitude()
    {
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
    get_dilution()
    {
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
    get_altitude()
    {
        return this.liveFunc._altitude;
    }

    /**
     * Returns the current ground speed in Km/h.
     *
     * @return a floating point number corresponding to the current ground speed in Km/h
     *
     * On failure, throws an exception or returns Y_GROUNDSPEED_INVALID.
     */
    get_groundSpeed()
    {
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
    get_direction()
    {
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
    get_unixTime()
    {
        return this.liveFunc._unixTime;
    }

    /**
     * Returns the current time in the form "YYYY/MM/DD hh:mm:ss".
     *
     * @return a string corresponding to the current time in the form "YYYY/MM/DD hh:mm:ss"
     *
     * On failure, throws an exception or returns Y_DATETIME_INVALID.
     */
    get_dateTime()
    {
        return this.liveFunc._dateTime;
    }

    /**
     * Returns the number of seconds between current time and UTC time (time zone).
     *
     * @return an integer corresponding to the number of seconds between current time and UTC time (time zone)
     *
     * On failure, throws an exception or returns Y_UTCOFFSET_INVALID.
     */
    get_utcOffset()
    {
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
    set_utcOffset(newval)
    {
        this.liveFunc.set_utcOffset(newval);
        return this._yapi.SUCCESS;
    }

    get_command()
    {
        return this.liveFunc._command;
    }

    set_command(newval)
    {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YGps accessors declaration)
}

//--- (Gps functions)

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
export function yFindGps(func)
{
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
export function yFirstGps()
{
    return YGps.FirstGps();
}

//--- (end of Gps functions)
