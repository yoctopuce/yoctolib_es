/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for DualPower functions
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
exports.YDualPower = exports.Y_EXTVOLTAGE_INVALID = exports.Y_POWERCONTROL_INVALID = exports.Y_POWERCONTROL_OFF = exports.Y_POWERCONTROL_FROM_EXT = exports.Y_POWERCONTROL_FROM_USB = exports.Y_POWERCONTROL_AUTO = exports.Y_POWERSTATE_INVALID = exports.Y_POWERSTATE_FROM_EXT = exports.Y_POWERSTATE_FROM_USB = exports.Y_POWERSTATE_OFF = undefined;
exports.yFindDualPower = yFindDualPower;
exports.yFirstDualPower = yFirstDualPower;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YDualPower return codes)
//--- (end of YDualPower return codes)
//--- (YDualPower definitions)
const Y_POWERSTATE_OFF = exports.Y_POWERSTATE_OFF = 0;
const Y_POWERSTATE_FROM_USB = exports.Y_POWERSTATE_FROM_USB = 1;
const Y_POWERSTATE_FROM_EXT = exports.Y_POWERSTATE_FROM_EXT = 2;
const Y_POWERSTATE_INVALID = exports.Y_POWERSTATE_INVALID = -1;
const Y_POWERCONTROL_AUTO = exports.Y_POWERCONTROL_AUTO = 0;
const Y_POWERCONTROL_FROM_USB = exports.Y_POWERCONTROL_FROM_USB = 1;
const Y_POWERCONTROL_FROM_EXT = exports.Y_POWERCONTROL_FROM_EXT = 2;
const Y_POWERCONTROL_OFF = exports.Y_POWERCONTROL_OFF = 3;
const Y_POWERCONTROL_INVALID = exports.Y_POWERCONTROL_INVALID = -1;
const Y_EXTVOLTAGE_INVALID = exports.Y_EXTVOLTAGE_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YDualPower definitions)

//--- (YDualPower class start)
/**
 * YDualPower Class: External power supply control interface
 *
 * Yoctopuce application programming interface allows you to control
 * the power source to use for module functions that require high current.
 * The module can also automatically disconnect the external power
 * when a voltage drop is observed on the external power source
 * (external battery running out of power).
 */
//--- (end of YDualPower class start)

class YDualPower extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YDualPower constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'DualPower';
        /** @member {number} **/
        this._powerState = Y_POWERSTATE_INVALID;
        /** @member {number} **/
        this._powerControl = Y_POWERCONTROL_INVALID;
        /** @member {number} **/
        this._extVoltage = Y_EXTVOLTAGE_INVALID;
        this.imm_setConst({
            POWERSTATE_OFF: 0,
            POWERSTATE_FROM_USB: 1,
            POWERSTATE_FROM_EXT: 2,
            POWERSTATE_INVALID: -1,
            POWERCONTROL_AUTO: 0,
            POWERCONTROL_FROM_USB: 1,
            POWERCONTROL_FROM_EXT: 2,
            POWERCONTROL_OFF: 3,
            POWERCONTROL_INVALID: -1,
            EXTVOLTAGE_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YDualPower constructor)
    }

    //--- (YDualPower implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'powerState':
                this._powerState = parseInt(val);
                return 1;
            case 'powerControl':
                this._powerControl = parseInt(val);
                return 1;
            case 'extVoltage':
                this._extVoltage = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current power source for module functions that require lots of current.
     *
     * @return {number} a value among YDualPower.POWERSTATE_OFF, YDualPower.POWERSTATE_FROM_USB and
     * YDualPower.POWERSTATE_FROM_EXT corresponding to the current power source for module functions that
     * require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERSTATE_INVALID.
     */
    get_powerState() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_POWERSTATE_INVALID;
                }
            }
            return _this._powerState;
        })();
    }

    /**
     * Returns the selected power source for module functions that require lots of current.
     *
     * @return {number} a value among YDualPower.POWERCONTROL_AUTO, YDualPower.POWERCONTROL_FROM_USB,
     * YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF corresponding to the selected
     * power source for module functions that require lots of current
     *
     * On failure, throws an exception or returns YDualPower.POWERCONTROL_INVALID.
     */
    get_powerControl() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_POWERCONTROL_INVALID;
                }
            }
            return _this2._powerControl;
        })();
    }

    /**
     * Changes the selected power source for module functions that require lots of current.
     *
     * @param newval {number} : a value among YDualPower.POWERCONTROL_AUTO,
     * YDualPower.POWERCONTROL_FROM_USB, YDualPower.POWERCONTROL_FROM_EXT and YDualPower.POWERCONTROL_OFF
     * corresponding to the selected power source for module functions that require lots of current
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_powerControl(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('powerControl', rest_val);
        })();
    }

    /**
     * Returns the measured voltage on the external power source, in millivolts.
     *
     * @return {number} an integer corresponding to the measured voltage on the external power source, in millivolts
     *
     * On failure, throws an exception or returns YDualPower.EXTVOLTAGE_INVALID.
     */
    get_extVoltage() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_EXTVOLTAGE_INVALID;
                }
            }
            return _this4._extVoltage;
        })();
    }

    /**
     * Retrieves a dual power control for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the power control
     *
     * @return {YDualPower} a YDualPower object allowing you to drive the power control.
     */
    static FindDualPower(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('DualPower', func);
        if (obj == null) {
            obj = new YDualPower(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('DualPower', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a dual power control for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the power control is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDualPower.isOnline() to test if the power control is
     * indeed online at a given time. In case of ambiguity when looking for
     * a dual power control by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the power control
     *
     * @return {YDualPower} a YDualPower object allowing you to drive the power control.
     */
    static FindDualPowerInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'DualPower', func);
        if (obj == null) {
            obj = new YDualPower(yctx, func);
            _yocto_api.YFunction._AddToCache('DualPower', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of dual power controls started using yFirstDualPower().
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         a dual power control currently online, or a null pointer
     *         if there are no more dual power controls to enumerate.
     */
    nextDualPower() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YDualPower.FindDualPowerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPower() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('DualPower');
        if (next_hwid == null) return null;
        return YDualPower.FindDualPower(next_hwid);
    }

    /**
     * Starts the enumeration of dual power controls currently accessible.
     * Use the method YDualPower.nextDualPower() to iterate on
     * next dual power controls.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDualPower} a pointer to a YDualPower object, corresponding to
     *         the first dual power control currently online, or a null pointer
     *         if there are none.
     */
    static FirstDualPowerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DualPower');
        if (next_hwid == null) return null;
        return YDualPower.FindDualPowerInContext(yctx, next_hwid);
    }

    //--- (end of YDualPower implementation)
}

exports.YDualPower = YDualPower; //--- (DualPower functions)

/**
 * Retrieves a dual power control for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the power control is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDualPower.isOnline() to test if the power control is
 * indeed online at a given time. In case of ambiguity when looking for
 * a dual power control by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the power control
 *
 * @return {YDualPower} a YDualPower object allowing you to drive the power control.
 */

function yFindDualPower(func) {
    return YDualPower.FindDualPower(func);
}

/**
 * Starts the enumeration of dual power controls currently accessible.
 * Use the method YDualPower.nextDualPower() to iterate on
 * next dual power controls.
 *
 * @return {YDualPower} a pointer to a YDualPower object, corresponding to
 *         the first dual power control currently online, or a null pointer
 *         if there are none.
 */
function yFirstDualPower() {
    return YDualPower.FirstDualPower();
}

//--- (end of DualPower functions)
