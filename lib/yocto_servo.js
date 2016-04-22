/*********************************************************************
 *
 * $Id: yocto_servo.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Servo functions
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
exports.YServoProxy = exports.YServo = exports.Y_POSITIONATPOWERON_INVALID = exports.Y_MOVE_INVALID = exports.Y_NEUTRAL_INVALID = exports.Y_RANGE_INVALID = exports.Y_POSITION_INVALID = exports.Y_ENABLEDATPOWERON_INVALID = exports.Y_ENABLEDATPOWERON_TRUE = exports.Y_ENABLEDATPOWERON_FALSE = exports.Y_ENABLED_INVALID = exports.Y_ENABLED_TRUE = exports.Y_ENABLED_FALSE = undefined;
exports.yFindServo = yFindServo;
exports.yFirstServo = yFirstServo;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YServo return codes)
//--- (end of YServo return codes)
//--- (YServo definitions)
var Y_ENABLED_FALSE = exports.Y_ENABLED_FALSE = 0;
var Y_ENABLED_TRUE = exports.Y_ENABLED_TRUE = 1;
var Y_ENABLED_INVALID = exports.Y_ENABLED_INVALID = -1;
var Y_ENABLEDATPOWERON_FALSE = exports.Y_ENABLEDATPOWERON_FALSE = 0;
var Y_ENABLEDATPOWERON_TRUE = exports.Y_ENABLEDATPOWERON_TRUE = 1;
var Y_ENABLEDATPOWERON_INVALID = exports.Y_ENABLEDATPOWERON_INVALID = -1;
var Y_POSITION_INVALID = exports.Y_POSITION_INVALID = _yocto_api.YAPI.INVALID_INT;
var Y_RANGE_INVALID = exports.Y_RANGE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_NEUTRAL_INVALID = exports.Y_NEUTRAL_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_MOVE_INVALID = exports.Y_MOVE_INVALID = null;
var Y_POSITIONATPOWERON_INVALID = exports.Y_POSITIONATPOWERON_INVALID = _yocto_api.YAPI.INVALID_INT;
//--- (end of YServo definitions)

//--- (YServo class start)
/**
 * YServo Class: Servo function interface
 *
 * Yoctopuce application programming interface allows you not only to move
 * a servo to a given position, but also to specify the time interval
 * in which the move should be performed. This makes it possible to
 * synchronize two servos involved in a same move.
 */
//--- (end of YServo class start)

class YServo extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YServo constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Servo';
        /** @member {number} **/
        this._position = Y_POSITION_INVALID;
        /** @member {number} **/
        this._enabled = Y_ENABLED_INVALID;
        /** @member {number} **/
        this._range = Y_RANGE_INVALID;
        /** @member {number} **/
        this._neutral = Y_NEUTRAL_INVALID;
        /** @member {YMove} **/
        this._move = Y_MOVE_INVALID;
        /** @member {number} **/
        this._positionAtPowerOn = Y_POSITIONATPOWERON_INVALID;
        /** @member {number} **/
        this._enabledAtPowerOn = Y_ENABLEDATPOWERON_INVALID;
        this.imm_setConst({
            POSITION_INVALID: _yocto_api.YAPI.INVALID_INT,
            ENABLED_FALSE: 0,
            ENABLED_TRUE: 1,
            ENABLED_INVALID: -1,
            RANGE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            NEUTRAL_INVALID: _yocto_api.YAPI.INVALID_UINT,
            POSITIONATPOWERON_INVALID: _yocto_api.YAPI.INVALID_INT,
            ENABLEDATPOWERON_FALSE: 0,
            ENABLEDATPOWERON_TRUE: 1,
            ENABLEDATPOWERON_INVALID: -1
        });
        //--- (end of YServo constructor)
    }

    //--- (YServo implementation)

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
            var res = new YServoProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'position':
                this._position = parseInt(val);
                return 1;
            case 'enabled':
                this._enabled = parseInt(val);
                return 1;
            case 'range':
                this._range = parseInt(val);
                return 1;
            case 'neutral':
                this._neutral = parseInt(val);
                return 1;
            case 'move':
                this._move = val;
                return 1;
            case 'positionAtPowerOn':
                this._positionAtPowerOn = parseInt(val);
                return 1;
            case 'enabledAtPowerOn':
                this._enabledAtPowerOn = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current servo position.
     *
     * @return {number} an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns YServo.POSITION_INVALID.
     */
    get_position() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_POSITION_INVALID;
                }
            }
            return _this2._position;
        })();
    }

    /**
     * Changes immediately the servo driving position.
     *
     * @param newval {number} : an integer corresponding to immediately the servo driving position
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_position(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('position', rest_val);
        })();
    }

    /**
     * Returns the state of the servos.
     *
     * @return {number} either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE, according to the state of the servos
     *
     * On failure, throws an exception or returns YServo.ENABLED_INVALID.
     */
    get_enabled() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_ENABLED_INVALID;
                }
            }
            return _this4._enabled;
        })();
    }

    /**
     * Stops or starts the servo.
     *
     * @param newval {number} : either YServo.ENABLED_FALSE or YServo.ENABLED_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabled(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('enabled', rest_val);
        })();
    }

    /**
     * Returns the current range of use of the servo.
     *
     * @return {number} an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns YServo.RANGE_INVALID.
     */
    get_range() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_RANGE_INVALID;
                }
            }
            return _this6._range;
        })();
    }

    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer corresponding to the range of use of the servo, specified in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_range(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('range', rest_val);
        })();
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return {number} an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns YServo.NEUTRAL_INVALID.
     */
    get_neutral() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_NEUTRAL_INVALID;
                }
            }
            return _this8._neutral;
        })();
    }

    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer corresponding to the duration of the pulse corresponding to the
     * neutral position of the servo
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_neutral(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('neutral', rest_val);
        })();
    }

    get_move() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_MOVE_INVALID;
                }
            }
            return _this10._move;
        })();
    }

    set_move(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this11._setAttr('move', rest_val);
        })();
    }

    /**
     * Performs a smooth move at constant speed toward a given position.
     *
     * @param target      : new position at the end of the move
     * @param ms_duration {number} : total duration of the move, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    move(target, ms_duration) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(target) + ':' + String(ms_duration);
            return yield _this12._setAttr('move', rest_val);
        })();
    }

    /**
     * Returns the servo position at device power up.
     *
     * @return {number} an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns YServo.POSITIONATPOWERON_INVALID.
     */
    get_positionAtPowerOn() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_POSITIONATPOWERON_INVALID;
                }
            }
            return _this13._positionAtPowerOn;
        })();
    }

    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_positionAtPowerOn(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this14._setAttr('positionAtPowerOn', rest_val);
        })();
    }

    /**
     * Returns the servo signal generator state at power up.
     *
     * @return {number} either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE, according to
     * the servo signal generator state at power up
     *
     * On failure, throws an exception or returns YServo.ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_ENABLEDATPOWERON_INVALID;
                }
            }
            return _this15._enabledAtPowerOn;
        })();
    }

    /**
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : either YServo.ENABLEDATPOWERON_FALSE or YServo.ENABLEDATPOWERON_TRUE
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this16._setAttr('enabledAtPowerOn', rest_val);
        })();
    }

    /**
     * Retrieves a servo for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the servo is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the servo is
     * indeed online at a given time. In case of ambiguity when looking for
     * a servo by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the servo
     *
     * @return {YServo} a YServo object allowing you to drive the servo.
     */
    static FindServo(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Servo', func);
        if (obj == null) {
            obj = new YServo(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Servo', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a servo for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the servo is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YServo.isOnline() to test if the servo is
     * indeed online at a given time. In case of ambiguity when looking for
     * a servo by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the servo
     *
     * @return {YServo} a YServo object allowing you to drive the servo.
     */
    static FindServoInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Servo', func);
        if (obj == null) {
            obj = new YServo(yctx, func);
            _yocto_api.YFunction._AddToCache('Servo', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of servos started using yFirstServo().
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         a servo currently online, or a null pointer
     *         if there are no more servos to enumerate.
     */
    nextServo() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YServo.FindServoInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of servos currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next servos.
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         the first servo currently online, or a null pointer
     *         if there are none.
     */
    static FirstServo() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Servo');
        if (next_hwid == null) return null;
        return YServo.FindServo(next_hwid);
    }

    /**
     * Starts the enumeration of servos currently accessible.
     * Use the method YServo.nextServo() to iterate on
     * next servos.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YServo} a pointer to a YServo object, corresponding to
     *         the first servo currently online, or a null pointer
     *         if there are none.
     */
    static FirstServoInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Servo');
        if (next_hwid == null) return null;
        return YServo.FindServoInContext(yctx, next_hwid);
    }

    //--- (end of YServo implementation)
}

exports.YServo = YServo; //
// YServoProxy Class: synchronous proxy to YServo objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YServo objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YServoProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YServo accessors declaration)

    /**
     * Returns the current servo position.
     *
     * @return an integer corresponding to the current servo position
     *
     * On failure, throws an exception or returns Y_POSITION_INVALID.
     */
    get_position() {
        return this.liveFunc._position;
    }

    /**
     * Changes immediately the servo driving position.
     *
     * @param newval : an integer corresponding to immediately the servo driving position
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_position(newval) {
        this.liveFunc.set_position(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the state of the servos.
     *
     * @return either Y_ENABLED_FALSE or Y_ENABLED_TRUE, according to the state of the servos
     *
     * On failure, throws an exception or returns Y_ENABLED_INVALID.
     */
    get_enabled() {
        return this.liveFunc._enabled;
    }

    /**
     * Stops or starts the servo.
     *
     * @param newval : either Y_ENABLED_FALSE or Y_ENABLED_TRUE
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
     * Returns the current range of use of the servo.
     *
     * @return an integer corresponding to the current range of use of the servo
     *
     * On failure, throws an exception or returns Y_RANGE_INVALID.
     */
    get_range() {
        return this.liveFunc._range;
    }

    /**
     * Changes the range of use of the servo, specified in per cents.
     * A range of 100% corresponds to a standard control signal, that varies
     * from 1 [ms] to 2 [ms], When using a servo that supports a double range,
     * from 0.5 [ms] to 2.5 [ms], you can select a range of 200%.
     * Be aware that using a range higher than what is supported by the servo
     * is likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the range of use of the servo, specified in per cents
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_range(newval) {
        this.liveFunc.set_range(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the duration in microseconds of a neutral pulse for the servo.
     *
     * @return an integer corresponding to the duration in microseconds of a neutral pulse for the servo
     *
     * On failure, throws an exception or returns Y_NEUTRAL_INVALID.
     */
    get_neutral() {
        return this.liveFunc._neutral;
    }

    /**
     * Changes the duration of the pulse corresponding to the neutral position of the servo.
     * The duration is specified in microseconds, and the standard value is 1500 [us].
     * This setting makes it possible to shift the range of use of the servo.
     * Be aware that using a range higher than what is supported by the servo is
     * likely to damage the servo. Remember to call the matching module
     * saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer corresponding to the duration of the pulse corresponding to the neutral
     * position of the servo
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_neutral(newval) {
        this.liveFunc.set_neutral(newval);
        return this._yapi.SUCCESS;
    }

    get_move() {
        return this.liveFunc._move;
    }

    set_move(newval) {
        this.liveFunc.set_move(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the servo position at device power up.
     *
     * @return an integer corresponding to the servo position at device power up
     *
     * On failure, throws an exception or returns Y_POSITIONATPOWERON_INVALID.
     */
    get_positionAtPowerOn() {
        return this.liveFunc._positionAtPowerOn;
    }

    /**
     * Configure the servo position at device power up. Remember to call the matching
     * module saveToFlash() method, otherwise this call will have no effect.
     *
     * @param newval : an integer
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_positionAtPowerOn(newval) {
        this.liveFunc.set_positionAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the servo signal generator state at power up.
     *
     * @return either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE, according to the servo signal
     * generator state at power up
     *
     * On failure, throws an exception or returns Y_ENABLEDATPOWERON_INVALID.
     */
    get_enabledAtPowerOn() {
        return this.liveFunc._enabledAtPowerOn;
    }

    /**
     * Configure the servo signal generator state at power up. Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval : either Y_ENABLEDATPOWERON_FALSE or Y_ENABLEDATPOWERON_TRUE
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enabledAtPowerOn(newval) {
        this.liveFunc.set_enabledAtPowerOn(newval);
        return this._yapi.SUCCESS;
    }
    //--- (end of YServo accessors declaration)
}

exports.YServoProxy = YServoProxy; //--- (Servo functions)

/**
 * Retrieves a servo for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the servo is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YServo.isOnline() to test if the servo is
 * indeed online at a given time. In case of ambiguity when looking for
 * a servo by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the servo
 *
 * @return {YServo} a YServo object allowing you to drive the servo.
 */

function yFindServo(func) {
    return YServo.FindServo(func);
}

/**
 * Starts the enumeration of servos currently accessible.
 * Use the method YServo.nextServo() to iterate on
 * next servos.
 *
 * @return {YServo} a pointer to a YServo object, corresponding to
 *         the first servo currently online, or a null pointer
 *         if there are none.
 */
function yFirstServo() {
    return YServo.FirstServo();
}

//--- (end of Servo functions)
