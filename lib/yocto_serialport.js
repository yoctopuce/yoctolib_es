/*********************************************************************
 *
 * $Id: yocto_serialport.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for SerialPort functions
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
exports.YSerialPortProxy = exports.YSerialPort = exports.Y_SERIALMODE_INVALID = exports.Y_PROTOCOL_INVALID = exports.Y_COMMAND_INVALID = exports.Y_STARTUPJOB_INVALID = exports.Y_CURRENTJOB_INVALID = exports.Y_LASTMSG_INVALID = exports.Y_TXMSGCOUNT_INVALID = exports.Y_RXMSGCOUNT_INVALID = exports.Y_ERRCOUNT_INVALID = exports.Y_TXCOUNT_INVALID = exports.Y_RXCOUNT_INVALID = exports.Y_VOLTAGELEVEL_INVALID = exports.Y_VOLTAGELEVEL_RS485 = exports.Y_VOLTAGELEVEL_RS232 = exports.Y_VOLTAGELEVEL_TTL5VR = exports.Y_VOLTAGELEVEL_TTL5V = exports.Y_VOLTAGELEVEL_TTL3VR = exports.Y_VOLTAGELEVEL_TTL3V = exports.Y_VOLTAGELEVEL_OFF = undefined;
exports.yFindSerialPort = yFindSerialPort;
exports.yFirstSerialPort = yFirstSerialPort;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (generated code: YSerialPort return codes)
//--- (end of generated code: YSerialPort return codes)
//--- (generated code: YSerialPort definitions)
var Y_VOLTAGELEVEL_OFF = exports.Y_VOLTAGELEVEL_OFF = 0;
var Y_VOLTAGELEVEL_TTL3V = exports.Y_VOLTAGELEVEL_TTL3V = 1;
var Y_VOLTAGELEVEL_TTL3VR = exports.Y_VOLTAGELEVEL_TTL3VR = 2;
var Y_VOLTAGELEVEL_TTL5V = exports.Y_VOLTAGELEVEL_TTL5V = 3;
var Y_VOLTAGELEVEL_TTL5VR = exports.Y_VOLTAGELEVEL_TTL5VR = 4;
var Y_VOLTAGELEVEL_RS232 = exports.Y_VOLTAGELEVEL_RS232 = 5;
var Y_VOLTAGELEVEL_RS485 = exports.Y_VOLTAGELEVEL_RS485 = 6;
var Y_VOLTAGELEVEL_INVALID = exports.Y_VOLTAGELEVEL_INVALID = -1;
var Y_RXCOUNT_INVALID = exports.Y_RXCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_TXCOUNT_INVALID = exports.Y_TXCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_ERRCOUNT_INVALID = exports.Y_ERRCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_RXMSGCOUNT_INVALID = exports.Y_RXMSGCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_TXMSGCOUNT_INVALID = exports.Y_TXMSGCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_LASTMSG_INVALID = exports.Y_LASTMSG_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CURRENTJOB_INVALID = exports.Y_CURRENTJOB_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_STARTUPJOB_INVALID = exports.Y_STARTUPJOB_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_PROTOCOL_INVALID = exports.Y_PROTOCOL_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SERIALMODE_INVALID = exports.Y_SERIALMODE_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YSerialPort definitions)

//--- (generated code: YSerialPort class start)
/**
 * YSerialPort Class: SerialPort function interface
 *
 * The SerialPort function interface allows you to fully drive a Yoctopuce
 * serial port, to send and receive data, and to configure communication
 * parameters (baud rate, bit count, parity, flow control and protocol).
 * Note that Yoctopuce serial ports are not exposed as virtual COM ports.
 * They are meant to be used in the same way as all Yoctopuce devices.
 */
//--- (end of generated code: YSerialPort class start)

class YSerialPort extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YSerialPort constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'SerialPort';
        /** @member {number} **/
        this._rxCount = Y_RXCOUNT_INVALID;
        /** @member {number} **/
        this._txCount = Y_TXCOUNT_INVALID;
        /** @member {number} **/
        this._errCount = Y_ERRCOUNT_INVALID;
        /** @member {number} **/
        this._rxMsgCount = Y_RXMSGCOUNT_INVALID;
        /** @member {number} **/
        this._txMsgCount = Y_TXMSGCOUNT_INVALID;
        /** @member {string} **/
        this._lastMsg = Y_LASTMSG_INVALID;
        /** @member {string} **/
        this._currentJob = Y_CURRENTJOB_INVALID;
        /** @member {string} **/
        this._startupJob = Y_STARTUPJOB_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        /** @member {number} **/
        this._voltageLevel = Y_VOLTAGELEVEL_INVALID;
        /** @member {string} **/
        this._protocol = Y_PROTOCOL_INVALID;
        /** @member {string} **/
        this._serialMode = Y_SERIALMODE_INVALID;
        /** @member {number} **/
        this._rxptr = 0;
        this.imm_setConst({
            RXCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            TXCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            ERRCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            RXMSGCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            TXMSGCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            LASTMSG_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CURRENTJOB_INVALID: _yocto_api.YAPI.INVALID_STRING,
            STARTUPJOB_INVALID: _yocto_api.YAPI.INVALID_STRING,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING,
            VOLTAGELEVEL_OFF: 0,
            VOLTAGELEVEL_TTL3V: 1,
            VOLTAGELEVEL_TTL3VR: 2,
            VOLTAGELEVEL_TTL5V: 3,
            VOLTAGELEVEL_TTL5VR: 4,
            VOLTAGELEVEL_RS232: 5,
            VOLTAGELEVEL_RS485: 6,
            VOLTAGELEVEL_INVALID: -1,
            PROTOCOL_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SERIALMODE_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YSerialPort constructor)
    }

    //--- (generated code: YSerialPort implementation)

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
            var res = new YSerialPortProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'rxCount':
                this._rxCount = parseInt(val);
                return 1;
            case 'txCount':
                this._txCount = parseInt(val);
                return 1;
            case 'errCount':
                this._errCount = parseInt(val);
                return 1;
            case 'rxMsgCount':
                this._rxMsgCount = parseInt(val);
                return 1;
            case 'txMsgCount':
                this._txMsgCount = parseInt(val);
                return 1;
            case 'lastMsg':
                this._lastMsg = val;
                return 1;
            case 'currentJob':
                this._currentJob = val;
                return 1;
            case 'startupJob':
                this._startupJob = val;
                return 1;
            case 'command':
                this._command = val;
                return 1;
            case 'voltageLevel':
                this._voltageLevel = parseInt(val);
                return 1;
            case 'protocol':
                this._protocol = val;
                return 1;
            case 'serialMode':
                this._serialMode = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return {number} an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXCOUNT_INVALID.
     */
    get_rxCount() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_RXCOUNT_INVALID;
                }
            }
            return _this2._rxCount;
        })();
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return {number} an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXCOUNT_INVALID.
     */
    get_txCount() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration <= _this3._yapi.GetTickCount()) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_TXCOUNT_INVALID;
                }
            }
            return _this3._txCount;
        })();
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return {number} an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns YSerialPort.ERRCOUNT_INVALID.
     */
    get_errCount() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_ERRCOUNT_INVALID;
                }
            }
            return _this4._errCount;
        })();
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return {number} an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns YSerialPort.RXMSGCOUNT_INVALID.
     */
    get_rxMsgCount() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_RXMSGCOUNT_INVALID;
                }
            }
            return _this5._rxMsgCount;
        })();
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return {number} an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns YSerialPort.TXMSGCOUNT_INVALID.
     */
    get_txMsgCount() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_TXMSGCOUNT_INVALID;
                }
            }
            return _this6._txMsgCount;
        })();
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return {string} a string corresponding to the latest message fully received (for Line, Frame and
     * Modbus protocols)
     *
     * On failure, throws an exception or returns YSerialPort.LASTMSG_INVALID.
     */
    get_lastMsg() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_LASTMSG_INVALID;
                }
            }
            return _this7._lastMsg;
        })();
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return {string} a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns YSerialPort.CURRENTJOB_INVALID.
     */
    get_currentJob() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_CURRENTJOB_INVALID;
                }
            }
            return _this8._currentJob;
        })();
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the job to use when the device is powered on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentJob(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this9._setAttr('currentJob', rest_val);
        })();
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return {string} a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns YSerialPort.STARTUPJOB_INVALID.
     */
    get_startupJob() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_STARTUPJOB_INVALID;
                }
            }
            return _this10._startupJob;
        })();
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the job to use when the device is powered on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupJob(newval) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this11._setAttr('startupJob', rest_val);
        })();
    }

    get_command() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            if (_this12._cacheExpiration <= _this12._yapi.GetTickCount()) {
                if ((yield _this12.load(_this12._yapi.defaultCacheValidity)) != _this12._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this12._command;
        })();
    }

    set_command(newval) {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this13._setAttr('command', rest_val);
        })();
    }

    /**
     * Returns the voltage level used on the serial line.
     *
     * @return {number} a value among YSerialPort.VOLTAGELEVEL_OFF, YSerialPort.VOLTAGELEVEL_TTL3V,
     * YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V, YSerialPort.VOLTAGELEVEL_TTL5VR,
     * YSerialPort.VOLTAGELEVEL_RS232 and YSerialPort.VOLTAGELEVEL_RS485 corresponding to the voltage
     * level used on the serial line
     *
     * On failure, throws an exception or returns YSerialPort.VOLTAGELEVEL_INVALID.
     */
    get_voltageLevel() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_VOLTAGELEVEL_INVALID;
                }
            }
            return _this14._voltageLevel;
        })();
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     *
     * @param newval {number} : a value among YSerialPort.VOLTAGELEVEL_OFF,
     * YSerialPort.VOLTAGELEVEL_TTL3V, YSerialPort.VOLTAGELEVEL_TTL3VR, YSerialPort.VOLTAGELEVEL_TTL5V,
     * YSerialPort.VOLTAGELEVEL_TTL5VR, YSerialPort.VOLTAGELEVEL_RS232 and YSerialPort.VOLTAGELEVEL_RS485
     * corresponding to the voltage type used on the serial line
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageLevel(newval) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this15._setAttr('voltageLevel', rest_val);
        })();
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return {string} a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns YSerialPort.PROTOCOL_INVALID.
     */
    get_protocol() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._cacheExpiration <= _this16._yapi.GetTickCount()) {
                if ((yield _this16.load(_this16._yapi.defaultCacheValidity)) != _this16._yapi.SUCCESS) {
                    return Y_PROTOCOL_INVALID;
                }
            }
            return _this16._protocol;
        })();
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     *
     * @param newval {string} : a string corresponding to the type of protocol used over the serial line
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_protocol(newval) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this17._setAttr('protocol', rest_val);
        })();
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return {string} a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns YSerialPort.SERIALMODE_INVALID.
     */
    get_serialMode() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            if (_this18._cacheExpiration <= _this18._yapi.GetTickCount()) {
                if ((yield _this18.load(_this18._yapi.defaultCacheValidity)) != _this18._yapi.SUCCESS) {
                    return Y_SERIALMODE_INVALID;
                }
            }
            return _this18._serialMode;
        })();
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @param newval {string} : a string corresponding to the serial port communication parameters, with a
     * string such as
     *         "9600,8N1"
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_serialMode(newval) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this19._setAttr('serialMode', rest_val);
        })();
    }

    /**
     * Retrieves a serial port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the serial port
     *
     * @return {YSerialPort} a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPort(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('SerialPort', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a serial port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the serial port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YSerialPort.isOnline() to test if the serial port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a serial port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the serial port
     *
     * @return {YSerialPort} a YSerialPort object allowing you to drive the serial port.
     */
    static FindSerialPortInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'SerialPort', func);
        if (obj == null) {
            obj = new YSerialPort(yctx, func);
            _yocto_api.YFunction._AddToCache('SerialPort', func, obj);
        }
        return obj;
    }

    sendCommand(text) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            return yield _this20.set_command(text);
        })();
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset() {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            _this21._rxptr = 0;
            // may throw an exception
            return yield _this21.sendCommand('Z');
        })();
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code {number} : the byte to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeByte(code) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            return yield _this22.sendCommand('$' + ('00' + code.toString(16)).slice(-2));
        })();
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text {string} : the text string to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(text) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let ch;
            buff = _this23._yapi.imm_str2bin(text);
            bufflen = buff.length;
            if (bufflen < 100) {
                ch = 0x20;
                idx = 0;
                while (idx < bufflen && ch != 0) {
                    ch = buff[idx];
                    if (ch >= 0x20 && ch < 0x7f) {
                        idx = idx + 1;
                    } else {
                        ch = 0;
                    }
                }
                if (idx >= bufflen) {
                    return yield _this23.sendCommand('+' + text);
                }
            }
            // send string using file upload
            return yield _this23._upload('txdata', buff);
        })();
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff {Uint8Array} : the binary buffer to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeBin(buff) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            return yield _this24._upload('txdata', buff);
        })();
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList {Integer[]} : a list of byte codes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeArray(byteList) {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let hexb;
            /** @type {number} **/
            let res;
            bufflen = byteList.length;
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = byteList[idx];
                buff.set([hexb], idx);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this25._upload('txdata', buff);
            return res;
        })();
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString {string} : a string of hexadecimal byte codes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeHex(hexString) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let hexb;
            /** @type {number} **/
            let res;
            bufflen = hexString.length;
            if (bufflen < 100) {
                return yield _this26.sendCommand('$' + hexString);
            }
            bufflen = bufflen >> 1;
            buff = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                hexb = parseInt(hexString.substr(2 * idx, 2), 16);
                buff.set([hexb], idx);
                idx = idx + 1;
            }
            // may throw an exception
            res = yield _this26._upload('txdata', buff);
            return res;
        })();
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text {string} : the text string to send
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(text) {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let ch;
            buff = _this27._yapi.imm_str2bin(text + '\r\n');
            bufflen = buff.length - 2;
            if (bufflen < 100) {
                ch = 0x20;
                idx = 0;
                while (idx < bufflen && ch != 0) {
                    ch = buff[idx];
                    if (ch >= 0x20 && ch < 0x7f) {
                        idx = idx + 1;
                    } else {
                        ch = 0;
                    }
                }
                if (idx >= bufflen) {
                    return yield _this27.sendCommand('!' + text);
                }
            }
            // send string using file upload
            return yield _this27._upload('txdata', buff);
        })();
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return {number} the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readByte() {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let mult;
            /** @type {number} **/
            let endpos;
            /** @type {number} **/
            let res;
            // may throw an exception
            buff = yield _this28._download('rxdata.bin?pos=' + String(Math.round(_this28._rxptr)) + '&len=1');
            bufflen = buff.length - 1;
            endpos = 0;
            mult = 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                endpos = endpos + mult * (buff[bufflen] - 48);
                mult = mult * 10;
                bufflen = bufflen - 1;
            }
            _this28._rxptr = endpos;
            if (bufflen == 0) {
                return _this28._yapi.NO_MORE_DATA;
            }
            res = buff[0];
            return res;
        })();
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of characters to read
     *
     * @return {string} a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readStr(nChars) {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let mult;
            /** @type {number} **/
            let endpos;
            /** @type {string} **/
            let res;
            if (nChars > 65535) {
                nChars = 65535;
            }
            // may throw an exception
            buff = yield _this29._download('rxdata.bin?pos=' + String(Math.round(_this29._rxptr)) + '&len=' + String(Math.round(nChars)));
            bufflen = buff.length - 1;
            endpos = 0;
            mult = 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                endpos = endpos + mult * (buff[bufflen] - 48);
                mult = mult * 10;
                bufflen = bufflen - 1;
            }
            _this29._rxptr = endpos;
            res = _this29._yapi.imm_bin2str(buff).substr(0, bufflen);
            return res;
        })();
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Uint8Array} a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readBin(nChars) {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let mult;
            /** @type {number} **/
            let endpos;
            /** @type {number} **/
            let idx;
            /** @type {Uint8Array} **/
            let res;
            if (nChars > 65535) {
                nChars = 65535;
            }
            // may throw an exception
            buff = yield _this30._download('rxdata.bin?pos=' + String(Math.round(_this30._rxptr)) + '&len=' + String(Math.round(nChars)));
            bufflen = buff.length - 1;
            endpos = 0;
            mult = 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                endpos = endpos + mult * (buff[bufflen] - 48);
                mult = mult * 10;
                bufflen = bufflen - 1;
            }
            _this30._rxptr = endpos;
            res = new Uint8Array(bufflen);
            idx = 0;
            while (idx < bufflen) {
                res.set([buff[idx]], idx);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Integer[]} a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readArray(nChars) {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let mult;
            /** @type {number} **/
            let endpos;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let b;
            /** @type {number[]} **/
            let res = [];
            if (nChars > 65535) {
                nChars = 65535;
            }
            // may throw an exception
            buff = yield _this31._download('rxdata.bin?pos=' + String(Math.round(_this31._rxptr)) + '&len=' + String(Math.round(nChars)));
            bufflen = buff.length - 1;
            endpos = 0;
            mult = 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                endpos = endpos + mult * (buff[bufflen] - 48);
                mult = mult * 10;
                bufflen = bufflen - 1;
            }
            _this31._rxptr = endpos;
            res.length = 0;
            idx = 0;
            while (idx < bufflen) {
                b = buff[idx];
                res.push(b);
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes {number} : the maximum number of bytes to read
     *
     * @return {string} a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readHex(nBytes) {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let mult;
            /** @type {number} **/
            let endpos;
            /** @type {number} **/
            let ofs;
            /** @type {string} **/
            let res;
            if (nBytes > 65535) {
                nBytes = 65535;
            }
            // may throw an exception
            buff = yield _this32._download('rxdata.bin?pos=' + String(Math.round(_this32._rxptr)) + '&len=' + String(Math.round(nBytes)));
            bufflen = buff.length - 1;
            endpos = 0;
            mult = 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                endpos = endpos + mult * (buff[bufflen] - 48);
                mult = mult * 10;
                bufflen = bufflen - 1;
            }
            _this32._rxptr = endpos;
            res = '';
            ofs = 0;
            while (ofs + 3 < bufflen) {
                res = res + '' + ('00' + buff[ofs].toString(16)).slice(-2) + '' + ('00' + buff[ofs + 1].toString(16)).slice(-2) + '' + ('00' + buff[ofs + 2].toString(16)).slice(-2) + '' + ('00' + buff[ofs + 3].toString(16)).slice(-2);
                ofs = ofs + 4;
            }
            while (ofs < bufflen) {
                res = res + '' + ('00' + buff[ofs].toString(16)).slice(-2);
                ofs = ofs + 1;
            }
            return res;
        })();
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or frame protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return {string} a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readLine() {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let url;
            /** @type {Uint8Array} **/
            let msgbin;
            /** @type {string[]} **/
            let msgarr = [];
            /** @type {number} **/
            let msglen;
            /** @type {string} **/
            let res;
            // may throw an exception
            url = 'rxmsg.json?pos=' + String(Math.round(_this33._rxptr)) + '&len=1&maxw=1';
            msgbin = yield _this33._download(url);
            msgarr = _this33.imm_json_get_array(msgbin);
            msglen = msgarr.length;
            if (msglen == 0) {
                return '';
            }
            // last element of array is the new position
            msglen = msglen - 1;
            _this33._rxptr = _this33._yapi.imm_atoi(msgarr[msglen]);
            if (msglen == 0) {
                return '';
            }
            res = _this33.imm_json_get_string(_this33._yapi.imm_str2bin(msgarr[0]));
            return res;
        })();
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern {string} : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait {number} : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return {string[]} an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    readMessages(pattern, maxWait) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let url;
            /** @type {Uint8Array} **/
            let msgbin;
            /** @type {string[]} **/
            let msgarr = [];
            /** @type {number} **/
            let msglen;
            /** @type {string[]} **/
            let res = [];
            /** @type {number} **/
            let idx;
            // may throw an exception
            url = 'rxmsg.json?pos=' + String(Math.round(_this34._rxptr)) + '&maxw=' + String(Math.round(maxWait)) + '&pat=' + pattern;
            msgbin = yield _this34._download(url);
            msgarr = _this34.imm_json_get_array(msgbin);
            msglen = msgarr.length;
            if (msglen == 0) {
                return res;
            }
            // last element of array is the new position
            msglen = msglen - 1;
            _this34._rxptr = _this34._yapi.imm_atoi(msgarr[msglen]);
            idx = 0;
            while (idx < msglen) {
                res.push(_this34.imm_json_get_string(_this34._yapi.imm_str2bin(msgarr[idx])));
                idx = idx + 1;
            }
            return res;
        })();
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the API object
     * for the next read operations.
     *
     * @param absPos {number} : the absolute position index for next read operations.
     *
     * @return {number} nothing.
     */
    read_seek(absPos) {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            _this35._rxptr = absPos;
            return _this35._yapi.SUCCESS;
        })();
    }

    /**
     * Returns the current absolute stream position pointer of the API object.
     *
     * @return {number} the absolute position index for next read operations.
     */
    read_tell() {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            return _this36._rxptr;
        })();
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the API object.
     *
     * @return {number} the number of bytes available to read
     */
    read_avail() {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let bufflen;
            /** @type {number} **/
            let res;
            // may throw an exception
            buff = yield _this37._download('rxcnt.bin?pos=' + String(Math.round(_this37._rxptr)));
            bufflen = buff.length - 1;
            while (bufflen > 0 && buff[bufflen] != 64) {
                bufflen = bufflen - 1;
            }
            res = _this37._yapi.imm_atoi(_this37._yapi.imm_bin2str(buff).substr(0, bufflen));
            return res;
        })();
    }

    /**
     * Sends a text line query to the serial port, and reads the reply, if any.
     * This function is intended to be used when the serial port is configured for 'Line' protocol.
     *
     * @param query {string} : the line query to send (without CR/LF)
     * @param maxWait {number} : the maximum number of milliseconds to wait for a reply.
     *
     * @return {string} the next text line received after sending the text query, as a string.
     *         Additional lines can be obtained by calling readLine or readMessages.
     *
     * On failure, throws an exception or returns an empty array.
     */
    queryLine(query, maxWait) {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let url;
            /** @type {Uint8Array} **/
            let msgbin;
            /** @type {string[]} **/
            let msgarr = [];
            /** @type {number} **/
            let msglen;
            /** @type {string} **/
            let res;
            // may throw an exception
            url = 'rxmsg.json?len=1&maxw=' + String(Math.round(maxWait)) + '&cmd=!' + query;
            msgbin = yield _this38._download(url);
            msgarr = _this38.imm_json_get_array(msgbin);
            msglen = msgarr.length;
            if (msglen == 0) {
                return '';
            }
            // last element of array is the new position
            msglen = msglen - 1;
            _this38._rxptr = _this38._yapi.imm_atoi(msgarr[msglen]);
            if (msglen == 0) {
                return '';
            }
            res = _this38.imm_json_get_string(_this38._yapi.imm_str2bin(msgarr[0]));
            return res;
        })();
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile {string} : name of the job file to save on the device filesystem
     * @param jsonDef {string} : a string containing a JSON definition of the job
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    uploadJob(jobfile, jsonDef) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            yield _this39._upload(jobfile, _this39._yapi.imm_str2bin(jsonDef));
            return _this39._yapi.SUCCESS;
        })();
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile {string} : name of the job file (on the device filesystem)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectJob(jobfile) {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            return yield _this40.set_currentJob(jobfile);
        })();
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val {number} : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_RTS(val) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            return yield _this41.sendCommand('R' + String(Math.round(val)));
        })();
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return {number} 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_CTS() {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let buff;
            /** @type {number} **/
            let res;
            // may throw an exception
            buff = yield _this42._download('cts.txt');
            if (!(buff.length == 1)) {
                return _this42._throw(_this42._yapi.IO_ERROR, 'invalid CTS reply', _this42._yapi.IO_ERROR);
            }
            res = buff[0] - 48;
            return res;
        })();
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString {string} : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeMODBUS(hexString) {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            return yield _this43.sendCommand(':' + hexString);
        })();
    }

    /**
     * Sends a message to a specified MODBUS slave connected to the serial port, and reads the
     * reply, if any. The message is the PDU, provided as a vector of bytes.
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduBytes {Integer[]} : the message to send (PDU), as a vector of bytes. The first byte of the
     *         PDU is the MODBUS function code.
     *
     * @return {Integer[]} the received reply, as a vector of bytes.
     *
     * On failure, throws an exception or returns an empty array (or a MODBUS error reply).
     */
    queryMODBUS(slaveNo, pduBytes) {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let funCode;
            /** @type {number} **/
            let nib;
            /** @type {number} **/
            let i;
            /** @type {string} **/
            let cmd;
            /** @type {string} **/
            let url;
            /** @type {string} **/
            let pat;
            /** @type {Uint8Array} **/
            let msgs;
            /** @type {string[]} **/
            let reps = [];
            /** @type {string} **/
            let rep;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let replen;
            /** @type {number} **/
            let hexb;
            funCode = pduBytes[0];
            nib = funCode >> 4;
            pat = ('00' + slaveNo.toString(16)).slice(-2) + '[' + nib.toString(16) + '' + (nib + 8).toString(16) + ']' + (funCode & 15).toString(16) + '.*';
            cmd = ('00' + slaveNo.toString(16)).slice(-2) + '' + ('00' + funCode.toString(16)).slice(-2);
            i = 1;
            while (i < pduBytes.length) {
                cmd = cmd + '' + ('00' + (pduBytes[i] & 0xff).toString(16)).slice(-2);
                i = i + 1;
            }
            // may throw an exception
            url = 'rxmsg.json?cmd=:' + cmd + '&pat=:' + pat;
            msgs = yield _this44._download(url);
            reps = _this44.imm_json_get_array(msgs);
            if (!(reps.length > 1)) {
                return _this44._throw(_this44._yapi.IO_ERROR, 'no reply from slave', res);
            }
            if (reps.length > 1) {
                rep = _this44.imm_json_get_string(_this44._yapi.imm_str2bin(reps[0]));
                replen = rep.length - 3 >> 1;
                i = 0;
                while (i < replen) {
                    hexb = parseInt(rep.substr(2 * i + 3, 2), 16);
                    res.push(hexb);
                    i = i + 1;
                }
                if (res[0] != funCode) {
                    i = res[1];
                    if (!(i > 1)) {
                        return _this44._throw(_this44._yapi.NOT_SUPPORTED, 'MODBUS error: unsupported function code', res);
                    }
                    if (!(i > 2)) {
                        return _this44._throw(_this44._yapi.INVALID_ARGUMENT, 'MODBUS error: illegal data address', res);
                    }
                    if (!(i > 3)) {
                        return _this44._throw(_this44._yapi.INVALID_ARGUMENT, 'MODBUS error: illegal data value', res);
                    }
                    if (!(i > 4)) {
                        return _this44._throw(_this44._yapi.INVALID_ARGUMENT, 'MODBUS error: failed to execute function', res);
                    }
                }
            }
            return res;
        })();
    }

    /**
     * Reads one or more contiguous internal bits (or coil status) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x01 (Read Coils).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first bit/coil to read (zero-based)
     * @param nBits {number} : the number of bits/coils to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    modbusReadBits(slaveNo, pduAddr, nBits) {
        var _this45 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let bitpos;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let val;
            /** @type {number} **/
            let mask;
            pdu.push(0x01);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nBits >> 8);
            pdu.push(nBits & 0xff);
            // may throw an exception
            reply = yield _this45.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            bitpos = 0;
            idx = 2;
            val = reply[idx];
            mask = 1;
            while (bitpos < nBits) {
                if ((val & mask) == 0) {
                    res.push(0);
                } else {
                    res.push(1);
                }
                bitpos = bitpos + 1;
                if (mask == 0x80) {
                    idx = idx + 1;
                    val = reply[idx];
                    mask = 1;
                } else {
                    mask = mask << 1;
                }
            }
            return res;
        })();
    }

    /**
     * Reads one or more contiguous input bits (or discrete inputs) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x02 (Read Discrete Inputs).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first bit/input to read (zero-based)
     * @param nBits {number} : the number of bits/inputs to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one bit.
     *
     * On failure, throws an exception or returns an empty array.
     */
    modbusReadInputBits(slaveNo, pduAddr, nBits) {
        var _this46 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let bitpos;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let val;
            /** @type {number} **/
            let mask;
            pdu.push(0x02);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nBits >> 8);
            pdu.push(nBits & 0xff);
            // may throw an exception
            reply = yield _this46.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            bitpos = 0;
            idx = 2;
            val = reply[idx];
            mask = 1;
            while (bitpos < nBits) {
                if ((val & mask) == 0) {
                    res.push(0);
                } else {
                    res.push(1);
                }
                bitpos = bitpos + 1;
                if (mask == 0x80) {
                    idx = idx + 1;
                    val = reply[idx];
                    mask = 1;
                } else {
                    mask = mask << 1;
                }
            }
            return res;
        })();
    }

    /**
     * Reads one or more contiguous internal registers (holding registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x03 (Read Holding Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first holding register to read (zero-based)
     * @param nWords {number} : the number of holding registers to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit register value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    modbusReadRegisters(slaveNo, pduAddr, nWords) {
        var _this47 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let regpos;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let val;
            pdu.push(0x03);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nWords >> 8);
            pdu.push(nWords & 0xff);
            // may throw an exception
            reply = yield _this47.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            regpos = 0;
            idx = 2;
            while (regpos < nWords) {
                val = reply[idx] << 8;
                idx = idx + 1;
                val = val + reply[idx];
                idx = idx + 1;
                res.push(val);
                regpos = regpos + 1;
            }
            return res;
        })();
    }

    /**
     * Reads one or more contiguous input registers (read-only registers) from a MODBUS serial device.
     * This method uses the MODBUS function code 0x04 (Read Input Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to query
     * @param pduAddr {number} : the relative address of the first input register to read (zero-based)
     * @param nWords {number} : the number of input registers to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit input value.
     *
     * On failure, throws an exception or returns an empty array.
     */
    modbusReadInputRegisters(slaveNo, pduAddr, nWords) {
        var _this48 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let regpos;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let val;
            pdu.push(0x04);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nWords >> 8);
            pdu.push(nWords & 0xff);
            // may throw an exception
            reply = yield _this48.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            regpos = 0;
            idx = 2;
            while (regpos < nWords) {
                val = reply[idx] << 8;
                idx = idx + 1;
                val = val + reply[idx];
                idx = idx + 1;
                res.push(val);
                regpos = regpos + 1;
            }
            return res;
        })();
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the bit/coil to set (zero-based)
     * @param value {number} : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return {number} the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBit(slaveNo, pduAddr, value) {
        var _this49 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number} **/
            let res;
            res = 0;
            if (value != 0) {
                value = 0xff;
            }
            pdu.push(0x05);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(value);
            pdu.push(0x00);
            // may throw an exception
            reply = yield _this49.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            res = 1;
            return res;
        })();
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the first bit/coil to set (zero-based)
     * @param bits {Integer[]} : the vector of bits to be set (one integer per bit)
     *
     * @return {number} the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBits(slaveNo, pduAddr, bits) {
        var _this50 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let nBits;
            /** @type {number} **/
            let nBytes;
            /** @type {number} **/
            let bitpos;
            /** @type {number} **/
            let val;
            /** @type {number} **/
            let mask;
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number} **/
            let res;
            res = 0;
            nBits = bits.length;
            nBytes = nBits + 7 >> 3;
            pdu.push(0x0f);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nBits >> 8);
            pdu.push(nBits & 0xff);
            pdu.push(nBytes);
            bitpos = 0;
            val = 0;
            mask = 1;
            while (bitpos < nBits) {
                if (bits[bitpos] != 0) {
                    val = val | mask;
                }
                bitpos = bitpos + 1;
                if (mask == 0x80) {
                    pdu.push(val);
                    val = 0;
                    mask = 1;
                } else {
                    mask = mask << 1;
                }
            }
            if (mask != 1) {
                pdu.push(val);
            }
            // may throw an exception
            reply = yield _this50.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            res = reply[3] << 8;
            res = res + reply[4];
            return res;
        })();
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the register to set (zero-based)
     * @param value {number} : the 16 bit value to set
     *
     * @return {number} the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegister(slaveNo, pduAddr, value) {
        var _this51 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number} **/
            let res;
            res = 0;
            if (value != 0) {
                value = 0xff;
            }
            pdu.push(0x06);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(value >> 8);
            pdu.push(value & 0xff);
            // may throw an exception
            reply = yield _this51.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            res = 1;
            return res;
        })();
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduAddr {number} : the relative address of the first internal register to set (zero-based)
     * @param values {Integer[]} : the vector of 16 bit values to set
     *
     * @return {number} the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegisters(slaveNo, pduAddr, values) {
        var _this52 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let nWords;
            /** @type {number} **/
            let nBytes;
            /** @type {number} **/
            let regpos;
            /** @type {number} **/
            let val;
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number} **/
            let res;
            res = 0;
            nWords = values.length;
            nBytes = 2 * nWords;
            pdu.push(0x10);
            pdu.push(pduAddr >> 8);
            pdu.push(pduAddr & 0xff);
            pdu.push(nWords >> 8);
            pdu.push(nWords & 0xff);
            pdu.push(nBytes);
            regpos = 0;
            while (regpos < nWords) {
                val = values[regpos];
                pdu.push(val >> 8);
                pdu.push(val & 0xff);
                regpos = regpos + 1;
            }
            // may throw an exception
            reply = yield _this52.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            res = reply[3] << 8;
            res = res + reply[4];
            return res;
        })();
    }

    /**
     * Sets several contiguous internal registers (holding registers) on a MODBUS serial device,
     * then performs a contiguous read of a set of (possibly different) internal registers.
     * This method uses the MODBUS function code 0x17 (Read/Write Multiple Registers).
     *
     * @param slaveNo {number} : the address of the slave MODBUS device to drive
     * @param pduWriteAddr {number} : the relative address of the first internal register to set (zero-based)
     * @param values {Integer[]} : the vector of 16 bit values to set
     * @param pduReadAddr {number} : the relative address of the first internal register to read (zero-based)
     * @param nReadWords {number} : the number of 16 bit values to read
     *
     * @return {Integer[]} a vector of integers, each corresponding to one 16-bit register value read.
     *
     * On failure, throws an exception or returns an empty array.
     */
    modbusWriteAndReadRegisters(slaveNo, pduWriteAddr, values, pduReadAddr, nReadWords) {
        var _this53 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let nWriteWords;
            /** @type {number} **/
            let nBytes;
            /** @type {number} **/
            let regpos;
            /** @type {number} **/
            let val;
            /** @type {number} **/
            let idx;
            /** @type {number[]} **/
            let pdu = [];
            /** @type {number[]} **/
            let reply = [];
            /** @type {number[]} **/
            let res = [];
            nWriteWords = values.length;
            nBytes = 2 * nWriteWords;
            pdu.push(0x17);
            pdu.push(pduReadAddr >> 8);
            pdu.push(pduReadAddr & 0xff);
            pdu.push(nReadWords >> 8);
            pdu.push(nReadWords & 0xff);
            pdu.push(pduWriteAddr >> 8);
            pdu.push(pduWriteAddr & 0xff);
            pdu.push(nWriteWords >> 8);
            pdu.push(nWriteWords & 0xff);
            pdu.push(nBytes);
            regpos = 0;
            while (regpos < nWriteWords) {
                val = values[regpos];
                pdu.push(val >> 8);
                pdu.push(val & 0xff);
                regpos = regpos + 1;
            }
            // may throw an exception
            reply = yield _this53.queryMODBUS(slaveNo, pdu);
            if (reply.length == 0) {
                return res;
            }
            if (reply[0] != pdu[0]) {
                return res;
            }
            regpos = 0;
            idx = 2;
            while (regpos < nReadWords) {
                val = reply[idx] << 8;
                idx = idx + 1;
                val = val + reply[idx];
                idx = idx + 1;
                res.push(val);
                regpos = regpos + 1;
            }
            return res;
        })();
    }

    /**
     * Continues the enumeration of serial ports started using yFirstSerialPort().
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         a serial port currently online, or a null pointer
     *         if there are no more serial ports to enumerate.
     */
    nextSerialPort() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPort() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('SerialPort');
        if (next_hwid == null) return null;
        return YSerialPort.FindSerialPort(next_hwid);
    }

    /**
     * Starts the enumeration of serial ports currently accessible.
     * Use the method YSerialPort.nextSerialPort() to iterate on
     * next serial ports.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
     *         the first serial port currently online, or a null pointer
     *         if there are none.
     */
    static FirstSerialPortInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('SerialPort');
        if (next_hwid == null) return null;
        return YSerialPort.FindSerialPortInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YSerialPort implementation)
}

exports.YSerialPort = YSerialPort; //
// YSerialPortProxy Class: synchronous proxy to YSerialPort objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YSerialPort objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YSerialPortProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    _asyncInit() {
        var _this54 = this;

        return _asyncToGenerator(function* () {
            _this54.liveFunc._cachedCTS = yield _this54.liveFunc.get_CTS();
            _this54.liveFunc._nextByte = _yocto_api.YAPI.NO_MORE_DATA;
            _this54.liveFunc._nextStr = null;
            _this54.liveFunc._nextBin = null;
            _this54.liveFunc._nextArray = null;
            _this54.liveFunc._nextHex = null;
            _this54.liveFunc._nextLine = null;
            _this54.liveFunc._nextMessages = null;
            _this54.liveFunc._nextAvail = null;
        })();
    }

    /**
     * Manually sets the state of the RTS line. This function has no effect when
     * hardware handshake is enabled, as the RTS line is driven automatically.
     *
     * @param val {number} : 1 to turn RTS on, 0 to turn RTS off
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_RTS(val) {
        this.liveFunc.set_RTS(val);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Reads the level of the CTS line. The CTS line is usually driven by
     * the RTS signal of the connected serial device.
     *
     * @return {number} 1 if the CTS line is high, 0 if the CTS line is low.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_CTS() {
        var _this55 = this;

        this.liveFunc.get_CTS().then(function (nextCTS) {
            _this55.liveFunc._cachedCTS = nextCTS;
        });
        return this.liveFunc._cachedCTS;
    }

    /**
     * Reads one byte from the receive buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer,
     * or if there is no data available yet, the function returns YAPI.NO_MORE_DATA.
     *
     * @return {number} the next byte
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readByte() {
        var _this56 = this;

        let res = this.liveFunc._nextByte;
        if (res == _yocto_api.YAPI.NO_MORE_DATA) {
            this.liveFunc.readByte().then(function (nextByte) {
                _this56.liveFunc._nextByte = nextByte;
            });
        } else {
            this.liveFunc._nextByte = _yocto_api.YAPI.NO_MORE_DATA;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of characters to read
     *
     * @return {string} a string with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readStr(nChars) {
        var _this57 = this;

        let res = this.liveFunc._nextStr;
        if (!res) {
            this.liveFunc.readStr(nChars).then(function (nextStr) {
                _this57.liveFunc._nextStr = nextStr;
            });
            res = '';
        } else {
            this.liveFunc._nextStr = '';
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a binary buffer, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Uint8Array} a binary object with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readBin(nChars) {
        var _this58 = this;

        let res = this.liveFunc._nextBin;
        if (!res) {
            this.liveFunc.readBin(nChars).then(function (nextBin) {
                _this58.liveFunc._nextBin = nextBin;
            });
            res = new Uint8Array(0);
        } else {
            this.liveFunc._nextBin = null;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a list of bytes, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nChars {number} : the maximum number of bytes to read
     *
     * @return {Integer[]} a sequence of bytes with receive buffer contents
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readArray(nChars) {
        var _this59 = this;

        let res = this.liveFunc._nextArray;
        if (!res) {
            this.liveFunc.readArray(nChars).then(function (nextArray) {
                _this59.liveFunc._nextArray = nextArray;
            });
            res = [];
        } else {
            this.liveFunc._nextArray = null;
        }
        return res;
    }

    /**
     * Reads data from the receive buffer as a hexadecimal string, starting at current stream position.
     * If data at current stream position is not available anymore in the receive buffer, the
     * function performs a short read.
     *
     * @param nBytes {number} : the maximum number of bytes to read
     *
     * @return {string} a string with receive buffer contents, encoded in hexadecimal
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readHex(nBytes) {
        var _this60 = this;

        let res = this.liveFunc._nextHex;
        if (!res) {
            this.liveFunc.readHex(nBytes).then(function (nextHex) {
                _this60.liveFunc._nextHex = nextHex;
            });
            res = '';
        } else {
            this.liveFunc._nextHex = null;
        }
        return res;
    }

    /**
     * Reads a single line (or message) from the receive buffer, starting at current stream position.
     * This function is intended to be used when the serial port is configured for a message protocol,
     * such as 'Line' mode or MODBUS protocols.
     *
     * If data at current stream position is not available anymore in the receive buffer,
     * the function returns the oldest available line and moves the stream position just after.
     * If no new full line is received, the function returns an empty line.
     *
     * @return {string} a string with a single line of text
     *
     * On failure, throws an exception or returns a negative error code.
     */
    readLine() {
        var _this61 = this;

        let res = this.liveFunc._nextLine;
        if (!res) {
            this.liveFunc.readLine().then(function (nextLine) {
                _this61.liveFunc._nextLine = nextLine;
            });
            res = '';
        } else {
            this.liveFunc._nextLine = null;
        }
        return res;
    }

    /**
     * Searches for incoming messages in the serial port receive buffer matching a given pattern,
     * starting at current position. This function will only compare and return printable characters
     * in the message strings. Binary protocols are handled as hexadecimal strings.
     *
     * The search returns all messages matching the expression provided as argument in the buffer.
     * If no matching message is found, the search waits for one up to the specified maximum timeout
     * (in milliseconds).
     *
     * @param pattern {string} : a limited regular expression describing the expected message format,
     *         or an empty string if all messages should be returned (no filtering).
     *         When using binary protocols, the format applies to the hexadecimal
     *         representation of the message.
     * @param maxWait {number} : the maximum number of milliseconds to wait for a message if none is found
     *         in the receive buffer.
     *
     * @return {string[]} an array of strings containing the messages found, if any.
     *         Binary messages are converted to hexadecimal representation.
     *
     * On failure, throws an exception or returns an empty array.
     */
    readMessages(pattern, maxWait) {
        var _this62 = this;

        let res = this.liveFunc._nextMessages;
        if (!res) {
            this.liveFunc.readMessages(pattern, maxWait).then(function (nextMessages) {
                _this62.liveFunc._nextMessages = nextMessages;
            });
            res = [];
        } else {
            this.liveFunc._nextMessages = null;
        }
        return res;
    }

    /**
     * Changes the current internal stream position to the specified value. This function
     * does not affect the device, it only changes the value stored in the YSerialPort object
     * for the next read operations.
     *
     * @param absPos {number} : the absolute position index for next read operations.
     *
     * @return {number} nothing.
     */
    read_seek(absPos) {
        this.liveFunc._rxptr = absPos;
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current absolute stream position pointer of the YSerialPort object.
     *
     * @return {number} the absolute position index for next read operations.
     */
    read_tell() {
        return this.liveFunc._rxptr;
    }

    /**
     * Returns the number of bytes available to read in the input buffer starting from the
     * current absolute stream position pointer of the YSerialPort object.
     *
     * @return {number} the number of bytes available to read
     */
    read_avail() {
        var _this63 = this;

        let res = this.liveFunc._nextAvail;
        if (!res) {
            this.liveFunc.read_avail().then(function (nextAvail) {
                _this63.liveFunc._nextAvail = nextAvail;
            });
            res = '';
        } else {
            this.liveFunc._nextAvail = null;
        }
        return res;
    }

    //--- (generated code: YSerialPort accessors declaration)

    /**
     * Returns the total number of bytes received since last reset.
     *
     * @return an integer corresponding to the total number of bytes received since last reset
     *
     * On failure, throws an exception or returns Y_RXCOUNT_INVALID.
     */
    get_rxCount() {
        return this.liveFunc._rxCount;
    }

    /**
     * Returns the total number of bytes transmitted since last reset.
     *
     * @return an integer corresponding to the total number of bytes transmitted since last reset
     *
     * On failure, throws an exception or returns Y_TXCOUNT_INVALID.
     */
    get_txCount() {
        return this.liveFunc._txCount;
    }

    /**
     * Returns the total number of communication errors detected since last reset.
     *
     * @return an integer corresponding to the total number of communication errors detected since last reset
     *
     * On failure, throws an exception or returns Y_ERRCOUNT_INVALID.
     */
    get_errCount() {
        return this.liveFunc._errCount;
    }

    /**
     * Returns the total number of messages received since last reset.
     *
     * @return an integer corresponding to the total number of messages received since last reset
     *
     * On failure, throws an exception or returns Y_RXMSGCOUNT_INVALID.
     */
    get_rxMsgCount() {
        return this.liveFunc._rxMsgCount;
    }

    /**
     * Returns the total number of messages send since last reset.
     *
     * @return an integer corresponding to the total number of messages send since last reset
     *
     * On failure, throws an exception or returns Y_TXMSGCOUNT_INVALID.
     */
    get_txMsgCount() {
        return this.liveFunc._txMsgCount;
    }

    /**
     * Returns the latest message fully received (for Line, Frame and Modbus protocols).
     *
     * @return a string corresponding to the latest message fully received (for Line, Frame and Modbus protocols)
     *
     * On failure, throws an exception or returns Y_LASTMSG_INVALID.
     */
    get_lastMsg() {
        return this.liveFunc._lastMsg;
    }

    /**
     * Returns the name of the job file currently in use.
     *
     * @return a string corresponding to the name of the job file currently in use
     *
     * On failure, throws an exception or returns Y_CURRENTJOB_INVALID.
     */
    get_currentJob() {
        return this.liveFunc._currentJob;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_currentJob(newval) {
        this.liveFunc.set_currentJob(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the job file to use when the device is powered on.
     *
     * @return a string corresponding to the job file to use when the device is powered on
     *
     * On failure, throws an exception or returns Y_STARTUPJOB_INVALID.
     */
    get_startupJob() {
        return this.liveFunc._startupJob;
    }

    /**
     * Changes the job to use when the device is powered on.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the job to use when the device is powered on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_startupJob(newval) {
        this.liveFunc.set_startupJob(newval);
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
     * Returns the voltage level used on the serial line.
     *
     * @return a value among Y_VOLTAGELEVEL_OFF, Y_VOLTAGELEVEL_TTL3V, Y_VOLTAGELEVEL_TTL3VR,
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232 and Y_VOLTAGELEVEL_RS485
     * corresponding to the voltage level used on the serial line
     *
     * On failure, throws an exception or returns Y_VOLTAGELEVEL_INVALID.
     */
    get_voltageLevel() {
        return this.liveFunc._voltageLevel;
    }

    /**
     * Changes the voltage type used on the serial line. Valid
     * values  will depend on the Yoctopuce device model featuring
     * the serial port feature.  Check your device documentation
     * to find out which values are valid for that specific model.
     * Trying to set an invalid value will have no effect.
     *
     * @param newval : a value among Y_VOLTAGELEVEL_OFF, Y_VOLTAGELEVEL_TTL3V, Y_VOLTAGELEVEL_TTL3VR,
     * Y_VOLTAGELEVEL_TTL5V, Y_VOLTAGELEVEL_TTL5VR, Y_VOLTAGELEVEL_RS232 and Y_VOLTAGELEVEL_RS485
     * corresponding to the voltage type used on the serial line
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_voltageLevel(newval) {
        this.liveFunc.set_voltageLevel(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the type of protocol used over the serial line, as a string.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     *
     * @return a string corresponding to the type of protocol used over the serial line, as a string
     *
     * On failure, throws an exception or returns Y_PROTOCOL_INVALID.
     */
    get_protocol() {
        return this.liveFunc._protocol;
    }

    /**
     * Changes the type of protocol used over the serial line.
     * Possible values are "Line" for ASCII messages separated by CR and/or LF,
     * "Frame:[timeout]ms" for binary messages separated by a delay time,
     * "Modbus-ASCII" for MODBUS messages in ASCII mode,
     * "Modbus-RTU" for MODBUS messages in RTU mode,
     * "Char" for a continuous ASCII stream or
     * "Byte" for a continuous binary stream.
     * The suffix "/[wait]ms" can be added to reduce the transmit rate so that there
     * is always at lest the specified number of milliseconds between each bytes sent.
     *
     * @param newval : a string corresponding to the type of protocol used over the serial line
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_protocol(newval) {
        this.liveFunc.set_protocol(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the serial port communication parameters, as a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix is included
     * if flow control is active: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @return a string corresponding to the serial port communication parameters, as a string such as
     *         "9600,8N1"
     *
     * On failure, throws an exception or returns Y_SERIALMODE_INVALID.
     */
    get_serialMode() {
        return this.liveFunc._serialMode;
    }

    /**
     * Changes the serial port communication parameters, with a string such as
     * "9600,8N1". The string includes the baud rate, the number of data bits,
     * the parity, and the number of stop bits. An optional suffix can be added
     * to enable flow control: "CtsRts" for hardware handshake, "XOnXOff"
     * for logical flow control and "Simplex" for acquiring a shared bus using
     * the RTS line (as used by some RS485 adapters for instance).
     *
     * @param newval : a string corresponding to the serial port communication parameters, with a string such as
     *         "9600,8N1"
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_serialMode(newval) {
        this.liveFunc.set_serialMode(newval);
        return this._yapi.SUCCESS;
    }

    sendCommand(text) {
        this.liveFunc.sendCommand(text);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Clears the serial port buffer and resets counters to zero.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    reset() {
        this.liveFunc.reset();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a single byte to the serial port.
     *
     * @param code : the byte to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeByte(code) {
        this.liveFunc.writeByte(code);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, as is.
     *
     * @param text : the text string to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeStr(text) {
        this.liveFunc.writeStr(text);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a binary buffer to the serial port, as is.
     *
     * @param buff : the binary buffer to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeBin(buff) {
        this.liveFunc.writeBin(buff);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a byte sequence (provided as a list of bytes) to the serial port.
     *
     * @param byteList : a list of byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeArray(byteList) {
        this.liveFunc.writeArray(byteList);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a byte sequence (provided as a hexadecimal string) to the serial port.
     *
     * @param hexString : a string of hexadecimal byte codes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeHex(hexString) {
        this.liveFunc.writeHex(hexString);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends an ASCII string to the serial port, followed by a line break (CR LF).
     *
     * @param text : the text string to send
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeLine(text) {
        this.liveFunc.writeLine(text);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Saves the job definition string (JSON data) into a job file.
     * The job file can be later enabled using selectJob().
     *
     * @param jobfile : name of the job file to save on the device filesystem
     * @param jsonDef : a string containing a JSON definition of the job
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    uploadJob(jobfile, jsonDef) {
        this.liveFunc.uploadJob(jobfile, jsonDef);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Load and start processing the specified job file. The file must have
     * been previously created using the user interface or uploaded on the
     * device filesystem using the uploadJob() function.
     *
     * @param jobfile : name of the job file (on the device filesystem)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    selectJob(jobfile) {
        this.liveFunc.selectJob(jobfile);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a MODBUS message (provided as a hexadecimal string) to the serial port.
     * The message must start with the slave address. The MODBUS CRC/LRC is
     * automatically added by the function. This function does not wait for a reply.
     *
     * @param hexString : a hexadecimal message string, including device address but no CRC/LRC
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    writeMODBUS(hexString) {
        this.liveFunc.writeMODBUS(hexString);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets a single internal bit (or coil) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x05 (Write Single Coil).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the bit/coil to set (zero-based)
     * @param value : the value to set (0 for OFF state, non-zero for ON state)
     *
     * @return the number of bits/coils affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBit(slaveNo, pduAddr, value) {
        this.liveFunc.modbusWriteBit(slaveNo, pduAddr, value);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets several contiguous internal bits (or coils) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x0f (Write Multiple Coils).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first bit/coil to set (zero-based)
     * @param bits : the vector of bits to be set (one integer per bit)
     *
     * @return the number of bits/coils affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteBits(slaveNo, pduAddr, bits) {
        this.liveFunc.modbusWriteBits(slaveNo, pduAddr, bits);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets a single internal register (or holding register) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x06 (Write Single Register).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the register to set (zero-based)
     * @param value : the 16 bit value to set
     *
     * @return the number of registers affected on the device (1)
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegister(slaveNo, pduAddr, value) {
        this.liveFunc.modbusWriteRegister(slaveNo, pduAddr, value);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sets several contiguous internal registers (or holding registers) on a MODBUS serial device.
     * This method uses the MODBUS function code 0x10 (Write Multiple Registers).
     *
     * @param slaveNo : the address of the slave MODBUS device to drive
     * @param pduAddr : the relative address of the first internal register to set (zero-based)
     * @param values : the vector of 16 bit values to set
     *
     * @return the number of registers affected on the device
     *
     * On failure, throws an exception or returns zero.
     */
    modbusWriteRegisters(slaveNo, pduAddr, values) {
        this.liveFunc.modbusWriteRegisters(slaveNo, pduAddr, values);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YSerialPort accessors declaration)
}

exports.YSerialPortProxy = YSerialPortProxy; //--- (generated code: SerialPort functions)

/**
 * Retrieves a serial port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the serial port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YSerialPort.isOnline() to test if the serial port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a serial port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the serial port
 *
 * @return {YSerialPort} a YSerialPort object allowing you to drive the serial port.
 */

function yFindSerialPort(func) {
    return YSerialPort.FindSerialPort(func);
}

/**
 * Starts the enumeration of serial ports currently accessible.
 * Use the method YSerialPort.nextSerialPort() to iterate on
 * next serial ports.
 *
 * @return {YSerialPort} a pointer to a YSerialPort object, corresponding to
 *         the first serial port currently online, or a null pointer
 *         if there are none.
 */
function yFirstSerialPort() {
    return YSerialPort.FirstSerialPort();
}

//--- (end of generated code: SerialPort functions)
