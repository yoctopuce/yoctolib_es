/*********************************************************************
 *
 * $Id: yocto_current.js 26183 2016-12-15 00:14:02Z mvuilleu $
 *
 * Implements the high-level API for Current functions
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

//--- (YCurrent return codes)
//--- (end of YCurrent return codes)
//--- (YCurrent definitions)
export var Y_ENABLED_FALSE                 = 0;
export var Y_ENABLED_TRUE                  = 1;
export var Y_ENABLED_INVALID               = -1;
//--- (end of YCurrent definitions)

//--- (YCurrent class start)
/**
 * YCurrent Class: Current function interface
 *
 * The Yoctopuce class YCurrent allows you to read and configure Yoctopuce current
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YCurrent class start)

export class YCurrent extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YCurrent constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Current';
        /** @member {number} **/
        this._enabled                    = Y_ENABLED_INVALID;
        this.imm_setConst({
            ENABLED_FALSE                : 0,
            ENABLED_TRUE                 : 1,
            ENABLED_INVALID              : -1
        });
        //--- (end of YCurrent constructor)
    }

    //--- (YCurrent implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YCurrentProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'enabled':
            this._enabled = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    async get_enabled()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ENABLED_INVALID;
            }
        }
        return this._enabled;
    }

    async set_enabled(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('enabled',rest_val);
    }

    /**
     * Retrieves a current sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the current sensor
     *
     * @return {YCurrent} a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrent(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Current', func);
        if (obj == null) {
            obj = new YCurrent(YAPI, func);
            YFunction._AddToCache('Current',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a current sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the current sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrent.isOnline() to test if the current sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a current sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the current sensor
     *
     * @return {YCurrent} a YCurrent object allowing you to drive the current sensor.
     */
    static FindCurrentInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Current', func);
        if (obj == null) {
            obj = new YCurrent(yctx, func);
            YFunction._AddToCache('Current',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of current sensors started using yFirstCurrent().
     *
     * @return {YCurrent} a pointer to a YCurrent object, corresponding to
     *         a current sensor currently online, or a null pointer
     *         if there are no more current sensors to enumerate.
     */
    nextCurrent()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YCurrent.FindCurrentInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @return {YCurrent} a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrent()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Current');
        if(next_hwid == null) return null;
        return YCurrent.FindCurrent(next_hwid);
    }

    /**
     * Starts the enumeration of current sensors currently accessible.
     * Use the method YCurrent.nextCurrent() to iterate on
     * next current sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCurrent} a pointer to a YCurrent object, corresponding to
     *         the first current sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Current');
        if(next_hwid == null) return null;
        return YCurrent.FindCurrentInContext(yctx, next_hwid);
    }

    //--- (end of YCurrent implementation)
}

//
// YCurrentProxy Class: synchronous proxy to YCurrent objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCurrent objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
export class YCurrentProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YCurrent accessors declaration)

    get_enabled()
    {
        return this.liveFunc._enabled;
    }

    set_enabled(newval)
    {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YCurrent accessors declaration)
}

//--- (Current functions)

/**
 * Retrieves a current sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the current sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCurrent.isOnline() to test if the current sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a current sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the current sensor
 *
 * @return {YCurrent} a YCurrent object allowing you to drive the current sensor.
 */
export function yFindCurrent(func)
{
    return YCurrent.FindCurrent(func);
}

/**
 * Starts the enumeration of current sensors currently accessible.
 * Use the method YCurrent.nextCurrent() to iterate on
 * next current sensors.
 *
 * @return {YCurrent} a pointer to a YCurrent object, corresponding to
 *         the first current sensor currently online, or a null pointer
 *         if there are none.
 */
export function yFirstCurrent()
{
    return YCurrent.FirstCurrent();
}

//--- (end of Current functions)
