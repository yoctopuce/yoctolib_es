/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
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
exports.YColorLed = exports.Y_COMMAND_INVALID = exports.Y_BLINKSEQSIGNATURE_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQSIZE_INVALID = exports.Y_RGBCOLORATPOWERON_INVALID = exports.Y_HSLMOVE_INVALID = exports.Y_RGBMOVE_INVALID = exports.Y_HSLCOLOR_INVALID = exports.Y_RGBCOLOR_INVALID = undefined;
exports.yFindColorLed = yFindColorLed;
exports.yFirstColorLed = yFirstColorLed;

var _yocto_api = require('yoctolib-es/yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YColorLed return codes)
//--- (end of YColorLed return codes)
//--- (YColorLed definitions)
const Y_RGBCOLOR_INVALID = exports.Y_RGBCOLOR_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_HSLCOLOR_INVALID = exports.Y_HSLCOLOR_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_RGBMOVE_INVALID = exports.Y_RGBMOVE_INVALID = null;
const Y_HSLMOVE_INVALID = exports.Y_HSLMOVE_INVALID = null;
const Y_RGBCOLORATPOWERON_INVALID = exports.Y_RGBCOLORATPOWERON_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_BLINKSEQSIZE_INVALID = exports.Y_BLINKSEQSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_BLINKSEQSIGNATURE_INVALID = exports.Y_BLINKSEQSIGNATURE_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YColorLed definitions)

//--- (YColorLed class start)
/**
 * YColorLed Class: ColorLed function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color led using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a led with a given hue and to progressively vary its
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
     * Returns the current RGB color of the led.
     *
     * @return {number} an integer corresponding to the current RGB color of the led
     *
     * On failure, throws an exception or returns YColorLed.RGBCOLOR_INVALID.
     */
    get_rgbColor() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_RGBCOLOR_INVALID;
                }
            }
            return _this._rgbColor;
        })();
    }

    /**
     * Changes the current color of the led, using a RGB color. Encoding is done as follows: 0xRRGGBB.
     *
     * @param newval {number} : an integer corresponding to the current color of the led, using a RGB color
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this2._setAttr('rgbColor', rest_val);
        })();
    }

    /**
     * Returns the current HSL color of the led.
     *
     * @return {number} an integer corresponding to the current HSL color of the led
     *
     * On failure, throws an exception or returns YColorLed.HSLCOLOR_INVALID.
     */
    get_hslColor() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_HSLCOLOR_INVALID;
                }
            }
            return _this3._hslColor;
        })();
    }

    /**
     * Changes the current color of the led, using a color HSL. Encoding is done as follows: 0xHHSSLL.
     *
     * @param newval {number} : an integer corresponding to the current color of the led, using a color HSL
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this4._setAttr('hslColor', rest_val);
        })();
    }

    get_rgbMove() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_RGBMOVE_INVALID;
                }
            }
            return _this5._rgbMove;
        })();
    }

    set_rgbMove(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this6._setAttr('rgbMove', rest_val);
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
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(rgb_target) + ':' + String(ms_duration);
            return yield _this7._setAttr('rgbMove', rest_val);
        })();
    }

    get_hslMove() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_HSLMOVE_INVALID;
                }
            }
            return _this8._hslMove;
        })();
    }

    set_hslMove(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this9._setAttr('hslMove', rest_val);
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
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(hsl_target) + ':' + String(ms_duration);
            return yield _this10._setAttr('hslMove', rest_val);
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
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_RGBCOLORATPOWERON_INVALID;
                }
            }
            return _this11._rgbColorAtPowerOn;
        })();
    }

    /**
     * Changes the color that the led will display by default when the module is turned on.
     *
     * @param newval {number} : an integer corresponding to the color that the led will display by default
     * when the module is turned on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '0x' + newval.toString(16);
            return yield _this12._setAttr('rgbColorAtPowerOn', rest_val);
        })();
    }

    /**
     * Returns the current length of the blinking sequence
     *
     * @return {number} an integer corresponding to the current length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQSIZE_INVALID.
     */
    get_blinkSeqSize() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_BLINKSEQSIZE_INVALID;
                }
            }
            return _this13._blinkSeqSize;
        })();
    }

    /**
     * Returns the maximum length of the blinking sequence
     *
     * @return {number} an integer corresponding to the maximum length of the blinking sequence
     *
     * On failure, throws an exception or returns YColorLed.BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration == 0) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_BLINKSEQMAXSIZE_INVALID;
                }
            }
            return _this14._blinkSeqMaxSize;
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
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_BLINKSEQSIGNATURE_INVALID;
                }
            }
            return _this15._blinkSeqSignature;
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
     * Retrieves an RGB led for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB led is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB led is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB led by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the RGB led
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB led.
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
     * Retrieves an RGB led for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB led is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLed.isOnline() to test if the RGB led is
     * indeed online at a given time. In case of ambiguity when looking for
     * an RGB led by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the RGB led
     *
     * @return {YColorLed} a YColorLed object allowing you to drive the RGB led.
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
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.set_command(command);
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
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.sendCommand('H' + String(Math.round(HSLcolor)) + ',' + String(Math.round(msDelay)));
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
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.sendCommand('R' + String(Math.round(RGBcolor)) + ',' + String(Math.round(msDelay)));
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
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return yield _this21.sendCommand('S');
        })();
    }

    /**
     * Stops the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq() {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.sendCommand('X');
        })();
    }

    /**
     * Resets the preprogrammed blinking sequence.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            return yield _this23.sendCommand('Z');
        })();
    }

    /**
     * Continues the enumeration of RGB leds started using yFirstColorLed().
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         an RGB led currently online, or a null pointer
     *         if there are no more RGB leds to enumerate.
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
     * Starts the enumeration of RGB leds currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB leds.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB led currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLed() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('ColorLed');
        if (next_hwid == null) return null;
        return YColorLed.FindColorLed(next_hwid);
    }

    /**
     * Starts the enumeration of RGB leds currently accessible.
     * Use the method YColorLed.nextColorLed() to iterate on
     * next RGB leds.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YColorLed} a pointer to a YColorLed object, corresponding to
     *         the first RGB led currently online, or a null pointer
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

exports.YColorLed = YColorLed; //--- (ColorLed functions)

/**
 * Retrieves an RGB led for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the RGB led is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLed.isOnline() to test if the RGB led is
 * indeed online at a given time. In case of ambiguity when looking for
 * an RGB led by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the RGB led
 *
 * @return {YColorLed} a YColorLed object allowing you to drive the RGB led.
 */

function yFindColorLed(func) {
    return YColorLed.FindColorLed(func);
}

/**
 * Starts the enumeration of RGB leds currently accessible.
 * Use the method YColorLed.nextColorLed() to iterate on
 * next RGB leds.
 *
 * @return {YColorLed} a pointer to a YColorLed object, corresponding to
 *         the first RGB led currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLed() {
    return YColorLed.FirstColorLed();
}

//--- (end of ColorLed functions)