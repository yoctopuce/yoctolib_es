/*********************************************************************
 *
 * $Id: pic24config.php 26780 2017-03-16 14:02:09Z mvuilleu $
 *
 * Implements the high-level API for BridgeControl functions
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
exports.YBridgeControlProxy = exports.YBridgeControl = exports.Y_ADGAIN_INVALID = exports.Y_ADVALUE_INVALID = exports.Y_BRIDGELATENCY_INVALID = exports.Y_EXCITATIONMODE_INVALID = exports.Y_EXCITATIONMODE_EXTERNAL_DC = exports.Y_EXCITATIONMODE_INTERNAL_DC = exports.Y_EXCITATIONMODE_INTERNAL_AC = undefined;
exports.yFindBridgeControl = yFindBridgeControl;
exports.yFirstBridgeControl = yFirstBridgeControl;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YBridgeControl return codes)
//--- (end of YBridgeControl return codes)
//--- (YBridgeControl definitions)
var Y_EXCITATIONMODE_INTERNAL_AC = exports.Y_EXCITATIONMODE_INTERNAL_AC = 0;
var Y_EXCITATIONMODE_INTERNAL_DC = exports.Y_EXCITATIONMODE_INTERNAL_DC = 1;
var Y_EXCITATIONMODE_EXTERNAL_DC = exports.Y_EXCITATIONMODE_EXTERNAL_DC = 2;
var Y_EXCITATIONMODE_INVALID = exports.Y_EXCITATIONMODE_INVALID = -1;
var Y_BRIDGELATENCY_INVALID = exports.Y_BRIDGELATENCY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_ADVALUE_INVALID = exports.Y_ADVALUE_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_ADGAIN_INVALID = exports.Y_ADGAIN_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YBridgeControl definitions)

//--- (YBridgeControl class start)
/**
 * YBridgeControl Class: BridgeControl function interface
 *
 * The Yoctopuce class YBridgeControl allows you to control bridge excitation parameters
 * and measure parameters for a Wheatstone bridge sensor. To read the measurements, it
 * is best to use the GenericSensor calss, which will compute the measured value
 * in the optimal way.
 */
//--- (end of YBridgeControl class start)

class YBridgeControl extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YBridgeControl constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'BridgeControl';
        /** @member {number} **/
        this._excitationMode = Y_EXCITATIONMODE_INVALID;
        /** @member {number} **/
        this._bridgeLatency = Y_BRIDGELATENCY_INVALID;
        /** @member {number} **/
        this._adValue = Y_ADVALUE_INVALID;
        /** @member {number} **/
        this._adGain = Y_ADGAIN_INVALID;
        this.imm_setConst({
            EXCITATIONMODE_INTERNAL_AC: 0,
            EXCITATIONMODE_INTERNAL_DC: 1,
            EXCITATIONMODE_EXTERNAL_DC: 2,
            EXCITATIONMODE_INVALID: -1,
            BRIDGELATENCY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ADVALUE_INVALID: _yocto_api.YAPI.INVALID_INT,
            ADGAIN_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YBridgeControl constructor)
    }

    //--- (YBridgeControl implementation)

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
            var res = new YBridgeControlProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'excitationMode':
                this._excitationMode = parseInt(val);
                return 1;
            case 'bridgeLatency':
                this._bridgeLatency = parseInt(val);
                return 1;
            case 'adValue':
                this._adValue = parseInt(val);
                return 1;
            case 'adGain':
                this._adGain = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return {number} a value among YBridgeControl.EXCITATIONMODE_INTERNAL_AC,
     * YBridgeControl.EXCITATIONMODE_INTERNAL_DC and YBridgeControl.EXCITATIONMODE_EXTERNAL_DC
     * corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns YBridgeControl.EXCITATIONMODE_INVALID.
     */
    get_excitationMode() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_EXCITATIONMODE_INVALID;
                }
            }
            res = _this2._excitationMode;
            return res;
        })();
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval {number} : a value among YBridgeControl.EXCITATIONMODE_INTERNAL_AC,
     * YBridgeControl.EXCITATIONMODE_INTERNAL_DC and YBridgeControl.EXCITATIONMODE_EXTERNAL_DC
     * corresponding to the current Wheatstone bridge excitation method
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_excitationMode(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('excitationMode', rest_val);
        })();
    }

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return {number} an integer corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns YBridgeControl.BRIDGELATENCY_INVALID.
     */
    get_bridgeLatency() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_BRIDGELATENCY_INVALID;
                }
            }
            res = _this4._bridgeLatency;
            return res;
        })();
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval {number} : an integer corresponding to the current Wheatstone bridge excitation method
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bridgeLatency(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('bridgeLatency', rest_val);
        })();
    }

    /**
     * Returns the raw value returned by the ratiometric A/D converter
     * during last read.
     *
     * @return {number} an integer corresponding to the raw value returned by the ratiometric A/D converter
     *         during last read
     *
     * On failure, throws an exception or returns YBridgeControl.ADVALUE_INVALID.
     */
    get_adValue() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_ADVALUE_INVALID;
                }
            }
            res = _this6._adValue;
            return res;
        })();
    }

    /**
     * Returns the current ratiometric A/D converter gain. The gain is automatically
     * configured according to the signalRange set in the corresponding genericSensor.
     *
     * @return {number} an integer corresponding to the current ratiometric A/D converter gain
     *
     * On failure, throws an exception or returns YBridgeControl.ADGAIN_INVALID.
     */
    get_adGain() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_ADGAIN_INVALID;
                }
            }
            res = _this7._adGain;
            return res;
        })();
    }

    /**
     * Retrieves a Wheatstone bridge controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Wheatstone bridge controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBridgeControl.isOnline() to test if the Wheatstone bridge controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Wheatstone bridge controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the Wheatstone bridge controller
     *
     * @return {YBridgeControl} a YBridgeControl object allowing you to drive the Wheatstone bridge controller.
     */
    static FindBridgeControl(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('BridgeControl', func);
        if (obj == null) {
            obj = new YBridgeControl(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('BridgeControl', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a Wheatstone bridge controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Wheatstone bridge controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YBridgeControl.isOnline() to test if the Wheatstone bridge controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Wheatstone bridge controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the Wheatstone bridge controller
     *
     * @return {YBridgeControl} a YBridgeControl object allowing you to drive the Wheatstone bridge controller.
     */
    static FindBridgeControlInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'BridgeControl', func);
        if (obj == null) {
            obj = new YBridgeControl(yctx, func);
            _yocto_api.YFunction._AddToCache('BridgeControl', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Wheatstone bridge controllers started using yFirstBridgeControl().
     *
     * @return {YBridgeControl} a pointer to a YBridgeControl object, corresponding to
     *         a Wheatstone bridge controller currently online, or a null pointer
     *         if there are no more Wheatstone bridge controllers to enumerate.
     */
    nextBridgeControl() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YBridgeControl.FindBridgeControlInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Wheatstone bridge controllers currently accessible.
     * Use the method YBridgeControl.nextBridgeControl() to iterate on
     * next Wheatstone bridge controllers.
     *
     * @return {YBridgeControl} a pointer to a YBridgeControl object, corresponding to
     *         the first Wheatstone bridge controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstBridgeControl() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('BridgeControl');
        if (next_hwid == null) return null;
        return YBridgeControl.FindBridgeControl(next_hwid);
    }

    /**
     * Starts the enumeration of Wheatstone bridge controllers currently accessible.
     * Use the method YBridgeControl.nextBridgeControl() to iterate on
     * next Wheatstone bridge controllers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YBridgeControl} a pointer to a YBridgeControl object, corresponding to
     *         the first Wheatstone bridge controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstBridgeControlInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('BridgeControl');
        if (next_hwid == null) return null;
        return YBridgeControl.FindBridgeControlInContext(yctx, next_hwid);
    }

    //--- (end of YBridgeControl implementation)
}

exports.YBridgeControl = YBridgeControl; //
// YBridgeControlProxy Class: synchronous proxy to YBridgeControl objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YBridgeControl objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YBridgeControlProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YBridgeControl accessors declaration)

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return a value among Y_EXCITATIONMODE_INTERNAL_AC, Y_EXCITATIONMODE_INTERNAL_DC and
     * Y_EXCITATIONMODE_EXTERNAL_DC corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns Y_EXCITATIONMODE_INVALID.
     */
    get_excitationMode() {
        return this.liveFunc._excitationMode;
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval : a value among Y_EXCITATIONMODE_INTERNAL_AC, Y_EXCITATIONMODE_INTERNAL_DC and
     * Y_EXCITATIONMODE_EXTERNAL_DC corresponding to the current Wheatstone bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_excitationMode(newval) {
        this.liveFunc.set_excitationMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current Wheatstone bridge excitation method.
     *
     * @return an integer corresponding to the current Wheatstone bridge excitation method
     *
     * On failure, throws an exception or returns Y_BRIDGELATENCY_INVALID.
     */
    get_bridgeLatency() {
        return this.liveFunc._bridgeLatency;
    }

    /**
     * Changes the current Wheatstone bridge excitation method.
     *
     * @param newval : an integer corresponding to the current Wheatstone bridge excitation method
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bridgeLatency(newval) {
        this.liveFunc.set_bridgeLatency(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the raw value returned by the ratiometric A/D converter
     * during last read.
     *
     * @return an integer corresponding to the raw value returned by the ratiometric A/D converter
     *         during last read
     *
     * On failure, throws an exception or returns Y_ADVALUE_INVALID.
     */
    get_adValue() {
        return this.liveFunc._adValue;
    }

    /**
     * Returns the current ratiometric A/D converter gain. The gain is automatically
     * configured according to the signalRange set in the corresponding genericSensor.
     *
     * @return an integer corresponding to the current ratiometric A/D converter gain
     *
     * On failure, throws an exception or returns Y_ADGAIN_INVALID.
     */
    get_adGain() {
        return this.liveFunc._adGain;
    }
    //--- (end of YBridgeControl accessors declaration)
}

exports.YBridgeControlProxy = YBridgeControlProxy; //--- (BridgeControl functions)

/**
 * Retrieves a Wheatstone bridge controller for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the Wheatstone bridge controller is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YBridgeControl.isOnline() to test if the Wheatstone bridge controller is
 * indeed online at a given time. In case of ambiguity when looking for
 * a Wheatstone bridge controller by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the Wheatstone bridge controller
 *
 * @return {YBridgeControl} a YBridgeControl object allowing you to drive the Wheatstone bridge controller.
 */

function yFindBridgeControl(func) {
    return YBridgeControl.FindBridgeControl(func);
}

/**
 * Starts the enumeration of Wheatstone bridge controllers currently accessible.
 * Use the method YBridgeControl.nextBridgeControl() to iterate on
 * next Wheatstone bridge controllers.
 *
 * @return {YBridgeControl} a pointer to a YBridgeControl object, corresponding to
 *         the first Wheatstone bridge controller currently online, or a null pointer
 *         if there are none.
 */
function yFirstBridgeControl() {
    return YBridgeControl.FirstBridgeControl();
}

//--- (end of BridgeControl functions)
