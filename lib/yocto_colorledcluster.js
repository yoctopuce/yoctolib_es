/*********************************************************************
 *
 * $Id: yocto_colorledcluster.js 26669 2017-02-28 13:40:47Z seb $
 *
 * Implements the high-level API for ColorLedCluster functions
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
exports.YColorLedClusterProxy = exports.YColorLedCluster = exports.Y_COMMAND_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQMAXCOUNT_INVALID = exports.Y_MAXLEDCOUNT_INVALID = exports.Y_ACTIVELEDCOUNT_INVALID = undefined;
exports.yFindColorLedCluster = yFindColorLedCluster;
exports.yFirstColorLedCluster = yFirstColorLedCluster;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (generated code: YColorLedCluster return codes)
//--- (end of generated code: YColorLedCluster return codes)
//--- (generated code: YColorLedCluster definitions)
var Y_ACTIVELEDCOUNT_INVALID = exports.Y_ACTIVELEDCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_MAXLEDCOUNT_INVALID = exports.Y_MAXLEDCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BLINKSEQMAXCOUNT_INVALID = exports.Y_BLINKSEQMAXCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BLINKSEQMAXSIZE_INVALID = exports.Y_BLINKSEQMAXSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YColorLedCluster definitions)

//--- (generated code: YColorLedCluster class start)
/**
 * YColorLedCluster Class: ColorLedCluster function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color LED cluster. Unlike the ColorLed class, the ColorLedCluster
 * allows to handle several LEDs at one. Color changes can be done   using RGB coordinates as well as
 * HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of generated code: YColorLedCluster class start)

class YColorLedCluster extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YColorLedCluster constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'ColorLedCluster';
        /** @member {number} **/
        this._activeLedCount = Y_ACTIVELEDCOUNT_INVALID;
        /** @member {number} **/
        this._maxLedCount = Y_MAXLEDCOUNT_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxCount = Y_BLINKSEQMAXCOUNT_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxSize = Y_BLINKSEQMAXSIZE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            ACTIVELEDCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            MAXLEDCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKSEQMAXCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BLINKSEQMAXSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YColorLedCluster constructor)
    }

    //--- (generated code: YColorLedCluster implementation)

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
            var res = new YColorLedClusterProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'activeLedCount':
                this._activeLedCount = parseInt(val);
                return 1;
            case 'maxLedCount':
                this._maxLedCount = parseInt(val);
                return 1;
            case 'blinkSeqMaxCount':
                this._blinkSeqMaxCount = parseInt(val);
                return 1;
            case 'blinkSeqMaxSize':
                this._blinkSeqMaxSize = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of LEDs currently handled by the device.
     *
     * @return {number} an integer corresponding to the number of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns YColorLedCluster.ACTIVELEDCOUNT_INVALID.
     */
    get_activeLedCount() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_ACTIVELEDCOUNT_INVALID;
                }
            }
            res = _this2._activeLedCount;
            return res;
        })();
    }

    /**
     * Changes the number of LEDs currently handled by the device.
     *
     * @param newval {number} : an integer corresponding to the number of LEDs currently handled by the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_activeLedCount(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('activeLedCount', rest_val);
        })();
    }

    /**
     * Returns the maximum number of LEDs that the device can handle.
     *
     * @return {number} an integer corresponding to the maximum number of LEDs that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.MAXLEDCOUNT_INVALID.
     */
    get_maxLedCount() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this4._cacheExpiration == 0) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_MAXLEDCOUNT_INVALID;
                }
            }
            res = _this4._maxLedCount;
            return res;
        })();
    }

    /**
     * Returns the maximum number of sequences that the device can handle.
     *
     * @return {number} an integer corresponding to the maximum number of sequences that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXCOUNT_INVALID.
     */
    get_blinkSeqMaxCount() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this5._cacheExpiration == 0) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_BLINKSEQMAXCOUNT_INVALID;
                }
            }
            res = _this5._blinkSeqMaxCount;
            return res;
        })();
    }

    /**
     * Returns the maximum length of sequences.
     *
     * @return {number} an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this6._cacheExpiration == 0) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_BLINKSEQMAXSIZE_INVALID;
                }
            }
            res = _this6._blinkSeqMaxSize;
            return res;
        })();
    }

    get_command() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            res = _this7._command;
            return res;
        })();
    }

    set_command(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this8._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a RGB LED cluster for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED cluster is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RGB LED cluster by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the RGB LED cluster
     *
     * @return {YColorLedCluster} a YColorLedCluster object allowing you to drive the RGB LED cluster.
     */
    static FindColorLedCluster(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('ColorLedCluster', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a RGB LED cluster for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the RGB LED cluster is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
     * indeed online at a given time. In case of ambiguity when looking for
     * a RGB LED cluster by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the RGB LED cluster
     *
     * @return {YColorLedCluster} a YColorLedCluster object allowing you to drive the RGB LED cluster.
     */
    static FindColorLedClusterInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(yctx, func);
            _yocto_api.YFunction._AddToCache('ColorLedCluster', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            return yield _this9.set_command(command);
        })();
    }

    /**
     * Changes the current color of consecutve LEDs in the cluster, using a RGB color. Encoding is done as
     * follows: 0xRRGGBB.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue {number} :  new color.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(ledIndex, count, rgbValue) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            return yield _this10.sendCommand('SR' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + rgbValue.toString(16));
        })();
    }

    /**
     * Changes the  color at device startup of consecutve LEDs in the cluster, using a RGB color. Encoding
     * is done as follows: 0xRRGGBB.
     * Don't forget to call saveLedsConfigAtPowerOn() to make sure the modification is saved in the device
     * flash memory.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue {number} :  new color.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(ledIndex, count, rgbValue) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.sendCommand('SC' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + rgbValue.toString(16));
        })();
    }

    /**
     * Changes the current color of consecutive LEDs in the cluster, using a HSL color. Encoding is done
     * as follows: 0xHHSSLL.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue {number} :  new color.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(ledIndex, count, hslValue) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return yield _this12.sendCommand('SH' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + hslValue.toString(16));
        })();
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue {number} :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgb_move(ledIndex, count, rgbValue, delay) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.sendCommand('MR' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + rgbValue.toString(16) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs  to another color, in a seamless and
     * autonomous manner. The transition is performed in the HSL space. In HSL, hue is a circular
     * value (0..360°). There are always two paths to perform the transition: by increasing
     * or by decreasing the hue. The module selects the shortest transition.
     * If the difference is exactly 180°, the module selects the transition which increases
     * the hue.
     *
     * @param ledIndex {number} :  index of the fisrt affected LED.
     * @param count    :  affected LED count.
     * @param hslValue {number} :  new color (0xHHSSLL).
     * @param delay    :  transition duration in ms
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hsl_move(ledIndex, count, hslValue, delay) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            return yield _this14.sendCommand('MH' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + hslValue.toString(16) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Adds an RGB transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by a group of LEDs.  Sequences are persistent and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex {number} :  sequence index.
     * @param rgbValue {number} :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(seqIndex, rgbValue, delay) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            return yield _this15.sendCommand('AR' + String(Math.round(seqIndex)) + ',' + rgbValue.toString(16) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Adds an HSL transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistant and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex {number} : sequence index.
     * @param hslValue {number} : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(seqIndex, hslValue, delay) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            return yield _this16.sendCommand('AH' + String(Math.round(seqIndex)) + ',' + hslValue.toString(16) + ',' + String(Math.round(delay)));
        })();
    }

    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reversed so that the sequence plays
     * in the reverse direction, like in a mirror. After the first transition of the sequence
     * is played at the end of the reverse execution, the sequence starts again in
     * the initial direction.
     *
     * @param seqIndex {number} : sequence index.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addMirrorToBlinkSeq(seqIndex) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            return yield _this17.sendCommand('AC' + String(Math.round(seqIndex)) + ',0,0');
        })();
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LEDs start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex {number} :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToBlinkSeq(ledIndex, count, seqIndex, offset) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.sendCommand('LS' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(offset)));
        })();
    }

    /**
     * Links adjacent LEDs to a specific sequence at device poweron. Don't forget to configure
     * the sequence auto start flag as well and call saveLedsConfigAtPowerOn(). It is possible to add an offset
     * in the execution: that way we  can have several groups of LEDs executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex {number} :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToBlinkSeqAtPowerOn(ledIndex, count, seqIndex, offset) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.sendCommand('LO' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(offset)));
        })();
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LED start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduces a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex {number} :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToPeriodicBlinkSeq(ledIndex, count, seqIndex, periods) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.sendCommand('LP' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)) + ',' + String(Math.round(seqIndex)) + ',' + String(Math.round(periods)));
        })();
    }

    /**
     * Unlinks adjacent LEDs from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unlinkLedFromBlinkSeq(ledIndex, count) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return yield _this21.sendCommand('US' + String(Math.round(ledIndex)) + ',' + String(Math.round(count)));
        })();
    }

    /**
     * Starts a sequence execution: every LED linked to that sequence starts to
     * run it in a loop.
     *
     * @param seqIndex {number} :  index of the sequence to start.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq(seqIndex) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.sendCommand('SS' + String(Math.round(seqIndex)));
        })();
    }

    /**
     * Stops a sequence execution. If started again, the execution
     * restarts from the beginning.
     *
     * @param seqIndex {number} :  index of the sequence to stop.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq(seqIndex) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            return yield _this23.sendCommand('XS' + String(Math.round(seqIndex)));
        })();
    }

    /**
     * Stops a sequence execution and resets its contents. Leds linked to this
     * sequence are not automatically updated anymore.
     *
     * @param seqIndex {number} :  index of the sequence to reset
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq(seqIndex) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            return yield _this24.sendCommand('ZS' + String(Math.round(seqIndex)));
        })();
    }

    /**
     * Configures a sequence to make it start automatically at device
     * startup. Don't forget to call saveBlinkSeq() to make sure the
     * modification is saved in the device flash memory.
     *
     * @param seqIndex {number} :  index of the sequence to reset.
     * @param autostart {number} : 0 to keep the sequence turned off and 1 to start it automatically.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinkSeqStateAtPowerOn(seqIndex, autostart) {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            return yield _this25.sendCommand('AS' + String(Math.round(seqIndex)) + ',' + String(Math.round(autostart)));
        })();
    }

    /**
     * Changes the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex {number} :  index of the sequence to start.
     * @param speed {number} :     sequence running speed (-1000...1000).
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinkSeqSpeed(seqIndex, speed) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            return yield _this26.sendCommand('CS' + String(Math.round(seqIndex)) + ',' + String(Math.round(speed)));
        })();
    }

    /**
     * Saves the LEDs power-on configuration. This includes the start-up color or
     * sequence binding for all LEDs. Warning: if some LEDs are linked to a sequence, the
     * method saveBlinkSeq() must also be called to save the sequence definition.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveLedsConfigAtPowerOn() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            return yield _this27.sendCommand('WL');
        })();
    }

    saveLedsState() {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            return yield _this28.sendCommand('WL');
        })();
    }

    /**
     * Saves the definition of a sequence. Warning: only sequence steps and flags are saved.
     * to save the LEDs startup bindings, the method saveLedsConfigAtPowerOn()
     * must be called.
     *
     * @param seqIndex {number} :  index of the sequence to start.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveBlinkSeq(seqIndex) {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            return yield _this29.sendCommand('WS' + String(Math.round(seqIndex)));
        })();
    }

    /**
     * Sends a binary buffer to the LED RGB buffer, as is.
     * First three bytes are RGB components for LED specified as parameter, the
     * next three bytes for the next LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be updated
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorBuffer(ledIndex, buff) {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            return yield _this30._upload('rgb:0:' + String(Math.round(ledIndex)), buff);
        })();
    }

    /**
     * Sends 24bit RGB colors (provided as a list of integers) to the LED RGB buffer, as is.
     * The first number represents the RGB value of the LED specified as parameter, the second
     * number represents the RGB value of the next LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be updated
     * @param rgbList {Integer[]} : a list of 24bit RGB codes, in the form 0xRRGGBB
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorArray(ledIndex, rgbList) {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let listlen;
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let rgb;
            /** @type {number} **/
            let res;
            listlen = rgbList.length;
            buff = new Uint8Array(3 * listlen);
            idx = 0;
            while (idx < listlen) {
                rgb = rgbList[idx];
                buff.set([rgb >> 16 & 255], 3 * idx);
                buff.set([rgb >> 8 & 255], 3 * idx + 1);
                buff.set([rgb & 255], 3 * idx + 2);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this31._upload('rgb:0:' + String(Math.round(ledIndex)), buff);
            return res;
        })();
    }

    /**
     * Sets up a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the next color code represents the target value of the next LED, etc.
     *
     * @param rgbList {Integer[]} : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgbArray_move(rgbList, delay) {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let listlen;
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let rgb;
            /** @type {number} **/
            let res;
            listlen = rgbList.length;
            buff = new Uint8Array(3 * listlen);
            idx = 0;
            while (idx < listlen) {
                rgb = rgbList[idx];
                buff.set([rgb >> 16 & 255], 3 * idx);
                buff.set([rgb >> 8 & 255], 3 * idx + 1);
                buff.set([rgb & 255], 3 * idx + 2);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this32._upload('rgb:' + String(Math.round(delay)), buff);
            return res;
        })();
    }

    /**
     * Sends a binary buffer to the LED HSL buffer, as is.
     * First three bytes are HSL components for the LED specified as parameter, the
     * next three bytes for the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be updated
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColorBuffer(ledIndex, buff) {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            return yield _this33._upload('hsl:0:' + String(Math.round(ledIndex)), buff);
        })();
    }

    /**
     * Sends 24bit HSL colors (provided as a list of integers) to the LED HSL buffer, as is.
     * The first number represents the HSL value of the LED specified as parameter, the second number represents
     * the HSL value of the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be updated
     * @param hslList {Integer[]} : a list of 24bit HSL codes, in the form 0xHHSSLL
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColorArray(ledIndex, hslList) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let listlen;
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let hsl;
            /** @type {number} **/
            let res;
            listlen = hslList.length;
            buff = new Uint8Array(3 * listlen);
            idx = 0;
            while (idx < listlen) {
                hsl = hslList[idx];
                buff.set([hsl >> 16 & 255], 3 * idx);
                buff.set([hsl >> 8 & 255], 3 * idx + 1);
                buff.set([hsl & 255], 3 * idx + 2);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this34._upload('hsl:0:' + String(Math.round(ledIndex)), buff);
            return res;
        })();
    }

    /**
     * Sets up a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList {Integer[]} : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hslArray_move(hslList, delay) {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let listlen;
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let hsl;
            /** @type {number} **/
            let res;
            listlen = hslList.length;
            buff = new Uint8Array(3 * listlen);
            idx = 0;
            while (idx < listlen) {
                hsl = hslList[idx];
                buff.set([hsl >> 16 & 255], 3 * idx);
                buff.set([hsl >> 8 & 255], 3 * idx + 1);
                buff.set([hsl & 255], 3 * idx + 2);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this35._upload('hsl:' + String(Math.round(delay)), buff);
            return res;
        })();
    }

    /**
     * Returns a binary buffer with content from the LED RGB buffer, as is.
     * First three bytes are RGB components for the first LED in the interval,
     * the next three bytes for the second LED in the interval, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Uint8Array} a binary buffer with RGB components of selected LEDs.
     *
     * On failure, throws an exception or returns an empty binary buffer.
     */
    get_rgbColorBuffer(ledIndex, count) {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            return yield _this36._download('rgb.bin?typ=0&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
        })();
    }

    /**
     * Returns a list on 24bit RGB color values with the current colors displayed on
     * the RGB leds. The first number represents the RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Integer[]} a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_rgbColorArray(ledIndex, count) {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let r;
            /** @type {number} **/
            let g;
            /** @type {number} **/
            let b;
            // may throw an exception
            buff = yield _this37._download('rgb.bin?typ=0&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                r = buff[3 * idx];
                g = buff[3 * idx + 1];
                b = buff[3 * idx + 2];
                res.push(r * 65536 + g * 256 + b);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list on 24bit RGB color values with the RGB LEDs startup colors.
     * The first number represents the startup RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED  which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Integer[]} a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_rgbColorArrayAtPowerOn(ledIndex, count) {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let r;
            /** @type {number} **/
            let g;
            /** @type {number} **/
            let b;
            // may throw an exception
            buff = yield _this38._download('rgb.bin?typ=4&pos=' + String(Math.round(3 * ledIndex)) + '&len=' + String(Math.round(3 * count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                r = buff[3 * idx];
                g = buff[3 * idx + 1];
                b = buff[3 * idx + 2];
                res.push(r * 65536 + g * 256 + b);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list on sequence index for each RGB LED. The first number represents the
     * sequence index for the the first LED, the second number represents the sequence
     * index for the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Integer[]} a list of integers with sequence index
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_linkedSeqArray(ledIndex, count) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let seq;
            // may throw an exception
            buff = yield _this39._download('rgb.bin?typ=1&pos=' + String(Math.round(ledIndex)) + '&len=' + String(Math.round(count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                seq = buff[idx];
                res.push(seq);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list on 32 bit signatures for specified blinking sequences.
     * Since blinking sequences cannot be read from the device, this can be used
     * to detect if a specific blinking sequence is already programmed.
     *
     * @param seqIndex {number} : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return {Integer[]} a list of 32 bit integer signatures
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_blinkSeqSignatures(seqIndex, count) {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let hh;
            /** @type {number} **/
            let hl;
            /** @type {number} **/
            let lh;
            /** @type {number} **/
            let ll;
            // may throw an exception
            buff = yield _this40._download('rgb.bin?typ=2&pos=' + String(Math.round(4 * seqIndex)) + '&len=' + String(Math.round(4 * count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                hh = buff[4 * idx];
                hl = buff[4 * idx + 1];
                lh = buff[4 * idx + 2];
                ll = buff[4 * idx + 3];
                res.push((hh << 24) + (hl << 16) + (lh << 8) + ll);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list of integers with the current speed for specified blinking sequences.
     *
     * @param seqIndex {number} : index of the first sequence speed which should be returned
     * @param count    : number of sequence speeds which should be returned
     *
     * @return {Integer[]} a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_blinkSeqStateSpeed(seqIndex, count) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let lh;
            /** @type {number} **/
            let ll;
            // may throw an exception
            buff = yield _this41._download('rgb.bin?typ=6&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                lh = buff[2 * idx];
                ll = buff[2 * idx + 1];
                res.push((lh << 8) + ll);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list of integers with the "auto-start at power on" flag state for specified blinking sequences.
     *
     * @param seqIndex {number} : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return {Integer[]} a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_blinkSeqStateAtPowerOn(seqIndex, count) {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let started;
            // may throw an exception
            buff = yield _this42._download('rgb.bin?typ=5&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                started = buff[idx];
                res.push(started);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Returns a list of integers with the started state for specified blinking sequences.
     *
     * @param seqIndex {number} : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return {Integer[]} a list of integers, 0 for sequences turned off and 1 for sequences running
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_blinkSeqState(seqIndex, count) {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let started;
            // may throw an exception
            buff = yield _this43._download('rgb.bin?typ=3&pos=' + String(Math.round(seqIndex)) + '&len=' + String(Math.round(count)));
            res.length = 0;
            idx = 0;
            while (idx < count) {
                started = buff[idx];
                res.push(started);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Continues the enumeration of RGB LED clusters started using yFirstColorLedCluster().
     *
     * @return {YColorLedCluster} a pointer to a YColorLedCluster object, corresponding to
     *         a RGB LED cluster currently online, or a null pointer
     *         if there are no more RGB LED clusters to enumerate.
     */
    nextColorLedCluster() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YColorLedCluster.FindColorLedClusterInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of RGB LED clusters currently accessible.
     * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
     * next RGB LED clusters.
     *
     * @return {YColorLedCluster} a pointer to a YColorLedCluster object, corresponding to
     *         the first RGB LED cluster currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedCluster() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('ColorLedCluster');
        if (next_hwid == null) return null;
        return YColorLedCluster.FindColorLedCluster(next_hwid);
    }

    /**
     * Starts the enumeration of RGB LED clusters currently accessible.
     * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
     * next RGB LED clusters.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YColorLedCluster} a pointer to a YColorLedCluster object, corresponding to
     *         the first RGB LED cluster currently online, or a null pointer
     *         if there are none.
     */
    static FirstColorLedClusterInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLedCluster');
        if (next_hwid == null) return null;
        return YColorLedCluster.FindColorLedClusterInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YColorLedCluster implementation)
}

exports.YColorLedCluster = YColorLedCluster; //
// YColorLedClusterProxy Class: synchronous proxy to YColorLedCluster objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YColorLedCluster objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YColorLedClusterProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    _asyncInit() {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            _this44.liveFunc._cachedColorBuffer = yield _this44.liveFunc.get_rgbColorBuffer(0, _this44.liveFunc._activeLedCount);
            _this44.liveFunc._cachedColorAtPowerOn = yield _this44.liveFunc.get_rgbColorArrayAtPowerOn(0, _this44.liveFunc._activeLedCount);;
        })();
    }

    /**
     * Returns a binary buffer with content from the LED RGB buffer, as is.
     * First three bytes are RGB components for the first LED in the interval,
     * the next three bytes for the second LED in the interval, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Uint8Array} a binary buffer with RGB components of selected LEDs.
     *         On failure, throws an exception or returns an empty binary buffer.
     */
    get_rgbColorBuffer(ledIndex, count) {
        var _this45 = this;

        /** @type {Uint8Array} **/
        let res = this.liveFunc._cachedColorBuffer.subarray(3 * ledIndex, 3 * (ledIndex + count));
        this.liveFunc.get_rgbColorBuffer(0, this.liveFunc._activeLedCount).then(function (rgbBuff) {
            _this45.liveFunc._cachedColorBuffer = rgbBuff;
        });
        return res;
    }

    /**
     * Returns a list on 24bit RGB color values with the current colors displayed on
     * the RGB leds. The first number represents the RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Integer[]} a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *         On failure, throws an exception or returns an empty array.
     */
    get_rgbColorArray(ledIndex, count) {
        /** @type {Uint8Array} **/
        let buff = this.get_rgbColorBuffer(ledIndex, count);
        /** @type {Integer[]} **/
        let res = [];
        for (let i = 0; i < count; i++) {
            let r = buff[3 * i];
            let g = buff[3 * i + 1];
            let b = buff[3 * i + 2];
            res.push(r * 65536 + g * 256 + b);
        }
        return res;
    }

    /**
     * Returns a list on 24bit RGB color values with the RGB LEDs startup colors.
     * The first number represents the startup RGB value of the first LED,
     * the second number represents the RGB value of the second LED, etc.
     *
     * @param ledIndex {number} : index of the first LED  which should be returned
     * @param count    : number of LEDs which should be returned
     *
     * @return {Integer[]} a list of 24bit color codes with RGB components of selected LEDs, as 0xRRGGBB.
     *         On failure, throws an exception or returns an empty array.
     */
    get_rgbColorArrayAtPowerOn(ledIndex, count) {
        var _this46 = this;

        /** @type {Uint8Array} **/
        let res = this.liveFunc._cachedColorAtPowerOn.slice(ledIndex, ledIndex + count);
        this.liveFunc.get_rgbColorArrayAtPowerOn(0, this.liveFunc._activeLedCount).then(function (rgbColorArray) {
            _this46.liveFunc._cachedColorAtPowerOn = rgbColorArray;
        });
        return res;
    }

    //--- (generated code: YColorLedCluster accessors declaration)

    /**
     * Returns the number of LEDs currently handled by the device.
     *
     * @return an integer corresponding to the number of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns Y_ACTIVELEDCOUNT_INVALID.
     */
    get_activeLedCount() {
        return this.liveFunc._activeLedCount;
    }

    /**
     * Changes the number of LEDs currently handled by the device.
     *
     * @param newval : an integer corresponding to the number of LEDs currently handled by the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_activeLedCount(newval) {
        this.liveFunc.set_activeLedCount(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximum number of LEDs that the device can handle.
     *
     * @return an integer corresponding to the maximum number of LEDs that the device can handle
     *
     * On failure, throws an exception or returns Y_MAXLEDCOUNT_INVALID.
     */
    get_maxLedCount() {
        return this.liveFunc._maxLedCount;
    }

    /**
     * Returns the maximum number of sequences that the device can handle.
     *
     * @return an integer corresponding to the maximum number of sequences that the device can handle
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXCOUNT_INVALID.
     */
    get_blinkSeqMaxCount() {
        return this.liveFunc._blinkSeqMaxCount;
    }

    /**
     * Returns the maximum length of sequences.
     *
     * @return an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize() {
        return this.liveFunc._blinkSeqMaxSize;
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
     * Changes the current color of consecutve LEDs in the cluster, using a RGB color. Encoding is done as
     * follows: 0xRRGGBB.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColor(ledIndex, count, rgbValue) {
        this.liveFunc.set_rgbColor(ledIndex, count, rgbValue);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Changes the  color at device startup of consecutve LEDs in the cluster, using a RGB color. Encoding
     * is done as follows: 0xRRGGBB.
     * Don't forget to call saveLedsConfigAtPowerOn() to make sure the modification is saved in the device
     * flash memory.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorAtPowerOn(ledIndex, count, rgbValue) {
        this.liveFunc.set_rgbColorAtPowerOn(ledIndex, count, rgbValue);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Changes the current color of consecutive LEDs in the cluster, using a HSL color. Encoding is done
     * as follows: 0xHHSSLL.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColor(ledIndex, count, hslValue) {
        this.liveFunc.set_hslColor(ledIndex, count, hslValue);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgb_move(ledIndex, count, rgbValue, delay) {
        this.liveFunc.rgb_move(ledIndex, count, rgbValue, delay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Allows you to modify the current color of a group of adjacent LEDs  to another color, in a seamless and
     * autonomous manner. The transition is performed in the HSL space. In HSL, hue is a circular
     * value (0..360°). There are always two paths to perform the transition: by increasing
     * or by decreasing the hue. The module selects the shortest transition.
     * If the difference is exactly 180°, the module selects the transition which increases
     * the hue.
     *
     * @param ledIndex :  index of the fisrt affected LED.
     * @param count    :  affected LED count.
     * @param hslValue :  new color (0xHHSSLL).
     * @param delay    :  transition duration in ms
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hsl_move(ledIndex, count, hslValue, delay) {
        this.liveFunc.hsl_move(ledIndex, count, hslValue, delay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Adds an RGB transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by a group of LEDs.  Sequences are persistent and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex :  sequence index.
     * @param rgbValue :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(seqIndex, rgbValue, delay) {
        this.liveFunc.addRgbMoveToBlinkSeq(seqIndex, rgbValue, delay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Adds an HSL transition to a sequence. A sequence is a transition list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistant and are saved
     * in the device flash memory as soon as the saveBlinkSeq() method is called.
     *
     * @param seqIndex : sequence index.
     * @param hslValue : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(seqIndex, hslValue, delay) {
        this.liveFunc.addHslMoveToBlinkSeq(seqIndex, hslValue, delay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reversed so that the sequence plays
     * in the reverse direction, like in a mirror. After the first transition of the sequence
     * is played at the end of the reverse execution, the sequence starts again in
     * the initial direction.
     *
     * @param seqIndex : sequence index.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    addMirrorToBlinkSeq(seqIndex) {
        this.liveFunc.addMirrorToBlinkSeq(seqIndex);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LEDs start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToBlinkSeq(ledIndex, count, seqIndex, offset) {
        this.liveFunc.linkLedToBlinkSeq(ledIndex, count, seqIndex, offset);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Links adjacent LEDs to a specific sequence at device poweron. Don't forget to configure
     * the sequence auto start flag as well and call saveLedsConfigAtPowerOn(). It is possible to add an offset
     * in the execution: that way we  can have several groups of LEDs executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one sequence.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToBlinkSeqAtPowerOn(ledIndex, count, seqIndex, offset) {
        this.liveFunc.linkLedToBlinkSeqAtPowerOn(ledIndex, count, seqIndex, offset);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Links adjacent LEDs to a specific sequence. These LED start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduces a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    linkLedToPeriodicBlinkSeq(ledIndex, count, seqIndex, periods) {
        this.liveFunc.linkLedToPeriodicBlinkSeq(ledIndex, count, seqIndex, periods);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Unlinks adjacent LEDs from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unlinkLedFromBlinkSeq(ledIndex, count) {
        this.liveFunc.unlinkLedFromBlinkSeq(ledIndex, count);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts a sequence execution: every LED linked to that sequence starts to
     * run it in a loop.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq(seqIndex) {
        this.liveFunc.startBlinkSeq(seqIndex);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops a sequence execution. If started again, the execution
     * restarts from the beginning.
     *
     * @param seqIndex :  index of the sequence to stop.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq(seqIndex) {
        this.liveFunc.stopBlinkSeq(seqIndex);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops a sequence execution and resets its contents. Leds linked to this
     * sequence are not automatically updated anymore.
     *
     * @param seqIndex :  index of the sequence to reset
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq(seqIndex) {
        this.liveFunc.resetBlinkSeq(seqIndex);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Configures a sequence to make it start automatically at device
     * startup. Don't forget to call saveBlinkSeq() to make sure the
     * modification is saved in the device flash memory.
     *
     * @param seqIndex :  index of the sequence to reset.
     * @param autostart : 0 to keep the sequence turned off and 1 to start it automatically.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinkSeqStateAtPowerOn(seqIndex, autostart) {
        this.liveFunc.set_blinkSeqStateAtPowerOn(seqIndex, autostart);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Changes the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex :  index of the sequence to start.
     * @param speed :     sequence running speed (-1000...1000).
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_blinkSeqSpeed(seqIndex, speed) {
        this.liveFunc.set_blinkSeqSpeed(seqIndex, speed);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Saves the LEDs power-on configuration. This includes the start-up color or
     * sequence binding for all LEDs. Warning: if some LEDs are linked to a sequence, the
     * method saveBlinkSeq() must also be called to save the sequence definition.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveLedsConfigAtPowerOn() {
        this.liveFunc.saveLedsConfigAtPowerOn();
        return _yocto_api.YAPI_SUCCESS;
    }

    saveLedsState() {
        this.liveFunc.saveLedsState();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Saves the definition of a sequence. Warning: only sequence steps and flags are saved.
     * to save the LEDs startup bindings, the method saveLedsConfigAtPowerOn()
     * must be called.
     *
     * @param seqIndex :  index of the sequence to start.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveBlinkSeq(seqIndex) {
        this.liveFunc.saveBlinkSeq(seqIndex);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a binary buffer to the LED RGB buffer, as is.
     * First three bytes are RGB components for LED specified as parameter, the
     * next three bytes for the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorBuffer(ledIndex, buff) {
        this.liveFunc.set_rgbColorBuffer(ledIndex, buff);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends 24bit RGB colors (provided as a list of integers) to the LED RGB buffer, as is.
     * The first number represents the RGB value of the LED specified as parameter, the second
     * number represents the RGB value of the next LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param rgbList : a list of 24bit RGB codes, in the form 0xRRGGBB
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rgbColorArray(ledIndex, rgbList) {
        this.liveFunc.set_rgbColorArray(ledIndex, rgbList);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets up a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the next color code represents the target value of the next LED, etc.
     *
     * @param rgbList : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    rgbArray_move(rgbList, delay) {
        this.liveFunc.rgbArray_move(rgbList, delay);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a binary buffer to the LED HSL buffer, as is.
     * First three bytes are HSL components for the LED specified as parameter, the
     * next three bytes for the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColorBuffer(ledIndex, buff) {
        this.liveFunc.set_hslColorBuffer(ledIndex, buff);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends 24bit HSL colors (provided as a list of integers) to the LED HSL buffer, as is.
     * The first number represents the HSL value of the LED specified as parameter, the second number represents
     * the HSL value of the second LED, etc.
     *
     * @param ledIndex : index of the first LED which should be updated
     * @param hslList : a list of 24bit HSL codes, in the form 0xHHSSLL
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hslColorArray(ledIndex, hslList) {
        this.liveFunc.set_hslColorArray(ledIndex, hslList);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets up a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hslArray_move(hslList, delay) {
        this.liveFunc.hslArray_move(hslList, delay);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YColorLedCluster accessors declaration)
}

exports.YColorLedClusterProxy = YColorLedClusterProxy; //--- (generated code: ColorLedCluster functions)

/**
 * Retrieves a RGB LED cluster for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the RGB LED cluster is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YColorLedCluster.isOnline() to test if the RGB LED cluster is
 * indeed online at a given time. In case of ambiguity when looking for
 * a RGB LED cluster by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the RGB LED cluster
 *
 * @return {YColorLedCluster} a YColorLedCluster object allowing you to drive the RGB LED cluster.
 */

function yFindColorLedCluster(func) {
    return YColorLedCluster.FindColorLedCluster(func);
}

/**
 * Starts the enumeration of RGB LED clusters currently accessible.
 * Use the method YColorLedCluster.nextColorLedCluster() to iterate on
 * next RGB LED clusters.
 *
 * @return {YColorLedCluster} a pointer to a YColorLedCluster object, corresponding to
 *         the first RGB LED cluster currently online, or a null pointer
 *         if there are none.
 */
function yFirstColorLedCluster() {
    return YColorLedCluster.FirstColorLedCluster();
}

//--- (end of generated code: ColorLedCluster functions)
