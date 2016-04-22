/*********************************************************************
 *
 * $Id: yocto_hubport.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for HubPort functions
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
exports.YHubPortProxy = exports.YHubPort = exports.Y_BAUDRATE_INVALID = exports.Y_PORTSTATE_INVALID = exports.Y_PORTSTATE_PROG = exports.Y_PORTSTATE_RUN = exports.Y_PORTSTATE_ON = exports.Y_PORTSTATE_OVRLD = exports.Y_PORTSTATE_OFF = exports.Y_ENABLED_INVALID = exports.Y_ENABLED_TRUE = exports.Y_ENABLED_FALSE = undefined;
exports.yFindHubPort = yFindHubPort;
exports.yFirstHubPort = yFirstHubPort;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YHubPort return codes)
//--- (end of YHubPort return codes)
//--- (YHubPort definitions)
var Y_ENABLED_FALSE = exports.Y_ENABLED_FALSE = 0;
var Y_ENABLED_TRUE = exports.Y_ENABLED_TRUE = 1;
var Y_ENABLED_INVALID = exports.Y_ENABLED_INVALID = -1;
var Y_PORTSTATE_OFF = exports.Y_PORTSTATE_OFF = 0;
var Y_PORTSTATE_OVRLD = exports.Y_PORTSTATE_OVRLD = 1;
var Y_PORTSTATE_ON = exports.Y_PORTSTATE_ON = 2;
var Y_PORTSTATE_RUN = exports.Y_PORTSTATE_RUN = 3;
var Y_PORTSTATE_PROG = exports.Y_PORTSTATE_PROG = 4;
var Y_PORTSTATE_INVALID = exports.Y_PORTSTATE_INVALID = -1;
var Y_BAUDRATE_INVALID = exports.Y_BAUDRATE_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YHubPort definitions)

//--- (YHubPort class start)
/**
 * YHubPort Class: Yocto-hub port interface
 *
 * YHubPort objects provide control over the power supply for every
 * YoctoHub port and provide information about the device connected to it.
 * The logical name of a YHubPort is always automatically set to the
 * unique serial number of the Yoctopuce device connected to it.
 */
//--- (end of YHubPort class start)

class YHubPort extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YHubPort constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'HubPort';
        /** @member {number} **/
        this._enabled = Y_ENABLED_INVALID;
        /** @member {number} **/
        this._portState = Y_PORTSTATE_INVALID;
        /** @member {number} **/
        this._baudRate = Y_BAUDRATE_INVALID;
        this.imm_setConst({
            ENABLED_FALSE: 0,
            ENABLED_TRUE: 1,
            ENABLED_INVALID: -1,
            PORTSTATE_OFF: 0,
            PORTSTATE_OVRLD: 1,
            PORTSTATE_ON: 2,
            PORTSTATE_RUN: 3,
            PORTSTATE_PROG: 4,
            PORTSTATE_INVALID: -1,
            BAUDRATE_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YHubPort constructor)
    }

    //--- (YHubPort implementation)

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
            var res = new YHubPortProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'enabled':
                this._enabled = parseInt(val);
                return 1;
            case 'portState':
                this._portState = parseInt(val);
                return 1;
            case 'baudRate':
                this._baudRate = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns true if the Yocto-hub port is powered, false otherwise.
     *
     * @return {number} either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to true if the
     * Yocto-hub port is powered, false otherwise
     *
     * On failure, throws an exception or returns YHubPort.ENABLED_INVALID.
     */
    get_enabled() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_ENABLED_INVALID;
                }
            }
            return _this2._enabled;
        })();
    }

    /**
     * Changes the activation of the Yocto-hub port. If the port is enabled, the
     * connected module is powered. Otherwise, port power is shut down.
     *
     * @param newval {number} : either YHubPort.ENABLED_FALSE or YHubPort.ENABLED_TRUE, according to the
     * activation of the Yocto-hub port
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('enabled', rest_val);
        })();
    }

    /**
     * Returns the current state of the Yocto-hub port.
     *
     * @return {number} a value among YHubPort.PORTSTATE_OFF, YHubPort.PORTSTATE_OVRLD,
     * YHubPort.PORTSTATE_ON, YHubPort.PORTSTATE_RUN and YHubPort.PORTSTATE_PROG corresponding to the
     * current state of the Yocto-hub port
     *
     * On failure, throws an exception or returns YHubPort.PORTSTATE_INVALID.
     */
    get_portState() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_PORTSTATE_INVALID;
                }
            }
            return _this4._portState;
        })();
    }

    /**
     * Returns the current baud rate used by this Yocto-hub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @return {number} an integer corresponding to the current baud rate used by this Yocto-hub port, in kbps
     *
     * On failure, throws an exception or returns YHubPort.BAUDRATE_INVALID.
     */
    get_baudRate() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_BAUDRATE_INVALID;
                }
            }
            return _this5._baudRate;
        })();
    }

    /**
     * Retrieves a Yocto-hub port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Yocto-hub port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the Yocto-hub port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Yocto-hub port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the Yocto-hub port
     *
     * @return {YHubPort} a YHubPort object allowing you to drive the Yocto-hub port.
     */
    static FindHubPort(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('HubPort', func);
        if (obj == null) {
            obj = new YHubPort(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('HubPort', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a Yocto-hub port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the Yocto-hub port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YHubPort.isOnline() to test if the Yocto-hub port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a Yocto-hub port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the Yocto-hub port
     *
     * @return {YHubPort} a YHubPort object allowing you to drive the Yocto-hub port.
     */
    static FindHubPortInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'HubPort', func);
        if (obj == null) {
            obj = new YHubPort(yctx, func);
            _yocto_api.YFunction._AddToCache('HubPort', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of Yocto-hub ports started using yFirstHubPort().
     *
     * @return {YHubPort} a pointer to a YHubPort object, corresponding to
     *         a Yocto-hub port currently online, or a null pointer
     *         if there are no more Yocto-hub ports to enumerate.
     */
    nextHubPort() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YHubPort.FindHubPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of Yocto-hub ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next Yocto-hub ports.
     *
     * @return {YHubPort} a pointer to a YHubPort object, corresponding to
     *         the first Yocto-hub port currently online, or a null pointer
     *         if there are none.
     */
    static FirstHubPort() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('HubPort');
        if (next_hwid == null) return null;
        return YHubPort.FindHubPort(next_hwid);
    }

    /**
     * Starts the enumeration of Yocto-hub ports currently accessible.
     * Use the method YHubPort.nextHubPort() to iterate on
     * next Yocto-hub ports.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YHubPort} a pointer to a YHubPort object, corresponding to
     *         the first Yocto-hub port currently online, or a null pointer
     *         if there are none.
     */
    static FirstHubPortInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('HubPort');
        if (next_hwid == null) return null;
        return YHubPort.FindHubPortInContext(yctx, next_hwid);
    }

    //--- (end of YHubPort implementation)
}

exports.YHubPort = YHubPort; //
// YHubPortProxy Class: synchronous proxy to YHubPort objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YHubPort objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YHubPortProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YHubPort accessors declaration)

    /**
     * Returns true if the Yocto-hub port is powered, false otherwise.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to true if the Yocto-hub port is
     * powered, false otherwise
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled() {
        return this.liveFunc._enabled;
    }

    /**
     * Changes the activation of the Yocto-hub port. If the port is enabled, the
     * connected module is powered. Otherwise, port power is shut down.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the activation of the Yocto-hub port
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
     * Returns the current state of the Yocto-hub port.
     *
     * @return a value among Y_PORTSTATE_OFF, Y_PORTSTATE_OVRLD, Y_PORTSTATE_ON, Y_PORTSTATE_RUN and
     * Y_PORTSTATE_PROG corresponding to the current state of the Yocto-hub port
     *
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    get_portState() {
        return this.liveFunc._portState;
    }

    /**
     * Returns the current baud rate used by this Yocto-hub port, in kbps.
     * The default value is 1000 kbps, but a slower rate may be used if communication
     * problems are encountered.
     *
     * @return an integer corresponding to the current baud rate used by this Yocto-hub port, in kbps
     *
     * On failure, throws an exception or returns Y_BAUDRATE_INVALID.
     */
    get_baudRate() {
        return this.liveFunc._baudRate;
    }
    //--- (end of YHubPort accessors declaration)
}

exports.YHubPortProxy = YHubPortProxy; //--- (HubPort functions)

/**
 * Retrieves a Yocto-hub port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the Yocto-hub port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YHubPort.isOnline() to test if the Yocto-hub port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a Yocto-hub port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the Yocto-hub port
 *
 * @return {YHubPort} a YHubPort object allowing you to drive the Yocto-hub port.
 */

function yFindHubPort(func) {
    return YHubPort.FindHubPort(func);
}

/**
 * Starts the enumeration of Yocto-hub ports currently accessible.
 * Use the method YHubPort.nextHubPort() to iterate on
 * next Yocto-hub ports.
 *
 * @return {YHubPort} a pointer to a YHubPort object, corresponding to
 *         the first Yocto-hub port currently online, or a null pointer
 *         if there are none.
 */
function yFirstHubPort() {
    return YHubPort.FirstHubPort();
}

//--- (end of HubPort functions)
