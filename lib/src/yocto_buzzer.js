/*********************************************************************
 *
 * $Id: yocto_buzzer.js 26669 2017-02-28 13:40:47Z seb $
 *
 * Implements the high-level API for Buzzer functions
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

//--- (YBuzzer return codes)
//--- (end of YBuzzer return codes)
//--- (YBuzzer definitions)
export var Y_FREQUENCY_INVALID             = YAPI.INVALID_DOUBLE;
export var Y_VOLUME_INVALID                = YAPI.INVALID_UINT;
export var Y_PLAYSEQSIZE_INVALID           = YAPI.INVALID_UINT;
export var Y_PLAYSEQMAXSIZE_INVALID        = YAPI.INVALID_UINT;
export var Y_PLAYSEQSIGNATURE_INVALID      = YAPI.INVALID_UINT;
export var Y_COMMAND_INVALID               = YAPI.INVALID_STRING;
//--- (end of YBuzzer definitions)

//--- (YBuzzer class start)
/**
 * YBuzzer Class: Buzzer function interface
 *
 * The Yoctopuce application programming interface allows you to
 * choose the frequency and volume at which the buzzer must sound.
 * You can also pre-program a play sequence.
 */
//--- (end of YBuzzer class start)

export class YBuzzer extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YBuzzer constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'Buzzer';
        /** @member {number} **/
        this._frequency                  = Y_FREQUENCY_INVALID;
        /** @member {number} **/
        this._volume                     = Y_VOLUME_INVALID;
        /** @member {number} **/
        this._playSeqSize                = Y_PLAYSEQSIZE_INVALID;
        /** @member {number} **/
        this._playSeqMaxSize             = Y_PLAYSEQMAXSIZE_INVALID;
        /** @member {number} **/
        this._playSeqSignature           = Y_PLAYSEQSIGNATURE_INVALID;
        /** @member {string} **/
        this._command                    = Y_COMMAND_INVALID;
        this.imm_setConst({
            FREQUENCY_INVALID            : YAPI.INVALID_DOUBLE,
            VOLUME_INVALID               : YAPI.INVALID_UINT,
            PLAYSEQSIZE_INVALID          : YAPI.INVALID_UINT,
            PLAYSEQMAXSIZE_INVALID       : YAPI.INVALID_UINT,
            PLAYSEQSIGNATURE_INVALID     : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
        //--- (end of YBuzzer constructor)
    }

    //--- (YBuzzer implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YBuzzerProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
        case 'frequency':
            this._frequency = Math.round(val * 1000.0 / 65536.0) / 1000.0;
            return 1;
        case 'volume':
            this._volume = parseInt(val);
            return 1;
        case 'playSeqSize':
            this._playSeqSize = parseInt(val);
            return 1;
        case 'playSeqMaxSize':
            this._playSeqMaxSize = parseInt(val);
            return 1;
        case 'playSeqSignature':
            this._playSeqSignature = parseInt(val);
            return 1;
        case 'command':
            this._command = val;
            return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval {number} : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_frequency(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(Math.round(newval * 65536.0));
        return await this._setAttr('frequency',rest_val);
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return {number} a floating point number corresponding to the  frequency of the signal sent to the
     * buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    async get_frequency()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_FREQUENCY_INVALID;
            }
        }
        res = this._frequency;
        return res;
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return {number} an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    async get_volume()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_VOLUME_INVALID;
            }
        }
        res = this._volume;
        return res;
    }

    /**
     * Changes the volume of the signal sent to the buzzer/speaker.
     *
     * @param newval {number} : an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_volume(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('volume',rest_val);
    }

    /**
     * Returns the current length of the playing sequence.
     *
     * @return {number} an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    async get_playSeqSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PLAYSEQSIZE_INVALID;
            }
        }
        res = this._playSeqSize;
        return res;
    }

    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return {number} an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    async get_playSeqMaxSize()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PLAYSEQMAXSIZE_INVALID;
            }
        }
        res = this._playSeqMaxSize;
        return res;
    }

    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return {number} an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIGNATURE_INVALID.
     */
    async get_playSeqSignature()
    {
        /** @type {number} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_PLAYSEQSIGNATURE_INVALID;
            }
        }
        res = this._playSeqSignature;
        return res;
    }

    async get_command()
    {
        /** @type {string} **/
        let res;
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_COMMAND_INVALID;
            }
        }
        res = this._command;
        return res;
    }

    async set_command(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = newval;
        return await this._setAttr('command',rest_val);
    }

    /**
     * Retrieves a buzzer for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the buzzer
     *
     * @return {YBuzzer} a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzer(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(YAPI, func);
            YFunction._AddToCache('Buzzer',  func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a buzzer for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the buzzer is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBuzzer.isOnline() to test if the buzzer is
     * indeed online at a given time. In case of ambiguity when looking for
     * a buzzer by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the buzzer
     *
     * @return {YBuzzer} a YBuzzer object allowing you to drive the buzzer.
     */
    static FindBuzzerInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(yctx, func);
            YFunction._AddToCache('Buzzer',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay {number} : duration of the frequency transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addFreqMoveToPlaySeq(freq,msDelay)
    {
        return await this.sendCommand('A'+String(Math.round(freq))+','+String(Math.round(msDelay)));
    }

    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq {number} : pulse frequency, in Hz
     * @param msDuration {number} : pulse duration, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addPulseToPlaySeq(freq,msDuration)
    {
        return await this.sendCommand('B'+String(Math.round(freq))+','+String(Math.round(msDuration)));
    }

    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration {number} : duration of the volume transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addVolMoveToPlaySeq(volume,msDuration)
    {
        return await this.sendCommand('C'+String(Math.round(volume))+','+String(Math.round(msDuration)));
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startPlaySeq()
    {
        return await this.sendCommand('S');
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopPlaySeq()
    {
        return await this.sendCommand('X');
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetPlaySeq()
    {
        return await this.sendCommand('Z');
    }

    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency {number} : pulse frequency, in hertz
     * @param duration {number} : pulse duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async pulse(frequency,duration)
    {
        return await this.set_command('P'+String(Math.round(frequency))+','+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency {number} : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration {number} :  pulse duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async freqMove(frequency,duration)
    {
        return await this.set_command('F'+String(Math.round(frequency))+','+String(Math.round(duration)));
    }

    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume {number} : volume to reach in %
     * @param duration {number} : change duration in millseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async volumeMove(volume,duration)
    {
        return await this.set_command('V'+String(Math.round(volume))+','+String(Math.round(duration)));
    }

    /**
     * Continues the enumeration of buzzers started using yFirstBuzzer().
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         a buzzer currently online, or a null pointer
     *         if there are no more buzzers to enumerate.
     */
    nextBuzzer()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzer()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Buzzer');
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzer(next_hwid);
    }

    /**
     * Starts the enumeration of buzzers currently accessible.
     * Use the method YBuzzer.nextBuzzer() to iterate on
     * next buzzers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         the first buzzer currently online, or a null pointer
     *         if there are none.
     */
    static FirstBuzzerInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Buzzer');
        if(next_hwid == null) return null;
        return YBuzzer.FindBuzzerInContext(yctx, next_hwid);
    }

    //--- (end of YBuzzer implementation)
}

//
// YBuzzerProxy Class: synchronous proxy to YBuzzer objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YBuzzer objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
export class YBuzzerProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YBuzzer accessors declaration)

    /**
     * Changes the frequency of the signal sent to the buzzer. A zero value stops the buzzer.
     *
     * @param newval : a floating point number corresponding to the frequency of the signal sent to the buzzer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_frequency(newval)
    {
        this.liveFunc.set_frequency(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return a floating point number corresponding to the  frequency of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns Y_FREQUENCY_INVALID.
     */
    get_frequency()
    {
        return this.liveFunc._frequency;
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume()
    {
        return this.liveFunc._volume;
    }

    /**
     * Changes the volume of the signal sent to the buzzer/speaker.
     *
     * @param newval : an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval)
    {
        this.liveFunc.set_volume(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current length of the playing sequence.
     *
     * @return an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns Y_PLAYSEQSIZE_INVALID.
     */
    get_playSeqSize()
    {
        return this.liveFunc._playSeqSize;
    }

    /**
     * Returns the maximum length of the playing sequence.
     *
     * @return an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns Y_PLAYSEQMAXSIZE_INVALID.
     */
    get_playSeqMaxSize()
    {
        return this.liveFunc._playSeqMaxSize;
    }

    /**
     * Returns the playing sequence signature. As playing
     * sequences cannot be read from the device, this can be used
     * to detect if a specific playing sequence is already
     * programmed.
     *
     * @return an integer corresponding to the playing sequence signature
     *
     * On failure, throws an exception or returns Y_PLAYSEQSIGNATURE_INVALID.
     */
    get_playSeqSignature()
    {
        return this.liveFunc._playSeqSignature;
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

    sendCommand(command)
    {
        this.liveFunc.sendCommand(command);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a new frequency transition to the playing sequence.
     *
     * @param freq    : desired frequency when the transition is completed, in Hz
     * @param msDelay : duration of the frequency transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addFreqMoveToPlaySeq(freq,msDelay)
    {
        this.liveFunc.addFreqMoveToPlaySeq(freq, msDelay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a pulse to the playing sequence.
     *
     * @param freq : pulse frequency, in Hz
     * @param msDuration : pulse duration, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addPulseToPlaySeq(freq,msDuration)
    {
        this.liveFunc.addPulseToPlaySeq(freq, msDuration);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a new volume transition to the playing sequence. Frequency stays untouched:
     * if frequency is at zero, the transition has no effect.
     *
     * @param volume    : desired volume when the transition is completed, as a percentage.
     * @param msDuration : duration of the volume transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addVolMoveToPlaySeq(volume,msDuration)
    {
        this.liveFunc.addVolMoveToPlaySeq(volume, msDuration);
        return YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startPlaySeq()
    {
        this.liveFunc.startPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopPlaySeq()
    {
        this.liveFunc.stopPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetPlaySeq()
    {
        this.liveFunc.resetPlaySeq();
        return YAPI_SUCCESS;
    }

    /**
     * Activates the buzzer for a short duration.
     *
     * @param frequency : pulse frequency, in hertz
     * @param duration : pulse duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulse(frequency,duration)
    {
        this.liveFunc.pulse(frequency, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Makes the buzzer frequency change over a period of time.
     *
     * @param frequency : frequency to reach, in hertz. A frequency under 25Hz stops the buzzer.
     * @param duration :  pulse duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    freqMove(frequency,duration)
    {
        this.liveFunc.freqMove(frequency, duration);
        return YAPI_SUCCESS;
    }

    /**
     * Makes the buzzer volume change over a period of time, frequency  stays untouched.
     *
     * @param volume : volume to reach in %
     * @param duration : change duration in millseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    volumeMove(volume,duration)
    {
        this.liveFunc.volumeMove(volume, duration);
        return YAPI_SUCCESS;
    }
    //--- (end of YBuzzer accessors declaration)
}

//--- (Buzzer functions)

/**
 * Retrieves a buzzer for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the buzzer is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YBuzzer.isOnline() to test if the buzzer is
 * indeed online at a given time. In case of ambiguity when looking for
 * a buzzer by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the buzzer
 *
 * @return {YBuzzer} a YBuzzer object allowing you to drive the buzzer.
 */
export function yFindBuzzer(func)
{
    return YBuzzer.FindBuzzer(func);
}

/**
 * Starts the enumeration of buzzers currently accessible.
 * Use the method YBuzzer.nextBuzzer() to iterate on
 * next buzzers.
 *
 * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
 *         the first buzzer currently online, or a null pointer
 *         if there are none.
 */
export function yFirstBuzzer()
{
    return YBuzzer.FirstBuzzer();
}

//--- (end of Buzzer functions)
