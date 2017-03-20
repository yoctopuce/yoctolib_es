/*********************************************************************
 *
 * $Id: pic24config.php 26780 2017-03-16 14:02:09Z mvuilleu $
 *
 * Implements the high-level API for MultiAxisController functions
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
exports.YMultiAxisControllerProxy = exports.YMultiAxisController = exports.Y_COMMAND_INVALID = exports.Y_NAXIS_INVALID = exports.Y_GLOBALSTATE_INVALID = exports.Y_GLOBALSTATE_BATCH = exports.Y_GLOBALSTATE_RUN = exports.Y_GLOBALSTATE_STOP = exports.Y_GLOBALSTATE_HI_Z = exports.Y_GLOBALSTATE_ALERT = exports.Y_GLOBALSTATE_ABSENT = undefined;
exports.yFindMultiAxisController = yFindMultiAxisController;
exports.yFirstMultiAxisController = yFirstMultiAxisController;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YMultiAxisController return codes)
//--- (end of YMultiAxisController return codes)
//--- (YMultiAxisController definitions)
var Y_GLOBALSTATE_ABSENT = exports.Y_GLOBALSTATE_ABSENT = 0;
var Y_GLOBALSTATE_ALERT = exports.Y_GLOBALSTATE_ALERT = 1;
var Y_GLOBALSTATE_HI_Z = exports.Y_GLOBALSTATE_HI_Z = 2;
var Y_GLOBALSTATE_STOP = exports.Y_GLOBALSTATE_STOP = 3;
var Y_GLOBALSTATE_RUN = exports.Y_GLOBALSTATE_RUN = 4;
var Y_GLOBALSTATE_BATCH = exports.Y_GLOBALSTATE_BATCH = 5;
var Y_GLOBALSTATE_INVALID = exports.Y_GLOBALSTATE_INVALID = -1;
var Y_NAXIS_INVALID = exports.Y_NAXIS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YMultiAxisController definitions)

//--- (YMultiAxisController class start)
/**
 * YMultiAxisController Class: MultiAxisController function interface
 *
 * The Yoctopuce application programming interface allows you to drive a stepper motor.
 */
//--- (end of YMultiAxisController class start)

class YMultiAxisController extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YMultiAxisController constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'MultiAxisController';
        /** @member {number} **/
        this._nAxis = Y_NAXIS_INVALID;
        /** @member {number} **/
        this._globalState = Y_GLOBALSTATE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            NAXIS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            GLOBALSTATE_ABSENT: 0,
            GLOBALSTATE_ALERT: 1,
            GLOBALSTATE_HI_Z: 2,
            GLOBALSTATE_STOP: 3,
            GLOBALSTATE_RUN: 4,
            GLOBALSTATE_BATCH: 5,
            GLOBALSTATE_INVALID: -1,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YMultiAxisController constructor)
    }

    //--- (YMultiAxisController implementation)

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
            var res = new YMultiAxisControllerProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'nAxis':
                this._nAxis = parseInt(val);
                return 1;
            case 'globalState':
                this._globalState = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of synchronized controllers.
     *
     * @return {number} an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns YMultiAxisController.NAXIS_INVALID.
     */
    get_nAxis() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_NAXIS_INVALID;
                }
            }
            res = _this2._nAxis;
            return res;
        })();
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval {number} : an integer corresponding to the number of synchronized controllers
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nAxis(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('nAxis', rest_val);
        })();
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return {number} a value among YMultiAxisController.GLOBALSTATE_ABSENT,
     * YMultiAxisController.GLOBALSTATE_ALERT, YMultiAxisController.GLOBALSTATE_HI_Z,
     * YMultiAxisController.GLOBALSTATE_STOP, YMultiAxisController.GLOBALSTATE_RUN and
     * YMultiAxisController.GLOBALSTATE_BATCH corresponding to the stepper motor set overall state
     *
     * On failure, throws an exception or returns YMultiAxisController.GLOBALSTATE_INVALID.
     */
    get_globalState() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_GLOBALSTATE_INVALID;
                }
            }
            res = _this4._globalState;
            return res;
        })();
    }

    get_command() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            res = _this5._command;
            return res;
        })();
    }

    set_command(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this6._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a multi-axis controller for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the multi-axis controller
     *
     * @return {YMultiAxisController} a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisController(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('MultiAxisController', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a multi-axis controller for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the multi-axis controller is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
     * indeed online at a given time. In case of ambiguity when looking for
     * a multi-axis controller by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the multi-axis controller
     *
     * @return {YMultiAxisController} a YMultiAxisController object allowing you to drive the multi-axis controller.
     */
    static FindMultiAxisControllerInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'MultiAxisController', func);
        if (obj == null) {
            obj = new YMultiAxisController(yctx, func);
            _yocto_api.YFunction._AddToCache('MultiAxisController', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            return yield _this7.set_command(command);
        })();
    }

    /**
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            return yield _this8.sendCommand('Z');
        })();
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed {number[]} : desired speed for all axis, in steps per second.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let cmd;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let ndim;
            ndim = speed.length;
            cmd = 'H' + String(Math.round(Math.round(1000 * speed[0])));
            i = 1;
            while (i + 1 < ndim) {
                cmd = cmd + ',' + String(Math.round(Math.round(1000 * speed[i])));
                i = i + 1;
            }
            return yield _this9.sendCommand(cmd);
        })();
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos {number[]} : absolute position, measured in steps from each origin.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let cmd;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let ndim;
            ndim = absPos.length;
            cmd = 'M' + String(Math.round(Math.round(16 * absPos[0])));
            i = 1;
            while (i + 1 < ndim) {
                cmd = cmd + ',' + String(Math.round(Math.round(16 * absPos[i])));
                i = i + 1;
            }
            return yield _this10.sendCommand(cmd);
        })();
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos {number[]} : relative position, measured in steps from the current position.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let cmd;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let ndim;
            ndim = relPos.length;
            cmd = 'm' + String(Math.round(Math.round(16 * relPos[0])));
            i = 1;
            while (i + 1 < ndim) {
                cmd = cmd + ',' + String(Math.round(Math.round(16 * relPos[i])));
                i = i + 1;
            }
            return yield _this11.sendCommand(cmd);
        })();
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs {number} : wait time, specified in milliseconds.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return yield _this12.sendCommand('_' + String(Math.round(waitMs)));
        })();
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.sendCommand('!');
        })();
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            return yield _this14.sendCommand('B');
        })();
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            return yield _this15.sendCommand('z');
        })();
    }

    /**
     * Continues the enumeration of multi-axis controllers started using yFirstMultiAxisController().
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         a multi-axis controller currently online, or a null pointer
     *         if there are no more multi-axis controllers to enumerate.
     */
    nextMultiAxisController() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisController() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('MultiAxisController');
        if (next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisController(next_hwid);
    }

    /**
     * Starts the enumeration of multi-axis controllers currently accessible.
     * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
     * next multi-axis controllers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
     *         the first multi-axis controller currently online, or a null pointer
     *         if there are none.
     */
    static FirstMultiAxisControllerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MultiAxisController');
        if (next_hwid == null) return null;
        return YMultiAxisController.FindMultiAxisControllerInContext(yctx, next_hwid);
    }

    //--- (end of YMultiAxisController implementation)
}

exports.YMultiAxisController = YMultiAxisController; //
// YMultiAxisControllerProxy Class: synchronous proxy to YMultiAxisController objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMultiAxisController objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YMultiAxisControllerProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YMultiAxisController accessors declaration)

    /**
     * Returns the number of synchronized controllers.
     *
     * @return an integer corresponding to the number of synchronized controllers
     *
     * On failure, throws an exception or returns Y_NAXIS_INVALID.
     */
    get_nAxis() {
        return this.liveFunc._nAxis;
    }

    /**
     * Changes the number of synchronized controllers.
     *
     * @param newval : an integer corresponding to the number of synchronized controllers
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nAxis(newval) {
        this.liveFunc.set_nAxis(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the stepper motor set overall state.
     *
     * @return a value among Y_GLOBALSTATE_ABSENT, Y_GLOBALSTATE_ALERT, Y_GLOBALSTATE_HI_Z,
     * Y_GLOBALSTATE_STOP, Y_GLOBALSTATE_RUN and Y_GLOBALSTATE_BATCH corresponding to the stepper motor
     * set overall state
     *
     * On failure, throws an exception or returns Y_GLOBALSTATE_INVALID.
     */
    get_globalState() {
        return this.liveFunc._globalState;
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
     * Reinitialize all controllers and clear all alert flags.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    reset() {
        this.liveFunc.reset();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts all motors backward at the specified speeds, to search for the motor home position.
     *
     * @param speed : desired speed for all axis, in steps per second.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    findHomePosition(speed) {
        this.liveFunc.findHomePosition(speed);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts all motors synchronously to reach a given absolute position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param absPos : absolute position, measured in steps from each origin.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveTo(absPos) {
        this.liveFunc.moveTo(absPos);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Starts all motors synchronously to reach a given relative position.
     * The time needed to reach the requested position will depend on the lowest
     * acceleration and max speed parameters configured for all motors.
     * The final position will be reached on all axis at the same time.
     *
     * @param relPos : relative position, measured in steps from the current position.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    moveRel(relPos) {
        this.liveFunc.moveRel(relPos);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Keep the motor in the same state for the specified amount of time, before processing next command.
     *
     * @param waitMs : wait time, specified in milliseconds.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    pause(waitMs) {
        this.liveFunc.pause(waitMs);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops the motor with an emergency alert, without taking any additional precaution.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    emergencyStop() {
        this.liveFunc.emergencyStop();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Stops the motor smoothly as soon as possible, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndBrake() {
        this.liveFunc.abortAndBrake();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Turn the controller into Hi-Z mode immediately, without waiting for ongoing move completion.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    abortAndHiZ() {
        this.liveFunc.abortAndHiZ();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YMultiAxisController accessors declaration)
}

exports.YMultiAxisControllerProxy = YMultiAxisControllerProxy; //--- (MultiAxisController functions)

/**
 * Retrieves a multi-axis controller for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the multi-axis controller is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMultiAxisController.isOnline() to test if the multi-axis controller is
 * indeed online at a given time. In case of ambiguity when looking for
 * a multi-axis controller by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the multi-axis controller
 *
 * @return {YMultiAxisController} a YMultiAxisController object allowing you to drive the multi-axis controller.
 */

function yFindMultiAxisController(func) {
    return YMultiAxisController.FindMultiAxisController(func);
}

/**
 * Starts the enumeration of multi-axis controllers currently accessible.
 * Use the method YMultiAxisController.nextMultiAxisController() to iterate on
 * next multi-axis controllers.
 *
 * @return {YMultiAxisController} a pointer to a YMultiAxisController object, corresponding to
 *         the first multi-axis controller currently online, or a null pointer
 *         if there are none.
 */
function yFirstMultiAxisController() {
    return YMultiAxisController.FirstMultiAxisController();
}

//--- (end of MultiAxisController functions)
