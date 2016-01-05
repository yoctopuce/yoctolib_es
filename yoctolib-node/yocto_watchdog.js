/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for Watchdog functions
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
exports.YWatchdog = exports.Y_TRIGGERDURATION_INVALID = exports.Y_TRIGGERDELAY_INVALID = exports.Y_COUNTDOWN_INVALID = exports.Y_DELAYEDPULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = exports.Y_MAXTIMEONSTATEB_INVALID = exports.Y_MAXTIMEONSTATEA_INVALID = exports.Y_RUNNING_INVALID = exports.Y_RUNNING_ON = exports.Y_RUNNING_OFF = exports.Y_AUTOSTART_INVALID = exports.Y_AUTOSTART_ON = exports.Y_AUTOSTART_OFF = exports.Y_OUTPUT_INVALID = exports.Y_OUTPUT_ON = exports.Y_OUTPUT_OFF = exports.Y_STATEATPOWERON_INVALID = exports.Y_STATEATPOWERON_B = exports.Y_STATEATPOWERON_A = exports.Y_STATEATPOWERON_UNCHANGED = exports.Y_STATE_INVALID = exports.Y_STATE_B = exports.Y_STATE_A = undefined;
exports.yFindWatchdog = yFindWatchdog;
exports.yFirstWatchdog = yFirstWatchdog;

var _yocto_api = require('yoctolib-es/yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YWatchdog return codes)
//--- (end of YWatchdog return codes)
//--- (YWatchdog definitions)
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
const Y_AUTOSTART_OFF = exports.Y_AUTOSTART_OFF = 0;
const Y_AUTOSTART_ON = exports.Y_AUTOSTART_ON = 1;
const Y_AUTOSTART_INVALID = exports.Y_AUTOSTART_INVALID = -1;
const Y_RUNNING_OFF = exports.Y_RUNNING_OFF = 0;
const Y_RUNNING_ON = exports.Y_RUNNING_ON = 1;
const Y_RUNNING_INVALID = exports.Y_RUNNING_INVALID = -1;
const Y_MAXTIMEONSTATEA_INVALID = exports.Y_MAXTIMEONSTATEA_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_MAXTIMEONSTATEB_INVALID = exports.Y_MAXTIMEONSTATEB_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_PULSETIMER_INVALID = exports.Y_PULSETIMER_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_DELAYEDPULSETIMER_INVALID = exports.Y_DELAYEDPULSETIMER_INVALID = null;
const Y_COUNTDOWN_INVALID = exports.Y_COUNTDOWN_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_TRIGGERDELAY_INVALID = exports.Y_TRIGGERDELAY_INVALID = _yocto_api.YAPI.INVALID_LONG;
const Y_TRIGGERDURATION_INVALID = exports.Y_TRIGGERDURATION_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of YWatchdog definitions)

//--- (YWatchdog class start)
/**
 * YWatchdog Class: Watchdog function interface
 *
 * The watchog function works like a relay and can cause a brief power cut
 * to an appliance after a preset delay to force this appliance to
 * reset. The Watchdog must be called from time to time to reset the
 * timer and prevent the appliance reset.
 * The watchdog can be driven direcly with <i>pulse</i> and <i>delayedpulse</i> methods to switch
 * off an appliance for a given duration.
 */
//--- (end of YWatchdog class start)

class YWatchdog extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YWatchdog constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Watchdog';
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
        /** @member {number} **/
        this._autoStart = Y_AUTOSTART_INVALID;
        /** @member {number} **/
        this._running = Y_RUNNING_INVALID;
        /** @member {number} **/
        this._triggerDelay = Y_TRIGGERDELAY_INVALID;
        /** @member {number} **/
        this._triggerDuration = Y_TRIGGERDURATION_INVALID;
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
            COUNTDOWN_INVALID: _yocto_api.YAPI.INVALID_LONG,
            AUTOSTART_OFF: 0,
            AUTOSTART_ON: 1,
            AUTOSTART_INVALID: -1,
            RUNNING_OFF: 0,
            RUNNING_ON: 1,
            RUNNING_INVALID: -1,
            TRIGGERDELAY_INVALID: _yocto_api.YAPI.INVALID_LONG,
            TRIGGERDURATION_INVALID: _yocto_api.YAPI.INVALID_LONG
        });
        //--- (end of YWatchdog constructor)
    }

    //--- (YWatchdog implementation)

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
            case 'autoStart':
                this._autoStart = parseInt(val);
                return 1;
            case 'running':
                this._running = parseInt(val);
                return 1;
            case 'triggerDelay':
                this._triggerDelay = parseInt(val);
                return 1;
            case 'triggerDuration':
                this._triggerDuration = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the state of the watchdog (A for the idle position, B for the active position).
     *
     * @return {number} either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of the
     * watchdog (A for the idle position, B for the active position)
     *
     * On failure, throws an exception or returns YWatchdog.STATE_INVALID.
     */
    get_state() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_STATE_INVALID;
                }
            }
            return _this._state;
        })();
    }

    /**
     * Changes the state of the watchdog (A for the idle position, B for the active position).
     *
     * @param newval {number} : either YWatchdog.STATE_A or YWatchdog.STATE_B, according to the state of
     * the watchdog (A for the idle position, B for the active position)
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
     * Returns the state of the watchdog at device startup (A for the idle position, B for the active
     * position, UNCHANGED for no change).
     *
     * @return {number} a value among YWatchdog.STATEATPOWERON_UNCHANGED, YWatchdog.STATEATPOWERON_A and
     * YWatchdog.STATEATPOWERON_B corresponding to the state of the watchdog at device startup (A for the
     * idle position, B for the active position, UNCHANGED for no change)
     *
     * On failure, throws an exception or returns YWatchdog.STATEATPOWERON_INVALID.
     */
    get_stateAtPowerOn() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_STATEATPOWERON_INVALID;
                }
            }
            return _this3._stateAtPowerOn;
        })();
    }

    /**
     * Preset the state of the watchdog at device startup (A for the idle position,
     * B for the active position, UNCHANGED for no modification). Remember to call the matching module saveToFlash()
     * method, otherwise this call will have no effect.
     *
     * @param newval {number} : a value among YWatchdog.STATEATPOWERON_UNCHANGED,
     * YWatchdog.STATEATPOWERON_A and YWatchdog.STATEATPOWERON_B
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
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEA_INVALID.
     */
    get_maxTimeOnStateA() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
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
     * On failure, throws an exception or returns YWatchdog.MAXTIMEONSTATEB_INVALID.
     */
    get_maxTimeOnStateB() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
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
     * Returns the output state of the watchdog, when used as a simple switch (single throw).
     *
     * @return {number} either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the output state
     * of the watchdog, when used as a simple switch (single throw)
     *
     * On failure, throws an exception or returns YWatchdog.OUTPUT_INVALID.
     */
    get_output() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_OUTPUT_INVALID;
                }
            }
            return _this9._output;
        })();
    }

    /**
     * Changes the output state of the watchdog, when used as a simple switch (single throw).
     *
     * @param newval {number} : either YWatchdog.OUTPUT_OFF or YWatchdog.OUTPUT_ON, according to the
     * output state of the watchdog, when used as a simple switch (single throw)
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
     * Returns the number of milliseconds remaining before the watchdog is returned to idle position
     * (state A), during a measured pulse generation. When there is no ongoing pulse, returns zero.
     *
     * @return {number} an integer corresponding to the number of milliseconds remaining before the
     * watchdog is returned to idle position
     *         (state A), during a measured pulse generation
     *
     * On failure, throws an exception or returns YWatchdog.PULSETIMER_INVALID.
     */
    get_pulseTimer() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
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
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
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
     * On failure, throws an exception or returns YWatchdog.COUNTDOWN_INVALID.
     */
    get_countdown() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_COUNTDOWN_INVALID;
                }
            }
            return _this17._countdown;
        })();
    }

    /**
     * Returns the watchdog runing state at module power on.
     *
     * @return {number} either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the
     * watchdog runing state at module power on
     *
     * On failure, throws an exception or returns YWatchdog.AUTOSTART_INVALID.
     */
    get_autoStart() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            if (_this18._cacheExpiration <= _this18._yapi.GetTickCount()) {
                if ((yield _this18.load(_this18._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_AUTOSTART_INVALID;
                }
            }
            return _this18._autoStart;
        })();
    }

    /**
     * Changes the watchdog runningsttae at module power on. Remember to call the
     * saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {number} : either YWatchdog.AUTOSTART_OFF or YWatchdog.AUTOSTART_ON, according to the
     * watchdog runningsttae at module power on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoStart(newval) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this19._setAttr('autoStart', rest_val);
        })();
    }

    /**
     * Returns the watchdog running state.
     *
     * @return {number} either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the watchdog running state
     *
     * On failure, throws an exception or returns YWatchdog.RUNNING_INVALID.
     */
    get_running() {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            if (_this20._cacheExpiration <= _this20._yapi.GetTickCount()) {
                if ((yield _this20.load(_this20._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_RUNNING_INVALID;
                }
            }
            return _this20._running;
        })();
    }

    /**
     * Changes the running state of the watchdog.
     *
     * @param newval {number} : either YWatchdog.RUNNING_OFF or YWatchdog.RUNNING_ON, according to the
     * running state of the watchdog
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_running(newval) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this21._setAttr('running', rest_val);
        })();
    }

    /**
     * Resets the watchdog. When the watchdog is running, this function
     * must be called on a regular basis to prevent the watchog to
     * trigger
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    resetWatchdog() {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = '1';
            return yield _this22._setAttr('running', rest_val);
        })();
    }

    /**
     * Returns  the waiting duration before a reset is automatically triggered by the watchdog, in milliseconds.
     *
     * @return {number} an integer corresponding to  the waiting duration before a reset is automatically
     * triggered by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDELAY_INVALID.
     */
    get_triggerDelay() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            if (_this23._cacheExpiration <= _this23._yapi.GetTickCount()) {
                if ((yield _this23.load(_this23._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_TRIGGERDELAY_INVALID;
                }
            }
            return _this23._triggerDelay;
        })();
    }

    /**
     * Changes the waiting delay before a reset is triggered by the watchdog, in milliseconds.
     *
     * @param newval {number} : an integer corresponding to the waiting delay before a reset is triggered
     * by the watchdog, in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_triggerDelay(newval) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this24._setAttr('triggerDelay', rest_val);
        })();
    }

    /**
     * Returns the duration of resets caused by the watchdog, in milliseconds.
     *
     * @return {number} an integer corresponding to the duration of resets caused by the watchdog, in milliseconds
     *
     * On failure, throws an exception or returns YWatchdog.TRIGGERDURATION_INVALID.
     */
    get_triggerDuration() {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            if (_this25._cacheExpiration <= _this25._yapi.GetTickCount()) {
                if ((yield _this25.load(_this25._yapi.defaultCacheValidity)) != _yocto_api.YAPI_SUCCESS) {
                    return Y_TRIGGERDURATION_INVALID;
                }
            }
            return _this25._triggerDuration;
        })();
    }

    /**
     * Changes the duration of resets caused by the watchdog, in milliseconds.
     *
     * @param newval {number} : an integer corresponding to the duration of resets caused by the watchdog,
     * in milliseconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_triggerDuration(newval) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this26._setAttr('triggerDuration', rest_val);
        })();
    }

    /**
     * Retrieves a watchdog for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the watchdog is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWatchdog.isOnline() to test if the watchdog is
     * indeed online at a given time. In case of ambiguity when looking for
     * a watchdog by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the watchdog
     *
     * @return {YWatchdog} a YWatchdog object allowing you to drive the watchdog.
     */
    static FindWatchdog(func) {
        /** @type {YWatchdog} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Watchdog', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a watchdog for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the watchdog is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YWatchdog.isOnline() to test if the watchdog is
     * indeed online at a given time. In case of ambiguity when looking for
     * a watchdog by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the watchdog
     *
     * @return {YWatchdog} a YWatchdog object allowing you to drive the watchdog.
     */
    static FindWatchdogInContext(yctx, func) {
        /** @type {YWatchdog} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Watchdog', func);
        if (obj == null) {
            obj = new YWatchdog(yctx, func);
            _yocto_api.YFunction._AddToCache('Watchdog', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of watchdog started using yFirstWatchdog().
     *
     * @return {YWatchdog} a pointer to a YWatchdog object, corresponding to
     *         a watchdog currently online, or a null pointer
     *         if there are no more watchdog to enumerate.
     */
    /* */nextWatchdog() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YWatchdog.FindWatchdogInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     *
     * @return {YWatchdog} a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    static FirstWatchdog() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null) return null;
        return YWatchdog.FindWatchdog(next_hwid);
    }

    /**
     * Starts the enumeration of watchdog currently accessible.
     * Use the method YWatchdog.nextWatchdog() to iterate on
     * next watchdog.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YWatchdog} a pointer to a YWatchdog object, corresponding to
     *         the first watchdog currently online, or a null pointer
     *         if there are none.
     */
    static FirstWatchdogInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Watchdog');
        if (next_hwid == null) return null;
        return YWatchdog.FindWatchdogInContext(yctx, next_hwid);
    }

    //--- (end of YWatchdog implementation)
}

exports.YWatchdog = YWatchdog; //--- (Watchdog functions)

/**
 * comment from .yc definition
 */

function yFindWatchdog(func) {
    return YWatchdog.FindWatchdog(func);
}

/**
 * comment from .yc definition
 */
function yFirstWatchdog() {
    return YWatchdog.FirstWatchdog();
}

//--- (end of Watchdog functions)
