/*********************************************************************
 *
 * $Id: yocto_wakeupschedule.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for WakeUpSchedule functions
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
exports.YWakeUpScheduleProxy = exports.YWakeUpSchedule = exports.Y_NEXTOCCURENCE_INVALID = exports.Y_MONTHS_INVALID = exports.Y_MONTHDAYS_INVALID = exports.Y_WEEKDAYS_INVALID = exports.Y_HOURS_INVALID = exports.Y_MINUTESB_INVALID = exports.Y_MINUTESA_INVALID = undefined;
exports.yFindWakeUpSchedule = yFindWakeUpSchedule;
exports.yFirstWakeUpSchedule = yFirstWakeUpSchedule;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YWakeUpSchedule return codes)
//--- (end of YWakeUpSchedule return codes)
//--- (YWakeUpSchedule definitions)
var Y_MINUTESA_INVALID = exports.Y_MINUTESA_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_MINUTESB_INVALID = exports.Y_MINUTESB_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_HOURS_INVALID = exports.Y_HOURS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_WEEKDAYS_INVALID = exports.Y_WEEKDAYS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_MONTHDAYS_INVALID = exports.Y_MONTHDAYS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_MONTHS_INVALID = exports.Y_MONTHS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_NEXTOCCURENCE_INVALID = exports.Y_NEXTOCCURENCE_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YWakeUpSchedule definitions)

//--- (YWakeUpSchedule class start)
/**
 * YWakeUpSchedule Class: WakeUpSchedule function interface
 *
 * The WakeUpSchedule function implements a wake up condition. The wake up time is
 * specified as a set of months and/or days and/or hours and/or minutes when the
 * wake up should happen.
 */
//--- (end of YWakeUpSchedule class start)

class YWakeUpSchedule extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YWakeUpSchedule constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'WakeUpSchedule';
        /** @member {number} **/
        this._minutesA = Y_MINUTESA_INVALID;
        /** @member {number} **/
        this._minutesB = Y_MINUTESB_INVALID;
        /** @member {number} **/
        this._hours = Y_HOURS_INVALID;
        /** @member {number} **/
        this._weekDays = Y_WEEKDAYS_INVALID;
        /** @member {number} **/
        this._monthDays = Y_MONTHDAYS_INVALID;
        /** @member {number} **/
        this._months = Y_MONTHS_INVALID;
        /** @member {number} **/
        this._nextOccurence = Y_NEXTOCCURENCE_INVALID;
        this.imm_setConst({
            MINUTESA_INVALID: _yocto_api.YAPI.INVALID_UINT,
            MINUTESB_INVALID: _yocto_api.YAPI.INVALID_UINT,
            HOURS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            WEEKDAYS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            MONTHDAYS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            MONTHS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            NEXTOCCURENCE_INVALID: _yocto_api.YAPI.INVALID_LONG
        });
        //--- (end of YWakeUpSchedule constructor)
    }

    //--- (YWakeUpSchedule implementation)

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
            var res = new YWakeUpScheduleProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'minutesA':
                this._minutesA = parseInt(val);
                return 1;
            case 'minutesB':
                this._minutesB = parseInt(val);
                return 1;
            case 'hours':
                this._hours = parseInt(val);
                return 1;
            case 'weekDays':
                this._weekDays = parseInt(val);
                return 1;
            case 'monthDays':
                this._monthDays = parseInt(val);
                return 1;
            case 'months':
                this._months = parseInt(val);
                return 1;
            case 'nextOccurence':
                this._nextOccurence = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     *
     * @return {number} an integer corresponding to the minutes in the 00-29 interval of each hour
     * scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESA_INVALID.
     */
    get_minutesA() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_MINUTESA_INVALID;
                }
            }
            return _this2._minutesA;
        })();
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the minutes in the 00-29 interval when a wake
     * up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesA(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('minutesA', rest_val);
        })();
    }

    /**
     * Returns the minutes in the 30-59 intervalof each hour scheduled for wake up.
     *
     * @return {number} an integer corresponding to the minutes in the 30-59 intervalof each hour scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MINUTESB_INVALID.
     */
    get_minutesB() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_MINUTESB_INVALID;
                }
            }
            return _this4._minutesB;
        })();
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the minutes in the 30-59 interval when a wake
     * up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesB(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('minutesB', rest_val);
        })();
    }

    /**
     * Returns the hours scheduled for wake up.
     *
     * @return {number} an integer corresponding to the hours scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.HOURS_INVALID.
     */
    get_hours() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_HOURS_INVALID;
                }
            }
            return _this6._hours;
        })();
    }

    /**
     * Changes the hours when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the hours when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hours(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('hours', rest_val);
        })();
    }

    /**
     * Returns the days of the week scheduled for wake up.
     *
     * @return {number} an integer corresponding to the days of the week scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.WEEKDAYS_INVALID.
     */
    get_weekDays() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_WEEKDAYS_INVALID;
                }
            }
            return _this8._weekDays;
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
    set_weekDays(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('weekDays', rest_val);
        })();
    }

    /**
     * Returns the days of the month scheduled for wake up.
     *
     * @return {number} an integer corresponding to the days of the month scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHDAYS_INVALID.
     */
    get_monthDays() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_MONTHDAYS_INVALID;
                }
            }
            return _this10._monthDays;
        })();
    }

    /**
     * Changes the days of the month when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the days of the month when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_monthDays(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this11._setAttr('monthDays', rest_val);
        })();
    }

    /**
     * Returns the months scheduled for wake up.
     *
     * @return {number} an integer corresponding to the months scheduled for wake up
     *
     * On failure, throws an exception or returns YWakeUpSchedule.MONTHS_INVALID.
     */
    get_months() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_MONTHS_INVALID;
                }
            }
            return _this12._months;
        })();
    }

    /**
     * Changes the months when a wake up must take place.
     *
     * @param newval {number} : an integer corresponding to the months when a wake up must take place
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_months(newval) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this13._setAttr('months', rest_val);
        })();
    }

    /**
     * Returns the date/time (seconds) of the next wake up occurence.
     *
     * @return {number} an integer corresponding to the date/time (seconds) of the next wake up occurence
     *
     * On failure, throws an exception or returns YWakeUpSchedule.NEXTOCCURENCE_INVALID.
     */
    get_nextOccurence() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_NEXTOCCURENCE_INVALID;
                }
            }
            return _this14._nextOccurence;
        })();
    }

    /**
     * Retrieves a wake up schedule for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the wake up schedule
     *
     * @return {YWakeUpSchedule} a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpSchedule(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('WakeUpSchedule', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a wake up schedule for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the wake up schedule is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
     * indeed online at a given time. In case of ambiguity when looking for
     * a wake up schedule by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the wake up schedule
     *
     * @return {YWakeUpSchedule} a YWakeUpSchedule object allowing you to drive the wake up schedule.
     */
    static FindWakeUpScheduleInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'WakeUpSchedule', func);
        if (obj == null) {
            obj = new YWakeUpSchedule(yctx, func);
            _yocto_api.YFunction._AddToCache('WakeUpSchedule', func, obj);
        }
        return obj;
    }

    /**
     * Returns all the minutes of each hour that are scheduled for wake up.
     */
    get_minutes() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            // may throw an exception
            res = yield _this15.get_minutesB();
            res = res << 30;
            res = res + (yield _this15.get_minutesA());
            return res;
        })();
    }

    /**
     * Changes all the minutes where a wake up must take place.
     *
     * @param bitmap {number} : Minutes 00-59 of each hour scheduled for wake up.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutes(bitmap) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            yield _this16.set_minutesA(bitmap & 0x3fffffff);
            bitmap = bitmap >> 30;
            return yield _this16.set_minutesB(bitmap & 0x3fffffff);
        })();
    }

    /**
     * Continues the enumeration of wake up schedules started using yFirstWakeUpSchedule().
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         a wake up schedule currently online, or a null pointer
     *         if there are no more wake up schedules to enumerate.
     */
    nextWakeUpSchedule() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpSchedule() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('WakeUpSchedule');
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpSchedule(next_hwid);
    }

    /**
     * Starts the enumeration of wake up schedules currently accessible.
     * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
     * next wake up schedules.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
     *         the first wake up schedule currently online, or a null pointer
     *         if there are none.
     */
    static FirstWakeUpScheduleInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('WakeUpSchedule');
        if (next_hwid == null) return null;
        return YWakeUpSchedule.FindWakeUpScheduleInContext(yctx, next_hwid);
    }

    //--- (end of YWakeUpSchedule implementation)
}

exports.YWakeUpSchedule = YWakeUpSchedule; //
// YWakeUpScheduleProxy Class: synchronous proxy to YWakeUpSchedule objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YWakeUpSchedule objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YWakeUpScheduleProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YWakeUpSchedule accessors declaration)

    /**
     * Returns the minutes in the 00-29 interval of each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 00-29 interval of each hour scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MINUTESA_INVALID.
     */
    get_minutesA() {
        return this.liveFunc._minutesA;
    }

    /**
     * Changes the minutes in the 00-29 interval when a wake up must take place.
     *
     * @param newval : an integer corresponding to the minutes in the 00-29 interval when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesA(newval) {
        this.liveFunc.set_minutesA(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minutes in the 30-59 intervalof each hour scheduled for wake up.
     *
     * @return an integer corresponding to the minutes in the 30-59 intervalof each hour scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MINUTESB_INVALID.
     */
    get_minutesB() {
        return this.liveFunc._minutesB;
    }

    /**
     * Changes the minutes in the 30-59 interval when a wake up must take place.
     *
     * @param newval : an integer corresponding to the minutes in the 30-59 interval when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_minutesB(newval) {
        this.liveFunc.set_minutesB(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the hours scheduled for wake up.
     *
     * @return an integer corresponding to the hours scheduled for wake up
     *
     * On failure, throws an exception or returns Y_HOURS_INVALID.
     */
    get_hours() {
        return this.liveFunc._hours;
    }

    /**
     * Changes the hours when a wake up must take place.
     *
     * @param newval : an integer corresponding to the hours when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_hours(newval) {
        this.liveFunc.set_hours(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the days of the week scheduled for wake up.
     *
     * @return an integer corresponding to the days of the week scheduled for wake up
     *
     * On failure, throws an exception or returns Y_WEEKDAYS_INVALID.
     */
    get_weekDays() {
        return this.liveFunc._weekDays;
    }

    /**
     * Changes the days of the week when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the week when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_weekDays(newval) {
        this.liveFunc.set_weekDays(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the days of the month scheduled for wake up.
     *
     * @return an integer corresponding to the days of the month scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MONTHDAYS_INVALID.
     */
    get_monthDays() {
        return this.liveFunc._monthDays;
    }

    /**
     * Changes the days of the month when a wake up must take place.
     *
     * @param newval : an integer corresponding to the days of the month when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_monthDays(newval) {
        this.liveFunc.set_monthDays(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the months scheduled for wake up.
     *
     * @return an integer corresponding to the months scheduled for wake up
     *
     * On failure, throws an exception or returns Y_MONTHS_INVALID.
     */
    get_months() {
        return this.liveFunc._months;
    }

    /**
     * Changes the months when a wake up must take place.
     *
     * @param newval : an integer corresponding to the months when a wake up must take place
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_months(newval) {
        this.liveFunc.set_months(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the date/time (seconds) of the next wake up occurence.
     *
     * @return an integer corresponding to the date/time (seconds) of the next wake up occurence
     *
     * On failure, throws an exception or returns Y_NEXTOCCURENCE_INVALID.
     */
    get_nextOccurence() {
        return this.liveFunc._nextOccurence;
    }
    //--- (end of YWakeUpSchedule accessors declaration)
}

exports.YWakeUpScheduleProxy = YWakeUpScheduleProxy; //--- (WakeUpSchedule functions)

/**
 * Retrieves a wake up schedule for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the wake up schedule is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YWakeUpSchedule.isOnline() to test if the wake up schedule is
 * indeed online at a given time. In case of ambiguity when looking for
 * a wake up schedule by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the wake up schedule
 *
 * @return {YWakeUpSchedule} a YWakeUpSchedule object allowing you to drive the wake up schedule.
 */

function yFindWakeUpSchedule(func) {
    return YWakeUpSchedule.FindWakeUpSchedule(func);
}

/**
 * Starts the enumeration of wake up schedules currently accessible.
 * Use the method YWakeUpSchedule.nextWakeUpSchedule() to iterate on
 * next wake up schedules.
 *
 * @return {YWakeUpSchedule} a pointer to a YWakeUpSchedule object, corresponding to
 *         the first wake up schedule currently online, or a null pointer
 *         if there are none.
 */
function yFirstWakeUpSchedule() {
    return YWakeUpSchedule.FirstWakeUpSchedule();
}

//--- (end of WakeUpSchedule functions)
