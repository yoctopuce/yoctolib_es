'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YDisplayProxy = exports.YDisplay = exports.Y_ALIGN_BOTTOM_RIGHT = exports.Y_ALIGN_BASELINE_RIGHT = exports.Y_ALIGN_CENTER_RIGHT = exports.Y_ALIGN_TOP_RIGHT = exports.Y_ALIGN_BOTTOM_DECIMAL = exports.Y_ALIGN_BASELINE_DECIMAL = exports.Y_ALIGN_CENTER_DECIMAL = exports.Y_ALIGN_TOP_DECIMAL = exports.Y_ALIGN_BOTTOM_CENTER = exports.Y_ALIGN_BASELINE_CENTER = exports.Y_ALIGN_CENTER = exports.Y_ALIGN_TOP_CENTER = exports.Y_ALIGN_BOTTOM_LEFT = exports.Y_ALIGN_BASELINE_LEFT = exports.Y_ALIGN_CENTER_LEFT = exports.Y_ALIGN_TOP_LEFT = exports.Y_COMMAND_INVALID = exports.Y_LAYERCOUNT_INVALID = exports.Y_LAYERHEIGHT_INVALID = exports.Y_LAYERWIDTH_INVALID = exports.Y_DISPLAYHEIGHT_INVALID = exports.Y_DISPLAYWIDTH_INVALID = exports.Y_BRIGHTNESS_INVALID = exports.Y_STARTUPSEQ_INVALID = exports.Y_DISPLAYTYPE_INVALID = exports.Y_DISPLAYTYPE_RGB = exports.Y_DISPLAYTYPE_GRAY = exports.Y_DISPLAYTYPE_MONO = exports.Y_ORIENTATION_INVALID = exports.Y_ORIENTATION_DOWN = exports.Y_ORIENTATION_RIGHT = exports.Y_ORIENTATION_UP = exports.Y_ORIENTATION_LEFT = exports.Y_ENABLED_INVALID = exports.Y_ENABLED_TRUE = exports.Y_ENABLED_FALSE = undefined;
exports.yFindDisplay = yFindDisplay;
exports.yFirstDisplay = yFirstDisplay;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * $Id: yocto_display.js 23963 2016-04-17 20:55:12Z mvuilleu $
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Implements yFindDisplay(), the high-level API for Display functions
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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

//--- (generated code: YDisplay definitions)
var Y_ENABLED_FALSE = exports.Y_ENABLED_FALSE = 0;
var Y_ENABLED_TRUE = exports.Y_ENABLED_TRUE = 1;
var Y_ENABLED_INVALID = exports.Y_ENABLED_INVALID = -1;
var Y_ORIENTATION_LEFT = exports.Y_ORIENTATION_LEFT = 0;
var Y_ORIENTATION_UP = exports.Y_ORIENTATION_UP = 1;
var Y_ORIENTATION_RIGHT = exports.Y_ORIENTATION_RIGHT = 2;
var Y_ORIENTATION_DOWN = exports.Y_ORIENTATION_DOWN = 3;
var Y_ORIENTATION_INVALID = exports.Y_ORIENTATION_INVALID = -1;
var Y_DISPLAYTYPE_MONO = exports.Y_DISPLAYTYPE_MONO = 0;
var Y_DISPLAYTYPE_GRAY = exports.Y_DISPLAYTYPE_GRAY = 1;
var Y_DISPLAYTYPE_RGB = exports.Y_DISPLAYTYPE_RGB = 2;
var Y_DISPLAYTYPE_INVALID = exports.Y_DISPLAYTYPE_INVALID = -1;
var Y_STARTUPSEQ_INVALID = exports.Y_STARTUPSEQ_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_BRIGHTNESS_INVALID = exports.Y_BRIGHTNESS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_DISPLAYWIDTH_INVALID = exports.Y_DISPLAYWIDTH_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_DISPLAYHEIGHT_INVALID = exports.Y_DISPLAYHEIGHT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LAYERWIDTH_INVALID = exports.Y_LAYERWIDTH_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LAYERHEIGHT_INVALID = exports.Y_LAYERHEIGHT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LAYERCOUNT_INVALID = exports.Y_LAYERCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YDisplay definitions)

//--- (generated code: YDisplayLayer definitions)
var Y_ALIGN_TOP_LEFT = exports.Y_ALIGN_TOP_LEFT = 0;
var Y_ALIGN_CENTER_LEFT = exports.Y_ALIGN_CENTER_LEFT = 1;
var Y_ALIGN_BASELINE_LEFT = exports.Y_ALIGN_BASELINE_LEFT = 2;
var Y_ALIGN_BOTTOM_LEFT = exports.Y_ALIGN_BOTTOM_LEFT = 3;
var Y_ALIGN_TOP_CENTER = exports.Y_ALIGN_TOP_CENTER = 4;
var Y_ALIGN_CENTER = exports.Y_ALIGN_CENTER = 5;
var Y_ALIGN_BASELINE_CENTER = exports.Y_ALIGN_BASELINE_CENTER = 6;
var Y_ALIGN_BOTTOM_CENTER = exports.Y_ALIGN_BOTTOM_CENTER = 7;
var Y_ALIGN_TOP_DECIMAL = exports.Y_ALIGN_TOP_DECIMAL = 8;
var Y_ALIGN_CENTER_DECIMAL = exports.Y_ALIGN_CENTER_DECIMAL = 9;
var Y_ALIGN_BASELINE_DECIMAL = exports.Y_ALIGN_BASELINE_DECIMAL = 10;
var Y_ALIGN_BOTTOM_DECIMAL = exports.Y_ALIGN_BOTTOM_DECIMAL = 11;
var Y_ALIGN_TOP_RIGHT = exports.Y_ALIGN_TOP_RIGHT = 12;
var Y_ALIGN_CENTER_RIGHT = exports.Y_ALIGN_CENTER_RIGHT = 13;
var Y_ALIGN_BASELINE_RIGHT = exports.Y_ALIGN_BASELINE_RIGHT = 14;
var Y_ALIGN_BOTTOM_RIGHT = exports.Y_ALIGN_BOTTOM_RIGHT = 15;
//--- (end of generated code: YDisplayLayer definitions)

//--- (generated code: YDisplayLayer class start)
/**
 * YDisplayLayer Class: DisplayLayer object interface
 *
 * A DisplayLayer is an image layer containing objects to display
 * (bitmaps, text, etc.). The content is displayed only when
 * the layer is active on the screen (and not masked by other
 * overlapping layers).
 */
//--- (end of generated code: YDisplayLayer class start)

class YDisplayLayer {
    constructor(obj_parent, str_id) {
        this._yapi = obj_parent._yapi;
        this._display = obj_parent;
        this._id = str_id;
        this._cmdbuff = '';
        this._hidden = false;
        //--- (generated code: YDisplayLayer constructor)
        /** @member {number} **/
        this.ALIGN_TOP_LEFT = 0;
        /** @member {number} **/
        this.ALIGN_CENTER_LEFT = 1;
        /** @member {number} **/
        this.ALIGN_BASELINE_LEFT = 2;
        /** @member {number} **/
        this.ALIGN_BOTTOM_LEFT = 3;
        /** @member {number} **/
        this.ALIGN_TOP_CENTER = 4;
        /** @member {number} **/
        this.ALIGN_CENTER = 5;
        /** @member {number} **/
        this.ALIGN_BASELINE_CENTER = 6;
        /** @member {number} **/
        this.ALIGN_BOTTOM_CENTER = 7;
        /** @member {number} **/
        this.ALIGN_TOP_DECIMAL = 8;
        /** @member {number} **/
        this.ALIGN_CENTER_DECIMAL = 9;
        /** @member {number} **/
        this.ALIGN_BASELINE_DECIMAL = 10;
        /** @member {number} **/
        this.ALIGN_BOTTOM_DECIMAL = 11;
        /** @member {number} **/
        this.ALIGN_TOP_RIGHT = 12;
        /** @member {number} **/
        this.ALIGN_CENTER_RIGHT = 13;
        /** @member {number} **/
        this.ALIGN_BASELINE_RIGHT = 14;
        /** @member {number} **/
        this.ALIGN_BOTTOM_RIGHT = 15;
        //--- (end of generated code: YDisplayLayer constructor)
    }

    // internal function to flush any pending command for this layer
    imm_must_be_flushed() {
        return this._cmdbuff != '';
    }

    imm_resetHiddenFlag() {
        this._hidden = false;
        return this._yapi.SUCCESS;
    }

    // internal function to flush any pending command for this layer
    flush_now() {
        var _this = this;

        return _asyncToGenerator(function* () {
            var res = _yocto_api.YAPI_SUCCESS;
            if (_this._cmdbuff != '') {
                res = yield _this._display.sendCommand(_this._cmdbuff);
                _this._cmdbuff = '';
            }
            return res;
        })();
    }

    // internal function to buffer a command for this layer
    command_push(str_cmd) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            var res = _yocto_api.YAPI_SUCCESS;

            if (_this2._cmdbuff.length + str_cmd.length >= 100) {
                // force flush before, to prevent overflow
                res = yield _this2.flush_now();
            }
            if (_this2._cmdbuff == '') {
                // always prepend layer ID first
                _this2._cmdbuff = _this2._id;
            }
            _this2._cmdbuff += str_cmd;
            return res;
        })();
    }

    // internal function to send a command for this layer
    command_flush(str_cmd) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            var res = yield _this3.command_push(str_cmd);
            if (_this3._hidden) {
                return res;
            }
            return yield _this3.flush_now();
        })();
    }

    //--- (generated code: YDisplayLayer implementation)

    /**
     * Reverts the layer to its initial state (fully transparent, default settings).
     * Reinitializes the drawing pointer to the upper left position,
     * and selects the most visible pen color. If you only want to erase the layer
     * content, use the method clear() instead.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            _this4._hidden = false;
            return yield _this4.command_flush('X');
        })();
    }

    /**
     * Erases the whole content of the layer (makes it fully transparent).
     * This method does not change any other attribute of the layer.
     * To reinitialize the layer attributes to defaults settings, use the method
     * reset() instead.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clear() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            return yield _this5.command_flush('x');
        })();
    }

    /**
     * Selects the pen color for all subsequent drawing functions,
     * including text drawing. The pen color is provided as an RGB value.
     * For grayscale or monochrome displays, the value is
     * automatically converted to the proper range.
     *
     * @param color {number} : the desired pen color, as a 24-bit RGB value
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectColorPen(color) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            return yield _this6.command_push('c' + ('000000' + color.toString(16)).slice(-6));
        })();
    }

    /**
     * Selects the pen gray level for all subsequent drawing functions,
     * including text drawing. The gray level is provided as a number between
     * 0 (black) and 255 (white, or whichever the lighest color is).
     * For monochrome displays (without gray levels), any value
     * lower than 128 is rendered as black, and any value equal
     * or above to 128 is non-black.
     *
     * @param graylevel {number} : the desired gray level, from 0 to 255
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectGrayPen(graylevel) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            return yield _this7.command_push('g' + String(Math.round(graylevel)));
        })();
    }

    /**
     * Selects an eraser instead of a pen for all subsequent drawing functions,
     * except for bitmap copy functions. Any point drawn using the eraser
     * becomes transparent (as when the layer is empty), showing the other
     * layers beneath it.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectEraser() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            return yield _this8.command_push('e');
        })();
    }

    /**
     * Enables or disables anti-aliasing for drawing oblique lines and circles.
     * Anti-aliasing provides a smoother aspect when looked from far enough,
     * but it can add fuzzyness when the display is looked from very close.
     * At the end of the day, it is your personal choice.
     * Anti-aliasing is enabled by default on grayscale and color displays,
     * but you can disable it if you prefer. This setting has no effect
     * on monochrome displays.
     *
     * @param mode {boolean} : <t>true</t> to enable antialiasing, <t>false</t> to
     *         disable it.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setAntialiasingMode(mode) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            return yield _this9.command_push('a' + (mode ? "1" : "0"));
        })();
    }

    /**
     * Draws a single pixel at the specified position.
     *
     * @param x {number} : the distance from left of layer, in pixels
     * @param y {number} : the distance from top of layer, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawPixel(x, y) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            return yield _this10.command_flush('P' + String(Math.round(x)) + ',' + String(Math.round(y)));
        })();
    }

    /**
     * Draws an empty rectangle at a specified position.
     *
     * @param x1 {number} : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 {number} : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 {number} : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 {number} : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawRect(x1, y1, x2, y2) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.command_flush('R' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
        })();
    }

    /**
     * Draws a filled rectangular bar at a specified position.
     *
     * @param x1 {number} : the distance from left of layer to the left border of the rectangle, in pixels
     * @param y1 {number} : the distance from top of layer to the top border of the rectangle, in pixels
     * @param x2 {number} : the distance from left of layer to the right border of the rectangle, in pixels
     * @param y2 {number} : the distance from top of layer to the bottom border of the rectangle, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawBar(x1, y1, x2, y2) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return yield _this12.command_flush('B' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
        })();
    }

    /**
     * Draws an empty circle at a specified position.
     *
     * @param x {number} : the distance from left of layer to the center of the circle, in pixels
     * @param y {number} : the distance from top of layer to the center of the circle, in pixels
     * @param r {number} : the radius of the circle, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawCircle(x, y, r) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.command_flush('C' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(r)));
        })();
    }

    /**
     * Draws a filled disc at a given position.
     *
     * @param x {number} : the distance from left of layer to the center of the disc, in pixels
     * @param y {number} : the distance from top of layer to the center of the disc, in pixels
     * @param r {number} : the radius of the disc, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawDisc(x, y, r) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            return yield _this14.command_flush('D' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(r)));
        })();
    }

    /**
     * Selects a font to use for the next text drawing functions, by providing the name of the
     * font file. You can use a built-in font as well as a font file that you have previously
     * uploaded to the device built-in memory. If you experience problems selecting a font
     * file, check the device logs for any error message such as missing font file or bad font
     * file format.
     *
     * @param fontname {string} : the font file name
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectFont(fontname) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            return yield _this15.command_push('&' + fontname + '' + String.fromCharCode(27));
        })();
    }

    /**
     * Draws a text string at the specified position. The point of the text that is aligned
     * to the specified pixel position is called the anchor point, and can be chosen among
     * several options. Text is rendered from left to right, without implicit wrapping.
     *
     * @param x {number} : the distance from left of layer to the text anchor point, in pixels
     * @param y {number} : the distance from top of layer to the text anchor point, in pixels
     * @param anchor {ALIGN} : the text anchor point, chosen among the YDisplayLayer.ALIGN enumeration:
     *         YDisplayLayer.ALIGN_TOP_LEFT,    YDisplayLayer.ALIGN_CENTER_LEFT,   
     *         YDisplayLayer.ALIGN_BASELINE_LEFT,    YDisplayLayer.ALIGN_BOTTOM_LEFT,
     *         YDisplayLayer.ALIGN_TOP_CENTER,  YDisplayLayer.ALIGN_CENTER,        
     *         YDisplayLayer.ALIGN_BASELINE_CENTER,  YDisplayLayer.ALIGN_BOTTOM_CENTER,
     *         YDisplayLayer.ALIGN_TOP_DECIMAL, YDisplayLayer.ALIGN_CENTER_DECIMAL,
     *         YDisplayLayer.ALIGN_BASELINE_DECIMAL, YDisplayLayer.ALIGN_BOTTOM_DECIMAL,
     *         YDisplayLayer.ALIGN_TOP_RIGHT,   YDisplayLayer.ALIGN_CENTER_RIGHT,  
     *         YDisplayLayer.ALIGN_BASELINE_RIGHT,   YDisplayLayer.ALIGN_BOTTOM_RIGHT.
     * @param text {string} : the text string to draw
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawText(x, y, anchor, text) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            return yield _this16.command_flush('T' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(anchor) + ',' + text + '' + String.fromCharCode(27));
        })();
    }

    /**
     * Draws a GIF image at the specified position. The GIF image must have been previously
     * uploaded to the device built-in memory. If you experience problems using an image
     * file, check the device logs for any error message such as missing image file or bad
     * image file format.
     *
     * @param x {number} : the distance from left of layer to the left of the image, in pixels
     * @param y {number} : the distance from top of layer to the top of the image, in pixels
     * @param imagename {string} : the GIF file name
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawImage(x, y, imagename) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            return yield _this17.command_flush('*' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + imagename + '' + String.fromCharCode(27));
        })();
    }

    /**
     * Draws a bitmap at the specified position. The bitmap is provided as a binary object,
     * where each pixel maps to a bit, from left to right and from top to bottom.
     * The most significant bit of each byte maps to the leftmost pixel, and the least
     * significant bit maps to the rightmost pixel. Bits set to 1 are drawn using the
     * layer selected pen color. Bits set to 0 are drawn using the specified background
     * gray level, unless -1 is specified, in which case they are not drawn at all
     * (as if transparent).
     *
     * @param x {number} : the distance from left of layer to the left of the bitmap, in pixels
     * @param y {number} : the distance from top of layer to the top of the bitmap, in pixels
     * @param w {number} : the width of the bitmap, in pixels
     * @param bitmap {Uint8Array} : a binary object
     * @param bgcol {number} : the background gray level to use for zero bits (0 = black,
     *         255 = white), or -1 to leave the pixels unchanged
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    drawBitmap(x, y, w, bitmap, bgcol) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let destname;
            destname = 'layer' + String(Math.round(_this18._id)) + ':' + String(Math.round(w)) + ',' + String(Math.round(bgcol)) + '@' + String(Math.round(x)) + ',' + String(Math.round(y));
            return yield _this18._display.upload(destname, bitmap);
        })();
    }

    /**
     * Moves the drawing pointer of this layer to the specified position.
     *
     * @param x {number} : the distance from left of layer, in pixels
     * @param y {number} : the distance from top of layer, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    moveTo(x, y) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.command_push('@' + String(Math.round(x)) + ',' + String(Math.round(y)));
        })();
    }

    /**
     * Draws a line from current drawing pointer position to the specified position.
     * The specified destination pixel is included in the line. The pointer position
     * is then moved to the end point of the line.
     *
     * @param x {number} : the distance from left of layer to the end point of the line, in pixels
     * @param y {number} : the distance from top of layer to the end point of the line, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    lineTo(x, y) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.command_flush('-' + String(Math.round(x)) + ',' + String(Math.round(y)));
        })();
    }

    /**
     * Outputs a message in the console area, and advances the console pointer accordingly.
     * The console pointer position is automatically moved to the beginning
     * of the next line when a newline character is met, or when the right margin
     * is hit. When the new text to display extends below the lower margin, the
     * console area is automatically scrolled up.
     *
     * @param text {string} : the message to display
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    consoleOut(text) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return yield _this21.command_flush('!' + text + '' + String.fromCharCode(27));
        })();
    }

    /**
     * Sets up display margins for the consoleOut function.
     *
     * @param x1 {number} : the distance from left of layer to the left margin, in pixels
     * @param y1 {number} : the distance from top of layer to the top margin, in pixels
     * @param x2 {number} : the distance from left of layer to the right margin, in pixels
     * @param y2 {number} : the distance from top of layer to the bottom margin, in pixels
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setConsoleMargins(x1, y1, x2, y2) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.command_push('m' + String(Math.round(x1)) + ',' + String(Math.round(y1)) + ',' + String(Math.round(x2)) + ',' + String(Math.round(y2)));
        })();
    }

    /**
     * Sets up the background color used by the clearConsole function and by
     * the console scrolling feature.
     *
     * @param bgcol {number} : the background gray level to use when scrolling (0 = black,
     *         255 = white), or -1 for transparent
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setConsoleBackground(bgcol) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            return yield _this23.command_push('b' + String(Math.round(bgcol)));
        })();
    }

    /**
     * Sets up the wrapping behaviour used by the consoleOut function.
     *
     * @param wordwrap {boolean} : true to wrap only between words,
     *         false to wrap on the last column anyway.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setConsoleWordWrap(wordwrap) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            return yield _this24.command_push('w' + (wordwrap ? "1" : "0"));
        })();
    }

    /**
     * Blanks the console area within console margins, and resets the console pointer
     * to the upper left corner of the console.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearConsole() {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            return yield _this25.command_flush('^');
        })();
    }

    /**
     * Sets the position of the layer relative to the display upper left corner.
     * When smooth scrolling is used, the display offset of the layer is
     * automatically updated during the next milliseconds to animate the move of the layer.
     *
     * @param x {number} : the distance from left of display to the upper left corner of the layer
     * @param y {number} : the distance from top of display to the upper left corner of the layer
     * @param scrollTime {number} : number of milliseconds to use for smooth scrolling, or
     *         0 if the scrolling should be immediate.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    setLayerPosition(x, y, scrollTime) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            return yield _this26.command_flush('#' + String(Math.round(x)) + ',' + String(Math.round(y)) + ',' + String(Math.round(scrollTime)));
        })();
    }

    /**
     * Hides the layer. The state of the layer is perserved but the layer is not displayed
     * on the screen until the next call to unhide(). Hiding the layer can positively
     * affect the drawing speed, since it postpones the rendering until all operations are
     * completed (double-buffering).
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    hide() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            yield _this27.command_push('h');
            _this27._hidden = true;
            return yield _this27.flush_now();
        })();
    }

    /**
     * Shows the layer. Shows the layer again after a hide command.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unhide() {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            _this28._hidden = false;
            return yield _this28.command_flush('s');
        })();
    }

    /**
     * Gets parent YDisplay. Returns the parent YDisplay object of the current YDisplayLayer.
     *
     * @return {YDisplay} an YDisplay object
     */
    get_display() {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            return _this29._display;
        })();
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return {number} an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYWIDTH_INVALID.
     */
    get_displayWidth() {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            return yield _this30._display.get_displayWidth();
        })();
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return {number} an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.DISPLAYHEIGHT_INVALID.
     */
    get_displayHeight() {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            return yield _this31._display.get_displayHeight();
        })();
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return {number} an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERWIDTH_INVALID.
     */
    get_layerWidth() {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            return yield _this32._display.get_layerWidth();
        })();
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return {number} an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplayLayer.LAYERHEIGHT_INVALID.
     */
    get_layerHeight() {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            return yield _this33._display.get_layerHeight();
        })();
    }

    resetHiddenFlag() {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            _this34._hidden = false;
            return _this34._yapi.SUCCESS;
        })();
    }

    //--- (end of generated code: YDisplayLayer implementation)
};

//--- (generated code: YDisplay class start)
/**
 * YDisplay Class: Display function interface
 *
 * Yoctopuce display interface has been designed to easily
 * show information and images. The device provides built-in
 * multi-layer rendering. Layers can be drawn offline, individually,
 * and freely moved on the display. It can also replay recorded
 * sequences (animations).
 */
//--- (end of generated code: YDisplay class start)
class YDisplay extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YDisplay constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Display';
        /** @member {number} **/
        this._enabled = Y_ENABLED_INVALID;
        /** @member {string} **/
        this._startupSeq = Y_STARTUPSEQ_INVALID;
        /** @member {number} **/
        this._brightness = Y_BRIGHTNESS_INVALID;
        /** @member {number} **/
        this._orientation = Y_ORIENTATION_INVALID;
        /** @member {number} **/
        this._displayWidth = Y_DISPLAYWIDTH_INVALID;
        /** @member {number} **/
        this._displayHeight = Y_DISPLAYHEIGHT_INVALID;
        /** @member {number} **/
        this._displayType = Y_DISPLAYTYPE_INVALID;
        /** @member {number} **/
        this._layerWidth = Y_LAYERWIDTH_INVALID;
        /** @member {number} **/
        this._layerHeight = Y_LAYERHEIGHT_INVALID;
        /** @member {number} **/
        this._layerCount = Y_LAYERCOUNT_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            ENABLED_FALSE: 0,
            ENABLED_TRUE: 1,
            ENABLED_INVALID: -1,
            STARTUPSEQ_INVALID: _yocto_api.YAPI.INVALID_STRING,
            BRIGHTNESS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ORIENTATION_LEFT: 0,
            ORIENTATION_UP: 1,
            ORIENTATION_RIGHT: 2,
            ORIENTATION_DOWN: 3,
            ORIENTATION_INVALID: -1,
            DISPLAYWIDTH_INVALID: _yocto_api.YAPI.INVALID_UINT,
            DISPLAYHEIGHT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            DISPLAYTYPE_MONO: 0,
            DISPLAYTYPE_GRAY: 1,
            DISPLAYTYPE_RGB: 2,
            DISPLAYTYPE_INVALID: -1,
            LAYERWIDTH_INVALID: _yocto_api.YAPI.INVALID_UINT,
            LAYERHEIGHT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            LAYERCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YDisplay constructor)

        this._allDisplayLayers = null;
        this._sequence = '';
        this._recording = false;
    }

    //--- (generated code: YDisplay implementation)

    get_syncProxy() {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            if (_this35._cacheExpiration <= _this35._yapi.GetTickCount()) {
                try {
                    yield _this35.load(_this35._yapi.defaultCacheValidity);
                } catch (e) {
                    // device might be offline
                }
            }
            var res = new YDisplayProxy(_this35);
            yield res._asyncInit();
            res._module = yield (yield _this35.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'enabled':
                this._enabled = parseInt(val);
                return 1;
            case 'startupSeq':
                this._startupSeq = val;
                return 1;
            case 'brightness':
                this._brightness = parseInt(val);
                return 1;
            case 'orientation':
                this._orientation = parseInt(val);
                return 1;
            case 'displayWidth':
                this._displayWidth = parseInt(val);
                return 1;
            case 'displayHeight':
                this._displayHeight = parseInt(val);
                return 1;
            case 'displayType':
                this._displayType = parseInt(val);
                return 1;
            case 'layerWidth':
                this._layerWidth = parseInt(val);
                return 1;
            case 'layerHeight':
                this._layerHeight = parseInt(val);
                return 1;
            case 'layerCount':
                this._layerCount = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns true if the screen is powered, false otherwise.
     *
     * @return {number} either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to true if the
     * screen is powered, false otherwise
     *
     * On failure, throws an exception or returns YDisplay.ENABLED_INVALID.
     */
    get_enabled() {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            if (_this36._cacheExpiration <= _this36._yapi.GetTickCount()) {
                if ((yield _this36.load(_this36._yapi.defaultCacheValidity)) != _this36._yapi.SUCCESS) {
                    return Y_ENABLED_INVALID;
                }
            }
            return _this36._enabled;
        })();
    }

    /**
     * Changes the power state of the display.
     *
     * @param newval {number} : either YDisplay.ENABLED_FALSE or YDisplay.ENABLED_TRUE, according to the
     * power state of the display
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval) {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this37._setAttr('enabled', rest_val);
        })();
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     *
     * @return {string} a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * On failure, throws an exception or returns YDisplay.STARTUPSEQ_INVALID.
     */
    get_startupSeq() {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            if (_this38._cacheExpiration <= _this38._yapi.GetTickCount()) {
                if ((yield _this38.load(_this38._yapi.defaultCacheValidity)) != _this38._yapi.SUCCESS) {
                    return Y_STARTUPSEQ_INVALID;
                }
            }
            return _this38._startupSeq;
        })();
    }

    /**
     * Changes the name of the sequence to play when the displayed is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the name of the sequence to play when the
     * displayed is powered on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupSeq(newval) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this39._setAttr('startupSeq', rest_val);
        })();
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     *
     * @return {number} an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     *
     * On failure, throws an exception or returns YDisplay.BRIGHTNESS_INVALID.
     */
    get_brightness() {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            if (_this40._cacheExpiration <= _this40._yapi.GetTickCount()) {
                if ((yield _this40.load(_this40._yapi.defaultCacheValidity)) != _this40._yapi.SUCCESS) {
                    return Y_BRIGHTNESS_INVALID;
                }
            }
            return _this40._brightness;
        })();
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the brightness of the display
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_brightness(newval) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this41._setAttr('brightness', rest_val);
        })();
    }

    /**
     * Returns the currently selected display orientation.
     *
     * @return {number} a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the currently selected
     * display orientation
     *
     * On failure, throws an exception or returns YDisplay.ORIENTATION_INVALID.
     */
    get_orientation() {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            if (_this42._cacheExpiration <= _this42._yapi.GetTickCount()) {
                if ((yield _this42.load(_this42._yapi.defaultCacheValidity)) != _this42._yapi.SUCCESS) {
                    return Y_ORIENTATION_INVALID;
                }
            }
            return _this42._orientation;
        })();
    }

    /**
     * Changes the display orientation. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : a value among YDisplay.ORIENTATION_LEFT, YDisplay.ORIENTATION_UP,
     * YDisplay.ORIENTATION_RIGHT and YDisplay.ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_orientation(newval) {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this43._setAttr('orientation', rest_val);
        })();
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return {number} an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYWIDTH_INVALID.
     */
    get_displayWidth() {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            if (_this44._cacheExpiration <= _this44._yapi.GetTickCount()) {
                if ((yield _this44.load(_this44._yapi.defaultCacheValidity)) != _this44._yapi.SUCCESS) {
                    return Y_DISPLAYWIDTH_INVALID;
                }
            }
            return _this44._displayWidth;
        })();
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return {number} an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYHEIGHT_INVALID.
     */
    get_displayHeight() {
        var _this45 = this;

        return _asyncToGenerator(function* () {
            if (_this45._cacheExpiration <= _this45._yapi.GetTickCount()) {
                if ((yield _this45.load(_this45._yapi.defaultCacheValidity)) != _this45._yapi.SUCCESS) {
                    return Y_DISPLAYHEIGHT_INVALID;
                }
            }
            return _this45._displayHeight;
        })();
    }

    /**
     * Returns the display type: monochrome, gray levels or full color.
     *
     * @return {number} a value among YDisplay.DISPLAYTYPE_MONO, YDisplay.DISPLAYTYPE_GRAY and
     * YDisplay.DISPLAYTYPE_RGB corresponding to the display type: monochrome, gray levels or full color
     *
     * On failure, throws an exception or returns YDisplay.DISPLAYTYPE_INVALID.
     */
    get_displayType() {
        var _this46 = this;

        return _asyncToGenerator(function* () {
            if (_this46._cacheExpiration == 0) {
                if ((yield _this46.load(_this46._yapi.defaultCacheValidity)) != _this46._yapi.SUCCESS) {
                    return Y_DISPLAYTYPE_INVALID;
                }
            }
            return _this46._displayType;
        })();
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return {number} an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERWIDTH_INVALID.
     */
    get_layerWidth() {
        var _this47 = this;

        return _asyncToGenerator(function* () {
            if (_this47._cacheExpiration == 0) {
                if ((yield _this47.load(_this47._yapi.defaultCacheValidity)) != _this47._yapi.SUCCESS) {
                    return Y_LAYERWIDTH_INVALID;
                }
            }
            return _this47._layerWidth;
        })();
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return {number} an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns YDisplay.LAYERHEIGHT_INVALID.
     */
    get_layerHeight() {
        var _this48 = this;

        return _asyncToGenerator(function* () {
            if (_this48._cacheExpiration == 0) {
                if ((yield _this48.load(_this48._yapi.defaultCacheValidity)) != _this48._yapi.SUCCESS) {
                    return Y_LAYERHEIGHT_INVALID;
                }
            }
            return _this48._layerHeight;
        })();
    }

    /**
     * Returns the number of available layers to draw on.
     *
     * @return {number} an integer corresponding to the number of available layers to draw on
     *
     * On failure, throws an exception or returns YDisplay.LAYERCOUNT_INVALID.
     */
    get_layerCount() {
        var _this49 = this;

        return _asyncToGenerator(function* () {
            if (_this49._cacheExpiration == 0) {
                if ((yield _this49.load(_this49._yapi.defaultCacheValidity)) != _this49._yapi.SUCCESS) {
                    return Y_LAYERCOUNT_INVALID;
                }
            }
            return _this49._layerCount;
        })();
    }

    get_command() {
        var _this50 = this;

        return _asyncToGenerator(function* () {
            if (_this50._cacheExpiration <= _this50._yapi.GetTickCount()) {
                if ((yield _this50.load(_this50._yapi.defaultCacheValidity)) != _this50._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this50._command;
        })();
    }

    set_command(newval) {
        var _this51 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this51._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the display
     *
     * @return {YDisplay} a YDisplay object allowing you to drive the display.
     */
    static FindDisplay(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Display', func);
        if (obj == null) {
            obj = new YDisplay(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the display is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDisplay.isOnline() to test if the display is
     * indeed online at a given time. In case of ambiguity when looking for
     * a display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the display
     *
     * @return {YDisplay} a YDisplay object allowing you to drive the display.
     */
    static FindDisplayInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Display', func);
        if (obj == null) {
            obj = new YDisplay(yctx, func);
            _yocto_api.YFunction._AddToCache('Display', func, obj);
        }
        return obj;
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Don't use that
     * function to reset the display at sequence start-up.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetAll() {
        var _this52 = this;

        return _asyncToGenerator(function* () {
            yield _this52.flushLayers();
            _this52.imm_resetHiddenLayerFlags();
            return yield _this52.sendCommand('Z');
        })();
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     *
     * @param brightness {number} : the new screen brightness
     * @param duration {number} : duration of the brightness transition, in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    fade(brightness, duration) {
        var _this53 = this;

        return _asyncToGenerator(function* () {
            yield _this53.flushLayers();
            return yield _this53.sendCommand('+' + String(Math.round(brightness)) + ',' + String(Math.round(duration)));
        })();
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    newSequence() {
        var _this54 = this;

        return _asyncToGenerator(function* () {
            yield _this54.flushLayers();
            _this54._sequence = '';
            _this54._recording = true;
            return _this54._yapi.SUCCESS;
        })();
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     *
     * @param sequenceName {string} : the name of the newly created sequence
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveSequence(sequenceName) {
        var _this55 = this;

        return _asyncToGenerator(function* () {
            yield _this55.flushLayers();
            _this55._recording = false;
            yield _this55._upload(sequenceName, _this55._yapi.imm_str2bin(_this55._sequence));
            //We need to use YPRINTF("") for Objective-C
            _this55._sequence = '';
            return _this55._yapi.SUCCESS;
        })();
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     *
     * @param sequenceName {string} : the name of the newly created sequence
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    playSequence(sequenceName) {
        var _this56 = this;

        return _asyncToGenerator(function* () {
            yield _this56.flushLayers();
            return yield _this56.sendCommand('S' + sequenceName);
        })();
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     *
     * @param delay_ms {number} : the duration to wait, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pauseSequence(delay_ms) {
        var _this57 = this;

        return _asyncToGenerator(function* () {
            yield _this57.flushLayers();
            return yield _this57.sendCommand('W' + String(Math.round(delay_ms)));
        })();
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    stopSequence() {
        var _this58 = this;

        return _asyncToGenerator(function* () {
            yield _this58.flushLayers();
            return yield _this58.sendCommand('S');
        })();
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
     *
     * @param pathname {string} : path and name of the new file to create
     * @param content {Uint8Array} : binary buffer with the content to set
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    upload(pathname, content) {
        var _this59 = this;

        return _asyncToGenerator(function* () {
            return yield _this59._upload(pathname, content);
        })();
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param srcLayerId {number} : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId {number} : the identifier of the destination layer (a number in range 0..layerCount-1)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    copyLayerContent(srcLayerId, dstLayerId) {
        var _this60 = this;

        return _asyncToGenerator(function* () {
            yield _this60.flushLayers();
            return yield _this60.sendCommand('o' + String(Math.round(srcLayerId)) + ',' + String(Math.round(dstLayerId)));
        })();
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between onae hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param layerIdA {number} : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB {number} : the second layer (a number in range 0..layerCount-1)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    swapLayerContent(layerIdA, layerIdB) {
        var _this61 = this;

        return _asyncToGenerator(function* () {
            yield _this61.flushLayers();
            return yield _this61.sendCommand('E' + String(Math.round(layerIdA)) + ',' + String(Math.round(layerIdB)));
        })();
    }

    /**
     * Continues the enumeration of displays started using yFirstDisplay().
     *
     * @return {YDisplay} a pointer to a YDisplay object, corresponding to
     *         a display currently online, or a null pointer
     *         if there are no more displays to enumerate.
     */
    nextDisplay() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @return {YDisplay} a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplay() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Display');
        if (next_hwid == null) return null;
        return YDisplay.FindDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of displays currently accessible.
     * Use the method YDisplay.nextDisplay() to iterate on
     * next displays.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDisplay} a pointer to a YDisplay object, corresponding to
     *         the first display currently online, or a null pointer
     *         if there are none.
     */
    static FirstDisplayInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Display');
        if (next_hwid == null) return null;
        return YDisplay.FindDisplayInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YDisplay implementation)

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     *
     * @param layerId {number} : the identifier of the layer (a number in range 0..layerCount-1)
     *
     * @return {synchronized YDisplayLayer} an YDisplayLayer object
     *
     * On failure, throws an exception or returns null.
     */
    get_displayLayer(layerId) {
        var _this62 = this;

        return _asyncToGenerator(function* () {
            if (!_this62._allDisplayLayers) {
                var nb_display_layer = yield _this62.get_layerCount();
                _this62._allDisplayLayers = [];
                for (var i = 0; i < nb_display_layer; i++) {
                    _this62._allDisplayLayers[i] = new YDisplayLayer(_this62, '' + i);
                }
            }
            if (layerId < 0 || layerId >= _this62._allDisplayLayers.length) {
                throw new YAPI_Exception(_yocto_api.YAPI.INVALID_ARGUMENT, 'Invalid layerId');
            }
            return _this62._allDisplayLayers[layerId];
        })();
    }

    flushLayers() {
        var _this63 = this;

        return _asyncToGenerator(function* () {
            if (_this63._allDisplayLayers) {
                for (var i = 0; i < _this63._allDisplayLayers.length; i++) {
                    if (_this63._allDisplayLayers[i].imm_must_be_flushed()) {
                        yield _this63._allDisplayLayers[i].flush_now();
                    }
                }
            }
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    resetHiddenLayerFlags() {
        var _this64 = this;

        return _asyncToGenerator(function* () {
            if (_this64._allDisplayLayers) {
                for (var i = 0; i < _this64._allDisplayLayers.length; i++) {
                    yield _this64._allDisplayLayers[i].resetHiddenFlag();
                }
            }
        })();
    }

    imm_resetHiddenLayerFlags() {
        if (this._allDisplayLayers) {
            for (var i = 0; i < this._allDisplayLayers.length; i++) {
                this._allDisplayLayers[i].imm_resetHiddenFlag();
            }
        }
    }

    sendCommand(cmd) {
        var _this65 = this;

        return _asyncToGenerator(function* () {
            if (!_this65._recording) {
                // ignore call when there is no ongoing sequence
                console.log('sendCommand: ' + cmd);
                return yield _this65.set_command(cmd);
            }
            _this65._sequence += cmd + '\n';
            return _yocto_api.YAPI_SUCCESS;
        })();
    }
}

exports.YDisplay = YDisplay; //
// YDisplayProxy Class: synchronous proxy to YDisplay objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDisplay objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YDisplayProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    _asyncInit() {
        var _this66 = this;

        return _asyncToGenerator(function* () {
            yield _this66.liveFunc.get_displayLayer();
        })();
    }

    //--- (generated code: YDisplay accessors declaration)

    /**
     * Returns true if the screen is powered, false otherwise.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the screen is powered, false otherwise
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled() {
        return this.liveFunc._enabled;
    }

    /**
     * Changes the power state of the display.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the power state of the display
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval) {
        this.liveFunc.set_enabled(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the name of the sequence to play when the displayed is powered on.
     *
     * @return a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * On failure, throws an exception or returns Y_STARTUPSEQ_INVALID.
     */
    get_startupSeq() {
        return this.liveFunc._startupSeq;
    }

    /**
     * Changes the name of the sequence to play when the displayed is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the name of the sequence to play when the displayed is powered on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupSeq(newval) {
        this.liveFunc.set_startupSeq(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     *
     * @return an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     *
     * On failure, throws an exception or returns Y_BRIGHTNESS_INVALID.
     */
    get_brightness() {
        return this.liveFunc._brightness;
    }

    /**
     * Changes the brightness of the display. The parameter is a value between 0 and
     * 100. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : an integer corresponding to the brightness of the display
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_brightness(newval) {
        this.liveFunc.set_brightness(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the currently selected display orientation.
     *
     * @return a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     * Y_ORIENTATION_DOWN corresponding to the currently selected display orientation
     *
     * On failure, throws an exception or returns Y_ORIENTATION_INVALID.
     */
    get_orientation() {
        return this.liveFunc._orientation;
    }

    /**
     * Changes the display orientation. Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a value among Y_ORIENTATION_LEFT, Y_ORIENTATION_UP, Y_ORIENTATION_RIGHT and
     * Y_ORIENTATION_DOWN corresponding to the display orientation
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_orientation(newval) {
        this.liveFunc.set_orientation(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the display width, in pixels.
     *
     * @return an integer corresponding to the display width, in pixels
     *
     * On failure, throws an exception or returns Y_DISPLAYWIDTH_INVALID.
     */
    get_displayWidth() {
        return this.liveFunc._displayWidth;
    }

    /**
     * Returns the display height, in pixels.
     *
     * @return an integer corresponding to the display height, in pixels
     *
     * On failure, throws an exception or returns Y_DISPLAYHEIGHT_INVALID.
     */
    get_displayHeight() {
        return this.liveFunc._displayHeight;
    }

    /**
     * Returns the display type: monochrome, gray levels or full color.
     *
     * @return a value among Y_DISPLAYTYPE_MONO, Y_DISPLAYTYPE_GRAY and Y_DISPLAYTYPE_RGB corresponding to
     * the display type: monochrome, gray levels or full color
     *
     * On failure, throws an exception or returns Y_DISPLAYTYPE_INVALID.
     */
    get_displayType() {
        return this.liveFunc._displayType;
    }

    /**
     * Returns the width of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the width of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns Y_LAYERWIDTH_INVALID.
     */
    get_layerWidth() {
        return this.liveFunc._layerWidth;
    }

    /**
     * Returns the height of the layers to draw on, in pixels.
     *
     * @return an integer corresponding to the height of the layers to draw on, in pixels
     *
     * On failure, throws an exception or returns Y_LAYERHEIGHT_INVALID.
     */
    get_layerHeight() {
        return this.liveFunc._layerHeight;
    }

    /**
     * Returns the number of available layers to draw on.
     *
     * @return an integer corresponding to the number of available layers to draw on
     *
     * On failure, throws an exception or returns Y_LAYERCOUNT_INVALID.
     */
    get_layerCount() {
        return this.liveFunc._layerCount;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Clears the display screen and resets all display layers to their default state.
     * Using this function in a sequence will kill the sequence play-back. Don't use that
     * function to reset the display at sequence start-up.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetAll() {
        this.liveFunc.resetAll();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Smoothly changes the brightness of the screen to produce a fade-in or fade-out
     * effect.
     *
     * @param brightness : the new screen brightness
     * @param duration : duration of the brightness transition, in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    fade(brightness, duration) {
        this.liveFunc.fade(brightness, duration);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts to record all display commands into a sequence, for later replay.
     * The name used to store the sequence is specified when calling
     * saveSequence(), once the recording is complete.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    newSequence() {
        this.liveFunc.newSequence();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops recording display commands and saves the sequence into the specified
     * file on the display internal memory. The sequence can be later replayed
     * using playSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveSequence(sequenceName) {
        this.liveFunc.saveSequence(sequenceName);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Replays a display sequence previously recorded using
     * newSequence() and saveSequence().
     *
     * @param sequenceName : the name of the newly created sequence
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    playSequence(sequenceName) {
        this.liveFunc.playSequence(sequenceName);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Waits for a specified delay (in milliseconds) before playing next
     * commands in current sequence. This method can be used while
     * recording a display sequence, to insert a timed wait in the sequence
     * (without any immediate effect). It can also be used dynamically while
     * playing a pre-recorded sequence, to suspend or resume the execution of
     * the sequence. To cancel a delay, call the same method with a zero delay.
     *
     * @param delay_ms : the duration to wait, in milliseconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pauseSequence(delay_ms) {
        this.liveFunc.pauseSequence(delay_ms);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops immediately any ongoing sequence replay.
     * The display is left as is.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    stopSequence() {
        this.liveFunc.stopSequence();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Uploads an arbitrary file (for instance a GIF file) to the display, to the
     * specified full path name. If a file already exists with the same path name,
     * its content is overwritten.
     *
     * @param pathname : path and name of the new file to create
     * @param content : binary buffer with the content to set
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    upload(pathname, content) {
        this.liveFunc.upload(pathname, content);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Copies the whole content of a layer to another layer. The color and transparency
     * of all the pixels from the destination layer are set to match the source pixels.
     * This method only affects the displayed content, but does not change any
     * property of the layer object.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param srcLayerId : the identifier of the source layer (a number in range 0..layerCount-1)
     * @param dstLayerId : the identifier of the destination layer (a number in range 0..layerCount-1)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    copyLayerContent(srcLayerId, dstLayerId) {
        this.liveFunc.copyLayerContent(srcLayerId, dstLayerId);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Swaps the whole content of two layers. The color and transparency of all the pixels from
     * the two layers are swapped. This method only affects the displayed content, but does
     * not change any property of the layer objects. In particular, the visibility of each
     * layer stays unchanged. When used between onae hidden layer and a visible layer,
     * this method makes it possible to easily implement double-buffering.
     * Note that layer 0 has no transparency support (it is always completely opaque).
     *
     * @param layerIdA : the first layer (a number in range 0..layerCount-1)
     * @param layerIdB : the second layer (a number in range 0..layerCount-1)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    swapLayerContent(layerIdA, layerIdB) {
        this.liveFunc.swapLayerContent(layerIdA, layerIdB);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YDisplay accessors declaration)

    /**
     * Returns a YDisplayLayer object that can be used to draw on the specified
     * layer. The content is displayed only when the layer is active on the
     * screen (and not masked by other overlapping layers).
     *
     * @param layerId {number} : the identifier of the layer (a number in range 0..layerCount-1)
     *
     * @return {YDisplayLayer} an YDisplayLayer object
     *
     * On failure, throws an exception or returns null.
     */
    get_displayLayer(layerId) {
        return this.liveFunc._allDisplayLayers[layerId];
    }

    flushLayers() {
        this.liveFunc.flushLayers();
        return _yocto_api.YAPI_SUCCESS;
    }

    resetHiddenLayerFlags() {
        this.liveFunc.resetHiddenLayerFlags();
        return _yocto_api.YAPI_SUCCESS;
    }

    sendCommand(cmd) {
        this.liveFunc.sendCommand(cmd);
        return _yocto_api.YAPI_SUCCESS;
    }
}

exports.YDisplayProxy = YDisplayProxy; //--- (generated code: Display functions)

/**
 * Retrieves a display for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the display is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDisplay.isOnline() to test if the display is
 * indeed online at a given time. In case of ambiguity when looking for
 * a display by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the display
 *
 * @return {YDisplay} a YDisplay object allowing you to drive the display.
 */

function yFindDisplay(func) {
    return YDisplay.FindDisplay(func);
}

/**
 * Starts the enumeration of displays currently accessible.
 * Use the method YDisplay.nextDisplay() to iterate on
 * next displays.
 *
 * @return {YDisplay} a pointer to a YDisplay object, corresponding to
 *         the first display currently online, or a null pointer
 *         if there are none.
 */
function yFirstDisplay() {
    return YDisplay.FirstDisplay();
}

//--- (end of generated code: Display functions)
