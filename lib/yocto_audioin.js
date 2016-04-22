/*********************************************************************
 *
 * $Id: yocto_audioin.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for AudioIn functions
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
exports.YAudioInProxy = exports.YAudioIn = exports.Y_NOSIGNALFOR_INVALID = exports.Y_SIGNAL_INVALID = exports.Y_VOLUMERANGE_INVALID = exports.Y_VOLUME_INVALID = exports.Y_MUTE_INVALID = exports.Y_MUTE_TRUE = exports.Y_MUTE_FALSE = undefined;
exports.yFindAudioIn = yFindAudioIn;
exports.yFirstAudioIn = yFirstAudioIn;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YAudioIn return codes)
//--- (end of YAudioIn return codes)
//--- (YAudioIn definitions)
var Y_MUTE_FALSE = exports.Y_MUTE_FALSE = 0;
var Y_MUTE_TRUE = exports.Y_MUTE_TRUE = 1;
var Y_MUTE_INVALID = exports.Y_MUTE_INVALID = -1;
var Y_VOLUME_INVALID = exports.Y_VOLUME_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_VOLUMERANGE_INVALID = exports.Y_VOLUMERANGE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SIGNAL_INVALID = exports.Y_SIGNAL_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_NOSIGNALFOR_INVALID = exports.Y_NOSIGNALFOR_INVALID = _yocto_api.YAPI.INVALID_INT;
//--- (end of YAudioIn definitions)

//--- (YAudioIn class start)
/**
 * YAudioIn Class: AudioIn function interface
 *
 * The Yoctopuce application programming interface allows you to configure the volume of the input channel.
 */
//--- (end of YAudioIn class start)

class YAudioIn extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YAudioIn constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'AudioIn';
        /** @member {number} **/
        this._volume = Y_VOLUME_INVALID;
        /** @member {number} **/
        this._mute = Y_MUTE_INVALID;
        /** @member {string} **/
        this._volumeRange = Y_VOLUMERANGE_INVALID;
        /** @member {number} **/
        this._signal = Y_SIGNAL_INVALID;
        /** @member {number} **/
        this._noSignalFor = Y_NOSIGNALFOR_INVALID;
        this.imm_setConst({
            VOLUME_INVALID: _yocto_api.YAPI.INVALID_UINT,
            MUTE_FALSE: 0,
            MUTE_TRUE: 1,
            MUTE_INVALID: -1,
            VOLUMERANGE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SIGNAL_INVALID: _yocto_api.YAPI.INVALID_INT,
            NOSIGNALFOR_INVALID: _yocto_api.YAPI.INVALID_INT
        });
        //--- (end of YAudioIn constructor)
    }

    //--- (YAudioIn implementation)

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
            var res = new YAudioInProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'volume':
                this._volume = parseInt(val);
                return 1;
            case 'mute':
                this._mute = parseInt(val);
                return 1;
            case 'volumeRange':
                this._volumeRange = val;
                return 1;
            case 'signal':
                this._signal = parseInt(val);
                return 1;
            case 'noSignalFor':
                this._noSignalFor = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns audio input gain, in per cents.
     *
     * @return {number} an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns YAudioIn.VOLUME_INVALID.
     */
    get_volume() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_VOLUME_INVALID;
                }
            }
            return _this2._volume;
        })();
    }

    /**
     * Changes audio input gain, in per cents.
     *
     * @param newval {number} : an integer corresponding to audio input gain, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('volume', rest_val);
        })();
    }

    /**
     * Returns the state of the mute function.
     *
     * @return {number} either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns YAudioIn.MUTE_INVALID.
     */
    get_mute() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_MUTE_INVALID;
                }
            }
            return _this4._mute;
        })();
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval {number} : either YAudioIn.MUTE_FALSE or YAudioIn.MUTE_TRUE, according to the state
     * of the mute function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('mute', rest_val);
        })();
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return {string} a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns YAudioIn.VOLUMERANGE_INVALID.
     */
    get_volumeRange() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_VOLUMERANGE_INVALID;
                }
            }
            return _this6._volumeRange;
        })();
    }

    /**
     * Returns the detected input signal level.
     *
     * @return {number} an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns YAudioIn.SIGNAL_INVALID.
     */
    get_signal() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_SIGNAL_INVALID;
                }
            }
            return _this7._signal;
        })();
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return {number} an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns YAudioIn.NOSIGNALFOR_INVALID.
     */
    get_noSignalFor() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_NOSIGNALFOR_INVALID;
                }
            }
            return _this8._noSignalFor;
        })();
    }

    /**
     * Retrieves an audio input for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the audio input
     *
     * @return {YAudioIn} a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioIn(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('AudioIn', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an audio input for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the audio input is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YAudioIn.isOnline() to test if the audio input is
     * indeed online at a given time. In case of ambiguity when looking for
     * an audio input by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the audio input
     *
     * @return {YAudioIn} a YAudioIn object allowing you to drive the audio input.
     */
    static FindAudioInInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'AudioIn', func);
        if (obj == null) {
            obj = new YAudioIn(yctx, func);
            _yocto_api.YFunction._AddToCache('AudioIn', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of audio inputs started using yFirstAudioIn().
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         an audio input currently online, or a null pointer
     *         if there are no more audio inputs to enumerate.
     */
    nextAudioIn() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YAudioIn.FindAudioInInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioIn() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('AudioIn');
        if (next_hwid == null) return null;
        return YAudioIn.FindAudioIn(next_hwid);
    }

    /**
     * Starts the enumeration of audio inputs currently accessible.
     * Use the method YAudioIn.nextAudioIn() to iterate on
     * next audio inputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
     *         the first audio input currently online, or a null pointer
     *         if there are none.
     */
    static FirstAudioInInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('AudioIn');
        if (next_hwid == null) return null;
        return YAudioIn.FindAudioInInContext(yctx, next_hwid);
    }

    //--- (end of YAudioIn implementation)
}

exports.YAudioIn = YAudioIn; //
// YAudioInProxy Class: synchronous proxy to YAudioIn objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YAudioIn objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YAudioInProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YAudioIn accessors declaration)

    /**
     * Returns audio input gain, in per cents.
     *
     * @return an integer corresponding to audio input gain, in per cents
     *
     * On failure, throws an exception or returns Y_VOLUME_INVALID.
     */
    get_volume() {
        return this.liveFunc._volume;
    }

    /**
     * Changes audio input gain, in per cents.
     *
     * @param newval : an integer corresponding to audio input gain, in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval) {
        this.liveFunc.set_volume(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of the mute function.
     *
     * @return either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * On failure, throws an exception or returns Y_MUTE_INVALID.
     */
    get_mute() {
        return this.liveFunc._mute;
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval : either Y_MUTE_FALSE or Y_MUTE_TRUE, according to the state of the mute function
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval) {
        this.liveFunc.set_mute(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the supported volume range. The low value of the
     * range corresponds to the minimal audible value. To
     * completely mute the sound, use set_mute()
     * instead of the set_volume().
     *
     * @return a string corresponding to the supported volume range
     *
     * On failure, throws an exception or returns Y_VOLUMERANGE_INVALID.
     */
    get_volumeRange() {
        return this.liveFunc._volumeRange;
    }

    /**
     * Returns the detected input signal level.
     *
     * @return an integer corresponding to the detected input signal level
     *
     * On failure, throws an exception or returns Y_SIGNAL_INVALID.
     */
    get_signal() {
        return this.liveFunc._signal;
    }

    /**
     * Returns the number of seconds elapsed without detecting a signal.
     *
     * @return an integer corresponding to the number of seconds elapsed without detecting a signal
     *
     * On failure, throws an exception or returns Y_NOSIGNALFOR_INVALID.
     */
    get_noSignalFor() {
        return this.liveFunc._noSignalFor;
    }
    //--- (end of YAudioIn accessors declaration)
}

exports.YAudioInProxy = YAudioInProxy; //--- (AudioIn functions)

/**
 * Retrieves an audio input for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the audio input is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YAudioIn.isOnline() to test if the audio input is
 * indeed online at a given time. In case of ambiguity when looking for
 * an audio input by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the audio input
 *
 * @return {YAudioIn} a YAudioIn object allowing you to drive the audio input.
 */

function yFindAudioIn(func) {
    return YAudioIn.FindAudioIn(func);
}

/**
 * Starts the enumeration of audio inputs currently accessible.
 * Use the method YAudioIn.nextAudioIn() to iterate on
 * next audio inputs.
 *
 * @return {YAudioIn} a pointer to a YAudioIn object, corresponding to
 *         the first audio input currently online, or a null pointer
 *         if there are none.
 */
function yFirstAudioIn() {
    return YAudioIn.FirstAudioIn();
}

//--- (end of AudioIn functions)
