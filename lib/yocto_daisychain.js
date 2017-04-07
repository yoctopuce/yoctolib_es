/*********************************************************************
 *
 * $Id: yocto_daisychain.js 26669 2017-02-28 13:40:47Z seb $
 *
 * Implements the high-level API for DaisyChain functions
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
exports.YDaisyChainProxy = exports.YDaisyChain = exports.Y_REQUIREDCHILDCOUNT_INVALID = exports.Y_CHILDCOUNT_INVALID = exports.Y_DAISYSTATE_INVALID = exports.Y_DAISYSTATE_CHILD_LOST = exports.Y_DAISYSTATE_CHILD_MISSING = exports.Y_DAISYSTATE_FIRMWARE_MISMATCH = exports.Y_DAISYSTATE_IS_CHILD = exports.Y_DAISYSTATE_READY = undefined;
exports.yFindDaisyChain = yFindDaisyChain;
exports.yFirstDaisyChain = yFirstDaisyChain;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YDaisyChain return codes)
//--- (end of YDaisyChain return codes)
//--- (YDaisyChain definitions)
var Y_DAISYSTATE_READY = exports.Y_DAISYSTATE_READY = 0;
var Y_DAISYSTATE_IS_CHILD = exports.Y_DAISYSTATE_IS_CHILD = 1;
var Y_DAISYSTATE_FIRMWARE_MISMATCH = exports.Y_DAISYSTATE_FIRMWARE_MISMATCH = 2;
var Y_DAISYSTATE_CHILD_MISSING = exports.Y_DAISYSTATE_CHILD_MISSING = 3;
var Y_DAISYSTATE_CHILD_LOST = exports.Y_DAISYSTATE_CHILD_LOST = 4;
var Y_DAISYSTATE_INVALID = exports.Y_DAISYSTATE_INVALID = -1;
var Y_CHILDCOUNT_INVALID = exports.Y_CHILDCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_REQUIREDCHILDCOUNT_INVALID = exports.Y_REQUIREDCHILDCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YDaisyChain definitions)

//--- (YDaisyChain class start)
/**
 * YDaisyChain Class: DaisyChain function interface
 *
 * The YDaisyChain interface can be used to verify that devices that
 * are daisy-chained directly from device to device, without a hub,
 * are detected properly.
 */
//--- (end of YDaisyChain class start)

class YDaisyChain extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YDaisyChain constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'DaisyChain';
        /** @member {number} **/
        this._daisyState = Y_DAISYSTATE_INVALID;
        /** @member {number} **/
        this._childCount = Y_CHILDCOUNT_INVALID;
        /** @member {number} **/
        this._requiredChildCount = Y_REQUIREDCHILDCOUNT_INVALID;
        this.imm_setConst({
            DAISYSTATE_READY: 0,
            DAISYSTATE_IS_CHILD: 1,
            DAISYSTATE_FIRMWARE_MISMATCH: 2,
            DAISYSTATE_CHILD_MISSING: 3,
            DAISYSTATE_CHILD_LOST: 4,
            DAISYSTATE_INVALID: -1,
            CHILDCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            REQUIREDCHILDCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YDaisyChain constructor)
    }

    //--- (YDaisyChain implementation)

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
            var res = new YDaisyChainProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'daisyState':
                this._daisyState = parseInt(val);
                return 1;
            case 'childCount':
                this._childCount = parseInt(val);
                return 1;
            case 'requiredChildCount':
                this._requiredChildCount = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the daisy-link between modules.
     *
     * @return {number} a value among YDaisyChain.DAISYSTATE_READY, YDaisyChain.DAISYSTATE_IS_CHILD,
     * YDaisyChain.DAISYSTATE_FIRMWARE_MISMATCH, YDaisyChain.DAISYSTATE_CHILD_MISSING and
     * YDaisyChain.DAISYSTATE_CHILD_LOST corresponding to the state of the daisy-link between modules
     *
     * On failure, throws an exception or returns YDaisyChain.DAISYSTATE_INVALID.
     */
    get_daisyState() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_DAISYSTATE_INVALID;
                }
            }
            res = _this2._daisyState;
            return res;
        })();
    }

    /**
     * Returns the number of child nodes currently detected.
     *
     * @return {number} an integer corresponding to the number of child nodes currently detected
     *
     * On failure, throws an exception or returns YDaisyChain.CHILDCOUNT_INVALID.
     */
    get_childCount() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_CHILDCOUNT_INVALID;
                }
            }
            res = _this3._childCount;
            return res;
        })();
    }

    /**
     * Returns the number of child nodes expected in normal conditions.
     *
     * @return {number} an integer corresponding to the number of child nodes expected in normal conditions
     *
     * On failure, throws an exception or returns YDaisyChain.REQUIREDCHILDCOUNT_INVALID.
     */
    get_requiredChildCount() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_REQUIREDCHILDCOUNT_INVALID;
                }
            }
            res = _this4._requiredChildCount;
            return res;
        })();
    }

    /**
     * Changes the number of child nodes expected in normal conditions.
     * If the value is zero, no check is performed. If it is non-zero, the number
     * child nodes is checked on startup and the status will change to error if
     * the count does not match.
     *
     * @param newval {number} : an integer corresponding to the number of child nodes expected in normal conditions
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_requiredChildCount(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('requiredChildCount', rest_val);
        })();
    }

    /**
     * Retrieves a module chain for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the module chain
     *
     * @return {YDaisyChain} a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChain(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('DaisyChain', func);
        if (obj == null) {
            obj = new YDaisyChain(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('DaisyChain', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a module chain for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module chain is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDaisyChain.isOnline() to test if the module chain is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module chain by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the module chain
     *
     * @return {YDaisyChain} a YDaisyChain object allowing you to drive the module chain.
     */
    static FindDaisyChainInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'DaisyChain', func);
        if (obj == null) {
            obj = new YDaisyChain(yctx, func);
            _yocto_api.YFunction._AddToCache('DaisyChain', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of module chains started using yFirstDaisyChain().
     *
     * @return {YDaisyChain} a pointer to a YDaisyChain object, corresponding to
     *         a module chain currently online, or a null pointer
     *         if there are no more module chains to enumerate.
     */
    nextDaisyChain() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YDaisyChain.FindDaisyChainInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @return {YDaisyChain} a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChain() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('DaisyChain');
        if (next_hwid == null) return null;
        return YDaisyChain.FindDaisyChain(next_hwid);
    }

    /**
     * Starts the enumeration of module chains currently accessible.
     * Use the method YDaisyChain.nextDaisyChain() to iterate on
     * next module chains.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDaisyChain} a pointer to a YDaisyChain object, corresponding to
     *         the first module chain currently online, or a null pointer
     *         if there are none.
     */
    static FirstDaisyChainInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DaisyChain');
        if (next_hwid == null) return null;
        return YDaisyChain.FindDaisyChainInContext(yctx, next_hwid);
    }

    //--- (end of YDaisyChain implementation)
}

exports.YDaisyChain = YDaisyChain; //
// YDaisyChainProxy Class: synchronous proxy to YDaisyChain objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDaisyChain objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YDaisyChainProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YDaisyChain accessors declaration)

    /**
     * Returns the state of the daisy-link between modules.
     *
     * @return a value among Y_DAISYSTATE_READY, Y_DAISYSTATE_IS_CHILD, Y_DAISYSTATE_FIRMWARE_MISMATCH,
     * Y_DAISYSTATE_CHILD_MISSING and Y_DAISYSTATE_CHILD_LOST corresponding to the state of the daisy-link
     * between modules
     *
     * On failure, throws an exception or returns Y_DAISYSTATE_INVALID.
     */
    get_daisyState() {
        return this.liveFunc._daisyState;
    }

    /**
     * Returns the number of child nodes currently detected.
     *
     * @return an integer corresponding to the number of child nodes currently detected
     *
     * On failure, throws an exception or returns Y_CHILDCOUNT_INVALID.
     */
    get_childCount() {
        return this.liveFunc._childCount;
    }

    /**
     * Returns the number of child nodes expected in normal conditions.
     *
     * @return an integer corresponding to the number of child nodes expected in normal conditions
     *
     * On failure, throws an exception or returns Y_REQUIREDCHILDCOUNT_INVALID.
     */
    get_requiredChildCount() {
        return this.liveFunc._requiredChildCount;
    }

    /**
     * Changes the number of child nodes expected in normal conditions.
     * If the value is zero, no check is performed. If it is non-zero, the number
     * child nodes is checked on startup and the status will change to error if
     * the count does not match.
     *
     * @param newval : an integer corresponding to the number of child nodes expected in normal conditions
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_requiredChildCount(newval) {
        this.liveFunc.set_requiredChildCount(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YDaisyChain accessors declaration)
}

exports.YDaisyChainProxy = YDaisyChainProxy; //--- (DaisyChain functions)

/**
 * Retrieves a module chain for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the module chain is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDaisyChain.isOnline() to test if the module chain is
 * indeed online at a given time. In case of ambiguity when looking for
 * a module chain by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the module chain
 *
 * @return {YDaisyChain} a YDaisyChain object allowing you to drive the module chain.
 */

function yFindDaisyChain(func) {
    return YDaisyChain.FindDaisyChain(func);
}

/**
 * Starts the enumeration of module chains currently accessible.
 * Use the method YDaisyChain.nextDaisyChain() to iterate on
 * next module chains.
 *
 * @return {YDaisyChain} a pointer to a YDaisyChain object, corresponding to
 *         the first module chain currently online, or a null pointer
 *         if there are none.
 */
function yFirstDaisyChain() {
    return YDaisyChain.FirstDaisyChain();
}

//--- (end of DaisyChain functions)