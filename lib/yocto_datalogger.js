'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YDataLoggerProxy = exports.YDataLogger = exports.YOldDataStream = exports.Y_MAXVALUE_INVALID = exports.Y_AVERAGEVALUE_INVALID = exports.Y_MINVALUE_INVALID = exports.Y_TIMEUTC_INVALID = exports.Y_CURRENTRUNINDEX_INVALID = exports.Y_CLEARHISTORY_INVALID = exports.Y_CLEARHISTORY_TRUE = exports.Y_CLEARHISTORY_FALSE = exports.Y_BEACONDRIVEN_INVALID = exports.Y_BEACONDRIVEN_ON = exports.Y_BEACONDRIVEN_OFF = exports.Y_AUTOSTART_INVALID = exports.Y_AUTOSTART_ON = exports.Y_AUTOSTART_OFF = exports.Y_RECORDING_INVALID = exports.Y_RECORDING_PENDING = exports.Y_RECORDING_ON = exports.Y_RECORDING_OFF = undefined;
exports.yFindDataLogger = yFindDataLogger;
exports.yFirstDataLogger = yFirstDataLogger;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * $Id: yocto_datalogger.js 23963 2016-04-17 20:55:12Z mvuilleu $
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Implements yFindDataLogger(), the high-level API for DataLogger functions
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT
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

//--- (generated code: YDataLogger definitions)
var Y_RECORDING_OFF = exports.Y_RECORDING_OFF = 0;
var Y_RECORDING_ON = exports.Y_RECORDING_ON = 1;
var Y_RECORDING_PENDING = exports.Y_RECORDING_PENDING = 2;
var Y_RECORDING_INVALID = exports.Y_RECORDING_INVALID = -1;
var Y_AUTOSTART_OFF = exports.Y_AUTOSTART_OFF = 0;
var Y_AUTOSTART_ON = exports.Y_AUTOSTART_ON = 1;
var Y_AUTOSTART_INVALID = exports.Y_AUTOSTART_INVALID = -1;
var Y_BEACONDRIVEN_OFF = exports.Y_BEACONDRIVEN_OFF = 0;
var Y_BEACONDRIVEN_ON = exports.Y_BEACONDRIVEN_ON = 1;
var Y_BEACONDRIVEN_INVALID = exports.Y_BEACONDRIVEN_INVALID = -1;
var Y_CLEARHISTORY_FALSE = exports.Y_CLEARHISTORY_FALSE = 0;
var Y_CLEARHISTORY_TRUE = exports.Y_CLEARHISTORY_TRUE = 1;
var Y_CLEARHISTORY_INVALID = exports.Y_CLEARHISTORY_INVALID = -1;
var Y_CURRENTRUNINDEX_INVALID = exports.Y_CURRENTRUNINDEX_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_TIMEUTC_INVALID = exports.Y_TIMEUTC_INVALID = _yocto_api.YAPI.INVALID_LONG;
//--- (end of generated code: YDataLogger definitions)

const Y_MINVALUE_INVALID = exports.Y_MINVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_AVERAGEVALUE_INVALID = exports.Y_AVERAGEVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;
const Y_MAXVALUE_INVALID = exports.Y_MAXVALUE_INVALID = _yocto_api.YAPI.INVALID_DOUBLE;

/**
 * YOldDataStream Class: Sequence of measured data, returned by the data logger
 * 
 * A data stream is a small collection of consecutive measures for a set
 * of sensors. A few properties are available directly from the object itself
 * (they are preloaded at instantiation time), while most other properties and
 * the actual data are loaded on demand when accessed for the first time.
 */
class YOldDataStream extends _yocto_api.YDataStream {
    // Data preloaded on object instantiation
    constructor(obj_parent, int_run, int_stamp, int_utc, int_itv) {
        super(obj_parent);
        this._dataLogger = obj_parent;
        this._runNo = int_run;
        this._timeStamp = int_stamp;
        this._utcStamp = int_utc == null ? -1 : int_utc;
        this._interval = int_itv == null ? 0 : int_itv;
        this._samplesPerHour = this._interval == 0 ? 3600 : 3600 / this._interval;
        this._isClosed = 1;
        this._minVal = this.DATA_INVALID;
        this._avgVal = this.DATA_INVALID;
        this._maxVal = this.DATA_INVALID;
    }

    // Internal function to preload all values into object
    //
    loadStream() {
        var _this = this;

        return _asyncToGenerator(function* () {
            var coldiv = null;
            var coltyp = null;
            var colscl = null;
            var colofs = null;
            var calhdl = null;
            var caltyp = null;
            var calpar = null;
            var calraw = null;
            var calref = null;
            var c, i;

            var loadval = _this._dataLogger.getData(_this._runNo, _this._timeStamp);
            if (loadval == null) {
                return _this._dataLogger.get_errorType();
            }
            if (loadval['time'] != null) _this._timeStamp = loadval['time'];
            if (loadval['UTC'] != null) _this._utcStamp = loadval['UTC'];
            if (loadval['interval'] != null) _this._interval = loadval['interval'];
            if (loadval['nRows'] != null) _this._nRows = loadval['nRows'];
            if (loadval['keys'] != null) {
                _this._columnNames = loadval['keys'];
                if (_this._nCols == 0) {
                    _this._nCols = _this._columnNames.length;
                } else if (_this._nCols != _this._columnNames.length) {
                    _this._nCols = 0;
                    return _yocto_api.YAPI.IO_ERROR;
                }
            }
            if (loadval['div'] != null) {
                coldiv = loadval['div'];
                if (_this._nCols == 0) {
                    _this._nCols = coldiv.length;
                } else if (_this._nCols != coldiv.length) {
                    _this._nCols = 0;
                    return _yocto_api.YAPI.IO_ERROR;
                }
            }
            if (loadval['type'] != null) {
                coltyp = loadval['type'];
                if (_this._nCols == 0) {
                    _this._nCols = coltyp.length;
                } else if (_this._nCols != coltyp.length) {
                    _this._nCols = 0;
                    return _yocto_api.YAPI.IO_ERROR;
                }
            }
            if (loadval['scal'] != null) {
                colscl = loadval['scal'];
                colofs = [];
                if (_this._nCols != colscl.length) {
                    _this._nCols = 0;
                    return _yocto_api.YAPI.IO_ERROR;
                }
                for (i = 0; i < colscl.length; i++) {
                    colscl[i] /= 65536.0;
                    colofs[i] = coltyp[i] != 0 ? -32767 : 0;
                }
            } else {
                colscl = [];
                colofs = [];
                for (i = 0; i < coldiv.length; i++) {
                    colscl[i] = 1.0 / coldiv[i];
                    colofs[i] = coltyp[i] != 0 ? -32767 : 0;
                }
            }
            if (loadval['cal'] != null) {
                calhdl = new Array(_this._nCols);
                caltyp = new Array(_this._nCols);
                calpar = new Array(_this._nCols);
                calraw = new Array(_this._nCols);
                calref = new Array(_this._nCols);
                for (c = 0; c < _this._nCols; c++) {
                    var params = loadval['cal'][c];
                    if (!params) continue;
                    params = params.split(',');
                    if (params.length < 11) continue;
                    calhdl[c] = _yocto_api.YAPI._getCalibrationHandler(params[0]);
                    if (!calhdl[c]) continue;
                    caltyp[c] = parseInt(params[0]);
                    calpar[c] = new Array(params.length - 1);
                    calraw[c] = new Array(params.length >> 1);
                    calref[c] = new Array(params.length >> 1);
                    for (i = 1; i < params.length; i += 2) {
                        calpar[c][i - 1] = parseInt(params[i]);
                        calpar[c][i] = parseInt(params[i + 1]);
                        if (caltyp[c] <= 10) {
                            calraw[c][i >> 1] = (calpar[c][i - 1] + colofs[c]) / coldiv[c];
                            calref[c][i >> 1] = (calpar[c][i] + colofs[c]) / coldiv[c];
                        } else {
                            calraw[c][i >> 1] = _yocto_api.YAPI._decimalToDouble(calpar[c][i - 1]);
                            calref[c][i >> 1] = _yocto_api.YAPI._decimalToDouble(calpar[c][i]);
                        }
                    }
                }
            }
            if (loadval['data'] != null) {
                if (_this._nCols == 0 || coldiv == null || coltyp == null) {
                    return _yocto_api.YAPI.IO_ERROR;
                }
                _this._values = [];
                var data = loadval['data'];
                if (typeof data == 'string') {
                    data = _yocto_api.YAPI._decodeWords(data);
                }
                var dat = [];
                c = 0;
                for (var idx in data) {
                    var val;
                    if (coltyp[c] < 2) {
                        val = (data[idx] + colofs[c]) * colscl[c];
                    } else {
                        val = _yocto_api.YAPI._decimalToDouble(data[idx] - 32767);
                    }
                    if (calhdl && calhdl[c]) {
                        // use post-calibration function
                        if (caltyp[c] <= 10) {
                            // linear calibration using unscaled value
                            val = calhdl[c]((data[idx] + colofs[c]) / coldiv[c], caltyp[c], calpar[c], calraw[c], calref[c]);
                        } else if (caltyp[c] > 20) {
                            // custom calibration using raw floating-point value stored by the datalogger
                            val = calhdl[c](val, caltyp[c], calpar[c], calraw[c], calref[c]);
                        }
                    }
                    dat.push(val);
                    if (++c == _this._nCols) {
                        _this._values.push(dat);
                        dat = [];
                        c = 0;
                    }
                }
            }
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    /**
     * Returns the relative start time of the data stream, measured in seconds.
     * For recent firmwares, the value is relative to the present time,
     * which means the value is always negative.
     * If the device uses a firmware older than version 13000, value is
     * relative to the start of the time the device was powered on, and
     * is always positive.
     * If you need an absolute UTC timestamp, use get_startTimeUTC().
     * 
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the start of the run and the beginning of this data
     *         stream.
     */
    get_startTime() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            return _this2._timeStamp;
        })();
    }

    /**
     * Returns the number of seconds elapsed between  two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but there might be alternative streams at lower resolution
     * created by summarizing the original stream for archiving purposes.
     * 
     * This method does not cause any access to the device, as the value
     * is preloaded in the object at instantiation time.
     * 
     * @return an unsigned number corresponding to a number of seconds.
     */
    get_dataSamplesInterval() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._interval == 0) yield _this3.loadStream();
            return _this3._interval;
        })();
    }
}

exports.YOldDataStream = YOldDataStream; //--- (generated code: YDataLogger class start)
/**
 * YDataLogger Class: DataLogger function interface
 *
 * Yoctopuce sensors include a non-volatile memory capable of storing ongoing measured
 * data automatically, without requiring a permanent connection to a computer.
 * The DataLogger function controls the global parameters of the internal data
 * logger.
 */
//--- (end of generated code: YDataLogger class start)

class YDataLogger extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YDataLogger constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'DataLogger';
        /** @member {number} **/
        this._currentRunIndex = Y_CURRENTRUNINDEX_INVALID;
        /** @member {number} **/
        this._timeUTC = Y_TIMEUTC_INVALID;
        /** @member {number} **/
        this._recording = Y_RECORDING_INVALID;
        /** @member {number} **/
        this._autoStart = Y_AUTOSTART_INVALID;
        /** @member {number} **/
        this._beaconDriven = Y_BEACONDRIVEN_INVALID;
        /** @member {number} **/
        this._clearHistory = Y_CLEARHISTORY_INVALID;
        this.imm_setConst({
            CURRENTRUNINDEX_INVALID: _yocto_api.YAPI.INVALID_UINT,
            TIMEUTC_INVALID: _yocto_api.YAPI.INVALID_LONG,
            RECORDING_OFF: 0,
            RECORDING_ON: 1,
            RECORDING_PENDING: 2,
            RECORDING_INVALID: -1,
            AUTOSTART_OFF: 0,
            AUTOSTART_ON: 1,
            AUTOSTART_INVALID: -1,
            BEACONDRIVEN_OFF: 0,
            BEACONDRIVEN_ON: 1,
            BEACONDRIVEN_INVALID: -1,
            CLEARHISTORY_FALSE: 0,
            CLEARHISTORY_TRUE: 1,
            CLEARHISTORY_INVALID: -1
        });
        //--- (end of generated code: YDataLogger constructor)
    }

    // Internal function to retrieve datalogger memory
    //
    getData(runIdx, timeIdx) {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            var loadval;

            if (_this4.dataLoggerURL == undefined) {
                _this4.dataLoggerURL = '/logger.json';
            }

            // get the device serial number
            var devid = _this4.module().get_serialNumber();
            if (devid == _yocto_api.YModule.SERIALNUMBER_INVALID) {
                return null;
            }
            var httpreq = 'GET ' + _this4.dataLoggerURL;
            if (timeIdx) {
                httpreq += '?run=' + runIdx + '&time=' + timeIdx;
            }
            var yreq = yield _yocto_api.YAPI.devRequest(devid, httpreq);
            if (yreq.errorType != _yocto_api.YAPI_SUCCESS) {
                if (yreq.errorMsg.indexOf('HTTP status 404') >= 0 && _this4.dataLoggerURL != '/dataLogger.json') {
                    _this4.dataLoggerURL = '/dataLogger.json';
                    return yield _this4.getData(runIdx, timeIdx);
                }
                return _this4._throw(yreq.errorType, yreq.errorMsg, null);
            }

            return JSON.parse(yreq.result);
        })();
    }

    /**
     * Builds a list of all data streams hold by the data logger (legacy method).
     * The caller must pass by reference an empty array to hold YDataStream
     * objects, and the function fills it with objects describing available
     * data sequences.
     *
     * This is the old way to retrieve data from the DataLogger.
     * For new applications, you should rather use get_dataSets()
     * method, or call directly get_recordedData() on the
     * sensor object.
     *
     * @param v {YDataStream[]} : an array of YDataStream objects to be filled in
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_dataStreams(v) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            var loadval = yield _this5.getData(null, null);
            if (loadval == null) {
                return _this5.get_errorType();
            }
            if (loadval.length == 0) {
                return _yocto_api.YAPI_SUCCESS;
            }
            if (Array.isArray(loadval[0])) {
                // old datalogger format: [runIdx, timerel, utc, interval]
                for (var idx in loadval) {
                    var arr = loadval[idx];
                    if (arr.length < 4) {
                        _throw(_yocto_api.YAPI.IO_ERROR, 'Unexpected JSON reply format');
                        return _yocto_api.YAPI.IO_ERROR;
                    }
                    v.push(new YOldDataStream(_this5, arr[0], arr[1], arr[2], arr[3]));
                }
            } else {
                // new datalogger format: {"id":"...","unit":"...","streams":["...",...]}
                var sets = _this5.parse_dataSets(JSON.stringify(loadval));
                for (var i = 0; i < sets.length; i++) {
                    var ds = sets[i].get_privateDataStreams();
                    for (var si = 0; si < ds.length; si++) {
                        v.push(ds[si]);
                    }
                }
            }
            return _yocto_api.YAPI_SUCCESS;
        })();
    }

    //--- (generated code: YDataLogger implementation)

    get_syncProxy() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                try {
                    yield _this6.load(_this6._yapi.defaultCacheValidity);
                } catch (e) {
                    // device might be offline
                }
            }
            var res = new YDataLoggerProxy(_this6);
            yield res._asyncInit();
            res._module = yield (yield _this6.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'currentRunIndex':
                this._currentRunIndex = parseInt(val);
                return 1;
            case 'timeUTC':
                this._timeUTC = parseInt(val);
                return 1;
            case 'recording':
                this._recording = parseInt(val);
                return 1;
            case 'autoStart':
                this._autoStart = parseInt(val);
                return 1;
            case 'beaconDriven':
                this._beaconDriven = parseInt(val);
                return 1;
            case 'clearHistory':
                this._clearHistory = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return {number} an integer corresponding to the current run number, corresponding to the number of
     * times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns YDataLogger.CURRENTRUNINDEX_INVALID.
     */
    get_currentRunIndex() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_CURRENTRUNINDEX_INVALID;
                }
            }
            return _this7._currentRunIndex;
        })();
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return {number} an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns YDataLogger.TIMEUTC_INVALID.
     */
    get_timeUTC() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_TIMEUTC_INVALID;
                }
            }
            return _this8._timeUTC;
        })();
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval {number} : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeUTC(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('timeUTC', rest_val);
        })();
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return {number} a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the current activation state of the data logger
     *
     * On failure, throws an exception or returns YDataLogger.RECORDING_INVALID.
     */
    get_recording() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_RECORDING_INVALID;
                }
            }
            return _this10._recording;
        })();
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval {number} : a value among YDataLogger.RECORDING_OFF, YDataLogger.RECORDING_ON and
     * YDataLogger.RECORDING_PENDING corresponding to the activation state of the data logger to
     * start/stop recording data
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_recording(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this11._setAttr('recording', rest_val);
        })();
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return {number} either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to the
     * default activation state of the data logger on power up
     *
     * On failure, throws an exception or returns YDataLogger.AUTOSTART_INVALID.
     */
    get_autoStart() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_AUTOSTART_INVALID;
                }
            }
            return _this12._autoStart;
        })();
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : either YDataLogger.AUTOSTART_OFF or YDataLogger.AUTOSTART_ON, according to
     * the default activation state of the data logger on power up
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoStart(newval) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this13._setAttr('autoStart', rest_val);
        })();
    }

    /**
     * Return true if the data logger is synchronised with the localization beacon.
     *
     * @return {number} either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON
     *
     * On failure, throws an exception or returns YDataLogger.BEACONDRIVEN_INVALID.
     */
    get_beaconDriven() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_BEACONDRIVEN_INVALID;
                }
            }
            return _this14._beaconDriven;
        })();
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : either YDataLogger.BEACONDRIVEN_OFF or YDataLogger.BEACONDRIVEN_ON,
     * according to the type of synchronisation of the data logger
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beaconDriven(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this15._setAttr('beaconDriven', rest_val);
        })();
    }

    get_clearHistory() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_CLEARHISTORY_INVALID;
                }
            }
            return _this16._clearHistory;
        })();
    }

    set_clearHistory(newval) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this17._setAttr('clearHistory', rest_val);
        })();
    }

    /**
     * Retrieves a data logger for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the data logger
     *
     * @return {YDataLogger} a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLogger(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('DataLogger', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a data logger for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the data logger is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDataLogger.isOnline() to test if the data logger is
     * indeed online at a given time. In case of ambiguity when looking for
     * a data logger by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the data logger
     *
     * @return {YDataLogger} a YDataLogger object allowing you to drive the data logger.
     */
    static FindDataLoggerInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'DataLogger', func);
        if (obj == null) {
            obj = new YDataLogger(yctx, func);
            _yocto_api.YFunction._AddToCache('DataLogger', func, obj);
        }
        return obj;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    forgetAllDataStreams() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.set_clearHistory(Y_CLEARHISTORY_TRUE);
        })();
    }

    /**
     * Returns a list of YDataSet objects that can be used to retrieve
     * all measures stored by the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as YDataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @return {YDataSet[]} a list of YDataSet object.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_dataSets() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            return yield _this19.parse_dataSets((yield _this19._download('logger.json')));
        })();
    }

    parse_dataSets(json) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            /** @type {string[]} **/
            let dslist = [];
            /** @type {YDataSetPtr} **/
            let dataset;
            /** @type {YDataSet[]} **/
            let res = [];
            // may throw an exception
            dslist = _this20.imm_json_get_array(json);
            res.length = 0;
            for (let ii in dslist) {
                dataset = new _yocto_api.YDataSet(_this20);
                yield dataset._parse(dslist[ii]);
                res.push(dataset);;
            }
            return res;
        })();
    }

    /**
     * Continues the enumeration of data loggers started using yFirstDataLogger().
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         a data logger currently online, or a null pointer
     *         if there are no more data loggers to enumerate.
     */
    nextDataLogger() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLogger() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('DataLogger');
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLogger(next_hwid);
    }

    /**
     * Starts the enumeration of data loggers currently accessible.
     * Use the method YDataLogger.nextDataLogger() to iterate on
     * next data loggers.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
     *         the first data logger currently online, or a null pointer
     *         if there are none.
     */
    static FirstDataLoggerInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DataLogger');
        if (next_hwid == null) return null;
        return YDataLogger.FindDataLoggerInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YDataLogger implementation)
}

exports.YDataLogger = YDataLogger; //
// YDataLoggerProxy Class: synchronous proxy to YDataLogger objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDataLogger objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YDataLoggerProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (generated code: YDataLogger accessors declaration)

    /**
     * Returns the current run number, corresponding to the number of times the module was
     * powered on with the dataLogger enabled at some point.
     *
     * @return an integer corresponding to the current run number, corresponding to the number of times the module was
     *         powered on with the dataLogger enabled at some point
     *
     * On failure, throws an exception or returns Y_CURRENTRUNINDEX_INVALID.
     */
    get_currentRunIndex() {
        return this.liveFunc._currentRunIndex;
    }

    /**
     * Returns the Unix timestamp for current UTC time, if known.
     *
     * @return an integer corresponding to the Unix timestamp for current UTC time, if known
     *
     * On failure, throws an exception or returns Y_TIMEUTC_INVALID.
     */
    get_timeUTC() {
        return this.liveFunc._timeUTC;
    }

    /**
     * Changes the current UTC time reference used for recorded data.
     *
     * @param newval : an integer corresponding to the current UTC time reference used for recorded data
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_timeUTC(newval) {
        this.liveFunc.set_timeUTC(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current activation state of the data logger.
     *
     * @return a value among Y_RECORDING_OFF, Y_RECORDING_ON and Y_RECORDING_PENDING corresponding to the
     * current activation state of the data logger
     *
     * On failure, throws an exception or returns Y_RECORDING_INVALID.
     */
    get_recording() {
        return this.liveFunc._recording;
    }

    /**
     * Changes the activation state of the data logger to start/stop recording data.
     *
     * @param newval : a value among Y_RECORDING_OFF, Y_RECORDING_ON and Y_RECORDING_PENDING corresponding
     * to the activation state of the data logger to start/stop recording data
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_recording(newval) {
        this.liveFunc.set_recording(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the default activation state of the data logger on power up.
     *
     * @return either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state of the
     * data logger on power up
     *
     * On failure, throws an exception or returns Y_AUTOSTART_INVALID.
     */
    get_autoStart() {
        return this.liveFunc._autoStart;
    }

    /**
     * Changes the default activation state of the data logger on power up.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either Y_AUTOSTART_OFF or Y_AUTOSTART_ON, according to the default activation state
     * of the data logger on power up
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_autoStart(newval) {
        this.liveFunc.set_autoStart(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Return true if the data logger is synchronised with the localization beacon.
     *
     * @return either Y_BEACONDRIVEN_OFF or Y_BEACONDRIVEN_ON
     *
     * On failure, throws an exception or returns Y_BEACONDRIVEN_INVALID.
     */
    get_beaconDriven() {
        return this.liveFunc._beaconDriven;
    }

    /**
     * Changes the type of synchronisation of the data logger.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : either Y_BEACONDRIVEN_OFF or Y_BEACONDRIVEN_ON, according to the type of
     * synchronisation of the data logger
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beaconDriven(newval) {
        this.liveFunc.set_beaconDriven(newval);
        return this._yapi.SUCCESS;
    }

    get_clearHistory() {
        return this.liveFunc._clearHistory;
    }

    set_clearHistory(newval) {
        this.liveFunc.set_clearHistory(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Clears the data logger memory and discards all recorded data streams.
     * This method also resets the current run index to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    forgetAllDataStreams() {
        this.liveFunc.forgetAllDataStreams();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YDataLogger accessors declaration)
}

exports.YDataLoggerProxy = YDataLoggerProxy; //--- (generated code: DataLogger functions)

/**
 * Retrieves a data logger for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the data logger is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDataLogger.isOnline() to test if the data logger is
 * indeed online at a given time. In case of ambiguity when looking for
 * a data logger by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the data logger
 *
 * @return {YDataLogger} a YDataLogger object allowing you to drive the data logger.
 */

function yFindDataLogger(func) {
    return YDataLogger.FindDataLogger(func);
}

/**
 * Starts the enumeration of data loggers currently accessible.
 * Use the method YDataLogger.nextDataLogger() to iterate on
 * next data loggers.
 *
 * @return {YDataLogger} a pointer to a YDataLogger object, corresponding to
 *         the first data logger currently online, or a null pointer
 *         if there are none.
 */
function yFirstDataLogger() {
    return YDataLogger.FirstDataLogger();
}

//--- (end of generated code: DataLogger functions)
