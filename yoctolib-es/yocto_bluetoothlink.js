/*********************************************************************
 *
 * $Id: pic24config.php 22503 2015-12-22 15:34:43Z mvuilleu $
 *
 * Implements the high-level API for BluetoothLink functions
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
exports.YBluetoothLink = exports.Y_COMMAND_INVALID = exports.Y_LINKQUALITY_INVALID = exports.Y_VOLUME_INVALID = exports.Y_PREAMPLIFIER_INVALID = exports.Y_REMOTENAME_INVALID = exports.Y_REMOTEADDRESS_INVALID = exports.Y_PAIRINGPIN_INVALID = exports.Y_OWNADDRESS_INVALID = exports.Y_LINKSTATE_INVALID = exports.Y_LINKSTATE_PLAY = exports.Y_LINKSTATE_LINKED = exports.Y_LINKSTATE_EXISTS = exports.Y_LINKSTATE_SEARCH = exports.Y_LINKSTATE_FREE = exports.Y_LINKSTATE_DOWN = exports.Y_MUTE_INVALID = exports.Y_MUTE_TRUE = exports.Y_MUTE_FALSE = undefined;
exports.yFindBluetoothLink = yFindBluetoothLink;
exports.yFirstBluetoothLink = yFirstBluetoothLink;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

//--- (YBluetoothLink return codes)
//--- (end of YBluetoothLink return codes)
//--- (YBluetoothLink definitions)
const Y_MUTE_FALSE = exports.Y_MUTE_FALSE = 0;
const Y_MUTE_TRUE = exports.Y_MUTE_TRUE = 1;
const Y_MUTE_INVALID = exports.Y_MUTE_INVALID = -1;
const Y_LINKSTATE_DOWN = exports.Y_LINKSTATE_DOWN = 0;
const Y_LINKSTATE_FREE = exports.Y_LINKSTATE_FREE = 1;
const Y_LINKSTATE_SEARCH = exports.Y_LINKSTATE_SEARCH = 2;
const Y_LINKSTATE_EXISTS = exports.Y_LINKSTATE_EXISTS = 3;
const Y_LINKSTATE_LINKED = exports.Y_LINKSTATE_LINKED = 4;
const Y_LINKSTATE_PLAY = exports.Y_LINKSTATE_PLAY = 5;
const Y_LINKSTATE_INVALID = exports.Y_LINKSTATE_INVALID = -1;
const Y_OWNADDRESS_INVALID = exports.Y_OWNADDRESS_INVALID = _yocto_api.YAPI.INVALID_STRING;
const Y_PAIRINGPIN_INVALID = exports.Y_PAIRINGPIN_INVALID = _yocto_api.YAPI.INVALID_STRING;
const Y_REMOTEADDRESS_INVALID = exports.Y_REMOTEADDRESS_INVALID = _yocto_api.YAPI.INVALID_STRING;
const Y_REMOTENAME_INVALID = exports.Y_REMOTENAME_INVALID = _yocto_api.YAPI.INVALID_STRING;
const Y_PREAMPLIFIER_INVALID = exports.Y_PREAMPLIFIER_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_VOLUME_INVALID = exports.Y_VOLUME_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_LINKQUALITY_INVALID = exports.Y_LINKQUALITY_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of YBluetoothLink definitions)

//--- (YBluetoothLink class start)
/**
 * YBluetoothLink Class: BluetoothLink function interface
 *
 * BluetoothLink function provides control over bluetooth link
 * and status for devices that are bluetooth-enabled.
 */
//--- (end of YBluetoothLink class start)

class YBluetoothLink extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YBluetoothLink constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'BluetoothLink';
        /** @member {string} **/
        this._ownAddress = Y_OWNADDRESS_INVALID;
        /** @member {string} **/
        this._pairingPin = Y_PAIRINGPIN_INVALID;
        /** @member {string} **/
        this._remoteAddress = Y_REMOTEADDRESS_INVALID;
        /** @member {string} **/
        this._remoteName = Y_REMOTENAME_INVALID;
        /** @member {number} **/
        this._mute = Y_MUTE_INVALID;
        /** @member {number} **/
        this._preAmplifier = Y_PREAMPLIFIER_INVALID;
        /** @member {number} **/
        this._volume = Y_VOLUME_INVALID;
        /** @member {number} **/
        this._linkState = Y_LINKSTATE_INVALID;
        /** @member {number} **/
        this._linkQuality = Y_LINKQUALITY_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        this.imm_setConst({
            OWNADDRESS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            PAIRINGPIN_INVALID: _yocto_api.YAPI.INVALID_STRING,
            REMOTEADDRESS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            REMOTENAME_INVALID: _yocto_api.YAPI.INVALID_STRING,
            MUTE_FALSE: 0,
            MUTE_TRUE: 1,
            MUTE_INVALID: -1,
            PREAMPLIFIER_INVALID: _yocto_api.YAPI.INVALID_UINT,
            VOLUME_INVALID: _yocto_api.YAPI.INVALID_UINT,
            LINKSTATE_DOWN: 0,
            LINKSTATE_FREE: 1,
            LINKSTATE_SEARCH: 2,
            LINKSTATE_EXISTS: 3,
            LINKSTATE_LINKED: 4,
            LINKSTATE_PLAY: 5,
            LINKSTATE_INVALID: -1,
            LINKQUALITY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of YBluetoothLink constructor)
    }

    //--- (YBluetoothLink implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'ownAddress':
                this._ownAddress = val;
                return 1;
            case 'pairingPin':
                this._pairingPin = val;
                return 1;
            case 'remoteAddress':
                this._remoteAddress = val;
                return 1;
            case 'remoteName':
                this._remoteName = val;
                return 1;
            case 'mute':
                this._mute = parseInt(val);
                return 1;
            case 'preAmplifier':
                this._preAmplifier = parseInt(val);
                return 1;
            case 'volume':
                this._volume = parseInt(val);
                return 1;
            case 'linkState':
                this._linkState = parseInt(val);
                return 1;
            case 'linkQuality':
                this._linkQuality = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the MAC-48 address of the bluetooth interface, which is unique on the bluetooth network.
     *
     * @return {string} a string corresponding to the MAC-48 address of the bluetooth interface, which is
     * unique on the bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.OWNADDRESS_INVALID.
     */
    get_ownAddress() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this._cacheExpiration <= _this._yapi.GetTickCount()) {
                if ((yield _this.load(_this._yapi.defaultCacheValidity)) != _this._yapi.SUCCESS) {
                    return Y_OWNADDRESS_INVALID;
                }
            }
            return _this._ownAddress;
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
     * On failure, throws an exception or returns YBluetoothLink.PAIRINGPIN_INVALID.
     */
    get_pairingPin() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_PAIRINGPIN_INVALID;
                }
            }
            return _this2._pairingPin;
        })();
    }

    /**
     * Changes the PIN code used by the module for bluetooth pairing.
     * Remember to call the saveToFlash() method of the module to save the
     * new value in the device flash.
     *
     * @param newval {string} : a string corresponding to the PIN code used by the module for bluetooth pairing
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pairingPin(newval) {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this3._setAttr('pairingPin', rest_val);
        })();
    }

    /**
     * Returns the MAC-48 address of the remote device to connect to.
     *
     * @return {string} a string corresponding to the MAC-48 address of the remote device to connect to
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTEADDRESS_INVALID.
     */
    get_remoteAddress() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_REMOTEADDRESS_INVALID;
                }
            }
            return _this4._remoteAddress;
        })();
    }

    /**
     * Changes the MAC-48 address defining which remote device to connect to.
     *
     * @param newval {string} : a string corresponding to the MAC-48 address defining which remote device to connect to
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_remoteAddress(newval) {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this5._setAttr('remoteAddress', rest_val);
        })();
    }

    /**
     * Returns the bluetooth name the remote device, if found on the bluetooth network.
     *
     * @return {string} a string corresponding to the bluetooth name the remote device, if found on the
     * bluetooth network
     *
     * On failure, throws an exception or returns YBluetoothLink.REMOTENAME_INVALID.
     */
    get_remoteName() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_REMOTENAME_INVALID;
                }
            }
            return _this6._remoteName;
        })();
    }

    /**
     * Returns the state of the mute function.
     *
     * @return {number} either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to the
     * state of the mute function
     *
     * On failure, throws an exception or returns YBluetoothLink.MUTE_INVALID.
     */
    get_mute() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_MUTE_INVALID;
                }
            }
            return _this7._mute;
        })();
    }

    /**
     * Changes the state of the mute function. Remember to call the matching module
     * saveToFlash() method to save the setting permanently.
     *
     * @param newval {number} : either YBluetoothLink.MUTE_FALSE or YBluetoothLink.MUTE_TRUE, according to
     * the state of the mute function
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_mute(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this8._setAttr('mute', rest_val);
        })();
    }

    /**
     * Returns the audio pre-amplifier volume, in per cents.
     *
     * @return {number} an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.PREAMPLIFIER_INVALID.
     */
    get_preAmplifier() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_PREAMPLIFIER_INVALID;
                }
            }
            return _this9._preAmplifier;
        })();
    }

    /**
     * Changes the audio pre-amplifier volume, in per cents.
     *
     * @param newval {number} : an integer corresponding to the audio pre-amplifier volume, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_preAmplifier(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this10._setAttr('preAmplifier', rest_val);
        })();
    }

    /**
     * Returns the connected headset volume, in per cents.
     *
     * @return {number} an integer corresponding to the connected headset volume, in per cents
     *
     * On failure, throws an exception or returns YBluetoothLink.VOLUME_INVALID.
     */
    get_volume() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_VOLUME_INVALID;
                }
            }
            return _this11._volume;
        })();
    }

    /**
     * Changes the connected headset volume, in per cents.
     *
     * @param newval {number} : an integer corresponding to the connected headset volume, in per cents
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_volume(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this12._setAttr('volume', rest_val);
        })();
    }

    /**
     * Returns the bluetooth link state.
     *
     * @return {number} a value among YBluetoothLink.LINKSTATE_DOWN, YBluetoothLink.LINKSTATE_FREE,
     * YBluetoothLink.LINKSTATE_SEARCH, YBluetoothLink.LINKSTATE_EXISTS, YBluetoothLink.LINKSTATE_LINKED
     * and YBluetoothLink.LINKSTATE_PLAY corresponding to the bluetooth link state
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKSTATE_INVALID.
     */
    get_linkState() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_LINKSTATE_INVALID;
                }
            }
            return _this13._linkState;
        })();
    }

    /**
     * Returns the bluetooth receiver signal strength, in pourcents, or 0 if no connection is established.
     *
     * @return {number} an integer corresponding to the bluetooth receiver signal strength, in pourcents,
     * or 0 if no connection is established
     *
     * On failure, throws an exception or returns YBluetoothLink.LINKQUALITY_INVALID.
     */
    get_linkQuality() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            if (_this14._cacheExpiration <= _this14._yapi.GetTickCount()) {
                if ((yield _this14.load(_this14._yapi.defaultCacheValidity)) != _this14._yapi.SUCCESS) {
                    return Y_LINKQUALITY_INVALID;
                }
            }
            return _this14._linkQuality;
        })();
    }

    get_command() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            return _this15._command;
        })();
    }

    set_command(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this16._setAttr('command', rest_val);
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
     * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YBluetoothLink} a YBluetoothLink object allowing you to drive the cellular interface.
     */
    static FindBluetoothLink(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('BluetoothLink', func, obj);
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
     * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a cellular interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the cellular interface
     *
     * @return {YBluetoothLink} a YBluetoothLink object allowing you to drive the cellular interface.
     */
    static FindBluetoothLinkInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'BluetoothLink', func);
        if (obj == null) {
            obj = new YBluetoothLink(yctx, func);
            _yocto_api.YFunction._AddToCache('BluetoothLink', func, obj);
        }
        return obj;
    }

    /**
     * Attempt to connect to the previously selected remote device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    connect() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            return yield _this17.set_command('C');
        })();
    }

    /**
     * Disconnect from the previously selected remote device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    disconnect() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            return yield _this18.set_command('D');
        })();
    }

    /**
     * Continues the enumeration of cellular interfaces started using yFirstBluetoothLink().
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         a cellular interface currently online, or a null pointer
     *         if there are no more cellular interfaces to enumerate.
     */
    nextBluetoothLink() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLinkInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next cellular interfaces.
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLink() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('BluetoothLink');
        if (next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLink(next_hwid);
    }

    /**
     * Starts the enumeration of cellular interfaces currently accessible.
     * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
     * next cellular interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
     *         the first cellular interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstBluetoothLinkInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('BluetoothLink');
        if (next_hwid == null) return null;
        return YBluetoothLink.FindBluetoothLinkInContext(yctx, next_hwid);
    }

    //--- (end of YBluetoothLink implementation)
}

exports.YBluetoothLink = YBluetoothLink; //--- (BluetoothLink functions)

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
 * Use the method YBluetoothLink.isOnline() to test if the cellular interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a cellular interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the cellular interface
 *
 * @return {YBluetoothLink} a YBluetoothLink object allowing you to drive the cellular interface.
 */

function yFindBluetoothLink(func) {
    return YBluetoothLink.FindBluetoothLink(func);
}

/**
 * Starts the enumeration of cellular interfaces currently accessible.
 * Use the method YBluetoothLink.nextBluetoothLink() to iterate on
 * next cellular interfaces.
 *
 * @return {YBluetoothLink} a pointer to a YBluetoothLink object, corresponding to
 *         the first cellular interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstBluetoothLink() {
    return YBluetoothLink.FirstBluetoothLink();
}

//--- (end of BluetoothLink functions)
