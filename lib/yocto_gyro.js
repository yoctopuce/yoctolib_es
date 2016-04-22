/*********************************************************************
 *
 * $Id: yocto_gyro.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Gyro functions
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
exports.YGyroProxy = exports.YGyro = exports.YQtProxy = exports.YQt = exports.Y_ZVALUE_INVALID = exports.Y_YVALUE_INVALID = exports.Y_XVALUE_INVALID = undefined;


//--- (generated code: YQt accessors declaration)
//--- (end of generated code: YQt accessors declaration)

let yInternalGyroCallback = function () {
    var ref = _asyncToGenerator(function* (YQt_obj, str_value) {
        var gyro = yield YQt_obj.get_userData();
        if (!gyro) return;
        var idx = parseInt(YQt_obj.imm_get_functionId().slice(2));
        gyro._invokeGyroCallbacks(idx, parseInt(str_value));
    });

    return function yInternalGyroCallback(_x, _x2) {
        return ref.apply(this, arguments);
    };
}();

//--- (generated code: YGyro class start)
/**
 * YGyro Class: Gyroscope function interface
 *
 * The YSensor class is the parent class for all Yoctopuce sensors. It can be
 * used to read the current value and unit of any sensor, read the min/max
 * value, configure autonomous recording frequency and access recorded data.
 * It also provide a function to register a callback invoked each time the
 * observed value changes, or at a predefined interval. Using this class rather
 * than a specific subclass makes it possible to create generic applications
 * that work with any Yoctopuce sensor, even those that do not yet exist.
 * Note: The YAnButton class is the only analog input which does not inherit
 * from YSensor.
 */
//--- (end of generated code: YGyro class start)


exports.yFindQt = yFindQt;
exports.yFirstQt = yFirstQt;
exports.yFindGyro = yFindGyro;
exports.yFirstGyro = yFirstGyro;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (generated code: YQt return codes)
//--- (end of generated code: YQt return codes)
//--- (generated code: YQt definitions)
//--- (end of generated code: YQt definitions)

//--- (generated code: YGyro return codes)
//--- (end of generated code: YGyro return codes)
//--- (generated code: YGyro definitions)
var Y_XVALUE_INVALID = exports.Y_XVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_YVALUE_INVALID = exports.Y_YVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_ZVALUE_INVALID = exports.Y_ZVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
//--- (end of generated code: YGyro definitions)

//--- (generated code: YQt class start)
/**
 * YQt Class: Quaternion interface
 *
 * The Yoctopuce API YQt class provides direct access to the Yocto3D attitude estimation
 * using a quaternion. It is usually not needed to use the YQt class directly, as the
 * YGyro class provides a more convenient higher-level interface.
 */
//--- (end of generated code: YQt class start)
class YQt extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YQt constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Qt';
        //--- (end of generated code: YQt constructor)
    }

    //--- (generated code: YQt implementation)

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
            var res = new YQtProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    /**
     * Retrieves a quaternion component for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quaternion component is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQt.isOnline() to test if the quaternion component is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quaternion component by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the quaternion component
     *
     * @return {YQt} a YQt object allowing you to drive the quaternion component.
     */
    static FindQt(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Qt', func);
        if (obj == null) {
            obj = new YQt(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Qt', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a quaternion component for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the quaternion component is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YQt.isOnline() to test if the quaternion component is
     * indeed online at a given time. In case of ambiguity when looking for
     * a quaternion component by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the quaternion component
     *
     * @return {YQt} a YQt object allowing you to drive the quaternion component.
     */
    static FindQtInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Qt', func);
        if (obj == null) {
            obj = new YQt(yctx, func);
            _yocto_api.YFunction._AddToCache('Qt', func, obj);
        }
        return obj;
    }

    /**
     * Continues the enumeration of quaternion components started using yFirstQt().
     *
     * @return {YQt} a pointer to a YQt object, corresponding to
     *         a quaternion component currently online, or a null pointer
     *         if there are no more quaternion components to enumerate.
     */
    nextQt() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YQt.FindQtInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of quaternion components currently accessible.
     * Use the method YQt.nextQt() to iterate on
     * next quaternion components.
     *
     * @return {YQt} a pointer to a YQt object, corresponding to
     *         the first quaternion component currently online, or a null pointer
     *         if there are none.
     */
    static FirstQt() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Qt');
        if (next_hwid == null) return null;
        return YQt.FindQt(next_hwid);
    }

    /**
     * Starts the enumeration of quaternion components currently accessible.
     * Use the method YQt.nextQt() to iterate on
     * next quaternion components.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YQt} a pointer to a YQt object, corresponding to
     *         the first quaternion component currently online, or a null pointer
     *         if there are none.
     */
    static FirstQtInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Qt');
        if (next_hwid == null) return null;
        return YQt.FindQtInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YQt implementation)
}

exports.YQt = YQt; //--- (generated code: Qt functions)

/**
 * Retrieves a quaternion component for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the quaternion component is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YQt.isOnline() to test if the quaternion component is
 * indeed online at a given time. In case of ambiguity when looking for
 * a quaternion component by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the quaternion component
 *
 * @return {YQt} a YQt object allowing you to drive the quaternion component.
 */

function yFindQt(func) {
    return YQt.FindQt(func);
}

/**
 * Starts the enumeration of quaternion components currently accessible.
 * Use the method YQt.nextQt() to iterate on
 * next quaternion components.
 *
 * @return {YQt} a pointer to a YQt object, corresponding to
 *         the first quaternion component currently online, or a null pointer
 *         if there are none.
 */
function yFirstQt() {
    return YQt.FirstQt();
}

//--- (end of generated code: Qt functions)

//
// YQtProxy Class: synchronous proxy to YQt objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YQt objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YQtProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }
}

exports.YQtProxy = YQtProxy;
class YGyro extends _yocto_api.YSensor {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YGyro constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Gyro';
        /** @member {number} **/
        this._xValue = Y_XVALUE_INVALID;
        /** @member {number} **/
        this._yValue = Y_YVALUE_INVALID;
        /** @member {number} **/
        this._zValue = Y_ZVALUE_INVALID;
        /** @member {number} **/
        this._qt_stamp = 0;
        /** @member {YQt} **/
        this._qt_w = null;
        /** @member {YQt} **/
        this._qt_x = null;
        /** @member {YQt} **/
        this._qt_y = null;
        /** @member {YQt} **/
        this._qt_z = null;
        /** @member {number} **/
        this._w = 0;
        /** @member {number} **/
        this._x = 0;
        /** @member {number} **/
        this._y = 0;
        /** @member {number} **/
        this._z = 0;
        /** @member {number} **/
        this._angles_stamp = 0;
        /** @member {number} **/
        this._head = 0;
        /** @member {number} **/
        this._pitch = 0;
        /** @member {number} **/
        this._roll = 0;
        /** @member {function} **/
        this._quatCallback = null;
        /** @member {function} **/
        this._anglesCallback = null;
        this.imm_setConst({
            XVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            YVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            ZVALUE_INVALID: _yocto_api.YAPI.INVALID_DOUBLE
        });
        //--- (end of generated code: YGyro constructor)
    }

    //--- (generated code: YGyro implementation)

    get_syncProxy() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                try {
                    yield _this2.load(_this2._yapi.defaultCacheValidity);
                } catch (e) {
                    // device might be offline
                }
            }
            var res = new YGyroProxy(_this2);
            yield res._asyncInit();
            res._module = yield (yield _this2.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'xValue':
                this._xValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'yValue':
                this._yValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'zValue':
                this._zValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the angular velocity around the X axis of the device, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the angular velocity around the X axis of
     * the device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.XVALUE_INVALID.
     */
    get_xValue() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_XVALUE_INVALID;
                }
            }
            return _this3._xValue;
        })();
    }

    /**
     * Returns the angular velocity around the Y axis of the device, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the angular velocity around the Y axis of
     * the device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.YVALUE_INVALID.
     */
    get_yValue() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_YVALUE_INVALID;
                }
            }
            return _this4._yValue;
        })();
    }

    /**
     * Returns the angular velocity around the Z axis of the device, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the angular velocity around the Z axis of
     * the device, as a floating point number
     *
     * On failure, throws an exception or returns YGyro.ZVALUE_INVALID.
     */
    get_zValue() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_ZVALUE_INVALID;
                }
            }
            return _this5._zValue;
        })();
    }

    /**
     * Retrieves a gyroscope for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the gyroscope is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGyro.isOnline() to test if the gyroscope is
     * indeed online at a given time. In case of ambiguity when looking for
     * a gyroscope by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the gyroscope
     *
     * @return {YGyro} a YGyro object allowing you to drive the gyroscope.
     */
    static FindGyro(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Gyro', func);
        if (obj == null) {
            obj = new YGyro(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Gyro', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a gyroscope for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the gyroscope is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YGyro.isOnline() to test if the gyroscope is
     * indeed online at a given time. In case of ambiguity when looking for
     * a gyroscope by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the gyroscope
     *
     * @return {YGyro} a YGyro object allowing you to drive the gyroscope.
     */
    static FindGyroInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Gyro', func);
        if (obj == null) {
            obj = new YGyro(yctx, func);
            _yocto_api.YFunction._AddToCache('Gyro', func, obj);
        }
        return obj;
    }

    _loadQuaternion() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let now_stamp;
            /** @type {number} **/
            let age_ms;
            now_stamp = _this6._yapi.GetTickCount() & 0x7FFFFFFF;
            age_ms = now_stamp - _this6._qt_stamp & 0x7FFFFFFF;
            if (age_ms >= 10 || _this6._qt_stamp == 0) {
                if ((yield _this6.load(10)) != _this6._yapi.SUCCESS) {
                    return _this6._yapi.DEVICE_NOT_FOUND;
                }
                if (_this6._qt_stamp == 0) {
                    _this6._qt_w = yield YQt.FindQtInContext(_this6._yapi, _this6._serial + '.qt1');
                    _this6._qt_x = yield YQt.FindQtInContext(_this6._yapi, _this6._serial + '.qt2');
                    _this6._qt_y = yield YQt.FindQtInContext(_this6._yapi, _this6._serial + '.qt3');
                    _this6._qt_z = yield YQt.FindQtInContext(_this6._yapi, _this6._serial + '.qt4');
                }
                if ((yield _this6._qt_w.load(9)) != _this6._yapi.SUCCESS) {
                    return _this6._yapi.DEVICE_NOT_FOUND;
                }
                if ((yield _this6._qt_x.load(9)) != _this6._yapi.SUCCESS) {
                    return _this6._yapi.DEVICE_NOT_FOUND;
                }
                if ((yield _this6._qt_y.load(9)) != _this6._yapi.SUCCESS) {
                    return _this6._yapi.DEVICE_NOT_FOUND;
                }
                if ((yield _this6._qt_z.load(9)) != _this6._yapi.SUCCESS) {
                    return _this6._yapi.DEVICE_NOT_FOUND;
                }
                _this6._w = yield _this6._qt_w.get_currentValue();
                _this6._x = yield _this6._qt_x.get_currentValue();
                _this6._y = yield _this6._qt_y.get_currentValue();
                _this6._z = yield _this6._qt_z.get_currentValue();
                _this6._qt_stamp = now_stamp;
            }
            return _this6._yapi.SUCCESS;
        })();
    }

    _loadAngles() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let sqw;
            /** @type {number} **/
            let sqx;
            /** @type {number} **/
            let sqy;
            /** @type {number} **/
            let sqz;
            /** @type {number} **/
            let norm;
            /** @type {number} **/
            let delta;
            // may throw an exception
            if ((yield _this7._loadQuaternion()) != _this7._yapi.SUCCESS) {
                return _this7._yapi.DEVICE_NOT_FOUND;
            }
            if (_this7._angles_stamp != _this7._qt_stamp) {
                sqw = _this7._w * _this7._w;
                sqx = _this7._x * _this7._x;
                sqy = _this7._y * _this7._y;
                sqz = _this7._z * _this7._z;
                norm = sqx + sqy + sqz + sqw;
                delta = _this7._y * _this7._w - _this7._x * _this7._z;
                if (delta > 0.499 * norm) {
                    _this7._pitch = 90.0;
                    _this7._head = Math.round(2.0 * 1800.0 / Math.PI * Math.atan2(_this7._x, _this7._w)) / 10.0;
                } else {
                    if (delta < -0.499 * norm) {
                        _this7._pitch = -90.0;
                        _this7._head = Math.round(-2.0 * 1800.0 / Math.PI * Math.atan2(_this7._x, _this7._w)) / 10.0;
                    } else {
                        _this7._roll = Math.round(1800.0 / Math.PI * Math.atan2(2.0 * (_this7._w * _this7._x + _this7._y * _this7._z), sqw - sqx - sqy + sqz)) / 10.0;
                        _this7._pitch = Math.round(1800.0 / Math.PI * Math.asin(2.0 * delta / norm)) / 10.0;
                        _this7._head = Math.round(1800.0 / Math.PI * Math.atan2(2.0 * (_this7._x * _this7._y + _this7._z * _this7._w), sqw + sqx - sqy - sqz)) / 10.0;
                    }
                }
                _this7._angles_stamp = _this7._qt_stamp;
            }
            return _this7._yapi.SUCCESS;
        })();
    }

    /**
     * Returns the estimated roll angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the roll angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return {number} a floating-point number corresponding to roll angle
     *         in degrees, between -180 and +180.
     */
    get_roll() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            yield _this8._loadAngles();
            return _this8._roll;
        })();
    }

    /**
     * Returns the estimated pitch angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the pitch angle can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return {number} a floating-point number corresponding to pitch angle
     *         in degrees, between -90 and +90.
     */
    get_pitch() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            yield _this9._loadAngles();
            return _this9._pitch;
        })();
    }

    /**
     * Returns the estimated heading angle, based on the integration of
     * gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     * The axis corresponding to the heading can be mapped to any
     * of the device X, Y or Z physical directions using methods of
     * the class YRefFrame.
     *
     * @return {number} a floating-point number corresponding to heading
     *         in degrees, between 0 and 360.
     */
    get_heading() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            yield _this10._loadAngles();
            return _this10._head;
        })();
    }

    /**
     * Returns the w component (real part) of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements.
     *
     * @return {number} a floating-point number corresponding to the w
     *         component of the quaternion.
     */
    get_quaternionW() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            yield _this11._loadQuaternion();
            return _this11._w;
        })();
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with rotations on the roll axis.
     *
     * @return {number} a floating-point number corresponding to the x
     *         component of the quaternion.
     */
    get_quaternionX() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            yield _this12._loadQuaternion();
            return _this12._x;
        })();
    }

    /**
     * Returns the y component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The y component is
     * mostly correlated with rotations on the pitch axis.
     *
     * @return {number} a floating-point number corresponding to the y
     *         component of the quaternion.
     */
    get_quaternionY() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            yield _this13._loadQuaternion();
            return _this13._y;
        })();
    }

    /**
     * Returns the x component of the quaternion
     * describing the device estimated orientation, based on the
     * integration of gyroscopic measures combined with acceleration and
     * magnetic field measurements. The x component is
     * mostly correlated with changes of heading.
     *
     * @return {number} a floating-point number corresponding to the z
     *         component of the quaternion.
     */
    get_quaternionZ() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            yield _this14._loadQuaternion();
            return _this14._z;
        })();
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to invoke, or a null pointer.
     *         The callback function should take five arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the four components w, x, y and z
     *         (as floating-point numbers).
     * @noreturn
     */
    registerQuaternionCallback(callback) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            _this15._quatCallback = callback;
            if (callback != null) {
                if ((yield _this15._loadQuaternion()) != _this15._yapi.SUCCESS) {
                    return _this15._yapi.DEVICE_NOT_FOUND;
                }
                yield _this15._qt_w.set_userData(_this15);
                yield _this15._qt_x.set_userData(_this15);
                yield _this15._qt_y.set_userData(_this15);
                yield _this15._qt_z.set_userData(_this15);
                yield _this15._qt_w.registerValueCallback(yInternalGyroCallback);
                yield _this15._qt_x.registerValueCallback(yInternalGyroCallback);
                yield _this15._qt_y.registerValueCallback(yInternalGyroCallback);
                yield _this15._qt_z.registerValueCallback(yInternalGyroCallback);
            } else {
                if (!(_this15._anglesCallback != null)) {
                    yield _this15._qt_w.registerValueCallback(null);
                    yield _this15._qt_x.registerValueCallback(null);
                    yield _this15._qt_y.registerValueCallback(null);
                    yield _this15._qt_z.registerValueCallback(null);
                }
            }
            return 0;
        })();
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to invoke, or a null pointer.
     *         The callback function should take four arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the three angles roll, pitch and heading
     *         in degrees (as floating-point numbers).
     * @noreturn
     */
    registerAnglesCallback(callback) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            _this16._anglesCallback = callback;
            if (callback != null) {
                if ((yield _this16._loadQuaternion()) != _this16._yapi.SUCCESS) {
                    return _this16._yapi.DEVICE_NOT_FOUND;
                }
                yield _this16._qt_w.set_userData(_this16);
                yield _this16._qt_x.set_userData(_this16);
                yield _this16._qt_y.set_userData(_this16);
                yield _this16._qt_z.set_userData(_this16);
                yield _this16._qt_w.registerValueCallback(yInternalGyroCallback);
                yield _this16._qt_x.registerValueCallback(yInternalGyroCallback);
                yield _this16._qt_y.registerValueCallback(yInternalGyroCallback);
                yield _this16._qt_z.registerValueCallback(yInternalGyroCallback);
            } else {
                if (!(_this16._quatCallback != null)) {
                    yield _this16._qt_w.registerValueCallback(null);
                    yield _this16._qt_x.registerValueCallback(null);
                    yield _this16._qt_y.registerValueCallback(null);
                    yield _this16._qt_z.registerValueCallback(null);
                }
            }
            return 0;
        })();
    }

    _invokeGyroCallbacks(qtIndex, qtValue) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            switch (qtIndex - 1) {
                case 0:
                    _this17._w = qtValue;
                    break;
                case 1:
                    _this17._x = qtValue;
                    break;
                case 2:
                    _this17._y = qtValue;
                    break;
                case 3:
                    _this17._z = qtValue;
                    break;
            }
            if (qtIndex < 4) {
                return 0;
            }
            _this17._qt_stamp = _this17._yapi.GetTickCount() & 0x7FFFFFFF;
            if (_this17._quatCallback != null) {
                yield _this17._quatCallback(_this17, _this17._w, _this17._x, _this17._y, _this17._z);
            }
            if (_this17._anglesCallback != null) {
                yield _this17._loadAngles();
                yield _this17._anglesCallback(_this17, _this17._roll, _this17._pitch, _this17._head);
            }
            return 0;
        })();
    }

    /**
     * Continues the enumeration of gyroscopes started using yFirstGyro().
     *
     * @return {YGyro} a pointer to a YGyro object, corresponding to
     *         a gyroscope currently online, or a null pointer
     *         if there are no more gyroscopes to enumerate.
     */
    nextGyro() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YGyro.FindGyroInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of gyroscopes currently accessible.
     * Use the method YGyro.nextGyro() to iterate on
     * next gyroscopes.
     *
     * @return {YGyro} a pointer to a YGyro object, corresponding to
     *         the first gyro currently online, or a null pointer
     *         if there are none.
     */
    static FirstGyro() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Gyro');
        if (next_hwid == null) return null;
        return YGyro.FindGyro(next_hwid);
    }

    /**
     * Starts the enumeration of gyroscopes currently accessible.
     * Use the method YGyro.nextGyro() to iterate on
     * next gyroscopes.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YGyro} a pointer to a YGyro object, corresponding to
     *         the first gyro currently online, or a null pointer
     *         if there are none.
     */
    static FirstGyroInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Gyro');
        if (next_hwid == null) return null;
        return YGyro.FindGyroInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YGyro implementation)
}

exports.YGyro = YGyro; //--- (generated code: Gyro functions)

/**
 * Retrieves a gyroscope for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the gyroscope is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YGyro.isOnline() to test if the gyroscope is
 * indeed online at a given time. In case of ambiguity when looking for
 * a gyroscope by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the gyroscope
 *
 * @return {YGyro} a YGyro object allowing you to drive the gyroscope.
 */

function yFindGyro(func) {
    return YGyro.FindGyro(func);
}

/**
 * Starts the enumeration of gyroscopes currently accessible.
 * Use the method YGyro.nextGyro() to iterate on
 * next gyroscopes.
 *
 * @return {YGyro} a pointer to a YGyro object, corresponding to
 *         the first gyro currently online, or a null pointer
 *         if there are none.
 */
function yFirstGyro() {
    return YGyro.FirstGyro();
}

//--- (end of generated code: Gyro functions)

//
// YGyroProxy Class: synchronous proxy to YGyro objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YGyro objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/
class YGyroProxy extends _yocto_api.YSensorProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (generated code: YGyro accessors declaration)

    /**
     * Returns the angular velocity around the X axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the X axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns Y_XVALUE_INVALID.
     */
    get_xValue() {
        return this.liveFunc._xValue;
    }

    /**
     * Returns the angular velocity around the Y axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the Y axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns Y_YVALUE_INVALID.
     */
    get_yValue() {
        return this.liveFunc._yValue;
    }

    /**
     * Returns the angular velocity around the Z axis of the device, as a floating point number.
     *
     * @return a floating point number corresponding to the angular velocity around the Z axis of the
     * device, as a floating point number
     *
     * On failure, throws an exception or returns Y_ZVALUE_INVALID.
     */
    get_zValue() {
        return this.liveFunc._zValue;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take five arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the four components w, x, y and z
     *         (as floating-point numbers).
     * @noreturn
     */
    registerQuaternionCallback(callback) {
        this.liveFunc.registerQuaternionCallback(callback);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Registers a callback function that will be invoked each time that the estimated
     * device orientation has changed. The call frequency is typically around 95Hz during a move.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered.
     * For good responsiveness, remember to call one of these two functions periodically.
     * To unregister a callback, pass a null pointer as argument.
     *
     * @param callback : the callback function to invoke, or a null pointer.
     *         The callback function should take four arguments:
     *         the YGyro object of the turning device, and the floating
     *         point values of the three angles roll, pitch and heading
     *         in degrees (as floating-point numbers).
     * @noreturn
     */
    registerAnglesCallback(callback) {
        this.liveFunc.registerAnglesCallback(callback);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YGyro accessors declaration)
}
exports.YGyroProxy = YGyroProxy;
