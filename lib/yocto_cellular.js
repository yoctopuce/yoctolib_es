'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YCellularProxy = exports.YCellular = exports.Y_COMMAND_INVALID = exports.Y_PINGINTERVAL_INVALID = exports.Y_APNSECRET_INVALID = exports.Y_APN_INVALID = exports.Y_LOCKEDOPERATOR_INVALID = exports.Y_PIN_INVALID = exports.Y_MESSAGE_INVALID = exports.Y_IMSI_INVALID = exports.Y_CELLIDENTIFIER_INVALID = exports.Y_CELLOPERATOR_INVALID = exports.Y_LINKQUALITY_INVALID = exports.Y_ENABLEDATA_INVALID = exports.Y_ENABLEDATA_NEVER = exports.Y_ENABLEDATA_ROAMING = exports.Y_ENABLEDATA_HOMENETWORK = exports.Y_AIRPLANEMODE_INVALID = exports.Y_AIRPLANEMODE_ON = exports.Y_AIRPLANEMODE_OFF = exports.Y_CELLTYPE_INVALID = exports.Y_CELLTYPE_CDMA = exports.Y_CELLTYPE_NONE = exports.Y_CELLTYPE_HSDPA = exports.Y_CELLTYPE_WCDMA = exports.Y_CELLTYPE_EGPRS = exports.Y_CELLTYPE_GPRS = exports.YCellRecord = undefined;
exports.yFindCellular = yFindCellular;
exports.yFirstCellular = yFirstCellular;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * $Id: yocto_cellular.js 23963 2016-04-17 20:55:12Z mvuilleu $
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Implements the high-level API for Cellular functions
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

//--- (generated code: YCellRecord return codes)
//--- (end of generated code: YCellRecord return codes)
//--- (generated code: YCellRecord definitions)
//--- (end of generated code: YCellRecord definitions)

//--- (generated code: YCellRecord class start)
/**
 * YCellRecord Class: Description of a cellular antenna
 *
 *
 */
//--- (end of generated code: YCellRecord class start)

class YCellRecord {
    constructor(int_mcc, int_mnc, int_lac, int_cellId, int_dbm, int_tad, str_oper) {
        //--- (generated code: YCellRecord constructor)
        /** @member {string} **/
        this._oper = '';
        /** @member {number} **/
        this._mcc = 0;
        /** @member {number} **/
        this._mnc = 0;
        /** @member {number} **/
        this._lac = 0;
        /** @member {number} **/
        this._cid = 0;
        /** @member {number} **/
        this._dbm = 0;
        /** @member {number} **/
        this._tad = 0;
        //--- (end of generated code: YCellRecord constructor)
        this._oper = str_oper;
        this._mcc = int_mcc;
        this._mnc = int_mnc;
        this._lac = int_lac;
        this._cid = int_cellId;
        this._dbm = int_dbm;
        this._tad = int_tad;
    }

    //--- (generated code: YCellRecord implementation)

    get_cellOperator() {
        return this._oper;
    }

    get_mobileCountryCode() {
        return this._mcc;
    }

    get_mobileNetworkCode() {
        return this._mnc;
    }

    get_locationAreaCode() {
        return this._lac;
    }

    get_cellId() {
        return this._cid;
    }

    get_signalStrength() {
        return this._dbm;
    }

    get_timingAdvance() {
        return this._tad;
    }

    //--- (end of generated code: YCellRecord implementation)
}

exports.YCellRecord = YCellRecord; //--- (generated code: CellRecord functions)
//--- (end of generated code: CellRecord functions)

//--- (generated code: YCellular return codes)
//--- (end of generated code: YCellular return codes)
//--- (generated code: YCellular definitions)

var Y_CELLTYPE_GPRS = exports.Y_CELLTYPE_GPRS = 0;
var Y_CELLTYPE_EGPRS = exports.Y_CELLTYPE_EGPRS = 1;
var Y_CELLTYPE_WCDMA = exports.Y_CELLTYPE_WCDMA = 2;
var Y_CELLTYPE_HSDPA = exports.Y_CELLTYPE_HSDPA = 3;
var Y_CELLTYPE_NONE = exports.Y_CELLTYPE_NONE = 4;
var Y_CELLTYPE_CDMA = exports.Y_CELLTYPE_CDMA = 5;
var Y_CELLTYPE_INVALID = exports.Y_CELLTYPE_INVALID = -1;
var Y_AIRPLANEMODE_OFF = exports.Y_AIRPLANEMODE_OFF = 0;
var Y_AIRPLANEMODE_ON = exports.Y_AIRPLANEMODE_ON = 1;
var Y_AIRPLANEMODE_INVALID = exports.Y_AIRPLANEMODE_INVALID = -1;
var Y_ENABLEDATA_HOMENETWORK = exports.Y_ENABLEDATA_HOMENETWORK = 0;
var Y_ENABLEDATA_ROAMING = exports.Y_ENABLEDATA_ROAMING = 1;
var Y_ENABLEDATA_NEVER = exports.Y_ENABLEDATA_NEVER = 2;
var Y_ENABLEDATA_INVALID = exports.Y_ENABLEDATA_INVALID = -1;
var Y_LINKQUALITY_INVALID = exports.Y_LINKQUALITY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CELLOPERATOR_INVALID = exports.Y_CELLOPERATOR_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CELLIDENTIFIER_INVALID = exports.Y_CELLIDENTIFIER_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_IMSI_INVALID = exports.Y_IMSI_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_MESSAGE_INVALID = exports.Y_MESSAGE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_PIN_INVALID = exports.Y_PIN_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_LOCKEDOPERATOR_INVALID = exports.Y_LOCKEDOPERATOR_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_APN_INVALID = exports.Y_APN_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_APNSECRET_INVALID = exports.Y_APNSECRET_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_PINGINTERVAL_INVALID = exports.Y_PINGINTERVAL_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YCellular definitions)

//--- (generated code: YCellular class start)
/**
 * YCellular Class: Cellular function interface
 *
 * YCellular functions provides control over cellular network parameters
 * and status for devices that are GSM-enabled.
 */
//--- (end of generated code: YCellular class start)

class YCellular extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YCellular constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Cellular';
        /** @member {number} **/
        this._linkQuality = Y_LINKQUALITY_INVALID;
        /** @member {string} **/
        this._cellOperator = Y_CELLOPERATOR_INVALID;
        /** @member {string} **/
        this._cellIdentifier = Y_CELLIDENTIFIER_INVALID;
        /** @member {number} **/
        this._cellType = Y_CELLTYPE_INVALID;
        /** @member {string} **/
        this._imsi = Y_IMSI_INVALID;
        /** @member {string} **/
        this._message = Y_MESSAGE_INVALID;
        /** @member {string} **/
        this._pin = Y_PIN_INVALID;
        /** @member {string} **/
        this._lockedOperator = Y_LOCKEDOPERATOR_INVALID;
        /** @member {number} **/
        this._airplaneMode = Y_AIRPLANEMODE_INVALID;
        /** @member {number} **/
        this._enableData = Y_ENABLEDATA_INVALID;
        /** @member {string} **/
        this._apn = Y_APN_INVALID;
        /** @member {string} **/
        this._apnSecret = Y_APNSECRET_INVALID;
        /** @member {number} **/
        this._pingInterval = Y_PINGINTERVAL_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            LINKQUALITY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            CELLOPERATOR_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CELLIDENTIFIER_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CELLTYPE_GPRS: 0,
            CELLTYPE_EGPRS: 1,
            CELLTYPE_WCDMA: 2,
            CELLTYPE_HSDPA: 3,
            CELLTYPE_NONE: 4,
            CELLTYPE_CDMA: 5,
            CELLTYPE_INVALID: -1,
            IMSI_INVALID: _yocto_api.YAPI.INVALID_STRING,
            MESSAGE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            PIN_INVALID: _yocto_api.YAPI.INVALID_STRING,
            LOCKEDOPERATOR_INVALID: _yocto_api.YAPI.INVALID_STRING,
            AIRPLANEMODE_OFF: 0,
            AIRPLANEMODE_ON: 1,
            AIRPLANEMODE_INVALID: -1,
            ENABLEDATA_HOMENETWORK: 0,
            ENABLEDATA_ROAMING: 1,
            ENABLEDATA_NEVER: 2,
            ENABLEDATA_INVALID: -1,
            APN_INVALID: _yocto_api.YAPI.INVALID_STRING,
            APNSECRET_INVALID: _yocto_api.YAPI.INVALID_STRING,
            PINGINTERVAL_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YCellular constructor)
    }

    //--- (generated code: YCellular implementation)

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
            var res = new YCellularProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'linkQuality':
                this._linkQuality = parseInt(val);
                return 1;
            case 'cellOperator':
                this._cellOperator = val;
                return 1;
            case 'cellIdentifier':
                this._cellIdentifier = val;
                return 1;
            case 'cellType':
                this._cellType = parseInt(val);
                return 1;
            case 'imsi':
                this._imsi = val;
                return 1;
            case 'message':
                this._message = val;
                return 1;
            case 'pin':
                this._pin = val;
                return 1;
            case 'lockedOperator':
                this._lockedOperator = val;
                return 1;
            case 'airplaneMode':
                this._airplaneMode = parseInt(val);
                return 1;
            case 'enableData':
                this._enableData = parseInt(val);
                return 1;
            case 'apn':
                this._apn = val;
                return 1;
            case 'apnSecret':
                this._apnSecret = val;
                return 1;
            case 'pingInterval':
                this._pingInterval = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the link quality, expressed in percent.
     *
     * @return {number} an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns YCellular.LINKQUALITY_INVALID.
     */
    get_linkQuality() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_LINKQUALITY_INVALID;
                }
            }
            return _this2._linkQuality;
        })();
    }

    /**
     * Returns the name of the cell operator currently in use.
     *
     * @return {string} a string corresponding to the name of the cell operator currently in use
     *
     * On failure, throws an exception or returns YCellular.CELLOPERATOR_INVALID.
     */
    get_cellOperator() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_CELLOPERATOR_INVALID;
                }
            }
            return _this3._cellOperator;
        })();
    }

    /**
     * Returns the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @return {string} a string corresponding to the unique identifier of the cellular antenna in use:
     * MCC, MNC, LAC and Cell ID
     *
     * On failure, throws an exception or returns YCellular.CELLIDENTIFIER_INVALID.
     */
    get_cellIdentifier() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_CELLIDENTIFIER_INVALID;
                }
            }
            return _this4._cellIdentifier;
        })();
    }

    /**
     * Active cellular connection type.
     *
     * @return {number} a value among YCellular.CELLTYPE_GPRS, YCellular.CELLTYPE_EGPRS,
     * YCellular.CELLTYPE_WCDMA, YCellular.CELLTYPE_HSDPA, YCellular.CELLTYPE_NONE and YCellular.CELLTYPE_CDMA
     *
     * On failure, throws an exception or returns YCellular.CELLTYPE_INVALID.
     */
    get_cellType() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_CELLTYPE_INVALID;
                }
            }
            return _this5._cellType;
        })();
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return {string} a string corresponding to an opaque string if a PIN code has been configured in
     * the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YCellular.IMSI_INVALID.
     */
    get_imsi() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_IMSI_INVALID;
                }
            }
            return _this6._imsi;
        })();
    }

    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return {string} a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns YCellular.MESSAGE_INVALID.
     */
    get_message() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_MESSAGE_INVALID;
                }
            }
            return _this7._message;
        })();
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return {string} a string corresponding to an opaque string if a PIN code has been configured in
     * the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns YCellular.PIN_INVALID.
     */
    get_pin() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_PIN_INVALID;
                }
            }
            return _this8._pin;
        })();
    }

    /**
     * Changes the PIN code used by the module to access the SIM card.
     * This function does not change the code on the SIM card itself, but only changes
     * the parameter used by the device to try to get access to it. If the SIM code
     * does not work immediately on first try, it will be automatically forgotten
     * and the message will be set to "Enter SIM PIN". The method should then be
     * invoked again with right correct PIN code. After three failed attempts in a row,
     * the message is changed to "Enter SIM PUK" and the SIM card PUK code must be
     * provided using method sendPUK.
     *
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval {string} : a string corresponding to the PIN code used by the module to access the SIM card
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pin(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this9._setAttr('pin', rest_val);
        })();
    }

    /**
     * Returns the name of the only cell operator to use if automatic choice is disabled,
     * or an empty string if the SIM card will automatically choose among available
     * cell operators.
     *
     * @return {string} a string corresponding to the name of the only cell operator to use if automatic
     * choice is disabled,
     *         or an empty string if the SIM card will automatically choose among available
     *         cell operators
     *
     * On failure, throws an exception or returns YCellular.LOCKEDOPERATOR_INVALID.
     */
    get_lockedOperator() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_LOCKEDOPERATOR_INVALID;
                }
            }
            return _this10._lockedOperator;
        })();
    }

    /**
     * Changes the name of the cell operator to be used. If the name is an empty
     * string, the choice will be made automatically based on the SIM card. Otherwise,
     * the selected operator is the only one that will be used.
     *
     * @param newval {string} : a string corresponding to the name of the cell operator to be used
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lockedOperator(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this11._setAttr('lockedOperator', rest_val);
        })();
    }

    /**
     * Returns true if the airplane mode is active (radio turned off).
     *
     * @return {number} either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according to true
     * if the airplane mode is active (radio turned off)
     *
     * On failure, throws an exception or returns YCellular.AIRPLANEMODE_INVALID.
     */
    get_airplaneMode() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_AIRPLANEMODE_INVALID;
                }
            }
            return _this12._airplaneMode;
        })();
    }

    /**
     * Changes the activation state of airplane mode (radio turned off).
     *
     * @param newval {number} : either YCellular.AIRPLANEMODE_OFF or YCellular.AIRPLANEMODE_ON, according
     * to the activation state of airplane mode (radio turned off)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_airplaneMode(newval) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this13._setAttr('airplaneMode', rest_val);
        })();
    }

    /**
     * Returns the condition for enabling IP data services (GPRS).
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @return {number} a value among YCellular.ENABLEDATA_HOMENETWORK, YCellular.ENABLEDATA_ROAMING and
     * YCellular.ENABLEDATA_NEVER corresponding to the condition for enabling IP data services (GPRS)
     *
     * On failure, throws an exception or returns YCellular.ENABLEDATA_INVALID.
     */
    get_enableData() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_ENABLEDATA_INVALID;
                }
            }
            return _this14._enableData;
        })();
    }

    /**
     * Changes the condition for enabling IP data services (GPRS).
     * The service can be either fully deactivated, or limited to the SIM home network,
     * or enabled for all partner networks (roaming). Caution: enabling data services
     * on roaming networks may cause prohibitive communication costs !
     *
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @param newval {number} : a value among YCellular.ENABLEDATA_HOMENETWORK,
     * YCellular.ENABLEDATA_ROAMING and YCellular.ENABLEDATA_NEVER corresponding to the condition for
     * enabling IP data services (GPRS)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enableData(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this15._setAttr('enableData', rest_val);
        })();
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @return {string} a string corresponding to the Access Point Name (APN) to be used, if needed
     *
     * On failure, throws an exception or returns YCellular.APN_INVALID.
     */
    get_apn() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_APN_INVALID;
                }
            }
            return _this16._apn;
        })();
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @param newval {string} : a string
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_apn(newval) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this17._setAttr('apn', rest_val);
        })();
    }

    /**
     * Returns an opaque string if APN authentication parameters have been configured
     * in the device, or an empty string otherwise.
     * To configure these parameters, use set_apnAuth().
     *
     * @return {string} a string corresponding to an opaque string if APN authentication parameters have
     * been configured
     *         in the device, or an empty string otherwise
     *
     * On failure, throws an exception or returns YCellular.APNSECRET_INVALID.
     */
    get_apnSecret() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            if (_this18._cacheExpiration <= _this18._yapi.GetTickCount()) {
                if ((yield _this18.load(_this18._yapi.defaultCacheValidity)) != _this18._yapi.SUCCESS) {
                    return Y_APNSECRET_INVALID;
                }
            }
            return _this18._apnSecret;
        })();
    }

    set_apnSecret(newval) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this19._setAttr('apnSecret', rest_val);
        })();
    }

    /**
     * Returns the automated connectivity check interval, in seconds.
     *
     * @return {number} an integer corresponding to the automated connectivity check interval, in seconds
     *
     * On failure, throws an exception or returns YCellular.PINGINTERVAL_INVALID.
     */
    get_pingInterval() {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            if (_this20._cacheExpiration <= _this20._yapi.GetTickCount()) {
                if ((yield _this20.load(_this20._yapi.defaultCacheValidity)) != _this20._yapi.SUCCESS) {
                    return Y_PINGINTERVAL_INVALID;
                }
            }
            return _this20._pingInterval;
        })();
    }

    /**
     * Changes the automated connectivity check interval, in seconds.
     *
     * @param newval {number} : an integer corresponding to the automated connectivity check interval, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pingInterval(newval) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this21._setAttr('pingInterval', rest_val);
        })();
    }

    get_command() {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            if (_this22._cacheExpiration <= _this22._yapi.GetTickCount()) {
                if ((yield _this22.load(_this22._yapi.defaultCacheValidity)) != _this22._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this22._command;
        })();
    }

    set_command(newval) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this23._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a cellular interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCellular.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YCellular} a YCellular object allowing you to drive the cellular interface.
     */
    static FindCellular(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Cellular', func);
        if (obj == null) {
            obj = new YCellular(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Cellular', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a cellular interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the cellular interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YCellular.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YCellular} a YCellular object allowing you to drive the cellular interface.
     */
    static FindCellularInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Cellular', func);
        if (obj == null) {
            obj = new YCellular(yctx, func);
            _yocto_api.YFunction._AddToCache('Cellular', func, obj);
        }
        return obj;
    }

    /**
     * Sends a PUK code to unlock the SIM card after three failed PIN code attempts, and
     * setup a new PIN into the SIM card. Only ten consecutives tentatives are permitted:
     * after that, the SIM card will be blocked permanently without any mean of recovery
     * to use it again. Note that after calling this method, you have usually to invoke
     * method set_pin() to tell the YoctoHub which PIN to use in the future.
     *
     * @param puk {string} : the SIM PUK code
     * @param newPin {string} : new PIN code to configure into the SIM card
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendPUK(puk, newPin) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let gsmMsg;
            gsmMsg = yield _this24.get_message();
            if (!(gsmMsg == 'Enter SIM PUK')) {
                return _this24._throw(_this24._yapi.INVALID_ARGUMENT, 'PUK not expected at this time', _this24._yapi.INVALID_ARGUMENT);
            }
            if (newPin == '') {
                return yield _this24.set_command('AT+CPIN=' + puk + ',0000;+CLCK=SC,0,0000');
            }
            return yield _this24.set_command('AT+CPIN=' + puk + ',' + newPin);
        })();
    }

    /**
     * Configure authentication parameters to connect to the APN. Both
     * PAP and CHAP authentication are supported.
     *
     * @param username {string} : APN username
     * @param password {string} : APN password
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_apnAuth(username, password) {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            return yield _this25.set_apnSecret(username + ',' + password);
        })();
    }

    /**
     * Sends an AT command to the GSM module and returns the command output.
     * The command will only execute when the GSM module is in standard
     * command state, and should leave it in the exact same state.
     * Use this function with great care !
     *
     * @param cmd {string} : the AT command to execute, like for instance: "+CCLK?".
     *
     * @return {string} a string with the result of the commands. Empty lines are
     *         automatically removed from the output.
     */
    _AT(cmd) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let chrPos;
            /** @type {number} **/
            let cmdLen;
            /** @type {number} **/
            let waitMore;
            /** @type {string} **/
            let res;
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {string} **/
            let buffstr;
            /** @type {number} **/
            let buffstrlen;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let suffixlen;
            // quote dangerous characters used in AT commands
            cmdLen = cmd.length;
            chrPos = cmd.indexOf('#');
            while (chrPos >= 0) {
                cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '23' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
                cmdLen = cmdLen + 2;
                chrPos = cmd.indexOf('#');
            }
            chrPos = cmd.indexOf('+');
            while (chrPos >= 0) {
                cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '2B' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
                cmdLen = cmdLen + 2;
                chrPos = cmd.indexOf('+');
            }
            chrPos = cmd.indexOf('=');
            while (chrPos >= 0) {
                cmd = cmd.substr(0, chrPos) + '' + String.fromCharCode(37) + '3D' + cmd.substr(chrPos + 1, cmdLen - chrPos - 1);
                cmdLen = cmdLen + 2;
                chrPos = cmd.indexOf('=');
            }
            cmd = 'at.txt?cmd=' + cmd;
            res = '';
            // max 2 minutes (each iteration may take up to 5 seconds if waiting)
            waitMore = 24;
            while (waitMore > 0) {
                buff = yield _this26._download(cmd);
                bufflen = buff.length;
                buffstr = _this26._yapi.imm_bin2str(buff);
                buffstrlen = buffstr.length;
                idx = bufflen - 1;
                while (idx > 0 && buff[idx] != 64 && buff[idx] != 10 && buff[idx] != 13) {
                    idx = idx - 1;
                }
                if (buff[idx] == 64) {
                    suffixlen = bufflen - idx;
                    cmd = 'at.txt?cmd=' + buffstr.substr(buffstrlen - suffixlen, suffixlen);
                    buffstr = buffstr.substr(0, buffstrlen - suffixlen);
                    waitMore = waitMore - 1;
                } else {
                    waitMore = 0;
                }
                res = res + '' + buffstr;
            }
            return res;
        })();
    }

    /**
     * Returns the list detected cell operators in the neighborhood.
     * This function will typically take between 30 seconds to 1 minute to
     * return. Note that any SIM card can usually only connect to specific
     * operators. All networks returned by this function might therefore
     * not be available for connection.
     *
     * @return {string[]} a list of string (cell operator names).
     */
    get_availableOperators() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let cops;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let slen;
            /** @type {string[]} **/
            let res = [];
            // may throw an exception
            cops = yield _this27._AT('+COPS=?');
            slen = cops.length;
            res.length = 0;
            idx = cops.indexOf('(');
            while (idx >= 0) {
                slen = slen - (idx + 1);
                cops = cops.substr(idx + 1, slen);
                idx = cops.indexOf('"');
                if (idx > 0) {
                    slen = slen - (idx + 1);
                    cops = cops.substr(idx + 1, slen);
                    idx = cops.indexOf('"');
                    if (idx > 0) {
                        res.push(cops.substr(0, idx));
                    }
                }
                idx = cops.indexOf('(');
            }
            return res;
        })();
    }

    /**
     * Returns a list of nearby cellular antennas, as required for quick
     * geolocation of the device. The first cell listed is the serving
     * cell, and the next ones are the neighboor cells reported by the
     * serving cell.
     *
     * @return {YCellRecord[]} a list of YCellRecords.
     */
    quickCellSurvey() {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let moni;
            /** @type {string[]} **/
            let recs = [];
            /** @type {number} **/
            let llen;
            /** @type {string} **/
            let mccs;
            /** @type {number} **/
            let mcc;
            /** @type {string} **/
            let mncs;
            /** @type {number} **/
            let mnc;
            /** @type {number} **/
            let lac;
            /** @type {number} **/
            let cellId;
            /** @type {string} **/
            let dbms;
            /** @type {number} **/
            let dbm;
            /** @type {string} **/
            let tads;
            /** @type {number} **/
            let tad;
            /** @type {string} **/
            let oper;
            /** @type {YCellRecord[]} **/
            let res = [];
            // may throw an exception
            moni = yield _this28._AT('+CCED=0;#MONI=7;#MONI');
            mccs = moni.substr(7, 3);
            if (mccs.substr(0, 1) == '0') {
                mccs = mccs.substr(1, 2);
            }
            if (mccs.substr(0, 1) == '0') {
                mccs = mccs.substr(1, 1);
            }
            mcc = _this28._yapi.imm_atoi(mccs);
            mncs = moni.substr(11, 3);
            if (mncs.substr(2, 1) == ',') {
                mncs = mncs.substr(0, 2);
            }
            if (mncs.substr(0, 1) == '0') {
                mncs = mncs.substr(1, mncs.length - 1);
            }
            mnc = _this28._yapi.imm_atoi(mncs);
            recs = moni.split('#');
            // process each line in turn
            res.length = 0;
            for (let ii in recs) {
                llen = recs[ii].length - 2;
                if (llen >= 44) {
                    if (recs[ii].substr(41, 3) == 'dbm') {
                        lac = parseInt(recs[ii].substr(16, 4), 16);
                        cellId = parseInt(recs[ii].substr(23, 4), 16);
                        dbms = recs[ii].substr(37, 4);
                        if (dbms.substr(0, 1) == ' ') {
                            dbms = dbms.substr(1, 3);
                        }
                        dbm = _this28._yapi.imm_atoi(dbms);
                        if (llen > 66) {
                            tads = recs[ii].substr(54, 2);
                            if (tads.substr(0, 1) == ' ') {
                                tads = tads.substr(1, 3);
                            }
                            tad = _this28._yapi.imm_atoi(tads);
                            oper = recs[ii].substr(66, llen - 66);
                        } else {
                            tad = -1;
                            oper = '';
                        }
                        if (lac < 65535) {
                            res.push(new YCellRecord(mcc, mnc, lac, cellId, dbm, tad, oper));
                        }
                    }
                }
                ;;
            }
            return res;
        })();
    }

    /**
     * Continues the enumeration of cellular interfaces started using yFirstCellular().
     *
     * @return {YCellular} a pointer to a YCellular object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    nextCellular() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YCellular.FindCellularInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @return {YCellular} a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstCellular() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Cellular');
        if (next_hwid == null) return null;
        return YCellular.FindCellular(next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YCellular.nextCellular() to iterate on
     * next cellular interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YCellular} a pointer to a YCellular object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstCellularInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Cellular');
        if (next_hwid == null) return null;
        return YCellular.FindCellularInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YCellular implementation)
}

exports.YCellular = YCellular; //
// YCellularProxy Class: synchronous proxy to YCellular objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YCellular objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YCellularProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (generated code: YCellular accessors declaration)

    /**
     * Returns the link quality, expressed in percent.
     *
     * @return an integer corresponding to the link quality, expressed in percent
     *
     * On failure, throws an exception or returns Y_LINKQUALITY_INVALID.
     */
    get_linkQuality() {
        return this.liveFunc._linkQuality;
    }

    /**
     * Returns the name of the cell operator currently in use.
     *
     * @return a string corresponding to the name of the cell operator currently in use
     *
     * On failure, throws an exception or returns Y_CELLOPERATOR_INVALID.
     */
    get_cellOperator() {
        return this.liveFunc._cellOperator;
    }

    /**
     * Returns the unique identifier of the cellular antenna in use: MCC, MNC, LAC and Cell ID.
     *
     * @return a string corresponding to the unique identifier of the cellular antenna in use: MCC, MNC,
     * LAC and Cell ID
     *
     * On failure, throws an exception or returns Y_CELLIDENTIFIER_INVALID.
     */
    get_cellIdentifier() {
        return this.liveFunc._cellIdentifier;
    }

    /**
     * Active cellular connection type.
     *
     * @return a value among Y_CELLTYPE_GPRS, Y_CELLTYPE_EGPRS, Y_CELLTYPE_WCDMA, Y_CELLTYPE_HSDPA,
     * Y_CELLTYPE_NONE and Y_CELLTYPE_CDMA
     *
     * On failure, throws an exception or returns Y_CELLTYPE_INVALID.
     */
    get_cellType() {
        return this.liveFunc._cellType;
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns Y_IMSI_INVALID.
     */
    get_imsi() {
        return this.liveFunc._imsi;
    }

    /**
     * Returns the latest status message from the wireless interface.
     *
     * @return a string corresponding to the latest status message from the wireless interface
     *
     * On failure, throws an exception or returns Y_MESSAGE_INVALID.
     */
    get_message() {
        return this.liveFunc._message;
    }

    /**
     * Returns an opaque string if a PIN code has been configured in the device to access
     * the SIM card, or an empty string if none has been configured or if the code provided
     * was rejected by the SIM card.
     *
     * @return a string corresponding to an opaque string if a PIN code has been configured in the device to access
     *         the SIM card, or an empty string if none has been configured or if the code provided
     *         was rejected by the SIM card
     *
     * On failure, throws an exception or returns Y_PIN_INVALID.
     */
    get_pin() {
        return this.liveFunc._pin;
    }

    /**
     * Changes the PIN code used by the module to access the SIM card.
     * This function does not change the code on the SIM card itself, but only changes
     * the parameter used by the device to try to get access to it. If the SIM code
     * does not work immediately on first try, it will be automatically forgotten
     * and the message will be set to "Enter SIM PIN". The method should then be
     * invoked again with right correct PIN code. After three failed attempts in a row,
     * the message is changed to "Enter SIM PUK" and the SIM card PUK code must be
     * provided using method sendPUK.
     *
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval : a string corresponding to the PIN code used by the module to access the SIM card
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pin(newval) {
        this.liveFunc.set_pin(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the name of the only cell operator to use if automatic choice is disabled,
     * or an empty string if the SIM card will automatically choose among available
     * cell operators.
     *
     * @return a string corresponding to the name of the only cell operator to use if automatic choice is disabled,
     *         or an empty string if the SIM card will automatically choose among available
     *         cell operators
     *
     * On failure, throws an exception or returns Y_LOCKEDOPERATOR_INVALID.
     */
    get_lockedOperator() {
        return this.liveFunc._lockedOperator;
    }

    /**
     * Changes the name of the cell operator to be used. If the name is an empty
     * string, the choice will be made automatically based on the SIM card. Otherwise,
     * the selected operator is the only one that will be used.
     *
     * @param newval : a string corresponding to the name of the cell operator to be used
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_lockedOperator(newval) {
        this.liveFunc.set_lockedOperator(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns true if the airplane mode is active (radio turned off).
     *
     * @return either Y_AIRPLANEMODE_OFF or Y_AIRPLANEMODE_ON, according to true if the airplane mode is
     * active (radio turned off)
     *
     * On failure, throws an exception or returns Y_AIRPLANEMODE_INVALID.
     */
    get_airplaneMode() {
        return this.liveFunc._airplaneMode;
    }

    /**
     * Changes the activation state of airplane mode (radio turned off).
     *
     * @param newval : either Y_AIRPLANEMODE_OFF or Y_AIRPLANEMODE_ON, according to the activation state
     * of airplane mode (radio turned off)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_airplaneMode(newval) {
        this.liveFunc.set_airplaneMode(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the condition for enabling IP data services (GPRS).
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @return a value among Y_ENABLEDATA_HOMENETWORK, Y_ENABLEDATA_ROAMING and Y_ENABLEDATA_NEVER
     * corresponding to the condition for enabling IP data services (GPRS)
     *
     * On failure, throws an exception or returns Y_ENABLEDATA_INVALID.
     */
    get_enableData() {
        return this.liveFunc._enableData;
    }

    /**
     * Changes the condition for enabling IP data services (GPRS).
     * The service can be either fully deactivated, or limited to the SIM home network,
     * or enabled for all partner networks (roaming). Caution: enabling data services
     * on roaming networks may cause prohibitive communication costs !
     *
     * When data services are disabled, SMS are the only mean of communication.
     *
     * @param newval : a value among Y_ENABLEDATA_HOMENETWORK, Y_ENABLEDATA_ROAMING and Y_ENABLEDATA_NEVER
     * corresponding to the condition for enabling IP data services (GPRS)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_enableData(newval) {
        this.liveFunc.set_enableData(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @return a string corresponding to the Access Point Name (APN) to be used, if needed
     *
     * On failure, throws an exception or returns Y_APN_INVALID.
     */
    get_apn() {
        return this.liveFunc._apn;
    }

    /**
     * Returns the Access Point Name (APN) to be used, if needed.
     * When left blank, the APN suggested by the cell operator will be used.
     *
     * @param newval : a string
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_apn(newval) {
        this.liveFunc.set_apn(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns an opaque string if APN authentication parameters have been configured
     * in the device, or an empty string otherwise.
     * To configure these parameters, use set_apnAuth().
     *
     * @return a string corresponding to an opaque string if APN authentication parameters have been configured
     *         in the device, or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_APNSECRET_INVALID.
     */
    get_apnSecret() {
        return this.liveFunc._apnSecret;
    }

    set_apnSecret(newval) {
        this.liveFunc.set_apnSecret(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the automated connectivity check interval, in seconds.
     *
     * @return an integer corresponding to the automated connectivity check interval, in seconds
     *
     * On failure, throws an exception or returns Y_PINGINTERVAL_INVALID.
     */
    get_pingInterval() {
        return this.liveFunc._pingInterval;
    }

    /**
     * Changes the automated connectivity check interval, in seconds.
     *
     * @param newval : an integer corresponding to the automated connectivity check interval, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pingInterval(newval) {
        this.liveFunc.set_pingInterval(newval);
        return this._yapi.SUCCESS;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Sends a PUK code to unlock the SIM card after three failed PIN code attempts, and
     * setup a new PIN into the SIM card. Only ten consecutives tentatives are permitted:
     * after that, the SIM card will be blocked permanently without any mean of recovery
     * to use it again. Note that after calling this method, you have usually to invoke
     * method set_pin() to tell the YoctoHub which PIN to use in the future.
     *
     * @param puk : the SIM PUK code
     * @param newPin : new PIN code to configure into the SIM card
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendPUK(puk, newPin) {
        this.liveFunc.sendPUK(puk, newPin);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YCellular accessors declaration)
}

exports.YCellularProxy = YCellularProxy; //--- (generated code: Cellular functions)

/**
 * Retrieves a cellular interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the cellular interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YCellular.isOnline() to test if the cellular interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a cellular interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the cellular interface
 *
 * @return {YCellular} a YCellular object allowing you to drive the cellular interface.
 */

function yFindCellular(func) {
    return YCellular.FindCellular(func);
}

/**
 * Starts the enumeration of cellular interfaces currently accessible.
 * Use the method YCellular.nextCellular() to iterate on
 * next cellular interfaces.
 *
 * @return {YCellular} a pointer to a YCellular object, corresponding to
 *         the first cellular interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstCellular() {
    return YCellular.FirstCellular();
}

//--- (end of generated code: Cellular functions)
