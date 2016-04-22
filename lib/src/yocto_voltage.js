/*********************************************************************
 *
 * $Id: yocto_voltage.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Voltage functions
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

//--- (YVoltage return codes)
//--- (end of YVoltage return codes)
//--- (YVoltage definitions)
//--- (end of YVoltage definitions)

//--- (YVoltage class start)
/**
 * YVoltage Class: Voltage function interface
 *
 * The Yoctopuce class YVoltage allows you to read and configure Yoctopuce voltage
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 */
//--- (end of YVoltage class start)

export class YVoltage extends YSensor
{
    constructor(obj_yapi, str_func)
    {
        //--- (YVoltage constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Voltage';
        //--- (end of YVoltage constructor)
    }

    //--- (YVoltage implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YVoltageProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    /**
     * Retrieves a voltage sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if the voltage sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the voltage sensor
     *
     * @return {YVoltage} a YVoltage object allowing you to drive the voltage sensor.
     */
    static FindVoltage(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Voltage', func);
        if (obj == null) {
            obj = new YVoltage(YAPI, func);
            YFunction._AddToCache('Voltage',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a voltage sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the voltage sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YVoltage.isOnline() to test if the voltage sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a voltage sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the voltage sensor
     *
     * @return {YVoltage} a YVoltage object allowing you to drive the voltage sensor.
     */
    static FindVoltageInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Voltage', func);
        if (obj == null) {
            obj = new YVoltage(yctx, func);
            YFunction._AddToCache('Voltage',  func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of voltage sensors started using yFirstVoltage().
     *
     * @return {YVoltage} a pointer to a YVoltage object, corresponding to
     *         a voltage sensor currently online, or a null pointer
     *         if there are no more voltage sensors to enumerate.
     */
    nextVoltage()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YVoltage.FindVoltageInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of voltage sensors currently accessible.
     * Use the method YVoltage.nextVoltage() to iterate on
     * next voltage sensors.
     *
     * @return {YVoltage} a pointer to a YVoltage object, corresponding to
     *         the first voltage sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltage()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Voltage');
        if(next_hwid == null) return null;
        return YVoltage.FindVoltage(next_hwid);
    }

    /**
     * Starts the enumeration of voltage sensors currently accessible.
     * Use the method YVoltage.nextVoltage() to iterate on
     * next voltage sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YVoltage} a pointer to a YVoltage object, corresponding to
     *         the first voltage sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstVoltageInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Voltage');
        if(next_hwid == null) return null;
        return YVoltage.FindVoltageInContext(yctx, next_hwid);
    }

    //--- (end of YVoltage implementation)
}

//
// YVoltageProxy Class: synchronous proxy to YVoltage objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YVoltage objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/
export class YVoltageProxy extends YSensorProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YVoltage accessors declaration)
    //--- (end of YVoltage accessors declaration)
}

//--- (Voltage functions)

/**
 * Retrieves a voltage sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the voltage sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YVoltage.isOnline() to test if the voltage sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a voltage sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the voltage sensor
 *
 * @return {YVoltage} a YVoltage object allowing you to drive the voltage sensor.
 */
export function yFindVoltage(func)
{
    return YVoltage.FindVoltage(func);
}

/**
 * Starts the enumeration of voltage sensors currently accessible.
 * Use the method YVoltage.nextVoltage() to iterate on
 * next voltage sensors.
 *
 * @return {YVoltage} a pointer to a YVoltage object, corresponding to
 *         the first voltage sensor currently online, or a null pointer
 *         if there are none.
 */
export function yFirstVoltage()
{
    return YVoltage.FirstVoltage();
}

//--- (end of Voltage functions)
