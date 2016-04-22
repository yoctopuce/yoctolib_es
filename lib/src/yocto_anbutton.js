/*********************************************************************
 *
 * $Id: yocto_anbutton.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for AnButton functions
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

//--- (YAnButton return codes)
//--- (end of YAnButton return codes)
//--- (YAnButton definitions)
export var Y_ANALOGCALIBRATION_OFF         = 0;
export var Y_ANALOGCALIBRATION_ON          = 1;
export var Y_ANALOGCALIBRATION_INVALID     = -1;
export var Y_ISPRESSED_FALSE               = 0;
export var Y_ISPRESSED_TRUE                = 1;
export var Y_ISPRESSED_INVALID             = -1;
export var Y_CALIBRATEDVALUE_INVALID       = YAPI.INVALID_UINT;
export var Y_RAWVALUE_INVALID              = YAPI.INVALID_UINT;
export var Y_CALIBRATIONMAX_INVALID        = YAPI.INVALID_UINT;
export var Y_CALIBRATIONMIN_INVALID        = YAPI.INVALID_UINT;
export var Y_SENSITIVITY_INVALID           = YAPI.INVALID_UINT;
export var Y_LASTTIMEPRESSED_INVALID       = YAPI.INVALID_LONG;
export var Y_LASTTIMERELEASED_INVALID      = YAPI.INVALID_LONG;
export var Y_PULSECOUNTER_INVALID          = YAPI.INVALID_LONG;
export var Y_PULSETIMER_INVALID            = YAPI.INVALID_LONG;
//--- (end of YAnButton definitions)

//--- (YAnButton class start)
/**
 * YAnButton Class: AnButton function interface
 *
 * Yoctopuce application programming interface allows you to measure the state
 * of a simple button as well as to read an analog potentiometer (variable resistance).
 * This can be use for instance with a continuous rotating knob, a throttle grip
 * or a joystick. The module is capable to calibrate itself on min and max values,
 * in order to compute a calibrated value that varies proportionally with the
 * potentiometer position, regardless of its total resistance.
 */
//--- (end of YAnButton class start)

export class YAnButton extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YAnButton constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'AnButton';
        /** @member {number} **/
        this._calibratedValue            = Y_CALIBRATEDVALUE_INVALID;
        /** @member {number} **/
        this._rawValue                   = Y_RAWVALUE_INVALID;
        /** @member {number} **/
        this._analogCalibration          = Y_ANALOGCALIBRATION_INVALID;
        /** @member {number} **/
        this._calibrationMax             = Y_CALIBRATIONMAX_INVALID;
        /** @member {number} **/
        this._calibrationMin             = Y_CALIBRATIONMIN_INVALID;
        /** @member {number} **/
        this._sensitivity                = Y_SENSITIVITY_INVALID;
        /** @member {number} **/
        this._isPressed                  = Y_ISPRESSED_INVALID;
        /** @member {number} **/
        this._lastTimePressed            = Y_LASTTIMEPRESSED_INVALID;
        /** @member {number} **/
        this._lastTimeReleased           = Y_LASTTIMERELEASED_INVALID;
        /** @member {number} **/
        this._pulseCounter               = Y_PULSECOUNTER_INVALID;
        /** @member {number} **/
        this._pulseTimer                 = Y_PULSETIMER_INVALID;
        this.imm_setConst({
            CALIBRATEDVALUE_INVALID      : YAPI.INVALID_UINT,
            RAWVALUE_INVALID             : YAPI.INVALID_UINT,
            ANALOGCALIBRATION_OFF        : 0,
            ANALOGCALIBRATION_ON         : 1,
            ANALOGCALIBRATION_INVALID    : -1,
            CALIBRATIONMAX_INVALID       : YAPI.INVALID_UINT,
            CALIBRATIONMIN_INVALID       : YAPI.INVALID_UINT,
            SENSITIVITY_INVALID          : YAPI.INVALID_UINT,
            ISPRESSED_FALSE              : 0,
            ISPRESSED_TRUE               : 1,
            ISPRESSED_INVALID            : -1,
            LASTTIMEPRESSED_INVALID      : YAPI.INVALID_LONG,
            LASTTIMERELEASED_INVALID     : YAPI.INVALID_LONG,
            PULSECOUNTER_INVALID         : YAPI.INVALID_LONG,
            PULSETIMER_INVALID           : YAPI.INVALID_LONG
        });
        //--- (end of YAnButton constructor)
    }

    //--- (YAnButton implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YAnButtonProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'calibratedValue':
            this._calibratedValue = parseInt(val);
            return 1;
        case 'rawValue':
            this._rawValue = parseInt(val);
            return 1;
        case 'analogCalibration':
            this._analogCalibration = parseInt(val);
            return 1;
        case 'calibrationMax':
            this._calibrationMax = parseInt(val);
            return 1;
        case 'calibrationMin':
            this._calibrationMin = parseInt(val);
            return 1;
        case 'sensitivity':
            this._sensitivity = parseInt(val);
            return 1;
        case 'isPressed':
            this._isPressed = parseInt(val);
            return 1;
        case 'lastTimePressed':
            this._lastTimePressed = parseInt(val);
            return 1;
        case 'lastTimeReleased':
            this._lastTimeReleased = parseInt(val);
            return 1;
        case 'pulseCounter':
            this._pulseCounter = parseInt(val);
            return 1;
        case 'pulseTimer':
            this._pulseTimer = parseInt(val);
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return {number} an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATEDVALUE_INVALID.
     */
    async get_calibratedValue()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALIBRATEDVALUE_INVALID;
            }
        }
        return this._calibratedValue;
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the current measured input value as-is (between 0 and
     * 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.RAWVALUE_INVALID.
     */
    async get_rawValue()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_RAWVALUE_INVALID;
            }
        }
        return this._rawValue;
    }

    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return {number} either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns YAnButton.ANALOGCALIBRATION_INVALID.
     */
    async get_analogCalibration()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ANALOGCALIBRATION_INVALID;
            }
        }
        return this._analogCalibration;
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     *
     * @param newval {number} : either YAnButton.ANALOGCALIBRATION_OFF or YAnButton.ANALOGCALIBRATION_ON
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_analogCalibration(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('analogCalibration',rest_val);
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the maximal value measured during the calibration
     * (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMAX_INVALID.
     */
    async get_calibrationMax()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALIBRATIONMAX_INVALID;
            }
        }
        return this._calibrationMax;
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the maximal calibration value for the input
     * (between 0 and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibrationMax(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('calibrationMax',rest_val);
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return {number} an integer corresponding to the minimal value measured during the calibration
     * (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns YAnButton.CALIBRATIONMIN_INVALID.
     */
    async get_calibrationMin()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_CALIBRATIONMIN_INVALID;
            }
        }
        return this._calibrationMin;
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the minimal calibration value for the input
     * (between 0 and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_calibrationMin(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('calibrationMin',rest_val);
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return {number} an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns YAnButton.SENSITIVITY_INVALID.
     */
    async get_sensitivity()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_SENSITIVITY_INVALID;
            }
        }
        return this._sensitivity;
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the sensibility for the input (between 1 and
     * 1000) for triggering user callbacks
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_sensitivity(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('sensitivity',rest_val);
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return {number} either YAnButton.ISPRESSED_FALSE or YAnButton.ISPRESSED_TRUE, according to true if
     * the input (considered as binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns YAnButton.ISPRESSED_INVALID.
     */
    async get_isPressed()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ISPRESSED_INVALID;
            }
        }
        return this._isPressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitioned from open to closed).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last time
     *         the input button was pressed (the input contact transitioned from open to closed)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMEPRESSED_INVALID.
     */
    async get_lastTimePressed()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_LASTTIMEPRESSED_INVALID;
            }
        }
        return this._lastTimePressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitioned from closed to open).
     *
     * @return {number} an integer corresponding to the number of elapsed milliseconds between the module
     * power on and the last time
     *         the input button was released (the input contact transitioned from closed to open)
     *
     * On failure, throws an exception or returns YAnButton.LASTTIMERELEASED_INVALID.
     */
    async get_lastTimeReleased()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_LASTTIMERELEASED_INVALID;
            }
        }
        return this._lastTimeReleased;
    }

    /**
     * Returns the pulse counter value.
     *
     * @return {number} an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns YAnButton.PULSECOUNTER_INVALID.
     */
    async get_pulseCounter()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PULSECOUNTER_INVALID;
            }
        }
        return this._pulseCounter;
    }

    async set_pulseCounter(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('pulseCounter',rest_val);
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return {number} an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns YAnButton.PULSETIMER_INVALID.
     */
    async get_pulseTimer()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PULSETIMER_INVALID;
            }
        }
        return this._pulseTimer;
    }

    /**
     * Retrieves an analog input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the analog input
     *
     * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButton(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('AnButton', func);
        if (obj == null) {
            obj = new YAnButton(YAPI, func);
            YFunction._AddToCache('AnButton',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an analog input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the analog input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAnButton.isOnline() to test if the analog input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an analog input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the analog input
     *
     * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
     */
    static FindAnButtonInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'AnButton', func);
        if (obj == null) {
            obj = new YAnButton(yctx, func);
            YFunction._AddToCache('AnButton',  func, obj);
        }
        return obj;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async resetCounter()
    {
        return await this.set_pulseCounter(0);
    }

    /**
     * Continues the enumeration of analog inputs started using yFirstAnButton().
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         an analog input currently online, or a null pointer
     *         if there are no more analog inputs to enumerate.
     */
    nextAnButton()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButton()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('AnButton');
        if(next_hwid == null) return null;
        return YAnButton.FindAnButton(next_hwid);
    }

    /**
     * Starts the enumeration of analog inputs currently accessible.
     * Use the method YAnButton.nextAnButton() to iterate on
     * next analog inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAnButton} a pointer to a YAnButton object, corresponding to
     *         the first analog input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAnButtonInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AnButton');
        if(next_hwid == null) return null;
        return YAnButton.FindAnButtonInContext(yctx, next_hwid);
    }

    //--- (end of YAnButton implementation)
}

//
// YAnButtonProxy Class: synchronous proxy to YAnButton objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAnButton objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
export class YAnButtonProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YAnButton accessors declaration)

    /**
     * Returns the current calibrated input value (between 0 and 1000, included).
     *
     * @return an integer corresponding to the current calibrated input value (between 0 and 1000, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATEDVALUE_INVALID.
     */
    get_calibratedValue()
    {
        return this.liveFunc._calibratedValue;
    }

    /**
     * Returns the current measured input value as-is (between 0 and 4095, included).
     *
     * @return an integer corresponding to the current measured input value as-is (between 0 and 4095, included)
     *
     * On failure, throws an exception or returns Y_RAWVALUE_INVALID.
     */
    get_rawValue()
    {
        return this.liveFunc._rawValue;
    }

    /**
     * Tells if a calibration process is currently ongoing.
     *
     * @return either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     *
     * On failure, throws an exception or returns Y_ANALOGCALIBRATION_INVALID.
     */
    get_analogCalibration()
    {
        return this.liveFunc._analogCalibration;
    }

    /**
     * Starts or stops the calibration process. Remember to call the saveToFlash()
     * method of the module at the end of the calibration if the modification must be kept.
     *
     * @param newval : either Y_ANALOGCALIBRATION_OFF or Y_ANALOGCALIBRATION_ON
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_analogCalibration(newval)
    {
        this.liveFunc.set_analogCalibration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the maximal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATIONMAX_INVALID.
     */
    get_calibrationMax()
    {
        return this.liveFunc._calibrationMax;
    }

    /**
     * Changes the maximal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the maximal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMax(newval)
    {
        this.liveFunc.set_calibrationMax(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minimal value measured during the calibration (between 0 and 4095, included).
     *
     * @return an integer corresponding to the minimal value measured during the calibration (between 0
     * and 4095, included)
     *
     * On failure, throws an exception or returns Y_CALIBRATIONMIN_INVALID.
     */
    get_calibrationMin()
    {
        return this.liveFunc._calibrationMin;
    }

    /**
     * Changes the minimal calibration value for the input (between 0 and 4095, included), without actually
     * starting the automated calibration.  Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the minimal calibration value for the input (between 0
     * and 4095, included), without actually
     *         starting the automated calibration
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_calibrationMin(newval)
    {
        this.liveFunc.set_calibrationMin(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     *
     * @return an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * On failure, throws an exception or returns Y_SENSITIVITY_INVALID.
     */
    get_sensitivity()
    {
        return this.liveFunc._sensitivity;
    }

    /**
     * Changes the sensibility for the input (between 1 and 1000) for triggering user callbacks.
     * The sensibility is used to filter variations around a fixed value, but does not preclude the
     * transmission of events when the input value evolves constantly in the same direction.
     * Special case: when the value 1000 is used, the callback will only be thrown when the logical state
     * of the input switches from pressed to released and back.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : an integer corresponding to the sensibility for the input (between 1 and 1000) for
     * triggering user callbacks
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensitivity(newval)
    {
        this.liveFunc.set_sensitivity(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the input (considered as binary) is active (closed contact), and false otherwise.
     *
     * @return either Y_ISPRESSED_FALSE or Y_ISPRESSED_TRUE, according to true if the input (considered as
     * binary) is active (closed contact), and false otherwise
     *
     * On failure, throws an exception or returns Y_ISPRESSED_INVALID.
     */
    get_isPressed()
    {
        return this.liveFunc._isPressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was pressed (the input contact transitioned from open to closed).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was pressed (the input contact transitioned from open to closed)
     *
     * On failure, throws an exception or returns Y_LASTTIMEPRESSED_INVALID.
     */
    get_lastTimePressed()
    {
        return this.liveFunc._lastTimePressed;
    }

    /**
     * Returns the number of elapsed milliseconds between the module power on and the last time
     * the input button was released (the input contact transitioned from closed to open).
     *
     * @return an integer corresponding to the number of elapsed milliseconds between the module power on
     * and the last time
     *         the input button was released (the input contact transitioned from closed to open)
     *
     * On failure, throws an exception or returns Y_LASTTIMERELEASED_INVALID.
     */
    get_lastTimeReleased()
    {
        return this.liveFunc._lastTimeReleased;
    }

    /**
     * Returns the pulse counter value.
     *
     * @return an integer corresponding to the pulse counter value
     *
     * On failure, throws an exception or returns Y_PULSECOUNTER_INVALID.
     */
    get_pulseCounter()
    {
        return this.liveFunc._pulseCounter;
    }

    set_pulseCounter(newval)
    {
        this.liveFunc.set_pulseCounter(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the timer of the pulses counter (ms).
     *
     * @return an integer corresponding to the timer of the pulses counter (ms)
     *
     * On failure, throws an exception or returns Y_PULSETIMER_INVALID.
     */
    get_pulseTimer()
    {
        return this.liveFunc._pulseTimer;
    }

    /**
     * Returns the pulse counter value as well as its timer.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetCounter()
    {
        this.liveFunc.resetCounter();
        return YAPI_SUCCESS;
    }
    //--- (end of YAnButton accessors declaration)
}

//--- (AnButton functions)

/**
 * Retrieves an analog input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the analog input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAnButton.isOnline() to test if the analog input is
 * indeed online at a given time. In case of ambiguity when looking for
 * an analog input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the analog input
 *
 * @return {YAnButton} a YAnButton object allowing you to drive the analog input.
 */
export function yFindAnButton(func)
{
    return YAnButton.FindAnButton(func);
}

/**
 * Starts the enumeration of analog inputs currently accessible.
 * Use the method YAnButton.nextAnButton() to iterate on
 * next analog inputs.
 *
 * @return {YAnButton} a pointer to a YAnButton object, corresponding to
 *         the first analog input currently online, or a null pointer
 *         if there are none.
 */
export function yFirstAnButton()
{
    return YAnButton.FirstAnButton();
}

//--- (end of AnButton functions)
