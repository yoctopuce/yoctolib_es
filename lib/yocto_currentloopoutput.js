/*********************************************************************
 *
 * $Id: yocto_currentloopoutput.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for CurrentLoopOutput functions
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
exports.YCurrentLoopOutputProxy = exports.YCurrentLoopOutput = exports.Y_CURRENTATSTARTUP_INVALID = exports.Y_CURRENTTRANSITION_INVALID = exports.Y_CURRENT_INVALID = exports.Y_LOOPPOWER_INVALID = exports.Y_LOOPPOWER_POWEROK = exports.Y_LOOPPOWER_LOWPWR = exports.Y_LOOPPOWER_NOPWR = undefined;
exports.yFindCurrentLoopOutput = yFindCurrentLoopOutput;
exports.yFirstCurrentLoopOutput = yFirstCurrentLoopOutput;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YCurrentLoopOutput return codes)
//--- (end of YCurrentLoopOutput return codes)
//--- (YCurrentLoopOutput definitions)
var Y_LOOPPOWER_NOPWR = exports.Y_LOOPPOWER_NOPWR = 0;
var Y_LOOPPOWER_LOWPWR = exports.Y_LOOPPOWER_LOWPWR = 1;
var Y_LOOPPOWER_POWEROK = exports.Y_LOOPPOWER_POWEROK = 2;
var Y_LOOPPOWER_INVALID = exports.Y_LOOPPOWER_INVALID = -1;
var Y_CURRENT_INVALID = exports.Y_CURRENT_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_CURRENTTRANSITION_INVALID = exports.Y_CURRENTTRANSITION_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CURRENTATSTARTUP_INVALID = exports.Y_CURRENTATSTARTUP_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of YCurrentLoopOutput definitions)

//--- (YCurrentLoopOutput class start)
/**
 * YCurrentLoopOutput Class: CurrentLoopOutput function interface
 *
 * The Yoctopuce application programming interface allows you to change the value of the 4-20mA
 * output as well as to know the current loop state.
 */
//--- (end of YCurrentLoopOutput class start)

class YCurrentLoopOutput extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YCurrentLoopOutput constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'CurrentLoopOutput';
        /** @member {number} **/
        this._current = Y_CURRENT_INVALID;
        /** @member {string} **/
        this._currentTransition = Y_CURRENTTRANSITION_INVALID;
        /** @member {number} **/
        this._currentAtStartUp = Y_CURRENTATSTARTUP_INVALID;
        /** @member {number} **/
        this._loopPower = Y_LOOPPOWER_INVALID;
        this.imm_setConst({
            CURRENT_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            CURRENTTRANSITION_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CURRENTATSTARTUP_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            LOOPPOWER_NOPWR: 0,
            LOOPPOWER_LOWPWR: 1,
            LOOPPOWER_POWEROK: 2,
            LOOPPOWER_INVALID: -1
        });
        //--- (end of YCurrentLoopOutput constructor)
    }

    //--- (YCurrentLoopOutput implementation)

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
            var res = new YCurrentLoopOutputProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'current':
                this._current = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'currentTransition':
                this._currentTransition = val;
                return 1;
            case 'currentAtStartUp':
                this._currentAtStartUp = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'loopPower':
                this._loopPower = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the current loop, the valid range is from 3 to 21mA. If the loop is
     * not propely powered, the  target current is not reached and
     * loopPower is set to LOWPWR.
     *
     * @param newval {number} : a floating point number corresponding to the current loop, the valid range
     * is from 3 to 21mA
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_current(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this2._setAttr('current', rest_val);
        })();
    }

    /**
     * Returns the loop current set point in mA.
     *
     * @return {number} a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENT_INVALID.
     */
    get_current() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_CURRENT_INVALID;
                }
            }
            return _this3._current;
        })();
    }

    get_currentTransition() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_CURRENTTRANSITION_INVALID;
                }
            }
            return _this4._currentTransition;
        })();
    }

    set_currentTransition(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this5._setAttr('currentTransition', rest_val);
        })();
    }

    /**
     * Changes the loop current at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval {number} : a floating point number corresponding to the loop current at device start up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentAtStartUp(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this6._setAttr('currentAtStartUp', rest_val);
        })();
    }

    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return {number} a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.CURRENTATSTARTUP_INVALID.
     */
    get_currentAtStartUp() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_CURRENTATSTARTUP_INVALID;
                }
            }
            return _this7._currentAtStartUp;
        })();
    }

    /**
     * Returns the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @return {number} a value among YCurrentLoopOutput.LOOPPOWER_NOPWR,
     * YCurrentLoopOutput.LOOPPOWER_LOWPWR and YCurrentLoopOutput.LOOPPOWER_POWEROK corresponding to the
     * loop powerstate
     *
     * On failure, throws an exception or returns YCurrentLoopOutput.LOOPPOWER_INVALID.
     */
    get_loopPower() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_LOOPPOWER_INVALID;
                }
            }
            return _this8._loopPower;
        })();
    }

    /**
     * Retrieves a 4-20mA output for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the 4-20mA output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a 4-20mA output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the 4-20mA output
     *
     * @return {YCurrentLoopOutput} a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
     */
    static FindCurrentLoopOutput(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('CurrentLoopOutput', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a 4-20mA output for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the 4-20mA output is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
     * indeed online at a given time. In case of ambiguity when looking for
     * a 4-20mA output by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the 4-20mA output
     *
     * @return {YCurrentLoopOutput} a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
     */
    static FindCurrentLoopOutputInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'CurrentLoopOutput', func);
        if (obj == null) {
            obj = new YCurrentLoopOutput(yctx, func);
            _yocto_api.YFunction._AddToCache('CurrentLoopOutput', func, obj);
        }
        return obj;
    }

    /**
     * Performs a smooth transistion of current flowing in the loop. Any current explicit
     * change cancels any ongoing transition process.
     *
     * @param mA_target   : new current value at the end of the transition
     *         (floating-point number, representing the transition duration in mA)
     * @param ms_duration {number} : total duration of the transition, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     */
    currentMove(mA_target, ms_duration) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let newval;
            if (mA_target < 3.0) {
                mA_target = 3.0;
            }
            if (mA_target > 21.0) {
                mA_target = 21.0;
            }
            newval = String(Math.round(Math.round(mA_target * 1000))) + ':' + String(Math.round(ms_duration));
            // may throw an exception
            return yield _this9.set_currentTransition(newval);
        })();
    }

    /**
     * Continues the enumeration of 4-20mA outputs started using yFirstCurrentLoopOutput().
     *
     * @return {YCurrentLoopOutput} a pointer to a YCurrentLoopOutput object, corresponding to
     *         a 4-20mA output currently online, or a null pointer
     *         if there are no more 4-20mA outputs to enumerate.
     */
    nextCurrentLoopOutput() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @return {YCurrentLoopOutput} a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentLoopOutput() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('CurrentLoopOutput');
        if (next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutput(next_hwid);
    }

    /**
     * Starts the enumeration of 4-20mA outputs currently accessible.
     * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
     * next 4-20mA outputs.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCurrentLoopOutput} a pointer to a YCurrentLoopOutput object, corresponding to
     *         the first 4-20mA output currently online, or a null pointer
     *         if there are none.
     */
    static FirstCurrentLoopOutputInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('CurrentLoopOutput');
        if (next_hwid == null) return null;
        return YCurrentLoopOutput.FindCurrentLoopOutputInContext(yctx, next_hwid);
    }

    //--- (end of YCurrentLoopOutput implementation)
}

exports.YCurrentLoopOutput = YCurrentLoopOutput; //
// YCurrentLoopOutputProxy Class: synchronous proxy to YCurrentLoopOutput objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCurrentLoopOutput objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YCurrentLoopOutputProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YCurrentLoopOutput accessors declaration)

    /**
     * Changes the current loop, the valid range is from 3 to 21mA. If the loop is
     * not propely powered, the  target current is not reached and
     * loopPower is set to LOWPWR.
     *
     * @param newval : a floating point number corresponding to the current loop, the valid range is from 3 to 21mA
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_current(newval) {
        this.liveFunc.set_current(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the loop current set point in mA.
     *
     * @return a floating point number corresponding to the loop current set point in mA
     *
     * On failure, throws an exception or returns Y_CURRENT_INVALID.
     */
    get_current() {
        return this.liveFunc._current;
    }

    get_currentTransition() {
        return this.liveFunc._currentTransition;
    }

    set_currentTransition(newval) {
        this.liveFunc.set_currentTransition(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the loop current at device start up. Remember to call the matching
     * module saveToFlash() method, otherwise this call has no effect.
     *
     * @param newval : a floating point number corresponding to the loop current at device start up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentAtStartUp(newval) {
        this.liveFunc.set_currentAtStartUp(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current in the loop at device startup, in mA.
     *
     * @return a floating point number corresponding to the current in the loop at device startup, in mA
     *
     * On failure, throws an exception or returns Y_CURRENTATSTARTUP_INVALID.
     */
    get_currentAtStartUp() {
        return this.liveFunc._currentAtStartUp;
    }

    /**
     * Returns the loop powerstate.  POWEROK: the loop
     * is powered. NOPWR: the loop in not powered. LOWPWR: the loop is not
     * powered enough to maintain the current required (insufficient voltage).
     *
     * @return a value among Y_LOOPPOWER_NOPWR, Y_LOOPPOWER_LOWPWR and Y_LOOPPOWER_POWEROK corresponding
     * to the loop powerstate
     *
     * On failure, throws an exception or returns Y_LOOPPOWER_INVALID.
     */
    get_loopPower() {
        return this.liveFunc._loopPower;
    }

    /**
     * Performs a smooth transistion of current flowing in the loop. Any current explicit
     * change cancels any ongoing transition process.
     *
     * @param mA_target   : new current value at the end of the transition
     *         (floating-point number, representing the transition duration in mA)
     * @param ms_duration : total duration of the transition, in milliseconds
     *
     * @return YAPI_SUCCESS when the call succeeds.
     */
    currentMove(mA_target, ms_duration) {
        this.liveFunc.currentMove(mA_target, ms_duration);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YCurrentLoopOutput accessors declaration)
}

exports.YCurrentLoopOutputProxy = YCurrentLoopOutputProxy; //--- (CurrentLoopOutput functions)

/**
 * Retrieves a 4-20mA output for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the 4-20mA output is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCurrentLoopOutput.isOnline() to test if the 4-20mA output is
 * indeed online at a given time. In case of ambiguity when looking for
 * a 4-20mA output by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the 4-20mA output
 *
 * @return {YCurrentLoopOutput} a YCurrentLoopOutput object allowing you to drive the 4-20mA output.
 */

function yFindCurrentLoopOutput(func) {
    return YCurrentLoopOutput.FindCurrentLoopOutput(func);
}

/**
 * Starts the enumeration of 4-20mA outputs currently accessible.
 * Use the method YCurrentLoopOutput.nextCurrentLoopOutput() to iterate on
 * next 4-20mA outputs.
 *
 * @return {YCurrentLoopOutput} a pointer to a YCurrentLoopOutput object, corresponding to
 *         the first 4-20mA output currently online, or a null pointer
 *         if there are none.
 */
function yFirstCurrentLoopOutput() {
    return YCurrentLoopOutput.FirstCurrentLoopOutput();
}

//--- (end of CurrentLoopOutput functions)
