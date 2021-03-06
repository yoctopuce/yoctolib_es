/*********************************************************************
 *
 * $Id: yocto_refframe.js 27279 2017-04-25 15:42:35Z seb $
 *
 * Implements the high-level API for RefFrame functions
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
exports.YRefFrameProxy = exports.YRefFrame = exports.Y_CALIBRATIONPARAM_INVALID = exports.Y_BEARING_INVALID = exports.Y_MOUNTPOS_INVALID = exports.Y_MOUNTORIENTATION_INVALID = exports.Y_MOUNTORIENTATION_NINE = exports.Y_MOUNTORIENTATION_SIX = exports.Y_MOUNTORIENTATION_THREE = exports.Y_MOUNTORIENTATION_TWELVE = exports.Y_MOUNTPOSITION_INVALID = exports.Y_MOUNTPOSITION_LEFT = exports.Y_MOUNTPOSITION_RIGHT = exports.Y_MOUNTPOSITION_REAR = exports.Y_MOUNTPOSITION_FRONT = exports.Y_MOUNTPOSITION_TOP = exports.Y_MOUNTPOSITION_BOTTOM = undefined;
exports.yFindRefFrame = yFindRefFrame;
exports.yFirstRefFrame = yFirstRefFrame;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YRefFrame return codes)
//--- (end of YRefFrame return codes)
//--- (YRefFrame definitions)
var Y_MOUNTPOSITION_BOTTOM = exports.Y_MOUNTPOSITION_BOTTOM = 0;
var Y_MOUNTPOSITION_TOP = exports.Y_MOUNTPOSITION_TOP = 1;
var Y_MOUNTPOSITION_FRONT = exports.Y_MOUNTPOSITION_FRONT = 2;
var Y_MOUNTPOSITION_REAR = exports.Y_MOUNTPOSITION_REAR = 3;
var Y_MOUNTPOSITION_RIGHT = exports.Y_MOUNTPOSITION_RIGHT = 4;
var Y_MOUNTPOSITION_LEFT = exports.Y_MOUNTPOSITION_LEFT = 5;
var Y_MOUNTPOSITION_INVALID = exports.Y_MOUNTPOSITION_INVALID = 6;
var Y_MOUNTORIENTATION_TWELVE = exports.Y_MOUNTORIENTATION_TWELVE = 0;
var Y_MOUNTORIENTATION_THREE = exports.Y_MOUNTORIENTATION_THREE = 1;
var Y_MOUNTORIENTATION_SIX = exports.Y_MOUNTORIENTATION_SIX = 2;
var Y_MOUNTORIENTATION_NINE = exports.Y_MOUNTORIENTATION_NINE = 3;
var Y_MOUNTORIENTATION_INVALID = exports.Y_MOUNTORIENTATION_INVALID = 4;
var Y_MOUNTPOS_INVALID = exports.Y_MOUNTPOS_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_BEARING_INVALID = exports.Y_BEARING_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
var Y_CALIBRATIONPARAM_INVALID = exports.Y_CALIBRATIONPARAM_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YRefFrame definitions)

//--- (YRefFrame class start)
/**
 * YRefFrame Class: Reference frame configuration
 *
 * This class is used to setup the base orientation of the Yocto-3D, so that
 * the orientation functions, relative to the earth surface plane, use
 * the proper reference frame. The class also implements a tridimensional
 * sensor calibration process, which can compensate for local variations
 * of standard gravity and improve the precision of the tilt sensors.
 */
//--- (end of YRefFrame class start)

class YRefFrame extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YRefFrame constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'RefFrame';
        /** @member {number} **/
        this._mountPos = Y_MOUNTPOS_INVALID;
        /** @member {number} **/
        this._bearing = Y_BEARING_INVALID;
        /** @member {string} **/
        this._calibrationParam = Y_CALIBRATIONPARAM_INVALID;
        /** @member {boolean} **/
        this._calibV2 = 0;
        /** @member {number} **/
        this._calibStage = 0;
        /** @member {string} **/
        this._calibStageHint = '';
        /** @member {number} **/
        this._calibStageProgress = 0;
        /** @member {number} **/
        this._calibProgress = 0;
        /** @member {string} **/
        this._calibLogMsg = '';
        /** @member {string} **/
        this._calibSavedParams = '';
        /** @member {number} **/
        this._calibCount = 0;
        /** @member {number} **/
        this._calibInternalPos = 0;
        /** @member {number} **/
        this._calibPrevTick = 0;
        /** @member {number[]} **/
        this._calibOrient = [];
        /** @member {number[]} **/
        this._calibDataAccX = [];
        /** @member {number[]} **/
        this._calibDataAccY = [];
        /** @member {number[]} **/
        this._calibDataAccZ = [];
        /** @member {number[]} **/
        this._calibDataAcc = [];
        /** @member {number} **/
        this._calibAccXOfs = 0;
        /** @member {number} **/
        this._calibAccYOfs = 0;
        /** @member {number} **/
        this._calibAccZOfs = 0;
        /** @member {number} **/
        this._calibAccXScale = 0;
        /** @member {number} **/
        this._calibAccYScale = 0;
        /** @member {number} **/
        this._calibAccZScale = 0;
        this.imm_setConst({
            MOUNTPOS_INVALID: _yocto_api.YAPI.INVALID_UINT,
            BEARING_INVALID: _yocto_api.YAPI.INVALID_DOUBLE,
            CALIBRATIONPARAM_INVALID: _yocto_api.YAPI.INVALID_STRING,
            MOUNTPOSITION_BOTTOM: 0,
            MOUNTPOSITION_TOP: 1,
            MOUNTPOSITION_FRONT: 2,
            MOUNTPOSITION_REAR: 3,
            MOUNTPOSITION_RIGHT: 4,
            MOUNTPOSITION_LEFT: 5,
            MOUNTPOSITION_INVALID: 6,
            MOUNTORIENTATION_TWELVE: 0,
            MOUNTORIENTATION_THREE: 1,
            MOUNTORIENTATION_SIX: 2,
            MOUNTORIENTATION_NINE: 3,
            MOUNTORIENTATION_INVALID: 4
        });
        //--- (end of YRefFrame constructor)
    }

    //--- (YRefFrame implementation)

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
            var res = new YRefFrameProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'mountPos':
                this._mountPos = parseInt(val);
                return 1;
            case 'bearing':
                this._bearing = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'calibrationParam':
                this._calibrationParam = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    get_mountPos() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_MOUNTPOS_INVALID;
                }
            }
            res = _this2._mountPos;
            return res;
        })();
    }

    set_mountPos(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('mountPos', rest_val);
        })();
    }

    /**
     * Changes the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * For instance, if you setup as reference bearing the value of the earth
     * magnetic declination, the compass will provide the orientation relative
     * to the geographic North.
     *
     * Similarly, when the sensor is not mounted along the standard directions
     * because it has an additional yaw angle, you can set this angle in the reference
     * bearing so that the compass provides the expected natural direction.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval {number} : a floating point number corresponding to the reference bearing used by the compass
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bearing(newval) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this4._setAttr('bearing', rest_val);
        })();
    }

    /**
     * Returns the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * @return {number} a floating point number corresponding to the reference bearing used by the compass
     *
     * On failure, throws an exception or returns YRefFrame.BEARING_INVALID.
     */
    get_bearing() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_BEARING_INVALID;
                }
            }
            res = _this5._bearing;
            return res;
        })();
    }

    get_calibrationParam() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_CALIBRATIONPARAM_INVALID;
                }
            }
            res = _this6._calibrationParam;
            return res;
        })();
    }

    set_calibrationParam(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this7._setAttr('calibrationParam', rest_val);
        })();
    }

    /**
     * Retrieves a reference frame for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the reference frame is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRefFrame.isOnline() to test if the reference frame is
     * indeed online at a given time. In case of ambiguity when looking for
     * a reference frame by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the reference frame
     *
     * @return {YRefFrame} a YRefFrame object allowing you to drive the reference frame.
     */
    static FindRefFrame(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('RefFrame', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a reference frame for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the reference frame is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YRefFrame.isOnline() to test if the reference frame is
     * indeed online at a given time. In case of ambiguity when looking for
     * a reference frame by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the reference frame
     *
     * @return {YRefFrame} a YRefFrame object allowing you to drive the reference frame.
     */
    static FindRefFrameInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'RefFrame', func);
        if (obj == null) {
            obj = new YRefFrame(yctx, func);
            _yocto_api.YFunction._AddToCache('RefFrame', func, obj);
        }
        return obj;
    }

    /**
     * Returns the installation position of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return {MOUNTPOSITION} a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,   YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     *
     * On failure, throws an exception or returns YRefFrame.MOUNTPOSITION_INVALID.
     */
    get_mountPosition() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let position;
            position = yield _this8.get_mountPos();
            if (position < 0) {
                return Y_MOUNTPOSITION_INVALID;
            }
            return position >> 2;
        })();
    }

    /**
     * Returns the installation orientation of the device, as configured
     * in order to define the reference frame for the compass and the
     * pitch/roll tilt sensors.
     *
     * @return {MOUNTORIENTATION} a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * On failure, throws an exception or returns YRefFrame.MOUNTORIENTATION_INVALID.
     */
    get_mountOrientation() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let position;
            position = yield _this9.get_mountPos();
            if (position < 0) {
                return Y_MOUNTORIENTATION_INVALID;
            }
            return position & 3;
        })();
    }

    /**
     * Changes the compass and tilt sensor frame of reference. The magnetic compass
     * and the tilt sensors (pitch and roll) naturally work in the plane
     * parallel to the earth surface. In case the device is not installed upright
     * and horizontally, you must select its reference orientation (parallel to
     * the earth surface) so that the measures are made relative to this position.
     *
     * @param position {MOUNTPOSITION} : a value among the YRefFrame.MOUNTPOSITION enumeration
     *         (YRefFrame.MOUNTPOSITION_BOTTOM,   YRefFrame.MOUNTPOSITION_TOP,
     *         YRefFrame.MOUNTPOSITION_FRONT,    YRefFrame.MOUNTPOSITION_RIGHT,
     *         YRefFrame.MOUNTPOSITION_REAR,     YRefFrame.MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * @param orientation {MOUNTORIENTATION} : a value among the enumeration YRefFrame.MOUNTORIENTATION
     *         (YRefFrame.MOUNTORIENTATION_TWELVE, YRefFrame.MOUNTORIENTATION_THREE,
     *         YRefFrame.MOUNTORIENTATION_SIX,     YRefFrame.MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mountPosition(position, orientation) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let mixedPos;
            mixedPos = (position << 2) + orientation;
            return yield _this10.set_mountPos(mixedPos);
        })();
    }

    /**
     * Returns the 3D sensor calibration state (Yocto-3D-V2 only). This function returns
     * an integer representing the calibration state of the 3 inertial sensors of
     * the BNO055 chip, found in the Yocto-3D-V2. Hundredths show the calibration state
     * of the accelerometer, tenths show the calibration state of the magnetometer while
     * units show the calibration state of the gyroscope. For each sensor, the value 0
     * means no calibration and the value 3 means full calibration.
     *
     * @return {number} an integer representing the calibration state of Yocto-3D-V2:
     *         333 when fully calibrated, 0 when not calibrated at all.
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_calibrationState() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let calibParam;
            /** @type {number[]} **/
            let iCalib = [];
            /** @type {number} **/
            let caltyp;
            /** @type {number} **/
            let res;

            calibParam = yield _this11.get_calibrationParam();
            iCalib = _this11._yapi.imm_decodeFloats(calibParam);
            caltyp = parseInt(iCalib[0] / 1000, 10);
            if (caltyp != 33) {
                return _this11._yapi.NOT_SUPPORTED;
            }
            res = parseInt(iCalib[1] / 1000, 10);
            return res;
        })();
    }

    /**
     * Returns estimated quality of the orientation (Yocto-3D-V2 only). This function returns
     * an integer between 0 and 3 representing the degree of confidence of the position
     * estimate. When the value is 3, the estimation is reliable. Below 3, one should
     * expect sudden corrections, in particular for heading (compass function).
     * The most frequent causes for values below 3 are magnetic interferences, and
     * accelerations or rotations beyond the sensor range.
     *
     * @return {number} an integer between 0 and 3 (3 when the measure is reliable)
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_measureQuality() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let calibParam;
            /** @type {number[]} **/
            let iCalib = [];
            /** @type {number} **/
            let caltyp;
            /** @type {number} **/
            let res;

            calibParam = yield _this12.get_calibrationParam();
            iCalib = _this12._yapi.imm_decodeFloats(calibParam);
            caltyp = parseInt(iCalib[0] / 1000, 10);
            if (caltyp != 33) {
                return _this12._yapi.NOT_SUPPORTED;
            }
            res = parseInt(iCalib[2] / 1000, 10);
            return res;
        })();
    }

    _calibSort(start, stopidx) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let changed;
            /** @type {number} **/
            let a;
            /** @type {number} **/
            let b;
            /** @type {number} **/
            let xa;
            /** @type {number} **/
            let xb;
            // bubble sort is good since we will re-sort again after offset adjustment
            changed = 1;
            while (changed > 0) {
                changed = 0;
                a = _this13._calibDataAcc[start];
                idx = start + 1;
                while (idx < stopidx) {
                    b = _this13._calibDataAcc[idx];
                    if (a > b) {
                        _this13._calibDataAcc[idx - 1] = b;
                        _this13._calibDataAcc[idx] = a;
                        xa = _this13._calibDataAccX[idx - 1];
                        xb = _this13._calibDataAccX[idx];
                        _this13._calibDataAccX[idx - 1] = xb;
                        _this13._calibDataAccX[idx] = xa;
                        xa = _this13._calibDataAccY[idx - 1];
                        xb = _this13._calibDataAccY[idx];
                        _this13._calibDataAccY[idx - 1] = xb;
                        _this13._calibDataAccY[idx] = xa;
                        xa = _this13._calibDataAccZ[idx - 1];
                        xb = _this13._calibDataAccZ[idx];
                        _this13._calibDataAccZ[idx - 1] = xb;
                        _this13._calibDataAccZ[idx] = xa;
                        changed = changed + 1;
                    } else {
                        a = b;
                    }
                    idx = idx + 1;
                }
            }
            return 0;
        })();
    }

    /**
     * Initiates the sensors tridimensional calibration process.
     * This calibration is used at low level for inertial position estimation
     * and to enhance the precision of the tilt sensors.
     *
     * After calling this method, the device should be moved according to the
     * instructions provided by method get_3DCalibrationHint,
     * and more3DCalibration should be invoked about 5 times per second.
     * The calibration procedure is completed when the method
     * get_3DCalibrationProgress returns 100. At this point,
     * the computed calibration parameters can be applied using method
     * save3DCalibration. The calibration process can be canceled
     * at any time using method cancel3DCalibration.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    start3DCalibration() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (!(yield _this14.isOnline())) {
                return _this14._yapi.DEVICE_NOT_FOUND;
            }
            if (_this14._calibStage != 0) {
                yield _this14.cancel3DCalibration();
            }
            _this14._calibSavedParams = yield _this14.get_calibrationParam();
            _this14._calibV2 = _this14._yapi.imm_atoi(_this14._calibSavedParams) == 33;
            yield _this14.set_calibrationParam('0');
            _this14._calibCount = 50;
            _this14._calibStage = 1;
            _this14._calibStageHint = 'Set down the device on a steady horizontal surface';
            _this14._calibStageProgress = 0;
            _this14._calibProgress = 1;
            _this14._calibInternalPos = 0;
            _this14._calibPrevTick = _this14._yapi.GetTickCount() & 0x7FFFFFFF;
            _this14._calibOrient.length = 0;
            _this14._calibDataAccX.length = 0;
            _this14._calibDataAccY.length = 0;
            _this14._calibDataAccZ.length = 0;
            _this14._calibDataAcc.length = 0;
            return _this14._yapi.SUCCESS;
        })();
    }

    /**
     * Continues the sensors tridimensional calibration process previously
     * initiated using method start3DCalibration.
     * This method should be called approximately 5 times per second, while
     * positioning the device according to the instructions provided by method
     * get_3DCalibrationHint. Note that the instructions change during
     * the calibration process.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    more3DCalibration() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._calibV2) {
                return yield _this15.more3DCalibrationV2();
            }
            return yield _this15.more3DCalibrationV1();
        })();
    }

    more3DCalibrationV1() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currTick;
            /** @type {Uint8Array} **/
            let jsonData;
            /** @type {number} **/
            let xVal;
            /** @type {number} **/
            let yVal;
            /** @type {number} **/
            let zVal;
            /** @type {number} **/
            let xSq;
            /** @type {number} **/
            let ySq;
            /** @type {number} **/
            let zSq;
            /** @type {number} **/
            let norm;
            /** @type {number} **/
            let orient;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let intpos;
            /** @type {number} **/
            let err;
            // make sure calibration has been started
            if (_this16._calibStage == 0) {
                return _this16._yapi.INVALID_ARGUMENT;
            }
            if (_this16._calibProgress == 100) {
                return _this16._yapi.SUCCESS;
            }
            // make sure we leave at least 160ms between samples
            currTick = _this16._yapi.GetTickCount() & 0x7FFFFFFF;
            if ((currTick - _this16._calibPrevTick & 0x7FFFFFFF) < 160) {
                return _this16._yapi.SUCCESS;
            }
            // load current accelerometer values, make sure we are on a straight angle
            // (default timeout to 0,5 sec without reading measure when out of range)
            _this16._calibStageHint = 'Set down the device on a steady horizontal surface';
            _this16._calibPrevTick = currTick + 500 & 0x7FFFFFFF;
            jsonData = yield _this16._download('api/accelerometer.json');
            xVal = _this16._yapi.imm_atoi(_this16.imm_json_get_key(jsonData, 'xValue')) / 65536.0;
            yVal = _this16._yapi.imm_atoi(_this16.imm_json_get_key(jsonData, 'yValue')) / 65536.0;
            zVal = _this16._yapi.imm_atoi(_this16.imm_json_get_key(jsonData, 'zValue')) / 65536.0;
            xSq = xVal * xVal;
            if (xSq >= 0.04 && xSq < 0.64) {
                return _this16._yapi.SUCCESS;
            }
            if (xSq >= 1.44) {
                return _this16._yapi.SUCCESS;
            }
            ySq = yVal * yVal;
            if (ySq >= 0.04 && ySq < 0.64) {
                return _this16._yapi.SUCCESS;
            }
            if (ySq >= 1.44) {
                return _this16._yapi.SUCCESS;
            }
            zSq = zVal * zVal;
            if (zSq >= 0.04 && zSq < 0.64) {
                return _this16._yapi.SUCCESS;
            }
            if (zSq >= 1.44) {
                return _this16._yapi.SUCCESS;
            }
            norm = Math.sqrt(xSq + ySq + zSq);
            if (norm < 0.8 || norm > 1.2) {
                return _this16._yapi.SUCCESS;
            }
            _this16._calibPrevTick = currTick;
            // Determine the device orientation index
            orient = 0;
            if (zSq > 0.5) {
                if (zVal > 0) {
                    orient = 0;
                } else {
                    orient = 1;
                }
            }
            if (xSq > 0.5) {
                if (xVal > 0) {
                    orient = 2;
                } else {
                    orient = 3;
                }
            }
            if (ySq > 0.5) {
                if (yVal > 0) {
                    orient = 4;
                } else {
                    orient = 5;
                }
            }
            // Discard measures that are not in the proper orientation
            if (_this16._calibStageProgress == 0) {
                // New stage, check that this orientation is not yet done
                idx = 0;
                err = 0;
                while (idx + 1 < _this16._calibStage) {
                    if (_this16._calibOrient[idx] == orient) {
                        err = 1;
                    }
                    idx = idx + 1;
                }
                if (err != 0) {
                    _this16._calibStageHint = 'Turn the device on another face';
                    return _this16._yapi.SUCCESS;
                }
                _this16._calibOrient.push(orient);
            } else {
                // Make sure device is not turned before stage is completed
                if (orient != _this16._calibOrient[_this16._calibStage - 1]) {
                    _this16._calibStageHint = 'Not yet done, please move back to the previous face';
                    return _this16._yapi.SUCCESS;
                }
            }
            // Save measure
            _this16._calibStageHint = 'calibrating..';
            _this16._calibDataAccX.push(xVal);
            _this16._calibDataAccY.push(yVal);
            _this16._calibDataAccZ.push(zVal);
            _this16._calibDataAcc.push(norm);
            _this16._calibInternalPos = _this16._calibInternalPos + 1;
            _this16._calibProgress = 1 + 16 * (_this16._calibStage - 1) + parseInt(16 * _this16._calibInternalPos / _this16._calibCount, 10);
            if (_this16._calibInternalPos < _this16._calibCount) {
                _this16._calibStageProgress = 1 + parseInt(99 * _this16._calibInternalPos / _this16._calibCount, 10);
                return _this16._yapi.SUCCESS;
            }
            // Stage done, compute preliminary result
            intpos = (_this16._calibStage - 1) * _this16._calibCount;
            yield _this16._calibSort(intpos, intpos + _this16._calibCount);
            intpos = intpos + parseInt(_this16._calibCount / 2, 10);
            _this16._calibLogMsg = 'Stage ' + String(Math.round(_this16._calibStage)) + ': median is ' + String(Math.round(Math.round(1000 * _this16._calibDataAccX[intpos]))) + ',' + String(Math.round(Math.round(1000 * _this16._calibDataAccY[intpos]))) + ',' + String(Math.round(Math.round(1000 * _this16._calibDataAccZ[intpos])));
            // move to next stage
            _this16._calibStage = _this16._calibStage + 1;
            if (_this16._calibStage < 7) {
                _this16._calibStageHint = 'Turn the device on another face';
                _this16._calibPrevTick = currTick + 500 & 0x7FFFFFFF;
                _this16._calibStageProgress = 0;
                _this16._calibInternalPos = 0;
                return _this16._yapi.SUCCESS;
            }
            // Data collection completed, compute accelerometer shift
            xVal = 0;
            yVal = 0;
            zVal = 0;
            idx = 0;
            while (idx < 6) {
                intpos = idx * _this16._calibCount + parseInt(_this16._calibCount / 2, 10);
                orient = _this16._calibOrient[idx];
                if (orient == 0 || orient == 1) {
                    zVal = zVal + _this16._calibDataAccZ[intpos];
                }
                if (orient == 2 || orient == 3) {
                    xVal = xVal + _this16._calibDataAccX[intpos];
                }
                if (orient == 4 || orient == 5) {
                    yVal = yVal + _this16._calibDataAccY[intpos];
                }
                idx = idx + 1;
            }
            _this16._calibAccXOfs = xVal / 2.0;
            _this16._calibAccYOfs = yVal / 2.0;
            _this16._calibAccZOfs = zVal / 2.0;
            // Recompute all norms, taking into account the computed shift, and re-sort
            intpos = 0;
            while (intpos < _this16._calibDataAcc.length) {
                xVal = _this16._calibDataAccX[intpos] - _this16._calibAccXOfs;
                yVal = _this16._calibDataAccY[intpos] - _this16._calibAccYOfs;
                zVal = _this16._calibDataAccZ[intpos] - _this16._calibAccZOfs;
                norm = Math.sqrt(xVal * xVal + yVal * yVal + zVal * zVal);
                _this16._calibDataAcc[intpos] = norm;
                intpos = intpos + 1;
            }
            idx = 0;
            while (idx < 6) {
                intpos = idx * _this16._calibCount;
                yield _this16._calibSort(intpos, intpos + _this16._calibCount);
                idx = idx + 1;
            }
            // Compute the scaling factor for each axis
            xVal = 0;
            yVal = 0;
            zVal = 0;
            idx = 0;
            while (idx < 6) {
                intpos = idx * _this16._calibCount + parseInt(_this16._calibCount / 2, 10);
                orient = _this16._calibOrient[idx];
                if (orient == 0 || orient == 1) {
                    zVal = zVal + _this16._calibDataAcc[intpos];
                }
                if (orient == 2 || orient == 3) {
                    xVal = xVal + _this16._calibDataAcc[intpos];
                }
                if (orient == 4 || orient == 5) {
                    yVal = yVal + _this16._calibDataAcc[intpos];
                }
                idx = idx + 1;
            }
            _this16._calibAccXScale = xVal / 2.0;
            _this16._calibAccYScale = yVal / 2.0;
            _this16._calibAccZScale = zVal / 2.0;
            // Report completion
            _this16._calibProgress = 100;
            _this16._calibStageHint = 'Calibration data ready for saving';
            return _this16._yapi.SUCCESS;
        })();
    }

    more3DCalibrationV2() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let currTick;
            /** @type {Uint8Array} **/
            let calibParam;
            /** @type {number[]} **/
            let iCalib = [];
            /** @type {number} **/
            let cal3;
            /** @type {number} **/
            let calAcc;
            /** @type {number} **/
            let calMag;
            /** @type {number} **/
            let calGyr;
            // make sure calibration has been started
            if (_this17._calibStage == 0) {
                return _this17._yapi.INVALID_ARGUMENT;
            }
            if (_this17._calibProgress == 100) {
                return _this17._yapi.SUCCESS;
            }
            // make sure we don't start before previous calibration is cleared
            if (_this17._calibStage == 1) {
                currTick = _this17._yapi.GetTickCount() & 0x7FFFFFFF;
                currTick = currTick - _this17._calibPrevTick & 0x7FFFFFFF;
                if (currTick < 1600) {
                    _this17._calibStageHint = 'Set down the device on a steady horizontal surface';
                    _this17._calibStageProgress = parseInt(currTick / 40, 10);
                    _this17._calibProgress = 1;
                    return _this17._yapi.SUCCESS;
                }
            }

            calibParam = yield _this17._download('api/refFrame/calibrationParam.txt');
            iCalib = _this17._yapi.imm_decodeFloats(_this17._yapi.imm_bin2str(calibParam));
            cal3 = parseInt(iCalib[1] / 1000, 10);
            calAcc = parseInt(cal3 / 100, 10);
            calMag = parseInt(cal3 / 10, 10) - 10 * calAcc;
            calGyr = cal3 % 10;
            if (calGyr < 3) {
                _this17._calibStageHint = 'Set down the device on a steady horizontal surface';
                _this17._calibStageProgress = 40 + calGyr * 20;
                _this17._calibProgress = 4 + calGyr * 2;
            } else {
                _this17._calibStage = 2;
                if (calMag < 3) {
                    _this17._calibStageHint = 'Slowly draw \'8\' shapes along the 3 axis';
                    _this17._calibStageProgress = 1 + calMag * 33;
                    _this17._calibProgress = 10 + calMag * 5;
                } else {
                    _this17._calibStage = 3;
                    if (calAcc < 3) {
                        _this17._calibStageHint = 'Slowly turn the device, stopping at each 90 degrees';
                        _this17._calibStageProgress = 1 + calAcc * 33;
                        _this17._calibProgress = 25 + calAcc * 25;
                    } else {
                        _this17._calibStageProgress = 99;
                        _this17._calibProgress = 100;
                    }
                }
            }
            return _this17._yapi.SUCCESS;
        })();
    }

    /**
     * Returns instructions to proceed to the tridimensional calibration initiated with
     * method start3DCalibration.
     *
     * @return {string} a character string.
     */
    get_3DCalibrationHint() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return _this18._calibStageHint;
        })();
    }

    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     *
     * @return {number} an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationProgress() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return _this19._calibProgress;
        })();
    }

    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return {number} an integer, growing each time a calibration stage is completed.
     */
    get_3DCalibrationStage() {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return _this20._calibStage;
        })();
    }

    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return {number} an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationStageProgress() {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            return _this21._calibStageProgress;
        })();
    }

    /**
     * Returns the latest log message from the calibration process.
     * When no new message is available, returns an empty string.
     *
     * @return {string} a character string.
     */
    get_3DCalibrationLogMsg() {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let msg;
            msg = _this22._calibLogMsg;
            _this22._calibLogMsg = '';
            return msg;
        })();
    }

    /**
     * Applies the sensors tridimensional calibration parameters that have just been computed.
     * Remember to call the saveToFlash()  method of the module if the changes
     * must be kept when the device is restarted.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    save3DCalibration() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            if (_this23._calibV2) {
                return yield _this23.save3DCalibrationV2();
            }
            return yield _this23.save3DCalibrationV1();
        })();
    }

    save3DCalibrationV1() {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let shiftX;
            /** @type {number} **/
            let shiftY;
            /** @type {number} **/
            let shiftZ;
            /** @type {number} **/
            let scaleExp;
            /** @type {number} **/
            let scaleX;
            /** @type {number} **/
            let scaleY;
            /** @type {number} **/
            let scaleZ;
            /** @type {number} **/
            let scaleLo;
            /** @type {number} **/
            let scaleHi;
            /** @type {string} **/
            let newcalib;
            if (_this24._calibProgress != 100) {
                return _this24._yapi.INVALID_ARGUMENT;
            }
            // Compute integer values (correction unit is 732ug/count)
            shiftX = -Math.round(_this24._calibAccXOfs / 0.000732);
            if (shiftX < 0) {
                shiftX = shiftX + 65536;
            }
            shiftY = -Math.round(_this24._calibAccYOfs / 0.000732);
            if (shiftY < 0) {
                shiftY = shiftY + 65536;
            }
            shiftZ = -Math.round(_this24._calibAccZOfs / 0.000732);
            if (shiftZ < 0) {
                shiftZ = shiftZ + 65536;
            }
            scaleX = Math.round(2048.0 / _this24._calibAccXScale) - 2048;
            scaleY = Math.round(2048.0 / _this24._calibAccYScale) - 2048;
            scaleZ = Math.round(2048.0 / _this24._calibAccZScale) - 2048;
            if (scaleX < -2048 || scaleX >= 2048 || scaleY < -2048 || scaleY >= 2048 || scaleZ < -2048 || scaleZ >= 2048) {
                scaleExp = 3;
            } else {
                if (scaleX < -1024 || scaleX >= 1024 || scaleY < -1024 || scaleY >= 1024 || scaleZ < -1024 || scaleZ >= 1024) {
                    scaleExp = 2;
                } else {
                    if (scaleX < -512 || scaleX >= 512 || scaleY < -512 || scaleY >= 512 || scaleZ < -512 || scaleZ >= 512) {
                        scaleExp = 1;
                    } else {
                        scaleExp = 0;
                    }
                }
            }
            if (scaleExp > 0) {
                scaleX = scaleX >> scaleExp;
                scaleY = scaleY >> scaleExp;
                scaleZ = scaleZ >> scaleExp;
            }
            if (scaleX < 0) {
                scaleX = scaleX + 1024;
            }
            if (scaleY < 0) {
                scaleY = scaleY + 1024;
            }
            if (scaleZ < 0) {
                scaleZ = scaleZ + 1024;
            }
            scaleLo = ((scaleY & 15) << 12) + (scaleX << 2) + scaleExp;
            scaleHi = (scaleZ << 6) + (scaleY >> 4);
            // Save calibration parameters
            newcalib = '5,' + String(Math.round(shiftX)) + ',' + String(Math.round(shiftY)) + ',' + String(Math.round(shiftZ)) + ',' + String(Math.round(scaleLo)) + ',' + String(Math.round(scaleHi));
            _this24._calibStage = 0;
            return yield _this24.set_calibrationParam(newcalib);
        })();
    }

    save3DCalibrationV2() {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            return yield _this25.set_calibrationParam('5,5,5,5,5,5');
        })();
    }

    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    cancel3DCalibration() {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            if (_this26._calibStage == 0) {
                return _this26._yapi.SUCCESS;
            }

            _this26._calibStage = 0;
            return yield _this26.set_calibrationParam(_this26._calibSavedParams);
        })();
    }

    /**
     * Continues the enumeration of reference frames started using yFirstRefFrame().
     *
     * @return {YRefFrame} a pointer to a YRefFrame object, corresponding to
     *         a reference frame currently online, or a null pointer
     *         if there are no more reference frames to enumerate.
     */
    nextRefFrame() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YRefFrame.FindRefFrameInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of reference frames currently accessible.
     * Use the method YRefFrame.nextRefFrame() to iterate on
     * next reference frames.
     *
     * @return {YRefFrame} a pointer to a YRefFrame object, corresponding to
     *         the first reference frame currently online, or a null pointer
     *         if there are none.
     */
    static FirstRefFrame() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('RefFrame');
        if (next_hwid == null) return null;
        return YRefFrame.FindRefFrame(next_hwid);
    }

    /**
     * Starts the enumeration of reference frames currently accessible.
     * Use the method YRefFrame.nextRefFrame() to iterate on
     * next reference frames.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YRefFrame} a pointer to a YRefFrame object, corresponding to
     *         the first reference frame currently online, or a null pointer
     *         if there are none.
     */
    static FirstRefFrameInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('RefFrame');
        if (next_hwid == null) return null;
        return YRefFrame.FindRefFrameInContext(yctx, next_hwid);
    }

    //--- (end of YRefFrame implementation)
}

exports.YRefFrame = YRefFrame; //
// YRefFrameProxy Class: synchronous proxy to YRefFrame objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YRefFrame objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YRefFrameProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YRefFrame accessors declaration)

    get_mountPos() {
        return this.liveFunc._mountPos;
    }

    set_mountPos(newval) {
        this.liveFunc.set_mountPos(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * For instance, if you setup as reference bearing the value of the earth
     * magnetic declination, the compass will provide the orientation relative
     * to the geographic North.
     *
     * Similarly, when the sensor is not mounted along the standard directions
     * because it has an additional yaw angle, you can set this angle in the reference
     * bearing so that the compass provides the expected natural direction.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * @param newval : a floating point number corresponding to the reference bearing used by the compass
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bearing(newval) {
        this.liveFunc.set_bearing(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the reference bearing used by the compass. The relative bearing
     * indicated by the compass is the difference between the measured magnetic
     * heading and the reference bearing indicated here.
     *
     * @return a floating point number corresponding to the reference bearing used by the compass
     *
     * On failure, throws an exception or returns Y_BEARING_INVALID.
     */
    get_bearing() {
        return this.liveFunc._bearing;
    }

    get_calibrationParam() {
        return this.liveFunc._calibrationParam;
    }

    set_calibrationParam(newval) {
        this.liveFunc.set_calibrationParam(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Changes the compass and tilt sensor frame of reference. The magnetic compass
     * and the tilt sensors (pitch and roll) naturally work in the plane
     * parallel to the earth surface. In case the device is not installed upright
     * and horizontally, you must select its reference orientation (parallel to
     * the earth surface) so that the measures are made relative to this position.
     *
     * @param position : a value among the Y_MOUNTPOSITION enumeration
     *         (Y_MOUNTPOSITION_BOTTOM,   Y_MOUNTPOSITION_TOP,
     *         Y_MOUNTPOSITION_FRONT,    Y_MOUNTPOSITION_RIGHT,
     *         Y_MOUNTPOSITION_REAR,     Y_MOUNTPOSITION_LEFT),
     *         corresponding to the installation in a box, on one of the six faces.
     * @param orientation : a value among the enumeration Y_MOUNTORIENTATION
     *         (Y_MOUNTORIENTATION_TWELVE, Y_MOUNTORIENTATION_THREE,
     *         Y_MOUNTORIENTATION_SIX,     Y_MOUNTORIENTATION_NINE)
     *         corresponding to the orientation of the "X" arrow on the device,
     *         as on a clock dial seen from an observer in the center of the box.
     *         On the bottom face, the 12H orientation points to the front, while
     *         on the top face, the 12H orientation points to the rear.
     *
     * Remember to call the saveToFlash()
     * method of the module if the modification must be kept.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mountPosition(position, orientation) {
        this.liveFunc.set_mountPosition(position, orientation);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Returns the 3D sensor calibration state (Yocto-3D-V2 only). This function returns
     * an integer representing the calibration state of the 3 inertial sensors of
     * the BNO055 chip, found in the Yocto-3D-V2. Hundredths show the calibration state
     * of the accelerometer, tenths show the calibration state of the magnetometer while
     * units show the calibration state of the gyroscope. For each sensor, the value 0
     * means no calibration and the value 3 means full calibration.
     *
     * @return an integer representing the calibration state of Yocto-3D-V2:
     *         333 when fully calibrated, 0 when not calibrated at all.
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_calibrationState() {
        this.liveFunc.get_calibrationState();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Returns estimated quality of the orientation (Yocto-3D-V2 only). This function returns
     * an integer between 0 and 3 representing the degree of confidence of the position
     * estimate. When the value is 3, the estimation is reliable. Below 3, one should
     * expect sudden corrections, in particular for heading (compass function).
     * The most frequent causes for values below 3 are magnetic interferences, and
     * accelerations or rotations beyond the sensor range.
     *
     * @return an integer between 0 and 3 (3 when the measure is reliable)
     *
     * On failure, throws an exception or returns a negative error code.
     * For the Yocto-3D (V1), this function always return -3 (unsupported function).
     */
    get_measureQuality() {
        this.liveFunc.get_measureQuality();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Initiates the sensors tridimensional calibration process.
     * This calibration is used at low level for inertial position estimation
     * and to enhance the precision of the tilt sensors.
     *
     * After calling this method, the device should be moved according to the
     * instructions provided by method get_3DCalibrationHint,
     * and more3DCalibration should be invoked about 5 times per second.
     * The calibration procedure is completed when the method
     * get_3DCalibrationProgress returns 100. At this point,
     * the computed calibration parameters can be applied using method
     * save3DCalibration. The calibration process can be canceled
     * at any time using method cancel3DCalibration.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    start3DCalibration() {
        this.liveFunc.start3DCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Continues the sensors tridimensional calibration process previously
     * initiated using method start3DCalibration.
     * This method should be called approximately 5 times per second, while
     * positioning the device according to the instructions provided by method
     * get_3DCalibrationHint. Note that the instructions change during
     * the calibration process.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    more3DCalibration() {
        this.liveFunc.more3DCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    more3DCalibrationV1() {
        this.liveFunc.more3DCalibrationV1();
        return _yocto_api.YAPI_SUCCESS;
    }

    more3DCalibrationV2() {
        this.liveFunc.more3DCalibrationV2();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Returns the global process indicator for the tridimensional calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationProgress() {
        this.liveFunc.get_3DCalibrationProgress();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Returns index of the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer, growing each time a calibration stage is completed.
     */
    get_3DCalibrationStage() {
        this.liveFunc.get_3DCalibrationStage();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Returns the process indicator for the current stage of the calibration
     * initiated with method start3DCalibration.
     *
     * @return an integer between 0 (not started) and 100 (stage completed).
     */
    get_3DCalibrationStageProgress() {
        this.liveFunc.get_3DCalibrationStageProgress();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Applies the sensors tridimensional calibration parameters that have just been computed.
     * Remember to call the saveToFlash()  method of the module if the changes
     * must be kept when the device is restarted.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    save3DCalibration() {
        this.liveFunc.save3DCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }

    save3DCalibrationV1() {
        this.liveFunc.save3DCalibrationV1();
        return _yocto_api.YAPI_SUCCESS;
    }

    save3DCalibrationV2() {
        this.liveFunc.save3DCalibrationV2();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Aborts the sensors tridimensional calibration process et restores normal settings.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    cancel3DCalibration() {
        this.liveFunc.cancel3DCalibration();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YRefFrame accessors declaration)
}

exports.YRefFrameProxy = YRefFrameProxy; //--- (RefFrame functions)

/**
 * Retrieves a reference frame for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the reference frame is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YRefFrame.isOnline() to test if the reference frame is
 * indeed online at a given time. In case of ambiguity when looking for
 * a reference frame by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the reference frame
 *
 * @return {YRefFrame} a YRefFrame object allowing you to drive the reference frame.
 */

function yFindRefFrame(func) {
    return YRefFrame.FindRefFrame(func);
}

/**
 * Starts the enumeration of reference frames currently accessible.
 * Use the method YRefFrame.nextRefFrame() to iterate on
 * next reference frames.
 *
 * @return {YRefFrame} a pointer to a YRefFrame object, corresponding to
 *         the first reference frame currently online, or a null pointer
 *         if there are none.
 */
function yFirstRefFrame() {
    return YRefFrame.FirstRefFrame();
}

//--- (end of RefFrame functions)
