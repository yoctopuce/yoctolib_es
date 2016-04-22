/*********************************************************************
 *
 * $Id: yocto_network.js 23963 2016-04-17 20:55:12Z mvuilleu $
 *
 * Implements the high-level API for Network functions
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
exports.YNetworkProxy = exports.YNetwork = exports.Y_POECURRENT_INVALID = exports.Y_CALLBACKMAXDELAY_INVALID = exports.Y_CALLBACKMINDELAY_INVALID = exports.Y_CALLBACKINITIALDELAY_INVALID = exports.Y_CALLBACKCREDENTIALS_INVALID = exports.Y_CALLBACKURL_INVALID = exports.Y_WWWWATCHDOGDELAY_INVALID = exports.Y_DEFAULTPAGE_INVALID = exports.Y_HTTPPORT_INVALID = exports.Y_ADMINPASSWORD_INVALID = exports.Y_USERPASSWORD_INVALID = exports.Y_NTPSERVER_INVALID = exports.Y_SECONDARYDNS_INVALID = exports.Y_PRIMARYDNS_INVALID = exports.Y_IPCONFIG_INVALID = exports.Y_ROUTER_INVALID = exports.Y_SUBNETMASK_INVALID = exports.Y_IPADDRESS_INVALID = exports.Y_MACADDRESS_INVALID = exports.Y_CALLBACKENCODING_INVALID = exports.Y_CALLBACKENCODING_MQTT = exports.Y_CALLBACKENCODING_INFLUXDB = exports.Y_CALLBACKENCODING_AZURE = exports.Y_CALLBACKENCODING_EMONCMS = exports.Y_CALLBACKENCODING_JSON_NUM = exports.Y_CALLBACKENCODING_YOCTO_API = exports.Y_CALLBACKENCODING_CSV = exports.Y_CALLBACKENCODING_JSON_ARRAY = exports.Y_CALLBACKENCODING_JSON = exports.Y_CALLBACKENCODING_FORM = exports.Y_CALLBACKMETHOD_INVALID = exports.Y_CALLBACKMETHOD_PUT = exports.Y_CALLBACKMETHOD_GET = exports.Y_CALLBACKMETHOD_POST = exports.Y_DISCOVERABLE_INVALID = exports.Y_DISCOVERABLE_TRUE = exports.Y_DISCOVERABLE_FALSE = exports.Y_READINESS_INVALID = exports.Y_READINESS_WWW_OK = exports.Y_READINESS_LAN_OK = exports.Y_READINESS_LINKED = exports.Y_READINESS_EXISTS = exports.Y_READINESS_DOWN = undefined;
exports.yFindNetwork = yFindNetwork;
exports.yFirstNetwork = yFirstNetwork;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

//--- (YNetwork return codes)
//--- (end of YNetwork return codes)
//--- (YNetwork definitions)
var Y_READINESS_DOWN = exports.Y_READINESS_DOWN = 0;
var Y_READINESS_EXISTS = exports.Y_READINESS_EXISTS = 1;
var Y_READINESS_LINKED = exports.Y_READINESS_LINKED = 2;
var Y_READINESS_LAN_OK = exports.Y_READINESS_LAN_OK = 3;
var Y_READINESS_WWW_OK = exports.Y_READINESS_WWW_OK = 4;
var Y_READINESS_INVALID = exports.Y_READINESS_INVALID = -1;
var Y_DISCOVERABLE_FALSE = exports.Y_DISCOVERABLE_FALSE = 0;
var Y_DISCOVERABLE_TRUE = exports.Y_DISCOVERABLE_TRUE = 1;
var Y_DISCOVERABLE_INVALID = exports.Y_DISCOVERABLE_INVALID = -1;
var Y_CALLBACKMETHOD_POST = exports.Y_CALLBACKMETHOD_POST = 0;
var Y_CALLBACKMETHOD_GET = exports.Y_CALLBACKMETHOD_GET = 1;
var Y_CALLBACKMETHOD_PUT = exports.Y_CALLBACKMETHOD_PUT = 2;
var Y_CALLBACKMETHOD_INVALID = exports.Y_CALLBACKMETHOD_INVALID = -1;
var Y_CALLBACKENCODING_FORM = exports.Y_CALLBACKENCODING_FORM = 0;
var Y_CALLBACKENCODING_JSON = exports.Y_CALLBACKENCODING_JSON = 1;
var Y_CALLBACKENCODING_JSON_ARRAY = exports.Y_CALLBACKENCODING_JSON_ARRAY = 2;
var Y_CALLBACKENCODING_CSV = exports.Y_CALLBACKENCODING_CSV = 3;
var Y_CALLBACKENCODING_YOCTO_API = exports.Y_CALLBACKENCODING_YOCTO_API = 4;
var Y_CALLBACKENCODING_JSON_NUM = exports.Y_CALLBACKENCODING_JSON_NUM = 5;
var Y_CALLBACKENCODING_EMONCMS = exports.Y_CALLBACKENCODING_EMONCMS = 6;
var Y_CALLBACKENCODING_AZURE = exports.Y_CALLBACKENCODING_AZURE = 7;
var Y_CALLBACKENCODING_INFLUXDB = exports.Y_CALLBACKENCODING_INFLUXDB = 8;
var Y_CALLBACKENCODING_MQTT = exports.Y_CALLBACKENCODING_MQTT = 9;
var Y_CALLBACKENCODING_INVALID = exports.Y_CALLBACKENCODING_INVALID = -1;
var Y_MACADDRESS_INVALID = exports.Y_MACADDRESS_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_IPADDRESS_INVALID = exports.Y_IPADDRESS_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SUBNETMASK_INVALID = exports.Y_SUBNETMASK_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_ROUTER_INVALID = exports.Y_ROUTER_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_IPCONFIG_INVALID = exports.Y_IPCONFIG_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_PRIMARYDNS_INVALID = exports.Y_PRIMARYDNS_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_SECONDARYDNS_INVALID = exports.Y_SECONDARYDNS_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_NTPSERVER_INVALID = exports.Y_NTPSERVER_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_USERPASSWORD_INVALID = exports.Y_USERPASSWORD_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_ADMINPASSWORD_INVALID = exports.Y_ADMINPASSWORD_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_HTTPPORT_INVALID = exports.Y_HTTPPORT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_DEFAULTPAGE_INVALID = exports.Y_DEFAULTPAGE_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_WWWWATCHDOGDELAY_INVALID = exports.Y_WWWWATCHDOGDELAY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CALLBACKURL_INVALID = exports.Y_CALLBACKURL_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CALLBACKCREDENTIALS_INVALID = exports.Y_CALLBACKCREDENTIALS_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_CALLBACKINITIALDELAY_INVALID = exports.Y_CALLBACKINITIALDELAY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CALLBACKMINDELAY_INVALID = exports.Y_CALLBACKMINDELAY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_CALLBACKMAXDELAY_INVALID = exports.Y_CALLBACKMAXDELAY_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_POECURRENT_INVALID = exports.Y_POECURRENT_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of YNetwork definitions)

//--- (YNetwork class start)
/**
 * YNetwork Class: Network function interface
 *
 * YNetwork objects provide access to TCP/IP parameters of Yoctopuce
 * modules that include a built-in network interface.
 */
//--- (end of YNetwork class start)

class YNetwork extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (YNetwork constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Network';
        /** @member {number} **/
        this._readiness = Y_READINESS_INVALID;
        /** @member {string} **/
        this._macAddress = Y_MACADDRESS_INVALID;
        /** @member {string} **/
        this._ipAddress = Y_IPADDRESS_INVALID;
        /** @member {string} **/
        this._subnetMask = Y_SUBNETMASK_INVALID;
        /** @member {string} **/
        this._router = Y_ROUTER_INVALID;
        /** @member {string} **/
        this._ipConfig = Y_IPCONFIG_INVALID;
        /** @member {string} **/
        this._primaryDNS = Y_PRIMARYDNS_INVALID;
        /** @member {string} **/
        this._secondaryDNS = Y_SECONDARYDNS_INVALID;
        /** @member {string} **/
        this._ntpServer = Y_NTPSERVER_INVALID;
        /** @member {string} **/
        this._userPassword = Y_USERPASSWORD_INVALID;
        /** @member {string} **/
        this._adminPassword = Y_ADMINPASSWORD_INVALID;
        /** @member {number} **/
        this._httpPort = Y_HTTPPORT_INVALID;
        /** @member {string} **/
        this._defaultPage = Y_DEFAULTPAGE_INVALID;
        /** @member {number} **/
        this._discoverable = Y_DISCOVERABLE_INVALID;
        /** @member {number} **/
        this._wwwWatchdogDelay = Y_WWWWATCHDOGDELAY_INVALID;
        /** @member {string} **/
        this._callbackUrl = Y_CALLBACKURL_INVALID;
        /** @member {number} **/
        this._callbackMethod = Y_CALLBACKMETHOD_INVALID;
        /** @member {number} **/
        this._callbackEncoding = Y_CALLBACKENCODING_INVALID;
        /** @member {string} **/
        this._callbackCredentials = Y_CALLBACKCREDENTIALS_INVALID;
        /** @member {number} **/
        this._callbackInitialDelay = Y_CALLBACKINITIALDELAY_INVALID;
        /** @member {number} **/
        this._callbackMinDelay = Y_CALLBACKMINDELAY_INVALID;
        /** @member {number} **/
        this._callbackMaxDelay = Y_CALLBACKMAXDELAY_INVALID;
        /** @member {number} **/
        this._poeCurrent = Y_POECURRENT_INVALID;
        this.imm_setConst({
            READINESS_DOWN: 0,
            READINESS_EXISTS: 1,
            READINESS_LINKED: 2,
            READINESS_LAN_OK: 3,
            READINESS_WWW_OK: 4,
            READINESS_INVALID: -1,
            MACADDRESS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            IPADDRESS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SUBNETMASK_INVALID: _yocto_api.YAPI.INVALID_STRING,
            ROUTER_INVALID: _yocto_api.YAPI.INVALID_STRING,
            IPCONFIG_INVALID: _yocto_api.YAPI.INVALID_STRING,
            PRIMARYDNS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            SECONDARYDNS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            NTPSERVER_INVALID: _yocto_api.YAPI.INVALID_STRING,
            USERPASSWORD_INVALID: _yocto_api.YAPI.INVALID_STRING,
            ADMINPASSWORD_INVALID: _yocto_api.YAPI.INVALID_STRING,
            HTTPPORT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            DEFAULTPAGE_INVALID: _yocto_api.YAPI.INVALID_STRING,
            DISCOVERABLE_FALSE: 0,
            DISCOVERABLE_TRUE: 1,
            DISCOVERABLE_INVALID: -1,
            WWWWATCHDOGDELAY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            CALLBACKURL_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CALLBACKMETHOD_POST: 0,
            CALLBACKMETHOD_GET: 1,
            CALLBACKMETHOD_PUT: 2,
            CALLBACKMETHOD_INVALID: -1,
            CALLBACKENCODING_FORM: 0,
            CALLBACKENCODING_JSON: 1,
            CALLBACKENCODING_JSON_ARRAY: 2,
            CALLBACKENCODING_CSV: 3,
            CALLBACKENCODING_YOCTO_API: 4,
            CALLBACKENCODING_JSON_NUM: 5,
            CALLBACKENCODING_EMONCMS: 6,
            CALLBACKENCODING_AZURE: 7,
            CALLBACKENCODING_INFLUXDB: 8,
            CALLBACKENCODING_MQTT: 9,
            CALLBACKENCODING_INVALID: -1,
            CALLBACKCREDENTIALS_INVALID: _yocto_api.YAPI.INVALID_STRING,
            CALLBACKINITIALDELAY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            CALLBACKMINDELAY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            CALLBACKMAXDELAY_INVALID: _yocto_api.YAPI.INVALID_UINT,
            POECURRENT_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of YNetwork constructor)
    }

    //--- (YNetwork implementation)

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
            var res = new YNetworkProxy(_this);
            yield res._asyncInit();
            res._module = yield (yield _this.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'readiness':
                this._readiness = parseInt(val);
                return 1;
            case 'macAddress':
                this._macAddress = val;
                return 1;
            case 'ipAddress':
                this._ipAddress = val;
                return 1;
            case 'subnetMask':
                this._subnetMask = val;
                return 1;
            case 'router':
                this._router = val;
                return 1;
            case 'ipConfig':
                this._ipConfig = val;
                return 1;
            case 'primaryDNS':
                this._primaryDNS = val;
                return 1;
            case 'secondaryDNS':
                this._secondaryDNS = val;
                return 1;
            case 'ntpServer':
                this._ntpServer = val;
                return 1;
            case 'userPassword':
                this._userPassword = val;
                return 1;
            case 'adminPassword':
                this._adminPassword = val;
                return 1;
            case 'httpPort':
                this._httpPort = parseInt(val);
                return 1;
            case 'defaultPage':
                this._defaultPage = val;
                return 1;
            case 'discoverable':
                this._discoverable = parseInt(val);
                return 1;
            case 'wwwWatchdogDelay':
                this._wwwWatchdogDelay = parseInt(val);
                return 1;
            case 'callbackUrl':
                this._callbackUrl = val;
                return 1;
            case 'callbackMethod':
                this._callbackMethod = parseInt(val);
                return 1;
            case 'callbackEncoding':
                this._callbackEncoding = parseInt(val);
                return 1;
            case 'callbackCredentials':
                this._callbackCredentials = val;
                return 1;
            case 'callbackInitialDelay':
                this._callbackInitialDelay = parseInt(val);
                return 1;
            case 'callbackMinDelay':
                this._callbackMinDelay = parseInt(val);
                return 1;
            case 'callbackMaxDelay':
                this._callbackMaxDelay = parseInt(val);
                return 1;
            case 'poeCurrent':
                this._poeCurrent = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return {number} a value among YNetwork.READINESS_DOWN, YNetwork.READINESS_EXISTS,
     * YNetwork.READINESS_LINKED, YNetwork.READINESS_LAN_OK and YNetwork.READINESS_WWW_OK corresponding to
     * the current established working mode of the network interface
     *
     * On failure, throws an exception or returns YNetwork.READINESS_INVALID.
     */
    get_readiness() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            if (_this2._cacheExpiration <= _this2._yapi.GetTickCount()) {
                if ((yield _this2.load(_this2._yapi.defaultCacheValidity)) != _this2._yapi.SUCCESS) {
                    return Y_READINESS_INVALID;
                }
            }
            return _this2._readiness;
        })();
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return {string} a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns YNetwork.MACADDRESS_INVALID.
     */
    get_macAddress() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            if (_this3._cacheExpiration == 0) {
                if ((yield _this3.load(_this3._yapi.defaultCacheValidity)) != _this3._yapi.SUCCESS) {
                    return Y_MACADDRESS_INVALID;
                }
            }
            return _this3._macAddress;
        })();
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return {string} a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns YNetwork.IPADDRESS_INVALID.
     */
    get_ipAddress() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_IPADDRESS_INVALID;
                }
            }
            return _this4._ipAddress;
        })();
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return {string} a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns YNetwork.SUBNETMASK_INVALID.
     */
    get_subnetMask() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_SUBNETMASK_INVALID;
                }
            }
            return _this5._subnetMask;
        })();
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return {string} a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns YNetwork.ROUTER_INVALID.
     */
    get_router() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            if (_this6._cacheExpiration <= _this6._yapi.GetTickCount()) {
                if ((yield _this6.load(_this6._yapi.defaultCacheValidity)) != _this6._yapi.SUCCESS) {
                    return Y_ROUTER_INVALID;
                }
            }
            return _this6._router;
        })();
    }

    get_ipConfig() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            if (_this7._cacheExpiration <= _this7._yapi.GetTickCount()) {
                if ((yield _this7.load(_this7._yapi.defaultCacheValidity)) != _this7._yapi.SUCCESS) {
                    return Y_IPCONFIG_INVALID;
                }
            }
            return _this7._ipConfig;
        })();
    }

    set_ipConfig(newval) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this8._setAttr('ipConfig', rest_val);
        })();
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return {string} a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.PRIMARYDNS_INVALID.
     */
    get_primaryDNS() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if (_this9._cacheExpiration <= _this9._yapi.GetTickCount()) {
                if ((yield _this9.load(_this9._yapi.defaultCacheValidity)) != _this9._yapi.SUCCESS) {
                    return Y_PRIMARYDNS_INVALID;
                }
            }
            return _this9._primaryDNS;
        })();
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the primary name server to be
     * used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_primaryDNS(newval) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this10._setAttr('primaryDNS', rest_val);
        })();
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return {string} a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns YNetwork.SECONDARYDNS_INVALID.
     */
    get_secondaryDNS() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            if (_this11._cacheExpiration <= _this11._yapi.GetTickCount()) {
                if ((yield _this11.load(_this11._yapi.defaultCacheValidity)) != _this11._yapi.SUCCESS) {
                    return Y_SECONDARYDNS_INVALID;
                }
            }
            return _this11._secondaryDNS;
        })();
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the secondary name server to
     * be used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_secondaryDNS(newval) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this12._setAttr('secondaryDNS', rest_val);
        })();
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return {string} a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns YNetwork.NTPSERVER_INVALID.
     */
    get_ntpServer() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            if (_this13._cacheExpiration <= _this13._yapi.GetTickCount()) {
                if ((yield _this13.load(_this13._yapi.defaultCacheValidity)) != _this13._yapi.SUCCESS) {
                    return Y_NTPSERVER_INVALID;
                }
            }
            return _this13._ntpServer;
        })();
    }

    /**
     * Changes the IP address of the NTP server to be used by the module.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval {string} : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntpServer(newval) {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this14._setAttr('ntpServer', rest_val);
        })();
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.USERPASSWORD_INVALID.
     */
    get_userPassword() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            if (_this15._cacheExpiration <= _this15._yapi.GetTickCount()) {
                if ((yield _this15.load(_this15._yapi.defaultCacheValidity)) != _this15._yapi.SUCCESS) {
                    return Y_USERPASSWORD_INVALID;
                }
            }
            return _this15._userPassword;
        })();
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the password for the "user" user
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userPassword(newval) {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this16._setAttr('userPassword', rest_val);
        })();
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.ADMINPASSWORD_INVALID.
     */
    get_adminPassword() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._cacheExpiration <= _this17._yapi.GetTickCount()) {
                if ((yield _this17.load(_this17._yapi.defaultCacheValidity)) != _this17._yapi.SUCCESS) {
                    return Y_ADMINPASSWORD_INVALID;
                }
            }
            return _this17._adminPassword;
        })();
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the password for the "admin" user
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_adminPassword(newval) {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this18._setAttr('adminPassword', rest_val);
        })();
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return {number} an integer corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.HTTPPORT_INVALID.
     */
    get_httpPort() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            if (_this19._cacheExpiration <= _this19._yapi.GetTickCount()) {
                if ((yield _this19.load(_this19._yapi.defaultCacheValidity)) != _this19._yapi.SUCCESS) {
                    return Y_HTTPPORT_INVALID;
                }
            }
            return _this19._httpPort;
        })();
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval {number} : an integer corresponding to the default HTML page returned by the hub
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_httpPort(newval) {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this20._setAttr('httpPort', rest_val);
        })();
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return {string} a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns YNetwork.DEFAULTPAGE_INVALID.
     */
    get_defaultPage() {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            if (_this21._cacheExpiration <= _this21._yapi.GetTickCount()) {
                if ((yield _this21.load(_this21._yapi.defaultCacheValidity)) != _this21._yapi.SUCCESS) {
                    return Y_DEFAULTPAGE_INVALID;
                }
            }
            return _this21._defaultPage;
        })();
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval {string} : a string corresponding to the default HTML page returned by the hub
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_defaultPage(newval) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this22._setAttr('defaultPage', rest_val);
        })();
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return {number} either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE, according to the
     * activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns YNetwork.DISCOVERABLE_INVALID.
     */
    get_discoverable() {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            if (_this23._cacheExpiration <= _this23._yapi.GetTickCount()) {
                if ((yield _this23.load(_this23._yapi.defaultCacheValidity)) != _this23._yapi.SUCCESS) {
                    return Y_DISCOVERABLE_INVALID;
                }
            }
            return _this23._discoverable;
        })();
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @param newval {number} : either YNetwork.DISCOVERABLE_FALSE or YNetwork.DISCOVERABLE_TRUE,
     * according to the activation state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_discoverable(newval) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this24._setAttr('discoverable', rest_val);
        })();
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return {number} an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns YNetwork.WWWWATCHDOGDELAY_INVALID.
     */
    get_wwwWatchdogDelay() {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            if (_this25._cacheExpiration <= _this25._yapi.GetTickCount()) {
                if ((yield _this25.load(_this25._yapi.defaultCacheValidity)) != _this25._yapi.SUCCESS) {
                    return Y_WWWWATCHDOGDELAY_INVALID;
                }
            }
            return _this25._wwwWatchdogDelay;
        })();
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds.
     *
     * @param newval {number} : an integer corresponding to the allowed downtime of the WWW link (in
     * seconds) before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_wwwWatchdogDelay(newval) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this26._setAttr('wwwWatchdogDelay', rest_val);
        })();
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return {string} a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKURL_INVALID.
     */
    get_callbackUrl() {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            if (_this27._cacheExpiration <= _this27._yapi.GetTickCount()) {
                if ((yield _this27.load(_this27._yapi.defaultCacheValidity)) != _this27._yapi.SUCCESS) {
                    return Y_CALLBACKURL_INVALID;
                }
            }
            return _this27._callbackUrl;
        })();
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval {string} : a string corresponding to the callback URL to notify significant state changes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackUrl(newval) {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this28._setAttr('callbackUrl', rest_val);
        })();
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return {number} a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET and
     * YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMETHOD_INVALID.
     */
    get_callbackMethod() {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            if (_this29._cacheExpiration <= _this29._yapi.GetTickCount()) {
                if ((yield _this29.load(_this29._yapi.defaultCacheValidity)) != _this29._yapi.SUCCESS) {
                    return Y_CALLBACKMETHOD_INVALID;
                }
            }
            return _this29._callbackMethod;
        })();
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     *
     * @param newval {number} : a value among YNetwork.CALLBACKMETHOD_POST, YNetwork.CALLBACKMETHOD_GET
     * and YNetwork.CALLBACKMETHOD_PUT corresponding to the HTTP method used to notify callbacks for
     * significant state changes
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMethod(newval) {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this30._setAttr('callbackMethod', rest_val);
        })();
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return {number} a value among YNetwork.CALLBACKENCODING_FORM, YNetwork.CALLBACKENCODING_JSON,
     * YNetwork.CALLBACKENCODING_JSON_ARRAY, YNetwork.CALLBACKENCODING_CSV,
     * YNetwork.CALLBACKENCODING_YOCTO_API, YNetwork.CALLBACKENCODING_JSON_NUM,
     * YNetwork.CALLBACKENCODING_EMONCMS, YNetwork.CALLBACKENCODING_AZURE,
     * YNetwork.CALLBACKENCODING_INFLUXDB and YNetwork.CALLBACKENCODING_MQTT corresponding to the encoding
     * standard to use for representing notification values
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKENCODING_INVALID.
     */
    get_callbackEncoding() {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            if (_this31._cacheExpiration <= _this31._yapi.GetTickCount()) {
                if ((yield _this31.load(_this31._yapi.defaultCacheValidity)) != _this31._yapi.SUCCESS) {
                    return Y_CALLBACKENCODING_INVALID;
                }
            }
            return _this31._callbackEncoding;
        })();
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     *
     * @param newval {number} : a value among YNetwork.CALLBACKENCODING_FORM,
     * YNetwork.CALLBACKENCODING_JSON, YNetwork.CALLBACKENCODING_JSON_ARRAY,
     * YNetwork.CALLBACKENCODING_CSV, YNetwork.CALLBACKENCODING_YOCTO_API,
     * YNetwork.CALLBACKENCODING_JSON_NUM, YNetwork.CALLBACKENCODING_EMONCMS,
     * YNetwork.CALLBACKENCODING_AZURE, YNetwork.CALLBACKENCODING_INFLUXDB and
     * YNetwork.CALLBACKENCODING_MQTT corresponding to the encoding standard to use for representing
     * notification values
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackEncoding(newval) {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this32._setAttr('callbackEncoding', rest_val);
        })();
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return {string} a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKCREDENTIALS_INVALID.
     */
    get_callbackCredentials() {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            if (_this33._cacheExpiration <= _this33._yapi.GetTickCount()) {
                if ((yield _this33.load(_this33._yapi.defaultCacheValidity)) != _this33._yapi.SUCCESS) {
                    return Y_CALLBACKCREDENTIALS_INVALID;
                }
            }
            return _this33._callbackCredentials;
        })();
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval {string} : a string corresponding to the credentials required to connect to the callback address
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackCredentials(newval) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this34._setAttr('callbackCredentials', rest_val);
        })();
    }

    /**
     * Connects to the notification callback and saves the credentials required to
     * log into it. The password is not stored into the module, only a hashed
     * copy of the credentials are saved. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param username {string} : username required to log to the callback
     * @param password {string} : password required to log to the callback
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    callbackLogin(username, password) {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = username + ':' + password;
            return yield _this35._setAttr('callbackCredentials', rest_val);
        })();
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKINITIALDELAY_INVALID.
     */
    get_callbackInitialDelay() {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            if (_this36._cacheExpiration <= _this36._yapi.GetTickCount()) {
                if ((yield _this36.load(_this36._yapi.defaultCacheValidity)) != _this36._yapi.SUCCESS) {
                    return Y_CALLBACKINITIALDELAY_INVALID;
                }
            }
            return _this36._callbackInitialDelay;
        })();
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackInitialDelay(newval) {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this37._setAttr('callbackInitialDelay', rest_val);
        })();
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMINDELAY_INVALID.
     */
    get_callbackMinDelay() {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            if (_this38._cacheExpiration <= _this38._yapi.GetTickCount()) {
                if ((yield _this38.load(_this38._yapi.defaultCacheValidity)) != _this38._yapi.SUCCESS) {
                    return Y_CALLBACKMINDELAY_INVALID;
                }
            }
            return _this38._callbackMinDelay;
        })();
    }

    /**
     * Changes the minimum waiting time between two callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMinDelay(newval) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this39._setAttr('callbackMinDelay', rest_val);
        })();
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     *
     * @return {number} an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * On failure, throws an exception or returns YNetwork.CALLBACKMAXDELAY_INVALID.
     */
    get_callbackMaxDelay() {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            if (_this40._cacheExpiration <= _this40._yapi.GetTickCount()) {
                if ((yield _this40.load(_this40._yapi.defaultCacheValidity)) != _this40._yapi.SUCCESS) {
                    return Y_CALLBACKMAXDELAY_INVALID;
                }
            }
            return _this40._callbackMaxDelay;
        })();
    }

    /**
     * Changes the maximum waiting time between two callback notifications, in seconds.
     *
     * @param newval {number} : an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMaxDelay(newval) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this41._setAttr('callbackMaxDelay', rest_val);
        })();
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return {number} an integer corresponding to the current consumed by the module from
     * Power-over-Ethernet (PoE), in milli-amps
     *
     * On failure, throws an exception or returns YNetwork.POECURRENT_INVALID.
     */
    get_poeCurrent() {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            if (_this42._cacheExpiration <= _this42._yapi.GetTickCount()) {
                if ((yield _this42.load(_this42._yapi.defaultCacheValidity)) != _this42._yapi.SUCCESS) {
                    return Y_POECURRENT_INVALID;
                }
            }
            return _this42._poeCurrent;
        })();
    }

    /**
     * Retrieves a network interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the network interface
     *
     * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
     */
    static FindNetwork(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Network', func);
        if (obj == null) {
            obj = new YNetwork(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Network', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a network interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the network interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YNetwork.isOnline() to test if the network interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a network interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the network interface
     *
     * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
     */
    static FindNetworkInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Network', func);
        if (obj == null) {
            obj = new YNetwork(yctx, func);
            _yocto_api.YFunction._AddToCache('Network', func, obj);
        }
        return obj;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr {string} : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen {number} : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (eg. 24 means 255.255.255.0)
     * @param fallbackRouter {string} : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useDHCP(fallbackIpAddr, fallbackSubnetMaskLen, fallbackRouter) {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            return yield _this43.set_ipConfig('DHCP:' + fallbackIpAddr + '/' + String(Math.round(fallbackSubnetMaskLen)) + '/' + fallbackRouter);
        })();
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress {string} : device IP address
     * @param subnetMaskLen {number} : subnet mask length, as an integer (eg. 24 means 255.255.255.0)
     * @param router {string} : router IP address (default gateway)
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useStaticIP(ipAddress, subnetMaskLen, router) {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            return yield _this44.set_ipConfig('STATIC:' + ipAddress + '/' + String(Math.round(subnetMaskLen)) + '/' + router);
        })();
    }

    /**
     * Pings host to test the network connectivity. Sends four ICMP ECHO_REQUEST requests from the
     * module to the target host. This method returns a string with the result of the
     * 4 ICMP ECHO_REQUEST requests.
     *
     * @param host {string} : the hostname or the IP address of the target
     *
     * @return {string} a string with the result of the ping.
     */
    ping(host) {
        var _this45 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let content;
            // may throw an exception
            content = yield _this45._download('ping.txt?host=' + host);
            return _this45._yapi.imm_bin2str(content);
        })();
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerCallback() {
        var _this46 = this;

        return _asyncToGenerator(function* () {
            return yield _this46.set_callbackMethod((yield _this46.get_callbackMethod()));
        })();
    }

    /**
     * Continues the enumeration of network interfaces started using yFirstNetwork().
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         a network interface currently online, or a null pointer
     *         if there are no more network interfaces to enumerate.
     */
    nextNetwork() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetwork() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Network');
        if (next_hwid == null) return null;
        return YNetwork.FindNetwork(next_hwid);
    }

    /**
     * Starts the enumeration of network interfaces currently accessible.
     * Use the method YNetwork.nextNetwork() to iterate on
     * next network interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YNetwork} a pointer to a YNetwork object, corresponding to
     *         the first network interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstNetworkInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Network');
        if (next_hwid == null) return null;
        return YNetwork.FindNetworkInContext(yctx, next_hwid);
    }

    //--- (end of YNetwork implementation)
}

exports.YNetwork = YNetwork; //
// YNetworkProxy Class: synchronous proxy to YNetwork objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YNetwork objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YNetworkProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (YNetwork accessors declaration)

    /**
     * Returns the current established working mode of the network interface.
     * Level zero (DOWN_0) means that no hardware link has been detected. Either there is no signal
     * on the network cable, or the selected wireless access point cannot be detected.
     * Level 1 (LIVE_1) is reached when the network is detected, but is not yet connected.
     * For a wireless network, this shows that the requested SSID is present.
     * Level 2 (LINK_2) is reached when the hardware connection is established.
     * For a wired network connection, level 2 means that the cable is attached at both ends.
     * For a connection to a wireless access point, it shows that the security parameters
     * are properly configured. For an ad-hoc wireless connection, it means that there is
     * at least one other device connected on the ad-hoc network.
     * Level 3 (DHCP_3) is reached when an IP address has been obtained using DHCP.
     * Level 4 (DNS_4) is reached when the DNS server is reachable on the network.
     * Level 5 (WWW_5) is reached when global connectivity is demonstrated by properly loading the
     * current time from an NTP server.
     *
     * @return a value among Y_READINESS_DOWN, Y_READINESS_EXISTS, Y_READINESS_LINKED, Y_READINESS_LAN_OK
     * and Y_READINESS_WWW_OK corresponding to the current established working mode of the network interface
     *
     * On failure, throws an exception or returns Y_READINESS_INVALID.
     */
    get_readiness() {
        return this.liveFunc._readiness;
    }

    /**
     * Returns the MAC address of the network interface. The MAC address is also available on a sticker
     * on the module, in both numeric and barcode forms.
     *
     * @return a string corresponding to the MAC address of the network interface
     *
     * On failure, throws an exception or returns Y_MACADDRESS_INVALID.
     */
    get_macAddress() {
        return this.liveFunc._macAddress;
    }

    /**
     * Returns the IP address currently in use by the device. The address may have been configured
     * statically, or provided by a DHCP server.
     *
     * @return a string corresponding to the IP address currently in use by the device
     *
     * On failure, throws an exception or returns Y_IPADDRESS_INVALID.
     */
    get_ipAddress() {
        return this.liveFunc._ipAddress;
    }

    /**
     * Returns the subnet mask currently used by the device.
     *
     * @return a string corresponding to the subnet mask currently used by the device
     *
     * On failure, throws an exception or returns Y_SUBNETMASK_INVALID.
     */
    get_subnetMask() {
        return this.liveFunc._subnetMask;
    }

    /**
     * Returns the IP address of the router on the device subnet (default gateway).
     *
     * @return a string corresponding to the IP address of the router on the device subnet (default gateway)
     *
     * On failure, throws an exception or returns Y_ROUTER_INVALID.
     */
    get_router() {
        return this.liveFunc._router;
    }

    get_ipConfig() {
        return this.liveFunc._ipConfig;
    }

    set_ipConfig(newval) {
        this.liveFunc.set_ipConfig(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the primary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the primary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_PRIMARYDNS_INVALID.
     */
    get_primaryDNS() {
        return this.liveFunc._primaryDNS;
    }

    /**
     * Changes the IP address of the primary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the primary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_primaryDNS(newval) {
        this.liveFunc.set_primaryDNS(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the secondary name server to be used by the module.
     *
     * @return a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * On failure, throws an exception or returns Y_SECONDARYDNS_INVALID.
     */
    get_secondaryDNS() {
        return this.liveFunc._secondaryDNS;
    }

    /**
     * Changes the IP address of the secondary name server to be used by the module.
     * When using DHCP, if a value is specified, it overrides the value received from the DHCP server.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the secondary name server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_secondaryDNS(newval) {
        this.liveFunc.set_secondaryDNS(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the IP address of the NTP server to be used by the device.
     *
     * @return a string corresponding to the IP address of the NTP server to be used by the device
     *
     * On failure, throws an exception or returns Y_NTPSERVER_INVALID.
     */
    get_ntpServer() {
        return this.liveFunc._ntpServer;
    }

    /**
     * Changes the IP address of the NTP server to be used by the module.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param newval : a string corresponding to the IP address of the NTP server to be used by the module
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_ntpServer(newval) {
        this.liveFunc.set_ntpServer(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hash string if a password has been set for "user" user,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for "user" user,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_USERPASSWORD_INVALID.
     */
    get_userPassword() {
        return this.liveFunc._userPassword;
    }

    /**
     * Changes the password for the "user" user. This password becomes instantly required
     * to perform any use of the module. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "user" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_userPassword(newval) {
        this.liveFunc.set_userPassword(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hash string if a password has been set for user "admin",
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hash string if a password has been set for user "admin",
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_ADMINPASSWORD_INVALID.
     */
    get_adminPassword() {
        return this.liveFunc._adminPassword;
    }

    /**
     * Changes the password for the "admin" user. This password becomes instantly required
     * to perform any change of the module state. If the specified value is an
     * empty string, a password is not required anymore.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the password for the "admin" user
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_adminPassword(newval) {
        this.liveFunc.set_adminPassword(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return an integer corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns Y_HTTPPORT_INVALID.
     */
    get_httpPort() {
        return this.liveFunc._httpPort;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval : an integer corresponding to the default HTML page returned by the hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_httpPort(newval) {
        this.liveFunc.set_httpPort(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTML page to serve for the URL "/"" of the hub.
     *
     * @return a string corresponding to the HTML page to serve for the URL "/"" of the hub
     *
     * On failure, throws an exception or returns Y_DEFAULTPAGE_INVALID.
     */
    get_defaultPage() {
        return this.liveFunc._defaultPage;
    }

    /**
     * Changes the default HTML page returned by the hub. If not value are set the hub return
     * "index.html" which is the web interface of the hub. It is possible de change this page
     * for file that has been uploaded on the hub.
     *
     * @param newval : a string corresponding to the default HTML page returned by the hub
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_defaultPage(newval) {
        this.liveFunc.set_defaultPage(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @return either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation state of
     * the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * On failure, throws an exception or returns Y_DISCOVERABLE_INVALID.
     */
    get_discoverable() {
        return this.liveFunc._discoverable;
    }

    /**
     * Changes the activation state of the multicast announce protocols to allow easy
     * discovery of the module in the network neighborhood (uPnP/Bonjour protocol).
     *
     * @param newval : either Y_DISCOVERABLE_FALSE or Y_DISCOVERABLE_TRUE, according to the activation
     * state of the multicast announce protocols to allow easy
     *         discovery of the module in the network neighborhood (uPnP/Bonjour protocol)
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_discoverable(newval) {
        this.liveFunc.set_discoverable(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss.
     *
     * @return an integer corresponding to the allowed downtime of the WWW link (in seconds) before
     * triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * On failure, throws an exception or returns Y_WWWWATCHDOGDELAY_INVALID.
     */
    get_wwwWatchdogDelay() {
        return this.liveFunc._wwwWatchdogDelay;
    }

    /**
     * Changes the allowed downtime of the WWW link (in seconds) before triggering an automated
     * reboot to try to recover Internet connectivity. A zero value disables automated reboot
     * in case of Internet connectivity loss. The smallest valid non-zero timeout is
     * 90 seconds.
     *
     * @param newval : an integer corresponding to the allowed downtime of the WWW link (in seconds)
     * before triggering an automated
     *         reboot to try to recover Internet connectivity
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_wwwWatchdogDelay(newval) {
        this.liveFunc.set_wwwWatchdogDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the callback URL to notify of significant state changes.
     *
     * @return a string corresponding to the callback URL to notify of significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKURL_INVALID.
     */
    get_callbackUrl() {
        return this.liveFunc._callbackUrl;
    }

    /**
     * Changes the callback URL to notify significant state changes. Remember to call the
     * saveToFlash() method of the module if the modification must be kept.
     *
     * @param newval : a string corresponding to the callback URL to notify significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackUrl(newval) {
        this.liveFunc.set_callbackUrl(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the HTTP method used to notify callbacks for significant state changes.
     *
     * @return a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * On failure, throws an exception or returns Y_CALLBACKMETHOD_INVALID.
     */
    get_callbackMethod() {
        return this.liveFunc._callbackMethod;
    }

    /**
     * Changes the HTTP method used to notify callbacks for significant state changes.
     *
     * @param newval : a value among Y_CALLBACKMETHOD_POST, Y_CALLBACKMETHOD_GET and Y_CALLBACKMETHOD_PUT
     * corresponding to the HTTP method used to notify callbacks for significant state changes
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMethod(newval) {
        this.liveFunc.set_callbackMethod(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the encoding standard to use for representing notification values.
     *
     * @return a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB and Y_CALLBACKENCODING_MQTT corresponding to the encoding standard to
     * use for representing notification values
     *
     * On failure, throws an exception or returns Y_CALLBACKENCODING_INVALID.
     */
    get_callbackEncoding() {
        return this.liveFunc._callbackEncoding;
    }

    /**
     * Changes the encoding standard to use for representing notification values.
     *
     * @param newval : a value among Y_CALLBACKENCODING_FORM, Y_CALLBACKENCODING_JSON,
     * Y_CALLBACKENCODING_JSON_ARRAY, Y_CALLBACKENCODING_CSV, Y_CALLBACKENCODING_YOCTO_API,
     * Y_CALLBACKENCODING_JSON_NUM, Y_CALLBACKENCODING_EMONCMS, Y_CALLBACKENCODING_AZURE,
     * Y_CALLBACKENCODING_INFLUXDB and Y_CALLBACKENCODING_MQTT corresponding to the encoding standard to
     * use for representing notification values
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackEncoding(newval) {
        this.liveFunc.set_callbackEncoding(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns a hashed version of the notification callback credentials if set,
     * or an empty string otherwise.
     *
     * @return a string corresponding to a hashed version of the notification callback credentials if set,
     *         or an empty string otherwise
     *
     * On failure, throws an exception or returns Y_CALLBACKCREDENTIALS_INVALID.
     */
    get_callbackCredentials() {
        return this.liveFunc._callbackCredentials;
    }

    /**
     * Changes the credentials required to connect to the callback address. The credentials
     * must be provided as returned by function get_callbackCredentials,
     * in the form username:hash. The method used to compute the hash varies according
     * to the the authentication scheme implemented by the callback, For Basic authentication,
     * the hash is the MD5 of the string username:password. For Digest authentication,
     * the hash is the MD5 of the string username:realm:password. For a simpler
     * way to configure callback credentials, use function callbackLogin instead.
     * Remember to call the saveToFlash() method of the module if the
     * modification must be kept.
     *
     * @param newval : a string corresponding to the credentials required to connect to the callback address
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackCredentials(newval) {
        this.liveFunc.set_callbackCredentials(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the initial waiting time before first callback notifications, in seconds.
     *
     * @return an integer corresponding to the initial waiting time before first callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKINITIALDELAY_INVALID.
     */
    get_callbackInitialDelay() {
        return this.liveFunc._callbackInitialDelay;
    }

    /**
     * Changes the initial waiting time before first callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the initial waiting time before first callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackInitialDelay(newval) {
        this.liveFunc.set_callbackInitialDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the minimum waiting time between two callback notifications, in seconds.
     *
     * @return an integer corresponding to the minimum waiting time between two callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKMINDELAY_INVALID.
     */
    get_callbackMinDelay() {
        return this.liveFunc._callbackMinDelay;
    }

    /**
     * Changes the minimum waiting time between two callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the minimum waiting time between two callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMinDelay(newval) {
        this.liveFunc.set_callbackMinDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the maximum waiting time between two callback notifications, in seconds.
     *
     * @return an integer corresponding to the maximum waiting time between two callback notifications, in seconds
     *
     * On failure, throws an exception or returns Y_CALLBACKMAXDELAY_INVALID.
     */
    get_callbackMaxDelay() {
        return this.liveFunc._callbackMaxDelay;
    }

    /**
     * Changes the maximum waiting time between two callback notifications, in seconds.
     *
     * @param newval : an integer corresponding to the maximum waiting time between two callback
     * notifications, in seconds
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_callbackMaxDelay(newval) {
        this.liveFunc.set_callbackMaxDelay(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the current consumed by the module from Power-over-Ethernet (PoE), in milli-amps.
     * The current consumption is measured after converting PoE source to 5 Volt, and should
     * never exceed 1800 mA.
     *
     * @return an integer corresponding to the current consumed by the module from Power-over-Ethernet
     * (PoE), in milli-amps
     *
     * On failure, throws an exception or returns Y_POECURRENT_INVALID.
     */
    get_poeCurrent() {
        return this.liveFunc._poeCurrent;
    }

    /**
     * Changes the configuration of the network interface to enable the use of an
     * IP address received from a DHCP server. Until an address is received from a DHCP
     * server, the module uses the IP parameters specified to this function.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param fallbackIpAddr : fallback IP address, to be used when no DHCP reply is received
     * @param fallbackSubnetMaskLen : fallback subnet mask length when no DHCP reply is received, as an
     *         integer (eg. 24 means 255.255.255.0)
     * @param fallbackRouter : fallback router IP address, to be used when no DHCP reply is received
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useDHCP(fallbackIpAddr, fallbackSubnetMaskLen, fallbackRouter) {
        this.liveFunc.useDHCP(fallbackIpAddr, fallbackSubnetMaskLen, fallbackRouter);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Changes the configuration of the network interface to use a static IP address.
     * Remember to call the saveToFlash() method and then to reboot the module to apply this setting.
     *
     * @param ipAddress : device IP address
     * @param subnetMaskLen : subnet mask length, as an integer (eg. 24 means 255.255.255.0)
     * @param router : router IP address (default gateway)
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    useStaticIP(ipAddress, subnetMaskLen, router) {
        this.liveFunc.useStaticIP(ipAddress, subnetMaskLen, router);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Trigger an HTTP callback quickly. This function can even be called within
     * an HTTP callback, in which case the next callback will be triggered 5 seconds
     * after the end of the current callback, regardless if the minimum time between
     * callbacks configured in the device.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    triggerCallback() {
        this.liveFunc.triggerCallback();
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of YNetwork accessors declaration)
}

exports.YNetworkProxy = YNetworkProxy; //--- (Network functions)

/**
 * Retrieves a network interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the network interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YNetwork.isOnline() to test if the network interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a network interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the network interface
 *
 * @return {YNetwork} a YNetwork object allowing you to drive the network interface.
 */

function yFindNetwork(func) {
    return YNetwork.FindNetwork(func);
}

/**
 * Starts the enumeration of network interfaces currently accessible.
 * Use the method YNetwork.nextNetwork() to iterate on
 * next network interfaces.
 *
 * @return {YNetwork} a pointer to a YNetwork object, corresponding to
 *         the first network interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstNetwork() {
    return YNetwork.FirstNetwork();
}

//--- (end of Network functions)
