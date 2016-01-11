/*********************************************************************
 *
 * $Id: yocto_api.es7 22052 2015-11-20 16:17:46Z mvuilleu $
 *
 * High-level programming interface, common to all modules
 *
 * - - - - - - - - - License information: - - - - - - - - -
 *
 *  Copyright (C) 2011 and beyond by Yoctopuce Sarl, Switzerland.
 *
 *  Yoctopuce Sarl (hereafter Licensor) grants to you a perpetual
 *  non-exclusive license to use, modify, copy and integrate http
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
'use strict';

//--- (generated code: YFunction definitions)
// Yoctopuce error codes, also used by default as function return value

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.yFindModule = yFindModule;
exports.yFirstModule = yFirstModule;
exports.yFindSensor = yFindSensor;
exports.yFirstSensor = yFirstSensor;
exports.yGetAPIVersion = yGetAPIVersion;
exports.yInitAPI = yInitAPI;
exports.yFreeAPI = yFreeAPI;
exports.yDisableExceptions = yDisableExceptions;
exports.yEnableExceptions = yEnableExceptions;
exports.yRegisterHub = yRegisterHub;
exports.yPreregisterHub = yPreregisterHub;
exports.yUnregisterHub = yUnregisterHub;
exports.yUpdateDeviceList = yUpdateDeviceList;
exports.yHandleEvents = yHandleEvents;
exports.ySleep = ySleep;
exports.yGetTickCount = yGetTickCount;
exports.yCheckLogicalName = yCheckLogicalName;
exports.yRegisterDeviceArrivalCallback = yRegisterDeviceArrivalCallback;
exports.yRegisterDeviceChangeCallback = yRegisterDeviceChangeCallback;
exports.yRegisterDeviceRemovalCallback = yRegisterDeviceRemovalCallback;
exports.yRegisterCalibrationHandler = yRegisterCalibrationHandler;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

const YAPI_SUCCESS = exports.YAPI_SUCCESS = 0; // everything worked all right
const YAPI_NOT_INITIALIZED = exports.YAPI_NOT_INITIALIZED = -1; // call yInitAPI() first !
const YAPI_INVALID_ARGUMENT = exports.YAPI_INVALID_ARGUMENT = -2; // one of the arguments passed to the function is invalid
const YAPI_NOT_SUPPORTED = exports.YAPI_NOT_SUPPORTED = -3; // the operation attempted is (currently) not supported
const YAPI_DEVICE_NOT_FOUND = exports.YAPI_DEVICE_NOT_FOUND = -4; // the requested device is not reachable
const YAPI_VERSION_MISMATCH = exports.YAPI_VERSION_MISMATCH = -5; // the device firmware is incompatible with this API version
const YAPI_DEVICE_BUSY = exports.YAPI_DEVICE_BUSY = -6; // the device is busy with another task and cannot answer
const YAPI_TIMEOUT = exports.YAPI_TIMEOUT = -7; // the device took too long to provide an answer
const YAPI_IO_ERROR = exports.YAPI_IO_ERROR = -8; // there was an I/O problem while talking to the device
const YAPI_NO_MORE_DATA = exports.YAPI_NO_MORE_DATA = -9; // there is no more data to read from
const YAPI_EXHAUSTED = exports.YAPI_EXHAUSTED = -10; // you have run out of a limited resource, check the documentation
const YAPI_DOUBLE_ACCES = exports.YAPI_DOUBLE_ACCES = -11; // you have two process that try to access to the same device
const YAPI_UNAUTHORIZED = exports.YAPI_UNAUTHORIZED = -12; // unauthorized access to password-protected device
const YAPI_RTC_NOT_READY = exports.YAPI_RTC_NOT_READY = -13; // real-time clock has not been initialized (or time was lost)
const YAPI_FILE_NOT_FOUND = exports.YAPI_FILE_NOT_FOUND = -14; // the file is not found

const YAPI_INVALID_INT = exports.YAPI_INVALID_INT = 0x7fffffff;
const YAPI_INVALID_UINT = exports.YAPI_INVALID_UINT = -1;
const YAPI_INVALID_LONG = exports.YAPI_INVALID_LONG = 0x7fffffffffffffff;
const YAPI_INVALID_DOUBLE = exports.YAPI_INVALID_DOUBLE = -Number.MAX_VALUE;
const YAPI_INVALID_STRING = exports.YAPI_INVALID_STRING = '!INVALID!';
const Y_FUNCTIONDESCRIPTOR_INVALID = exports.Y_FUNCTIONDESCRIPTOR_INVALID = YAPI_INVALID_STRING;
const Y_HARDWAREID_INVALID = exports.Y_HARDWAREID_INVALID = YAPI_INVALID_STRING;
const Y_FUNCTIONID_INVALID = exports.Y_FUNCTIONID_INVALID = YAPI_INVALID_STRING;
const Y_FRIENDLYNAME_INVALID = exports.Y_FRIENDLYNAME_INVALID = YAPI_INVALID_STRING;
const Y_LOGICALNAME_INVALID = exports.Y_LOGICALNAME_INVALID = YAPI_INVALID_STRING;
const Y_ADVERTISEDVALUE_INVALID = exports.Y_ADVERTISEDVALUE_INVALID = YAPI_INVALID_STRING;
//--- (end of generated code: YFunction definitions)

//--- (generated code: YModule definitions)
const Y_PERSISTENTSETTINGS_LOADED = exports.Y_PERSISTENTSETTINGS_LOADED = 0;
const Y_PERSISTENTSETTINGS_SAVED = exports.Y_PERSISTENTSETTINGS_SAVED = 1;
const Y_PERSISTENTSETTINGS_MODIFIED = exports.Y_PERSISTENTSETTINGS_MODIFIED = 2;
const Y_PERSISTENTSETTINGS_INVALID = exports.Y_PERSISTENTSETTINGS_INVALID = -1;
const Y_BEACON_OFF = exports.Y_BEACON_OFF = 0;
const Y_BEACON_ON = exports.Y_BEACON_ON = 1;
const Y_BEACON_INVALID = exports.Y_BEACON_INVALID = -1;
const Y_PRODUCTNAME_INVALID = exports.Y_PRODUCTNAME_INVALID = YAPI_INVALID_STRING;
const Y_SERIALNUMBER_INVALID = exports.Y_SERIALNUMBER_INVALID = YAPI_INVALID_STRING;
const Y_PRODUCTID_INVALID = exports.Y_PRODUCTID_INVALID = YAPI_INVALID_UINT;
const Y_PRODUCTRELEASE_INVALID = exports.Y_PRODUCTRELEASE_INVALID = YAPI_INVALID_UINT;
const Y_FIRMWARERELEASE_INVALID = exports.Y_FIRMWARERELEASE_INVALID = YAPI_INVALID_STRING;
const Y_LUMINOSITY_INVALID = exports.Y_LUMINOSITY_INVALID = YAPI_INVALID_UINT;
const Y_UPTIME_INVALID = exports.Y_UPTIME_INVALID = YAPI_INVALID_LONG;
const Y_USBCURRENT_INVALID = exports.Y_USBCURRENT_INVALID = YAPI_INVALID_UINT;
const Y_REBOOTCOUNTDOWN_INVALID = exports.Y_REBOOTCOUNTDOWN_INVALID = YAPI_INVALID_INT;
const Y_USERVAR_INVALID = exports.Y_USERVAR_INVALID = YAPI_INVALID_INT;
//--- (end of generated code: YModule definitions)

//--- (generated code: YSensor definitions)
const Y_UNIT_INVALID = exports.Y_UNIT_INVALID = YAPI_INVALID_STRING;
const Y_CURRENTVALUE_INVALID = exports.Y_CURRENTVALUE_INVALID = YAPI_INVALID_DOUBLE;
const Y_LOWESTVALUE_INVALID = exports.Y_LOWESTVALUE_INVALID = YAPI_INVALID_DOUBLE;
const Y_HIGHESTVALUE_INVALID = exports.Y_HIGHESTVALUE_INVALID = YAPI_INVALID_DOUBLE;
const Y_CURRENTRAWVALUE_INVALID = exports.Y_CURRENTRAWVALUE_INVALID = YAPI_INVALID_DOUBLE;
const Y_LOGFREQUENCY_INVALID = exports.Y_LOGFREQUENCY_INVALID = YAPI_INVALID_STRING;
const Y_REPORTFREQUENCY_INVALID = exports.Y_REPORTFREQUENCY_INVALID = YAPI_INVALID_STRING;
const Y_CALIBRATIONPARAM_INVALID = exports.Y_CALIBRATIONPARAM_INVALID = YAPI_INVALID_STRING;
const Y_RESOLUTION_INVALID = exports.Y_RESOLUTION_INVALID = YAPI_INVALID_DOUBLE;
const Y_SENSORSTATE_INVALID = exports.Y_SENSORSTATE_INVALID = YAPI_INVALID_INT;
//--- (end of generated code: YSensor definitions)

const Y_DATA_INVALID = exports.Y_DATA_INVALID = YAPI_INVALID_DOUBLE;
const Y_DURATION_INVALID = exports.Y_DURATION_INVALID = YAPI_INVALID_INT;

// yInitAPI constants (not really useful in Javascript, but defined for code portability)
const Y_DETECT_NONE = exports.Y_DETECT_NONE = 0;
const Y_DETECT_USB = exports.Y_DETECT_USB = 1;
const Y_DETECT_NET = exports.Y_DETECT_NET = 2;
const Y_DETECT_ALL = exports.Y_DETECT_ALL = Y_DETECT_USB | Y_DETECT_NET;

// calibration types
const YOCTO_CALIB_TYPE_OFS = 30;

const NOTIFY_NETPKT_NAME = '0';
const NOTIFY_NETPKT_CHILD = '2';
const NOTIFY_NETPKT_FUNCNAME = '4';
const NOTIFY_NETPKT_FUNCVAL = '5';
const NOTIFY_NETPKT_LOG = '7';
const NOTIFY_NETPKT_FUNCNAMEYDX = '8';
const NOTIFY_NETPKT_FLUSHV2YDX = 't';
const NOTIFY_NETPKT_FUNCV2YDX = 'u';
const NOTIFY_NETPKT_TIMEV2YDX = 'v';
const NOTIFY_NETPKT_DEVLOGYDX = 'w';
const NOTIFY_NETPKT_TIMEVALYDX = 'x';
const NOTIFY_NETPKT_FUNCVALYDX = 'y';
const NOTIFY_NETPKT_TIMEAVGYDX = 'z';
const NOTIFY_NETPKT_NOT_SYNC = '@';
const NOTIFY_NETPKT_STOP = 10; // =\n

const NOTIFY_V2_LEGACY = 0; // unused (reserved for compatibility with legacy notifications)
const NOTIFY_V2_6RAWBYTES = 1; // largest type: data is always 6 bytes
const NOTIFY_V2_TYPEDDATA = 2; // other types: first data byte holds the decoding format
const NOTIFY_V2_FLUSHGROUP = 3; // no data associated

const PUBVAL_LEGACY = 0; // 0-6 ASCII characters (normally sent as YSTREAM_NOTICE)
const PUBVAL_1RAWBYTE = 1; // 1 raw byte  (=2 characters)
const PUBVAL_2RAWBYTES = 2; // 2 raw bytes (=4 characters)
const PUBVAL_3RAWBYTES = 3; // 3 raw bytes (=6 characters)
const PUBVAL_4RAWBYTES = 4; // 4 raw bytes (=8 characters)
const PUBVAL_5RAWBYTES = 5; // 5 raw bytes (=10 characters)
const PUBVAL_6RAWBYTES = 6; // 6 hex bytes (=12 characters) (sent as V2_6RAWBYTES)
const PUBVAL_C_LONG = 7; // 32-bit C signed integer
const PUBVAL_C_FLOAT = 8; // 32-bit C float
const PUBVAL_YOCTO_FLOAT_E3 = 9; // 32-bit Yocto fixed-point format (e-3)
const PUBVAL_YOCTO_FLOAT_E6 = 10; // 32-bit Yocto fixed-point format (e-6)

const YOCTO_PUBVAL_LEN = 16;
const YOCTO_PUBVAL_SIZE = 6;

const Y_BASETYPES = { Function: 0, Sensor: 1 };

class YErrorMsg {
    constructor() {
        let str_msg = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        this.msg = str_msg;
    }
}

exports.YErrorMsg = YErrorMsg; //
// YFunctionType Class (used internally)
//
// Instances of this class stores everything we know about a given type of function:
// Mapping between function logical names and Hardware ID as discovered on hubs,
// and existing instances of YFunction (either already connected or simply requested).
// To keep it simple, this implementation separates completely the name resolution
// mechanism, implemented using the yellow pages, and the storage and retrieval of
// existing YFunction instances.
//

class YFunctionType {
    constructor(obj_yapi, str_classname) {
        // private
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        /** @member {string} **/
        this._className = str_classname;
        /** @member {Object} **/
        this._connectedFns = {}; // functions requested and available, by Hardware Id
        /** @member {Object} **/
        this._requestedFns = {}; // functions requested but not yet known, by any type of name
        /** @member {Object} **/
        this._hwIdByName = {}; // hash table of function Hardware Id by logical name
        /** @member {Object} **/
        this._nameByHwId = {}; // hash table of function logical name by Hardware Id
        /** @member {Object} **/
        this._valueByHwId = {}; // hash table of function advertised value by logical name
        /** @member {number} **/
        this._baseType = 0; // default to no abstract base type (generic YFunction)
    }

    /** Index a single function given by HardwareId and logical name; store any advertised value
     *
     * @param {string} str_hwid
     * @param {string} str_name
     * @param {string|null} str_val
     * @param {number|null} int_basetype
     * @returns {boolean} true iff there was a logical name discrepancy
     */
    imm_reindexFunction(str_hwid, str_name, str_val, int_basetype) {
        var currname = this._nameByHwId[str_hwid];
        var res = false;
        if (currname == undefined || currname == '') {
            if (str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
                res = true;
            }
        } else if (currname != str_name) {
            if (this._hwIdByName[currname] == str_hwid) delete this._hwIdByName[currname];
            if (str_name != '') {
                this._nameByHwId[str_hwid] = str_name;
            } else {
                delete this._nameByHwId[str_hwid];
            }
            res = true;
        }
        if (str_name != '') {
            this._hwIdByName[str_name] = str_hwid;
        }
        if (str_val != undefined) {
            this._valueByHwId[str_hwid] = str_val;
        } else {
            if (this._valueByHwId[str_hwid] == undefined) {
                this._valueByHwId[str_hwid] = '';
            }
        }
        if (int_basetype != undefined) {
            if (this._baseType == 0) {
                this._baseType = int_basetype;
            }
        }
        return res;
    }

    /** Forget a disconnected function given by HardwareId
     *
     * @param {string} str_hwid
     */
    imm_forgetFunction(str_hwid) {
        var currname = this._nameByHwId[str_hwid];
        if (currname != undefined) {
            if (currname != '' && this._hwIdByName[currname] == str_hwid) {
                delete this._hwIdByName[currname];
            }
            delete this._nameByHwId[str_hwid];
        }
        if (this._valueByHwId[str_hwid] != undefined) {
            delete this._valueByHwId[str_hwid];
        }
    }

    /** Find the exact Hardware Id of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_resolve(str_func) {
        var dotpos = str_func.indexOf('.');
        var res;
        if (dotpos < 0) {
            // First case: str_func is the logicalname of a function
            res = this._hwIdByName[str_func];
            if (res != undefined) {
                return { errorType: YAPI_SUCCESS,
                    errorMsg: 'no error',
                    result: String(res) };
            }

            // fallback to assuming that str_func is a logicalname or serial number of a module
            // with an implicit function name (like serial.module for instance)
            dotpos = str_func.length;
            str_func += '.' + this._className.substr(0, 1).toLowerCase() + this._className.substr(1);
        }

        // Second case: str_func is in the form: device_id.function_id

        // quick lookup for a known pure hardware id
        if (this._valueByHwId[str_func] != undefined) {
            return { errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(str_func) };
        }
        if (dotpos > 0) {
            // either the device id is a logical name, or the function is unknown
            var devid = str_func.substr(0, dotpos);
            var funcid = str_func.substr(dotpos + 1);
            var dev = this._yapi.imm_getDevice(devid);
            if (!dev) {
                return { errorType: YAPI_DEVICE_NOT_FOUND,
                    errorMsg: 'Device [' + devid + '] not online',
                    result: null };
            }
            var serial = dev.imm_getSerialNumber();
            res = serial + '.' + funcid;
            if (this._valueByHwId[res] != undefined) {
                return { errorType: YAPI_SUCCESS,
                    errorMsg: 'no error',
                    result: String(res) };
            }

            // not found neither, may be funcid is a function logicalname
            var i,
                nfun = dev.imm_functionCount();
            for (i = 0; i < nfun; i++) {
                res = serial + '.' + dev.imm_functionId(i);
                var name = this._nameByHwId[res];
                if (name != undefined && name == funcid) {
                    return { errorType: YAPI_SUCCESS,
                        errorMsg: 'no error',
                        result: String(res) };
                }
            }
        } else {
            funcid = str_func.substr(1);
            for (var hwid_str in this._connectedFns) {
                var pos = hwid_str.indexOf('.');
                var str_function = hwid_str.substr(pos + 1);
                if (str_function == funcid) {
                    return { errorType: YAPI_SUCCESS,
                        errorMsg: 'no error',
                        result: String(hwid_str) };
                }
            }
        }
        return { errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No function [' + funcid + '] found on device [' + serial + ']',
            result: null };
    }

    /** Find the friendly name (use logical name if available) of the specified function, if currently connected
     * If device is not known as connected, return a clean error
     * This function will not cause any network access
     *
     * @param {string} str_func
     * @return {object}
     */
    imm_getFriendlyName(str_func) {
        var resolved = this.imm_resolve(str_func);
        var name;
        if (resolved.errorType != YAPI_SUCCESS) {
            return resolved;
        }
        if (this._className == 'Module') {
            var friend = resolved.result;
            name = this._nameByHwId[resolved.result];
            if (name != undefined && name != '') {
                friend = this._nameByHwId[resolved.result];
            }
            return { errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(friend) };
        } else {
            var pos = resolved.result.indexOf('.');
            var str_serialMod = resolved.result.substr(0, pos);
            var str_friendModFull = this._yapi.imm_getFriendlyNameFunction('Module', str_serialMod).result;
            var int_friendModDot = str_friendModFull.indexOf('.');
            var str_friendMod = int_friendModDot > 0 ? str_friendModFull.substr(0, int_friendModDot) : str_friendModFull;
            var str_friendFunc = resolved.result.substr(pos + 1);
            name = this._nameByHwId[resolved.result];
            if (name != undefined && name != '') {
                str_friendFunc = name;
            }
            return { errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: String(str_friendMod + '.' + str_friendFunc) };
        }
    }

    /** Associates a given function object to a function id
     *
     * @param {string} str_func
     * @param {YFunction} obj_func
     */
    imm_setFunction(str_func, obj_func) {
        var funres = this.imm_resolve(str_func);
        if (funres.result != undefined) {
            // the function has been located on a device
            this._connectedFns[funres.result] = obj_func;
        } else {
            // the function is still abstract
            this._requestedFns[str_func] = obj_func;
        }
    }

    /** Retrieve a function object by hardware id, updating the indexes on the fly if needed
     *
     * @param {string} str_func
     * @return {YFunction}
     */
    imm_getFunction(str_func) {
        var funres = this.imm_resolve(str_func);
        if (funres.errorType == YAPI_SUCCESS) {
            // the function has been located on a device
            var conn_fn = this._connectedFns[funres.result];
            if (conn_fn != undefined) return conn_fn;

            var req_fn = this._requestedFns[str_func];
            if (req_fn != undefined) {
                this._connectedFns[funres.result] = req_fn;
                delete this._requestedFns[str_func];
            }
            return req_fn;
        } else {
            // the function is still abstract
            return this._requestedFns[str_func];
        }
    }

    /** Stores a function advertised value by hardware id, and tell if an event should be queued for it
     *
     * @param {string} str_hwid
     * @param {string} str_pubval
     * @return {boolean}
     */
    imm_setFunctionValue(str_hwid, str_pubval) {
        var currval = this._valueByHwId[str_hwid];
        if (!(currval == undefined) && currval == str_pubval) {
            return false;
        }
        this._valueByHwId[str_hwid] = str_pubval;
        return true;
    }

    /** Retrieve a function advertised value by hardware id
     *
     * @param {string} str_hwid
     * @return {string}
     */
    imm_getFunctionValue(str_hwid) {
        return this._valueByHwId[str_hwid];
    }

    /** Return the basetype of this function class
     *
     * @return {string}
     */
    imm_getBaseType() {
        return this._baseType;
    }

    /** Find the hardwareId of the first instance of a given function class
     *
     * @return {string|null}
     */
    imm_getFirstHardwareId() {
        var res = null;
        //noinspection LoopStatementThatDoesntLoopJS
        for (res in this._valueByHwId) break;
        return res;
    }

    /** Find the hardwareId for the next instance of a given function class
     *
     * @param {string} str_hwid
     * @return {string|null}
     */
    imm_getNextHardwareId(str_hwid) {
        for (var iter_hwid in this._valueByHwId) {
            if (str_hwid == '!') return iter_hwid;
            if (str_hwid == iter_hwid) str_hwid = '!';
        }
        return null; // no more instance found
    }
}

class YHTTPRequest {
    /** Object storing the result of any HTTP Query, with status code and error message
     *
     * @param bin_res {Uint8Array}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(bin_res) {
        let int_errType = arguments.length <= 1 || arguments[1] === undefined ? YAPI_SUCCESS : arguments[1];
        let str_errMsg = arguments.length <= 2 || arguments[2] === undefined ? 'no error' : arguments[2];

        /** @member {Uint8Array} **/
        this.bin_result = bin_res;
        /** @member {number} **/
        this.errorType = int_errType;
        /** @member {string} **/
        this.errorMsg = str_errMsg;
        /** @member {function} **/
        this.acceptor = null;
    }
}

class YFuncRequest {
    /** Object storing the result of a function request, with status code and error message
     *
     * @param obj_res {Object}
     * @param int_errType {number}
     * @param str_errMsg {string}
     */
    constructor(obj_res) {
        let int_errType = arguments.length <= 1 || arguments[1] === undefined ? YAPI_SUCCESS : arguments[1];
        let str_errMsg = arguments.length <= 2 || arguments[2] === undefined ? 'no error' : arguments[2];

        /** @member {Object} **/
        this.obj_result = obj_res;
        /** @member {number} **/
        this.errorType = int_errType;
        /** @member {string} **/
        this.errorMsg = str_errMsg;
    }
}

// Pseudo class to describe value parsed from JSON
class _YY_LoadVal {
    constructor() {
        // hub api
        /** @member {string} **/
        this.serialNumber = '';
        /** @member {string} **/
        this.logicalName = '';
        /** @member {string} **/
        this.productName = '';
        /** @member {number} **/
        this.productId = 0;
        /** @member {number} **/
        this.beacon = 0;
        /** @member {Object} **/
        this.services = {
            whitePages: [{ networkUrl: '' }],
            yellowPages: []
        };
        // datalogger
        /** @member {string} **/
        this.calib = '';
        /** @member {string} **/
        this.unit = '';
        /** @member {string} **/
        this.cal = '';
        /** @member {string[]} **/
        this.streams = [];
        // node.js ServerResponse
        /** @member {number} **/
        this.statusCode = 0;
    }
}

//
// YDevice Class (used internally)
//
// This class is used to store everything we know about connected Yocto-Devices.
// Instances are created when devices are discovered in the white pages
// (or registered manually, for root hubs) and then used to keep track of
// device naming changes. When a device or a function is renamed, this
// object forces the local indexes to be immediately updated, even if not
// yet fully propagated through the yellow pages of the device hub.
//
// In order to regroup multiple function queries on the same physical device,
// this class implements a device-wide API string cache (agnostic of API content).
// This is in addition to the function-specific cache implemented in YFunction.
//
class YDevice {
    // Device constructor. Automatically call the YAPI functin to reindex device
    constructor(obj_yapi, str_rooturl, obj_wpRec, obj_ypRecs) {
        // private attributes
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        /** @member {string} **/
        this._rootUrl = str_rooturl;
        /** @member {string} **/
        this._serialNumber = '';
        /** @member {string} **/
        this._logicalName = '';
        /** @member {string} **/
        this._productName = '';
        /** @member {number} **/
        this._productId = 0;
        /** @member {number} **/
        this._beacon = 0;
        /** @member {number} **/
        this._devYdx = -1;
        /** @member {number} **/
        this._lastErrorType = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg = 'no error';
        /** @member {Object} **/
        this._cache = { _expiration: 0, _json: new Uint8Array(0) };
        /** @member {string[][]} **/
        this._functions = [];
        /** @member {number} **/
        this._busy = 0;
        /** @member {Promise} **/
        this._pendingQueries = Promise.resolve();
        /** @member {number} **/
        this._deviceTime = 0;

        if (obj_wpRec != undefined) {
            // preload values from white pages, if provided
            this._serialNumber = obj_wpRec.serialNumber;
            this._logicalName = obj_wpRec.logicalName;
            this._productName = obj_wpRec.productName;
            this._productId = obj_wpRec.productId;
            this._beacon = obj_wpRec.beacon;
            this._devYdx = obj_wpRec.index == undefined ? -1 : obj_wpRec.index;
            this.imm_updateFromYP(obj_ypRecs);
            this._yapi.imm_reindexDevice(this);
        }
        // when obj_wpRec is not provided, caller MUSTR
        // call async method refresh()
    }

    _throw(int_errType, str_errMsg, obj_retVal) {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    /** Return the root URL used to access a device (including the trailing slash)
     *
     * @returns {string}
     */
    imm_getRootUrl() {
        return this._rootUrl;
    }

    /** Return the serial number of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getSerialNumber() {
        return this._serialNumber;
    }

    /** Return the logical name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getLogicalName() {
        return this._logicalName;
    }

    /** Return the product name of the device, as found during discovery
     *
     * @returns {string}
     */
    imm_getProductName() {
        return this._productName;
    }

    /** Return the product Id of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getProductId() {
        return this._productId;
    }

    /** Return the beacon state of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getBeacon() {
        return this._beacon;
    }

    // Return the value of the last timestamp sent by the device, if any
    imm_getDeviceTime() {
        return this._deviceTime;
    }

    /** Return the value of the last timestamp sent by the device, if any
     *
     * @param float_timestamp {number}
     */
    imm_setDeviceTime(float_timestamp) {
        this._deviceTime = float_timestamp;
    }

    /** Return the hub-specific devYdx of the device, as found during discovery
     *
     * @returns {number}
     */
    imm_getDevYdx() {
        return this._devYdx;
    }

    /** Return a string that describes the device (serial number, logical name or root URL)
     *
     * @returns {string}
     */
    imm_describe() {
        var res = this._rootUrl;
        if (this._serialNumber != '') {
            res = this._serialNumber;
            if (this._logicalName != '') {
                res = res + ' (' + this._logicalName + ')';
            }
        }
        return this._productName + ' ' + res;
    }

    /** Update device cache and YAPI function lists from yp records
     *
     * @param obj_ypRecs {Object}
     */
    imm_updateFromYP(obj_ypRecs) {
        var funidx = 0;
        for (var categ in obj_ypRecs) {
            for (var key in obj_ypRecs[categ]) {
                var rec = obj_ypRecs[categ][key];
                var hwid = rec['hardwareId'];
                var dotpos = hwid.indexOf('.');
                if (hwid.substr(0, dotpos) == this._serialNumber) {
                    var funydx = rec['index'];
                    if (funydx == undefined) funydx = funidx;
                    this._functions[funydx] = [hwid.substr(dotpos + 1), rec['logicalName']];
                    funidx++;
                }
            }
        }
    }

    /** Update device cache and YAPI function lists accordingly
     *
     * @param yreq {YHTTPRequest}
     * @param loadval {Object}
     */
    imm_updateFromReq(yreq, loadval) {
        this._cache._expiration = this._yapi.GetTickCount() + this._yapi.defaultCacheValidity;
        this._cache._json = yreq.bin_result;

        var func;
        var reindex = false;
        if (this._productName == '') {
            // parse module and function names for the first time
            for (func in loadval) {
                if (func == 'module') {
                    this._serialNumber = loadval.module.serialNumber;
                    this._logicalName = loadval.module.logicalName;
                    this._productName = loadval.module.productName;
                    this._productId = loadval.module.productId;
                    this._beacon = loadval.module.beacon;
                } else if (func == 'services') {
                    this.imm_updateFromYP(loadval.services.yellowPages);
                }
            }
            reindex = true;
        } else {
            // parse module and refresh names if needed
            var renamed = false;
            for (func in loadval) {
                if (func == 'module') {
                    if (this._logicalName != loadval.module.logicalName) {
                        this._logicalName = loadval.module.logicalName;
                        reindex = true;
                    }
                    this._beacon = loadval.module.beacon;
                } else if (func != 'services') {
                    var name = loadval[func]['logicalName'];
                    if (name == undefined) name = loadval.module.logicalName;
                    var pubval = loadval[func]['advertisedValue'];
                    if (pubval != undefined) {
                        this._yapi.imm_setFunctionValue(loadval.module.serialNumber + '.' + func, pubval);
                    }
                    var funydx;
                    for (funydx in this._functions) {
                        if (this._functions[funydx][0] == func) {
                            if (this._functions[funydx][1] != name) {
                                this._functions[funydx][1] = name;
                                reindex = true;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if (reindex) {
            this._yapi.imm_reindexDevice(this);
        }
    }

    // Force the REST API string in cache to expire immediately
    imm_dropCache() {
        this._cache._expiration = 0;
    }

    /** Retrieve the number of functions (beside "module") in the device
     *
     * @returns {Number}
     */
    imm_functionCount() {
        return this._functions.length;
    }

    /** Retrieve the Id of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionId(int_idx) {
        if (int_idx < this._functions.length) {
            return this._functions[int_idx][0];
        }
        return '';
    }

    /** Retrieve the base type of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionBaseType(int_idx) {
        if (int_idx < this._functions.length) {
            var ftype = this._yapi.imm_getFunctionBaseType(this._serialNumber + '.' + this._functions[int_idx][0]);
            for (var name in Y_BASETYPES) {
                if (Y_BASETYPES[name] == ftype) {
                    return name;
                }
            }
        }
        return 'Function';
    }

    /** Retrieve the type of the nth function (beside 'module') in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionType(int_idx) {
        if (int_idx < this._functions.length) {
            var funid = this._functions[int_idx][0];
            var i;
            for (i = 0; i < funid.length; i++) {
                if (funid[i] >= '0' && funid[i] <= '9') {
                    break;
                }
            }
            return funid[0].toUpperCase() + funid.substr(1, i - 1);
        }
        return '';
    }

    /** Retrieve the logical name of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionName(int_idx) {
        if (int_idx < this._functions.length) {
            return this._functions[int_idx][1];
        }
        return '';
    }

    /** Retrieve the advertised value of the nth function (beside "module") in the device
     *
     * @param int_idx {number}
     * @returns {string}
     */
    imm_functionValue(int_idx) {
        if (int_idx < this._functions.length) {
            return this._yapi.imm_getFunctionValue(this._serialNumber + '.' + this._functions[int_idx][0]);
        }
        return '';
    }

    /** Get the whole REST API string for a device, from cache if possible
     *
     * @param int_msValidity {number}
     * @returns {YHTTPRequest}
     */
    requestAPI(int_msValidity) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cache._expiration > _this._yapi.GetTickCount()) {
                return new YHTTPRequest(_this._cache._json);
            }
            /** @type {YHTTPRequest} **/
            let yreq = yield _this._yapi.devRequest(_this._rootUrl, 'GET /api.json');
            if (yreq.errorType != YAPI_SUCCESS) return yreq;
            if (!int_msValidity) {
                int_msValidity = _this._yapi.defaultCacheValidity;
            }
            _this._cache._expiration = _this._yapi.GetTickCount() + int_msValidity;
            _this._cache._json = yreq.bin_result;
            return yreq;
        })();
    }

    /** Reload a device API (store in cache), and update YAPI function lists accordingly
     *
     * @returns {number}
     */
    refresh() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            /** @type {YHTTPRequest} **/
            let yreq = yield _this2.requestAPI(_this2._yapi.defaultCacheValidity);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _this2._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }

            let loadval = null;
            try {
                loadval = JSON.parse(_this2._yapi.imm_bin2str(yreq.bin_result));
            } catch (err) {}
            if (!loadval) {
                return _this2._throw(YAPI_IO_ERROR, 'Request failed, could not parse API result for ' + _this2._rootUrl, YAPI_IO_ERROR);
            }
            _this2.imm_updateFromReq(yreq, loadval);
            return YAPI_SUCCESS;
        })();
    }
}

//--- (generated code: YFirmwareUpdate definitions)
//--- (end of generated code: YFirmwareUpdate definitions)

//--- (generated code: YFirmwareUpdate class start)
/**
 * YFirmwareUpdate Class: Control interface for the firmware update process
 *
 * The YFirmwareUpdate class let you control the firmware update of a Yoctopuce
 * module. This class should not be instantiate directly, instead the method
 * updateFirmware should be called to get an instance of YFirmwareUpdate.
 */
//--- (end of generated code: YFirmwareUpdate class start)
class YFirmwareUpdate {
    constructor(obj_yapi, str_serial, str_path, bin_settings) {
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        //--- (generated code: YFirmwareUpdate constructor)
        /** @member {string} **/
        this._serial = '';
        /** @member {Uint8Array} **/
        this._settings = new Uint8Array(0);
        /** @member {string} **/
        this._firmwarepath = '';
        /** @member {string} **/
        this._progress_msg = '';
        /** @member {number} **/
        this._progress_c = 0;
        /** @member {number} **/
        this._progress = 0;
        /** @member {number} **/
        this._restore_step = 0;
        //--- (end of generated code: YFirmwareUpdate constructor)
        /** @member {string} **/
        this._serial = str_serial;
        /** @member {Uint8Array} **/
        this._settings = bin_settings;
        /** @member {string} **/
        this._firmwarepath = str_path;
    }

    _processMore(i) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            _this3._progress = -1;
            _this3._progress_msg = 'not supported in JS';
        })();
    }

    /**
     * Test if the byn file is valid for this module. It's possible to pass an directory instead of a file.
     * In this case this method return the path of the most recent appropriate byn file. This method will
     * ignore firmware that are older than mintrelase.
     *
     * @param serial {string} : the serial number of the module to update
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param minrelease {number} : a positive integer
     *
     * @return {string} : the path of the byn file to use or an empty string if no byn files match the requirement
     *
     * On failure, returns a string that start with "error:".
     */
    static CheckFirmware(serial, path, minrelease) {
        return _asyncToGenerator(function* () {
            // FIXME: to be implemented
            return 'error: Not yet supported in Javascript';
        })();
    }

    static GetAllBootLoaders() {
        return _asyncToGenerator(function* () {
            // FIXME: to be implemented
            return [];
        })();
    }

    //--- (generated code: YFirmwareUpdate implementation)

    // cannot be generated for JS:
    // async _processMore(newupdate)

    // cannot be generated for JS:
    // static GetAllBootLoaders()

    // cannot be generated for JS:
    // static GetAllBootLoadersInContext(yctx)

    // cannot be generated for JS:
    // static CheckFirmware(serial,path,minrelease)

    /**
     * Returns the progress of the firmware update, on a scale from 0 to 100. When the object is
     * instantiated, the progress is zero. The value is updated during the firmware update process until
     * the value of 100 is reached. The 100 value means that the firmware update was completed
     * successfully. If an error occurs during the firmware update, a negative value is returned, and the
     * error message can be retrieved with get_progressMessage.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion)
     *         or a negative error code in case of failure.
     */
    get_progress() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._progress >= 0) {
                yield _this4._processMore(0);
            }
            return _this4._progress;
        })();
    }

    /**
     * Returns the last progress message of the firmware update process. If an error occurs during the
     * firmware update process, the error message is returned
     *
     * @return {string} a string  with the latest progress message, or the error message.
     */
    get_progressMessage() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            return _this5._progress_msg;
        })();
    }

    /**
     * Starts the firmware update process. This method starts the firmware update process in background. This method
     * returns immediately. You can monitor the progress of the firmware update with the get_progress()
     * and get_progressMessage() methods.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure returns a negative error code.
     */
    startUpdate() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let err;
            /** @type {number} **/
            let leng;
            err = _this6._yapi.imm_bin2str(_this6._settings);
            leng = err.length;
            if (leng >= 6 && 'error:' == err.substr(0, 6)) {
                _this6._progress = -1;
                _this6._progress_msg = err.substr(6, leng - 6);
            } else {
                _this6._progress = 0;
                _this6._progress_c = 0;
                yield _this6._processMore(1);
            }
            return _this6._progress;
        })();
    }

    //--- (end of generated code: YFirmwareUpdate implementation)
}

//--- (generated code: YFunction class start)
/**
 * YFunction Class: Common function interface
 *
 * This is the parent class for all public objects representing device functions documented in
 * the high-level programming API. This abstract class does all the real job, but without
 * knowledge of the specific function attributes.
 *
 * Instantiating a child class of YFunction does not cause any communication.
 * The instance simply keeps track of its function identifier, and will dynamically bind
 * to a matching device at the time it is really being used to read or set an attribute.
 * In order to allow true hot-plug replacement of one device by another, the binding stay
 * dynamic through the life of the object.
 *
 * The YFunction class implements a generic high-level cache for the attribute values of
 * the specified function, pre-parsed from the REST API string.
 */
//--- (end of generated code: YFunction class start)
class YFunction {
    constructor(obj_yapi, str_func) {
        // private
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        /** @member {string} **/
        this._className = 'Function';
        /** @member {string} **/
        this._func = str_func;
        /** @member {number} **/
        this._lastErrorType = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg = 'no error';
        /** @member {Object} **/
        this._dataStreams = {};
        /** @member {Object} **/
        this._userData = null;
        /** @member {Object} **/
        this._cache = { _expiration: 0 };
        //--- (generated code: YFunction constructor)
        /** @member {string} **/
        this._logicalName = Y_LOGICALNAME_INVALID;
        /** @member {string} **/
        this._advertisedValue = Y_ADVERTISEDVALUE_INVALID;
        /** @member {function} **/
        this._valueCallbackFunction = null;
        /** @member {number} **/
        this._cacheExpiration = 0;
        /** @member {string} **/
        this._serial = '';
        /** @member {string} **/
        this._funId = '';
        /** @member {string} **/
        this._hwId = '';
        /** @member {string} **/
        this.FUNCTIONDESCRIPTOR_INVALID = YAPI_INVALID_STRING;
        /** @member {string} **/
        this.HARDWAREID_INVALID = YAPI_INVALID_STRING;
        /** @member {string} **/
        this.FUNCTIONID_INVALID = YAPI_INVALID_STRING;
        /** @member {string} **/
        this.FRIENDLYNAME_INVALID = YAPI_INVALID_STRING;
        /** @member {string} **/
        this.LOGICALNAME_INVALID = YAPI_INVALID_STRING;
        /** @member {string} **/
        this.ADVERTISEDVALUE_INVALID = YAPI_INVALID_STRING;
        //--- (end of generated code: YFunction constructor)
    }

    _throw(int_errType, str_errMsg, obj_retVal) {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    imm_setConst(obj) {
        for (let key in obj) {
            this[key] = obj[key];
            this.constructor[key] = obj[key];
        }
    }

    //--- (generated code: YFunction implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case '_expiration':
                this._cacheExpiration = val;
                return 1;
            case 'logicalName':
                this._logicalName = val;
                return 1;
            case 'advertisedValue':
                this._advertisedValue = val;
                return 1;
        }
        return 0;
    }

    /**
     * Returns the logical name of the function.
     *
     * @return {string} a string corresponding to the logical name of the function
     *
     * On failure, throws an exception or returns YFunction.LOGICALNAME_INVALID.
     */
    get_logicalName() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_LOGICALNAME_INVALID;
                }
            }
            return _this7._logicalName;
        })();
    }

    /**
     * Changes the logical name of the function. You can use yCheckLogicalName()
     * prior to this call to make sure that your parameter is valid.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the logical name of the function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logicalName(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            if (!_this8._yapi.CheckLogicalName(newval)) {
                return _this8._throw(_this8._yapi.INVALID_ARGUMENT, 'Invalid name :' + newval, _this8._yapi.INVALID_ARGUMENT);
            }
            rest_val = newval;
            return yield _this8._setAttr('logicalName', rest_val);
        })();
    }

    /**
     * Returns a short string representing the current state of the function.
     *
     * @return {string} a string corresponding to a short string representing the current state of the function
     *
     * On failure, throws an exception or returns YFunction.ADVERTISEDVALUE_INVALID.
     */
    get_advertisedValue() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_ADVERTISEDVALUE_INVALID;
                }
            }
            return _this9._advertisedValue;
        })();
    }

    set_advertisedValue(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this10._setAttr('advertisedValue', rest_val);
        })();
    }

    /**
     * Retrieves a function for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the function
     *
     * @return {YFunction} a YFunction object allowing you to drive the function.
     */
    static FindFunction(func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Function', func);
        if (obj == null) {
            obj = new YFunction(YAPI, func);
            YFunction._AddToCache('Function', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a function for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the function is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFunction.isOnline() to test if the function is
     * indeed online at a given time. In case of ambiguity when looking for
     * a function by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the function
     *
     * @return {YFunction} a YFunction object allowing you to drive the function.
     */
    static FindFunctionInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Function', func);
        if (obj == null) {
            obj = new YFunction(yctx, func);
            YFunction._AddToCache('Function', func, obj);
        }
        return obj;
    }

    /**
     * Registers the callback function that is invoked on every change of advertised value.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the function object of which the value has changed, and the character string describing
     *         the new advertised value.
     * @noreturn
     */
    registerValueCallback(callback) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let val;
            if (callback != null) {
                yield YFunction._UpdateValueCallbackList(_this11, true);
            } else {
                yield YFunction._UpdateValueCallbackList(_this11, false);
            }
            _this11._valueCallbackFunction = callback;
            // Immediately invoke value callback with current value
            if (callback != null && (yield _this11.isOnline())) {
                val = _this11._advertisedValue;
                if (!(val == '')) {
                    yield _this11._invokeValueCallback(val);
                }
            }
            return 0;
        })();
    }

    _invokeValueCallback(value) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._valueCallbackFunction != null) {
                yield _this12._valueCallbackFunction(_this12, value);
            } else {}
            return 0;
        })();
    }

    /**
     * Disable the propagation of every new advertised value to the parent hub.
     * You can use this function to save bandwidth and CPU on computers with limited
     * resources, or to prevent unwanted invocations of the HTTP callback.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    muteValueCallbacks() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return yield _this13.set_advertisedValue('SILENT');
        })();
    }

    /**
     * Re-enable the propagation of every new advertised value to the parent hub.
     * This function reverts the effect of a previous call to muteValueCallbacks().
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    unmuteValueCallbacks() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            return yield _this14.set_advertisedValue('');
        })();
    }

    _parserHelper() {
        return _asyncToGenerator(function* () {
            return 0;
        })();
    }

    /**
     * Returns the next Function
     *
     * @returns {YFunction}
     */
    nextFunction() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YFunction.FindFunctionInContext(this._yapi, next_hwid);
    }

    /**
     * Retrieves the first Function in a YAPI context
     *
     * @returns {YFunction}
     */
    static FirstFunction() {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Function');
        if (next_hwid == null) return null;
        return YFunction.FindFunction(next_hwid);
    }

    /**
     * Retrieves the first Function in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YFunction}
     */
    static FirstFunctionInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Function');
        if (next_hwid == null) return null;
        return YFunction.FindFunctionInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YFunction implementation)

    /** Retrieve a function instance from cache
     *
     * @param yctx {YAPIContext}
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCacheInContext(yctx, className, func) {
        return yctx.imm_getFunction(className, func);
    }

    /** Retrieve a function instance from cache
     *
     * @param className {string}
     * @param func {string}
     * @returns {YFunction}
     */
    static _FindFromCache(className, func) {
        return YAPI.imm_getFunction(className, func);
    }

    /** Add a function instance to cache
     *
     * @param className {string}
     * @param func {string}
     * @param obj {YFunction}
     */
    static _AddToCache(className, func, obj) {
        obj._yapi.imm_setFunction(className, func, obj);
    }

    /** Clear the function instance cache
     *
     * @param obj_yapi {YAPIContext}
     */
    static _ClearCache() {
        let obj_yapi = arguments.length <= 0 || arguments[0] === undefined ? YAPI : arguments[0];

        obj_yapi.imm_init();
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    static _UpdateValueCallbackList(obj_func, bool_add) {
        return _asyncToGenerator(function* () {
            yield obj_func._yapi._UpdateValueCallbackList(obj_func, bool_add);
        })();
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    static _UpdateTimedReportCallbackList(obj_func, bool_add) {
        return _asyncToGenerator(function* () {
            yield obj_func._yapi._UpdateTimedReportCallbackList(obj_func, bool_add);
        })();
    }

    /**
     * Returns a short text that describes unambiguously the instance of the function in the form
     * TYPE(NAME)=SERIAL&#46;FUNCTIONID.
     * More precisely,
     * TYPE       is the type of the function,
     * NAME       it the name used for the first access to the function,
     * SERIAL     is the serial number of the module if the module is connected or "unresolved", and
     * FUNCTIONID is  the hardware identifier of the function if the module is connected.
     * For example, this method returns Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1 if the
     * module is already connected or Relay(BadCustomeName.relay1)=unresolved if the module has
     * not yet been connected. This method does not trigger any USB or TCP transaction and can therefore be used in
     * a debugger.
     *
     * @return {string} a string that describes the function
     *         (ex: Relay(MyCustomName.relay1)=RELAYLO1-123456.relay1)
     */
    describe() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._hwId != '') {
                return _this15._className + '(' + _this15._func + ')=' + _this15._hwId;
            }
            var resolve = _this15._yapi.imm_resolveFunction(_this15._className, _this15._func);
            if (resolve.errorType != YAPI_SUCCESS && resolve.result != _this15._func) {
                return _this15._className + '(' + _this15._func + ')=unresolved';
            }
            return _this15._className + '(' + _this15._func + ')=' + resolve.result;
        })();
    }

    /**
     * Returns the unique hardware identifier of the function in the form SERIAL.FUNCTIONID.
     * The unique hardware identifier is composed of the device serial
     * number and of the hardware identifier of the function (for example RELAYLO1-123456.relay1).
     *
     * @return {string} a string that uniquely identifies the function (ex: RELAYLO1-123456.relay1)
     *
     * On failure, throws an exception or returns  YFunction.HARDWAREID_INVALID.
     */
    get_hardwareId() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._hwId != '') {
                return _this16._hwId;
            }
            var resolve = _this16._yapi.imm_resolveFunction(_this16._className, _this16._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                yield _this16.isOnline();
                resolve = _this16._yapi.imm_resolveFunction(_this16._className, _this16._func);
                if (resolve.errorType != YAPI_SUCCESS) {
                    return _this16._throw(resolve.errorType, resolve.errorMsg, Y_HARDWAREID_INVALID);
                }
            }
            return resolve.result;
        })();
    }

    /**
     * Returns the hardware identifier of the function, without reference to the module. For example
     * relay1
     *
     * @return {string} a string that identifies the function (ex: relay1)
     *
     * On failure, throws an exception or returns  YFunction.FUNCTIONID_INVALID.
     */
    get_functionId() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._funId != '') {
                return _this17._funId;
            }
            var resolve = _this17._yapi.imm_resolveFunction(_this17._className, _this17._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                yield _this17.isOnline();
                resolve = _this17._yapi.imm_resolveFunction(_this17._className, _this17._func);
                if (resolve.errorType != YAPI_SUCCESS) {
                    return _this17._throw(resolve.errorType, resolve.errorMsg, Y_FUNCTIONID_INVALID);
                }
            }
            var pos = resolve.result.indexOf('.');
            return resolve.result.substr(pos + 1);
        })();
    }

    /**
     * Returns a global identifier of the function in the format MODULE_NAME&#46;FUNCTION_NAME.
     * The returned string uses the logical names of the module and of the function if they are defined,
     * otherwise the serial number of the module and the hardware identifier of the function
     * (for example: MyCustomName.relay1)
     *
     * @return {string} a string that uniquely identifies the function using logical names
     *         (ex: MyCustomName.relay1)
     *
     * On failure, throws an exception or returns  YFunction.FRIENDLYNAME_INVALID.
     */
    get_friendlyName() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            var resolve = _this18._yapi.imm_getFriendlyNameFunction(_this18._className, _this18._func);
            if (resolve.errorType != YAPI_SUCCESS) {
                yield _this18.isOnline();
                resolve = _this18._yapi.imm_getFriendlyNameFunction(_this18._className, _this18._func);
                if (resolve.errorType != YAPI_SUCCESS) {
                    return _this18._throw(resolve.errorType, resolve.errorMsg, Y_FRIENDLYNAME_INVALID);
                }
            }
            return resolve.result;
        })();
    }

    /** Store and parse a an API request for current function
     *
     * @param {YFuncRequest} yreq
     * @param {number} msValidity
     */
    _parse(yreq, msValidity) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            // save the whole structure for backward-compatibility
            yreq.obj_result['_expiration'] = _this19._yapi.GetTickCount() + msValidity;
            _this19._serial = yreq.obj_result.deviceid;
            _this19._funId = yreq.obj_result.functionid;
            _this19._hwId = yreq.obj_result.hwid;
            _this19._cache = yreq.obj_result;
            // process each attribute in turn for class-oriented processing
            for (var key in yreq.obj_result) {
                _this19.imm_parseAttr(key, yreq.obj_result[key]);
            }
            yield _this19._parserHelper();
        })();
    }

    // Helper for the VirtualHub (backward-compatible)
    _g(str_attr) {
        this.imm_parseAttr(str_attr, this._cache[str_attr]);
        return this['_' + str_attr];
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    _getAttr(str_attr) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            if (_this20._cacheExpiration <= _this20._yapi.GetTickCount()) {
                // no valid cached value, reload from device
                if ((yield _this20.load(_this20._yapi.defaultCacheValidity)) != YAPI_SUCCESS) return null;
            }
            if (typeof _this20._cache[str_attr] == 'undefined') {
                _this20._throw(YAPI_VERSION_MISMATCH, 'No such attribute ' + str_attr + ' in function', null);
            }
            return _this20._cache[str_attr];
        })();
    }

    /** Return the value of an attribute from function cache, after reloading it from device if needed
     * Note: the function cache is a typed (parsed) cache, contrarily to the agnostic device cache
     *
     * @param {string} str_attr
     * @return {string|null}
     */
    _getFixedAttr(str_attr) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            if (_this21._cacheExpiration == 0) {
                // no cached value, load from device
                if ((yield _this21.load(_this21._yapi.defaultCacheValidity)) != YAPI_SUCCESS) return null;
            }
            if (typeof _this21._cache[str_attr] == 'undefined') {
                _this21._throw(YAPI_VERSION_MISMATCH, 'No such attribute ' + str_attr + ' in function', null);
            }
            return _this21._cache[str_attr];
        })();
    }

    /** Escape a string for posting it as an URL
     *
     * @param {string} str_newval
     * @return {string}
     */
    imm_escapeAttr(str_newval) {
        // We intentionally use escape here, because we want to encode non-ASCII
        // characters using single-byte ISO characters (not multi-byte UTF-8)
        return escape(str_newval).replace(/[+]/g, '%2B').replace(/%20/g, '+').replace(/%21/g, '!').replace(/%24/g, '$').replace(/%27/g, '\'').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2[cC]/g, ',').replace(/%2[fF]/g, '/').replace(/%3[aA]/g, ':').replace(/%3[bB]/g, ';').replace(/%3[fF]/g, '?').replace(/%5[bB]/g, '[').replace(/%5[dD]/g, ']');
    }

    /** Change the value of an attribute on a device, and invalidate the cache
     *
     * @param {string} str_attr
     * @param {string} str_newval
     * @return {number}
     */
    _setAttr(str_attr, str_newval) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            if (str_newval == undefined) {
                return _this22._throw(YAPI_INVALID_ARGUMENT, 'Undefined value to set for attribute ' + str_attr, null);
            }
            var attrname = encodeURIComponent(str_attr);
            var attrval = _this22.imm_escapeAttr(str_newval);
            var extra = '/' + attrname + '?' + attrname + '=' + attrval + '&.';
            if (_this22._cacheExpiration != 0) {
                _this22._cacheExpiration = _this22._yapi.GetTickCount();
                _this22._cache._expiration = _this22._cacheExpiration;
            }
            yield _this22._yapi.funcRequest(_this22._className, _this22._func, extra);

            return YAPI_SUCCESS;
        })();
    }

    /** Execute an arbitrary HTTP GET request on the device and return the binary content
     *
     * @param {string} str_path
     * @return {Uint8Array}
     */
    _download(str_path) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            // get the device serial number
            /** @type {string} **/
            let devid = _this23._serial;
            if (devid == '') {
                devid = yield _this23.module().get_serialNumber();
            }
            if (devid == Y_SERIALNUMBER_INVALID) {
                return new Uint8Array(0);
            }
            /** @type {YHTTPRequest} **/
            let yreq = yield _this23._yapi.devRequest(devid, 'GET /' + str_path);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _this23._throw(yreq.errorType, yreq.errorMsg, '');
            }
            return yreq.bin_result;
        })();
    }

    /** Upload a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param {string} str_path
     * @param {Uint8Array|string|number[]} bin_content
     * @return {object}
     */
    _upload(str_path, bin_content) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            // get the device serial number
            var devid = _this24._serial;
            if (devid == '') {
                devid = yield _this24.module().get_serialNumber();
            }
            if (devid == Y_SERIALNUMBER_INVALID) {
                return _this24.get_errorType();
            }
            var httpreq = 'POST /upload.html';
            var len = bin_content.length;
            // convert to Uint8Array if needed
            if (typeof bin_content == 'string' || bin_content instanceof String) {
                bin_content = _this24._yapi.imm_str2bin(bin_content);
            } else if (bin_content instanceof Array) {
                bin_content = new Uint8Array(bin_content);
            }
            return yield _this24._yapi.devRequest(devid, httpreq, bin_content);
        })();
    }

    /**
     * Waits for all pending asynchronous commands on the module to complete, and invoke
     * the user-provided callback function. The callback function can therefore freely
     * issue synchronous or asynchronous commands, without risking to block the
     * Javascript VM.
     *
     * @param callback : callback function that is invoked when all pending commands on
     *         the module are completed.
     *         The callback function receives two arguments: the caller-specific
     *         context object and the receiving function object.
     * @param context : caller-specific object that is passed as-is to the callback function
     *
     * @return nothing.
     */
    wait_async(callback) {
        var _this25 = this;

        let context = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        // get the device serial number
        var devid = this._serial;
        if (devid == '') {
            // serial not yet known, get it then call wait_async again
            this.module().get_serialNumber().then(function () {
                return _this25.wait_async(callback, context);
            });
            return YAPI_SUCCESS;
        }
        if (devid == Y_SERIALNUMBER_INVALID) {
            callback(context, this);
            return YAPI_SUCCESS;
        }
        var lockdev = this._yapi.imm_getDevice(devid);

        // queue the call to user callback function in the pending queries promise chain
        var delayedCode = function () {
            callback(context, _this25);
        };
        lockdev._pendingQueries = lockdev._pendingQueries.then(delayedCode, delayedCode);
        return YAPI_SUCCESS;
    }

    /** Get a value from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @param str_key {string}
     * @return {string}
     **/
    imm_json_get_key(bin_jsonbuff, str_key) {
        var loadval = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        if (typeof loadval[str_key] != 'undefined') {
            return loadval[str_key];
        }
        return '';
    }

    /** Get a string from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string}
     **/
    imm_json_get_string(bin_jsonbuff) {
        return JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param bin_jsonbuff {Uint8Array}
     * @return {string[]}
     **/
    imm_json_get_array(bin_jsonbuff) {
        var loadval = JSON.parse(this._yapi.imm_bin2str(bin_jsonbuff));
        var res = [];
        for (var idx in loadval) {
            res.push(JSON.stringify(loadval[idx]));
        }
        return res;
    }

    /** Get an array of strings from a JSON buffer
     *
     * @param str_json {string}
     * @param str_path {string}
     * @return {string}
     **/
    imm_get_json_path(str_json, str_path) {
        var json = JSON.parse(str_json);
        var paths = str_path.split('|');
        for (var i = 0; i < paths.length; i++) {
            var tmp = paths[i];
            json = json[tmp];
            if (json == undefined) {
                return '';
            }
        }
        return JSON.stringify(json);
    }

    /** Get a string from a JSON string
     *
     * @param str_json {string}
     * @return {string}
     **/
    imm_decode_json_string(str_json) {
        return JSON.parse(str_json);
    }

    // Method used to cache DataStream objects (new DataLogger)
    //
    /** Method used to cache DataStream objects (new DataLogger)
     *
     * @param obj_dataset {YDataSet}
     * @param str_def {string}
     * @return {YDataStream}
     **/
    imm_findDataStream(obj_dataset, str_def) {
        /** @type {string} **/
        let key = obj_dataset.imm_get_functionId() + ':' + str_def;
        if (this._dataStreams[key]) return this._dataStreams[key];

        /** @type {YDataStream} **/
        var newDataStream = new YDataStream(this, obj_dataset, this._yapi.imm_decodeWords(str_def));
        this._dataStreams[key] = newDataStream;
        return newDataStream;
    }

    // Method used to clear cache of DataStream object (undocumented)
    clearDataStreamCache() {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            _this26._dataStreams = {};
        })();
    }

    /**
     * Checks if the function is currently reachable, without raising any error.
     * If there is a cached value for the function in cache, that has not yet
     * expired, the device is considered reachable.
     * No exception is raised if there is an error while trying to contact the
     * device hosting the function.
     *
     * @return {boolean} true if the function can be reached, and false otherwise
     */
    isOnline() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            // A valid value in cache means that the device is online
            if (_this27._cacheExpiration > _this27._yapi.GetTickCount()) return true;

            // Check that the function is available without throwing exceptions
            /** @type {YFuncRequest} **/
            let yreq = yield _this27._yapi.funcRequest(_this27._className, _this27._func, '', _this27._yapi.defaultCacheValidity);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (yreq.errorType == YAPI_DEVICE_BUSY) {
                    return true;
                } else {
                    return false;
                }
            }
            // save result in cache anyway
            yield _this27._parse(yreq, _this27._yapi.defaultCacheValidity);

            return true;
        })();
    }

    /**
     * Returns the numerical error code of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {number} a number corresponding to the code of the latest error that occurred while
     *         using the function object
     */
    get_errorType() {
        return this._lastErrorType;
    }

    /**
     * Returns the error message of the latest error with the function.
     * This method is mostly useful when using the Yoctopuce library with
     * exceptions disabled.
     *
     * @return {string} a string corresponding to the latest error message that occured while
     *         using the function object
     */
    get_errorMessage() {
        return this._lastErrorMsg;
    }

    /**
     * Preloads the function cache with a specified validity duration.
     * By default, whenever accessing a device, all function attributes
     * are kept in cache for the standard duration (5 ms). This method can be
     * used to temporarily mark the cache as valid for a longer period, in order
     * to reduce network traffic for instance.
     *
     * @param msValidity {number} : an integer corresponding to the validity attributed to the
     *         loaded function parameters, in milliseconds
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    load(msValidity) {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            /** @type {YFuncRequest} **/
            let yreq = yield _this28._yapi.funcRequest(_this28._className, _this28._func, '', msValidity);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _this28._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }
            yield _this28._parse(yreq, msValidity);

            return YAPI_SUCCESS;
        })();
    }

    /**
     * Invalidates the cache. Invalidates the cache of the function attributes. Forces the
     * next call to get_xxx() or loadxxx() to use values that come from the device.
     *
     * @noreturn
     */
    clearCache() {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            var devreq = yield _this29._yapi._funcDev(_this29._className, _this29._func);
            if (devreq.errorType != YAPI_SUCCESS) {
                return;
            }
            devreq.result.device.imm_dropCache();
            if (_this29._cacheExpiration > 0) {
                _this29._cacheExpiration = _this29._yapi.GetTickCount();
            }
        })();
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    module() {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            // try to resolve the function name to a device id without query
            if (_this30._serial != '') {
                return yield yFindModuleInContext(_this30._yapi, _this30._serial + '.module');
            }
            var hwid = _this30._func;
            var resolve;
            if (hwid.indexOf('.') < 0) {
                resolve = _this30._yapi.imm_resolveFunction(_this30._className, _this30._func);
                if (resolve.errorType == YAPI_SUCCESS) hwid = resolve.result;
            }
            var dotidx = hwid.indexOf('.');
            if (dotidx >= 0) {
                // resolution worked
                return yield YModule.FindModuleInContext(_this30._yapi, hwid.substr(0, dotidx) + '.module');
            }

            // device not resolved for now, force a communication for a last chance resolution
            if ((yield _this30.load(_this30._yapi.defaultCacheValidity)) == YAPI_SUCCESS) {
                resolve = _this30._yapi.imm_resolveFunction(_this30._className, _this30._func);
                if (resolve.result != undefined) hwid = resolve.result;
            }
            dotidx = hwid.indexOf('.');
            if (dotidx >= 0) {
                // resolution worked
                return yield YModule.FindModuleInContext(_this30._yapi, hwid.substr(0, dotidx) + '.module');
            }
            // return a true yFindModule object even if it is not a module valid for communicating
            return yield YModule.FindModuleInContext(_this30._yapi, 'module_of_' + _this30.className + '_' + _this30._func);
        })();
    }

    /**
     * Gets the YModule object for the device on which the function is located.
     * If the function cannot be located on any module, the returned instance of
     * YModule is not shown as on-line.
     *
     * @return {YModule} an instance of YModule
     */
    get_module() {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            return yield _this31.module();
        })();
    }

    /**
     * Returns a unique identifier of type YFUN_DESCR corresponding to the function.
     * This identifier can be used to test if two instances of YFunction reference the same
     * physical function on the same physical device.
     *
     * @return {string} an identifier of type YFUN_DESCR.
     *
     * If the function has never been contacted, the returned value is YFunction.FUNCTIONDESCRIPTOR_INVALID.
     */
    get_functionDescriptor() {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            // try to resolve the function name to a device id without query
            if (_this32._hwId != '') {
                return _this32._hwId;
            }
            var hwid = _this32._func;
            if (hwid.indexOf('.') < 0) {
                var resolve = _this32._yapi.imm_resolveFunction(_this32._className, _this32._func);
                if (resolve.errorType != YAPI_SUCCESS) hwid = resolve.result;
            }
            var dotidx = hwid.indexOf('.');
            if (dotidx >= 0) {
                return hwid;
            }
            return Y_FUNCTIONDESCRIPTOR_INVALID;
        })();
    }

    /**
     * Returns the value of the userData attribute, as previously stored using method
     * set_userData.
     * This attribute is never touched directly by the API, and is at disposal of the caller to
     * store a context.
     *
     * @return {Object} the object stored previously by the caller.
     */
    get_userData() {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            return _this33._userData;
        })();
    }

    /**
     * Stores a user context provided as argument in the userData attribute of the function.
     * This attribute is never touched by the API, and is at disposal of the caller to store a context.
     *
     * @param data {Object} : any kind of object to be stored
     * @noreturn
     */
    set_userData(data) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            _this34._userData = data;
        })();
    }

}

exports.YFunction = YFunction; //--- (generated code: YModule class start)
/**
 * YModule Class: Module control interface
 *
 * This interface is identical for all Yoctopuce USB modules.
 * It can be used to control the module global parameters, and
 * to enumerate the functions provided by each module.
 */
//--- (end of generated code: YModule class start)
/** @extends {YFunction} **/

class YModule extends YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YModule constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Module';
        /** @member {string} **/
        this._productName = Y_PRODUCTNAME_INVALID;
        /** @member {string} **/
        this._serialNumber = Y_SERIALNUMBER_INVALID;
        /** @member {number} **/
        this._productId = Y_PRODUCTID_INVALID;
        /** @member {number} **/
        this._productRelease = Y_PRODUCTRELEASE_INVALID;
        /** @member {string} **/
        this._firmwareRelease = Y_FIRMWARERELEASE_INVALID;
        /** @member {number} **/
        this._persistentSettings = Y_PERSISTENTSETTINGS_INVALID;
        /** @member {number} **/
        this._luminosity = Y_LUMINOSITY_INVALID;
        /** @member {number} **/
        this._beacon = Y_BEACON_INVALID;
        /** @member {number} **/
        this._upTime = Y_UPTIME_INVALID;
        /** @member {number} **/
        this._usbCurrent = Y_USBCURRENT_INVALID;
        /** @member {number} **/
        this._rebootCountdown = Y_REBOOTCOUNTDOWN_INVALID;
        /** @member {number} **/
        this._userVar = Y_USERVAR_INVALID;
        /** @member {function} **/
        this._logCallback = null;
        this.imm_setConst({
            PRODUCTNAME_INVALID: YAPI_INVALID_STRING,
            SERIALNUMBER_INVALID: YAPI_INVALID_STRING,
            PRODUCTID_INVALID: YAPI_INVALID_UINT,
            PRODUCTRELEASE_INVALID: YAPI_INVALID_UINT,
            FIRMWARERELEASE_INVALID: YAPI_INVALID_STRING,
            PERSISTENTSETTINGS_LOADED: 0,
            PERSISTENTSETTINGS_SAVED: 1,
            PERSISTENTSETTINGS_MODIFIED: 2,
            PERSISTENTSETTINGS_INVALID: -1,
            LUMINOSITY_INVALID: YAPI_INVALID_UINT,
            BEACON_OFF: 0,
            BEACON_ON: 1,
            BEACON_INVALID: -1,
            UPTIME_INVALID: YAPI_INVALID_LONG,
            USBCURRENT_INVALID: YAPI_INVALID_UINT,
            REBOOTCOUNTDOWN_INVALID: YAPI_INVALID_INT,
            USERVAR_INVALID: YAPI_INVALID_INT
        });
        //--- (end of generated code: YModule constructor)

        // automatically fill in hardware properties if they can be resolved
        // without any network access (getDevice does not cause network access)
        let devid = this._func;
        let dotidx = devid.indexOf('.');
        if (dotidx > 0) devid = devid.substr(0, dotidx);
        let dev = this._yapi.imm_getDevice(devid);
        if (dev) {
            this._serial = dev.imm_getSerialNumber();
            this._funId = 'module';
            this._hwId = this._serial + '.module';
        }
    }

    _throw(int_errType, str_errMsg, obj_retVal) {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    /** Return the internal device object hosting the function
     *
     * @return {YDevice}
     *
     * Raise an error if not found
     */
    imm_getDev() {
        /** @type {string} **/
        let devid = this._func;
        /** @type {number} **/
        let dotidx = devid.indexOf('.');
        if (dotidx > 0) devid = devid.substr(0, dotidx);
        /** @type {YDevice} **/
        let dev = this._yapi.imm_getDevice(devid);
        if (!dev) {
            this._throw(YAPI_DEVICE_NOT_FOUND, 'Device [' + devid + '] is not online', null);
        }
        return dev;
    }

    /**
     * Returns the number of functions (beside the "module" interface) available on the module.
     *
     * @return {number} the number of functions on the module
     *
     * On failure, throws an exception or returns a negative error code.
     */
    functionCount() {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this35.imm_getDev();
            if (!dev) return YAPI_DEVICE_NOT_FOUND;
            return dev.imm_functionCount();
        })();
    }

    /**
     * Retrieves the hardware identifier of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the unambiguous hardware identifier of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionId(functionIndex) {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this36.imm_getDev();
            if (!dev) return '';
            return dev.imm_functionId(functionIndex);
        })();
    }

    /**
     * Retrieves the type of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a the type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionType(functionIndex) {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this37.imm_getDev();
            if (!dev) return '';
            return dev.imm_functionType(functionIndex);
        })();
    }

    /**
     * Retrieves the base type of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired, starting at
     * 0 for the first function.
     *
     * @return {string} a the base type of the function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionBaseType(functionIndex) {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this38.imm_getDev();
            if (!dev) return '';
            return dev.imm_functionBaseType(functionIndex);
        })();
    }

    /**
     * Retrieves the logical name of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a string corresponding to the logical name of the requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionName(functionIndex) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this39.imm_getDev();
            if (!dev) return '';
            return dev.imm_functionName(functionIndex);
        })();
    }

    /**
     * Retrieves the advertised value of the <i>n</i>th function on the module.
     *
     * @param functionIndex {number} : the index of the function for which the information is desired,
     * starting at 0 for the first function.
     *
     * @return {string} a short string (up to 6 characters) corresponding to the advertised value of the
     * requested module function
     *
     * On failure, throws an exception or returns an empty string.
     */
    functionValue(functionIndex) {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this40.imm_getDev();
            if (!dev) return '';
            return dev.imm_functionValue(functionIndex);
        })();
    }

    /** Download the specified URL from the device
     *
     * @param str_url {string}
     * @return {Uint8Array}
     */
    loadUrl(str_url) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev = _this41.imm_getDev();
            if (!dev) return null;
            /** @type {YHTTPRequest} **/
            let yreq = yield _this41._yapi.devRequest(dev.imm_getRootUrl(), 'GET ' + str_url);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _this41._throw(yreq.errorType, yreq.errorMsg, null);
            }
            return yreq.bin_result;
        })();
    }

    /**
     * Returns the logical name of the module.
     *
     * @return {string} a string corresponding to the logical name of the module
     *
     * On failure, throws an exception or returns YModule.LOGICALNAME_INVALID.
     */
    get_logicalName() {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            var dev = _this42.imm_getDev();
            if (dev != null && _this42._cache._expiration <= _this42._yapi.GetTickCount()) {
                return dev._logicalName;
            }
            /** @type {string} **/
            var json_val = yield _this42._getAttr('logicalName');
            return json_val == null ? Y_LOGICALNAME_INVALID : json_val;
        })();
    }

    imm_flattenJsonStruct(jsoncomplex) {
        var decoded = JSON.parse(jsoncomplex);
        var attrs = [];
        for (var function_name in decoded) {
            if (function_name == 'services') continue;
            var function_attrs = decoded[function_name];
            for (var attr_name in function_attrs) {
                let attr_value = function_attrs[attr_name];
                if (attr_value === null || typeof attr_value === 'object') {
                    continue;
                }
                var flat = function_name + '/' + attr_name + '=' + attr_value;
                attrs.push(flat);
            }
        }
        return JSON.stringify(attrs);
    }

    //--- (generated code: YModule implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'productName':
                this._productName = val;
                return 1;
            case 'serialNumber':
                this._serialNumber = val;
                return 1;
            case 'productId':
                this._productId = parseInt(val);
                return 1;
            case 'productRelease':
                this._productRelease = parseInt(val);
                return 1;
            case 'firmwareRelease':
                this._firmwareRelease = val;
                return 1;
            case 'persistentSettings':
                this._persistentSettings = parseInt(val);
                return 1;
            case 'luminosity':
                this._luminosity = parseInt(val);
                return 1;
            case 'beacon':
                this._beacon = parseInt(val);
                return 1;
            case 'upTime':
                this._upTime = parseInt(val);
                return 1;
            case 'usbCurrent':
                this._usbCurrent = parseInt(val);
                return 1;
            case 'rebootCountdown':
                this._rebootCountdown = parseInt(val);
                return 1;
            case 'userVar':
                this._userVar = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the commercial name of the module, as set by the factory.
     *
     * @return {string} a string corresponding to the commercial name of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.PRODUCTNAME_INVALID.
     */
    get_productName() {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev;
            if (_this43._cacheExpiration == 0) {
                dev = _this43.imm_getDev();
                if (!(dev == null)) {
                    return dev.imm_getProductName();
                }
                if ((yield _this43.load(_this43._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_PRODUCTNAME_INVALID;
                }
            }
            return _this43._productName;
        })();
    }

    /**
     * Returns the serial number of the module, as set by the factory.
     *
     * @return {string} a string corresponding to the serial number of the module, as set by the factory
     *
     * On failure, throws an exception or returns YModule.SERIALNUMBER_INVALID.
     */
    get_serialNumber() {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev;
            if (_this44._cacheExpiration == 0) {
                dev = _this44.imm_getDev();
                if (!(dev == null)) {
                    return dev.imm_getSerialNumber();
                }
                if ((yield _this44.load(_this44._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_SERIALNUMBER_INVALID;
                }
            }
            return _this44._serialNumber;
        })();
    }

    /**
     * Returns the USB device identifier of the module.
     *
     * @return {number} an integer corresponding to the USB device identifier of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTID_INVALID.
     */
    get_productId() {
        var _this45 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev;
            if (_this45._cacheExpiration == 0) {
                dev = _this45.imm_getDev();
                if (!(dev == null)) {
                    return dev.imm_getProductId();
                }
                if ((yield _this45.load(_this45._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_PRODUCTID_INVALID;
                }
            }
            return _this45._productId;
        })();
    }

    /**
     * Returns the hardware release version of the module.
     *
     * @return {number} an integer corresponding to the hardware release version of the module
     *
     * On failure, throws an exception or returns YModule.PRODUCTRELEASE_INVALID.
     */
    get_productRelease() {
        var _this46 = this;

        return _asyncToGenerator(function* () {
            if (_this46._cacheExpiration == 0) {
                if ((yield _this46.load(_this46._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_PRODUCTRELEASE_INVALID;
                }
            }
            return _this46._productRelease;
        })();
    }

    /**
     * Returns the version of the firmware embedded in the module.
     *
     * @return {string} a string corresponding to the version of the firmware embedded in the module
     *
     * On failure, throws an exception or returns YModule.FIRMWARERELEASE_INVALID.
     */
    get_firmwareRelease() {
        var _this47 = this;

        return _asyncToGenerator(function* () {
            if (_this47._cacheExpiration <= _this47._yapi.GetTickCount()) {
                if ((yield _this47.load(_this47._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_FIRMWARERELEASE_INVALID;
                }
            }
            return _this47._firmwareRelease;
        })();
    }

    /**
     * Returns the current state of persistent module settings.
     *
     * @return {number} a value among YModule.PERSISTENTSETTINGS_LOADED, YModule.PERSISTENTSETTINGS_SAVED
     * and YModule.PERSISTENTSETTINGS_MODIFIED corresponding to the current state of persistent module settings
     *
     * On failure, throws an exception or returns YModule.PERSISTENTSETTINGS_INVALID.
     */
    get_persistentSettings() {
        var _this48 = this;

        return _asyncToGenerator(function* () {
            if (_this48._cacheExpiration <= _this48._yapi.GetTickCount()) {
                if ((yield _this48.load(_this48._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_PERSISTENTSETTINGS_INVALID;
                }
            }
            return _this48._persistentSettings;
        })();
    }

    set_persistentSettings(newval) {
        var _this49 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this49._setAttr('persistentSettings', rest_val);
        })();
    }

    /**
     * Returns the luminosity of the  module informative leds (from 0 to 100).
     *
     * @return {number} an integer corresponding to the luminosity of the  module informative leds (from 0 to 100)
     *
     * On failure, throws an exception or returns YModule.LUMINOSITY_INVALID.
     */
    get_luminosity() {
        var _this50 = this;

        return _asyncToGenerator(function* () {
            if (_this50._cacheExpiration <= _this50._yapi.GetTickCount()) {
                if ((yield _this50.load(_this50._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_LUMINOSITY_INVALID;
                }
            }
            return _this50._luminosity;
        })();
    }

    /**
     * Changes the luminosity of the module informative leds. The parameter is a
     * value between 0 and 100.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {number} : an integer corresponding to the luminosity of the module informative leds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_luminosity(newval) {
        var _this51 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this51._setAttr('luminosity', rest_val);
        })();
    }

    /**
     * Returns the state of the localization beacon.
     *
     * @return {number} either YModule.BEACON_OFF or YModule.BEACON_ON, according to the state of the
     * localization beacon
     *
     * On failure, throws an exception or returns YModule.BEACON_INVALID.
     */
    get_beacon() {
        var _this52 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDevice} **/
            let dev;
            if (_this52._cacheExpiration <= _this52._yapi.GetTickCount()) {
                dev = _this52.imm_getDev();
                if (!(dev == null)) {
                    return dev.imm_getBeacon();
                }
                if ((yield _this52.load(_this52._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_BEACON_INVALID;
                }
            }
            return _this52._beacon;
        })();
    }

    /**
     * Turns on or off the module localization beacon.
     *
     * @param newval {number} : either YModule.BEACON_OFF or YModule.BEACON_ON
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_beacon(newval) {
        var _this53 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this53._setAttr('beacon', rest_val);
        })();
    }

    /**
     * Returns the number of milliseconds spent since the module was powered on.
     *
     * @return {number} an integer corresponding to the number of milliseconds spent since the module was powered on
     *
     * On failure, throws an exception or returns YModule.UPTIME_INVALID.
     */
    get_upTime() {
        var _this54 = this;

        return _asyncToGenerator(function* () {
            if (_this54._cacheExpiration <= _this54._yapi.GetTickCount()) {
                if ((yield _this54.load(_this54._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_UPTIME_INVALID;
                }
            }
            return _this54._upTime;
        })();
    }

    /**
     * Returns the current consumed by the module on the USB bus, in milli-amps.
     *
     * @return {number} an integer corresponding to the current consumed by the module on the USB bus, in milli-amps
     *
     * On failure, throws an exception or returns YModule.USBCURRENT_INVALID.
     */
    get_usbCurrent() {
        var _this55 = this;

        return _asyncToGenerator(function* () {
            if (_this55._cacheExpiration <= _this55._yapi.GetTickCount()) {
                if ((yield _this55.load(_this55._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_USBCURRENT_INVALID;
                }
            }
            return _this55._usbCurrent;
        })();
    }

    /**
     * Returns the remaining number of seconds before the module restarts, or zero when no
     * reboot has been scheduled.
     *
     * @return {number} an integer corresponding to the remaining number of seconds before the module
     * restarts, or zero when no
     *         reboot has been scheduled
     *
     * On failure, throws an exception or returns YModule.REBOOTCOUNTDOWN_INVALID.
     */
    get_rebootCountdown() {
        var _this56 = this;

        return _asyncToGenerator(function* () {
            if (_this56._cacheExpiration <= _this56._yapi.GetTickCount()) {
                if ((yield _this56.load(_this56._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_REBOOTCOUNTDOWN_INVALID;
                }
            }
            return _this56._rebootCountdown;
        })();
    }

    set_rebootCountdown(newval) {
        var _this57 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this57._setAttr('rebootCountdown', rest_val);
        })();
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @return {number} an integer corresponding to the value previously stored in this attribute
     *
     * On failure, throws an exception or returns YModule.USERVAR_INVALID.
     */
    get_userVar() {
        var _this58 = this;

        return _asyncToGenerator(function* () {
            if (_this58._cacheExpiration <= _this58._yapi.GetTickCount()) {
                if ((yield _this58.load(_this58._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_USERVAR_INVALID;
                }
            }
            return _this58._userVar;
        })();
    }

    /**
     * Returns the value previously stored in this attribute.
     * On startup and after a device reboot, the value is always reset to zero.
     *
     * @param newval {number} : an integer
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userVar(newval) {
        var _this59 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this59._setAttr('userVar', rest_val);
        })();
    }

    /**
     * Allows you to find a module from its serial number or from its logical name.
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string containing either the serial number or
     *         the logical name of the desired module
     *
     * @return {YModule} a YModule object allowing you to drive the module
     *         or get additional information on the module.
     */
    static FindModule(func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Module', func);
        if (obj == null) {
            obj = new YModule(YAPI, func);
            YFunction._AddToCache('Module', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a module for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the module is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YModule.isOnline() to test if the module is
     * indeed online at a given time. In case of ambiguity when looking for
     * a module by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the module
     *
     * @return {YModule} a YModule object allowing you to drive the module.
     */
    static FindModuleInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Module', func);
        if (obj == null) {
            obj = new YModule(yctx, func);
            YFunction._AddToCache('Module', func, obj);
        }
        return obj;
    }

    /**
     * Saves current settings in the nonvolatile memory of the module.
     * Warning: the number of allowed save operations during a module life is
     * limited (about 100000 cycles). Do not call this function within a loop.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    saveToFlash() {
        var _this60 = this;

        return _asyncToGenerator(function* () {
            return yield _this60.set_persistentSettings(Y_PERSISTENTSETTINGS_SAVED);
        })();
    }

    /**
     * Reloads the settings stored in the nonvolatile memory, as
     * when the module is powered on.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    revertFromFlash() {
        var _this61 = this;

        return _asyncToGenerator(function* () {
            return yield _this61.set_persistentSettings(Y_PERSISTENTSETTINGS_LOADED);
        })();
    }

    /**
     * Schedules a simple module reboot after the given number of seconds.
     *
     * @param secBeforeReboot {number} : number of seconds before rebooting
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reboot(secBeforeReboot) {
        var _this62 = this;

        return _asyncToGenerator(function* () {
            return yield _this62.set_rebootCountdown(secBeforeReboot);
        })();
    }

    /**
     * Schedules a module reboot into special firmware update mode.
     *
     * @param secBeforeReboot {number} : number of seconds before rebooting
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerFirmwareUpdate(secBeforeReboot) {
        var _this63 = this;

        return _asyncToGenerator(function* () {
            return yield _this63.set_rebootCountdown(-secBeforeReboot);
        })();
    }

    /**
     * Tests whether the byn file is valid for this module. This method is useful to test if the module
     * needs to be updated.
     * It is possible to pass a directory as argument instead of a file. In this case, this method returns
     * the path of the most recent
     * appropriate byn file. If the parameter onlynew is true, the function discards firmware that are
     * older or equal to
     * the installed firmware.
     *
     * @param path {string} : the path of a byn file or a directory that contains byn files
     * @param onlynew {boolean} : returns only files that are strictly newer
     *
     * @return {string} : the path of the byn file to use or a empty string if no byn files matches the requirement
     *
     * On failure, throws an exception or returns a string that start with "error:".
     */
    checkFirmware(path, onlynew) {
        var _this64 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let serial;
            /** @type {number} **/
            let release;
            /** @type {string} **/
            let tmp_res;
            if (onlynew) {
                release = _this64._yapi.imm_atoi((yield _this64.get_firmwareRelease()));
            } else {
                release = 0;
            }
            //may throw an exception
            serial = yield _this64.get_serialNumber();
            tmp_res = yield YFirmwareUpdate.CheckFirmware(serial, path, release);
            if (tmp_res.indexOf('error:') == 0) {
                _this64._throw(YAPI_INVALID_ARGUMENT, tmp_res);
            }
            return tmp_res;
        })();
    }

    /**
     * Prepares a firmware update of the module. This method returns a YFirmwareUpdate object which
     * handles the firmware update process.
     *
     * @param path {string} : the path of the byn file to use.
     *
     * @return {YFirmwareUpdate} : A YFirmwareUpdate object or NULL on error.
     */
    updateFirmware(path) {
        var _this65 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let serial;
            /** @type {Uint8Array} **/
            let settings;
            // may throw an exception
            serial = yield _this65.get_serialNumber();
            settings = yield _this65.get_allSettings();
            if (settings.length == 0) {
                _this65._throw(YAPI_IO_ERROR, 'Unable to get device settings');
                settings = _this65._yapi.imm_str2bin('error:Unable to get device settings');
            }
            return new YFirmwareUpdate(serial, path, settings);
        })();
    }

    /**
     * Returns all the settings and uploaded files of the module. Useful to backup all the logical names,
     * calibrations parameters,
     * and uploaded files of a connected module.
     *
     * @return {Uint8Array} a binary buffer with all the settings.
     *
     * On failure, throws an exception or returns an binary object of size 0.
     */
    get_allSettings() {
        var _this66 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let settings;
            /** @type {Uint8Array} **/
            let json;
            /** @type {Uint8Array} **/
            let res;
            /** @type {string} **/
            let sep;
            /** @type {string} **/
            let name;
            /** @type {string} **/
            let item;
            /** @type {string} **/
            let t_type;
            /** @type {string} **/
            let id;
            /** @type {string} **/
            let url;
            /** @type {string} **/
            let file_data;
            /** @type {Uint8Array} **/
            let file_data_bin;
            /** @type {Uint8Array} **/
            let temp_data_bin;
            /** @type {string} **/
            let ext_settings;
            /** @type {string[]} **/
            let filelist = [];
            /** @type {string[]} **/
            let templist = [];
            // may throw an exception
            settings = yield _this66._download('api.json');
            if (settings.length == 0) {
                return settings;
            }
            ext_settings = ', "extras":[';
            templist = yield _this66.get_functionIds('Temperature');
            sep = '';
            for (let ii in templist) {
                if (_this66._yapi.imm_atoi((yield _this66.get_firmwareRelease())) > 9000) {
                    url = 'api/' + templist[ii] + '/sensorType';
                    t_type = _this66._yapi.imm_bin2str((yield _this66._download(url)));
                    if (t_type == 'RES_NTC') {
                        id = templist[ii].substr(11, templist[ii].length - 11);
                        temp_data_bin = yield _this66._download('extra.json?page=' + id);
                        if (temp_data_bin.length == 0) {
                            return temp_data_bin;
                        }
                        item = sep + '{"fid":"' + templist[ii] + '", "json":' + _this66._yapi.imm_bin2str(temp_data_bin) + '}\n';
                        ext_settings = ext_settings + item;
                        sep = ',';
                    }
                }
            }
            ext_settings = ext_settings + '],\n"files":[';
            if (yield _this66.hasFunction('files')) {
                json = yield _this66._download('files.json?a=dir&f=');
                if (json.length == 0) {
                    return json;
                }
                filelist = _this66.imm_json_get_array(json);
                sep = '';
                for (let ii in filelist) {
                    name = _this66.imm_json_get_key(_this66._yapi.imm_str2bin(filelist[ii]), 'name');
                    if (name.length == 0) {
                        return _this66._yapi.imm_str2bin(name);
                    }
                    file_data_bin = yield _this66._download(_this66.imm_escapeAttr(name));
                    file_data = _this66._yapi.imm_bin2hexstr(file_data_bin);
                    item = sep + '{"name":"' + name + '", "data":"' + file_data + '"}\n';
                    ext_settings = ext_settings + item;
                    sep = ',';;
                }
            }
            ext_settings = ext_settings + ']}';
            res = _this66._yapi.imm_str2bin('{ "api":') + settings + _this66._yapi.imm_str2bin(ext_settings);
            return res;
        })();
    }

    loadThermistorExtra(funcId, jsonExtra) {
        var _this67 = this;

        return _asyncToGenerator(function* () {
            /** @type {string[]} **/
            let values = [];
            /** @type {string} **/
            let url;
            /** @type {string} **/
            let curr;
            /** @type {string} **/
            let currTemp;
            /** @type {number} **/
            let ofs;
            /** @type {number} **/
            let size;
            url = 'api/' + funcId + '.json?command=Z';
            // may throw an exception
            yield _this67._download(url);
            // add records in growing resistance value
            values = _this67.imm_json_get_array(_this67._yapi.imm_str2bin(jsonExtra));
            ofs = 0;
            size = values.length;
            while (ofs + 1 < size) {
                curr = values[ofs];
                currTemp = values[ofs + 1];
                url = 'api/' + funcId + '/.json?command=m' + curr + ':' + currTemp;
                yield _this67._download(url);
                ofs = ofs + 2;
            }
            return YAPI_SUCCESS;
        })();
    }

    set_extraSettings(jsonExtra) {
        var _this68 = this;

        return _asyncToGenerator(function* () {
            /** @type {string[]} **/
            let extras = [];
            /** @type {string} **/
            let functionId;
            /** @type {string} **/
            let data;
            extras = _this68.imm_json_get_array(_this68._yapi.imm_str2bin(jsonExtra));
            for (let ii in extras) {
                functionId = _this68.imm_get_json_path(extras[ii], 'fid');
                functionId = _this68.imm_decode_json_string(functionId);
                data = _this68.imm_get_json_path(extras[ii], 'json');
                if (yield _this68.hasFunction(functionId)) {
                    yield _this68.loadThermistorExtra(functionId, data);
                }
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Restores all the settings and uploaded files of the module. Useful to restore all the logical names
     * and calibrations parameters, uploaded
     * files etc.. of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings {Uint8Array} : a binary buffer with all the settings.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettingsAndFiles(settings) {
        var _this69 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let down;
            /** @type {string} **/
            let json;
            /** @type {string} **/
            let json_api;
            /** @type {string} **/
            let json_files;
            /** @type {string} **/
            let json_extra;
            json = _this69._yapi.imm_bin2str(settings);
            json_api = _this69.imm_get_json_path(json, 'api');
            if (json_api == '') {
                return yield _this69.set_allSettings(settings);
            }
            json_extra = _this69.imm_get_json_path(json, 'extras');
            if (!(json_extra == '')) {
                yield _this69.set_extraSettings(json_extra);
            }
            yield _this69.set_allSettings(_this69._yapi.imm_str2bin(json_api));
            if (yield _this69.hasFunction('files')) {
                /** @type {string[]} **/
                let files = [];
                /** @type {string} **/
                let res;
                /** @type {string} **/
                let name;
                /** @type {string} **/
                let data;
                down = yield _this69._download('files.json?a=format');
                res = _this69.imm_get_json_path(_this69._yapi.imm_bin2str(down), 'res');
                res = _this69.imm_decode_json_string(res);
                if (!(res == 'ok')) {
                    return _this69._throw(YAPI_IO_ERROR, 'format failed', YAPI_IO_ERROR);
                }
                json_files = _this69.imm_get_json_path(json, 'files');
                files = _this69.imm_json_get_array(_this69._yapi.imm_str2bin(json_files));
                for (let ii in files) {
                    name = _this69.imm_get_json_path(files[ii], 'name');
                    name = _this69.imm_decode_json_string(name);
                    data = _this69.imm_get_json_path(files[ii], 'data');
                    data = _this69.imm_decode_json_string(data);
                    yield _this69._upload(name, _this69._yapi.imm_hexstr2bin(data));;
                }
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Test if the device has a specific function. This method took an function identifier
     * and return a boolean.
     *
     * @param funcId {string} : the requested function identifier
     *
     * @return {boolean} : true if the device has the function identifier
     */
    hasFunction(funcId) {
        var _this70 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let count;
            /** @type {number} **/
            let i;
            /** @type {string} **/
            let fid;
            // may throw an exception
            count = yield _this70.functionCount();
            i = 0;
            while (i < count) {
                fid = yield _this70.functionId(i);
                if (fid == funcId) {
                    return true;
                }
                i = i + 1;
            }
            return false;
        })();
    }

    /**
     * Retrieve all hardware identifier that match the type passed in argument.
     *
     * @param funType {string} : The type of function (Relay, LightSensor, Voltage,...)
     *
     * @return {string[]} : A array of string.
     */
    get_functionIds(funType) {
        var _this71 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let count;
            /** @type {number} **/
            let i;
            /** @type {string} **/
            let ftype;
            /** @type {string[]} **/
            let res = [];
            // may throw an exception
            count = yield _this71.functionCount();
            i = 0;
            while (i < count) {
                ftype = yield _this71.functionType(i);
                if (ftype == funType) {
                    res.push((yield _this71.functionId(i)));
                } else {
                    ftype = yield _this71.functionBaseType(i);
                    if (ftype == funType) {
                        res.push((yield _this71.functionId(i)));
                    }
                }
                i = i + 1;
            }
            return res;
        })();
    }

    // cannot be generated for JS:
    // imm_flattenJsonStruct(jsoncomplex)

    calibVersion(cparams) {
        return _asyncToGenerator(function* () {
            if (cparams == '0,') {
                return 3;
            }
            if (cparams.indexOf(',') >= 0) {
                if (cparams.indexOf(' ') > 0) {
                    return 3;
                } else {
                    return 1;
                }
            }
            if (cparams == '' || cparams == '0') {
                return 1;
            }
            if (cparams.length < 2 || cparams.indexOf('.') >= 0) {
                return 0;
            } else {
                return 2;
            }
        })();
    }

    calibScale(unit_name, sensorType) {
        var _this72 = this;

        return _asyncToGenerator(function* () {
            if (unit_name == 'g' || unit_name == 'gauss' || unit_name == 'W') {
                return 1000;
            }
            if (unit_name == 'C') {
                if (sensorType == '') {
                    return 16;
                }
                if (_this72._yapi.imm_atoi(sensorType) < 8) {
                    return 16;
                } else {
                    return 100;
                }
            }
            if (unit_name == 'm' || unit_name == 'deg') {
                return 10;
            }
            return 1;
        })();
    }

    calibOffset(unit_name) {
        return _asyncToGenerator(function* () {
            if (unit_name == '% RH' || unit_name == 'mbar' || unit_name == 'lx') {
                return 0;
            }
            return 32767;
        })();
    }

    calibConvert(param, currentFuncValue, unit_name, sensorType) {
        var _this73 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let paramVer;
            /** @type {number} **/
            let funVer;
            /** @type {number} **/
            let funScale;
            /** @type {number} **/
            let funOffset;
            /** @type {number} **/
            let paramScale;
            /** @type {number} **/
            let paramOffset;
            /** @type {number[]} **/
            let words = [];
            /** @type {string[]} **/
            let words_str = [];
            /** @type {number[]} **/
            let calibData = [];
            /** @type {number[]} **/
            let iCalib = [];
            /** @type {number} **/
            let calibType;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let maxSize;
            /** @type {number} **/
            let ratio;
            /** @type {number} **/
            let nPoints;
            /** @type {number} **/
            let wordVal;
            // Initial guess for parameter encoding
            paramVer = yield _this73.calibVersion(param);
            funVer = yield _this73.calibVersion(currentFuncValue);
            funScale = yield _this73.calibScale(unit_name, sensorType);
            funOffset = yield _this73.calibOffset(unit_name);
            paramScale = funScale;
            paramOffset = funOffset;
            if (funVer < 3) {
                if (funVer == 2) {
                    words = _this73._yapi.imm_decodeWords(currentFuncValue);
                    if (words[0] == 1366 && words[1] == 12500) {
                        funScale = 1;
                        funOffset = 0;
                    } else {
                        funScale = words[1];
                        funOffset = words[0];
                    }
                } else {
                    if (funVer == 1) {
                        if (currentFuncValue == '' || _this73._yapi.imm_atoi(currentFuncValue) > 10) {
                            funScale = 0;
                        }
                    }
                }
            }
            calibData.length = 0;
            calibType = 0;
            if (paramVer < 3) {
                if (paramVer == 2) {
                    words = _this73._yapi.imm_decodeWords(param);
                    if (words[0] == 1366 && words[1] == 12500) {
                        paramScale = 1;
                        paramOffset = 0;
                    } else {
                        paramScale = words[1];
                        paramOffset = words[0];
                    }
                    if (words.length >= 3 && words[2] > 0) {
                        maxSize = 3 + 2 * (words[2] % 10);
                        if (maxSize > words.length) {
                            maxSize = words.length;
                        }
                        i = 3;
                        while (i < maxSize) {
                            calibData.push(words[i]);
                            i = i + 1;
                        }
                    }
                } else {
                    if (paramVer == 1) {
                        words_str = param.split(',');
                        for (let ii in words_str) {
                            words.push(_this73._yapi.imm_atoi(words_str[ii]));
                        }
                        if (param == '' || words[0] > 10) {
                            paramScale = 0;
                        }
                        if (words.length > 0 && words[0] > 0) {
                            maxSize = 1 + 2 * (words[0] % 10);
                            if (maxSize > words.length) {
                                maxSize = words.length;
                            }
                            i = 1;
                            while (i < maxSize) {
                                calibData.push(words[i]);
                                i = i + 1;
                            }
                        }
                    } else {
                        if (paramVer == 0) {
                            ratio = parseFloat(param);
                            if (ratio > 0) {
                                calibData.push(0.0);
                                calibData.push(0.0);
                                calibData.push(Math.round(65535 / ratio));
                                calibData.push(65535.0);
                            }
                        }
                    }
                }
                i = 0;
                while (i < calibData.length) {
                    if (paramScale > 0) {
                        calibData[i] = (calibData[i] - paramOffset) / paramScale;
                    } else {
                        calibData[i] = _this73._yapi.imm_decimalToDouble(Math.round(calibData[i]));
                    }
                    i = i + 1;
                }
            } else {
                iCalib = _this73._yapi.imm_decodeFloats(param);
                calibType = Math.round(iCalib[0] / 1000.0);
                if (calibType >= 30) {
                    calibType = calibType - 30;
                }
                i = 1;
                while (i < iCalib.length) {
                    calibData.push(iCalib[i] / 1000.0);
                    i = i + 1;
                }
            }
            if (funVer >= 3) {
                if (calibData.length == 0) {
                    param = '0,';
                } else {
                    param = 30 + calibType;
                    i = 0;
                    while (i < calibData.length) {
                        if ((i & 1) > 0) {
                            param = param + ':';
                        } else {
                            param = param + ' ';
                        }
                        param = param + Math.round(calibData[i] * 1000.0 / 1000.0);
                        i = i + 1;
                    }
                    param = param + ',';
                }
            } else {
                if (funVer >= 1) {
                    nPoints = parseInt(calibData.length / 2, 10);
                    param = nPoints;
                    i = 0;
                    while (i < 2 * nPoints) {
                        if (funScale == 0) {
                            wordVal = _this73._yapi.imm_doubleToDecimal(Math.round(calibData[i]));
                        } else {
                            wordVal = calibData[i] * funScale + funOffset;
                        }
                        param = param + ',' + Math.round(wordVal);
                        i = i + 1;
                    }
                } else {
                    if (calibData.length == 4) {
                        param = Math.round(1000 * (calibData[3] - calibData[1]) / calibData[2] - calibData[0]);
                    }
                }
            }
            return param;
        })();
    }

    /**
     * Restores all the settings of the module. Useful to restore all the logical names and calibrations parameters
     * of a module from a backup.Remember to call the saveToFlash() method of the module if the
     * modifications must be kept.
     *
     * @param settings {Uint8Array} : a binary buffer with all the settings.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_allSettings(settings) {
        var _this74 = this;

        return _asyncToGenerator(function* () {
            /** @type {string[]} **/
            let restoreLast = [];
            /** @type {Uint8Array} **/
            let old_json_flat;
            /** @type {string[]} **/
            let old_dslist = [];
            /** @type {string[]} **/
            let old_jpath = [];
            /** @type {number[]} **/
            let old_jpath_len = [];
            /** @type {string[]} **/
            let old_val_arr = [];
            /** @type {Uint8Array} **/
            let actualSettings;
            /** @type {string[]} **/
            let new_dslist = [];
            /** @type {string[]} **/
            let new_jpath = [];
            /** @type {number[]} **/
            let new_jpath_len = [];
            /** @type {string[]} **/
            let new_val_arr = [];
            /** @type {number} **/
            let cpos;
            /** @type {number} **/
            let eqpos;
            /** @type {number} **/
            let leng;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let j;
            /** @type {string} **/
            let njpath;
            /** @type {string} **/
            let jpath;
            /** @type {string} **/
            let fun;
            /** @type {string} **/
            let attr;
            /** @type {string} **/
            let value;
            /** @type {string} **/
            let url;
            /** @type {string} **/
            let tmp;
            /** @type {string} **/
            let new_calib;
            /** @type {string} **/
            let sensorType;
            /** @type {string} **/
            let unit_name;
            /** @type {string} **/
            let newval;
            /** @type {string} **/
            let oldval;
            /** @type {string} **/
            let old_calib;
            /** @type {string} **/
            let each_str;
            /** @type {boolean} **/
            let do_update;
            /** @type {boolean} **/
            let found;
            tmp = _this74._yapi.imm_bin2str(settings);
            tmp = _this74.imm_get_json_path(tmp, 'api');
            if (!(tmp == '')) {
                settings = _this74._yapi.imm_str2bin(tmp);
            }
            oldval = '';
            newval = '';
            old_json_flat = _this74.imm_flattenJsonStruct(settings);
            old_dslist = _this74.imm_json_get_array(old_json_flat);
            for (let ii in old_dslist) {
                each_str = _this74.imm_json_get_string(_this74._yapi.imm_str2bin(old_dslist[ii]));
                leng = each_str.length;
                eqpos = each_str.indexOf('=');
                if (eqpos < 0 || leng == 0) {
                    _this74._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                    return YAPI_INVALID_ARGUMENT;
                }
                jpath = each_str.substr(0, eqpos);
                eqpos = eqpos + 1;
                value = each_str.substr(eqpos, leng - eqpos);
                old_jpath.push(jpath);
                old_jpath_len.push(jpath.length);
                old_val_arr.push(value);;
            }
            // may throw an exception
            actualSettings = yield _this74._download('api.json');
            actualSettings = _this74.imm_flattenJsonStruct(actualSettings);
            new_dslist = _this74.imm_json_get_array(actualSettings);
            for (let ii in new_dslist) {
                each_str = _this74.imm_json_get_string(_this74._yapi.imm_str2bin(new_dslist[ii]));
                leng = each_str.length;
                eqpos = each_str.indexOf('=');
                if (eqpos < 0 || leng == 0) {
                    _this74._throw(YAPI_INVALID_ARGUMENT, 'Invalid settings');
                    return YAPI_INVALID_ARGUMENT;
                }
                jpath = each_str.substr(0, eqpos);
                eqpos = eqpos + 1;
                value = each_str.substr(eqpos, leng - eqpos);
                new_jpath.push(jpath);
                new_jpath_len.push(jpath.length);
                new_val_arr.push(value);;
            }
            i = 0;
            while (i < new_jpath.length) {
                njpath = new_jpath[i];
                leng = njpath.length;
                cpos = njpath.indexOf('/');
                if (cpos < 0 || leng == 0) {
                    continue;
                }
                fun = njpath.substr(0, cpos);
                cpos = cpos + 1;
                attr = njpath.substr(cpos, leng - cpos);
                do_update = true;
                if (fun == 'services') {
                    do_update = false;
                }
                if (do_update && attr == 'firmwareRelease') {
                    do_update = false;
                }
                if (do_update && attr == 'usbCurrent') {
                    do_update = false;
                }
                if (do_update && attr == 'upTime') {
                    do_update = false;
                }
                if (do_update && attr == 'persistentSettings') {
                    do_update = false;
                }
                if (do_update && attr == 'adminPassword') {
                    do_update = false;
                }
                if (do_update && attr == 'userPassword') {
                    do_update = false;
                }
                if (do_update && attr == 'rebootCountdown') {
                    do_update = false;
                }
                if (do_update && attr == 'advertisedValue') {
                    do_update = false;
                }
                if (do_update && attr == 'poeCurrent') {
                    do_update = false;
                }
                if (do_update && attr == 'readiness') {
                    do_update = false;
                }
                if (do_update && attr == 'ipAddress') {
                    do_update = false;
                }
                if (do_update && attr == 'subnetMask') {
                    do_update = false;
                }
                if (do_update && attr == 'router') {
                    do_update = false;
                }
                if (do_update && attr == 'linkQuality') {
                    do_update = false;
                }
                if (do_update && attr == 'ssid') {
                    do_update = false;
                }
                if (do_update && attr == 'channel') {
                    do_update = false;
                }
                if (do_update && attr == 'security') {
                    do_update = false;
                }
                if (do_update && attr == 'message') {
                    do_update = false;
                }
                if (do_update && attr == 'currentValue') {
                    do_update = false;
                }
                if (do_update && attr == 'currentRawValue') {
                    do_update = false;
                }
                if (do_update && attr == 'currentRunIndex') {
                    do_update = false;
                }
                if (do_update && attr == 'pulseTimer') {
                    do_update = false;
                }
                if (do_update && attr == 'lastTimePressed') {
                    do_update = false;
                }
                if (do_update && attr == 'lastTimeReleased') {
                    do_update = false;
                }
                if (do_update && attr == 'filesCount') {
                    do_update = false;
                }
                if (do_update && attr == 'freeSpace') {
                    do_update = false;
                }
                if (do_update && attr == 'timeUTC') {
                    do_update = false;
                }
                if (do_update && attr == 'rtcTime') {
                    do_update = false;
                }
                if (do_update && attr == 'unixTime') {
                    do_update = false;
                }
                if (do_update && attr == 'dateTime') {
                    do_update = false;
                }
                if (do_update && attr == 'rawValue') {
                    do_update = false;
                }
                if (do_update && attr == 'lastMsg') {
                    do_update = false;
                }
                if (do_update && attr == 'delayedPulseTimer') {
                    do_update = false;
                }
                if (do_update && attr == 'rxCount') {
                    do_update = false;
                }
                if (do_update && attr == 'txCount') {
                    do_update = false;
                }
                if (do_update && attr == 'msgCount') {
                    do_update = false;
                }
                if (do_update) {
                    do_update = false;
                    newval = new_val_arr[i];
                    j = 0;
                    found = false;
                    while (j < old_jpath.length && !found) {
                        if (new_jpath_len[i] == old_jpath_len[j] && new_jpath[i] == old_jpath[j]) {
                            found = true;
                            oldval = old_val_arr[j];
                            if (!(newval == oldval)) {
                                do_update = true;
                            }
                        }
                        j = j + 1;
                    }
                }
                if (do_update) {
                    if (attr == 'calibrationParam') {
                        old_calib = '';
                        unit_name = '';
                        sensorType = '';
                        new_calib = newval;
                        j = 0;
                        found = false;
                        while (j < old_jpath.length && !found) {
                            if (new_jpath_len[i] == old_jpath_len[j] && new_jpath[i] == old_jpath[j]) {
                                found = true;
                                old_calib = old_val_arr[j];
                            }
                            j = j + 1;
                        }
                        tmp = fun + '/unit';
                        j = 0;
                        found = false;
                        while (j < new_jpath.length && !found) {
                            if (tmp == new_jpath[j]) {
                                found = true;
                                unit_name = new_val_arr[j];
                            }
                            j = j + 1;
                        }
                        tmp = fun + '/sensorType';
                        j = 0;
                        found = false;
                        while (j < new_jpath.length && !found) {
                            if (tmp == new_jpath[j]) {
                                found = true;
                                sensorType = new_val_arr[j];
                            }
                            j = j + 1;
                        }
                        newval = yield _this74.calibConvert(old_calib, new_val_arr[i], unit_name, sensorType);
                        url = 'api/' + fun + '.json?' + attr + '=' + _this74.imm_escapeAttr(newval);
                        yield _this74._download(url);
                    } else {
                        url = 'api/' + fun + '.json?' + attr + '=' + _this74.imm_escapeAttr(oldval);
                        if (attr == 'resolution') {
                            restoreLast.push(url);
                        } else {
                            yield _this74._download(url);
                        }
                    }
                }
                i = i + 1;
            }
            for (let ii in restoreLast) {
                yield _this74._download(restoreLast[ii]);;
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Downloads the specified built-in file and returns a binary buffer with its content.
     *
     * @param pathname {string} : name of the new file to load
     *
     * @return {Uint8Array} a binary buffer with the file content
     *
     * On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    download(pathname) {
        var _this75 = this;

        return _asyncToGenerator(function* () {
            return yield _this75._download(pathname);
        })();
    }

    /**
     * Returns the icon of the module. The icon is a PNG image and does not
     * exceeds 1536 bytes.
     *
     * @return {Uint8Array} a binary buffer with module icon, in png format.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_icon2d() {
        var _this76 = this;

        return _asyncToGenerator(function* () {
            return yield _this76._download('icon2d.png');
        })();
    }

    /**
     * Returns a string with last logs of the module. This method return only
     * logs that are still in the module.
     *
     * @return {string} a string with last logs of the module.
     *         On failure, throws an exception or returns  YAPI.INVALID_STRING.
     */
    get_lastLogs() {
        var _this77 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let content;
            // may throw an exception
            content = yield _this77._download('logs.txt');
            return _this77._yapi.imm_bin2str(content);
        })();
    }

    // cannot be generated for JS:
    // async get_subDevices()

    /**
     * Continues the module enumeration started using yFirstModule().
     *
     * @return {YModule} a pointer to a YModule object, corresponding to
     *         the next module found, or a null pointer
     *         if there are no more modules to enumerate.
     */
    nextModule() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YModule.FindModuleInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of modules currently accessible.
     * Use the method YModule.nextModule() to iterate on the
     * next modules.
     *
     * @return {YModule} a pointer to a YModule object, corresponding to
     *         the first module currently online, or a null pointer
     *         if there are none.
     */
    static FirstModule() {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Module');
        if (next_hwid == null) return null;
        return YModule.FindModule(next_hwid);
    }

    /**
     * Retrieves the first Module in a given context
     *
     * @param yctx {YAPIContext}
     *
     * @returns {YModule}
     */
    static FirstModuleInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Module');
        if (next_hwid == null) return null;
        return YModule.FindModuleInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YModule implementation)
}

exports.YModule = YModule; //--- (generated code: Module functions)

/**
 * Allows you to find a module from its serial number or from its logical name.
 *
 * This function does not require that the module is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YModule.isOnline() to test if the module is
 * indeed online at a given time. In case of ambiguity when looking for
 * a module by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string containing either the serial number or
 *         the logical name of the desired module
 *
 * @return {YModule} a YModule object allowing you to drive the module
 *         or get additional information on the module.
 */

function yFindModule(func) {
    return YModule.FindModule(func);
}

/**
 * Starts the enumeration of modules currently accessible.
 * Use the method YModule.nextModule() to iterate on the
 * next modules.
 *
 * @return {YModule} a pointer to a YModule object, corresponding to
 *         the first module currently online, or a null pointer
 *         if there are none.
 */
function yFirstModule() {
    return YModule.FirstModule();
}

//--- (end of generated code: Module functions)

//--- (generated code: YSensor class start)
/**
 * YSensor Class: Sensor function interface
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
//--- (end of generated code: YSensor class start)
/** @extends {YFunction} **/
class YSensor extends YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YSensor constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Sensor';
        /** @member {string} **/
        this._unit = Y_UNIT_INVALID;
        /** @member {number} **/
        this._currentValue = Y_CURRENTVALUE_INVALID;
        /** @member {number} **/
        this._lowestValue = Y_LOWESTVALUE_INVALID;
        /** @member {number} **/
        this._highestValue = Y_HIGHESTVALUE_INVALID;
        /** @member {number} **/
        this._currentRawValue = Y_CURRENTRAWVALUE_INVALID;
        /** @member {string} **/
        this._logFrequency = Y_LOGFREQUENCY_INVALID;
        /** @member {string} **/
        this._reportFrequency = Y_REPORTFREQUENCY_INVALID;
        /** @member {string} **/
        this._calibrationParam = Y_CALIBRATIONPARAM_INVALID;
        /** @member {number} **/
        this._resolution = Y_RESOLUTION_INVALID;
        /** @member {number} **/
        this._sensorState = Y_SENSORSTATE_INVALID;
        /** @member {function} **/
        this._timedReportCallbackSensor = null;
        /** @member {number} **/
        this._prevTimedReport = 0;
        /** @member {number} **/
        this._iresol = 0;
        /** @member {number} **/
        this._offset = 0;
        /** @member {number} **/
        this._scale = 0;
        /** @member {number} **/
        this._decexp = 0;
        /** @member {boolean} **/
        this._isScal = 0;
        /** @member {boolean} **/
        this._isScal32 = 0;
        /** @member {number} **/
        this._caltyp = 0;
        /** @member {number[]} **/
        this._calpar = [];
        /** @member {number[]} **/
        this._calraw = [];
        /** @member {number[]} **/
        this._calref = [];
        /** @member {function} **/
        this._calhdl = null;
        this.imm_setConst({
            UNIT_INVALID: YAPI_INVALID_STRING,
            CURRENTVALUE_INVALID: YAPI_INVALID_DOUBLE,
            LOWESTVALUE_INVALID: YAPI_INVALID_DOUBLE,
            HIGHESTVALUE_INVALID: YAPI_INVALID_DOUBLE,
            CURRENTRAWVALUE_INVALID: YAPI_INVALID_DOUBLE,
            LOGFREQUENCY_INVALID: YAPI_INVALID_STRING,
            REPORTFREQUENCY_INVALID: YAPI_INVALID_STRING,
            CALIBRATIONPARAM_INVALID: YAPI_INVALID_STRING,
            RESOLUTION_INVALID: YAPI_INVALID_DOUBLE,
            SENSORSTATE_INVALID: YAPI_INVALID_INT
        });
        //--- (end of generated code: YSensor constructor)
    }

    //--- (generated code: YSensor implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'unit':
                this._unit = val;
                return 1;
            case 'currentValue':
                this._currentValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'lowestValue':
                this._lowestValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'highestValue':
                this._highestValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'currentRawValue':
                this._currentRawValue = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'logFrequency':
                this._logFrequency = val;
                return 1;
            case 'reportFrequency':
                this._reportFrequency = val;
                return 1;
            case 'calibrationParam':
                this._calibrationParam = val;
                return 1;
            case 'resolution':
                this._resolution = Math.round(val * 1000.0 / 65536.0) / 1000.0;
                return 1;
            case 'sensorState':
                this._sensorState = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the measuring unit for the measure.
     *
     * @return {string} a string corresponding to the measuring unit for the measure
     *
     * On failure, throws an exception or returns YSensor.UNIT_INVALID.
     */
    get_unit() {
        var _this78 = this;

        return _asyncToGenerator(function* () {
            if (_this78._cacheExpiration <= _this78._yapi.GetTickCount()) {
                if ((yield _this78.load(_this78._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_UNIT_INVALID;
                }
            }
            return _this78._unit;
        })();
    }

    /**
     * Returns the current value of the measure, in the specified unit, as a floating point number.
     *
     * @return {number} a floating point number corresponding to the current value of the measure, in the
     * specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTVALUE_INVALID.
     */
    get_currentValue() {
        var _this79 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this79._cacheExpiration <= _this79._yapi.GetTickCount()) {
                if ((yield _this79.load(_this79._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_CURRENTVALUE_INVALID;
                }
            }
            res = yield _this79._applyCalibration(_this79._currentRawValue);
            if (res == Y_CURRENTVALUE_INVALID) {
                res = _this79._currentValue;
            }
            res = res * _this79._iresol;
            return Math.round(res) / _this79._iresol;
        })();
    }

    /**
     * Changes the recorded minimal value observed.
     *
     * @param newval {number} : a floating point number corresponding to the recorded minimal value observed
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lowestValue(newval) {
        var _this80 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this80._setAttr('lowestValue', rest_val);
        })();
    }

    /**
     * Returns the minimal value observed for the measure since the device was started.
     *
     * @return {number} a floating point number corresponding to the minimal value observed for the
     * measure since the device was started
     *
     * On failure, throws an exception or returns YSensor.LOWESTVALUE_INVALID.
     */
    get_lowestValue() {
        var _this81 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this81._cacheExpiration <= _this81._yapi.GetTickCount()) {
                if ((yield _this81.load(_this81._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_LOWESTVALUE_INVALID;
                }
            }
            res = _this81._lowestValue * _this81._iresol;
            return Math.round(res) / _this81._iresol;
        })();
    }

    /**
     * Changes the recorded maximal value observed.
     *
     * @param newval {number} : a floating point number corresponding to the recorded maximal value observed
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_highestValue(newval) {
        var _this82 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this82._setAttr('highestValue', rest_val);
        })();
    }

    /**
     * Returns the maximal value observed for the measure since the device was started.
     *
     * @return {number} a floating point number corresponding to the maximal value observed for the
     * measure since the device was started
     *
     * On failure, throws an exception or returns YSensor.HIGHESTVALUE_INVALID.
     */
    get_highestValue() {
        var _this83 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this83._cacheExpiration <= _this83._yapi.GetTickCount()) {
                if ((yield _this83.load(_this83._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_HIGHESTVALUE_INVALID;
                }
            }
            res = _this83._highestValue * _this83._iresol;
            return Math.round(res) / _this83._iresol;
        })();
    }

    /**
     * Returns the uncalibrated, unrounded raw value returned by the sensor, in the specified unit, as a
     * floating point number.
     *
     * @return {number} a floating point number corresponding to the uncalibrated, unrounded raw value
     * returned by the sensor, in the specified unit, as a floating point number
     *
     * On failure, throws an exception or returns YSensor.CURRENTRAWVALUE_INVALID.
     */
    get_currentRawValue() {
        var _this84 = this;

        return _asyncToGenerator(function* () {
            if (_this84._cacheExpiration <= _this84._yapi.GetTickCount()) {
                if ((yield _this84.load(_this84._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_CURRENTRAWVALUE_INVALID;
                }
            }
            return _this84._currentRawValue;
        })();
    }

    /**
     * Returns the datalogger recording frequency for this function, or "OFF"
     * when measures are not stored in the data logger flash memory.
     *
     * @return {string} a string corresponding to the datalogger recording frequency for this function, or "OFF"
     *         when measures are not stored in the data logger flash memory
     *
     * On failure, throws an exception or returns YSensor.LOGFREQUENCY_INVALID.
     */
    get_logFrequency() {
        var _this85 = this;

        return _asyncToGenerator(function* () {
            if (_this85._cacheExpiration <= _this85._yapi.GetTickCount()) {
                if ((yield _this85.load(_this85._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_LOGFREQUENCY_INVALID;
                }
            }
            return _this85._logFrequency;
        })();
    }

    /**
     * Changes the datalogger recording frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable recording for this function, use
     * the value "OFF".
     *
     * @param newval {string} : a string corresponding to the datalogger recording frequency for this function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_logFrequency(newval) {
        var _this86 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this86._setAttr('logFrequency', rest_val);
        })();
    }

    /**
     * Returns the timed value notification frequency, or "OFF" if timed
     * value notifications are disabled for this function.
     *
     * @return {string} a string corresponding to the timed value notification frequency, or "OFF" if timed
     *         value notifications are disabled for this function
     *
     * On failure, throws an exception or returns YSensor.REPORTFREQUENCY_INVALID.
     */
    get_reportFrequency() {
        var _this87 = this;

        return _asyncToGenerator(function* () {
            if (_this87._cacheExpiration <= _this87._yapi.GetTickCount()) {
                if ((yield _this87.load(_this87._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_REPORTFREQUENCY_INVALID;
                }
            }
            return _this87._reportFrequency;
        })();
    }

    /**
     * Changes the timed value notification frequency for this function.
     * The frequency can be specified as samples per second,
     * as sample per minute (for instance "15/m") or in samples per
     * hour (eg. "4/h"). To disable timed value notifications for this
     * function, use the value "OFF".
     *
     * @param newval {string} : a string corresponding to the timed value notification frequency for this function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_reportFrequency(newval) {
        var _this88 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this88._setAttr('reportFrequency', rest_val);
        })();
    }

    get_calibrationParam() {
        var _this89 = this;

        return _asyncToGenerator(function* () {
            if (_this89._cacheExpiration <= _this89._yapi.GetTickCount()) {
                if ((yield _this89.load(_this89._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_CALIBRATIONPARAM_INVALID;
                }
            }
            return _this89._calibrationParam;
        })();
    }

    set_calibrationParam(newval) {
        var _this90 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this90._setAttr('calibrationParam', rest_val);
        })();
    }

    /**
     * Changes the resolution of the measured physical values. The resolution corresponds to the numerical precision
     * when displaying value. It does not change the precision of the measure itself.
     *
     * @param newval {number} : a floating point number corresponding to the resolution of the measured physical values
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_resolution(newval) {
        var _this91 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(Math.round(newval * 65536.0));
            return yield _this91._setAttr('resolution', rest_val);
        })();
    }

    /**
     * Returns the resolution of the measured values. The resolution corresponds to the numerical precision
     * of the measures, which is not always the same as the actual precision of the sensor.
     *
     * @return {number} a floating point number corresponding to the resolution of the measured values
     *
     * On failure, throws an exception or returns YSensor.RESOLUTION_INVALID.
     */
    get_resolution() {
        var _this92 = this;

        return _asyncToGenerator(function* () {
            if (_this92._cacheExpiration <= _this92._yapi.GetTickCount()) {
                if ((yield _this92.load(_this92._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_RESOLUTION_INVALID;
                }
            }
            return _this92._resolution;
        })();
    }

    /**
     * Returns the sensor health state code, which is zero when there is an up-to-date measure
     * available or a positive code if the sensor is not able to provide a measure right now.
     *
     * @return {number} an integer corresponding to the sensor health state code, which is zero when there
     * is an up-to-date measure
     *         available or a positive code if the sensor is not able to provide a measure right now
     *
     * On failure, throws an exception or returns YSensor.SENSORSTATE_INVALID.
     */
    get_sensorState() {
        var _this93 = this;

        return _asyncToGenerator(function* () {
            if (_this93._cacheExpiration <= _this93._yapi.GetTickCount()) {
                if ((yield _this93.load(_this93._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return Y_SENSORSTATE_INVALID;
                }
            }
            return _this93._sensorState;
        })();
    }

    /**
     * Retrieves a sensor for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the sensor
     *
     * @return {YSensor} a YSensor object allowing you to drive the sensor.
     */
    static FindSensor(func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCache('Sensor', func);
        if (obj == null) {
            obj = new YSensor(YAPI, func);
            YFunction._AddToCache('Sensor', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a sensor for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the sensor is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSensor.isOnline() to test if the sensor is
     * indeed online at a given time. In case of ambiguity when looking for
     * a sensor by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the sensor
     *
     * @return {YSensor} a YSensor object allowing you to drive the sensor.
     */
    static FindSensorInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = YFunction._FindFromCacheInContext(yctx, 'Sensor', func);
        if (obj == null) {
            obj = new YSensor(yctx, func);
            YFunction._AddToCache('Sensor', func, obj);
        }
        return obj;
    }

    _parserHelper() {
        var _this94 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let position;
            /** @type {number} **/
            let maxpos;
            /** @type {number[]} **/
            let iCalib = [];
            /** @type {number} **/
            let iRaw;
            /** @type {number} **/
            let iRef;
            /** @type {number} **/
            let fRaw;
            /** @type {number} **/
            let fRef;
            _this94._caltyp = -1;
            _this94._scale = -1;
            _this94._isScal32 = false;
            _this94._calpar.length = 0;
            _this94._calraw.length = 0;
            _this94._calref.length = 0;
            // Store inverted resolution, to provide better rounding
            if (_this94._resolution > 0) {
                _this94._iresol = Math.round(1.0 / _this94._resolution);
            } else {
                _this94._iresol = 10000;
                _this94._resolution = 0.0001;
            }
            // Old format: supported when there is no calibration
            if (_this94._calibrationParam == '' || _this94._calibrationParam == '0') {
                _this94._caltyp = 0;
                return 0;
            }
            if (_this94._calibrationParam.indexOf(',') >= 0) {
                iCalib = _this94._yapi.imm_decodeFloats(_this94._calibrationParam);
                _this94._caltyp = parseInt(iCalib[0] / 1000, 10);
                if (_this94._caltyp > 0) {
                    if (_this94._caltyp < YOCTO_CALIB_TYPE_OFS) {
                        _this94._caltyp = -1;
                        return 0;
                    }
                    _this94.imm_calhdl = _this94._yapi.imm_getCalibrationHandler(_this94._caltyp);
                    if (!(_this94.imm_calhdl != null)) {
                        _this94._caltyp = -1;
                        return 0;
                    }
                }
                _this94._isScal = true;
                _this94._isScal32 = true;
                _this94._offset = 0;
                _this94._scale = 1000;
                maxpos = iCalib.length;
                _this94._calpar.length = 0;
                position = 1;
                while (position < maxpos) {
                    _this94._calpar.push(iCalib[position]);
                    position = position + 1;
                }
                _this94._calraw.length = 0;
                _this94._calref.length = 0;
                position = 1;
                while (position + 1 < maxpos) {
                    fRaw = iCalib[position];
                    fRaw = fRaw / 1000.0;
                    fRef = iCalib[position + 1];
                    fRef = fRef / 1000.0;
                    _this94._calraw.push(fRaw);
                    _this94._calref.push(fRef);
                    position = position + 2;
                }
            } else {
                iCalib = _this94._yapi.imm_decodeWords(_this94._calibrationParam);
                if (iCalib.length < 2) {
                    _this94._caltyp = -1;
                    return 0;
                }
                _this94._isScal = iCalib[1] > 0;
                if (_this94._isScal) {
                    _this94._offset = iCalib[0];
                    if (_this94._offset > 32767) {
                        _this94._offset = _this94._offset - 65536;
                    }
                    _this94._scale = iCalib[1];
                    _this94._decexp = 0;
                } else {
                    _this94._offset = 0;
                    _this94._scale = 1;
                    _this94._decexp = 1.0;
                    position = iCalib[0];
                    while (position > 0) {
                        _this94._decexp = _this94._decexp * 10;
                        position = position - 1;
                    }
                }
                if (iCalib.length == 2) {
                    _this94._caltyp = 0;
                    return 0;
                }
                _this94._caltyp = iCalib[2];
                _this94.imm_calhdl = _this94._yapi.imm_getCalibrationHandler(_this94._caltyp);
                if (_this94._caltyp <= 10) {
                    maxpos = _this94._caltyp;
                } else {
                    if (_this94._caltyp <= 20) {
                        maxpos = _this94._caltyp - 10;
                    } else {
                        maxpos = 5;
                    }
                }
                maxpos = 3 + 2 * maxpos;
                if (maxpos > iCalib.length) {
                    maxpos = iCalib.length;
                }
                _this94._calpar.length = 0;
                _this94._calraw.length = 0;
                _this94._calref.length = 0;
                position = 3;
                while (position + 1 < maxpos) {
                    iRaw = iCalib[position];
                    iRef = iCalib[position + 1];
                    _this94._calpar.push(iRaw);
                    _this94._calpar.push(iRef);
                    if (_this94._isScal) {
                        fRaw = iRaw;
                        fRaw = (fRaw - _this94._offset) / _this94._scale;
                        fRef = iRef;
                        fRef = (fRef - _this94._offset) / _this94._scale;
                        _this94._calraw.push(fRaw);
                        _this94._calref.push(fRef);
                    } else {
                        _this94._calraw.push(_this94._yapi.imm_decimalToDouble(iRaw));
                        _this94._calref.push(_this94._yapi.imm_decimalToDouble(iRef));
                    }
                    position = position + 2;
                }
            }
            return 0;
        })();
    }

    /**
     * Checks if the sensor is currently able to provide an up-to-date measure.
     * Returns false if the device is unreachable, or if the sensor does not have
     * a current measure to transmit. No exception is raised if there is an error
     * while trying to contact the device hosting $THEFUNCTION$.
     *
     * @return {boolean} true if the sensor can provide an up-to-date measure, and false otherwise
     */
    isSensorReady() {
        var _this95 = this;

        return _asyncToGenerator(function* () {
            if (!(yield _this95.isOnline())) {
                return false;
            }
            if (!(_this95._sensorState == 0)) {
                return false;
            }
            return true;
        })();
    }

    /**
     * Starts the data logger on the device. Note that the data logger
     * will only save the measures on this sensor if the logFrequency
     * is not set to "OFF".
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     */
    startDataLogger() {
        var _this96 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let res;
            // may throw an exception
            res = yield _this96._download('api/dataLogger/recording?recording=1');
            if (!(res.length > 0)) {
                return _this96._throw(YAPI_IO_ERROR, 'unable to start datalogger', YAPI_IO_ERROR);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Stops the datalogger on the device.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     */
    stopDataLogger() {
        var _this97 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let res;
            // may throw an exception
            res = yield _this97._download('api/dataLogger/recording?recording=0');
            if (!(res.length > 0)) {
                return _this97._throw(YAPI_IO_ERROR, 'unable to stop datalogger', YAPI_IO_ERROR);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Retrieves a DataSet object holding historical data for this
     * sensor, for a specified time interval. The measures will be
     * retrieved from the data logger, which must have been turned
     * on at the desired time. See the documentation of the DataSet
     * class for information on how to get an overview of the
     * recorded data, and how to load progressively a large set
     * of measures from the data logger.
     *
     * This function only works if the device uses a recent firmware,
     * as DataSet objects are not supported by firmwares older than
     * version 13000.
     *
     * @param startTime {number} : the start of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any meaasure, without initial limit.
     * @param endTime {number} : the end of the desired measure time interval,
     *         as a Unix timestamp, i.e. the number of seconds since
     *         January 1, 1970 UTC. The special value 0 can be used
     *         to include any meaasure, without ending limit.
     *
     * @return {YDataSet} an instance of YDataSet, providing access to historical
     *         data. Past measures can be loaded progressively
     *         using methods from the YDataSet object.
     */
    get_recordedData(startTime, endTime) {
        var _this98 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let funcid;
            /** @type {string} **/
            let funit;
            // may throw an exception
            funcid = yield _this98.get_functionId();
            funit = yield _this98.get_unit();
            return new YDataSet(_this98, funcid, funit, startTime, endTime);
        })();
    }

    /**
     * Registers the callback function that is invoked on every periodic timed notification.
     * The callback is invoked only during the execution of ySleep or yHandleEvents.
     * This provides control over the time when the callback is triggered. For good responsiveness, remember to call
     * one of these two functions periodically. To unregister a callback, pass a null pointer as argument.
     *
     * @param callback {function} : the callback function to call, or a null pointer. The callback
     * function should take two
     *         arguments: the function object of which the value has changed, and an YMeasure object describing
     *         the new advertised value.
     * @noreturn
     */
    registerTimedReportCallback(callback) {
        var _this99 = this;

        return _asyncToGenerator(function* () {
            /** @type {YFunction} **/
            let sensor;
            sensor = _this99;
            if (callback != null) {
                yield YFunction._UpdateTimedReportCallbackList(sensor, true);
            } else {
                yield YFunction._UpdateTimedReportCallbackList(sensor, false);
            }
            _this99._timedReportCallbackSensor = callback;
            return 0;
        })();
    }

    _invokeTimedReportCallback(value) {
        var _this100 = this;

        return _asyncToGenerator(function* () {
            if (_this100._timedReportCallbackSensor != null) {
                yield _this100._timedReportCallbackSensor(_this100, value);
            } else {}
            return 0;
        })();
    }

    /**
     * Configures error correction data points, in particular to compensate for
     * a possible perturbation of the measure caused by an enclosure. It is possible
     * to configure up to five correction points. Correction points must be provided
     * in ascending order, and be in the range of the sensor. The device will automatically
     * perform a linear interpolation of the error correction between specified
     * points. Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * For more information on advanced capabilities to refine the calibration of
     * sensors, please contact support@yoctopuce.com.
     *
     * @param rawValues {number[]} : array of floating point numbers, corresponding to the raw
     *         values returned by the sensor for the correction points.
     * @param refValues {number[]} : array of floating point numbers, corresponding to the corrected
     *         values for the correction points.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    calibrateFromPoints(rawValues, refValues) {
        var _this101 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            // may throw an exception
            rest_val = yield _this101._encodeCalibrationPoints(rawValues, refValues);
            return yield _this101._setAttr('calibrationParam', rest_val);
        })();
    }

    /**
     * Retrieves error correction data points previously entered using the method
     * calibrateFromPoints.
     *
     * @param rawValues {number[]} : array of floating point numbers, that will be filled by the
     *         function with the raw sensor values for the correction points.
     * @param refValues {number[]} : array of floating point numbers, that will be filled by the
     *         function with the desired values for the correction points.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadCalibrationPoints(rawValues, refValues) {
        var _this102 = this;

        return _asyncToGenerator(function* () {
            rawValues.length = 0;
            refValues.length = 0;
            // Load function parameters if not yet loaded
            if (_this102._scale == 0) {
                if ((yield _this102.load(_this102._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return YAPI_DEVICE_NOT_FOUND;
                }
            }
            if (_this102._caltyp < 0) {
                _this102._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
                return YAPI_NOT_SUPPORTED;
            }
            rawValues.length = 0;
            refValues.length = 0;
            for (let ii in _this102._calraw) {
                rawValues.push(_this102._calraw[ii]);
            }
            for (let ii in _this102._calref) {
                refValues.push(_this102._calref[ii]);
            }
            return YAPI_SUCCESS;
        })();
    }

    _encodeCalibrationPoints(rawValues, refValues) {
        var _this103 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            /** @type {number} **/
            let npt;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let iRaw;
            /** @type {number} **/
            let iRef;
            npt = rawValues.length;
            if (npt != refValues.length) {
                _this103._throw(YAPI_INVALID_ARGUMENT, 'Invalid calibration parameters (size mismatch)');
                return YAPI_INVALID_STRING;
            }
            // Shortcut when building empty calibration parameters
            if (npt == 0) {
                return '0';
            }
            // Load function parameters if not yet loaded
            if (_this103._scale == 0) {
                if ((yield _this103.load(_this103._yapi.defaultCacheValidity)) != YAPI_SUCCESS) {
                    return YAPI_INVALID_STRING;
                }
            }
            // Detect old firmware
            if (_this103._caltyp < 0 || _this103._scale < 0) {
                _this103._throw(YAPI_NOT_SUPPORTED, 'Calibration parameters format mismatch. Please upgrade your library or firmware.');
                return '0';
            }
            if (_this103._isScal32) {
                res = String(Math.round(YOCTO_CALIB_TYPE_OFS));
                idx = 0;
                while (idx < npt) {
                    res = res + ',' + String(Math.round(rawValues[idx] * 1000) / 1000) + ',' + String(Math.round(refValues[idx] * 1000) / 1000);
                    idx = idx + 1;
                }
            } else {
                if (_this103._isScal) {
                    res = String(Math.round(npt));
                    idx = 0;
                    while (idx < npt) {
                        iRaw = Math.round(rawValues[idx] * _this103._scale + _this103._offset);
                        iRef = Math.round(refValues[idx] * _this103._scale + _this103._offset);
                        res = res + ',' + String(Math.round(iRaw)) + ',' + String(Math.round(iRef));
                        idx = idx + 1;
                    }
                } else {
                    res = String(Math.round(10 + npt));
                    idx = 0;
                    while (idx < npt) {
                        iRaw = _this103._yapi.imm_doubleToDecimal(rawValues[idx]);
                        iRef = _this103._yapi.imm_doubleToDecimal(refValues[idx]);
                        res = res + ',' + String(Math.round(iRaw)) + ',' + String(Math.round(iRef));
                        idx = idx + 1;
                    }
                }
            }
            return res;
        })();
    }

    _applyCalibration(rawValue) {
        var _this104 = this;

        return _asyncToGenerator(function* () {
            if (rawValue == Y_CURRENTVALUE_INVALID) {
                return Y_CURRENTVALUE_INVALID;
            }
            if (_this104._caltyp == 0) {
                return rawValue;
            }
            if (_this104._caltyp < 0) {
                return Y_CURRENTVALUE_INVALID;
            }
            if (!(_this104.imm_calhdl != null)) {
                return Y_CURRENTVALUE_INVALID;
            }
            return _this104.imm_calhdl(rawValue, _this104._caltyp, _this104._calpar, _this104._calraw, _this104._calref);
        })();
    }

    _decodeTimedReport(timestamp, report) {
        var _this105 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let byteVal;
            /** @type {number} **/
            let poww;
            /** @type {number} **/
            let minRaw;
            /** @type {number} **/
            let avgRaw;
            /** @type {number} **/
            let maxRaw;
            /** @type {number} **/
            let sublen;
            /** @type {number} **/
            let difRaw;
            /** @type {number} **/
            let startTime;
            /** @type {number} **/
            let endTime;
            /** @type {number} **/
            let minVal;
            /** @type {number} **/
            let avgVal;
            /** @type {number} **/
            let maxVal;
            startTime = _this105._prevTimedReport;
            endTime = timestamp;
            _this105._prevTimedReport = endTime;
            if (startTime == 0) {
                startTime = endTime;
            }
            if (report[0] == 2) {
                if (report.length <= 5) {
                    poww = 1;
                    avgRaw = 0;
                    byteVal = 0;
                    i = 1;
                    while (i < report.length) {
                        byteVal = report[i];
                        avgRaw = avgRaw + poww * byteVal;
                        poww = poww * 0x100;
                        i = i + 1;
                    }
                    if ((byteVal & 0x80) != 0) {
                        avgRaw = avgRaw - poww;
                    }
                    avgVal = avgRaw / 1000.0;
                    if (_this105._caltyp != 0) {
                        if (_this105.imm_calhdl != null) {
                            avgVal = _this105.imm_calhdl(avgVal, _this105._caltyp, _this105._calpar, _this105._calraw, _this105._calref);
                        }
                    }
                    minVal = avgVal;
                    maxVal = avgVal;
                } else {
                    sublen = 1 + (report[1] & 3);
                    poww = 1;
                    avgRaw = 0;
                    byteVal = 0;
                    i = 2;
                    while (sublen > 0 && i < report.length) {
                        byteVal = report[i];
                        avgRaw = avgRaw + poww * byteVal;
                        poww = poww * 0x100;
                        i = i + 1;
                        sublen = sublen - 1;
                    }
                    if ((byteVal & 0x80) != 0) {
                        avgRaw = avgRaw - poww;
                    }
                    sublen = 1 + (report[1] >> 2 & 3);
                    poww = 1;
                    difRaw = 0;
                    while (sublen > 0 && i < report.length) {
                        byteVal = report[i];
                        difRaw = difRaw + poww * byteVal;
                        poww = poww * 0x100;
                        i = i + 1;
                        sublen = sublen - 1;
                    }
                    minRaw = avgRaw - difRaw;
                    sublen = 1 + (report[1] >> 4 & 3);
                    poww = 1;
                    difRaw = 0;
                    while (sublen > 0 && i < report.length) {
                        byteVal = report[i];
                        difRaw = difRaw + poww * byteVal;
                        poww = poww * 0x100;
                        i = i + 1;
                        sublen = sublen - 1;
                    }
                    maxRaw = avgRaw + difRaw;
                    avgVal = avgRaw / 1000.0;
                    minVal = minRaw / 1000.0;
                    maxVal = maxRaw / 1000.0;
                    if (_this105._caltyp != 0) {
                        if (_this105.imm_calhdl != null) {
                            avgVal = _this105.imm_calhdl(avgVal, _this105._caltyp, _this105._calpar, _this105._calraw, _this105._calref);
                            minVal = _this105.imm_calhdl(minVal, _this105._caltyp, _this105._calpar, _this105._calraw, _this105._calref);
                            maxVal = _this105.imm_calhdl(maxVal, _this105._caltyp, _this105._calpar, _this105._calraw, _this105._calref);
                        }
                    }
                }
            } else {
                if (report[0] == 0) {
                    poww = 1;
                    avgRaw = 0;
                    byteVal = 0;
                    i = 1;
                    while (i < report.length) {
                        byteVal = report[i];
                        avgRaw = avgRaw + poww * byteVal;
                        poww = poww * 0x100;
                        i = i + 1;
                    }
                    if (_this105._isScal) {
                        avgVal = _this105.imm_decodeVal(avgRaw);
                    } else {
                        if ((byteVal & 0x80) != 0) {
                            avgRaw = avgRaw - poww;
                        }
                        avgVal = _this105.imm_decodeAvg(avgRaw);
                    }
                    minVal = avgVal;
                    maxVal = avgVal;
                } else {
                    minRaw = report[1] + 0x100 * report[2];
                    maxRaw = report[3] + 0x100 * report[4];
                    avgRaw = report[5] + 0x100 * report[6] + 0x10000 * report[7];
                    byteVal = report[8];
                    if ((byteVal & 0x80) == 0) {
                        avgRaw = avgRaw + 0x1000000 * byteVal;
                    } else {
                        avgRaw = avgRaw - 0x1000000 * (0x100 - byteVal);
                    }
                    minVal = _this105.imm_decodeVal(minRaw);
                    avgVal = _this105.imm_decodeAvg(avgRaw);
                    maxVal = _this105.imm_decodeVal(maxRaw);
                }
            }
            return new YMeasure(startTime, endTime, minVal, avgVal, maxVal);
        })();
    }

    imm_decodeVal(w) {
        /** @type {number} **/
        let val;
        val = w;
        if (this._isScal) {
            val = (val - this._offset) / this._scale;
        } else {
            val = this._yapi.imm_decimalToDouble(w);
        }
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    imm_decodeAvg(dw) {
        /** @type {number} **/
        let val;
        val = dw;
        if (this._isScal) {
            val = (val / 100 - this._offset) / this._scale;
        } else {
            val = val / this._decexp;
        }
        if (this._caltyp != 0) {
            if (this.imm_calhdl != null) {
                val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
            }
        }
        return val;
    }

    /**
     * Continues the enumeration of sensors started using yFirstSensor().
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         a sensor currently online, or a null pointer
     *         if there are no more sensors to enumerate.
     */
    nextSensor() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YSensor.FindSensorInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensor() {
        /** @type {string|null} **/
        let next_hwid = YAPI.imm_getFirstHardwareId('Sensor');
        if (next_hwid == null) return null;
        return YSensor.FindSensor(next_hwid);
    }

    /**
     * Starts the enumeration of sensors currently accessible.
     * Use the method YSensor.nextSensor() to iterate on
     * next sensors.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSensor} a pointer to a YSensor object, corresponding to
     *         the first sensor currently online, or a null pointer
     *         if there are none.
     */
    static FirstSensorInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Sensor');
        if (next_hwid == null) return null;
        return YSensor.FindSensorInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YSensor implementation)
}

exports.YSensor = YSensor; //--- (generated code: Sensor functions)

/**
 * Retrieves a sensor for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the sensor is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSensor.isOnline() to test if the sensor is
 * indeed online at a given time. In case of ambiguity when looking for
 * a sensor by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the sensor
 *
 * @return {YSensor} a YSensor object allowing you to drive the sensor.
 */

function yFindSensor(func) {
    return YSensor.FindSensor(func);
}

/**
 * Starts the enumeration of sensors currently accessible.
 * Use the method YSensor.nextSensor() to iterate on
 * next sensors.
 *
 * @return {YSensor} a pointer to a YSensor object, corresponding to
 *         the first sensor currently online, or a null pointer
 *         if there are none.
 */
function yFirstSensor() {
    return YSensor.FirstSensor();
}

//--- (end of generated code: Sensor functions)

//--- (generated code: YMeasure definitions)
//--- (end of generated code: YMeasure definitions)

//--- (generated code: YMeasure class start)
/**
 * YMeasure Class: Measured value
 *
 * YMeasure objects are used within the API to represent
 * a value measured at a specified time. These objects are
 * used in particular in conjunction with the YDataSet class.
 */
//--- (end of generated code: YMeasure class start)
class YMeasure {
    constructor(float_start, float_end, float_minVal, float_avgVal, float_maxVal) {
        //--- (generated code: YMeasure constructor)
        /** @member {number} **/
        this._start = 0;
        /** @member {number} **/
        this._end = 0;
        /** @member {number} **/
        this._minVal = 0;
        /** @member {number} **/
        this._avgVal = 0;
        /** @member {number} **/
        this._maxVal = 0;
        //--- (end of generated code: YMeasure constructor)
        this._start = float_start;
        this._end = float_end;
        this._minVal = float_minVal;
        this._avgVal = float_avgVal;
        this._maxVal = float_maxVal;
    }
    //--- (generated code: YMeasure implementation)

    /**
     * Returns the start time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher then 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return {number} an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the beginning of this measure.
     */
    get_startTimeUTC() {
        return this._start;
    }

    /**
     * Returns the end time of the measure, relative to the Jan 1, 1970 UTC
     * (Unix timestamp). When the recording rate is higher than 1 sample
     * per second, the timestamp may have a fractional part.
     *
     * @return {number} an floating point number corresponding to the number of seconds
     *         between the Jan 1, 1970 UTC and the end of this measure.
     */
    get_endTimeUTC() {
        return this._end;
    }

    /**
     * Returns the smallest value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the smallest value observed.
     */
    get_minValue() {
        return this._minVal;
    }

    /**
     * Returns the average value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the average value observed.
     */
    get_averageValue() {
        return this._avgVal;
    }

    /**
     * Returns the largest value observed during the time interval
     * covered by this measure.
     *
     * @return {number} a floating-point number corresponding to the largest value observed.
     */
    get_maxValue() {
        return this._maxVal;
    }

    //--- (end of generated code: YMeasure implementation)

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the beginning of this measure
     */
    get_startTimeUTC_asDate() {
        return new Date(Math.round(this._start * 1000));
    }

    /**
     * Returns the start date of the measure.
     *
     * @return {Date} a Date object corresponding to the end of this measure
     */
    get_endTimeUTC_asDate() {
        return new Date(Math.round(this._end * 1000));
    }
}

exports.YMeasure = YMeasure; //--- (generated code: YDataStream definitions)
//--- (end of generated code: YDataStream definitions)

//--- (generated code: YDataStream class start)
/**
 * YDataStream Class: Unformatted data sequence
 *
 * YDataStream objects represent bare recorded measure sequences,
 * exactly as found within the data logger present on Yoctopuce
 * sensors.
 *
 * In most cases, it is not necessary to use YDataStream objects
 * directly, as the YDataSet objects (returned by the
 * get_recordedData() method from sensors and the
 * get_dataSets() method from the data logger) provide
 * a more convenient interface.
 */
//--- (end of generated code: YDataStream class start)

class YDataStream {
    constructor(obj_parent, obj_dataset, encoded) {
        //--- (generated code: YDataStream constructor)
        /** @member {YFunction} **/
        this._parent = null;
        /** @member {number} **/
        this._runNo = 0;
        /** @member {number} **/
        this._utcStamp = 0;
        /** @member {number} **/
        this._nCols = 0;
        /** @member {number} **/
        this._nRows = 0;
        /** @member {number} **/
        this._duration = 0;
        /** @member {string[]} **/
        this._columnNames = [];
        /** @member {string} **/
        this._functionId = '';
        /** @member {boolean} **/
        this._isClosed = 0;
        /** @member {boolean} **/
        this._isAvg = 0;
        /** @member {boolean} **/
        this._isScal = 0;
        /** @member {boolean} **/
        this._isScal32 = 0;
        /** @member {number} **/
        this._decimals = 0;
        /** @member {number} **/
        this._offset = 0;
        /** @member {number} **/
        this._scale = 0;
        /** @member {number} **/
        this._samplesPerHour = 0;
        /** @member {number} **/
        this._minVal = 0;
        /** @member {number} **/
        this._avgVal = 0;
        /** @member {number} **/
        this._maxVal = 0;
        /** @member {number} **/
        this._decexp = 0;
        /** @member {number} **/
        this._caltyp = 0;
        /** @member {number[]} **/
        this._calpar = [];
        /** @member {number[]} **/
        this._calraw = [];
        /** @member {number[]} **/
        this._calref = [];
        /** @member {number[][]} **/
        this._values = [];
        //--- (end of generated code: YDataStream constructor)
        this.imm_setConst({
            DATA_INVALID: Y_DATA_INVALID,
            DURATION_INVALID: Y_DURATION_INVALID
        });

        this._parent = obj_parent;
        this._calhdl = null;
        if (typeof obj_dataset != 'undefined') {
            this.imm_initFromDataSet(obj_dataset, encoded);
        }
    }

    //--- (generated code: YDataStream implementation)

    imm_initFromDataSet(dataset, encoded) {
        /** @type {number} **/
        let val;
        /** @type {number} **/
        let i;
        /** @type {number} **/
        let maxpos;
        /** @type {number} **/
        let iRaw;
        /** @type {number} **/
        let iRef;
        /** @type {number} **/
        let fRaw;
        /** @type {number} **/
        let fRef;
        /** @type {number} **/
        let duration_float;
        /** @type {number[]} **/
        let iCalib = [];
        // decode sequence header to extract data
        this._runNo = encoded[0] + (encoded[1] << 16);
        this._utcStamp = encoded[2] + (encoded[3] << 16);
        val = encoded[4];
        this._isAvg = (val & 0x100) == 0;
        this._samplesPerHour = val & 0xff;
        if ((val & 0x100) != 0) {
            this._samplesPerHour = this._samplesPerHour * 3600;
        } else {
            if ((val & 0x200) != 0) {
                this._samplesPerHour = this._samplesPerHour * 60;
            }
        }
        val = encoded[5];
        if (val > 32767) {
            val = val - 65536;
        }
        this._decimals = val;
        this._offset = val;
        this._scale = encoded[6];
        this._isScal = this._scale != 0;
        this._isScal32 = encoded.length >= 14;
        val = encoded[7];
        this._isClosed = val != 0xffff;
        if (val == 0xffff) {
            val = 0;
        }
        this._nRows = val;
        duration_float = this._nRows * 3600 / this._samplesPerHour;
        this._duration = Math.round(duration_float);
        // precompute decoding parameters
        this._decexp = 1.0;
        if (this._scale == 0) {
            i = 0;
            while (i < this._decimals) {
                this._decexp = this._decexp * 10.0;
                i = i + 1;
            }
        }
        iCalib = dataset.imm_get_calibration();
        this._caltyp = iCalib[0];
        if (this._caltyp != 0) {
            this.imm_calhdl = this._yapi.imm_getCalibrationHandler(this._caltyp);
            maxpos = iCalib.length;
            this._calpar.length = 0;
            this._calraw.length = 0;
            this._calref.length = 0;
            if (this._isScal32) {
                i = 1;
                while (i < maxpos) {
                    this._calpar.push(iCalib[i]);
                    i = i + 1;
                }
                i = 1;
                while (i + 1 < maxpos) {
                    fRaw = iCalib[i];
                    fRaw = fRaw / 1000.0;
                    fRef = iCalib[i + 1];
                    fRef = fRef / 1000.0;
                    this._calraw.push(fRaw);
                    this._calref.push(fRef);
                    i = i + 2;
                }
            } else {
                i = 1;
                while (i + 1 < maxpos) {
                    iRaw = iCalib[i];
                    iRef = iCalib[i + 1];
                    this._calpar.push(iRaw);
                    this._calpar.push(iRef);
                    if (this._isScal) {
                        fRaw = iRaw;
                        fRaw = (fRaw - this._offset) / this._scale;
                        fRef = iRef;
                        fRef = (fRef - this._offset) / this._scale;
                        this._calraw.push(fRaw);
                        this._calref.push(fRef);
                    } else {
                        this._calraw.push(this._yapi.imm_decimalToDouble(iRaw));
                        this._calref.push(this._yapi.imm_decimalToDouble(iRef));
                    }
                    i = i + 2;
                }
            }
        }
        // preload column names for backward-compatibility
        this._functionId = dataset.imm_get_functionId();
        if (this._isAvg) {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId + '_min');
            this._columnNames.push(this._functionId + '_avg');
            this._columnNames.push(this._functionId + '_max');
            this._nCols = 3;
        } else {
            this._columnNames.length = 0;
            this._columnNames.push(this._functionId);
            this._nCols = 1;
        }
        // decode min/avg/max values for the sequence
        if (this._nRows > 0) {
            if (this._isScal32) {
                this._avgVal = this.imm_decodeAvg(encoded[8] + ((encoded[9] ^ 0x8000) << 16), 1);
                this._minVal = this.imm_decodeVal(encoded[10] + (encoded[11] << 16));
                this._maxVal = this.imm_decodeVal(encoded[12] + (encoded[13] << 16));
            } else {
                this._minVal = this.imm_decodeVal(encoded[8]);
                this._maxVal = this.imm_decodeVal(encoded[9]);
                this._avgVal = this.imm_decodeAvg(encoded[10] + (encoded[11] << 16), this._nRows);
            }
        }
        return 0;
    }

    imm_parseStream(sdata) {
        /** @type {number} **/
        let idx;
        /** @type {number[]} **/
        let udat = [];
        /** @type {number[]} **/
        let dat = [];
        if (sdata.length == 0) {
            this._nRows = 0;
            return YAPI_SUCCESS;
        }
        // may throw an exception
        udat = this._yapi.imm_decodeWords(this._parent.imm_json_get_string(sdata));
        this._values.length = 0;
        idx = 0;
        if (this._isAvg) {
            while (idx + 3 < udat.length) {
                dat.length = 0;
                if (this._isScal32) {
                    dat.push(this.imm_decodeVal(udat[idx + 2] + (udat[idx + 3] << 16)));
                    dat.push(this.imm_decodeAvg(udat[idx] + ((udat[idx + 1] ^ 0x8000) << 16), 1));
                    dat.push(this.imm_decodeVal(udat[idx + 4] + (udat[idx + 5] << 16)));
                    idx = idx + 6;
                } else {
                    dat.push(this.imm_decodeVal(udat[idx]));
                    dat.push(this.imm_decodeAvg(udat[idx + 2] + (udat[idx + 3] << 16), 1));
                    dat.push(this.imm_decodeVal(udat[idx + 1]));
                    idx = idx + 4;
                }
                this._values.push(dat.slice());
            }
        } else {
            if (this._isScal && !this._isScal32) {
                while (idx < udat.length) {
                    dat.length = 0;
                    dat.push(this.imm_decodeVal(udat[idx]));
                    this._values.push(dat.slice());
                    idx = idx + 1;
                }
            } else {
                while (idx + 1 < udat.length) {
                    dat.length = 0;
                    dat.push(this.imm_decodeAvg(udat[idx] + ((udat[idx + 1] ^ 0x8000) << 16), 1));
                    this._values.push(dat.slice());
                    idx = idx + 2;
                }
            }
        }

        this._nRows = this._values.length;
        return YAPI_SUCCESS;
    }

    imm_get_url() {
        /** @type {string} **/
        let url;
        url = 'logger.json?id=' + this._functionId + '&run=' + String(Math.round(this._runNo)) + '&utc=' + String(Math.round(this._utcStamp));
        return url;
    }

    loadStream() {
        var _this106 = this;

        return _asyncToGenerator(function* () {
            return _this106.imm_parseStream((yield _this106._parent._download(_this106.imm_get_url())));
        })();
    }

    imm_decodeVal(w) {
        /** @type {number} **/
        let val;
        val = w;
        if (this._isScal32) {
            val = val / 1000.0;
        } else {
            if (this._isScal) {
                val = (val - this._offset) / this._scale;
            } else {
                val = this._yapi.imm_decimalToDouble(w);
            }
        }
        if (this._caltyp != 0) {
            val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    imm_decodeAvg(dw, count) {
        /** @type {number} **/
        let val;
        val = dw;
        if (this._isScal32) {
            val = val / 1000.0;
        } else {
            if (this._isScal) {
                val = (val / (100 * count) - this._offset) / this._scale;
            } else {
                val = val / (count * this._decexp);
            }
        }
        if (this._caltyp != 0) {
            val = this.imm_calhdl(val, this._caltyp, this._calpar, this._calraw, this._calref);
        }
        return val;
    }

    isClosed() {
        var _this107 = this;

        return _asyncToGenerator(function* () {
            return _this107._isClosed;
        })();
    }

    /**
     * Returns the run index of the data stream. A run can be made of
     * multiple datastreams, for different time intervals.
     *
     * @return {number} an unsigned number corresponding to the run index.
     */
    get_runIndex() {
        var _this108 = this;

        return _asyncToGenerator(function* () {
            return _this108._runNo;
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
        var _this109 = this;

        return _asyncToGenerator(function* () {
            return _this109._utcStamp - parseInt(+new Date() / 1000, 10);
        })();
    }

    /**
     * Returns the start time of the data stream, relative to the Jan 1, 1970.
     * If the UTC time was not set in the datalogger at the time of the recording
     * of this data stream, this method returns 0.
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         stream (i.e. Unix time representation of the absolute time).
     */
    get_startTimeUTC() {
        var _this110 = this;

        return _asyncToGenerator(function* () {
            return _this110._utcStamp;
        })();
    }

    /**
     * Returns the number of milliseconds between two consecutive
     * rows of this data stream. By default, the data logger records one row
     * per second, but the recording frequency can be changed for
     * each device function
     *
     * @return {number} an unsigned number corresponding to a number of milliseconds.
     */
    get_dataSamplesIntervalMs() {
        var _this111 = this;

        return _asyncToGenerator(function* () {
            return parseInt(3600000 / _this111._samplesPerHour, 10);
        })();
    }

    get_dataSamplesInterval() {
        var _this112 = this;

        return _asyncToGenerator(function* () {
            return 3600.0 / _this112._samplesPerHour;
        })();
    }

    /**
     * Returns the number of data rows present in this stream.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {number} an unsigned number corresponding to the number of rows.
     *
     * On failure, throws an exception or returns zero.
     */
    get_rowCount() {
        var _this113 = this;

        return _asyncToGenerator(function* () {
            if (_this113._nRows != 0 && _this113._isClosed) {
                return _this113._nRows;
            }
            yield _this113.loadStream();
            return _this113._nRows;
        })();
    }

    /**
     * Returns the number of data columns present in this stream.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {number} an unsigned number corresponding to the number of columns.
     *
     * On failure, throws an exception or returns zero.
     */
    get_columnCount() {
        var _this114 = this;

        return _asyncToGenerator(function* () {
            if (_this114._nCols != 0) {
                return _this114._nCols;
            }
            yield _this114.loadStream();
            return _this114._nCols;
        })();
    }

    /**
     * Returns the title (or meaning) of each data column present in this stream.
     * In most case, the title of the data column is the hardware identifier
     * of the sensor that produced the data. For streams recorded at a lower
     * recording rate, the dataLogger stores the min, average and max value
     * during each measure interval into three columns with suffixes _min,
     * _avg and _max respectively.
     *
     * If the device uses a firmware older than version 13000,
     * this method fetches the whole data stream from the device
     * if not yet done, which can cause a little delay.
     *
     * @return {string[]} a list containing as many strings as there are columns in the
     *         data stream.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_columnNames() {
        var _this115 = this;

        return _asyncToGenerator(function* () {
            if (_this115._columnNames.length != 0) {
                return _this115._columnNames;
            }
            yield _this115.loadStream();
            return _this115._columnNames;
        })();
    }

    /**
     * Returns the smallest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the smallest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_minValue() {
        var _this116 = this;

        return _asyncToGenerator(function* () {
            return _this116._minVal;
        })();
    }

    /**
     * Returns the average of all measures observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the average value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_averageValue() {
        var _this117 = this;

        return _asyncToGenerator(function* () {
            return _this117._avgVal;
        })();
    }

    /**
     * Returns the largest measure observed within this stream.
     * If the device uses a firmware older than version 13000,
     * this method will always return YDataStream.DATA_INVALID.
     *
     * @return {number} a floating-point number corresponding to the largest value,
     *         or YDataStream.DATA_INVALID if the stream is not yet complete (still recording).
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_maxValue() {
        var _this118 = this;

        return _asyncToGenerator(function* () {
            return _this118._maxVal;
        })();
    }

    /**
     * Returns the approximate duration of this stream, in seconds.
     *
     * @return {number} the number of seconds covered by this stream.
     *
     * On failure, throws an exception or returns YDataStream.DURATION_INVALID.
     */
    get_duration() {
        var _this119 = this;

        return _asyncToGenerator(function* () {
            if (_this119._isClosed) {
                return _this119._duration;
            }
            return parseInt(+new Date() / 1000, 10) - _this119._utcStamp;
        })();
    }

    /**
     * Returns the whole data set contained in the stream, as a bidimensional
     * table of numbers.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @return {number[][]} a list containing as many elements as there are rows in the
     *         data stream. Each row itself is a list of floating-point
     *         numbers.
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_dataRows() {
        var _this120 = this;

        return _asyncToGenerator(function* () {
            if (_this120._values.length == 0 || !_this120._isClosed) {
                yield _this120.loadStream();
            }
            return _this120._values;
        })();
    }

    /**
     * Returns a single measure from the data stream, specified by its
     * row and column index.
     * The meaning of the values present in each column can be obtained
     * using the method get_columnNames().
     *
     * This method fetches the whole data stream from the device,
     * if not yet done.
     *
     * @param row {number} : row index
     * @param col {number} : column index
     *
     * @return {number} a floating-point number
     *
     * On failure, throws an exception or returns YDataStream.DATA_INVALID.
     */
    get_data(row, col) {
        var _this121 = this;

        return _asyncToGenerator(function* () {
            if (_this121._values.length == 0 || !_this121._isClosed) {
                yield _this121.loadStream();
            }
            if (row >= _this121._values.length) {
                return Y_DATA_INVALID;
            }
            if (col >= _this121._values[row].length) {
                return Y_DATA_INVALID;
            }
            return _this121._values[row][col];
        })();
    }

    //--- (end of generated code: YDataStream implementation)
}

exports.YDataStream = YDataStream; //--- (generated code: YDataSet definitions)
//--- (end of generated code: YDataSet definitions)

//--- (generated code: YDataSet class start)
/**
 * YDataSet Class: Recorded data sequence
 *
 * YDataSet objects make it possible to retrieve a set of recorded measures
 * for a given sensor and a specified time interval. They can be used
 * to load data points with a progress report. When the YDataSet object is
 * instantiated by the get_recordedData()  function, no data is
 * yet loaded from the module. It is only when the loadMore()
 * method is called over and over than data will be effectively loaded
 * from the dataLogger.
 *
 * A preview of available measures is available using the function
 * get_preview() as soon as loadMore() has been called
 * once. Measures themselves are available using function get_measures()
 * when loaded by subsequent calls to loadMore().
 *
 * This class can only be used on devices that use a recent firmware,
 * as YDataSet objects are not supported by firmwares older than version 13000.
 */
//--- (end of generated code: YDataSet class start)

class YDataSet {
    constructor(obj_parent, str_functionId, str_unit, u32_startTime, u32_endTime) {
        //--- (generated code: YDataSet constructor)
        /** @member {YFunction} **/
        this._parent = null;
        /** @member {string} **/
        this._hardwareId = '';
        /** @member {string} **/
        this._functionId = '';
        /** @member {string} **/
        this._unit = '';
        /** @member {number} **/
        this._startTime = 0;
        /** @member {number} **/
        this._endTime = 0;
        /** @member {number} **/
        this._progress = 0;
        /** @member {number[]} **/
        this._calib = [];
        /** @member {YDataStream[]} **/
        this._streams = [];
        /** @member {YMeasure} **/
        this._summary = null;
        /** @member {YMeasure[]} **/
        this._preview = [];
        /** @member {YMeasure[]} **/
        this._measures = [];
        //--- (end of generated code: YDataSet constructor)
        // init _summary with dummy value
        this._summary = new YMeasure(0, 0, 0, 0, 0);
        if (typeof str_unit === 'undefined') {
            // 1st version of constructor, called from YDataLogger
            /** @member {YFunction} **/
            this._parent = obj_parent;
            /** @member {YAPIContext} **/
            this._yapi = obj_parent._yapi;
            this._startTime = 0;
            this._endTime = 0;
            // caller must call method async parse() just afterwards
        } else {
                // 2nd version of constructor, called from YFunction
                /** @member {YFunction} **/
                this._parent = obj_parent;
                /** @member {YAPIContext} **/
                this._yapi = obj_parent._yapi;
                this._functionId = str_functionId;
                this._unit = str_unit;
                this._startTime = u32_startTime;
                this._endTime = u32_endTime;
                this._progress = -1;
            }
    }

    imm_get_functionId() {
        return this._functionId;
    }

    //--- (generated code: YDataSet implementation)

    imm_get_calibration() {
        return this._calib;
    }

    processMore(progress, data) {
        var _this122 = this;

        return _asyncToGenerator(function* () {
            /** @type {YDataStream} **/
            let stream;
            /** @type {number[][]} **/
            let dataRows = [];
            /** @type {string} **/
            let strdata;
            /** @type {number} **/
            let tim;
            /** @type {number} **/
            let itv;
            /** @type {number} **/
            let nCols;
            /** @type {number} **/
            let minCol;
            /** @type {number} **/
            let avgCol;
            /** @type {number} **/
            let maxCol;
            // may throw an exception
            if (progress != _this122._progress) {
                return _this122._progress;
            }
            if (_this122._progress < 0) {
                strdata = _this122._yapi.imm_bin2str(data);
                if (strdata == '{}') {
                    _this122._parent._throw(YAPI_VERSION_MISMATCH, 'device firmware is too old');
                    return YAPI_VERSION_MISMATCH;
                }
                return yield _this122._parse(strdata);
            }
            stream = _this122._streams[_this122._progress];
            stream.imm_parseStream(data);
            dataRows = yield stream.get_dataRows();
            _this122._progress = _this122._progress + 1;
            if (dataRows.length == 0) {
                return yield _this122.get_progress();
            }
            tim = yield stream.get_startTimeUTC();
            itv = yield stream.get_dataSamplesInterval();
            if (tim < itv) {
                tim = itv;
            }
            nCols = dataRows[0].length;
            minCol = 0;
            if (nCols > 2) {
                avgCol = 1;
            } else {
                avgCol = 0;
            }
            if (nCols > 2) {
                maxCol = 2;
            } else {
                maxCol = 0;
            }

            for (let ii in dataRows) {
                if (tim >= _this122._startTime && (_this122._endTime == 0 || tim <= _this122._endTime)) {
                    _this122._measures.push(new YMeasure(tim - itv, tim, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
                }
                tim = tim + itv;
            }

            return yield _this122.get_progress();
        })();
    }

    get_privateDataStreams() {
        var _this123 = this;

        return _asyncToGenerator(function* () {
            return _this123._streams;
        })();
    }

    /**
     * Returns the unique hardware identifier of the function who performed the measures,
     * in the form SERIAL.FUNCTIONID. The unique hardware identifier is composed of the
     * device serial number and of the hardware identifier of the function
     * (for example THRMCPL1-123456.temperature1)
     *
     * @return {string} a string that uniquely identifies the function (ex: THRMCPL1-123456.temperature1)
     *
     * On failure, throws an exception or returns  YDataSet.HARDWAREID_INVALID.
     */
    get_hardwareId() {
        var _this124 = this;

        return _asyncToGenerator(function* () {
            /** @type {YModule} **/
            let mo;
            if (!(_this124._hardwareId == '')) {
                return _this124._hardwareId;
            }
            mo = yield _this124._parent.get_module();
            _this124._hardwareId = (yield mo.get_serialNumber()) + '.' + (yield _this124.get_functionId());
            return _this124._hardwareId;
        })();
    }

    /**
     * Returns the hardware identifier of the function that performed the measure,
     * without reference to the module. For example temperature1.
     *
     * @return {string} a string that identifies the function (ex: temperature1)
     */
    get_functionId() {
        var _this125 = this;

        return _asyncToGenerator(function* () {
            return _this125._functionId;
        })();
    }

    /**
     * Returns the measuring unit for the measured value.
     *
     * @return {string} a string that represents a physical unit.
     *
     * On failure, throws an exception or returns  YDataSet.UNIT_INVALID.
     */
    get_unit() {
        var _this126 = this;

        return _asyncToGenerator(function* () {
            return _this126._unit;
        })();
    }

    /**
     * Returns the start time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the start time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the start time is updated
     * to reflect the timestamp of the first measure actually found in the
     * dataLogger within the specified range.
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the beginning of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    get_startTimeUTC() {
        var _this127 = this;

        return _asyncToGenerator(function* () {
            return _this127._startTime;
        })();
    }

    /**
     * Returns the end time of the dataset, relative to the Jan 1, 1970.
     * When the YDataSet is created, the end time is the value passed
     * in parameter to the get_dataSet() function. After the
     * very first call to loadMore(), the end time is updated
     * to reflect the timestamp of the last measure actually found in the
     * dataLogger within the specified range.
     *
     * @return {number} an unsigned number corresponding to the number of seconds
     *         between the Jan 1, 1970 and the end of this data
     *         set (i.e. Unix time representation of the absolute time).
     */
    get_endTimeUTC() {
        var _this128 = this;

        return _asyncToGenerator(function* () {
            return _this128._endTime;
        })();
    }

    /**
     * Returns the progress of the downloads of the measures from the data logger,
     * on a scale from 0 to 100. When the object is instantiated by get_dataSet,
     * the progress is zero. Each time loadMore() is invoked, the progress
     * is updated, to reach the value 100 only once all measures have been loaded.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion).
     */
    get_progress() {
        var _this129 = this;

        return _asyncToGenerator(function* () {
            if (_this129._progress < 0) {
                return 0;
            }
            // index not yet loaded
            if (_this129._progress >= _this129._streams.length) {
                return 100;
            }
            return parseInt((1 + (1 + _this129._progress) * 98) / (1 + _this129._streams.length), 10);
        })();
    }

    /**
     * Loads the the next block of measures from the dataLogger, and updates
     * the progress indicator.
     *
     * @return {number} an integer in the range 0 to 100 (percentage of completion),
     *         or a negative error code in case of failure.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    loadMore() {
        var _this130 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let url;
            /** @type {YDataStream} **/
            let stream;
            if (_this130._progress < 0) {
                url = 'logger.json?id=' + _this130._functionId;
            } else {
                if (_this130._progress >= _this130._streams.length) {
                    return 100;
                } else {
                    stream = _this130._streams[_this130._progress];
                    url = stream.imm_get_url();
                }
            }
            return yield _this130.processMore(_this130._progress, (yield _this130._parent._download(url)));
        })();
    }

    /**
     * Returns an YMeasure object which summarizes the whole
     * DataSet. In includes the following information:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This summary is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return {YMeasure} an YMeasure object
     */
    get_summary() {
        var _this131 = this;

        return _asyncToGenerator(function* () {
            return _this131._summary;
        })();
    }

    /**
     * Returns a condensed version of the measures that can
     * retrieved in this YDataSet, as a list of YMeasure
     * objects. Each item includes:
     * - the start of a time interval
     * - the end of a time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * This preview is available as soon as loadMore() has
     * been called for the first time.
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_preview() {
        var _this132 = this;

        return _asyncToGenerator(function* () {
            return _this132._preview;
        })();
    }

    /**
     * Returns the detailed set of measures for the time interval corresponding
     * to a given condensed measures previously returned by get_preview().
     * The result is provided as a list of YMeasure objects.
     *
     * @param measure {YMeasure} : condensed measure from the list previously returned by
     *         get_preview().
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured values during a time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_measuresAt(measure) {
        var _this133 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let startUtc;
            /** @type {YDataStream} **/
            let stream;
            /** @type {number[][]} **/
            let dataRows = [];
            /** @type {YMeasure[]} **/
            let measures = [];
            /** @type {number} **/
            let tim;
            /** @type {number} **/
            let itv;
            /** @type {number} **/
            let nCols;
            /** @type {number} **/
            let minCol;
            /** @type {number} **/
            let avgCol;
            /** @type {number} **/
            let maxCol;
            // may throw an exception
            startUtc = Math.round(measure.get_startTimeUTC());
            stream = null;
            for (let ii in _this133._streams) {
                if ((yield _this133._streams[ii].get_startTimeUTC()) == startUtc) {
                    stream = _this133._streams[ii];
                }
                ;;
            }
            if (stream == null) {
                return measures;
            }
            dataRows = yield stream.get_dataRows();
            if (dataRows.length == 0) {
                return measures;
            }
            tim = yield stream.get_startTimeUTC();
            itv = yield stream.get_dataSamplesInterval();
            if (tim < itv) {
                tim = itv;
            }
            nCols = dataRows[0].length;
            minCol = 0;
            if (nCols > 2) {
                avgCol = 1;
            } else {
                avgCol = 0;
            }
            if (nCols > 2) {
                maxCol = 2;
            } else {
                maxCol = 0;
            }

            for (let ii in dataRows) {
                if (tim >= _this133._startTime && (_this133._endTime == 0 || tim <= _this133._endTime)) {
                    measures.push(new YMeasure(tim - itv, tim, dataRows[ii][minCol], dataRows[ii][avgCol], dataRows[ii][maxCol]));
                }
                tim = tim + itv;;
            }
            return measures;
        })();
    }

    /**
     * Returns all measured values currently available for this DataSet,
     * as a list of YMeasure objects. Each item includes:
     * - the start of the measure time interval
     * - the end of the measure time interval
     * - the minimal value observed during the time interval
     * - the average value observed during the time interval
     * - the maximal value observed during the time interval
     *
     * Before calling this method, you should call loadMore()
     * to load data from the device. You may have to call loadMore()
     * several time until all rows are loaded, but you can start
     * looking at available data rows before the load is complete.
     *
     * The oldest measures are always loaded first, and the most
     * recent measures will be loaded last. As a result, timestamps
     * are normally sorted in ascending order within the measure table,
     * unless there was an unexpected adjustment of the datalogger UTC
     * clock.
     *
     * @return {YMeasure[]} a table of records, where each record depicts the
     *         measured value for a given time interval
     *
     * On failure, throws an exception or returns an empty array.
     */
    get_measures() {
        var _this134 = this;

        return _asyncToGenerator(function* () {
            return _this134._measures;
        })();
    }

    //--- (end of generated code: YDataSet implementation)

    // YDataSet parser for stream list
    _parse(str_json) {
        var _this135 = this;

        return _asyncToGenerator(function* () {
            var summaryMinVal = Number.MAX_VALUE;
            var summaryMaxVal = -Number.MAX_VALUE;
            var summaryTotalTime = 0;
            var summaryTotalAvg = 0;
            var startTime = 0x7fffffff;
            var endTime = 0;
            var loadval;

            try {
                loadval = JSON.parse(str_json);
            } catch (err) {}
            if (!loadval) {
                // no data available
                _this135._progress = 0;
                return _this135;
            }

            _this135._functionId = loadval.id;
            _this135._unit = loadval.unit;
            if (loadval.calib) {
                _this135._calib = _this135._yapi.imm_decodeFloats(loadval.calib);
                _this135._calib[0] = parseInt(_this135._calib[0] / 1000);
            } else {
                _this135._calib = _this135._yapi.imm_decodeWords(loadval.cal);
            }
            _this135._summary = new YMeasure(0, 0, 0, 0, 0);
            _this135._streams = [];
            _this135._preview = [];
            _this135._measures = [];
            for (var i = 0; i < loadval.streams.length; i++) {
                var stream = _this135._parent.imm_findDataStream(_this135, loadval.streams[i]);
                var streamEndTime = (yield stream.get_startTimeUTC()) + (yield stream.get_duration());
                var streamStartTime = (yield stream.get_startTimeUTC()) - parseInt((yield stream.get_dataSamplesIntervalMs()) / 1000);
                if (_this135._startTime > 0 && streamEndTime <= _this135._startTime) {
                    // this stream is too early, drop it
                } else if (_this135._endTime > 0 && (yield stream.get_startTimeUTC()) > _this135._endTime) {
                        // this stream is too late, drop it
                    } else {
                            _this135._streams.push(stream);
                            if (startTime > streamStartTime) {
                                startTime = streamStartTime;
                            }
                            if (endTime < streamEndTime) {
                                endTime = streamEndTime;
                            }
                            if (stream.isClosed() && (yield stream.get_startTimeUTC()) >= _this135._startTime && (_this135._endTime == 0 || streamEndTime <= _this135._endTime)) {
                                if (summaryMinVal > (yield stream.get_minValue())) summaryMinVal = yield stream.get_minValue();
                                if (summaryMaxVal < (yield stream.get_maxValue())) summaryMaxVal = yield stream.get_maxValue();
                                summaryTotalAvg += (yield stream.get_averageValue()) * (yield stream.get_duration());
                                summaryTotalTime += yield stream.get_duration();

                                var rec = new YMeasure((yield stream.get_startTimeUTC()), streamEndTime, (yield stream.get_minValue()), (yield stream.get_averageValue()), (yield stream.get_maxValue()));
                                _this135._preview.push(rec);
                            }
                        }
            }
            if (_this135._streams.length > 0 && summaryTotalTime > 0) {
                // update time boundaries with actual data
                if (_this135._startTime < startTime) {
                    _this135._startTime = startTime;
                }
                if (_this135._endTime == 0 || _this135._endTime > endTime) {
                    _this135._endTime = endTime;
                }
                _this135._summary = new YMeasure(_this135._startTime, _this135._endTime, summaryMinVal, summaryTotalAvg / summaryTotalTime, summaryMaxVal);
            }
            _this135._progress = 0;
            return _this135;
        })();
    }

}

//
// YAPI Context
//
// This class provides the high-level entry points to access Functions, stores
// an indexes instances of the Device object and of FunctionType collections.
//
class YGenericHub {
    constructor(obj_yapi, var_urlInfo) {
        /** @member {YAPIContext} **/
        this._yapi = obj_yapi;
        /** @member {number} **/
        this._lastErrorType = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg = 'no error';
        /** @member {Object} **/
        this.urlInfo = var_urlInfo; // structure that describe the root URL of the hub
        /** @member {number} **/
        this.notiflen = 32000; // notification message length before forced disconnection
        /** @member {number} **/
        this.devListValidity = 500; // default validity of updateDeviceList
        /** @member {number} **/
        this.devListExpires = 0; // timestamp of next useful updateDeviceList
        this.serialByYdx = []; // serials by hub-specific devYdx
        /** @member {number} **/
        this.retryDelay = 15; // delay before reconnecting in case of error: initially 15ms
        /** @member {number} **/
        this.notifPos = -1; // current absolute position in hub notification stream
        /** @member {number} **/
        this.currPos = 0; // current position in data stream
        /** @member {Object} **/
        this.missing = {}; // used during UpdateDeviceList
        /** @member {boolean} **/
        this.disconnecting = false; // set to true when requested to disconnect
    }

    _throw(int_errType, str_errMsg, obj_retVal) {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;
        this._yapi._throw(int_errType, str_errMsg, obj_retVal);
    }

    imm_forceUpdate() {
        this.devListExpires = this._yapi.GetTickCount();
    }

    /** Make sure the hub can work properly
     *
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(errmsg) {
        var _this136 = this;

        return _asyncToGenerator(function* () {
            // default test method is to issue a small request
            /** @type {YHTTPRequest} **/
            let yreq = yield _this136.request('GET', _this136.urlInfo.url, '/api/module.json', null);
            if (yreq.errorType != YAPI_SUCCESS) {
                errmsg.msg = yreq.errorMsg;
                return yreq.errorType;
            }

            return YAPI_SUCCESS;
        })();
    }

    hubUpdateDeviceList() {
        var _this137 = this;

        return _asyncToGenerator(function* () {
            // load hub API, process white pages and yellow pages
            /** @type {YDevice} **/
            let hubDev = _this137._yapi.imm_getDevice(_this137.urlInfo.url);
            /** @type {number} **/
            let retcode = yield hubDev.refresh();
            if (retcode != YAPI_SUCCESS) {
                return _this137._throw(retcode, hubDev._lastErrorMsg, retcode);
            }
            /** @type {YHTTPRequest} **/
            let yreq = yield hubDev.requestAPI(_this137._yapi.defaultCacheValidity);
            if (yreq.errorType != YAPI_SUCCESS) {
                return yreq;
            }
            let loadval = null;
            try {
                loadval = JSON.parse(_this137._yapi.imm_bin2str(yreq.bin_result));
            } catch (err) {}
            if (!loadval) {
                return _this137._throw(YAPI_IO_ERROR, 'Request failed, could not parse API result for ' + hubDev.imm_describe(), YAPI_IO_ERROR);
            }
            let whitePages = loadval['services']['whitePages'];
            let yellowPages = loadval['services']['yellowPages'];
            if (whitePages == undefined) {
                return _this137._throw(YAPI_INVALID_ARGUMENT, 'Device ' + hubDev.imm_describe() + ' is not a hub', YAPI_INVALID_ARGUMENT);
            }
            retcode = yield _this137._yapi.updateDeviceList_process(_this137, hubDev, whitePages, yellowPages);
            if (retcode != YAPI_SUCCESS) {
                return _this137._throw(_this137._yapi._lastErrorType, _this137._yapi._lastErrorMsg, _this137._yapi._lastErrorType);
            }

            // reset device list cache timeout for this hub
            _this137.devListExpires = _this137._yapi.GetTickCount() + _this137.devListValidity;
            return YAPI_SUCCESS;
        })();
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param baseUrl {string}
     * @param devUrl {string}
     * @param obj_body {Uint8Array}
     * @returns {YHTTPRequest}
     */
    request(method, baseUrl, devUrl, obj_body) {
        return _asyncToGenerator(function* () {
            // must be overriden by subclasses
            var res = new YHTTPRequest(null);
            res.errorType = YAPI_NOT_SUPPORTED;
            res.errorMsg = 'GenericHub subclass expected';
            return res;
        })();
    }

    imm_commonDisconnect() {
        this.disconnecting = true;
    }

    // default implementation of disconnect
    // note: super.xxx() cannot be used in an async function !
    disconnect() {
        var _this138 = this;

        return _asyncToGenerator(function* () {
            _this138.imm_commonDisconnect();
        })();
    }
}

exports.YGenericHub = YGenericHub;
class YHttpHub extends YGenericHub {
    constructor(obj_yapi, var_urlInfo) {
        super(obj_yapi, var_urlInfo);
        /** @member {XMLHttpRequest} **/
        this.notbynRequest = null;
        /** @member {Promise} **/
        this.notbynOpenPromise = null;
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(errmsg) {
        var _this139 = this;

        return _asyncToGenerator(function* () {
            if (_this139.disconnecting) {
                return YAPI_IO_ERROR;
            }
            let args = '?len=' + _this139.notiflen.toString();
            if (_this139.notifPos > 0) {
                args += '&abs=' + _this139.notifPos.toString();
            }
            _this139.notbynOpenPromise = new Promise(function (resolve, reject) {
                _this139.notbynRequest = new XMLHttpRequest();
                _this139.notbynRequest.open('GET', _this139.urlInfo.url + 'not.byn' + args, true, '', '');
                _this139.notbynRequest.overrideMimeType('text/plain; charset=x-user-defined');
                _this139.notbynRequest.onreadystatechange = function () {
                    if (_this139.disconnecting) {
                        return;
                    }
                    if (_this139.notbynRequest.readyState >= 3) {
                        resolve(YAPI_SUCCESS);
                        if (_this139.notbynRequest.readyState == 4 && parseInt(_this139.notbynRequest.status) != 200 && parseInt(_this139.notbynRequest.status) != 304) {
                            // connection error
                            if (_this139.retryDelay < 15000) _this139.retryDelay *= 2;
                            _this139.devListValidity = 500;
                            _this139.devListExpires = 0;
                            setTimeout(function () {
                                _this139.testHub(new YErrorMsg());
                            }, _this139.retryDelay);
                        } else {
                            // receiving data properly
                            if (_this139.notbynRequest.readyState == 3) {
                                // when using reconnection mode, ignore state 3
                                if (_this139.notiflen == 1) return;
                            }
                            let newlen = _this139.notbynRequest.responseText.length;
                            if (newlen > _this139.currPos) {
                                _this139._yapi.parseEvents(_this139, _this139.notbynRequest.responseText.substr(_this139.currPos, newlen - _this139.currPos));
                            }
                            // trigger immediately a new connection if closed in success
                            if (_this139.notbynRequest.readyState == 4 && parseInt(_this139.notbynRequest.status) != 0) {
                                _this139.currPos = 0;
                                _this139.testHub(new YErrorMsg());
                            }
                        }
                    }
                };
                _this139.notbynRequest.send('');
            });
            return yield _this139.notbynOpenPromise;
        })();
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param baseUrl {string}
     * @param devUrl {string}
     * @param obj_body {Uint8Array}
     * @returns {YHTTPRequest}
     */
    request(method, baseUrl, devUrl, obj_body) {
        var _this140 = this;

        return _asyncToGenerator(function* () {
            let httpPromise = new Promise(function (resolve, reject) {
                let httpRequest = new XMLHttpRequest();
                httpRequest.open(method, baseUrl + devUrl, true, '', '');
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState == 4) {
                        let yreq = new YHTTPRequest(null);
                        if (httpRequest.status != 200 && httpRequest.status != 304) {
                            yreq.errorType = YAPI_NOT_SUPPORTED;
                            yreq.errorMsg = 'HTTP Error ' + httpRequest.status;
                        } else {
                            yreq.bin_result = _this140._yapi.imm_str2bin(httpRequest.responseText);
                        }
                        resolve(yreq);
                    }
                };
                // FIXME: convert body to FormData if needed
                httpRequest.send(obj_body || '');
            });
            return httpPromise;
        })();
    }

    disconnect() {
        var _this141 = this;

        return _asyncToGenerator(function* () {
            _this141.imm_commonDisconnect();
            _this141.notbynRequest.abort();
        })();
    }
}

exports.YHttpHub = YHttpHub;
class YHttpNodeHub extends YGenericHub {
    constructor(obj_yapi, var_urlInfo) {
        super(obj_yapi, var_urlInfo);
        this.http = this._yapi._nodeRequire('http');
        /** @member {ClientRequest} **/
        this.notbynRequest = null;
        /** @member {Promise} **/
        this.notbynOpenPromise = null;
    }

    /** Handle HTTP-based event-monitoring work on a registered hub
     *
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(errmsg) {
        var _this142 = this;

        return _asyncToGenerator(function* () {
            if (_this142.disconnecting) {
                return YAPI_IO_ERROR;
            }
            let args = '';
            if (_this142.notifPos > 0) {
                args = '?abs=' + _this142.notifPos.toString();
            }
            let options = {
                method: 'GET',
                hostname: _this142.urlInfo.host,
                port: _this142.urlInfo.port,
                path: '/not.byn' + args
            };
            _this142.notbynOpenPromise = new Promise(function (resolve, reject) {
                _this142.notbynRequest = _this142.http.request(options, function (res) {
                    if (_this142.disconnecting) {
                        return;
                    }
                    if (res.statusCode != 200 && res.statusCode != 304) {
                        // connection error
                        if (_this142.retryDelay < 15000) _this142.retryDelay *= 2;
                        _this142.devListValidity = 500;
                        _this142.devListExpires = 0;
                        setTimeout(function () {
                            _this142.testHub(new YErrorMsg());
                        }, _this142.retryDelay);
                    } else {
                        resolve(YAPI_SUCCESS);
                        res.on('data', function (chunk) {
                            // receiving data properly
                            _this142._yapi.parseEvents(_this142, _this142._yapi.imm_bin2str(chunk));
                        });
                        res.on('end', function () {
                            // trigger immediately a new connection if closed in success
                            _this142.currPos = 0;
                            _this142.testHub(new YErrorMsg());
                        });
                    }
                });
                _this142.notbynRequest.on('error', function () {
                    // connection aborted, need to reconnect
                    _this142.devListValidity = 500;
                    _this142.devListExpires = 0;
                    setTimeout(function () {
                        _this142.testHub(new YErrorMsg());
                    }, 50);
                });
                _this142.notbynRequest.end();
            });
            return yield _this142.notbynOpenPromise;
        })();
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param baseUrl {string}
     * @param devUrl {string}
     * @param obj_body {Uint8Array}
     * @returns {YHTTPRequest}
     */
    request(str_method, baseUrl, devUrl, obj_body) {
        var _this143 = this;

        return _asyncToGenerator(function* () {
            let options = {
                method: str_method,
                hostname: _this143.urlInfo.host,
                port: _this143.urlInfo.port,
                path: devUrl
            };
            let httpPromise = new Promise(function (resolve, reject) {
                let response = new Buffer(0);
                let httpRequest = _this143.http.request(options, function (res) {
                    if (res.statusCode != 200 && res.statusCode != 304) {
                        // connection error
                        let yreq = new YHTTPRequest(null);
                        yreq.errorType = YAPI_NOT_SUPPORTED;
                        yreq.errorMsg = 'HTTP Error ' + res.statusCode.toString();
                        resolve(yreq);
                    } else {
                        res.on('data', function (chunk) {
                            // receiving data properly
                            response = Buffer.concat([response, chunk]);
                        });
                        res.on('end', function () {
                            resolve(new YHTTPRequest(new Uint8Array(response)));
                        });
                    }
                });
                httpRequest.on('error', function (err) {
                    let yreq = new YHTTPRequest(null);
                    yreq.errorType = YAPI_IO_ERROR;
                    yreq.errorMsg = err.errorMsg;
                    resolve(yreq);
                });
                httpRequest.end();
            });
            return httpPromise;
        })();
    }

    disconnect() {
        var _this144 = this;

        return _asyncToGenerator(function* () {
            _this144.imm_commonDisconnect();
            _this144.notbynRequest.abort();
        })();
    }
}

exports.YHttpNodeHub = YHttpNodeHub;
class YHttpCallbackHub extends YGenericHub {
    constructor(obj_yapi, var_urlInfo, incomingMessage, serverResponse) {
        super(obj_yapi, var_urlInfo);
        var cbhub = this;
        this.crypto = this._yapi._nodeRequire('crypto');
        /** @member {IncomingMessage} **/
        this._incomingMessage = incomingMessage;
        /** @member {ServerResponse} **/
        this._serverResponse = serverResponse;
        /** @member {Buffer} **/
        this._callbackData = new Buffer(0);
        /** @member {Object} **/
        this._callbackCache = null;
        /** @member {Promise} **/
        this.httpCallbackPromise = new Promise(function (resolve, reject) {
            cbhub._incomingMessage.on('data', function (chunk) {
                cbhub._callbackData = Buffer.concat([cbhub._callbackData, chunk]);
            });
            cbhub._incomingMessage.on('end', function () {
                cbhub._callbackData = new Uint8Array(cbhub._callbackData);
                cbhub._callbackCache = JSON.parse(cbhub._yapi.imm_bin2str(cbhub._callbackData));
                resolve(true);
            });
        });
    }

    /** Test input data for a HTTP callback hub
     *
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(errmsg) {
        var _this145 = this;

        return _asyncToGenerator(function* () {
            yield _this145.httpCallbackPromise;
            if (_this145._incomingMessage.method != 'POST') {
                errmsg.msg = 'HTTP POST expected';
                return YAPI_INVALID_ARGUMENT;
            }
            if (_this145._callbackData.length == 0) {
                errmsg.msg = 'Empty POST body';
                return YAPI_NO_MORE_DATA;
            }
            if (_this145.urlInfo.pass != '') {
                // callback data signed, verify signature
                if (!_this145._callbackCache.sign) {
                    errmsg.msg = 'missing signature from incoming YoctoHub (callback password required)';
                    _this145._callbackCache = [];
                    return YAPI_NO_MORE_DATA;
                }
                let sign = _this145._callbackCache['sign'];
                let pass = _this145.urlInfo.pass;
                let salt;
                if (pass.length == 32) {
                    salt = _this145._yapi.imm_str2bin(pass.toLowerCase());
                } else {
                    salt = _this145._yapi.imm_str2bin(_this145.crypto.createHash('md5').update(pass).digest('hex'));
                }
                let patched = _this145._yapi.imm_bin2str(_this145._callbackData).replace(sign, salt);
                let check = _this145.crypto.createHash('md5').update(patched).digest('hex');
                if (check.toLowerCase() != sign.toLowerCase()) {
                    //console.log('Computed signature: '+ check);
                    //console.log('Received signature: '+ sign);
                    errmsg.msg = 'invalid signature from incoming YoctoHub (invalid callback password)';
                    _this145._callbackCache = [];
                    return YAPI_UNAUTHORIZED;
                }
            }
            return YAPI_SUCCESS;
        })();
    }

    /** Perform an HTTP query on the hub
     *
     * @param str_method {string}
     * @param baseUrl {string}
     * @param devUrl {string}
     * @param obj_body {Uint8Array}
     * @returns {YHTTPRequest}
     */
    request(str_method, baseUrl, devUrl, obj_body) {
        var _this146 = this;

        return _asyncToGenerator(function* () {
            let yreq = new YHTTPRequest(null);
            if (str_method == 'POST' && obj_body.length > 2) {
                var boundary = '???';
                for (var endb = 0; endb < obj_body.length; endb++) {
                    if (obj_body[endb] == 13) break;
                }

                if (endb > 2 && endb < 20 && obj_body[0] == 45 && obj_body[1] == 45) {
                    boundary = _this146._yapi.imm_bin2str(obj_body.subarray(2, endb));
                }
                _this146._serverResponse.write('\n@YoctoAPI:' + str_method + ' ' + devUrl + ' ' + obj_body.length + ':' + boundary + '\n');
                _this146._serverResponse.write(obj_body);
            } else if (str_method == 'GET') {
                var jzon = devUrl.indexOf('?fw=');
                if (jzon != -1 && devUrl.indexOf('&', jzon) == -1) {
                    devUrl = devUrl.slice(0, jzon);
                }
                if (devUrl.indexOf('?') == -1 || devUrl.indexOf('/logs.txt') != -1 || devUrl.indexOf('/logger.json') != -1 || devUrl.indexOf('/ping.txt') != -1 || devUrl.indexOf('/files.json?a=dir') != -1) {
                    // read request, load from cache
                    var subfun = /\/api\/([a-z][A-Za-z0-9]*)[.]json$/.exec(devUrl);
                    if (subfun) {
                        devUrl = devUrl.slice(0, subfun.index) + '/api.json';
                    }
                    if (!_this146._callbackCache[devUrl]) {
                        _this146._serverResponse.write('\n!YoctoAPI:' + devUrl + ' is not preloaded, adding to list');
                        _this146._serverResponse.write('\n@YoctoAPI:+' + devUrl + '\n');
                        yreq.errorType = YAPI_NO_MORE_DATA;
                        yreq.errorMsg = 'URL ' + devUrl + ' not preloaded, adding to list';
                    } else {
                        var jsonres = _this146._callbackCache[devUrl];
                        if (subfun) {
                            jsonres = jsonres[subfun[1]];
                        }
                        yreq.bin_result = _this146._yapi.imm_str2bin(JSON.stringify(jsonres));
                    }
                } else {
                    // change request, print to output stream
                    _this146._serverResponse.write('\n@YoctoAPI:' + str_method + ' ' + devUrl + '\n');
                    yreq.bin_result = new Uint8Array(0);
                }
            } else {
                yreq.errorType = YAPI_NOT_SUPPORTED;
                yreq.errorMsg = 'Unsupported HTTP method';
            }
            return yreq;
        })();
    }
}

exports.YHttpCallbackHub = YHttpCallbackHub;
class YWebSocketHub extends YGenericHub {
    constructor(obj_yapi, var_urlInfo) {
        super(obj_yapi, var_urlInfo);
        /** @member {WebSocket} **/
        this.websocket = null;
        /** @member {Promise} **/
        this.websocketOpenPromise = null;
        /** @member {YHTTPRequest[]} **/
        this.tcpChan = [];
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url) {
        this.websocket = new WebSocket(str_url);
        this.websocket.binaryType = 'arraybuffer';
    }

    /** Handle websocket-based event-monitoring work on a registered hub
     *
     * @param errmsg {YErrorMsg}
     * @returns {number}
     */
    testHub(errmsg) {
        var _this147 = this;

        return _asyncToGenerator(function* () {
            if (_this147.disconnecting) {
                return YAPI_IO_ERROR;
            }
            // Open WebSocket connection
            _this147.imm_webSocketOpen(_this147.urlInfo.url + 'not.byn');
            _this147.websocketOpenPromise = new Promise(function (resolve, reject) {
                _this147.websocket.onmessage = function (evt) {
                    resolve(YAPI_SUCCESS);
                    _this147._webSocketMsg(new Uint8Array(evt.data));
                };
            });
            _this147.websocket.onclose = function (evt) {
                _this147.websocket = null;
                if (_this147.disconnecting) {
                    return;
                }
                // connection error
                if (_this147.retryDelay < 15000) _this147.retryDelay *= 2;
                _this147.devListValidity = 500;
                _this147.devListExpires = 0;
                setTimeout(function () {
                    _this147.testHub(new YErrorMsg());
                }, _this147.retryDelay);
            };
            _this147.websocket.onerror = function (evt) {
                console.log('WebSocket error: ', evt);
                _this147.websocket = null;
                if (_this147.disconnecting) {
                    return;
                }
                // connection error
                if (_this147.retryDelay < 15000) _this147.retryDelay *= 2;
                _this147.devListValidity = 500;
                _this147.devListExpires = 0;
                setTimeout(function () {
                    _this147.testHub(new YErrorMsg());
                }, _this147.retryDelay);
            };
            return yield _this147.websocketOpenPromise;
        })();
    }

    /** Handle an incoming packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    _webSocketMsg(arr_bytes) {
        var _this148 = this;

        return _asyncToGenerator(function* () {
            var text = '';
            if (arr_bytes[0] == 8 * 8) {
                // YSTREAM_TCP_NOTIF
                for (let i = 1; i < arr_bytes.length; i++) {
                    text += String.fromCharCode(arr_bytes[i]);
                }
                yield _this148._yapi.parseEvents(_this148, text);
                return;
            }
            // Other types of messages
            var ws = _this148.websocket;
            var ystream = arr_bytes[0] >> 3;
            var tcpchan = arr_bytes[0] & 7;
            if (ystream == 1 || ystream == 2) {
                // YSTREAM_TCP or YSTREAM_TCP_CLOSE
                if (!_this148.tcpChan[tcpchan]) {
                    console.log('WS: Drop frame for closed tcpChan ' + tcpchan);
                    return;
                }
                let oldArr = _this148.tcpChan[tcpchan].bin_result;
                let newArr = new Uint8Array(oldArr.length + arr_bytes.length - 1);
                newArr.set(oldArr, 0);
                newArr.set(arr_bytes.subarray(1), oldArr.length);
                _this148.tcpChan[tcpchan].bin_result = newArr;
                if (ystream == 2) {
                    // YSTREAM_TCP_CLOSE
                    // send YSTREAM_TCP_CLOSE
                    let frame = new Uint8Array(1);
                    frame[0] = 8 * 2 + tcpchan;
                    _this148.websocket.send(frame);
                    // free tcp channel
                    let yreq = _this148.tcpChan[tcpchan];
                    _this148.tcpChan[tcpchan] = null;
                    // process incoming reply
                    let pos = yreq.bin_result.indexOf(13);
                    if (pos < 0) {
                        yreq.errorType = YAPI_IO_ERROR;
                        yreq.errorMsg = 'Bad response header';
                    } else {
                        let header = _this148._yapi.imm_bin2str(yreq.bin_result.subarray(0, pos));
                        let words = header.split(' ');
                        if (words[0] == 'OK') {
                            yreq.errorType = YAPI_SUCCESS;
                            yreq.bin_result = yreq.bin_result.subarray(4);
                        } else if (words[0] == '0K') {
                            yreq.errorType = YAPI_IO_ERROR;
                            yreq.errorMsg = 'Unexpected persistent connection';
                        } else {
                            yreq.errorType = YAPI_IO_ERROR;
                            yreq.errorMsg = 'HTTP error ' + header.slice(words[0].length + 1);
                        }
                    }
                    yreq.acceptor(yreq);
                }
                return;
            }
            console.log('WS: Unsupported message', arr_bytes);
        })();
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes) {
        this.websocket.send(arr_bytes);
    }

    /** Perform an HTTP query on the hub
     *
     * @param method {string}
     * @param baseUrl {string}
     * @param devUrl {string}
     * @param obj_body {Uint8Array}
     * @returns {YHTTPRequest}
     */
    request(method, baseUrl, devUrl, obj_body) {
        var _this149 = this;

        return _asyncToGenerator(function* () {
            let httpPromise = new Promise(function (resolve, reject) {
                var subReq = method + ' ' + devUrl + ' \r\n\r\n';
                var ws = _this149.websocket;
                var tcpchan = 0;

                while (_this149.tcpChan[tcpchan]) {
                    tcpchan++;
                }
                if (tcpchan > 2) {
                    // For now, limit to 2 channels (up to 8 could be possible)
                    console.log('WebSocket: TOO MANY CONCURRENT TCP CHANNELS');
                    return;
                }
                _this149.tcpChan[tcpchan] = new YHTTPRequest(new Uint8Array(0));
                _this149.tcpChan[tcpchan].acceptor = resolve;

                var pos = 0;
                while (pos < subReq.length) {
                    var framelen = 1 + subReq.length - pos;
                    if (framelen > 125) framelen = 125;
                    var datalen = framelen - 1;
                    var i,
                        frame = new Uint8Array(framelen);

                    // use YSTREAM_TCP
                    frame[0] = 8 + tcpchan;
                    for (i = 0; i < datalen; i++) {
                        frame[1 + i] = subReq.charCodeAt(pos + i);
                    }
                    pos += framelen - 1;
                    _this149.imm_webSocketSend(frame);
                    // FIXME: send body as well !
                }
            });
            //noinspection JSValidateTypes
            return httpPromise;
        })();
    }

    disconnect() {
        var _this150 = this;

        return _asyncToGenerator(function* () {
            _this150.imm_commonDisconnect();
            _this150.websocket.close();
        })();
    }
}

exports.YWebSocketHub = YWebSocketHub;
class YWebSocketNodeHub extends YWebSocketHub {
    constructor(obj_yapi, var_urlInfo) {
        super(obj_yapi, var_urlInfo);
        this.wsWebSocket = this._yapi._nodeRequire('ws');
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url) {
        this.websocket = new this.wsWebSocket(this.urlInfo.url + 'not.byn');
    }

    /** Send an outgoing packet
     *
     * @param arr_bytes {Uint8Array}
     **/
    imm_webSocketSend(arr_bytes) {
        this.websocket.send(arr_bytes, { binary: true, mask: false });
    }
}

exports.YWebSocketNodeHub = YWebSocketNodeHub;
class YWebSocketCallbackHub extends YWebSocketNodeHub {
    constructor(obj_yapi, var_urlInfo, ws) {
        super(obj_yapi, var_urlInfo);
        this.websocket = ws;
    }

    /** Open an outgoing websocket
     *
     * @param str_url {string}
     **/
    imm_webSocketOpen(str_url) {
        // nothing to do, the ws is already open !
    }
}

exports.YWebSocketCallbackHub = YWebSocketCallbackHub; //
// YAPI Context
//
// This class provides the high-level entry points to access Functions, stores
// an indexes instances of the Device object and of FunctionType collections.
//

class YAPIContext {
    constructor() {
        //--- (generated code: YFunction return codes)
        this.SUCCESS = 0; // everything worked all right
        this.NOT_INITIALIZED = -1; // call yInitAPI() first !
        this.INVALID_ARGUMENT = -2; // one of the arguments passed to the function is invalid
        this.NOT_SUPPORTED = -3; // the operation attempted is (currently) not supported
        this.DEVICE_NOT_FOUND = -4; // the requested device is not reachable
        this.VERSION_MISMATCH = -5; // the device firmware is incompatible with this API version
        this.DEVICE_BUSY = -6; // the device is busy with another task and cannot answer
        this.TIMEOUT = -7; // the device took too long to provide an answer
        this.IO_ERROR = -8; // there was an I/O problem while talking to the device
        this.NO_MORE_DATA = -9; // there is no more data to read from
        this.EXHAUSTED = -10; // you have run out of a limited resource, check the documentation
        this.DOUBLE_ACCES = -11; // you have two process that try to access to the same device
        this.UNAUTHORIZED = -12; // unauthorized access to password-protected device
        this.RTC_NOT_READY = -13; // real-time clock has not been initialized (or time was lost)
        this.FILE_NOT_FOUND = -14; // the file is not found
        //--- (end of generated code: YFunction return codes)
        this.INVALID_INT = YAPI_INVALID_INT;
        this.INVALID_UINT = YAPI_INVALID_UINT;
        this.INVALID_LONG = YAPI_INVALID_LONG;
        this.INVALID_DOUBLE = YAPI_INVALID_DOUBLE;
        this.INVALID_STRING = YAPI_INVALID_STRING;

        // yInitAPI constants (not really useful in JavaScript)
        this.DETECT_NONE = 0;
        this.DETECT_USB = 1;
        this.DETECT_NET = 2;
        this.DETECT_ALL = this.DETECT_USB | this.DETECT_NET;

        // Default string encoding used in the library
        this.defaultEncoding = 'binary';

        // Default cache validity (in [ms]) before reloading data from device. This saves a lots of trafic.
        // Note that a value under 2 ms makes little sense since a USB bus itself has a 2ms roundtrip period
        /** @member {number} **/
        this.defaultCacheValidity = 5;
        // Switch to turn off exceptions and use return codes instead, for source-code compatibility
        // with languages without exception support like C
        /** @member {boolean} **/
        this.exceptionsDisabled = false;

        this.imm_init();

        for (var i = 1; i <= 20; i++) {
            this.RegisterCalibrationHandler(i, this.LinearCalibrationHandler);
        }
        this.RegisterCalibrationHandler(YOCTO_CALIB_TYPE_OFS, this.LinearCalibrationHandler);
    }

    imm_init() {
        /** @member {YGenericHub[]} **/
        this._hubs = []; // array of root urls
        /** @member {Object} **/
        this._devs = {}; // hash table of known devices, by serial number
        /** @member {Object} **/
        this._snByUrl = {}; // serial number for each known device, by URL
        /** @member {Object} **/
        this._snByName = {}; // serial number for each known device, by name
        /** @member {Object} **/
        this._fnByType = {}; // functions by type
        this._fnByType.Module = new YFunctionType(this, 'Module');
        /** @member {number} **/
        this._lastErrorType = YAPI_SUCCESS;
        /** @member {string} **/
        this._lastErrorMsg = 'no error';
        /** @member {boolean} **/
        this._firstArrival = true;
        /** @member {boolean} **/
        this._updateDevListStarted = false;
        /** @member {Object[]} **/
        this._pendingCallbacks = [];
        /** @member {Function} **/
        this._arrivalCallback = null;
        /** @member {Function} **/
        this._namechgCallback = null;
        /** @member {Function} **/
        this._removalCallback = null;
        /** @member {Object[]} **/
        this._data_events = [];
        /** @member {number} **/
        this._forwardValues = 0;
        /** @member {Object} **/
        this._calibHandlers = {};
        /** @member {Object[]} **/
        this._ValueCallbackList = [];
        /** @member {Object[]} **/
        this._TimedReportCallbackList = [];
        /** @member {boolean} **/
        this._isNodeJS = false;
        /** @member {function} **/
        this._nodeRequire = null;
        if (typeof System != 'undefined') {
            // SystemJS detected
            if (System._nodeRequire) {
                this._isNodeJS = true;
                this._nodeRequire = System._nodeRequire;
            }
        } else {
            // Node.js without SystemJS, or running in browserify SFX bundle
            if (typeof require != 'undefined') {
                this._isNodeJS = true;
                this._nodeRequire = require;
            }
        }
    }

    _throw(int_errType, str_errMsg, obj_retVal) {
        this._lastErrorType = int_errType;
        this._lastErrorMsg = str_errMsg;

        if (!this.exceptionsDisabled) {
            // create a well-formed exception object including stack
            try {
                // note: The function Trigger_Yocto_Error below does intentionally not exist !
                //       Its only purpose is to create a valid exception stack frame and
                //       trigger the javascript debugger in the best possible way
                //noinspection JSUnresolvedFunction
                Trigger_Yocto_Error(int_errType, str_errMsg);
            } catch (e) {
                var key,
                    exc = new Error(str_errMsg);
                for (key in e) {
                    if (key != 'name' && key != 'number' && key != 'message') exc[key] = e[key];
                }
                exc['name'] = 'YoctoError';
                exc['message'] = str_errMsg;
                exc['description'] = str_errMsg;
                exc['number'] = int_errType;
                throw exc;
            }
        }
        return obj_retVal;
    }

    // Add a hub object to the list of known hub
    _addHub(newhub) {
        var _this151 = this;

        return _asyncToGenerator(function* () {
            // Add hub to known list
            _this151._hubs.push(newhub);

            // If hub is not yet known, create a device object (synchronous call)
            var serial = _this151._snByUrl[newhub.urlInfo.url];
            if (!serial) {
                let dev = new YDevice(_this151, newhub.urlInfo.url, null, null);
                yield dev.refresh();
            }
        })();
    }

    // Search for an existing a hub object for a given URL
    imm_getHub(str_rootUrl) {
        var i, hubUrl;

        for (i = 0; i < this._hubs.length; i++) {
            hubUrl = this._hubs[i].urlInfo.url;
            if (str_rootUrl.slice(0, hubUrl.length) == hubUrl) {
                return this._hubs[i];
            }
        }
        return null;
    }

    // Trigger an update of connected devices by querying all hubs
    _updateDeviceList_internal(bool_forceupdate, bool_invokecallbacks) {
        var _this152 = this;

        return _asyncToGenerator(function* () {
            if (_this152._firstArrival && bool_invokecallbacks && _this152._arrivalCallback) {
                bool_forceupdate = true;
            }
            if (bool_forceupdate) {
                for (let i = 0; i < _this152._hubs.length; i++) {
                    _this152._hubs[i].imm_forceUpdate();
                }
            }
            if (_this152._updateDevListStarted && _this152.GetTickCount() - _this152._updateDevListStarted < 30 * 1000) {
                return {
                    errorType: YAPI_SUCCESS,
                    errorMsg: 'no error',
                    result: YAPI_SUCCESS
                };
            }

            try {
                // mark updateDeviceList in progress to avoid concurrent asynchronous runs
                _this152._updateDevListStarted = _this152.GetTickCount();

                // collect list of hubs which should be checked
                let hubs = [];
                for (let i = 0; i < _this152._hubs.length; i++) {
                    let hub = _this152._hubs[i];
                    let rootUrl = hub.urlInfo.url;
                    let hubDev = _this152.imm_getDevice(rootUrl);
                    if (!hubDev) continue;
                    if (hub.devListExpires <= _this152.GetTickCount()) {
                        hub.missing = [];
                        hubs.push(hub);
                    }
                }

                // assume all device are unplugged, unless proved wrong
                for (let serial in _this152._devs) {
                    let rooturl = _this152._devs[serial].imm_getRootUrl();
                    for (let i = 0; i < hubs.length; i++) {
                        let huburl = hubs[i].urlInfo.url;
                        if (rooturl.substr(0, huburl.length) == huburl) {
                            hubs[i].missing[serial] = true;
                        }
                    }
                }

                // Rescan all hubs and update list of online devices
                yield Promise.all(Array.from(hubs, function (hub) {
                    return hub.hubUpdateDeviceList();
                }));

                // after processing all hubs, invoke pending callbacks if required
                if (bool_invokecallbacks) {
                    let nbEvents = _this152._pendingCallbacks.length;
                    for (let i = 0; i < nbEvents; i++) {
                        let evt = _this152._pendingCallbacks[i];
                        let serial = evt.slice(1);
                        switch (evt.charAt(0)) {
                            case '+':
                                if (_this152._arrivalCallback != undefined) {
                                    yield _this152._arrivalCallback(yFindModule(serial + '.module'));
                                }
                                break;
                            case '/':
                                if (_this152._namechgCallback != undefined) {
                                    yield _this152._namechgCallback(yFindModule(serial + '.module'));
                                }
                                break;
                            case '-':
                                if (_this152._removalCallback != undefined) {
                                    yield _this152._removalCallback(yFindModule(serial + '.module'));
                                }
                                _this152.imm_forgetDevice(_this152._devs[serial]);
                                break;
                        }
                    }
                    _this152._pendingCallbacks = _this152._pendingCallbacks.slice(nbEvents);
                    if (_this152._arrivalCallback != undefined && _this152._firstArrival) {
                        _this152._firstArrival = false;
                    }
                }
            } finally {
                _this152._updateDevListStarted = false;
            }

            return {
                errorType: YAPI_SUCCESS,
                errorMsg: 'no error',
                result: YAPI_SUCCESS
            };
        })();
    }

    // process a hub white-pages/yellow-pages records to update the device data
    updateDeviceList_process(hub, hubDev, whitePages, yellowPages) {
        var _this153 = this;

        return _asyncToGenerator(function* () {
            // Reindex all functions from yellow pages
            let refresh = {};
            let serial = null;
            for (let classname in yellowPages) {
                let obj_yprecs = yellowPages[classname];
                let ftype = _this153._fnByType[classname];
                if (ftype == undefined) {
                    ftype = new YFunctionType(_this153, classname);
                    _this153._fnByType[classname] = ftype;
                }
                for (var key in obj_yprecs) {
                    var yprec = obj_yprecs[key];
                    var hwid = yprec['hardwareId'];
                    var basetype = yprec['baseType'];
                    if (ftype.imm_reindexFunction(hwid, yprec['logicalName'], yprec['advertisedValue'], basetype)) {
                        // logical name discrepency detected, force a refresh from device
                        serial = hwid.substr(0, hwid.indexOf('.'));
                        refresh[serial] = true;
                    }
                }
            }
            // Reindex all devices from white pages
            for (let devkey in whitePages) {
                var devinfo = whitePages[devkey];
                serial = devinfo['serialNumber'];
                var devydx = devinfo['index'];
                var rooturl = devinfo.networkUrl.slice(0, -3);
                if (rooturl.charAt(0) == '/') rooturl = hubDev.imm_getRootUrl() + rooturl.substr(1);
                var currdev = _this153._devs[serial];
                if (currdev && _this153._arrivalCallback != undefined && _this153._firstArrival) {
                    _this153._pendingCallbacks.push('+' + serial);
                }
                hub.serialByYdx[devydx] = serial;
                if (!currdev) {
                    // Add new device
                    //noinspection ObjectAllocationIgnored
                    new YDevice(_this153, rooturl, devinfo, yellowPages);
                    if (_this153._arrivalCallback != undefined) {
                        _this153._pendingCallbacks.push('+' + serial);
                    }
                } else if (currdev.imm_getLogicalName() != devinfo['logicalName']) {
                    // Reindex device from its own data
                    yield currdev.refresh();
                    if (_this153._namechgCallback != undefined) {
                        _this153._pendingCallbacks.push('/' + serial);
                    }
                } else if (refresh[serial] || currdev.imm_getRootUrl() != rooturl || currdev.imm_getBeacon() != devinfo['beacon']) {
                    // Reindex device from its own data in case of discrepency
                    yield currdev.refresh();
                }
                hub.missing[serial] = false;
            }

            // Keep track of all unplugged devices on this hub
            for (serial in hub.missing) {
                if (hub.missing[serial]) {
                    if (_this153._removalCallback != undefined) {
                        _this153._pendingCallbacks.push('-' + serial);
                    } else {
                        _this153.imm_forgetDevice(_this153._devs[serial]);
                    }
                }
            }

            return YAPI_SUCCESS;
        })();
    }

    /** process event data produced by a hub
     *
     * @param hub {Object}
     * @param str_lines {string}
     */
    parseEvents(hub, str_lines) {
        var _this154 = this;

        return _asyncToGenerator(function* () {
            hub.devListValidity = 10000; // 10s validity when notification are working properly

            var rows = str_lines.split('\n');
            var nrows = rows.length;
            var value;
            // in continuous mode, last line is either empty or a partial event
            nrows--;
            for (var idx = 0; idx < nrows; idx++) {
                var ev = rows[idx];
                if (ev.length == 0) continue;
                var firstCode = ev.charAt(0);
                if (ev.length >= 3 && firstCode >= NOTIFY_NETPKT_FLUSHV2YDX && firstCode <= NOTIFY_NETPKT_TIMEAVGYDX) {
                    hub.retryDelay = 15;
                    if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                    var devydx = ev.charCodeAt(1) - 65; // from 'A'
                    var funydx = ev.charCodeAt(2) - 48; // from '0'
                    if (funydx >= 64) {
                        // high bit of devydx is on second character
                        funydx -= 64;
                        devydx += 128;
                    }
                    var serial = hub.serialByYdx[devydx];
                    if (serial && _this154._devs[serial]) {
                        var funcid = funydx == 0xf ? 'time' : _this154._devs[serial].imm_functionId(funydx);
                        if (funcid != '') {
                            value = ev.slice(3);
                            switch (firstCode) {
                                case NOTIFY_NETPKT_FUNCVALYDX:
                                    if (value != '') value = value.split('\0')[0];
                                    // function value ydx (tiny notification)
                                    _this154.imm_setFunctionValue(serial + '.' + funcid, value);
                                    break;
                                case NOTIFY_NETPKT_DEVLOGYDX:
                                    // log notification
                                    break;
                                case NOTIFY_NETPKT_TIMEVALYDX:
                                case NOTIFY_NETPKT_TIMEAVGYDX:
                                case NOTIFY_NETPKT_TIMEV2YDX:

                                    // timed value report
                                    var pos,
                                        arr = [firstCode == 'x' ? 0 : firstCode == 'z' ? 1 : 2];
                                    for (pos = 0; pos < value.length; pos += 2) {
                                        arr.push(parseInt(value.substr(pos, 2), 16));
                                    }
                                    var dev = _this154._devs[serial];
                                    if (funcid == 'time') {
                                        var time = arr[1] + 0x100 * arr[2] + 0x10000 * arr[3] + 0x1000000 * arr[4];
                                        dev.imm_setDeviceTime(time + arr[5] / 250.0);
                                    } else {
                                        _this154.imm_setTimedReport(serial + '.' + funcid, dev.imm_getDeviceTime(), arr);
                                    }
                                    break;
                                case NOTIFY_NETPKT_FUNCV2YDX:
                                    var rawval = _this154.imm_decodeNetFuncValV2(value);
                                    if (rawval != null) {
                                        var decodedval = _this154.imm_decodePubVal(rawval[0], rawval, 1, 6);
                                        _this154.imm_setFunctionValue(serial + '.' + funcid, decodedval);
                                    }
                                    break;
                                case NOTIFY_NETPKT_FLUSHV2YDX:
                                // To be implemented later
                                default:
                                    break;
                            }
                        }
                    }
                } else if (ev.length > 5 && ev.substr(0, 4) == 'YN01') {
                    hub.retryDelay = 15;
                    if (hub.notifPos >= 0) hub.notifPos += ev.length + 1;
                    var notype = ev.substr(4, 1);
                    if (notype == '@') {
                        hub.notifPos = parseInt(ev.slice(5));
                    } else switch (parseInt(notype)) {
                        case 0: // device name change, or arrival
                        case 2: // device plug/unplug
                        case 4: // function name change
                        case 8:
                            // function name change (ydx)
                            hub.devListExpires = 0;
                            break;
                        case 5:
                            // function value (long notification)
                            var parts = ev.slice(5).split(',');
                            if (parts.length > 2) {
                                value = parts[2].split('\0');
                                _this154.imm_setFunctionValue(parts[0] + '.' + parts[1], value[0]);
                            }
                            break;
                    }
                } else {
                    // oops, bad notification ? be safe until a good one comes
                    hub.devListValidity = 500;
                    hub.devListExpires = 0;
                    //alert('bad event on line '+idx+'/'+nrows+' : '+ev);
                    hub.notifPos = -1;
                }
                hub.currPos += ev.length + 1;
            }
            if (_this154._forwardValues > 0) {
                yield _this154.HandleEvents(new YErrorMsg());
            }
        })();
    }

    /** Network notification format: 7x7bit (mapped to 7 chars in range 32..159)
     *                               used to represent 1 flag (RAW6BYTES) + 6 bytes
     * INPUT:  [R765432][1076543][2107654][3210765][4321076][5432107][6543210]
     * OUTPUT: 7 bytes array (1 byte for the funcint_TypeV2 and 6 bytes of USB like data
     *                     funcTypeV2 + [R][-byte 0][-byte 1-][-byte 2-][-byte 3-][-byte 4-][-byte 5-]
     *
     * @return {number[]}
     */
    imm_decodeNetFuncValV2(p) {
        var p_ofs = 0;
        var ch = p.charCodeAt(p_ofs) & 0xff;
        var len = 0;
        var funcVal = [0, 0, 0, 0, 0, 0, 0];

        if (ch < 32 || ch > 32 + 127) {
            return null;
        }
        // get the 7 first bits
        ch -= 32;
        funcVal[0] = (ch & 0x40) != 0 ? NOTIFY_V2_6RAWBYTES : NOTIFY_V2_TYPEDDATA;
        // clear flag
        ch &= 0x3f;
        while (len < YOCTO_PUBVAL_SIZE) {
            p_ofs++;
            if (p_ofs >= p.length) break;
            var newCh = p.charCodeAt(p_ofs) & 0xff;
            if (newCh == NOTIFY_NETPKT_STOP) {
                break;
            }
            if (newCh < 32 || newCh > 32 + 127) {
                return null;
            }
            newCh -= 32;
            ch = (ch << 7) + newCh;
            funcVal[len + 1] = ch >> 5 - len & 0xff;
            len++;
        }
        return funcVal;
    }

    /** Decode an enhanced notification (V2) buffer
     *
     * @param int_typeV2 {number}
     * @param arr_funcval {number[]}
     * @param int_ofs {number}
     * @param int_funcvalen {number}
     * @returns {string}
     */
    imm_decodePubVal(int_typeV2, arr_funcval, int_ofs, int_funcvalen) {
        var buffer = '';
        var endp;
        if (int_typeV2 == NOTIFY_V2_6RAWBYTES || int_typeV2 == NOTIFY_V2_TYPEDDATA) {
            var funcValType;
            if (int_typeV2 == NOTIFY_V2_6RAWBYTES) {
                funcValType = PUBVAL_6RAWBYTES;
            } else {
                funcValType = arr_funcval[int_ofs++];
            }
            switch (funcValType) {
                case PUBVAL_LEGACY:
                    // fallback to legacy handling, just in case
                    break;
                case PUBVAL_1RAWBYTE:
                case PUBVAL_2RAWBYTES:
                case PUBVAL_3RAWBYTES:
                case PUBVAL_4RAWBYTES:
                case PUBVAL_5RAWBYTES:
                case PUBVAL_6RAWBYTES:
                    // 1..5 hex bytes
                    for (var i = 0; i < funcValType; i++) {
                        var c = arr_funcval[int_ofs++];
                        var b = c >> 4;
                        buffer += b.toString(16);
                        b = c & 0xf;
                        buffer += b.toString(16);
                    }
                    return buffer;
                case PUBVAL_C_LONG:
                case PUBVAL_YOCTO_FLOAT_E3:
                    // 32bit integer in little endian format or Yoctopuce 10-3 format
                    var numVal = arr_funcval[int_ofs++];
                    numVal += arr_funcval[int_ofs++] << 8;
                    numVal += arr_funcval[int_ofs++] << 16;
                    numVal += arr_funcval[int_ofs++] << 24;
                    if (funcValType == PUBVAL_C_LONG) {
                        return String(Math.round(numVal));
                    } else {
                        buffer = String(Math.round(numVal * 1000) / 1000000.0);
                        endp = buffer.length;
                        while (endp > 0 && buffer[endp - 1] == '0') {
                            --endp;
                        }
                        if (endp > 0 && buffer[endp - 1] == '.') {
                            --endp;
                            buffer = buffer.substr(0, endp);
                        }
                        return buffer;
                    }
                case PUBVAL_C_FLOAT:
                    // 32bit (short) float
                    var v = arr_funcval[int_ofs++];
                    v += arr_funcval[int_ofs++] << 8;
                    v += arr_funcval[int_ofs++] << 16;
                    v += arr_funcval[int_ofs++] << 24;
                    var fraction = (v & (1 << 23) - 1) + (1 << 23) * (v >> 31 | 1);
                    var exp = (v >> 23 & 0xFF) - 127;
                    var floatVal = fraction * Math.pow(2, exp - 23);
                    buffer = String(Math.round(floatVal * 1000000) / 1000000);
                    endp = buffer.length;
                    while (endp > 0 && buffer[endp - 1] == '0') {
                        --endp;
                    }
                    if (endp > 0 && buffer[endp - 1] == '.') {
                        --endp;
                        buffer = buffer.substr(0, endp);
                    }
                    return buffer;
                default:
                    return '?';
            }

            // Legacy handling: just pad with NUL up to 7 chars
            var len = 0;
            buffer = '';
            while (len < YOCTO_PUBVAL_SIZE && len < int_funcvalen) {
                if (arr_funcval[len] == 0) break;
                buffer += String.fromCharCode(arr_funcval[len]);
                len++;
            }
        }
        return buffer;
    }

    imm_decExp(int_pow) {
        const arr = [1.0e-6, 1.0e-5, 1.0e-4, 1.0e-3, 1.0e-2, 1.0e-1, 1.0, 1.0e1, 1.0e2, 1.0e3, 1.0e4, 1.0e5, 1.0e6, 1.0e7, 1.0e8, 1.0e9];
        return arr[int_pow];
    }

    // Convert Yoctopuce 16-bit decimal floats to standard double-precision floats
    //
    imm_decimalToDouble(val) {
        var negate = false;
        var res;
        var mantis = val & 2047;
        if (mantis == 0) return 0.0;
        if (val > 32767) {
            negate = true;
            val = 65536 - val;
        } else if (val < 0) {
            negate = true;
            val = -val;
        }
        var decexp = this.imm_decExp(val >> 11);
        if (decexp >= 1.0) {
            res = mantis * decexp;
        } else {
            // fix rounding issue
            res = mantis / Math.round(1 / decexp);
        }

        return negate ? -res : res;
    }

    // Convert standard double-precision floats to Yoctopuce 16-bit decimal floats
    //
    imm_doubleToDecimal(val) {
        var negate = false;
        var comp, mant;
        var decpow;
        var res;

        if (val == 0.0) {
            return 0;
        }
        if (val < 0) {
            negate = true;
            val = -val;
        }
        comp = val / 1999.0;
        decpow = 0;
        while (comp > this.imm_decExp(decpow) && decpow < 15) {
            decpow++;
        }
        mant = val / this.imm_decExp(decpow);
        if (decpow == 15 && mant > 2047.0) {
            res = (15 << 11) + 2047; // overflow
        } else {
                res = (decpow << 11) + Math.round(mant);
            }
        return negate ? -res : res;
    }

    imm_getCalibrationHandler(calibType) {
        return this._calibHandlers[calibType];
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compression
    imm_decodeWords(data) {
        var udata = [];
        for (var i = 0; i < data.length;) {
            var c = data[i];
            if (c == '*') {
                val = 0;
                i++;
            } else if (c == 'X') {
                val = 0xffff;
                i++;
            } else if (c == 'Y') {
                val = 0x7fff;
                i++;
            } else if (c >= 'a') {
                var srcpos = udata.length - 1 - (data.charCodeAt(i++) - 97);
                if (srcpos < 0) val = 0;else val = udata[srcpos];
            } else {
                if (i + 3 > data.length) return udata;
                var val = data.charCodeAt(i++) - 48;
                val += data.charCodeAt(i++) - 48 << 5;
                var lastcode = data.charCodeAt(i++);
                if (lastcode == 122) lastcode = 92;
                val += lastcode - 48 << 10;
            }
            udata.push(val);
        }
        return udata;
    }

    // Parse an array of u16 encoded in a base64-like string with memory-based compresssion
    imm_decodeFloats(data) {
        var idata = [];
        var p = 0;
        var datalen = data.length;
        while (p < datalen) {
            var val = 0;
            var sign = 1;
            var dec = 0;
            var decInc = 0;
            var c = data[p++];
            while (c != '-' && (c < '0' || c > '9')) {
                if (p >= datalen) {
                    return idata;
                }
                c = data[p++];
            }
            if (c == '-') {
                if (p >= datalen) {
                    return idata;
                }
                sign = -sign;
                c = data[p++];
            }
            while (c >= '0' && c <= '9' || c == '.') {
                if (c == '.') {
                    decInc = 1;
                } else if (dec < 3) {
                    val = val * 10 + (c.charCodeAt(0) - 48);
                    dec += decInc;
                }
                if (p < datalen) {
                    c = data[p++];
                } else {
                    c = '\0';
                }
            }
            if (dec < 3) {
                if (dec == 0) val *= 1000;else if (dec == 1) val *= 100;else val *= 10;
            }
            idata.push(sign * val);
        }
        return idata;
    }

    /** Convert a numeric string to an integer
     *
     * @param str_data {string}
     * @return {number}
     */
    imm_atoi(str_data) {
        var num = parseInt(str_data);
        if (isNaN(num)) {
            return 0;
        }
        return Math.floor(num);
    }

    /** Convert a binary object to string
     *
     * @param bin_data {Uint8Array|Buffer}
     * @return {string}
     */
    imm_bin2str(bin_data) {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for (let i = 0; i < len; i += 20) {
            let subdata = bin_data.subarray(i, Math.min(i + 20, len));
            res += String.fromCharCode.apply(null, subdata);
        }
        return res;
    }

    /** Convert a string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_str2bin(str_data) {
        /** @type {number} **/
        let len = str_data.length;
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            res[i] = str_data.charCodeAt(i);
        }
        return res;
    }

    /** Convert a binary object to hex string
     *
     * @param bin_data {Uint8Array}
     * @return {string}
     */
    imm_bin2hexstr(bin_data) {
        /** @type {number} **/
        let len = bin_data.length;
        /** @type {string} **/
        let res = '';
        for (let i = 0; i < len; i++) {
            let n = bin_data[i].toString(16);
            res += n.length < 2 ? '0' + n : n;
        }
        return res.toUpperCase();
    }

    /** Convert a hex string to binary object
     *
     * @param str_data {string}
     * @return {Uint8Array}
     */
    imm_hexstr2bin(str_data) {
        /** @type {number} **/
        let len = str_data.length >> 1;
        /** @type {Uint8Array} **/
        let res = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            res[i] = parseInt(str_data.substr(2 * i, 2), 16);
        }
        return res;
    }

    /** Return a Device object for a specified URL, serial number or logical device name
     *
     * @param str_device {string}
     * @return {YDevice}
     *
     * This function will not cause any network access (not async !)
     */
    imm_getDevice(str_device) {
        var dev = null;
        var serial;

        if (str_device.substr(0, 7) == 'http://' || str_device.substr(0, 5) == 'ws://') {
            // lookup by url
            serial = this._snByUrl[str_device];
            if (serial != undefined) dev = this._devs[serial];
        } else {
            // lookup by serial
            if (this._devs[str_device]) {
                dev = this._devs[str_device];
            } else {
                // fallback to lookup by logical name
                serial = this._snByName[str_device];
                if (serial) {
                    dev = this._devs[serial];
                }
            }
        }
        return dev;
    }

    /** Add or remove a value change callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    _UpdateValueCallbackList(obj_func, bool_add) {
        var _this155 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let index = _this155._ValueCallbackList.indexOf(obj_func);
            if (bool_add) {
                yield obj_func.isOnline();
                if (index < 0) {
                    _this155._ValueCallbackList.push(obj_func);
                }
            } else if (index >= 0) {
                _this155._ValueCallbackList.splice(index, 1);
            }
        })();
    }

    /** Add or remove a timed report callback
     *
     * @param obj_func {YFunction}
     * @param bool_add {Boolean}
     */
    _UpdateTimedReportCallbackList(obj_func, bool_add) {
        var _this156 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let index = _this156._TimedReportCallbackList.indexOf(obj_func);
            if (bool_add) {
                yield obj_func.isOnline();
                if (index < 0) {
                    _this156._TimedReportCallbackList.push(obj_func);
                }
            } else if (index >= 0) {
                _this156._TimedReportCallbackList.splice(index, 1);
            }
        })();
    }

    // Return the class name for a given function ID or full Hardware Id
    // Also make sure that the function type is registered in the API
    imm_functionClass(str_funcid) {
        var dotpos = str_funcid.indexOf('.');
        if (dotpos >= 0) str_funcid = str_funcid.substr(dotpos + 1);
        var classlen = str_funcid.length;
        while (str_funcid.substr(classlen - 1, 1) <= '9') classlen--;
        var classname = str_funcid.substr(0, 1).toUpperCase() + str_funcid.substr(1, classlen - 1);
        if (this._fnByType[classname] == undefined) this._fnByType[classname] = new YFunctionType(this, classname);

        return classname;
    }

    // Reindex a device in YAPI after a name change detected by device refresh
    imm_reindexDevice(obj_dev) {
        var rootUrl = obj_dev.imm_getRootUrl();
        var serial = obj_dev.imm_getSerialNumber();
        var lname = obj_dev.imm_getLogicalName();
        this._devs[serial] = obj_dev;
        this._snByUrl[rootUrl] = serial;
        if (lname != '') this._snByName[lname] = serial;
        this._fnByType['Module'].imm_reindexFunction(serial + '.module', lname, null, null);
        var i,
            count = obj_dev.imm_functionCount();
        for (i = 0; i < count; i++) {
            var funcid = obj_dev.imm_functionId(i);
            var funcname = obj_dev.imm_functionName(i);
            var classname = this.imm_functionClass(funcid);
            this._fnByType[classname].imm_reindexFunction(serial + '.' + funcid, funcname, null, null);
        }
    }

    // Remove a device from YAPI after an unplug detected by device refresh
    imm_forgetDevice(obj_dev) {
        var rootUrl = obj_dev.imm_getRootUrl();
        var serial = obj_dev.imm_getSerialNumber();
        var lname = obj_dev.imm_getLogicalName();
        delete this._devs[serial];
        delete this._snByUrl[rootUrl];
        if (this._snByName[lname] == serial) {
            delete this._snByName[lname];
        }
        this._fnByType['Module'].imm_forgetFunction(serial + '.module');
        var i,
            count = obj_dev.imm_functionCount();
        for (i = 0; i < count; i++) {
            var funcid = obj_dev.imm_functionId(i);
            var classname = this.imm_functionClass(funcid);
            this._fnByType[classname].imm_forgetFunction(serial + '.' + funcid);
        }
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_resolveFunction(str_className, str_func) {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined) this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_resolve(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_getBaseType() == baseType) {
                res = this._fnByType[str_className].imm_resolve(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return { errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No ' + str_className + ' [' + str_func + '] found (old firmware?)',
            result: null };
    }

    // Find the best known identifier (hardware Id) for a given function
    imm_getFriendlyNameFunction(str_className, str_func) {
        if (Y_BASETYPES[str_className] == undefined) {
            // using a regular function type
            if (this._fnByType[str_className] == undefined) this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_getFriendlyName(str_func);
        }
        // using an abstract baseType
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_getBaseType() == baseType) {
                res = this._fnByType[str_className].imm_getFriendlyName(str_func);
                if (res.errorType == YAPI_SUCCESS) return res;
            }
        }
        return { errorType: YAPI_DEVICE_NOT_FOUND,
            errorMsg: 'No ' + str_className + ' [' + str_func + '] found (old firmware?)',
            result: null };
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_setFunction(str_className, str_func, obj_func) {
        if (this._fnByType[str_className] == undefined) this._fnByType[str_className] = new YFunctionType(this, str_className);
        return this._fnByType[str_className].imm_setFunction(str_func, obj_func);
    }

    // Retrieve a function object by hardware id, updating the indexes on the fly if needed
    imm_getFunction(str_className, str_func) {
        if (this._fnByType[str_className] == undefined) this._fnByType[str_className] = new YFunctionType(this, str_className);
        return this._fnByType[str_className].imm_getFunction(str_func);
    }

    // Set a function advertised value by hardware id
    imm_setFunctionValue(str_hwid, str_pubval) {
        let classname = this.imm_functionClass(str_hwid);
        if (this._fnByType[classname].imm_setFunctionValue(str_hwid, str_pubval)) {
            let receivers = this._ValueCallbackList;
            for (let i = 0; i < receivers.length; i++) {
                let fun = receivers[i];
                if (!fun._hwId) continue;
                if (fun._hwId == str_hwid) {
                    this._data_events.push([fun, str_pubval]);
                }
            }
        }
    }

    // Set add a timed value report for a function
    imm_setTimedReport(str_hwid, float_timestamp, arr_report) {
        let classname = this.imm_functionClass(str_hwid);
        let receivers = this._TimedReportCallbackList;
        for (let i = 0; i < receivers.length; i++) {
            let fun = receivers[i];
            if (!fun._hwId) continue;
            if (fun._hwId == str_hwid) {
                this._data_events.push([fun, float_timestamp, arr_report]);
            }
        }
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionValue(str_hwid) {
        var classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getFunctionValue(str_hwid);
    }

    // Retrieve a function advertised value by hardware id
    imm_getFunctionBaseType(str_hwid) {
        var classname = this.imm_functionClass(str_hwid);
        return this._fnByType[classname].imm_getBaseType();
    }

    // Find the hardwareId for the first instance of a given function class
    imm_getFirstHardwareId(str_className) {
        if (Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            if (this._fnByType[str_className] == undefined) this._fnByType[str_className] = new YFunctionType(this, str_className);
            return this._fnByType[str_className].imm_getFirstHardwareId();
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var res;
        for (str_className in this._fnByType) {
            if (this._fnByType[str_className].imm_getBaseType() == baseType) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res != undefined) return res;
            }
        }
        return null;
    }

    // Find the hardwareId for the next instance of a given function class
    imm_getNextHardwareId(str_className, str_hwid) {
        if (Y_BASETYPES[str_className] == undefined) {
            // enumeration of a regular function type
            return this._fnByType[str_className].imm_getNextHardwareId(str_hwid);
        }
        // enumeration of an abstract class
        var baseType = Y_BASETYPES[str_className];
        var prevclass = this.imm_functionClass(str_hwid);
        var res = this._fnByType[prevclass].imm_getNextHardwareId(str_hwid);
        if (res != undefined) return res;
        for (str_className in this._fnByType) {
            if (prevclass != '') {
                if (str_className != prevclass) continue;
                prevclass = '';
                continue;
            }
            if (this._fnByType[str_className].imm_getBaseType() == baseType) {
                res = this._fnByType[str_className].imm_getFirstHardwareId();
                if (res != undefined) return res;
            }
        }
        return null;
    }

    /** Perform an HTTP request on a device, by URL or identifier.
     * When loading the REST API from a device by identifier, the device cache will be used.
     *
     * @param str_device {string}
     * @param str_request {string}
     * @param obj_body {Uint8Array|string}
     * @returns {YHTTPRequest}
     */
    devRequest(str_device, str_request) {
        var _this157 = this;

        let obj_body = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
        return _asyncToGenerator(function* () {
            /** @type {string[]} **/
            let lines = str_request.split('\n');
            /** @type {YHTTPRequest} **/
            let res = new YHTTPRequest(null);
            /** @type {YDevice} **/
            let lockdev;
            /** @type {string} **/
            let baseUrl;
            if (str_device.substr(0, 7) == 'http://' || str_device.substr(0, 5) == 'ws://') {
                baseUrl = str_device;
                if (baseUrl.slice(-1) != '/') baseUrl = baseUrl + '/';
                if (lines[0].substr(0, 12) != 'GET /not.byn') {
                    /** @type {string} **/
                    let serial = _this157._snByUrl[baseUrl];
                    if (serial) {
                        lockdev = _this157._devs[serial];
                    }
                }
            } else {
                lockdev = _this157.imm_getDevice(str_device);
                if (!lockdev) {
                    res.errorType = YAPI_DEVICE_NOT_FOUND;
                    res.errorMsg = 'Device [' + str_device + '] not online';
                    return res;
                }
                // use the device cache when loading the whole API
                if (lines[0] == 'GET /api.json') {
                    return yield lockdev.requestAPI(_this157.defaultCacheValidity);
                }
                baseUrl = lockdev.imm_getRootUrl();
            }
            // map str_device to a URL
            /** @type {string[]} **/
            let words = lines[0].split(' ');
            if (words.length < 2) {
                res.errorType = YAPI_INVALID_ARGUMENT;
                res.errorMsg = 'Invalid request, not enough words; expected a method name and a URL';
                return res;
            } else if (words.length > 2) {
                res.errorType = YAPI_INVALID_ARGUMENT;
                res.errorMsg = 'Invalid request, too many words; make sure the URL is URI-encoded';
                return res;
            }
            /** @type {YGenericHub} **/
            let hub = _this157.imm_getHub(baseUrl);
            /** @type {string} **/
            let method = words[0];
            /** @type {string} **/
            let devUrl = words[1];
            if (devUrl.substr(0, 1) == '/') devUrl = devUrl.substr(1);
            // keep only root URL in baseUrl, move the rest to devUrl
            let pos = baseUrl.indexOf('//');
            pos = baseUrl.indexOf('/', pos + 3);
            devUrl = baseUrl.slice(pos) + devUrl;
            baseUrl = baseUrl.slice(0, pos);
            if (!obj_body) obj_body = '';

            // queue the call to user callback function in the pending queries promise chain
            let delayedCode = function () {
                return hub.request(method, baseUrl, devUrl, obj_body);
            };
            if (lockdev) {
                let newPromise = lockdev._pendingQueries.then(delayedCode, delayedCode);
                lockdev._pendingQueries = newPromise;
                res = yield newPromise;
            } else {
                res = yield delayedCode();
            }
            return res;
        })();
    }

    /** Locate the device to access a specified function, without causing any I/O
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    imm_funcDev_internal(str_className, str_func) {
        var res = new YFuncRequest(null);
        var resolve = this.imm_resolveFunction(str_className, str_func);
        if (resolve.errorType != YAPI_SUCCESS) {
            res.errorType = resolve.errorType;
            res.errorMsg = resolve.errorMsg;
        } else {
            str_func = resolve.result;
            let dotpos = str_func.indexOf('.');
            let devid = str_func.substr(0, dotpos);
            let funcid = str_func.substr(dotpos + 1);
            let dev = this.imm_getDevice(devid);
            if (dev == null) {
                res.errorType = YAPI_DEVICE_NOT_FOUND;
                res.errorMsg = 'Device [' + devid + '] not found';
            } else {
                res.obj_result = { device: dev, deviceid: devid, functionid: funcid, hwid: str_func };
            }
        }
        return res;
    }

    /** Locate the device to access a specified function. May cause device list update if needed
     *
     * @param str_className {string}
     * @param str_func {string}
     * @returns {YFuncRequest}
     */
    _funcDev(str_className, str_func) {
        var _this158 = this;

        return _asyncToGenerator(function* () {
            var resolve = _this158.imm_funcDev_internal(str_className, str_func);
            if (resolve.errorType == YAPI_SUCCESS) {
                return resolve;
            } else if (resolve.errorType == YAPI_DEVICE_NOT_FOUND && _this158._hubs.length == 0) {
                // when USB is supported, check if no USB device is connected before outputing this message
                resolve.errorMsg = 'Impossible to contact any device because no hub has been registered';
                return resolve;
            }
            var updRes = yield _this158._updateDeviceList_internal(true, false);
            if (updRes.errorType != YAPI_SUCCESS) {
                resolve.errorType = updRes.errorType;
                resolve.errorMsg = updRes.errorMsg;
                return resolve;
            }
            return _this158.imm_funcDev_internal(str_className, str_func);
        })();
    }

    /** Load and parse the REST API for a function given by class name and identifier, possibly applying changes
     * Device cache will be preloaded when loading function 'module' and leveraged for other modules
     *
     * @param str_className {string}
     * @param str_func {string}
     * @param str_extra {string}
     * @param int_msValidity {number}
     * @returns {YFuncRequest}
     */
    funcRequest(str_className, str_func, str_extra) {
        var _this159 = this;

        let int_msValidity = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
        return _asyncToGenerator(function* () {
            /** @type {YFuncRequest} **/
            let funcreq = yield _this159._funcDev(str_className, str_func);
            if (funcreq.errorType != YAPI_SUCCESS) {
                return funcreq;
            }
            let devreq = funcreq.obj_result;
            let loadval = null;
            let yreq;
            if (str_extra == '') {
                // use a cached API string (reload if needed)
                /** @type {YHTTPRequest} **/
                yreq = yield devreq.device.requestAPI(int_msValidity);
                if (yreq != null) {
                    if (yreq.errorType != YAPI_SUCCESS) return yreq;
                    try {
                        let jsonData = JSON.parse(_this159.imm_bin2str(yreq.bin_result));
                        loadval = jsonData[devreq.functionid];
                    } catch (err) {
                        //console.log('RequestAPI parse error: ', err);
                    }
                }
            } else {
                    devreq.device.imm_dropCache();
                }
            if (!loadval) {
                // request specified function only to minimize traffic
                if (str_extra == '') str_extra = '.json';
                let httpreq = 'GET /api/' + devreq.functionid + str_extra;
                /** @type {YHTTPRequest} **/
                yreq = yield _this159.devRequest(devreq.deviceid, httpreq);
                if (yreq.errorType != YAPI_SUCCESS) return yreq;
                if (yreq.bin_result.length == 0 && httpreq.indexOf('?') >= 0) {
                    funcreq.obj_result = yreq.bin_result;
                    return funcreq;
                }
                try {
                    loadval = JSON.parse(_this159.imm_bin2str(yreq.bin_result));
                } catch (err) {
                    //console.log('RequestAPI parse error: ', err);
                }
            }
            if (!loadval) {
                funcreq.errorType = YAPI_IO_ERROR;
                funcreq.errorMsg = 'Request failed, could not parse API value for function ' + devreq.hwid;
            } else {
                for (let key in devreq) {
                    loadval[key] = devreq[key];
                }
                funcreq.obj_result = loadval;
            }
            return funcreq;
        })();
    }

    /** Perform an HTTP request on a device and return the result string
     *
     * @param str_device {string}
     * @param str_request {string}
     * @returns {Uint8Array}
     */
    HTTPRequest(str_device, str_request) {
        var _this160 = this;

        return _asyncToGenerator(function* () {
            /** @type {YHTTPRequest} **/
            let yreq = yield _this160.devRequest(str_device, str_request);
            if (yreq.errorType != YAPI_SUCCESS) {
                return _this160._throw(yreq.errorType, yreq.errorMsg, null);
            }
            return yreq.bin_result;
        })();
    }

    /**
     * Returns the version identifier for the Yoctopuce library in use.
     * The version is a string in the form "Major.Minor.Build",
     * for instance "1.01.5535". For languages using an external
     * DLL (for instance C#, VisualBasic or Delphi), the character string
     * includes as well the DLL version, for instance
     * "1.01.5535 (1.01.5439)".
     *
     * If you want to verify in your code that the library version is
     * compatible with the version that you have used during development,
     * verify that the major number is strictly equal and that the minor
     * number is greater or equal. The build number is not relevant
     * with respect to the library compatibility.
     *
     * @return {string} a character string describing the library version.
     */
    GetAPIVersion() {
        return _asyncToGenerator(function* () {
            return (/* version number patched automatically */'1.10.22661'
            );
        })();
    }

    /**
     * Initializes the Yoctopuce programming library explicitly.
     * It is not strictly needed to call yInitAPI(), as the library is
     * automatically  initialized when calling yRegisterHub() for the
     * first time.
     *
     * When YAPI.DETECT_NONE is used as detection mode,
     * you must explicitly use yRegisterHub() to point the API to the
     * VirtualHub on which your devices are connected before trying to access them.
     *
     * @param mode {number} : an integer corresponding to the type of automatic
     *         device detection to use. Possible values are
     *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
     *         and YAPI.DETECT_ALL.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    InitAPI(mode, errmsg) {
        return _asyncToGenerator(function* () {
            // nothing to be done for now
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Frees dynamically allocated memory blocks used by the Yoctopuce library.
     * It is generally not required to call this function, unless you
     * want to free all dynamically allocated memory blocks in order to
     * track a memory leak for instance.
     * You should not call any other library function after calling
     * yFreeAPI(), or your program will crash.
     */
    FreeAPI() {
        var _this161 = this;

        return _asyncToGenerator(function* () {
            // when invoked in callback mode, close connection
            for (let i = 0; i < _this161._hubs.length; i++) {
                _this161._hubs[i].disconnect();
            }

            // clear all caches
            _this161.imm_init();
        })();
    }

    /**
     * Disables the use of exceptions to report runtime errors.
     * When exceptions are disabled, every function returns a specific
     * error value which depends on its type and which is documented in
     * this reference manual.
     */
    DisableExceptions() {
        var _this162 = this;

        return _asyncToGenerator(function* () {
            _this162.exceptionsDisabled = true;
        })();
    }

    /**
     * Re-enables the use of exceptions for runtime error handling.
     * Be aware than when exceptions are enabled, every function that fails
     * triggers an exception. If the exception is not caught by the user code,
     * it  either fires the debugger or aborts (i.e. crash) the program.
     * On failure, throws an exception or returns a negative error code.
     */
    EnableExceptions() {
        var _this163 = this;

        return _asyncToGenerator(function* () {
            _this163.exceptionsDisabled = false;
        })();
    }

    /**
     * Enable logging to the console for unhandled promise rejections,
     * such as exceptions in async functions without a try/catch.
     * This is not really a Yoctopuce thing, but since it is not obvious
     * to find out and since the code differs depending on the environment,
     * we provide it here for convenience.
     */
    LogUnhandledPromiseRejections() {
        var _this164 = this;

        return _asyncToGenerator(function* () {
            if (_this164._isNodeJS) {
                process.on('unhandledRejection', function (reason, p) {
                    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
                });
            } else {
                window.addEventListener('onunhandledrejection', function (event) {
                    console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
                });
            }
        })();
    }

    // Parse a hub URL
    imm_parseRegisteredUrl(str_url) {
        var user = '';
        var pass = '';
        var port = '4444';
        var host;
        var url = 'http://';

        if (str_url.slice(0, 7) == 'http://') {
            str_url = str_url.slice(7);
        } else if (str_url.slice(0, 5) == 'ws://') {
            url = 'ws://';
            str_url = str_url.slice(5);
        }
        var pos = str_url.indexOf('/');
        if (pos > 0) {
            str_url = str_url.slice(0, pos);
        }
        var authpos = str_url.indexOf('@');
        if (authpos >= 0) {
            var auth = str_url.slice(0, authpos);
            var passpos = auth.indexOf(':');
            if (passpos >= 0) {
                user = auth.slice(0, passpos);
                pass = auth.slice(passpos + 1);
                url += user + ':' + pass + '@';
            } else {
                user = auth;
                url += user + '@';
            }
            str_url = str_url.slice(authpos + 1);
        }
        pos = str_url.indexOf(':');
        if (pos < 0) {
            host = str_url;
        } else {
            host = str_url.slice(0, pos);
            port = str_url.slice(pos + 1);
        }
        if (host == 'callback') {
            if (url.slice(0, 3) == 'ws:') {
                url = 'ws://callback:4444/';
            } else {
                url = 'http://callback:4444/';
            }
        } else {
            url += host + ':' + port + '/';
        }
        var res = { 'user': user, 'pass': pass, 'host': host, 'port': port, 'url': url };
        return res;
    }

    imm_registerHub_internal(urlInfo) {
        let newhub;
        if (urlInfo.url.slice(0, 3) == 'ws:') {
            if (this._isNodeJS) {
                newhub = new YWebSocketNodeHub(this, urlInfo);
            } else {
                newhub = new YWebSocketHub(this, urlInfo);
            }
        } else {
            if (this._isNodeJS) {
                newhub = new YHttpNodeHub(this, urlInfo);
            } else {
                newhub = new YHttpHub(this, urlInfo);
            }
        }
        return newhub;
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a given machine. The
     * parameter will determine how the API will work. Use the following values:
     *
     * <b>usb</b>: When the usb keyword is used, the API will work with
     * devices connected directly to the USB bus. Some programming languages such a Javascript,
     * PHP, and Java don't provide direct access to USB hardware, so usb will
     * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
     *
     * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
     * host with the given IP address or hostname. That host can be a regular computer
     * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
     * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
     * computer, use the IP address 127.0.0.1.
     *
     * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
     * This a special mode allowing to take control of Yoctopuce devices
     * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
     * need to configure your hub to call your server script on a regular basis.
     * This mode is currently available for PHP and Node.JS only.
     *
     * Be aware that only one application can use direct USB access at a
     * given time on a machine. Multiple access would cause conflicts
     * while trying to access the USB modules. In particular, this means
     * that you must stop the VirtualHub software before starting
     * an application that uses direct USB access. The workaround
     * for this limitation is to setup the library to use the VirtualHub
     * rather than direct USB access.
     *
     * If access control has been activated on the hub, virtual or not, you want to
     * reach, the URL parameter should look like:
     *
     * http://username:password@address:port
     *
     * You can call <i>RegisterHub</i> several times to connect to several machines.
     *
     * @param url {string} : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHub(url, errmsg) {
        var _this165 = this;

        return _asyncToGenerator(function* () {
            let urlInfo = _this165.imm_parseRegisteredUrl(url);
            let newhub = _this165.imm_getHub(urlInfo.url);
            if (newhub) {
                return YAPI_SUCCESS;
            }
            newhub = _this165.imm_registerHub_internal(urlInfo);
            let retcode = yield newhub.testHub(errmsg);
            if (retcode != YAPI_SUCCESS) {
                return _this165._throw(retcode, errmsg.msg, retcode);
            }
            yield _this165._addHub(newhub);

            // Update known device list
            let yreq = yield _this165._updateDeviceList_internal(true, false);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (errmsg != undefined) {
                    errmsg.msg = yreq.errorMsg;
                    _this165._serverResponse.write('\n!YoctoAPI:' + errmsg.msg + '\n');
                }
                return _this165._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Fault-tolerant alternative to RegisterHub(). This function has the same
     * purpose and same arguments as RegisterHub(), but does not trigger
     * an error when the selected hub is not available at the time of the function call.
     * This makes it possible to register a network hub independently of the current
     * connectivity, and to try to contact it only when a device is actively needed.
     *
     * @param url {string} : a string containing either "usb","callback" or the
     *         root URL of the hub to monitor
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    PreregisterHub(url, errmsg) {
        var _this166 = this;

        return _asyncToGenerator(function* () {
            let urlInfo = _this166.imm_parseRegisteredUrl(url);
            let newhub = _this166.imm_getHub(urlInfo.url);
            if (newhub) {
                return YAPI_SUCCESS;
            }
            newhub = _this166.imm_registerHub_internal(urlInfo);
            _this166._addHub(newhub);

            // trigger testHub, but don't wait for the result
            newhub.testHub(errmsg);

            return YAPI_SUCCESS;
        })();
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to an HTTP server.
     *
     * @param incomingMessage {IncomingMessage} : node http incomingMessage object.
     * @param serverResponse  {ServerResponse} : node http serverResponse object.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHubHttpCallback(incomingMessage, serverResponse, errmsg) {
        var _this167 = this;

        return _asyncToGenerator(function* () {
            let urlInfo = _this167.imm_parseRegisteredUrl('http://callback:4444');
            let newhub = _this167.imm_getHub(urlInfo.url);
            if (newhub) {
                return YAPI_SUCCESS;
            }
            newhub = new YHttpCallbackHub(_this167, urlInfo, incomingMessage, serverResponse);
            yield newhub.httpCallbackPromise;
            let retcode = yield newhub.testHub(errmsg);
            if (retcode != YAPI_SUCCESS) {
                _this167._serverResponse.write('\n!YoctoAPI:' + errmsg.msg + '\n');
                return _this167._throw(retcode, errmsg.msg, retcode);
            }
            yield _this167._addHub(newhub);

            // Update known device list
            let yreq = yield _this167._updateDeviceList_internal(true, false);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (errmsg != undefined) {
                    errmsg.msg = yreq.errorMsg;
                    _this167._serverResponse.write('\n!YoctoAPI:' + errmsg.msg + '\n');
                }
                return _this167._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Setup the Yoctopuce library to use modules connected on a remote hub
     * performing an incoming connection to a websocket server.
     *
     * @param ws {WebSocket} : node-ws WebSocketServer object.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    RegisterHubWebSocketCallback(ws, errmsg) {
        var _this168 = this;

        return _asyncToGenerator(function* () {
            let urlInfo = _this168.imm_parseRegisteredUrl('http://callback:4444');
            let newhub = _this168.imm_getHub(urlInfo.url);
            if (newhub) {
                return YAPI_SUCCESS;
            }
            newhub = new YWebSocketCallbackHub(_this168, urlInfo, ws);
            let retcode = yield newhub.testHub(errmsg);
            if (retcode != YAPI_SUCCESS) {
                return _this168._throw(retcode, errmsg.msg, retcode);
            }
            yield _this168._addHub(newhub);

            // Update known device list
            let yreq = yield _this168._updateDeviceList_internal(true, false);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (errmsg != undefined) {
                    errmsg.msg = yreq.errorMsg;
                }
                return _this168._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Setup the Yoctopuce library to no more use modules connected on a previously
     * registered machine with RegisterHub.
     *
     * @param url {string} : a string containing either "usb" or the
     *         root URL of the hub to monitor
     */
    UnregisterHub(url) {
        var _this169 = this;

        return _asyncToGenerator(function* () {
            var urlInfo = _this169.imm_parseRegisteredUrl(url);
            var i, j;

            for (i = 0; i < _this169._hubs.length; i++) {
                if (_this169._hubs[i].urlInfo.url == urlInfo.url) {
                    _this169._hubs[i].disconnect();
                    for (j = 0; j < _this169._hubs[i].serialByYdx.length; j++) {
                        var serial = _this169._hubs[i].serialByYdx[j];
                        _this169.imm_forgetDevice(_this169._devs[serial]);
                    }
                    var before = _this169._hubs.slice(0, i);
                    if (i + 1 < _this169._hubs.length) {
                        var after = _this169._hubs.slice(i + 1);
                        _this169._hubs = before.concat(after);
                    }
                    _this169._hubs = before;
                    return;
                }
            }
        })();
    }

    /**
     * Triggers a (re)detection of connected Yoctopuce modules.
     * The library searches the machines or USB ports previously registered using
     * yRegisterHub(), and invokes any user-defined callback function
     * in case a change in the list of connected devices is detected.
     *
     * This function can be called as frequently as desired to refresh the device list
     * and to make the application aware of hot-plug events.
     *
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    UpdateDeviceList(errmsg) {
        var _this170 = this;

        return _asyncToGenerator(function* () {
            var yreq = yield _this170._updateDeviceList_internal(false, true);
            if (yreq.errorType != YAPI_SUCCESS) {
                if (errmsg != undefined) errmsg.msg = yreq.errorMsg;
                return _this170._throw(yreq.errorType, yreq.errorMsg, yreq.errorType);
            }
            return YAPI_SUCCESS;
        })();
    }

    /**
     * Maintains the device-to-library communication channel.
     * If your program includes significant loops, you may want to include
     * a call to this function to make sure that the library takes care of
     * the information pushed by the modules on the communication channels.
     * This is not strictly necessary, but it may improve the reactivity
     * of the library for the following commands.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    HandleEvents(errmsg) {
        var _this171 = this;

        return _asyncToGenerator(function* () {
            var nEvents = _this171._data_events.length;
            for (var i = 0; i < nEvents; i++) {
                var evt = _this171._data_events[i];
                if (typeof evt[1] == 'string') {
                    // event object is an advertised value
                    yield evt[0]._invokeValueCallback(evt[1]);
                } else {
                    // event object is an array of bytes (encoded timed report)
                    var dev = _this171.imm_getDevice(evt[0]._serial);
                    if (dev) {
                        var report = yield evt[0]._decodeTimedReport(evt[1], evt[2]);
                        yield evt[0]._invokeTimedReportCallback(report);
                    }
                }
            }
            _this171._data_events = _this171._data_events.slice(nEvents);

            return YAPI_SUCCESS;
        })();
    }

    /**
     * Pauses the execution flow for a specified duration.
     * This function implements a passive waiting loop, meaning that it does not
     * consume CPU cycles significantly. The processor is left available for
     * other threads and processes. During the pause, the library nevertheless
     * reads from time to time information from the Yoctopuce modules by
     * calling yHandleEvents(), in order to stay up-to-date.
     *
     * This function may signal an error in case there is a communication problem
     * while contacting a module.
     *
     * @param ms_duration {number} : an integer corresponding to the duration of the pause,
     *         in milliseconds.
     * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    Sleep(ms_duration, errmsg) {
        var _this172 = this;

        return _asyncToGenerator(function* () {
            var end = _this172.GetTickCount() + ms_duration;
            yield _this172.HandleEvents(errmsg);
            while (_this172.GetTickCount() < end) {
                yield _this172._microSleep_internal();
                yield _this172.HandleEvents(errmsg);
            }
            return YAPI_SUCCESS;
        })();
    }

    // internal async function to wait for a very short period
    _microSleep_internal() {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, 3);
        });
    }

    /**
     * Returns the current value of a monotone millisecond-based time counter.
     * This counter can be used to compute delays in relation with
     * Yoctopuce devices, which also uses the millisecond as timebase.
     *
     * @return {number} a long integer corresponding to the millisecond counter.
     */
    GetTickCount() {
        return +new Date();
    }

    /**
     * Checks if a given string is valid as logical name for a module or a function.
     * A valid logical name has a maximum of 19 characters, all among
     * A..Z, a..z, 0..9, _, and -.
     * If you try to configure a logical name with an incorrect string,
     * the invalid characters are ignored.
     *
     * @param name {string} : a string containing the name to check.
     *
     * @return {boolean} true if the name is valid, false otherwise.
     */
    CheckLogicalName(name) {
        return _asyncToGenerator(function* () {
            if (name == '') return true;
            if (!name) return false;
            if (name.length > 19) return false;
            return (/^[A-Za-z0-9_\-]*$/.test(name)
            );
        })();
    }

    /**
     * Register a callback function, to be called each time
     * a device is plugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param arrivalCallback {function} : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    RegisterDeviceArrivalCallback(arrivalCallback) {
        var _this173 = this;

        return _asyncToGenerator(function* () {
            _this173._arrivalCallback = arrivalCallback;
        })();
    }

    RegisterDeviceChangeCallback(changeCallback) {
        var _this174 = this;

        return _asyncToGenerator(function* () {
            _this174._namechgCallback = changeCallback;
        })();
    }

    /**
     * Register a callback function, to be called each time
     * a device is unplugged. This callback will be invoked while yUpdateDeviceList
     * is running. You will have to call this function on a regular basis.
     *
     * @param removalCallback {function} : a procedure taking a YModule parameter, or null
     *         to unregister a previously registered  callback.
     */
    RegisterDeviceRemovalCallback(removalCallback) {
        var _this175 = this;

        return _asyncToGenerator(function* () {
            _this175._removalCallback = removalCallback;
        })();
    }

    // Register a new value calibration handler for a given calibration type
    //
    RegisterCalibrationHandler(calibrationType, calibrationHandler) {
        var _this176 = this;

        return _asyncToGenerator(function* () {
            _this176._calibHandlers[calibrationType.toString()] = calibrationHandler;
        })();
    }

    // Standard value calibration handler (n-point linear error correction)
    //
    LinearCalibrationHandler(float_rawValue, int_calibType, arr_calibParams, arr_calibRawValues, arr_calibRefValues) {
        // calibration types n=1..10 and 11..20 are meant for linear calibration using n points
        var npt;
        var x = arr_calibRawValues[0];
        var adj = arr_calibRefValues[0] - x;
        var i = 0;

        if (int_calibType < YOCTO_CALIB_TYPE_OFS) {
            npt = Math.min(int_calibType % 10, arr_calibRawValues.length, arr_calibRefValues.length);
        } else {
            npt = arr_calibRefValues.length;
        }
        while (float_rawValue > arr_calibRawValues[i] && ++i < npt) {
            var x2 = x;
            var adj2 = adj;

            x = arr_calibRawValues[i];
            adj = arr_calibRefValues[i] - x;

            if (float_rawValue < x && x > x2) {
                adj = adj2 + (adj - adj2) * (float_rawValue - x2) / (x - x2);
            }
        }
        return float_rawValue + adj;
    }

    // WPA preshared-key computation
    //
    imm_initshaw(str_s, int_pad, int_xinit, _shaw) {
        var i,
            j = -1,
            k = 0;
        var n = str_s.length;

        for (i = 0; i < 64; i++) {
            var c = 0;
            if (i < n) {
                c = str_s.charCodeAt(i);
            } else if (int_pad != 0) {
                if (i == n + 3) c = int_pad;else if (i == n + 4) c = 0x80;
            }
            if (k == 0) {
                j++;
                _shaw[j] = 0;
                k = 32;
            }
            k -= 8;
            _shaw[j] |= c << k;
        }
        if (int_pad != 0) {
            _shaw[15] = 8 * (64 + n + 4);
        }
        if (int_xinit != 0) {
            var xdw = int_xinit << 16 | int_xinit;
            for (j = 0; j < 16; j++) {
                _shaw[j] ^= xdw;
            }
        }
    }

    imm_itershaw(s, _shaw) {
        var a, b, c, d, e, t, k;

        a = s[0];
        b = s[1];
        c = s[2];
        d = s[3];
        e = s[4];
        for (k = 16; k < 80; k++) {
            t = _shaw[k - 3] ^ _shaw[k - 8] ^ _shaw[k - 14] ^ _shaw[k - 16];
            _shaw[k] = t << 1 | t >>> 31;
        }
        for (k = 0; k < 20; k++) {
            t = (a << 5 | a >>> 27) + e + _shaw[k] + 0x5A827999 + (b & c | ~b & d);
            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 20; k < 40; k++) {
            t = (a << 5 | a >>> 27) + e + _shaw[k] + 0x6ED9EBA1 + (b ^ c ^ d);
            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 40; k < 60; k++) {
            t = (a << 5 | a >>> 27) + e + _shaw[k] + 0x8F1BBCDC + (b & c | b & d | c & d);
            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t & 0xffffffff;
        }
        for (k = 60; k < 80; k++) {
            t = (a << 5 | a >>> 27) + e + _shaw[k] + 0xCA62C1D6 + (b ^ c ^ d);
            e = d;
            d = c;
            c = b << 30 | b >>> 2;
            b = a;
            a = t & 0xffffffff;
        }
        _shaw[0] = s[0] + a & 0xffffffff;
        _shaw[1] = s[1] + b & 0xffffffff;
        _shaw[2] = s[2] + c & 0xffffffff;
        _shaw[3] = s[3] + d & 0xffffffff;
        _shaw[4] = s[4] + e & 0xffffffff;
    }

    /**
     * Compute the WPA Preshared key for a given SSID and passphrase
     *
     * @param ssid {string} : the access point SSID
     * @param pass {string} : the access point WPA/WPA2 passphrase
     *
     * @return {string} an hexadecimal string for the preshared key
     */
    ComputePSK(ssid, pass) {
        var _this177 = this;

        return _asyncToGenerator(function* () {
            var sha1_init = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
            var inner = [],
                outer = [],
                shau = [],
                res = [];
            var iter, pos, k, _shaw;

            // precompute part of sha used in the loops
            _shaw = new Array(80);
            _this177.imm_initshaw(pass, 0, 0x3636, _shaw);
            _this177.imm_itershaw(sha1_init, _shaw);
            for (k = 0; k < 5; k++) inner[k] = _shaw[k];
            _shaw = new Array(80);
            _this177.imm_initshaw(pass, 0, 0x5c5c, _shaw);
            _this177.imm_itershaw(sha1_init, _shaw);
            for (k = 0; k < 5; k++) outer[k] = _shaw[k];

            // prepare to compute first 20 bytes
            pos = 0;
            for (k = 0; k < 5; k++) shau[k] = 0;
            _shaw = new Array(80);
            _this177.imm_initshaw(ssid, 1, 0, _shaw);

            for (iter = 0; iter < 8192;) {
                _this177.imm_itershaw(inner, _shaw);
                _shaw[5] = 0x80000000;
                for (k = 6; k < 15; k++) {
                    _shaw[k] = 0;
                }
                _shaw[15] = 8 * (64 + 20);
                _this177.imm_itershaw(outer, _shaw);
                shau[0] ^= _shaw[0];
                shau[1] ^= _shaw[1];
                shau[2] ^= _shaw[2];
                shau[3] ^= _shaw[3];
                shau[4] ^= _shaw[4];
                iter++;
                // after 4096 loops, move to 2nd half of sha1
                if ((iter & 4095) == 0) {
                    for (k = 0; k < 5 && pos < 32; k++) {
                        res[pos++] = shau[k] >>> 24 & 0xff;
                        res[pos++] = shau[k] >>> 16 & 0xff;
                        res[pos++] = shau[k] >>> 8 & 0xff;
                        res[pos++] = shau[k] & 0xff;
                    }
                    if (iter == 4096) {
                        for (k = 0; k < 5; k++) shau[k] = 0;
                        _shaw = new Array(80);
                        _this177.imm_initshaw(ssid, 2, 0, _shaw);
                    }
                }
            }
            var hex = '';
            for (k = 0; k < 32; k++) {
                hex += ('0' + Number(res[k]).toString(16)).slice(-2);
            }
            return hex;
        })();
    }
}

exports.YAPIContext = YAPIContext;
var YAPI = exports.YAPI = new YAPIContext();

// Standard value calibration handler (n-point linear error correction)
//
var yLinearCalibrationHandler = exports.yLinearCalibrationHandler = YAPI.LinearCalibrationHandler;

/**
 * Returns the version identifier for the Yoctopuce library in use.
 * The version is a string in the form "Major.Minor.Build",
 * for instance "1.01.5535". For languages using an external
 * DLL (for instance C#, VisualBasic or Delphi), the character string
 * includes as well the DLL version, for instance
 * "1.01.5535 (1.01.5439)".
 *
 * If you want to verify in your code that the library version is
 * compatible with the version that you have used during development,
 * verify that the major number is strictly equal and that the minor
 * number is greater or equal. The build number is not relevant
 * with respect to the library compatibility.
 *
 * @return {string} a character string describing the library version.
 */
function yGetAPIVersion() {
    return YAPI.GetAPIVersion();
}

/**
 * Initializes the Yoctopuce programming library explicitly.
 * It is not strictly needed to call yInitAPI(), as the library is
 * automatically  initialized when calling yRegisterHub() for the
 * first time.
 *
 * When YAPI.DETECT_NONE is used as detection mode,
 * you must explicitly use yRegisterHub() to point the API to the
 * VirtualHub on which your devices are connected before trying to access them.
 *
 * @param mode {number} : an integer corresponding to the type of automatic
 *         device detection to use. Possible values are
 *         YAPI.DETECT_NONE, YAPI.DETECT_USB, YAPI.DETECT_NET,
 *         and YAPI.DETECT_ALL.
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function yInitAPI(mode, errmsg) {
    return YAPI.InitAPI(mode, errmsg);
}

/**
 * Frees dynamically allocated memory blocks used by the Yoctopuce library.
 * It is generally not required to call this function, unless you
 * want to free all dynamically allocated memory blocks in order to
 * track a memory leak for instance.
 * You should not call any other library function after calling
 * yFreeAPI(), or your program will crash.
 */
function yFreeAPI() {
    YAPI.FreeAPI();
}

/**
 * Disables the use of exceptions to report runtime errors.
 * When exceptions are disabled, every function returns a specific
 * error value which depends on its type and which is documented in
 * this reference manual.
 */
function yDisableExceptions() {
    YAPI.DisableExceptions();
}

/**
 * Re-enables the use of exceptions for runtime error handling.
 * Be aware than when exceptions are enabled, every function that fails
 * triggers an exception. If the exception is not caught by the user code,
 * it  either fires the debugger or aborts (i.e. crash) the program.
 * On failure, throws an exception or returns a negative error code.
 */
function yEnableExceptions() {
    YAPI.EnableExceptions();
}

/**
 * Setup the Yoctopuce library to use modules connected on a given machine. The
 * parameter will determine how the API will work. Use the following values:
 *
 * <b>usb</b>: When the usb keyword is used, the API will work with
 * devices connected directly to the USB bus. Some programming languages such a Javascript,
 * PHP, and Java don't provide direct access to USB hardware, so usb will
 * not work with these. In this case, use a VirtualHub or a networked YoctoHub (see below).
 *
 * <b><i>x.x.x.x</i></b> or <b><i>hostname</i></b>: The API will use the devices connected to the
 * host with the given IP address or hostname. That host can be a regular computer
 * running a VirtualHub, or a networked YoctoHub such as YoctoHub-Ethernet or
 * YoctoHub-Wireless. If you want to use the VirtualHub running on you local
 * computer, use the IP address 127.0.0.1.
 *
 * <b>callback</b>: that keyword make the API run in "<i>HTTP Callback</i>" mode.
 * This a special mode allowing to take control of Yoctopuce devices
 * through a NAT filter when using a VirtualHub or a networked YoctoHub. You only
 * need to configure your hub to call your server script on a regular basis.
 * This mode is currently available for PHP and Node.JS only.
 *
 * Be aware that only one application can use direct USB access at a
 * given time on a machine. Multiple access would cause conflicts
 * while trying to access the USB modules. In particular, this means
 * that you must stop the VirtualHub software before starting
 * an application that uses direct USB access. The workaround
 * for this limitation is to setup the library to use the VirtualHub
 * rather than direct USB access.
 *
 * If access control has been activated on the hub, virtual or not, you want to
 * reach, the URL parameter should look like:
 *
 * http://username:password@address:port
 *
 * You can call <i>RegisterHub</i> several times to connect to several machines.
 *
 * @param url {string} : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function yRegisterHub(url, errmsg) {
    return YAPI.RegisterHub(url, errmsg);
}

/**
 * Fault-tolerant alternative to RegisterHub(). This function has the same
 * purpose and same arguments as RegisterHub(), but does not trigger
 * an error when the selected hub is not available at the time of the function call.
 * This makes it possible to register a network hub independently of the current
 * connectivity, and to try to contact it only when a device is actively needed.
 *
 * @param url {string} : a string containing either "usb","callback" or the
 *         root URL of the hub to monitor
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function yPreregisterHub(url, errmsg) {
    return YAPI.PreregisterHub(url, errmsg);
}

/**
 * Setup the Yoctopuce library to no more use modules connected on a previously
 * registered machine with RegisterHub.
 *
 * @param url {string} : a string containing either "usb" or the
 *         root URL of the hub to monitor
 */
function yUnregisterHub(url) {
    YAPI.UnregisterHub(url);
}

/**
 * Triggers a (re)detection of connected Yoctopuce modules.
 * The library searches the machines or USB ports previously registered using
 * yRegisterHub(), and invokes any user-defined callback function
 * in case a change in the list of connected devices is detected.
 *
 * This function can be called as frequently as desired to refresh the device list
 * and to make the application aware of hot-plug events.
 *
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function yUpdateDeviceList(errmsg) {
    return YAPI.UpdateDeviceList(errmsg);
}

/**
 * Maintains the device-to-library communication channel.
 * If your program includes significant loops, you may want to include
 * a call to this function to make sure that the library takes care of
 * the information pushed by the modules on the communication channels.
 * This is not strictly necessary, but it may improve the reactivity
 * of the library for the following commands.
 *
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 *
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function yHandleEvents(errmsg) {
    return YAPI.HandleEvents(errmsg);
}

/**
 * Pauses the execution flow for a specified duration.
 * This function implements a passive waiting loop, meaning that it does not
 * consume CPU cycles significantly. The processor is left available for
 * other threads and processes. During the pause, the library nevertheless
 * reads from time to time information from the Yoctopuce modules by
 * calling yHandleEvents(), in order to stay up-to-date.
 *
 * This function may signal an error in case there is a communication problem
 * while contacting a module.
 *
 * @param ms_duration {number} : an integer corresponding to the duration of the pause,
 *         in milliseconds.
 * @param errmsg {YErrorMsg} : a string passed by reference to receive any error message.
 *
 * @return {number} YAPI.SUCCESS when the call succeeds.
 *
 * On failure, throws an exception or returns a negative error code.
 */
function ySleep(ms_duration, errmsg) {
    return YAPI.Sleep(ms_duration, errmsg);
}

/**
 * Returns the current value of a monotone millisecond-based time counter.
 * This counter can be used to compute delays in relation with
 * Yoctopuce devices, which also uses the millisecond as timebase.
 *
 * @return {number} a long integer corresponding to the millisecond counter.
 */
function yGetTickCount() {
    return YAPI.GetTickCount();
}

/**
 * Checks if a given string is valid as logical name for a module or a function.
 * A valid logical name has a maximum of 19 characters, all among
 * A..Z, a..z, 0..9, _, and -.
 * If you try to configure a logical name with an incorrect string,
 * the invalid characters are ignored.
 *
 * @param name {string} : a string containing the name to check.
 *
 * @return {boolean} true if the name is valid, false otherwise.
 */
function yCheckLogicalName(name) {
    return YAPI.CheckLogicalName(name);
}

/**
 * Register a callback function, to be called each time
 * a device is plugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 *
 * @param arrivalCallback {function} : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceArrivalCallback(arrivalCallback) {
    return YAPI.RegisterDeviceArrivalCallback(arrivalCallback);
}

function yRegisterDeviceChangeCallback(changeCallback) {
    return YAPI.RegisterDeviceChangeCallback(changeCallback);
}

/**
 * Register a callback function, to be called each time
 * a device is unplugged. This callback will be invoked while yUpdateDeviceList
 * is running. You will have to call this function on a regular basis.
 *
 * @param removalCallback {function} : a procedure taking a YModule parameter, or null
 *         to unregister a previously registered  callback.
 */
function yRegisterDeviceRemovalCallback(removalCallback) {
    return YAPI.RegisterDeviceRemovalCallback(removalCallback);
}

// Register a new value calibration handler for a given calibration type
//
function yRegisterCalibrationHandler(calibrationType, calibrationHandler) {
    return YAPI.RegisterCalibrationHandler(calibrationType, calibrationHandler);
}
