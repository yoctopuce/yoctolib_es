/*********************************************************************
 *
 * $Id: yocto_rangefinder.js 26826 2017-03-17 11:20:57Z mvuilleu $
 *
 * Implements the high-level API for RangeFinder functions
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
exports.YRangeFinderProxy = exports.YRangeFinder = exports.Y_COMMAND_INVALID = exports.Y_CURRENTTEMPERATURE_INVALID = exports.Y_HARDWARECALIBRATION_INVALID = exports.Y_RANGEFINDERMODE_INVALID = exports.Y_RANGEFINDERMODE_HIGH_SPEED = exports.Y_RANGEFINDERMODE_HIGH_ACCURACY = exports.Y_RANGEFINDERMODE_LONG_RANGE = exports.Y_RANGEFINDERMODE_DEFAULT = undefined;
exports.yFindRangeFinder = yFindRangeFinder;
exports.yFirstRangeFinder = yFirstRangeFinder;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (generated code: YRangeFinder return codes)
//--- (end of generated code: YRangeFinder return codes)
//--- (generated code: YRangeFinder definitions)
var Y_RANGEFINDERMODE_DEFAULT = exports.Y_RANGEFINDERMODE_DEFAULT = 0;
var Y_RANGEFINDERMODE_LONG_RANGE = exports.Y_RANGEFINDERMODE_LONG_RANGE = 1;
var Y_RANGEFINDERMODE_HIGH_ACCURACY = exports.Y_RANGEFINDERMODE_HIGH_ACCURACY = 2;
var Y_RANGEFINDERMODE_HIGH_SPEED = exports.Y_RANGEFINDERMODE_HIGH_SPEED = 3;
var Y_RANGEFINDERMODE_INVALID = exports.Y_RANGEFINDERMODE_INVALID = -1;
var Y_HARDWARECALIBRATION_INVALID = exports.Y_HARDWARECALIBRATION_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CURRENTTEMPERATURE_INVALID = exports.Y_CURRENTTEMPERATURE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YRangeFinder definitions)

//--- (generated code: YRangeFinder class start)
/**
 * YRangeFinder Class: RangeFinder function interface
 *
 * The Yoctopuce class YRangeFinder allows you to use and configure Yoctopuce range finder
 * sensors. It inherits from the YSensor class the core functions to read measurements,
 * register callback functions, access the autonomous datalogger.
 * This class adds the ability to easily perform a one-point linear calibration
 * to compensate the effect of a glass or filter placed in front of the sensor.
 */
//--- (end of generated code: YRangeFinder class start)

class YRangeFinder extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YRangeFinder constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'RangeFinder';
        /** @member {number} **/
        this._rangeFinderMode = Y_RANGEFINDERMODE_INVALID;
        /** @member {string} **/
        this._hardwareCalibration = Y_HARDWARECALIBRATION_INVALID;
        /** @member {number} **/
        this._currentTemperature = Y_CURRENTTEMPERATURE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            RANGEFINDERMODE_DEFAULT: 0,
            RANGEFINDERMODE_LONG_RANGE: 1,
            RANGEFINDERMODE_HIGH_ACCURACY: 2,
            RANGEFINDERMODE_HIGH_SPEED: 3,
            RANGEFINDERMODE_INVALID: -1,
            HARDWARECALIBRATION_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CURRENTTEMPERATURE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YRangeFinder constructor)
    }

    //--- (generated code: YRangeFinder implementation)

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
            var res = new YRangeFinderProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'rangeFinderMode':
                this._rangeFinderMode = parseInt(val);
                return 1;
            case 'hardwareCalibration':
                this._hardwareCalibration = val;
                return 1;
            case 'currentTemperature':
                this._currentTemperature = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured range
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval) {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this2._setAttr('unit', rest_val);
        })();
    }

    /**
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return {number} a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns YRangeFinder.RANGEFINDERMODE_INVALID.
     */
    get_rangeFinderMode() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_RANGEFINDERMODE_INVALID;
                }
            }
            res = _this3._rangeFinderMode;
            return res;
        })();
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     *
     * @param newval {number} : a value among YRangeFinder.RANGEFINDERMODE_DEFAULT,
     * YRangeFinder.RANGEFINDERMODE_LONG_RANGE, YRangeFinder.RANGEFINDERMODE_HIGH_ACCURACY and
     * YRangeFinder.RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder running mode, allowing you
     * to put priority on
     *         precision, speed or maximum range
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rangeFinderMode(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('rangeFinderMode', rest_val);
        })();
    }

    get_hardwareCalibration() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_HARDWARECALIBRATION_INVALID;
                }
            }
            res = _this5._hardwareCalibration;
            return res;
        })();
    }

    set_hardwareCalibration(newval) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this6._setAttr('hardwareCalibration', rest_val);
        })();
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the current sensor temperature, as a
     * floating point number
     *
     * On failure, throws an exception or returns YRangeFinder.CURRENTTEMPERATURE_INVALID.
     */
    get_currentTemperature() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_CURRENTTEMPERATURE_INVALID;
                }
            }
            res = _this7._currentTemperature;
            return res;
        })();
    }

    get_command() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            res = _this8._command;
            return res;
        })();
    }

    set_command(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this9._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a range finder for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the range finder
     *
     * @return {YRangeFinder} a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinder(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('RangeFinder', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a range finder for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the range finder is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRangeFinder.isOnline() to test if the range finder is
     * indeed online at a given time. In case of ambiguity when looking for
     * a range finder by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the range finder
     *
     * @return {YRangeFinder} a YRangeFinder object allowing you to drive the range finder.
     */
    static FindRangeFinderInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'RangeFinder', func);
        if (obj == null) {
            obj = new YRangeFinder(yctx, func);
            _yocto_api.YFunction._AddToCache('RangeFinder', func, obj);
        }
        return obj;
    }

    /**
     * Returns the temperature at the time when the latest calibration was performed.
     * This function can be used to determine if a new calibration for ambient temperature
     * is required.
     *
     * @return {number} a temperature, as a floating point number.
     *         On failure, throws an exception or return YAPI.INVALID_DOUBLE.
     */
    get_hardwareCalibrationTemperature() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let hwcal;

            hwcal = yield _this10.get_hardwareCalibration();
            if (!(hwcal.substr(0, 1) == '@')) {
                return _this10._yapi.INVALID_DOUBLE;
            }
            return _this10._yapi.imm_atoi(hwcal.substr(1, hwcal.length));
        })();
    }

    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerTemperatureCalibration() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11.set_command('T');
        })();
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerSpadCalibration() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return yield _this12.set_command('S');
        })();
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist {number} : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerOffsetCalibration(targetDist) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let distmm;

            if ((yield _this13.get_unit()) == '"') {
                distmm = Math.round(targetDist * 25.4);
            } else {
                distmm = Math.round(targetDist);
            }
            return yield _this13.set_command('O' + String(Math.round(distmm)));
        })();
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist {number} : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerXTalkCalibration(targetDist) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let distmm;

            if ((yield _this14.get_unit()) == '"') {
                distmm = Math.round(targetDist * 25.4);
            } else {
                distmm = Math.round(targetDist);
            }
            return yield _this14.set_command('X' + String(Math.round(distmm)));
        })();
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    cancelCoverGlassCalibrations() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            return yield _this15.set_hardwareCalibration('');
        })();
    }

    /**
     * Continues the enumeration of range finders started using yFirstRangeFinder().
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         a range finder currently online, or a null pointer
     *         if there are no more range finders to enumerate.
     */
    nextRangeFinder() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinder() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('RangeFinder');
        if (next_hwid == null) return null;
        return YRangeFinder.FindRangeFinder(next_hwid);
    }

    /**
     * Starts the enumeration of range finders currently accessible.
     * Use the method YRangeFinder.nextRangeFinder() to iterate on
     * next range finders.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
     *         the first range finder currently online, or a null pointer
     *         if there are none.
     */
    static FirstRangeFinderInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('RangeFinder');
        if (next_hwid == null) return null;
        return YRangeFinder.FindRangeFinderInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YRangeFinder implementation)
}

exports.YRangeFinder = YRangeFinder; //
// YRangeFinderProxy Class: synchronous proxy to YRangeFinder objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YRangeFinder objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YRangeFinderProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    /**
     * Returns the temperature at the time when the last calibration has been performed.
     * This function can be used to determine if a new calibration for ambiant temperature
     * is required.
     *
     * @return {number} a temperature, as a floating point number.
     *         On failure, throws an exception or return YRangeFinder.DATA_INVALID.
     */
    get_hardwareCalibrationTemperature() {
        /** @type {string} **/
        let hwcal;

        hwcal = this.liveFunc._hardwareCalibration;
        if (!(hwcal.substr(0, 1) == '@')) {
            return _yocto_api.YAPI.INVALID_DOUBLE;
        }
        return this._yapi.imm_atoi(hwcal.substr(1, hwcal.length));
    }

    //--- (generated code: YRangeFinder accessors declaration)

    /**
     * Changes the measuring unit for the measured range. That unit is a string.
     * String value can be " or mm. Any other value is ignored.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the rangeFinder function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured range
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_unit(newval) {
        this.liveFunc.set_unit(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the range finder running mode. The rangefinder running mode
     * allows you to put priority on precision, speed or maximum range.
     *
     * @return a value among Y_RANGEFINDERMODE_DEFAULT, Y_RANGEFINDERMODE_LONG_RANGE,
     * Y_RANGEFINDERMODE_HIGH_ACCURACY and Y_RANGEFINDERMODE_HIGH_SPEED corresponding to the range finder running mode
     *
     * On failure, throws an exception or returns Y_RANGEFINDERMODE_INVALID.
     */
    get_rangeFinderMode() {
        return this.liveFunc._rangeFinderMode;
    }

    /**
     * Changes the rangefinder running mode, allowing you to put priority on
     * precision, speed or maximum range.
     *
     * @param newval : a value among Y_RANGEFINDERMODE_DEFAULT, Y_RANGEFINDERMODE_LONG_RANGE,
     * Y_RANGEFINDERMODE_HIGH_ACCURACY and Y_RANGEFINDERMODE_HIGH_SPEED corresponding to the rangefinder
     * running mode, allowing you to put priority on
     *         precision, speed or maximum range
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_rangeFinderMode(newval) {
        this.liveFunc.set_rangeFinderMode(newval);
        return this._yapi.SUCCESS;
    }

    get_hardwareCalibration() {
        return this.liveFunc._hardwareCalibration;
    }

    set_hardwareCalibration(newval) {
        this.liveFunc.set_hardwareCalibration(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current sensor temperature, as a floating point number.
     *
     * @return a floating point number corresponding to the current sensor temperature, as a floating point number
     *
     * On failure, throws an exception or returns Y_CURRENTTEMPERATURE_INVALID.
     */
    get_currentTemperature() {
        return this.liveFunc._currentTemperature;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Triggers a sensor calibration according to the current ambient temperature. That
     * calibration process needs no physical interaction with the sensor. It is performed
     * automatically at device startup, but it is recommended to start it again when the
     * temperature delta since the latest calibration exceeds 8°C.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerTemperatureCalibration() {
        this.liveFunc.triggerTemperatureCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Triggers the photon detector hardware calibration.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerSpadCalibration() {
        this.liveFunc.triggerSpadCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Triggers the hardware offset calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerOffsetCalibration(targetDist) {
        this.liveFunc.triggerOffsetCalibration(targetDist);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Triggers the hardware cross-talk calibration of the distance sensor.
     * This function is part of the calibration procedure to compensate for the the effect
     * of a cover glass. Make sure to read the chapter about hardware calibration for details
     * on the calibration procedure for proper results.
     *
     * @param targetDist : true distance of the calibration target, in mm or inches, depending
     *         on the unit selected in the device
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    triggerXTalkCalibration(targetDist) {
        this.liveFunc.triggerXTalkCalibration(targetDist);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Cancels the effect of previous hardware calibration procedures to compensate
     * for cover glass, and restores factory settings.
     * Remember to call the saveToFlash() method of the module if the modification must be kept.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *         On failure, throws an exception or returns a negative error code.
     */
    cancelCoverGlassCalibrations() {
        this.liveFunc.cancelCoverGlassCalibrations();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YRangeFinder accessors declaration)
}

exports.YRangeFinderProxy = YRangeFinderProxy; //--- (generated code: RangeFinder functions)

/**
 * Retrieves a range finder for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the range finder is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRangeFinder.isOnline() to test if the range finder is
 * indeed online at a given time. In case of ambiguity when looking for
 * a range finder by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the range finder
 *
 * @return {YRangeFinder} a YRangeFinder object allowing you to drive the range finder.
 */

function yFindRangeFinder(func) {
    return YRangeFinder.FindRangeFinder(func);
}

/**
 * Starts the enumeration of range finders currently accessible.
 * Use the method YRangeFinder.nextRangeFinder() to iterate on
 * next range finders.
 *
 * @return {YRangeFinder} a pointer to a YRangeFinder object, corresponding to
 *         the first range finder currently online, or a null pointer
 *         if there are none.
 */
function yFirstRangeFinder() {
    return YRangeFinder.FirstRangeFinder();
}

//--- (end of generated code: RangeFinder functions)
