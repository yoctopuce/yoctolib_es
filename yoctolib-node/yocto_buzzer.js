/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
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

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YBuzzer = exports.Y_COMMAND_INVALID = exports.Y_PLAYSEQSIGNATURE_INVALID = exports.Y_PLAYSEQMAXSIZE_INVALID = exports.Y_PLAYSEQSIZE_INVALID = exports.Y_VOLUME_INVALID = exports.Y_FREQUENCY_INVALID = undefined;
exports.yFindBuzzer = yFindBuzzer;
exports.yFirstBuzzer = yFirstBuzzer;

var _yocto_api = require('yoctolib-es/yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YBuzzer return codes)
//--- (end of YBuzzer return codes)
//--- (YBuzzer definitions)
const Y_FREQUENCY_INVALID = exports.Y_FREQUENCY_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_VOLUME_INVALID = exports.Y_VOLUME_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_PLAYSEQSIZE_INVALID = exports.Y_PLAYSEQSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_PLAYSEQMAXSIZE_INVALID = exports.Y_PLAYSEQMAXSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_PLAYSEQSIGNATURE_INVALID = exports.Y_PLAYSEQSIGNATURE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
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

class YBuzzer extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YBuzzer constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Buzzer';
        /** @member {number} **/
        this._frequency = Y_FREQUENCY_INVALID;
        /** @member {number} **/
        this._volume = Y_VOLUME_INVALID;
        /** @member {number} **/
        this._playSeqSize = Y_PLAYSEQSIZE_INVALID;
        /** @member {number} **/
        this._playSeqMaxSize = Y_PLAYSEQMAXSIZE_INVALID;
        /** @member {number} **/
        this._playSeqSignature = Y_PLAYSEQSIGNATURE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            FREQUENCY_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            VOLUME_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PLAYSEQSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PLAYSEQMAXSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PLAYSEQSIGNATURE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YBuzzer constructor)
    }

    //--- (YBuzzer implementation)

    imm_parseAttr(name, val) {
        switch (name) {
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
    set_frequency(newval) {
        var _this = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this._setAttr('frequency', rest_val);
        })();
    }

    /**
     * Returns the  frequency of the signal sent to the buzzer/speaker.
     *
     * @return {number} a floating point number corresponding to the  frequency of the signal sent to the
     * buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.FREQUENCY_INVALID.
     */
    get_frequency() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_FREQUENCY_INVALID;
                }
            }
            return _this2._frequency;
        })();
    }

    /**
     * Returns the volume of the signal sent to the buzzer/speaker.
     *
     * @return {number} an integer corresponding to the volume of the signal sent to the buzzer/speaker
     *
     * On failure, throws an exception or returns YBuzzer.VOLUME_INVALID.
     */
    get_volume() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_VOLUME_INVALID;
                }
            }
            return _this3._volume;
        })();
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
    set_volume(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('volume', rest_val);
        })();
    }

    /**
     * Returns the current length of the playing sequence
     *
     * @return {number} an integer corresponding to the current length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQSIZE_INVALID.
     */
    get_playSeqSize() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_PLAYSEQSIZE_INVALID;
                }
            }
            return _this5._playSeqSize;
        })();
    }

    /**
     * Returns the maximum length of the playing sequence
     *
     * @return {number} an integer corresponding to the maximum length of the playing sequence
     *
     * On failure, throws an exception or returns YBuzzer.PLAYSEQMAXSIZE_INVALID.
     */
    get_playSeqMaxSize() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration == 0) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_PLAYSEQMAXSIZE_INVALID;
                }
            }
            return _this6._playSeqMaxSize;
        })();
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
    get_playSeqSignature() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_PLAYSEQSIGNATURE_INVALID;
                }
            }
            return _this7._playSeqSignature;
        })();
    }

    get_command() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this8._command;
        })();
    }

    set_command(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this9._setAttr('command', rest_val);
        })();
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
    static FindBuzzer(func) {
        /** @type {YBuzzer} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Buzzer', func, obj);
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
    static FindBuzzerInContext(yctx, func) {
        /** @type {YBuzzer} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Buzzer', func);
        if (obj == null) {
            obj = new YBuzzer(yctx, func);
            _yocto_api.YFunction._AddToCache('Buzzer', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            return yield _this10.set_command(command);
        })();
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
    addFreqMoveToPlaySeq(freq, msDelay) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.sendCommand('A' + String(Math.round(freq)) + ',' + String(Math.round(msDelay)));
        })();
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
    addPulseToPlaySeq(freq, msDuration) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return yield _this12.sendCommand('B' + String(Math.round(freq)) + ',' + String(Math.round(msDuration)));
        })();
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
    addVolMoveToPlaySeq(volume, msDuration) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.sendCommand('C' + String(Math.round(volume)) + ',' + String(Math.round(msDuration)));
        })();
    }

    /**
     * Starts the preprogrammed playing sequence. The sequence
     * runs in loop until it is stopped by stopPlaySeq or an explicit
     * change.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startPlaySeq() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            return yield _this14.sendCommand('S');
        })();
    }

    /**
     * Stops the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopPlaySeq() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            return yield _this15.sendCommand('X');
        })();
    }

    /**
     * Resets the preprogrammed playing sequence and sets the frequency to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetPlaySeq() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            return yield _this16.sendCommand('Z');
        })();
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
    pulse(frequency, duration) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            return yield _this17.set_command('P' + String(Math.round(frequency)) + ',' + String(Math.round(duration)));
        })();
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
    freqMove(frequency, duration) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.set_command('F' + String(Math.round(frequency)) + ',' + String(Math.round(duration)));
        })();
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
    volumeMove(volume, duration) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.set_command('V' + String(Math.round(volume)) + ',' + String(Math.round(duration)));
        })();
    }

    /**
     * Continues the enumeration of buzzers started using yFirstBuzzer().
     *
     * @return {YBuzzer} a pointer to a YBuzzer object, corresponding to
     *         a buzzer currently online, or a null pointer
     *         if there are no more buzzers to enumerate.
     */
    /* */nextBuzzer() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
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
    static FirstBuzzer() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Buzzer');
        if (next_hwid == null) return null;
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
    static FirstBuzzerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Buzzer');
        if (next_hwid == null) return null;
        return YBuzzer.FindBuzzerInContext(yctx, next_hwid);
    }

    //--- (end of YBuzzer implementation)
}

exports.YBuzzer = YBuzzer; //--- (Buzzer functions)

/**
 * comment from .yc definition
 */

function yFindBuzzer(func) {
    return YBuzzer.FindBuzzer(func);
}

/**
 * comment from .yc definition
 */
function yFirstBuzzer() {
    return YBuzzer.FirstBuzzer();
}

//--- (end of Buzzer functions)
