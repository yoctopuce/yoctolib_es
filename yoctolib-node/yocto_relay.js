/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for Relay functions
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
exports.YRelay = exports.Y_COUNTDOWN_INVALID = exports.Y_DELAYEDPULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = exports.Y_MAXTIMEONSTATEB_INVALID = exports.Y_MAXTIMEONSTATEA_INVALID = exports.Y_OUTPUT_INVALID = exports.Y_OUTPUT_ON = exports.Y_OUTPUT_OFF = exports.Y_STATEATPOWERON_INVALID = exports.Y_STATEATPOWERON_B = exports.Y_STATEATPOWERON_A = exports.Y_STATEATPOWERON_UNCHANGED = exports.Y_STATE_INVALID = exports.Y_STATE_B = exports.Y_STATE_A = undefined;
exports.yFindRelay = yFindRelay;
exports.yFirstRelay = yFirstRelay;

var _yocto_api = require('yoctolib-es/yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YRelay return codes)
//--- (end of YRelay return codes)
//--- (YRelay definitions)
const Y_STATE_A = exports.Y_STATE_A = 0;
const Y_STATE_B = exports.Y_STATE_B = 1;
const Y_STATE_INVALID = exports.Y_STATE_INVALID = -1;
const Y_STATEATPOWERON_UNCHANGED = exports.Y_STATEATPOWERON_UNCHANGED = 0;
const Y_STATEATPOWERON_A = exports.Y_STATEATPOWERON_A = 1;
const Y_STATEATPOWERON_B = exports.Y_STATEATPOWERON_B = 2;
const Y_STATEATPOWERON_INVALID = exports.Y_STATEATPOWERON_INVALID = -1;
const Y_OUTPUT_OFF = exports.Y_OUTPUT_OFF = 0;
const Y_OUTPUT_ON = exports.Y_OUTPUT_ON = 1;
const Y_OUTPUT_INVALID = exports.Y_OUTPUT_INVALID = -1;
const Y_MAXTIMEONSTATEA_INVALID = exports.Y_MAXTIMEONSTATEA_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_MAXTIMEONSTATEB_INVALID = exports.Y_MAXTIMEONSTATEB_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_PULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_DELAYEDPULSETIMER_INVALID = exports.Y_DELAYEDPULSETIMER_INVALID = null;
const Y_COUNTDOWN_INVALID = exports.Y_COUNTDOWN_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YRelay definitions)

//--- (YRelay class start)
/**
 * YRelay Class: Relay function interface
 *
 * The Yoctopuce application programming interface allows you to switch the relay state.
 * This change is not persistent: the relay will automatically return to its idle position
 * whenever power is lost or if the module is restarted.
 * The library can also generate automatically short pulses of determined duration.
 * On devices with two output for each relay (double throw), the two outputs are named A and B,
 * with output A corresponding to the idle position (at power off) and the output B corresponding to the
 * active state. If you prefer the alternate default state, simply switch your cables on the board.
 */
//--- (end of YRelay class start)

class YRelay extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YRelay constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Relay';
        /** @member {number} **/
        this._state = Y_STATE_INVALID;
        /** @member {number} **/
        this._stateAtPowerOn = Y_STATEATPOWERON_INVALID;
        /** @member {number} **/
        this._maxTimeOnStateA = Y_MAXTIMEONSTATEA_INVALID;
        /** @member {number} **/
        this._maxTimeOnStateB = Y_MAXTIMEONSTATEB_INVALID;
        /** @member {number} **/
        this._output = Y_OUTPUT_INVALID;
        /** @member {number} **/
        this._pulseTimer = Y_PULSETIMER_INVALID;
        /** @member {YDelayedPulse} **/
        this._delayedPulseTimer = Y_DELAYEDPULSETIMER_INVALID;
        /** @member {number} **/
        this._countdown = Y_COUNTDOWN_INVALID;
        this.imm_setConst({
            STATE_A: 0,
            STATE_B: 1,
            STATE_INVALID: -1,
            STATEATPOWERON_UNCHANGED: 0,
            STATEATPOWERON_A: 1,
            STATEATPOWERON_B: 2,
            STATEATPOWERON_INVALID: -1,
            MAXTIMEONSTATEA_INVALID: _yocto_api.YAPI.INVALID_LONG,
            MAXTIMEONSTATEB_INVALID: _yocto_api.YAPI.INVALID_LONG,
            OUTPUT_OFF: 0,
            OUTPUT_ON: 1,
            OUTPUT_INVALID: -1,
            PULSETIMER_INVALID: _yocto_api.YAPI.INVALID_LONG,
            COUNTDOWN_INVALID: _yocto_api.YAPI.INVALID_LONG
        });
        //--- (end of YRelay constructor)
    }

    //--- (YRelay implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'state':
                this._state = parseInt(val);
                return 1;
            case 'stateAtPowerOn':
                this._stateAtPowerOn = parseInt(val);
                return 1;
            case 'maxTimeOnStateA':
                this._maxTimeOnStateA = parseInt(val);
                return 1;
            case 'maxTimeOnStateB':
                this._maxTimeOnStateB = parseInt(val);
                return 1;
            case 'output':
                this._output = parseInt(val);
                return 1;
            case 'pulseTimer':
                this._pulseTimer = parseInt(val);
                return 1;
            case 'delayedPulseTimer':
                this._delayedPulseTimer = val;
                return 1;
            case 'countdown':
                this._countdown = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the relays (A for the idle position, B for the active position).
     *
     * @return {number} either YRelay.STATE_A or YRelay.STATE_B, according to the state of the relays (A
     * for the idle position, B for the active position)
     *
     * On failure, throws an exception or returns YRelay.STATE_INVALID.
     */
    get_state() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_STATE_INVALID;
                }
            }
            return _this._state;
        })();
    }

    /**
     * Changes the state of the relays (A for the idle position, B for the active position).
     *
     * @param newval {number} : either YRelay.STATE_A or YRelay.STATE_B, according to the state of the
     * relays (A for the idle position, B for the active position)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_state(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this2._setAttr('state', rest_val);
        })();
    }

    /**
     * Returns the state of the relays at device startup (A for the idle position, B for the active
     * position, UNCHANGED for no change).
     *
     * @return {number} a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B corresponding to the state of the relays at device startup (A for the idle
     * position, B for the active position, UNCHANGED for no change)
     *
     * On failure, throws an exception or returns YRelay.STATEATPOWERON_INVALID.
     */
    get_stateAtPowerOn() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_STATEATPOWERON_INVALID;
                }
            }
            return _this3._stateAtPowerOn;
        })();
    }

    /**
     * Preset the state of the relays at device startup (A for the idle position,
     * B for the active position, UNCHANGED for no modification). Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : a value among YRelay.STATEATPOWERON_UNCHANGED, YRelay.STATEATPOWERON_A and
     * YRelay.STATEATPOWERON_B
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_stateAtPowerOn(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('stateAtPowerOn', rest_val);
        })();
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state A before automatically
     * switching back in to B state. Zero means no maximum time.
     *
     * @return {number} an integer
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEA_INVALID.
     */
    get_maxTimeOnStateA() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_MAXTIMEONSTATEA_INVALID;
                }
            }
            return _this5._maxTimeOnStateA;
        })();
    }

    /**
     * Sets the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state A before automatically
     * switching back in to B state. Use zero for no maximum time.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxTimeOnStateA(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this6._setAttr('maxTimeOnStateA', rest_val);
        })();
    }

    /**
     * Retourne the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state B before automatically
     * switching back in to A state. Zero means no maximum time.
     *
     * @return {number} an integer
     *
     * On failure, throws an exception or returns YRelay.MAXTIMEONSTATEB_INVALID.
     */
    get_maxTimeOnStateB() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_MAXTIMEONSTATEB_INVALID;
                }
            }
            return _this7._maxTimeOnStateB;
        })();
    }

    /**
     * Sets the maximum time (ms) allowed for $THEFUNCTIONS$ to stay in state B before automatically
     * switching back in to A state. Use zero for no maximum time.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_maxTimeOnStateB(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this8._setAttr('maxTimeOnStateB', rest_val);
        })();
    }

    /**
     * Returns the output state of the relays, when used as a simple switch (single throw).
     *
     * @return {number} either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output state of the
     * relays, when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YRelay.OUTPUT_INVALID.
     */
    get_output() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_OUTPUT_INVALID;
                }
            }
            return _this9._output;
        })();
    }

    /**
     * Changes the output state of the relays, when used as a simple switch (single throw).
     *
     * @param newval {number} : either YRelay.OUTPUT_OFF or YRelay.OUTPUT_ON, according to the output
     * state of the relays, when used as a simple switch (single throw)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_output(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this10._setAttr('output', rest_val);
        })();
    }

    /**
     * Returns the number of milliseconds remaining before the relays is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return {number} an integer corresponding to the number of milliseconds remaining before the relays
     * is returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns YRelay.PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_PULSETIMER_INVALID;
                }
            }
            return _this11._pulseTimer;
        })();
    }

    set_pulseTimer(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this12._setAttr('pulseTimer', rest_val);
        })();
    }

    /**
     * Sets the relay to output B (active) for a specified duration, then brings it
     * automatically back to output A (idle state).
     *
     * @param ms_duration {number} : pulse duration, in millisecondes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulse(ms_duration) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(ms_duration);
            return yield _this13._setAttr('pulseTimer', rest_val);
        })();
    }

    get_delayedPulseTimer() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_DELAYEDPULSETIMER_INVALID;
                }
            }
            return _this14._delayedPulseTimer;
        })();
    }

    set_delayedPulseTimer(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval.target) + ':' + String(newval.ms);
            return yield _this15._setAttr('delayedPulseTimer', rest_val);
        })();
    }

    /**
     * Schedules a pulse.
     *
     * @param ms_delay {number} : waiting time before the pulse, in millisecondes
     * @param ms_duration {number} : pulse duration, in millisecondes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    delayedPulse(ms_delay, ms_duration) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(ms_delay) + ':' + String(ms_duration);
            return yield _this16._setAttr('delayedPulseTimer', rest_val);
        })();
    }

    /**
     * Returns the number of milliseconds remaining before a pulse (delayedPulse() call)
     * When there is no scheduled pulse, returns zero.
     *
     * @return {number} an integer corresponding to the number of milliseconds remaining before a pulse
     * (delayedPulse() call)
     *         When there is no scheduled pulse, returns zero
     *
     * On failure, throws an exception or returns YRelay.COUNTDOWN_INVALID.
     */
    get_countdown() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_COUNTDOWN_INVALID;
                }
            }
            return _this17._countdown;
        })();
    }

    /**
     * Retrieves a relay for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the relay
     *
     * @return {YRelay} a YRelay object allowing you to drive the relay.
     */
    static FindRelay(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Relay', func);
        if (obj == null) {
            obj = new YRelay(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Relay', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a relay for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the relay is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRelay.isOnline() to test if the relay is
     * indeed online at a given time. In case of ambiguity when looking for
     * a relay by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the relay
     *
     * @return {YRelay} a YRelay object allowing you to drive the relay.
     */
    static FindRelayInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Relay', func);
        if (obj == null) {
            obj = new YRelay(yctx, func);
            _yocto_api.YFunction._AddToCache('Relay', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of relays started using yFirstRelay().
     *
     * @return {YRelay} a pointer to a YRelay object, corresponding to
     *         a relay currently online, or a null pointer
     *         if there are no more relays to enumerate.
     */
    nextRelay() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YRelay.FindRelayInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     *
     * @return {YRelay} a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    static FirstRelay() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Relay');
        if (next_hwid == null) return null;
        return YRelay.FindRelay(next_hwid);
    }

    /**
     * Starts the enumeration of relays currently accessible.
     * Use the method YRelay.nextRelay() to iterate on
     * next relays.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRelay} a pointer to a YRelay object, corresponding to
     *         the first relay currently online, or a null pointer
     *         if there are none.
     */
    static FirstRelayInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Relay');
        if (next_hwid == null) return null;
        return YRelay.FindRelayInContext(yctx, next_hwid);
    }

    //--- (end of YRelay implementation)
}

exports.YRelay = YRelay; //--- (Relay functions)

/**
 * Retrieves a relay for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the relay is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRelay.isOnline() to test if the relay is
 * indeed online at a given time. In case of ambiguity when looking for
 * a relay by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the relay
 *
 * @return {YRelay} a YRelay object allowing you to drive the relay.
 */

function yFindRelay(func) {
    return YRelay.FindRelay(func);
}

/**
 * Starts the enumeration of relays currently accessible.
 * Use the method YRelay.nextRelay() to iterate on
 * next relays.
 *
 * @return {YRelay} a pointer to a YRelay object, corresponding to
 *         the first relay currently online, or a null pointer
 *         if there are none.
 */
function yFirstRelay() {
    return YRelay.FirstRelay();
}

//--- (end of Relay functions)
