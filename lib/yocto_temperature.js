/*********************************************************************
 *
 * $Id: yocto_temperature.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Temperature functions
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
exports.YTemperatureProxy = exports.YTemperature = exports.Y_COMMAND_INVALID = exports.Y_SIGNALUNIT_INVALID = exports.Y_SIGNALVALUE_INVALID = exports.Y_SENSORTYPE_INVALID = exports.Y_SENSORTYPE_RES_LINEAR = exports.Y_SENSORTYPE_RES_NTC = exports.Y_SENSORTYPE_RES_OHM = exports.Y_SENSORTYPE_PT100_2WIRES = exports.Y_SENSORTYPE_PT100_3WIRES = exports.Y_SENSORTYPE_PT100_4WIRES = exports.Y_SENSORTYPE_TYPE_T = exports.Y_SENSORTYPE_TYPE_S = exports.Y_SENSORTYPE_TYPE_R = exports.Y_SENSORTYPE_TYPE_N = exports.Y_SENSORTYPE_TYPE_J = exports.Y_SENSORTYPE_TYPE_E = exports.Y_SENSORTYPE_TYPE_K = exports.Y_SENSORTYPE_DIGITAL = undefined;
exports.yFindTemperature = yFindTemperature;
exports.yFirstTemperature = yFirstTemperature;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YTemperature return codes)
//--- (end of YTemperature return codes)
//--- (YTemperature definitions)
var Y_SENSORTYPE_DIGITAL = exports.Y_SENSORTYPE_DIGITAL = 0;
var Y_SENSORTYPE_TYPE_K = exports.Y_SENSORTYPE_TYPE_K = 1;
var Y_SENSORTYPE_TYPE_E = exports.Y_SENSORTYPE_TYPE_E = 2;
var Y_SENSORTYPE_TYPE_J = exports.Y_SENSORTYPE_TYPE_J = 3;
var Y_SENSORTYPE_TYPE_N = exports.Y_SENSORTYPE_TYPE_N = 4;
var Y_SENSORTYPE_TYPE_R = exports.Y_SENSORTYPE_TYPE_R = 5;
var Y_SENSORTYPE_TYPE_S = exports.Y_SENSORTYPE_TYPE_S = 6;
var Y_SENSORTYPE_TYPE_T = exports.Y_SENSORTYPE_TYPE_T = 7;
var Y_SENSORTYPE_PT100_4WIRES = exports.Y_SENSORTYPE_PT100_4WIRES = 8;
var Y_SENSORTYPE_PT100_3WIRES = exports.Y_SENSORTYPE_PT100_3WIRES = 9;
var Y_SENSORTYPE_PT100_2WIRES = exports.Y_SENSORTYPE_PT100_2WIRES = 10;
var Y_SENSORTYPE_RES_OHM = exports.Y_SENSORTYPE_RES_OHM = 11;
var Y_SENSORTYPE_RES_NTC = exports.Y_SENSORTYPE_RES_NTC = 12;
var Y_SENSORTYPE_RES_LINEAR = exports.Y_SENSORTYPE_RES_LINEAR = 13;
var Y_SENSORTYPE_INVALID = exports.Y_SENSORTYPE_INVALID = -1;
var Y_SIGNALVALUE_INVALID = exports.Y_SIGNALVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_SIGNALUNIT_INVALID = exports.Y_SIGNALUNIT_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YTemperature definitions)

//--- (YTemperature class start)
/**
 * YTemperature Class: Temperature function interface
 *
 * The Yoctopuce class YTemperature allows you to read and configure Yoctopuce temperature
 * sensors. It inherits from YSensor class the core functions to read measurements,
 * register callback functions, access to the autonomous datalogger.
 * This class adds the ability to configure some specific parameters for some
 * sensors (connection type, temperature mapping table).
 */
//--- (end of YTemperature class start)

class YTemperature extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (YTemperature constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Temperature';
        /** @member {number} **/
        this._sensorType = Y_SENSORTYPE_INVALID;
        /** @member {number} **/
        this._signalValue = Y_SIGNALVALUE_INVALID;
        /** @member {string} **/
        this._signalUnit = Y_SIGNALUNIT_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            SENSORTYPE_DIGITAL: 0,
            SENSORTYPE_TYPE_K: 1,
            SENSORTYPE_TYPE_E: 2,
            SENSORTYPE_TYPE_J: 3,
            SENSORTYPE_TYPE_N: 4,
            SENSORTYPE_TYPE_R: 5,
            SENSORTYPE_TYPE_S: 6,
            SENSORTYPE_TYPE_T: 7,
            SENSORTYPE_PT100_4WIRES: 8,
            SENSORTYPE_PT100_3WIRES: 9,
            SENSORTYPE_PT100_2WIRES: 10,
            SENSORTYPE_RES_OHM: 11,
            SENSORTYPE_RES_NTC: 12,
            SENSORTYPE_RES_LINEAR: 13,
            SENSORTYPE_INVALID: -1,
            SIGNALVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            SIGNALUNIT_INVALID: _yocto_api.YAPI.INVALID_STRING,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YTemperature constructor)
    }

    //--- (YTemperature implementation)

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
            var res = new YTemperatureProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'sensorType':
                this._sensorType = parseInt(val);
                return 1;
            case 'signalValue':
                this._signalValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'signalUnit':
                this._signalUnit = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval {string} : a string corresponding to the measuring unit for the measured temperature
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
     * Returns the temperature sensor type.
     *
     * @return {number} a value among YTemperature.SENSORTYPE_DIGITAL, YTemperature.SENSORTYPE_TYPE_K,
     * YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J, YTemperature.SENSORTYPE_TYPE_N,
     * YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S, YTemperature.SENSORTYPE_TYPE_T,
     * YTemperature.SENSORTYPE_PT100_4WIRES, YTemperature.SENSORTYPE_PT100_3WIRES,
     * YTemperature.SENSORTYPE_PT100_2WIRES, YTemperature.SENSORTYPE_RES_OHM,
     * YTemperature.SENSORTYPE_RES_NTC and YTemperature.SENSORTYPE_RES_LINEAR corresponding to the
     * temperature sensor type
     *
     * On failure, throws an exception or returns YTemperature.SENSORTYPE_INVALID.
     */
    get_sensorType() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_SENSORTYPE_INVALID;
                }
            }
            return _this3._sensorType;
        })();
    }

    /**
     * Modifies the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : a value among YTemperature.SENSORTYPE_DIGITAL,
     * YTemperature.SENSORTYPE_TYPE_K, YTemperature.SENSORTYPE_TYPE_E, YTemperature.SENSORTYPE_TYPE_J,
     * YTemperature.SENSORTYPE_TYPE_N, YTemperature.SENSORTYPE_TYPE_R, YTemperature.SENSORTYPE_TYPE_S,
     * YTemperature.SENSORTYPE_TYPE_T, YTemperature.SENSORTYPE_PT100_4WIRES,
     * YTemperature.SENSORTYPE_PT100_3WIRES, YTemperature.SENSORTYPE_PT100_2WIRES,
     * YTemperature.SENSORTYPE_RES_OHM, YTemperature.SENSORTYPE_RES_NTC and YTemperature.SENSORTYPE_RES_LINEAR
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensorType(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this4._setAttr('sensorType', rest_val);
        })();
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return {number} a floating point number corresponding to the current value of the electrical
     * signal measured by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_SIGNALVALUE_INVALID;
                }
            }
            return Math.round(_this5._signalValue * 1000) / 1000;
        })();
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return {string} a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns YTemperature.SIGNALUNIT_INVALID.
     */
    get_signalUnit() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration == 0) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_SIGNALUNIT_INVALID;
                }
            }
            return _this6._signalUnit;
        })();
    }

    get_command() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this7._command;
        })();
    }

    set_command(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this8._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a temperature sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the temperature sensor
     *
     * @return {YTemperature} a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperature(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Temperature', func);
        if (obj == null) {
            obj = new YTemperature(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Temperature', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a temperature sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the temperature sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YTemperature.isOnline() to test if the temperature sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a temperature sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the temperature sensor
     *
     * @return {YTemperature} a YTemperature object allowing you to drive the temperature sensor.
     */
    static FindTemperatureInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Temperature', func);
        if (obj == null) {
            obj = new YTemperature(yctx, func);
            _yocto_api.YFunction._AddToCache('Temperature', func, obj);
        }
        return obj;
    }

    /**
     * Configure NTC thermistor parameters in order to properly compute the temperature from
     * the measured resistance. For increased precision, you can enter a complete mapping
     * table using set_thermistorResponseTable. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param res25 {number} : thermistor resistance at 25 degrees Celsius
     * @param beta {number} : Beta value
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntcParameters(res25, beta) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let t0;
            /** @type {number} **/
            let t1;
            /** @type {number} **/
            let res100;
            /** @type {number[]} **/
            let tempValues = [];
            /** @type {number[]} **/
            let resValues = [];
            t0 = 25.0 + 275.15;
            t1 = 100.0 + 275.15;
            res100 = res25 * Math.exp(beta * (1.0 / t1 - 1.0 / t0));
            tempValues.length = 0;
            resValues.length = 0;
            tempValues.push(25.0);
            resValues.push(res25);
            tempValues.push(100.0);
            resValues.push(res100);
            return yield _this9.set_thermistorResponseTable(tempValues, resValues);
        })();
    }

    /**
     * Records a thermistor response table, in order to interpolate the temperature from
     * the measured resistance. This function can only be used with a temperature
     * sensor based on thermistors.
     *
     * @param tempValues {number[]} : array of floating point numbers, corresponding to all
     *         temperatures (in degrees Celcius) for which the resistance of the
     *         thermistor is specified.
     * @param resValues {number[]} : array of floating point numbers, corresponding to the resistance
     *         values (in Ohms) for each of the temperature included in the first
     *         argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_thermistorResponseTable(tempValues, resValues) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let siz;
            /** @type {number} **/
            let res;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let found;
            /** @type {number} **/
            let prev;
            /** @type {number} **/
            let curr;
            /** @type {number} **/
            let currTemp;
            /** @type {number} **/
            let idxres;
            siz = tempValues.length;
            if (!(siz >= 2)) {
                return _this10._throw(_this10._yapi.INVALID_ARGUMENT, 'thermistor response table must have at least two points', _this10._yapi.INVALID_ARGUMENT);
            }
            if (!(siz == resValues.length)) {
                return _this10._throw(_this10._yapi.INVALID_ARGUMENT, 'table sizes mismatch', _this10._yapi.INVALID_ARGUMENT);
            }
            // may throw an exception
            res = yield _this10.set_command('Z');
            if (!(res == _this10._yapi.SUCCESS)) {
                return _this10._throw(_this10._yapi.IO_ERROR, 'unable to reset thermistor parameters', _this10._yapi.IO_ERROR);
            }
            // add records in growing resistance value
            found = 1;
            prev = 0.0;
            while (found > 0) {
                found = 0;
                curr = 99999999.0;
                currTemp = -999999.0;
                idx = 0;
                while (idx < siz) {
                    idxres = resValues[idx];
                    if (idxres > prev && idxres < curr) {
                        curr = idxres;
                        currTemp = tempValues[idx];
                        found = 1;
                    }
                    idx = idx + 1;
                }
                if (found > 0) {
                    res = yield _this10.set_command('m' + String(Math.round(Math.round(1000 * curr))) + ':' + String(Math.round(Math.round(1000 * currTemp))));
                    if (!(res == _this10._yapi.SUCCESS)) {
                        return _this10._throw(_this10._yapi.IO_ERROR, 'unable to reset thermistor parameters', _this10._yapi.IO_ERROR);
                    }
                    prev = curr;
                }
            }
            return _this10._yapi.SUCCESS;
        })();
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues {number[]} : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celcius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues {number[]} : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadThermistorResponseTable(tempValues, resValues) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let id;
            /** @type {Uint8Array} **/
            let bin_json;
            /** @type {string[]} **/
            let paramlist = [];
            /** @type {number[]} **/
            let templist = [];
            /** @type {number} **/
            let siz;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let temp;
            /** @type {number} **/
            let found;
            /** @type {number} **/
            let prev;
            /** @type {number} **/
            let curr;
            /** @type {number} **/
            let currRes;
            tempValues.length = 0;
            resValues.length = 0;
            // may throw an exception
            id = yield _this11.get_functionId();
            id = id.substr(11, id.length - 11);
            bin_json = yield _this11._download('extra.json?page=' + id);
            paramlist = _this11.imm_json_get_array(bin_json);
            // first convert all temperatures to float
            siz = paramlist.length >> 1;
            templist.length = 0;
            idx = 0;
            while (idx < siz) {
                temp = parseFloat(paramlist[2 * idx + 1]) / 1000.0;
                templist.push(temp);
                idx = idx + 1;
            }
            // then add records in growing temperature value
            tempValues.length = 0;
            resValues.length = 0;
            found = 1;
            prev = -999999.0;
            while (found > 0) {
                found = 0;
                curr = 999999.0;
                currRes = -999999.0;
                idx = 0;
                while (idx < siz) {
                    temp = templist[idx];
                    if (temp > prev && temp < curr) {
                        curr = temp;
                        currRes = parseFloat(paramlist[2 * idx]) / 1000.0;
                        found = 1;
                    }
                    idx = idx + 1;
                }
                if (found > 0) {
                    tempValues.push(curr);
                    resValues.push(currRes);
                    prev = curr;
                }
            }
            return _this11._yapi.SUCCESS;
        })();
    }

    /**
     * Continues the enumeration of temperature sensors started using yFirstTemperature().
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         a temperature sensor currently online, or a null pointer
     *         if there are no more temperature sensors to enumerate.
     */
    nextTemperature() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperature() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Temperature');
        if (next_hwid == null) return null;
        return YTemperature.FindTemperature(next_hwid);
    }

    /**
     * Starts the enumeration of temperature sensors currently accessible.
     * Use the method YTemperature.nextTemperature() to iterate on
     * next temperature sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YTemperature} a pointer to a YTemperature object, corresponding to
     *         the first temperature sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstTemperatureInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Temperature');
        if (next_hwid == null) return null;
        return YTemperature.FindTemperatureInContext(yctx, next_hwid);
    }

    //--- (end of YTemperature implementation)
}

exports.YTemperature = YTemperature; //
// YTemperatureProxy Class: synchronous proxy to YTemperature objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YTemperature objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YSensorProxy} **/

class YTemperatureProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YTemperature accessors declaration)

    /**
     * Changes the measuring unit for the measured temperature. That unit is a string.
     * If that strings end with the letter F all temperatures values will returned in
     * Fahrenheit degrees. If that String ends with the letter K all values will be
     * returned in Kelvin degrees. If that string ends with the letter C all values will be
     * returned in Celsius degrees.  If the string ends with any other character the
     * change will be ignored. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     * WARNING: if a specific calibration is defined for the temperature function, a
     * unit system change will probably break it.
     *
     * @param newval : a string corresponding to the measuring unit for the measured temperature
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
     * Returns the temperature sensor type.
     *
     * @return a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC and Y_SENSORTYPE_RES_LINEAR
     * corresponding to the temperature sensor type
     *
     * On failure, throws an exception or returns Y_SENSORTYPE_INVALID.
     */
    get_sensorType() {
        return this.liveFunc._sensorType;
    }

    /**
     * Modifies the temperature sensor type.  This function is used
     * to define the type of thermocouple (K,E...) used with the device.
     * It has no effect if module is using a digital sensor or a thermistor.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a value among Y_SENSORTYPE_DIGITAL, Y_SENSORTYPE_TYPE_K, Y_SENSORTYPE_TYPE_E,
     * Y_SENSORTYPE_TYPE_J, Y_SENSORTYPE_TYPE_N, Y_SENSORTYPE_TYPE_R, Y_SENSORTYPE_TYPE_S,
     * Y_SENSORTYPE_TYPE_T, Y_SENSORTYPE_PT100_4WIRES, Y_SENSORTYPE_PT100_3WIRES,
     * Y_SENSORTYPE_PT100_2WIRES, Y_SENSORTYPE_RES_OHM, Y_SENSORTYPE_RES_NTC and Y_SENSORTYPE_RES_LINEAR
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_sensorType(newval) {
        this.liveFunc.set_sensorType(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current value of the electrical signal measured by the sensor.
     *
     * @return a floating point number corresponding to the current value of the electrical signal
     * measured by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALVALUE_INVALID.
     */
    get_signalValue() {
        return this.liveFunc._signalValue;
    }

    /**
     * Returns the measuring unit of the electrical signal used by the sensor.
     *
     * @return a string corresponding to the measuring unit of the electrical signal used by the sensor
     *
     * On failure, throws an exception or returns Y_SIGNALUNIT_INVALID.
     */
    get_signalUnit() {
        return this.liveFunc._signalUnit;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Retrieves the thermistor response table previously configured using the
     * set_thermistorResponseTable function. This function can only be used with a
     * temperature sensor based on thermistors.
     *
     * @param tempValues : array of floating point numbers, that is filled by the function
     *         with all temperatures (in degrees Celcius) for which the resistance
     *         of the thermistor is specified.
     * @param resValues : array of floating point numbers, that is filled by the function
     *         with the value (in Ohms) for each of the temperature included in the
     *         first argument, index by index.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadThermistorResponseTable(tempValues, resValues) {
        this.liveFunc.loadThermistorResponseTable(tempValues, resValues);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YTemperature accessors declaration)
}

exports.YTemperatureProxy = YTemperatureProxy; //--- (Temperature functions)

/**
 * Retrieves a temperature sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the temperature sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YTemperature.isOnline() to test if the temperature sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a temperature sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the temperature sensor
 *
 * @return {YTemperature} a YTemperature object allowing you to drive the temperature sensor.
 */

function yFindTemperature(func) {
    return YTemperature.FindTemperature(func);
}

/**
 * Starts the enumeration of temperature sensors currently accessible.
 * Use the method YTemperature.nextTemperature() to iterate on
 * next temperature sensors.
 *
 * @return {YTemperature} a pointer to a YTemperature object, corresponding to
 *         the first temperature sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstTemperature() {
    return YTemperature.FirstTemperature();
}

//--- (end of Temperature functions)
