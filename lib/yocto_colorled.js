/*********************************************************************
 *
 * $Id: yocto_colorled.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for ColorLed functions
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
exports.YColorLedProxy = exports.YColorLed = exports.Y_COMMAND_INVALID = exports.Y_BLINKSEQSIGNATURE_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQSIZE_INVALID = exports.Y_RGBCOLORATPOWERON_INVALID = exports.Y_HSLMOVE_INVALID = exports.Y_RGBMOVE_INVALID = exports.Y_HSLCOLOR_INVALID = exports.Y_RGBCOLOR_INVALID = undefined;
exports.yFindColorLed = yFindColorLed;
exports.yFirstColorLed = yFirstColorLed;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YColorLed return codes)
//--- (end of YColorLed return codes)
//--- (YColorLed definitions)
var Y_RGBCOLOR_INVALID = exports.Y_RGBCOLOR_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_HSLCOLOR_INVALID = exports.Y_HSLCOLOR_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_RGBMOVE_INVALID = exports.Y_RGBMOVE_INVALID = null;
var Y_HSLMOVE_INVALID = exports.Y_HSLMOVE_INVALID = null;
var Y_RGBCOLORATPOWERON_INVALID = exports.Y_RGBCOLORATPOWERON_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BLINKSEQSIZE_INVALID = exports.Y_BLINKSEQSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BLINKSEQSIGNATURE_INVALID = exports.Y_BLINKSEQSIGNATURE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YColorLed definitions)

//--- (YColorLed class start)
/**
 * YColorLed Class: ColorLed function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color LED using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLed class start)

class YColorLed extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YColorLed constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'ColorLed';
        /** @member {number} **/
        this._rgbColor = Y_RGBCOLOR_INVALID;
        /** @member {number} **/
        this._hslColor = Y_HSLCOLOR_INVALID;
        /** @member {YMove} **/
        this._rgbMove = Y_RGBMOVE_INVALID;
        /** @member {YMove} **/
        this._hslMove = Y_HSLMOVE_INVALID;
        /** @member {number} **/
        this._rgbColorAtPowerOn = Y_RGBCOLORATPOWERON_INVALID;
        /** @member {number} **/
        this._blinkSeqSize = Y_BLINKSEQSIZE_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxSize = Y_BLINKSEQMAXSIZE_INVALID;
        /** @member {number} **/
        this._blinkSeqSignature = Y_BLINKSEQSIGNATURE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            RGBCOLOR_INVALID: _yocto_api.YAPI.INVALID_UINT,
            HSLCOLOR_INVALID: _yocto_api.YAPI.INVALID_UINT,
            RGBCOLORATPOWERON_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKSEQSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKSEQMAXSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKSEQSIGNATURE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YColorLed constructor)
    }

    //--- (YColorLed implementation)

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
            var res = new YColorLedProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'rgbColor':
                this._rgbColor = parseInt(val);
                return 1;
            case 'hslColor':
                this._hslColor = parseInt(val);
                return 1;
            case 'rgbMove':
                this._rgbMove = val;
                return 1;
            case 'hslMove':
                this._hslMove = val;
                return 1;
            case 'rgbColorAtPowerOn':
                this._rgbColorAtPowerOn = parseInt(val);
                return 1;
            case 'blinkSeqSize':
                this._blinkSeqSize = parseInt(val);
                return 1;
            case 'blinkSeqMaxSize':
                this._blinkSeqMaxSize = parseInt(val);
                return 1;
            case 'blinkSeqSignature':
                this._blinkSeqSignature = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current RGB color of the LED.
     *
     * @return {number} an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    get_rgbColor() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_RGBCOLOR_INVALID;
                }
            }
            return _this2._rgbColor;
        })();
    }

    /**
     * Changes the current color of the LED, using a RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval {number} : an integer corresponding to the current color of the LED, using a RGB color
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this3._setAttr('rgbColor', rest_val);
        })();
    }

    /**
     * Returns the current HSL color of the LED.
     *
     * @return {number} an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    get_hslColor() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_HSLCOLOR_INVALID;
                }
            }
            return _this4._hslColor;
        })();
    }

    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval {number} : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this5._setAttr('hslColor', rest_val);
        })();
    }

    get_rgbMove() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_RGBMOVE_INVALID;
                }
            }
            return _this6._rgbMove;
        })();
    }

    set_rgbMove(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this7._setAttr('rgbMove', rest_val);
        })();
    }

    /**
     * Performs a smooth transition in the RGB color space between the current color and a target color.
     *
     * @param rgb_target  : desired RGB color at the end of the transition
     * @param ms_duration {number} : duration of the transition, in millisecond
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgbMove(rgb_target, ms_duration) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(rgb_target) + ':' + String(ms_duration);
            return yield _this8._setAttr('rgbMove', rest_val);
        })();
    }

    get_hslMove() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_HSLMOVE_INVALID;
                }
            }
            return _this9._hslMove;
        })();
    }

    set_hslMove(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this10._setAttr('hslMove', rest_val);
        })();
    }

    /**
     * Performs a smooth transition in the HSL color space between the current color and a target color.
     *
     * @param hsl_target  : desired HSL color at the end of the transition
     * @param ms_duration {number} : duration of the transition, in millisecond
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hslMove(hsl_target, ms_duration) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(hsl_target) + ':' + String(ms_duration);
            return yield _this11._setAttr('hslMove', rest_val);
        })();
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return {number} an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLORATPOWERON_INVALID.
     */
    get_rgbColorAtPowerOn() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_RGBCOLORATPOWERON_INVALID;
                }
            }
            return _this12._rgbColorAtPowerOn;
        })();
    }

    /**
     * Changes the color that the LED will display by default when the module is turned on.
     *
     * @param newval {number} : an integer corresponding to the color that the LED will display by default
     * when the module is turned on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(newval) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this13._setAttr('rgbColorAtPowerOn', rest_val);
        })();
    }

    /**
     * Returns the current length of the blinking sequence.
     *
     * @return {number} an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    get_blinkSeqSize() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_BLINKSEQSIZE_INVALID;
                }
            }
            return _this14._blinkSeqSize;
        })();
    }

    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return {number} an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration == 0) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_BLINKSEQMAXSIZE_INVALID;
                }
            }
            return _this15._blinkSeqMaxSize;
        })();
    }

    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return {number} an integer
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIGNATURE_INVALID.
     */
    get_blinkSeqSignature() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_BLINKSEQSIGNATURE_INVALID;
                }
            }
            return _this16._blinkSeqSignature;
        })();
    }

    get_command() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this17._command;
        })();
    }

    set_command(newval) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this18._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves an RGB LED for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the RGB LED
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLed(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('ColorLed', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves an RGB LED for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB LED is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB LED by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the RGB LED
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB LED.
     */
    static FindColorLedInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'ColorLed', func);
        if (obj == null) {
            obj = new YColorLed(yctx, func);
            _yocto_api.YFunction._AddToCache('ColorLed', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.set_command(command);
        })();
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor {number} : desired HSL color when the traisntion is completed
     * @param msDelay {number} : duration of the color transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(HSLcolor, msDelay) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.sendCommand('H' + String(Math.round(HSLcolor)) + ',' + String(Math.round(msDelay)));
        })();
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the RGB space.
     *
     * @param RGBcolor {number} : desired RGB color when the transition is completed
     * @param msDelay {number} : duration of the color transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(RGBcolor, msDelay) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return yield _this21.sendCommand('R' + String(Math.round(RGBcolor)) + ',' + String(Math.round(msDelay)));
        })();
    }

    /**
     * Starts the preprogrammed blinking sequence. The sequence will
     * run in loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq() {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.sendCommand('S');
        })();
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            return yield _this23.sendCommand('X');
        })();
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq() {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            return yield _this24.sendCommand('Z');
        })();
    }

    /**
     * Continues the enumeration of RGB LEDs started using yFirstColorLed().
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         an RGB LED currently online, or a null pointer
     *         if there are no more RGB LEDs to enumerate.
     */
    nextColorLed() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YColorLed.FindColorLedInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLed() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('ColorLed');
        if (next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    /**
     * Starts the enumeration of RGB LEDs currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB LEDs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB LED currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLed');
        if (next_hwid == null) return null;
        return YColorLed.FindColorLedInContext(yctx, next_hwid);
    }

    //--- (end of YColorLed implementation)
}

exports.YColorLed = YColorLed; //
// YColorLedProxy Class: synchronous proxy to YColorLed objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YColorLed objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YColorLedProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YColorLed accessors declaration)

    /**
     * Returns the current RGB color of the LED.
     *
     * @return an integer corresponding to the current RGB color of the LED
     *
     * On failure, throws an exception or returns Y_RGBCOLOR_INVALID.
     */
    get_rgbColor() {
        return this.liveFunc._rgbColor;
    }

    /**
     * Changes the current color of the LED, using a RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a RGB color
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(newval) {
        this.liveFunc.set_rgbColor(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current HSL color of the LED.
     *
     * @return an integer corresponding to the current HSL color of the LED
     *
     * On failure, throws an exception or returns Y_HSLCOLOR_INVALID.
     */
    get_hslColor() {
        return this.liveFunc._hslColor;
    }

    /**
     * Changes the current color of the LED, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval : an integer corresponding to the current color of the LED, using a color HSL
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(newval) {
        this.liveFunc.set_hslColor(newval);
        return this._yapi.SUCCESS;
    }

    get_rgbMove() {
        return this.liveFunc._rgbMove;
    }

    set_rgbMove(newval) {
        this.liveFunc.set_rgbMove(newval);
        return this._yapi.SUCCESS;
    }

    get_hslMove() {
        return this.liveFunc._hslMove;
    }

    set_hslMove(newval) {
        this.liveFunc.set_hslMove(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the configured color to be displayed when the module is turned on.
     *
     * @return an integer corresponding to the configured color to be displayed when the module is turned on
     *
     * On failure, throws an exception or returns Y_RGBCOLORATPOWERON_INVALID.
     */
    get_rgbColorAtPowerOn() {
        return this.liveFunc._rgbColorAtPowerOn;
    }

    /**
     * Changes the color that the LED will display by default when the module is turned on.
     *
     * @param newval : an integer corresponding to the color that the LED will display by default when the
     * module is turned on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(newval) {
        this.liveFunc.set_rgbColorAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current length of the blinking sequence.
     *
     * @return an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns Y_BLINKSEQSIZE_INVALID.
     */
    get_blinkSeqSize() {
        return this.liveFunc._blinkSeqSize;
    }

    /**
     * Returns the maximum length of the blinking sequence.
     *
     * @return an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize() {
        return this.liveFunc._blinkSeqMaxSize;
    }

    /**
     * Return the blinking sequence signature. Since blinking
     * sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already
     * programmed.
     *
     * @return an integer
     *
     * On failure, throws an exception or returns Y_BLINKSEQSIGNATURE_INVALID.
     */
    get_blinkSeqSignature() {
        return this.liveFunc._blinkSeqSignature;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(command) {
        this.liveFunc.sendCommand(command);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the HSL space.
     *
     * @param HSLcolor : desired HSL color when the traisntion is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(HSLcolor, msDelay) {
        this.liveFunc.addHslMoveToBlinkSeq(HSLcolor, msDelay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Add a new transition to the blinking sequence, the move will
     * be performed in the RGB space.
     *
     * @param RGBcolor : desired RGB color when the transition is completed
     * @param msDelay : duration of the color transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(RGBcolor, msDelay) {
        this.liveFunc.addRgbMoveToBlinkSeq(RGBcolor, msDelay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts the preprogrammed blinking sequence. The sequence will
     * run in loop until it is stopped by stopBlinkSeq or an explicit
     * change.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq() {
        this.liveFunc.startBlinkSeq();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq() {
        this.liveFunc.stopBlinkSeq();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq() {
        this.liveFunc.resetBlinkSeq();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YColorLed accessors declaration)
}

exports.YColorLedProxy = YColorLedProxy; //--- (ColorLed functions)

/**
 * Retrieves an RGB LED for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the RGB LED is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLed.isOnline() to test if the RGB LED is
 * indeed online at a given time. In case of ambiguity when looking for
 * an RGB LED by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the RGB LED
 *
 * @return {YColorLed} a YColorLed object allowing you to drive the RGB LED.
 */

function yFindColorLed(func) {
    return YColorLed.FindColorLed(func);
}

/**
 * Starts the enumeration of RGB LEDs currently accessible.
 * Use the method YColorLed.nextColorLed() to iterate on
 * next RGB LEDs.
 *
 * @return {YColorLed} a pointer to a YColorLed object, corresponding to
 *         the first RGB LED currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLed() {
    return YColorLed.FirstColorLed();
}

//--- (end of ColorLed functions)
