/*********************************************************************
 *
 * $Id: yocto_segmenteddisplay.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for SegmentedDisplay functions
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
exports.YSegmentedDisplayProxy = exports.YSegmentedDisplay = exports.Y_DISPLAYEDTEXT_INVALID = exports.Y_DISPLAYMODE_INVALID = exports.Y_DISPLAYMODE_AUTO60 = exports.Y_DISPLAYMODE_AUTO1 = exports.Y_DISPLAYMODE_MANUAL = exports.Y_DISPLAYMODE_DISCONNECTED = undefined;
exports.yFindSegmentedDisplay = yFindSegmentedDisplay;
exports.yFirstSegmentedDisplay = yFirstSegmentedDisplay;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YSegmentedDisplay return codes)
//--- (end of YSegmentedDisplay return codes)
//--- (YSegmentedDisplay definitions)
var Y_DISPLAYMODE_DISCONNECTED = exports.Y_DISPLAYMODE_DISCONNECTED = 0;
var Y_DISPLAYMODE_MANUAL = exports.Y_DISPLAYMODE_MANUAL = 1;
var Y_DISPLAYMODE_AUTO1 = exports.Y_DISPLAYMODE_AUTO1 = 2;
var Y_DISPLAYMODE_AUTO60 = exports.Y_DISPLAYMODE_AUTO60 = 3;
var Y_DISPLAYMODE_INVALID = exports.Y_DISPLAYMODE_INVALID = -1;
var Y_DISPLAYEDTEXT_INVALID = exports.Y_DISPLAYEDTEXT_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YSegmentedDisplay definitions)

//--- (YSegmentedDisplay class start)
/**
 * YSegmentedDisplay Class: SegmentedDisplay function interface
 *
 * The SegmentedDisplay class allows you to drive segmented displays.
 */
//--- (end of YSegmentedDisplay class start)

class YSegmentedDisplay extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YSegmentedDisplay constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'SegmentedDisplay';
        /** @member {string} **/
        this._displayedText = Y_DISPLAYEDTEXT_INVALID;
        /** @member {number} **/
        this._displayMode = Y_DISPLAYMODE_INVALID;
        this.imm_setConst({
            DISPLAYEDTEXT_INVALID: _yocto_api.YAPI.INVALID_STRING,
            DISPLAYMODE_DISCONNECTED: 0,
            DISPLAYMODE_MANUAL: 1,
            DISPLAYMODE_AUTO1: 2,
            DISPLAYMODE_AUTO60: 3,
            DISPLAYMODE_INVALID: -1
        });
        //--- (end of YSegmentedDisplay constructor)
    }

    //--- (YSegmentedDisplay implementation)

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
            var res = new YSegmentedDisplayProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'displayedText':
                this._displayedText = val;
                return 1;
            case 'displayMode':
                this._displayMode = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return {string} a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns YSegmentedDisplay.DISPLAYEDTEXT_INVALID.
     */
    get_displayedText() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_DISPLAYEDTEXT_INVALID;
                }
            }
            return _this2._displayedText;
        })();
    }

    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval {string} : a string corresponding to the text currently displayed on the screen
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayedText(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this3._setAttr('displayedText', rest_val);
        })();
    }

    get_displayMode() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_DISPLAYMODE_INVALID;
                }
            }
            return _this4._displayMode;
        })();
    }

    set_displayMode(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('displayMode', rest_val);
        })();
    }

    /**
     * Retrieves a segmented display for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented displays is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the segmented displays
     *
     * @return {YSegmentedDisplay} a YSegmentedDisplay object allowing you to drive the segmented displays.
     */
    static FindSegmentedDisplay(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('SegmentedDisplay', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a segmented display for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the segmented displays is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
     * indeed online at a given time. In case of ambiguity when looking for
     * a segmented display by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the segmented displays
     *
     * @return {YSegmentedDisplay} a YSegmentedDisplay object allowing you to drive the segmented displays.
     */
    static FindSegmentedDisplayInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'SegmentedDisplay', func);
        if (obj == null) {
            obj = new YSegmentedDisplay(yctx, func);
            _yocto_api.YFunction._AddToCache('SegmentedDisplay', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of segmented displays started using yFirstSegmentedDisplay().
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         a segmented display currently online, or a null pointer
     *         if there are no more segmented displays to enumerate.
     */
    nextSegmentedDisplay() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented displays currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplay() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('SegmentedDisplay');
        if (next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplay(next_hwid);
    }

    /**
     * Starts the enumeration of segmented displays currently accessible.
     * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
     * next segmented displays.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
     *         the first segmented displays currently online, or a null pointer
     *         if there are none.
     */
    static FirstSegmentedDisplayInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SegmentedDisplay');
        if (next_hwid == null) return null;
        return YSegmentedDisplay.FindSegmentedDisplayInContext(yctx, next_hwid);
    }

    //--- (end of YSegmentedDisplay implementation)
}

exports.YSegmentedDisplay = YSegmentedDisplay; //
// YSegmentedDisplayProxy Class: synchronous proxy to YSegmentedDisplay objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSegmentedDisplay objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YSegmentedDisplayProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YSegmentedDisplay accessors declaration)

    /**
     * Returns the text currently displayed on the screen.
     *
     * @return a string corresponding to the text currently displayed on the screen
     *
     * On failure, throws an exception or returns Y_DISPLAYEDTEXT_INVALID.
     */
    get_displayedText() {
        return this.liveFunc._displayedText;
    }

    /**
     * Changes the text currently displayed on the screen.
     *
     * @param newval : a string corresponding to the text currently displayed on the screen
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_displayedText(newval) {
        this.liveFunc.set_displayedText(newval);
        return this._yapi.SUCCESS;
    }

    get_displayMode() {
        return this.liveFunc._displayMode;
    }

    set_displayMode(newval) {
        this.liveFunc.set_displayMode(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YSegmentedDisplay accessors declaration)
}

exports.YSegmentedDisplayProxy = YSegmentedDisplayProxy; //--- (SegmentedDisplay functions)

/**
 * Retrieves a segmented display for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the segmented displays is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSegmentedDisplay.isOnline() to test if the segmented displays is
 * indeed online at a given time. In case of ambiguity when looking for
 * a segmented display by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the segmented displays
 *
 * @return {YSegmentedDisplay} a YSegmentedDisplay object allowing you to drive the segmented displays.
 */

function yFindSegmentedDisplay(func) {
    return YSegmentedDisplay.FindSegmentedDisplay(func);
}

/**
 * Starts the enumeration of segmented displays currently accessible.
 * Use the method YSegmentedDisplay.nextSegmentedDisplay() to iterate on
 * next segmented displays.
 *
 * @return {YSegmentedDisplay} a pointer to a YSegmentedDisplay object, corresponding to
 *         the first segmented displays currently online, or a null pointer
 *         if there are none.
 */
function yFirstSegmentedDisplay() {
    return YSegmentedDisplay.FirstSegmentedDisplay();
}

//--- (end of SegmentedDisplay functions)
