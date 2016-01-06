/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for WakeUpMonitor functions
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
exports.YWakeUpMonitor = exports.Y_RTCTIME_INVALID = exports.Y_NEXTWAKEUP_INVALID = exports.Y_SLEEPCOUNTDOWN_INVALID = exports.Y_POWERDURATION_INVALID = exports.Y_WAKEUPSTATE_INVALID = exports.Y_WAKEUPSTATE_AWAKE = exports.Y_WAKEUPSTATE_SLEEPING = exports.Y_WAKEUPREASON_INVALID = exports.Y_WAKEUPREASON_SCHEDULE2 = exports.Y_WAKEUPREASON_SCHEDULE1 = exports.Y_WAKEUPREASON_EXTSIG1 = exports.Y_WAKEUPREASON_ENDOFSLEEP = exports.Y_WAKEUPREASON_EXTPOWER = exports.Y_WAKEUPREASON_USBPOWER = undefined;
exports.yFindWakeUpMonitor = yFindWakeUpMonitor;
exports.yFirstWakeUpMonitor = yFirstWakeUpMonitor;

var _yocto_api = require('yoctolib-es/yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YWakeUpMonitor return codes)
//--- (end of YWakeUpMonitor return codes)
//--- (YWakeUpMonitor definitions)
const Y_WAKEUPREASON_USBPOWER = exports.Y_WAKEUPREASON_USBPOWER = 0;
const Y_WAKEUPREASON_EXTPOWER = exports.Y_WAKEUPREASON_EXTPOWER = 1;
const Y_WAKEUPREASON_ENDOFSLEEP = exports.Y_WAKEUPREASON_ENDOFSLEEP = 2;
const Y_WAKEUPREASON_EXTSIG1 = exports.Y_WAKEUPREASON_EXTSIG1 = 3;
const Y_WAKEUPREASON_SCHEDULE1 = exports.Y_WAKEUPREASON_SCHEDULE1 = 4;
const Y_WAKEUPREASON_SCHEDULE2 = exports.Y_WAKEUPREASON_SCHEDULE2 = 5;
const Y_WAKEUPREASON_INVALID = exports.Y_WAKEUPREASON_INVALID = -1;
const Y_WAKEUPSTATE_SLEEPING = exports.Y_WAKEUPSTATE_SLEEPING = 0;
const Y_WAKEUPSTATE_AWAKE = exports.Y_WAKEUPSTATE_AWAKE = 1;
const Y_WAKEUPSTATE_INVALID = exports.Y_WAKEUPSTATE_INVALID = -1;
const Y_POWERDURATION_INVALID = exports.Y_POWERDURATION_INVALID = _yocto_api.YAPI.INVALID_INT;
const Y_SLEEPCOUNTDOWN_INVALID = exports.Y_SLEEPCOUNTDOWN_INVALID = _yocto_api.YAPI.INVALID_INT;
const Y_NEXTWAKEUP_INVALID = exports.Y_NEXTWAKEUP_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_RTCTIME_INVALID = exports.Y_RTCTIME_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YWakeUpMonitor definitions)

//--- (YWakeUpMonitor class start)
/**
 * YWakeUpMonitor Class: WakeUpMonitor function interface
 *
 * The WakeUpMonitor function handles globally all wake-up sources, as well
 * as automated sleep mode.
 */
//--- (end of YWakeUpMonitor class start)

class YWakeUpMonitor extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YWakeUpMonitor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'WakeUpMonitor';
        /** @member {number} **/
        this._powerDuration = Y_POWERDURATION_INVALID;
        /** @member {number} **/
        this._sleepCountdown = Y_SLEEPCOUNTDOWN_INVALID;
        /** @member {number} **/
        this._nextWakeUp = Y_NEXTWAKEUP_INVALID;
        /** @member {number} **/
        this._wakeUpReason = Y_WAKEUPREASON_INVALID;
        /** @member {number} **/
        this._wakeUpState = Y_WAKEUPSTATE_INVALID;
        /** @member {number} **/
        this._rtcTime = Y_RTCTIME_INVALID;
        /** @member {number} **/
        this._endOfTime = 2145960000;
        this.imm_setConst({
            POWERDURATION_INVALID: _yocto_api.YAPI.INVALID_INT,
            SLEEPCOUNTDOWN_INVALID: _yocto_api.YAPI.INVALID_INT,
            NEXTWAKEUP_INVALID: _yocto_api.YAPI.INVALID_LONG,
            WAKEUPREASON_USBPOWER: 0,
            WAKEUPREASON_EXTPOWER: 1,
            WAKEUPREASON_ENDOFSLEEP: 2,
            WAKEUPREASON_EXTSIG1: 3,
            WAKEUPREASON_SCHEDULE1: 4,
            WAKEUPREASON_SCHEDULE2: 5,
            WAKEUPREASON_INVALID: -1,
            WAKEUPSTATE_SLEEPING: 0,
            WAKEUPSTATE_AWAKE: 1,
            WAKEUPSTATE_INVALID: -1,
            RTCTIME_INVALID: _yocto_api.YAPI.INVALID_LONG
        });
        //--- (end of YWakeUpMonitor constructor)
    }

    //--- (YWakeUpMonitor implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'powerDuration':
                this._powerDuration = parseInt(val);
                return 1;
            case 'sleepCountdown':
                this._sleepCountdown = parseInt(val);
                return 1;
            case 'nextWakeUp':
                this._nextWakeUp = parseInt(val);
                return 1;
            case 'wakeUpReason':
                this._wakeUpReason = parseInt(val);
                return 1;
            case 'wakeUpState':
                this._wakeUpState = parseInt(val);
                return 1;
            case 'rtcTime':
                this._rtcTime = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the maximal wake up time (in seconds) before automatically going to sleep.
     *
     * @return {number} an integer corresponding to the maximal wake up time (in seconds) before
     * automatically going to sleep
     *
     * On failure, throws an exception or returns YWakeUpMonitor.POWERDURATION_INVALID.
     */
    get_powerDuration() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_POWERDURATION_INVALID;
                }
            }
            return _this._powerDuration;
        })();
    }

    /**
     * Changes the maximal wake up time (seconds) before automatically going to sleep.
     *
     * @param newval {number} : an integer corresponding to the maximal wake up time (seconds) before
     * automatically going to sleep
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerDuration(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this2._setAttr('powerDuration', rest_val);
        })();
    }

    /**
     * Returns the delay before the  next sleep period.
     *
     * @return {number} an integer corresponding to the delay before the  next sleep period
     *
     * On failure, throws an exception or returns YWakeUpMonitor.SLEEPCOUNTDOWN_INVALID.
     */
    get_sleepCountdown() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_SLEEPCOUNTDOWN_INVALID;
                }
            }
            return _this3._sleepCountdown;
        })();
    }

    /**
     * Changes the delay before the next sleep period.
     *
     * @param newval {number} : an integer corresponding to the delay before the next sleep period
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sleepCountdown(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('sleepCountdown', rest_val);
        })();
    }

    /**
     * Returns the next scheduled wake up date/time (UNIX format)
     *
     * @return {number} an integer corresponding to the next scheduled wake up date/time (UNIX format)
     *
     * On failure, throws an exception or returns YWakeUpMonitor.NEXTWAKEUP_INVALID.
     */
    get_nextWakeUp() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_NEXTWAKEUP_INVALID;
                }
            }
            return _this5._nextWakeUp;
        })();
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_nextWakeUp(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this6._setAttr('nextWakeUp', rest_val);
        })();
    }

    /**
     * Returns the latest wake up reason.
     *
     * @return {number} a value among YWakeUpMonitor.WAKEUPREASON_USBPOWER,
     * YWakeUpMonitor.WAKEUPREASON_EXTPOWER, YWakeUpMonitor.WAKEUPREASON_ENDOFSLEEP,
     * YWakeUpMonitor.WAKEUPREASON_EXTSIG1, YWakeUpMonitor.WAKEUPREASON_SCHEDULE1 and
     * YWakeUpMonitor.WAKEUPREASON_SCHEDULE2 corresponding to the latest wake up reason
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPREASON_INVALID.
     */
    get_wakeUpReason() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_WAKEUPREASON_INVALID;
                }
            }
            return _this7._wakeUpReason;
        })();
    }

    /**
     * Returns  the current state of the monitor
     *
     * @return {number} either YWakeUpMonitor.WAKEUPSTATE_SLEEPING or YWakeUpMonitor.WAKEUPSTATE_AWAKE,
     * according to  the current state of the monitor
     *
     * On failure, throws an exception or returns YWakeUpMonitor.WAKEUPSTATE_INVALID.
     */
    get_wakeUpState() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_WAKEUPSTATE_INVALID;
                }
            }
            return _this8._wakeUpState;
        })();
    }

    set_wakeUpState(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('wakeUpState', rest_val);
        })();
    }

    get_rtcTime() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_RTCTIME_INVALID;
                }
            }
            return _this10._rtcTime;
        })();
    }

    /**
     * Retrieves a monitor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the monitor
     *
     * @return {YWakeUpMonitor} a YWakeUpMonitor object allowing you to drive the monitor.
     */
    static FindWakeUpMonitor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('WakeUpMonitor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a monitor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the monitor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a monitor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the monitor
     *
     * @return {YWakeUpMonitor} a YWakeUpMonitor object allowing you to drive the monitor.
     */
    static FindWakeUpMonitorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'WakeUpMonitor', func);
        if (obj == null) {
            obj = new YWakeUpMonitor(yctx, func);
            _yocto_api.YFunction._AddToCache('WakeUpMonitor', func, obj);
        }
        return obj;
    }

    /**
     * Forces a wake up.
     */
    wakeUp() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.set_wakeUpState(Y_WAKEUPSTATE_AWAKE);
        })();
    }

    /**
     * Goes to sleep until the next wake up condition is met,  the
     * RTC time must have been set before calling this function.
     *
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode,
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleep(secBeforeSleep) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currTime;
            currTime = yield _this12.get_rtcTime();
            if (!(currTime != 0)) {
                return _this12._throw(YAPI_RTC_NOT_READY, 'RTC time not set', YAPI_RTC_NOT_READY);
            }
            yield _this12.set_nextWakeUp(_this12._endOfTime);
            yield _this12.set_sleepCountdown(secBeforeSleep);
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    /**
     * Goes to sleep for a specific duration or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param secUntilWakeUp {number} : number of seconds before next wake up
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleepFor(secUntilWakeUp, secBeforeSleep) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currTime;
            currTime = yield _this13.get_rtcTime();
            if (!(currTime != 0)) {
                return _this13._throw(YAPI_RTC_NOT_READY, 'RTC time not set', YAPI_RTC_NOT_READY);
            }
            yield _this13.set_nextWakeUp(currTime + secUntilWakeUp);
            yield _this13.set_sleepCountdown(secBeforeSleep);
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    /**
     * Go to sleep until a specific date is reached or until the next wake up condition is met, the
     * RTC time must have been set before calling this function. The count down before sleep
     * can be canceled with resetSleepCountDown.
     *
     * @param wakeUpTime {number} : wake-up datetime (UNIX format)
     * @param secBeforeSleep {number} : number of seconds before going into sleep mode
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sleepUntil(wakeUpTime, secBeforeSleep) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currTime;
            currTime = yield _this14.get_rtcTime();
            if (!(currTime != 0)) {
                return _this14._throw(YAPI_RTC_NOT_READY, 'RTC time not set', YAPI_RTC_NOT_READY);
            }
            yield _this14.set_nextWakeUp(wakeUpTime);
            yield _this14.set_sleepCountdown(secBeforeSleep);
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    /**
     * Resets the sleep countdown.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    resetSleepCountDown() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            yield _this15.set_sleepCountdown(0);
            yield _this15.set_nextWakeUp(0);
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    /**
     * Continues the enumeration of monitors started using yFirstWakeUpMonitor().
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         a monitor currently online, or a null pointer
     *         if there are no more monitors to enumerate.
     */
    nextWakeUpMonitor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next monitors.
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         the first monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitor() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('WakeUpMonitor');
        if (next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitor(next_hwid);
    }

    /**
     * Starts the enumeration of monitors currently accessible.
     * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
     * next monitors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
     *         the first monitor currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpMonitorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpMonitor');
        if (next_hwid == null) return null;
        return YWakeUpMonitor.FindWakeUpMonitorInContext(yctx, next_hwid);
    }

    //--- (end of YWakeUpMonitor implementation)
}

exports.YWakeUpMonitor = YWakeUpMonitor; //--- (WakeUpMonitor functions)

/**
 * Retrieves a monitor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the monitor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpMonitor.isOnline() to test if the monitor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a monitor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the monitor
 *
 * @return {YWakeUpMonitor} a YWakeUpMonitor object allowing you to drive the monitor.
 */

function yFindWakeUpMonitor(func) {
    return YWakeUpMonitor.FindWakeUpMonitor(func);
}

/**
 * Starts the enumeration of monitors currently accessible.
 * Use the method YWakeUpMonitor.nextWakeUpMonitor() to iterate on
 * next monitors.
 *
 * @return {YWakeUpMonitor} a pointer to a YWakeUpMonitor object, corresponding to
 *         the first monitor currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpMonitor() {
    return YWakeUpMonitor.FirstWakeUpMonitor();
}

//--- (end of WakeUpMonitor functions)
