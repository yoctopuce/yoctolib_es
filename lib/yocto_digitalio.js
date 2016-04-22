/*********************************************************************
 *
 * $Id: yocto_digitalio.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for DigitalIO functions
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
exports.YDigitalIOProxy = exports.YDigitalIO = exports.Y_COMMAND_INVALID = exports.Y_PORTSIZE_INVALID = exports.Y_PORTPOLARITY_INVALID = exports.Y_PORTOPENDRAIN_INVALID = exports.Y_PORTDIRECTION_INVALID = exports.Y_PORTSTATE_INVALID = exports.Y_OUTPUTVOLTAGE_INVALID = exports.Y_OUTPUTVOLTAGE_EXT_V = exports.Y_OUTPUTVOLTAGE_USB_3V = exports.Y_OUTPUTVOLTAGE_USB_5V = undefined;
exports.yFindDigitalIO = yFindDigitalIO;
exports.yFirstDigitalIO = yFirstDigitalIO;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YDigitalIO return codes)
//--- (end of YDigitalIO return codes)
//--- (YDigitalIO definitions)
var Y_OUTPUTVOLTAGE_USB_5V = exports.Y_OUTPUTVOLTAGE_USB_5V = 0;
var Y_OUTPUTVOLTAGE_USB_3V = exports.Y_OUTPUTVOLTAGE_USB_3V = 1;
var Y_OUTPUTVOLTAGE_EXT_V = exports.Y_OUTPUTVOLTAGE_EXT_V = 2;
var Y_OUTPUTVOLTAGE_INVALID = exports.Y_OUTPUTVOLTAGE_INVALID = -1;
var Y_PORTSTATE_INVALID = exports.Y_PORTSTATE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_PORTDIRECTION_INVALID = exports.Y_PORTDIRECTION_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_PORTOPENDRAIN_INVALID = exports.Y_PORTOPENDRAIN_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_PORTPOLARITY_INVALID = exports.Y_PORTPOLARITY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_PORTSIZE_INVALID = exports.Y_PORTSIZE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YDigitalIO definitions)

//--- (YDigitalIO class start)
/**
 * YDigitalIO Class: Digital IO function interface
 *
 * The Yoctopuce application programming interface allows you to switch the state of each
 * bit of the I/O port. You can switch all bits at once, or one by one. The library
 * can also automatically generate short pulses of a determined duration. Electrical behavior
 * of each I/O can be modified (open drain and reverse polarity).
 */
//--- (end of YDigitalIO class start)

class YDigitalIO extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YDigitalIO constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'DigitalIO';
        /** @member {number} **/
        this._portState = Y_PORTSTATE_INVALID;
        /** @member {number} **/
        this._portDirection = Y_PORTDIRECTION_INVALID;
        /** @member {number} **/
        this._portOpenDrain = Y_PORTOPENDRAIN_INVALID;
        /** @member {number} **/
        this._portPolarity = Y_PORTPOLARITY_INVALID;
        /** @member {number} **/
        this._portSize = Y_PORTSIZE_INVALID;
        /** @member {number} **/
        this._outputVoltage = Y_OUTPUTVOLTAGE_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            PORTSTATE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PORTDIRECTION_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PORTOPENDRAIN_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PORTPOLARITY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PORTSIZE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            OUTPUTVOLTAGE_USB_5V: 0,
            OUTPUTVOLTAGE_USB_3V: 1,
            OUTPUTVOLTAGE_EXT_V: 2,
            OUTPUTVOLTAGE_INVALID: -1,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YDigitalIO constructor)
    }

    //--- (YDigitalIO implementation)

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
            var res = new YDigitalIOProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'portState':
                this._portState = parseInt(val);
                return 1;
            case 'portDirection':
                this._portDirection = parseInt(val);
                return 1;
            case 'portOpenDrain':
                this._portOpenDrain = parseInt(val);
                return 1;
            case 'portPolarity':
                this._portPolarity = parseInt(val);
                return 1;
            case 'portSize':
                this._portSize = parseInt(val);
                return 1;
            case 'outputVoltage':
                this._outputVoltage = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the digital IO port state: bit 0 represents input 0, and so on.
     *
     * @return {number} an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSTATE_INVALID.
     */
    get_portState() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_PORTSTATE_INVALID;
                }
            }
            return _this2._portState;
        })();
    }

    /**
     * Changes the digital IO port state: bit 0 represents input 0, and so on. This function has no effect
     * on bits configured as input in portDirection.
     *
     * @param newval {number} : an integer corresponding to the digital IO port state: bit 0 represents
     * input 0, and so on
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portState(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this3._setAttr('portState', rest_val);
        })();
    }

    /**
     * Returns the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     *
     * @return {number} an integer corresponding to the IO direction of all bits of the port: 0 makes a
     * bit an input, 1 makes it an output
     *
     * On failure, throws an exception or returns YDigitalIO.PORTDIRECTION_INVALID.
     */
    get_portDirection() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_PORTDIRECTION_INVALID;
                }
            }
            return _this4._portDirection;
        })();
    }

    /**
     * Changes the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval {number} : an integer corresponding to the IO direction of all bits of the port: 0
     * makes a bit an input, 1 makes it an output
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portDirection(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this5._setAttr('portDirection', rest_val);
        })();
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @return {number} an integer corresponding to the electrical interface for each bit of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTOPENDRAIN_INVALID.
     */
    get_portOpenDrain() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_PORTOPENDRAIN_INVALID;
                }
            }
            return _this6._portOpenDrain;
        })();
    }

    /**
     * Changes the electrical interface for each bit of the port. 0 makes a bit a regular input/output, 1 makes
     * it an open-drain (open-collector) input/output. Remember to call the
     * saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval {number} : an integer corresponding to the electrical interface for each bit of the port
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portOpenDrain(newval) {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this7._setAttr('portOpenDrain', rest_val);
        })();
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @return {number} an integer corresponding to the polarity of all the bits of the port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTPOLARITY_INVALID.
     */
    get_portPolarity() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            if (_this8._cacheExpiration <= _this8._yapi.GetTickCount()) {
                if ((yield _this8.load(_this8._yapi.defaultCacheValidity)) != _this8._yapi.SUCCESS) {
                    return Y_PORTPOLARITY_INVALID;
                }
            }
            return _this8._portPolarity;
        })();
    }

    /**
     * Changes the polarity of all the bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting will be kept after a reboot.
     *
     * @param newval {number} : an integer corresponding to the polarity of all the bits of the port: 0
     * makes a bit an input, 1 makes it an output
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portPolarity(newval) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this9._setAttr('portPolarity', rest_val);
        })();
    }

    /**
     * Returns the number of bits implemented in the I/O port.
     *
     * @return {number} an integer corresponding to the number of bits implemented in the I/O port
     *
     * On failure, throws an exception or returns YDigitalIO.PORTSIZE_INVALID.
     */
    get_portSize() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            if (_this10._cacheExpiration <= _this10._yapi.GetTickCount()) {
                if ((yield _this10.load(_this10._yapi.defaultCacheValidity)) != _this10._yapi.SUCCESS) {
                    return Y_PORTSIZE_INVALID;
                }
            }
            return _this10._portSize;
        })();
    }

    /**
     * Returns the voltage source used to drive output bits.
     *
     * @return {number} a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V, YDigitalIO.OUTPUTVOLTAGE_USB_3V and
     * YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * On failure, throws an exception or returns YDigitalIO.OUTPUTVOLTAGE_INVALID.
     */
    get_outputVoltage() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_OUTPUTVOLTAGE_INVALID;
                }
            }
            return _this11._outputVoltage;
        })();
    }

    /**
     * Changes the voltage source used to drive output bits.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval {number} : a value among YDigitalIO.OUTPUTVOLTAGE_USB_5V,
     * YDigitalIO.OUTPUTVOLTAGE_USB_3V and YDigitalIO.OUTPUTVOLTAGE_EXT_V corresponding to the voltage
     * source used to drive output bits
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_outputVoltage(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this12._setAttr('outputVoltage', rest_val);
        })();
    }

    get_command() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this13._command;
        })();
    }

    set_command(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this14._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a digital IO port for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the digital IO port
     *
     * @return {YDigitalIO} a YDigitalIO object allowing you to drive the digital IO port.
     */
    static FindDigitalIO(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('DigitalIO', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a digital IO port for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the digital IO port is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YDigitalIO.isOnline() to test if the digital IO port is
     * indeed online at a given time. In case of ambiguity when looking for
     * a digital IO port by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the digital IO port
     *
     * @return {YDigitalIO} a YDigitalIO object allowing you to drive the digital IO port.
     */
    static FindDigitalIOInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'DigitalIO', func);
        if (obj == null) {
            obj = new YDigitalIO(yctx, func);
            _yocto_api.YFunction._AddToCache('DigitalIO', func, obj);
        }
        return obj;
    }

    /**
     * Sets a single bit of the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     * @param bitstate {number} : the state of the bit (1 or 0)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bitState(bitno, bitstate) {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (!(bitstate >= 0)) {
                return _this15._throw(_this15._yapi.INVALID_ARGUMENT, 'invalid bitstate', _this15._yapi.INVALID_ARGUMENT);
            }
            if (!(bitstate <= 1)) {
                return _this15._throw(_this15._yapi.INVALID_ARGUMENT, 'invalid bitstate', _this15._yapi.INVALID_ARGUMENT);
            }
            return yield _this15.set_command(String.fromCharCode(82 + bitstate) + '' + String(Math.round(bitno)));
        })();
    }

    /**
     * Returns the state of a single bit of the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     *
     * @return {number} the bit state (0 or 1)
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_bitState(bitno) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let portVal;
            portVal = yield _this16.get_portState();
            return portVal >> bitno & 1;
        })();
    }

    /**
     * Reverts a single bit of the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    toggle_bitState(bitno) {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            return yield _this17.set_command('T' + String(Math.round(bitno)));
        })();
    }

    /**
     * Changes  the direction of a single bit from the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     * @param bitdirection {number} : direction to set, 0 makes the bit an input, 1 makes it an output.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bitDirection(bitno, bitdirection) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            if (!(bitdirection >= 0)) {
                return _this18._throw(_this18._yapi.INVALID_ARGUMENT, 'invalid direction', _this18._yapi.INVALID_ARGUMENT);
            }
            if (!(bitdirection <= 1)) {
                return _this18._throw(_this18._yapi.INVALID_ARGUMENT, 'invalid direction', _this18._yapi.INVALID_ARGUMENT);
            }
            return yield _this18.set_command(String.fromCharCode(73 + 6 * bitdirection) + '' + String(Math.round(bitno)));
        })();
    }

    /**
     * Returns the direction of a single bit from the I/O port (0 means the bit is an input, 1  an output).
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_bitDirection(bitno) {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let portDir;
            portDir = yield _this19.get_portDirection();
            return portDir >> bitno & 1;
        })();
    }

    /**
     * Changes the polarity of a single bit from the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0.
     * @param bitpolarity {number} : polarity to set, 0 makes the I/O work in regular mode, 1 makes the
     * I/O  works in reverse mode.
     *         Remember to call the   saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bitPolarity(bitno, bitpolarity) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            if (!(bitpolarity >= 0)) {
                return _this20._throw(_this20._yapi.INVALID_ARGUMENT, 'invalid bitpolarity', _this20._yapi.INVALID_ARGUMENT);
            }
            if (!(bitpolarity <= 1)) {
                return _this20._throw(_this20._yapi.INVALID_ARGUMENT, 'invalid bitpolarity', _this20._yapi.INVALID_ARGUMENT);
            }
            return yield _this20.set_command(String.fromCharCode(110 + 4 * bitpolarity) + '' + String(Math.round(bitno)));
        })();
    }

    /**
     * Returns the polarity of a single bit from the I/O port (0 means the I/O works in regular mode, 1
     * means the I/O  works in reverse mode).
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_bitPolarity(bitno) {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let portPol;
            portPol = yield _this21.get_portPolarity();
            return portPol >> bitno & 1;
        })();
    }

    /**
     * Changes  the electrical interface of a single bit from the I/O port.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     * @param opendrain {number} : 0 makes a bit a regular input/output, 1 makes
     *         it an open-drain (open-collector) input/output. Remember to call the
     *         saveToFlash() method to make sure the setting is kept after a reboot.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_bitOpenDrain(bitno, opendrain) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            if (!(opendrain >= 0)) {
                return _this22._throw(_this22._yapi.INVALID_ARGUMENT, 'invalid state', _this22._yapi.INVALID_ARGUMENT);
            }
            if (!(opendrain <= 1)) {
                return _this22._throw(_this22._yapi.INVALID_ARGUMENT, 'invalid state', _this22._yapi.INVALID_ARGUMENT);
            }
            return yield _this22.set_command(String.fromCharCode(100 - 32 * opendrain) + '' + String(Math.round(bitno)));
        })();
    }

    /**
     * Returns the type of electrical interface of a single bit from the I/O port. (0 means the bit is an
     * input, 1  an output).
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     *
     * @return {number}   0 means the a bit is a regular input/output, 1 means the bit is an open-drain
     *         (open-collector) input/output.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    get_bitOpenDrain(bitno) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let portOpenDrain;
            portOpenDrain = yield _this23.get_portOpenDrain();
            return portOpenDrain >> bitno & 1;
        })();
    }

    /**
     * Triggers a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     * @param ms_duration {number} : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulse(bitno, ms_duration) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            return yield _this24.set_command('Z' + String(Math.round(bitno)) + ',0,' + String(Math.round(ms_duration)));
        })();
    }

    /**
     * Schedules a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno {number} : the bit number; lowest bit has index 0
     * @param ms_delay {number} : waiting time before the pulse, in milliseconds
     * @param ms_duration {number} : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    delayedPulse(bitno, ms_delay, ms_duration) {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            return yield _this25.set_command('Z' + String(Math.round(bitno)) + ',' + String(Math.round(ms_delay)) + ',' + String(Math.round(ms_duration)));
        })();
    }

    /**
     * Continues the enumeration of digital IO ports started using yFirstDigitalIO().
     *
     * @return {YDigitalIO} a pointer to a YDigitalIO object, corresponding to
     *         a digital IO port currently online, or a null pointer
     *         if there are no more digital IO ports to enumerate.
     */
    nextDigitalIO() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YDigitalIO.FindDigitalIOInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     *
     * @return {YDigitalIO} a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    static FirstDigitalIO() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('DigitalIO');
        if (next_hwid == null) return null;
        return YDigitalIO.FindDigitalIO(next_hwid);
    }

    /**
     * Starts the enumeration of digital IO ports currently accessible.
     * Use the method YDigitalIO.nextDigitalIO() to iterate on
     * next digital IO ports.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YDigitalIO} a pointer to a YDigitalIO object, corresponding to
     *         the first digital IO port currently online, or a null pointer
     *         if there are none.
     */
    static FirstDigitalIOInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('DigitalIO');
        if (next_hwid == null) return null;
        return YDigitalIO.FindDigitalIOInContext(yctx, next_hwid);
    }

    //--- (end of YDigitalIO implementation)
}

exports.YDigitalIO = YDigitalIO; //
// YDigitalIOProxy Class: synchronous proxy to YDigitalIO objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YDigitalIO objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YDigitalIOProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YDigitalIO accessors declaration)

    /**
     * Returns the digital IO port state: bit 0 represents input 0, and so on.
     *
     * @return an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     *
     * On failure, throws an exception or returns Y_PORTSTATE_INVALID.
     */
    get_portState() {
        return this.liveFunc._portState;
    }

    /**
     * Changes the digital IO port state: bit 0 represents input 0, and so on. This function has no effect
     * on bits configured as input in portDirection.
     *
     * @param newval : an integer corresponding to the digital IO port state: bit 0 represents input 0, and so on
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portState(newval) {
        this.liveFunc.set_portState(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     *
     * @return an integer corresponding to the IO direction of all bits of the port: 0 makes a bit an
     * input, 1 makes it an output
     *
     * On failure, throws an exception or returns Y_PORTDIRECTION_INVALID.
     */
    get_portDirection() {
        return this.liveFunc._portDirection;
    }

    /**
     * Changes the IO direction of all bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the IO direction of all bits of the port: 0 makes a bit
     * an input, 1 makes it an output
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portDirection(newval) {
        this.liveFunc.set_portDirection(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the electrical interface for each bit of the port. For each bit set to 0  the matching I/O
     * works in the regular,
     * intuitive way, for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the electrical interface for each bit of the port
     *
     * On failure, throws an exception or returns Y_PORTOPENDRAIN_INVALID.
     */
    get_portOpenDrain() {
        return this.liveFunc._portOpenDrain;
    }

    /**
     * Changes the electrical interface for each bit of the port. 0 makes a bit a regular input/output, 1 makes
     * it an open-drain (open-collector) input/output. Remember to call the
     * saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : an integer corresponding to the electrical interface for each bit of the port
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portOpenDrain(newval) {
        this.liveFunc.set_portOpenDrain(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the polarity of all the bits of the port.  For each bit set to 0, the matching I/O works the regular,
     * intuitive way; for each bit set to 1, the I/O works in reverse mode.
     *
     * @return an integer corresponding to the polarity of all the bits of the port
     *
     * On failure, throws an exception or returns Y_PORTPOLARITY_INVALID.
     */
    get_portPolarity() {
        return this.liveFunc._portPolarity;
    }

    /**
     * Changes the polarity of all the bits of the port: 0 makes a bit an input, 1 makes it an output.
     * Remember to call the saveToFlash() method  to make sure the setting will be kept after a reboot.
     *
     * @param newval : an integer corresponding to the polarity of all the bits of the port: 0 makes a bit
     * an input, 1 makes it an output
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_portPolarity(newval) {
        this.liveFunc.set_portPolarity(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the number of bits implemented in the I/O port.
     *
     * @return an integer corresponding to the number of bits implemented in the I/O port
     *
     * On failure, throws an exception or returns Y_PORTSIZE_INVALID.
     */
    get_portSize() {
        return this.liveFunc._portSize;
    }

    /**
     * Returns the voltage source used to drive output bits.
     *
     * @return a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and Y_OUTPUTVOLTAGE_EXT_V
     * corresponding to the voltage source used to drive output bits
     *
     * On failure, throws an exception or returns Y_OUTPUTVOLTAGE_INVALID.
     */
    get_outputVoltage() {
        return this.liveFunc._outputVoltage;
    }

    /**
     * Changes the voltage source used to drive output bits.
     * Remember to call the saveToFlash() method  to make sure the setting is kept after a reboot.
     *
     * @param newval : a value among Y_OUTPUTVOLTAGE_USB_5V, Y_OUTPUTVOLTAGE_USB_3V and
     * Y_OUTPUTVOLTAGE_EXT_V corresponding to the voltage source used to drive output bits
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_outputVoltage(newval) {
        this.liveFunc.set_outputVoltage(newval);
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
     * Reverts a single bit of the I/O port.
     *
     * @param bitno : the bit number; lowest bit has index 0
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    toggle_bitState(bitno) {
        this.liveFunc.toggle_bitState(bitno);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Triggers a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    pulse(bitno, ms_duration) {
        this.liveFunc.pulse(bitno, ms_duration);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Schedules a pulse on a single bit for a specified duration. The specified bit
     * will be turned to 1, and then back to 0 after the given duration.
     *
     * @param bitno : the bit number; lowest bit has index 0
     * @param ms_delay : waiting time before the pulse, in milliseconds
     * @param ms_duration : desired pulse duration in milliseconds. Be aware that the device time
     *         resolution is not guaranteed up to the millisecond.
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    delayedPulse(bitno, ms_delay, ms_duration) {
        this.liveFunc.delayedPulse(bitno, ms_delay, ms_duration);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YDigitalIO accessors declaration)
}

exports.YDigitalIOProxy = YDigitalIOProxy; //--- (DigitalIO functions)

/**
 * Retrieves a digital IO port for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the digital IO port is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YDigitalIO.isOnline() to test if the digital IO port is
 * indeed online at a given time. In case of ambiguity when looking for
 * a digital IO port by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the digital IO port
 *
 * @return {YDigitalIO} a YDigitalIO object allowing you to drive the digital IO port.
 */

function yFindDigitalIO(func) {
    return YDigitalIO.FindDigitalIO(func);
}

/**
 * Starts the enumeration of digital IO ports currently accessible.
 * Use the method YDigitalIO.nextDigitalIO() to iterate on
 * next digital IO ports.
 *
 * @return {YDigitalIO} a pointer to a YDigitalIO object, corresponding to
 *         the first digital IO port currently online, or a null pointer
 *         if there are none.
 */
function yFirstDigitalIO() {
    return YDigitalIO.FirstDigitalIO();
}

//--- (end of DigitalIO functions)
