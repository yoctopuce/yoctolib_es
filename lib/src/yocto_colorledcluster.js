/*********************************************************************
 *
 * $Id: pic24config.php 24076 2016-04-21 11:57:21Z mvuilleu $
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
import { YAPI, YAPI_SUCCESS, YFunction, YModule, YSensor, YFunctionProxy, YSensorProxy } from 'yoctolib-es/src/yocto_api'

//--- (YColorLedCluster return codes)
//--- (end of YColorLedCluster return codes)
//--- (YColorLedCluster definitions)
export var Y_ACTIVELEDCOUNT_INVALID        = YAPI.INVALID_UINT;
export var Y_MAXLEDCOUNT_INVALID           = YAPI.INVALID_UINT;
export var Y_BLINKSEQMAXCOUNT_INVALID      = YAPI.INVALID_UINT;
export var Y_BLINKSEQMAXSIZE_INVALID       = YAPI.INVALID_UINT;
export var Y_COMMAND_INVALID               = YAPI.INVALID_STRING;
//--- (end of YColorLedCluster definitions)

//--- (YColorLedCluster class start)
/**
 * YColorLedCluster Class: ColorLedCluster function interface
 *
 * The Yoctopuce application programming interface
 * allows you to drive a color LED cluster  using RGB coordinates as well as HSL coordinates.
 * The module performs all conversions form RGB to HSL automatically. It is then
 * self-evident to turn on a LED with a given hue and to progressively vary its
 * saturation or lightness. If needed, you can find more information on the
 * difference between RGB and HSL in the section following this one.
 */
//--- (end of YColorLedCluster class start)

export class YColorLedCluster extends YFunction
{
    constructor(obj_yapi, str_func)
    {
        //--- (YColorLedCluster constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className                  = 'ColorLedCluster';
        /** @member {number} **/
        this._activeLedCount             = Y_ACTIVELEDCOUNT_INVALID;
        /** @member {number} **/
        this._maxLedCount                = Y_MAXLEDCOUNT_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxCount           = Y_BLINKSEQMAXCOUNT_INVALID;
        /** @member {number} **/
        this._blinkSeqMaxSize            = Y_BLINKSEQMAXSIZE_INVALID;
        /** @member {string} **/
        this._command                    = Y_COMMAND_INVALID;
        this.imm_setConst({
            ACTIVELEDCOUNT_INVALID       : YAPI.INVALID_UINT,
            MAXLEDCOUNT_INVALID          : YAPI.INVALID_UINT,
            BLINKSEQMAXCOUNT_INVALID     : YAPI.INVALID_UINT,
            BLINKSEQMAXSIZE_INVALID      : YAPI.INVALID_UINT,
            COMMAND_INVALID              : YAPI.INVALID_STRING
        });
        //--- (end of YColorLedCluster constructor)
    }

    //--- (YColorLedCluster implementation)

    async get_syncProxy()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            try {
                await this.load(this._yapi.defaultCacheValidity);
            } catch(e) {
                // device might be offline
            }
        }
        var res = new YColorLedClusterProxy(this);
        await res._asyncInit();
        res._module = await (await this.module()).get_syncProxy();
        return res;
    }

    imm_parseAttr(name, val)
    {
        switch(name) {
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
     * Returns the count of LEDs currently handled by the device.
     *
     * @return {number} an integer corresponding to the count of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns YColorLedCluster.ACTIVELEDCOUNT_INVALID.
     */
    async get_activeLedCount()
    {
        if (this._cacheExpiration <= this._yapi.GetTickCount()) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_ACTIVELEDCOUNT_INVALID;
            }
        }
        return this._activeLedCount;
    }

    /**
     * Changes the count of LEDs currently handled by the device.
     *
     * @param newval {number} : an integer corresponding to the count of LEDs currently handled by the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    async set_activeLedCount(newval)
    {
        /** @type {string} **/
        let rest_val;
        rest_val = String(newval);
        return await this._setAttr('activeLedCount',rest_val);
    }

    /**
     * Returns the maximum count of LEDs that the device can handle.
     *
     * @return {number} an integer corresponding to the maximum count of LEDs that the device can handle
     *
     * On failure, throws an exception or returns YColorLedCluster.MAXLEDCOUNT_INVALID.
     */
    async get_maxLedCount()
    {
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_MAXLEDCOUNT_INVALID;
            }
        }
        return this._maxLedCount;
    }

    /**
     * Returns the maximum count of sequences.
     *
     * @return {number} an integer corresponding to the maximum count of sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXCOUNT_INVALID.
     */
    async get_blinkSeqMaxCount()
    {
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_BLINKSEQMAXCOUNT_INVALID;
            }
        }
        return this._blinkSeqMaxCount;
    }

    /**
     * Returns the maximum length of sequences.
     *
     * @return {number} an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns YColorLedCluster.BLINKSEQMAXSIZE_INVALID.
     */
    async get_blinkSeqMaxSize()
    {
        if (this._cacheExpiration == 0) {
            if (await this.load(this._yapi.defaultCacheValidity) != this._yapi.SUCCESS) {
                return Y_BLINKSEQMAXSIZE_INVALID;
            }
        }
        return this._blinkSeqMaxSize;
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
    static FindColorLedCluster(func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(YAPI, func);
            YFunction._AddToCache('ColorLedCluster',  func, obj);
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
    static FindColorLedClusterInContext(yctx,func)
    {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx,  'ColorLedCluster', func);
        if (obj == null) {
            obj = new YColorLedCluster(yctx, func);
            YFunction._AddToCache('ColorLedCluster',  func, obj);
        }
        return obj;
    }

    async sendCommand(command)
    {
        return await this.set_command(command);
    }

    /**
     * Changes the current color of consecutve LEDs in the cluster , using a RGB color. Encoding is done
     * as follows: 0xRRGGBB.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue {number} :  new color.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_rgbColor(ledIndex,count,rgbValue)
    {
        return await this.sendCommand('SR'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+(rgbValue).toString(16));
    }

    /**
     * Changes the current color of consecutive LEDs in the cluster , using a HSL color. Encoding is done
     * as follows: 0xHHSSLL.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param hslValue {number} :  new color.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_hslColor(ledIndex,count,hslValue)
    {
        return await this.sendCommand('SH'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+(hslValue).toString(16));
    }

    /**
     * Allows you to modify the current color of a group of adjacent LED  to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space..
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue {number} :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    async rgb_move(ledIndex,count,rgbValue,delay)
    {
        return await this.sendCommand('MR'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+(rgbValue).toString(16)+','+String(Math.round(delay)));
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
     *         On failure, throws an exception or returns a negative error code.
     */
    async hsl_move(ledIndex,count,hslValue,delay)
    {
        return await this.sendCommand('MH'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+(hslValue).toString(16)+','+String(Math.round(delay)));
    }

    /**
     * Adds a RGB transition to a sequence. A sequence is a transitions list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistent and are saved
     * in the device flash as soon as the module saveToFlash() method is called.
     *
     * @param seqIndex {number} :  sequence index.
     * @param rgbValue {number} :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    async addRgbMoveToBlinkSeq(seqIndex,rgbValue,delay)
    {
        return await this.sendCommand('AR'+String(Math.round(seqIndex))+','+(rgbValue).toString(16)+','+String(Math.round(delay)));
    }

    /**
     * Adds a HSL transition to a sequence. A sequence is a transitions list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistant and are saved
     * in the device flash as soon as the module saveToFlash() method is called.
     *
     * @param seqIndex {number} : sequence index.
     * @param hslValue {number} : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    async addHslMoveToBlinkSeq(seqIndex,hslValue,delay)
    {
        return await this.sendCommand('AH'+String(Math.round(seqIndex))+','+(hslValue).toString(16)+','+String(Math.round(delay)));
    }

    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reverted so that the sequence plays
     * in the reverse direction, like in a mirror. When the first transition of the sequence
     * will be played at the end of the reverse execution, the sequence will start again in
     * the initial direction.
     *
     * @param seqIndex {number} : sequence index.
     *         On failure, throws an exception or returns a negative error code.
     */
    async addMirrorToBlinkSeq(seqIndex)
    {
        return await this.sendCommand('AC'+String(Math.round(seqIndex))+',0,0');
    }

    /**
     * Links adjacent LEDs to a specific sequence. these LED will start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one LED.
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex {number} :  sequence index.
     * @param offset   :  execution offset in ms.
     *         On failure, throws an exception or returns a negative error code.
     */
    async linkLedToBlinkSeq(ledIndex,count,seqIndex,offset)
    {
        return await this.sendCommand('LS'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+String(Math.round(seqIndex))+','+String(Math.round(offset)));
    }

    /**
     * Links adjacent LEDs to a specific sequence. these LED will start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduce a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex {number} :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex {number} :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *         On failure, throws an exception or returns a negative error code.
     */
    async linkLedToPeriodicBlinkSeq(ledIndex,count,seqIndex,periods)
    {
        return await this.sendCommand('LP'+String(Math.round(ledIndex))+','+String(Math.round(count))+','+String(Math.round(seqIndex))+','+String(Math.round(periods)));
    }

    /**
     * UnLink adjacent LED  from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *         On failure, throws an exception or returns a negative error code.
     */
    async unlinkLedFromBlinkSeq(ledIndex,count)
    {
        return await this.sendCommand('US'+String(Math.round(ledIndex))+','+String(Math.round(count)));
    }

    /**
     * Start a sequence execution: every LED linked to that sequence will start to
     * run it in a loop.
     *
     * @param seqIndex {number} :  index of the sequence to start.
     *         On failure, throws an exception or returns a negative error code.
     */
    async startBlinkSeq(seqIndex)
    {
        return await this.sendCommand('SS'+String(Math.round(seqIndex)));
    }

    /**
     * Stop a sequence execution. if started again, the execution
     * will restart from the beginning.
     *
     * @param seqIndex {number} :  index of the sequence to stop.
     *         On failure, throws an exception or returns a negative error code.
     */
    async stopBlinkSeq(seqIndex)
    {
        return await this.sendCommand('XS'+String(Math.round(seqIndex)));
    }

    /**
     * Stop a sequence execution and reset its contents. Leds linked to this
     * sequences will no more be automatically updated.
     *
     * @param seqIndex {number} :  index of the sequence to reset
     *         On failure, throws an exception or returns a negative error code.
     */
    async resetBlinkSeq(seqIndex)
    {
        return await this.sendCommand('ZS'+String(Math.round(seqIndex)));
    }

    /**
     * Change the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex {number} :  index of the sequence to start.
     * @param speed {number} :     sequence running speed (-1000...1000).
     *         On failure, throws an exception or returns a negative error code.
     */
    async changeBlinkSeqSpeed(seqIndex,speed)
    {
        return await this.sendCommand('CS'+String(Math.round(seqIndex)));
    }

    /**
     * Save the current state of all LEDs as the initial startup state.
     * The initial startup state includes the choice of sequence linked to each LED.
     * On failure, throws an exception or returns a negative error code.
     */
    async saveLedsState()
    {
        return await this.sendCommand('SL');
    }

    /**
     * Sends a binary buffer to the LED RGB buffer, as is.
     * First three bytes are RGB components for first LED, the
     * next three bytes for the second LED, etc.
     *
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_rgbBuffer(buff)
    {
        return await this._upload('rgb:0', buff);
    }

    /**
     * Sends 24bit RGB colors (provided as a list of integers) to the LED RGB buffer, as is.
     * The first number represents the RGB value of the first LED, the second number represents
     * the RGB value of the second LED, etc.
     *
     * @param rgbList {Integer[]} : a list of 24bit RGB codes, in the form 0xRRGGBB
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_rgbArray(rgbList)
    {
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
        buff = new Uint8Array(3*listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            buff.set([((((rgb) >> (16))) & (255))], 3*idx);
            buff.set([((((rgb) >> (8))) & (255))], 3*idx+1);
            buff.set([((rgb) & (255))], 3*idx+2);
            idx = idx + 1;
        }
        // may throw an exception
        res = await this._upload('rgb:0', buff);
        return res;
    }

    /**
     * Setup a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param rgbList {Integer[]} : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async rgbArray_move(rgbList,delay)
    {
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
        buff = new Uint8Array(3*listlen);
        idx = 0;
        while (idx < listlen) {
            rgb = rgbList[idx];
            buff.set([((((rgb) >> (16))) & (255))], 3*idx);
            buff.set([((((rgb) >> (8))) & (255))], 3*idx+1);
            buff.set([((rgb) & (255))], 3*idx+2);
            idx = idx + 1;
        }
        // may throw an exception
        res = await this._upload('rgb:'+String(Math.round(delay)), buff);
        return res;
    }

    /**
     * Sends a binary buffer to the LED HSL buffer, as is.
     * First three bytes are HSL components for first LED, the
     * next three bytes for the second LED, etc.
     *
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_hslBuffer(buff)
    {
        return await this._upload('hsl:0', buff);
    }

    /**
     * Sends 24bit HSL colors (provided as a list of integers) to the LED HSL buffer, as is.
     * The first number represents the HSL value of the first LED, the second number represents
     * the HSL value of the second LED, etc.
     *
     * @param hslList {Integer[]} : a list of 24bit HSL codes, in the form 0xHHSSLL
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async set_hslArray(hslList)
    {
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
        buff = new Uint8Array(3*listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            buff.set([((((hsl) >> (16))) & (255))], 3*idx);
            buff.set([((((hsl) >> (8))) & (255))], 3*idx+1);
            buff.set([((hsl) & (255))], 3*idx+2);
            idx = idx + 1;
        }
        // may throw an exception
        res = await this._upload('hsl:0', buff);
        return res;
    }

    /**
     * Setup a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList {Integer[]} : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    async hslArray_move(hslList,delay)
    {
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
        buff = new Uint8Array(3*listlen);
        idx = 0;
        while (idx < listlen) {
            hsl = hslList[idx];
            buff.set([((((hsl) >> (16))) & (255))], 3*idx);
            buff.set([((((hsl) >> (8))) & (255))], 3*idx+1);
            buff.set([((hsl) & (255))], 3*idx+2);
            idx = idx + 1;
        }
        // may throw an exception
        res = await this._upload('hsl:'+String(Math.round(delay)), buff);
        return res;
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
    async get_rgbColorBuffer(ledIndex,count)
    {
        return await this._download('rgb.bin?typ=0&pos='+String(Math.round(3*ledIndex))+'&len='+String(Math.round(3*count)));
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
    async get_rgbColorArray(ledIndex,count)
    {
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
        buff = await this._download('rgb.bin?typ=0&pos='+String(Math.round(3*ledIndex))+'&len='+String(Math.round(3*count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            r = buff[3*idx];
            g = buff[3*idx+1];
            b = buff[3*idx+2];
            res.push(r*65536+g*256+b);
            idx = idx + 1;
        }
        return res;
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
     *         On failure, throws an exception or returns an empty array.
     */
    async get_linkedSeqArray(ledIndex,count)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let seq;
        // may throw an exception
        buff = await this._download('rgb.bin?typ=1&pos='+String(Math.round(ledIndex))+'&len='+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            seq = buff[idx];
            res.push(seq);
            idx = idx + 1;
        }
        return res;
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
     *         On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqSignatures(seqIndex,count)
    {
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
        buff = await this._download('rgb.bin?typ=2&pos='+String(Math.round(4*seqIndex))+'&len='+String(Math.round(4*count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            hh = buff[4*idx];
            hl = buff[4*idx+1];
            lh = buff[4*idx+2];
            ll = buff[4*idx+3];
            res.push(((hh) << (24))+((hl) << (16))+((lh) << (8))+ll);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Returns a list of integers with the started state for specified blinking sequences.
     *
     * @param seqIndex {number} : index of the first blinking sequence which should be returned
     * @param count    : number of blinking sequences which should be returned
     *
     * @return {Integer[]} a list of integers, 0 for sequences turned off and 1 for sequences running
     *         On failure, throws an exception or returns an empty array.
     */
    async get_blinkSeqState(seqIndex,count)
    {
        /** @type {Uint8Array} **/
        let buff;
        /** @type {number[]} **/
        let res = [];
        /** @type {number} **/
        let idx;
        /** @type {number} **/
        let started;
        // may throw an exception
        buff = await this._download('rgb.bin?typ=3&pos='+String(Math.round(seqIndex))+'&len='+String(Math.round(count)));
        res.length = 0;
        idx = 0;
        while (idx < count) {
            started = buff[idx];
            res.push(started);
            idx = idx + 1;
        }
        return res;
    }

    /**
     * Continues the enumeration of RGB LED clusters started using yFirstColorLedCluster().
     *
     * @return {YColorLedCluster} a pointer to a YColorLedCluster object, corresponding to
     *         a RGB LED cluster currently online, or a null pointer
     *         if there are no more RGB LED clusters to enumerate.
     */
    nextColorLedCluster()
    {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if(resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if(next_hwid == null) return null;
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
    static FirstColorLedCluster()
    {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('ColorLedCluster');
        if(next_hwid == null) return null;
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
    static FirstColorLedClusterInContext(yctx)
    {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('ColorLedCluster');
        if(next_hwid == null) return null;
        return YColorLedCluster.FindColorLedClusterInContext(yctx, next_hwid);
    }

    //--- (end of YColorLedCluster implementation)
}

//
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
export class YColorLedClusterProxy extends YFunctionProxy
{
    constructor(obj_func)
    {
        super(obj_func);
    }

    //--- (YColorLedCluster accessors declaration)

    /**
     * Returns the count of LEDs currently handled by the device.
     *
     * @return an integer corresponding to the count of LEDs currently handled by the device
     *
     * On failure, throws an exception or returns Y_ACTIVELEDCOUNT_INVALID.
     */
    get_activeLedCount()
    {
        return this.liveFunc._activeLedCount;
    }

    /**
     * Changes the count of LEDs currently handled by the device.
     *
     * @param newval : an integer corresponding to the count of LEDs currently handled by the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_activeLedCount(newval)
    {
        this.liveFunc.set_activeLedCount(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximum count of LEDs that the device can handle.
     *
     * @return an integer corresponding to the maximum count of LEDs that the device can handle
     *
     * On failure, throws an exception or returns Y_MAXLEDCOUNT_INVALID.
     */
    get_maxLedCount()
    {
        return this.liveFunc._maxLedCount;
    }

    /**
     * Returns the maximum count of sequences.
     *
     * @return an integer corresponding to the maximum count of sequences
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXCOUNT_INVALID.
     */
    get_blinkSeqMaxCount()
    {
        return this.liveFunc._blinkSeqMaxCount;
    }

    /**
     * Returns the maximum length of sequences.
     *
     * @return an integer corresponding to the maximum length of sequences
     *
     * On failure, throws an exception or returns Y_BLINKSEQMAXSIZE_INVALID.
     */
    get_blinkSeqMaxSize()
    {
        return this.liveFunc._blinkSeqMaxSize;
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
     * Allows you to modify the current color of a group of adjacent LED  to another color, in a seamless and
     * autonomous manner. The transition is performed in the RGB space..
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param rgbValue :  new color (0xRRGGBB).
     * @param delay    :  transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    rgb_move(ledIndex,count,rgbValue,delay)
    {
        this.liveFunc.rgb_move(ledIndex, count, rgbValue, delay);
        return YAPI_SUCCESS;
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
     *         On failure, throws an exception or returns a negative error code.
     */
    hsl_move(ledIndex,count,hslValue,delay)
    {
        this.liveFunc.hsl_move(ledIndex, count, hslValue, delay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a RGB transition to a sequence. A sequence is a transitions list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistent and are saved
     * in the device flash as soon as the module saveToFlash() method is called.
     *
     * @param seqIndex :  sequence index.
     * @param rgbValue :  target color (0xRRGGBB)
     * @param delay    :  transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    addRgbMoveToBlinkSeq(seqIndex,rgbValue,delay)
    {
        this.liveFunc.addRgbMoveToBlinkSeq(seqIndex, rgbValue, delay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a HSL transition to a sequence. A sequence is a transitions list, which can
     * be executed in loop by an group of LEDs.  Sequences are persistant and are saved
     * in the device flash as soon as the module saveToFlash() method is called.
     *
     * @param seqIndex : sequence index.
     * @param hslValue : target color (0xHHSSLL)
     * @param delay    : transition duration in ms
     *         On failure, throws an exception or returns a negative error code.
     */
    addHslMoveToBlinkSeq(seqIndex,hslValue,delay)
    {
        this.liveFunc.addHslMoveToBlinkSeq(seqIndex, hslValue, delay);
        return YAPI_SUCCESS;
    }

    /**
     * Adds a mirror ending to a sequence. When the sequence will reach the end of the last
     * transition, its running speed will automatically be reverted so that the sequence plays
     * in the reverse direction, like in a mirror. When the first transition of the sequence
     * will be played at the end of the reverse execution, the sequence will start again in
     * the initial direction.
     *
     * @param seqIndex : sequence index.
     *         On failure, throws an exception or returns a negative error code.
     */
    addMirrorToBlinkSeq(seqIndex)
    {
        this.liveFunc.addMirrorToBlinkSeq(seqIndex);
        return YAPI_SUCCESS;
    }

    /**
     * Links adjacent LEDs to a specific sequence. these LED will start to execute
     * the sequence as soon as  startBlinkSeq is called. It is possible to add an offset
     * in the execution: that way we  can have several groups of LED executing the same
     * sequence, with a  temporal offset. A LED cannot be linked to more than one LED.
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param offset   :  execution offset in ms.
     *         On failure, throws an exception or returns a negative error code.
     */
    linkLedToBlinkSeq(ledIndex,count,seqIndex,offset)
    {
        this.liveFunc.linkLedToBlinkSeq(ledIndex, count, seqIndex, offset);
        return YAPI_SUCCESS;
    }

    /**
     * Links adjacent LEDs to a specific sequence. these LED will start to execute
     * the sequence as soon as  startBlinkSeq is called. This function automatically
     * introduce a shift between LEDs so that the specified number of sequence periods
     * appears on the group of LEDs (wave effect).
     *
     * @param ledIndex :  index of the first affected LED.
     * @param count    :  affected LED count.
     * @param seqIndex :  sequence index.
     * @param periods  :  number of periods to show on LEDs.
     *         On failure, throws an exception or returns a negative error code.
     */
    linkLedToPeriodicBlinkSeq(ledIndex,count,seqIndex,periods)
    {
        this.liveFunc.linkLedToPeriodicBlinkSeq(ledIndex, count, seqIndex, periods);
        return YAPI_SUCCESS;
    }

    /**
     * UnLink adjacent LED  from a  sequence.
     *
     * @param ledIndex  :  index of the first affected LED.
     * @param count     :  affected LED count.
     *         On failure, throws an exception or returns a negative error code.
     */
    unlinkLedFromBlinkSeq(ledIndex,count)
    {
        this.liveFunc.unlinkLedFromBlinkSeq(ledIndex, count);
        return YAPI_SUCCESS;
    }

    /**
     * Start a sequence execution: every LED linked to that sequence will start to
     * run it in a loop.
     *
     * @param seqIndex :  index of the sequence to start.
     *         On failure, throws an exception or returns a negative error code.
     */
    startBlinkSeq(seqIndex)
    {
        this.liveFunc.startBlinkSeq(seqIndex);
        return YAPI_SUCCESS;
    }

    /**
     * Stop a sequence execution. if started again, the execution
     * will restart from the beginning.
     *
     * @param seqIndex :  index of the sequence to stop.
     *         On failure, throws an exception or returns a negative error code.
     */
    stopBlinkSeq(seqIndex)
    {
        this.liveFunc.stopBlinkSeq(seqIndex);
        return YAPI_SUCCESS;
    }

    /**
     * Stop a sequence execution and reset its contents. Leds linked to this
     * sequences will no more be automatically updated.
     *
     * @param seqIndex :  index of the sequence to reset
     *         On failure, throws an exception or returns a negative error code.
     */
    resetBlinkSeq(seqIndex)
    {
        this.liveFunc.resetBlinkSeq(seqIndex);
        return YAPI_SUCCESS;
    }

    /**
     * Change the execution speed of a sequence. The natural execution speed is 1000 per
     * thousand. If you configure a slower speed, you can play the sequence in slow-motion.
     * If you set a negative speed, you can play the sequence in reverse direction.
     *
     * @param seqIndex :  index of the sequence to start.
     * @param speed :     sequence running speed (-1000...1000).
     *         On failure, throws an exception or returns a negative error code.
     */
    changeBlinkSeqSpeed(seqIndex,speed)
    {
        this.liveFunc.changeBlinkSeqSpeed(seqIndex, speed);
        return YAPI_SUCCESS;
    }

    /**
     * Save the current state of all LEDs as the initial startup state.
     * The initial startup state includes the choice of sequence linked to each LED.
     * On failure, throws an exception or returns a negative error code.
     */
    saveLedsState()
    {
        this.liveFunc.saveLedsState();
        return YAPI_SUCCESS;
    }

    /**
     * Setup a smooth RGB color transition to the specified pixel-by-pixel list of RGB
     * color codes. The first color code represents the target RGB value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param rgbList : a list of target 24bit RGB codes, in the form 0xRRGGBB
     * @param delay   : transition duration in ms
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    rgbArray_move(rgbList,delay)
    {
        this.liveFunc.rgbArray_move(rgbList, delay);
        return YAPI_SUCCESS;
    }

    /**
     * Setup a smooth HSL color transition to the specified pixel-by-pixel list of HSL
     * color codes. The first color code represents the target HSL value of the first LED,
     * the second color code represents the target value of the second LED, etc.
     *
     * @param hslList : a list of target 24bit HSL codes, in the form 0xHHSSLL
     * @param delay   : transition duration in ms
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    hslArray_move(hslList,delay)
    {
        this.liveFunc.hslArray_move(hslList, delay);
        return YAPI_SUCCESS;
    }
    //--- (end of YColorLedCluster accessors declaration)
}

//--- (ColorLedCluster functions)

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
export function yFindColorLedCluster(func)
{
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
export function yFirstColorLedCluster()
{
    return YColorLedCluster.FirstColorLedCluster();
}

//--- (end of ColorLedCluster functions)
