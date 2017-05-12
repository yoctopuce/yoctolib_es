'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YMessageBoxProxy = exports.YMessageBox = exports.Y_COMMAND_INVALID = exports.Y_PDURECEIVED_INVALID = exports.Y_PDUSENT_INVALID = exports.Y_SLOTSBITMAP_INVALID = exports.Y_SLOTSCOUNT_INVALID = exports.Y_SLOTSINUSE_INVALID = exports.YSms = undefined;
exports.yFindMessageBox = yFindMessageBox;
exports.yFirstMessageBox = yFirstMessageBox;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * $Id: yocto_messagebox.js 27420 2017-05-11 10:00:50Z seb $
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Implements the high-level API for MessageBox functions
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

//--- (generated code: YSms return codes)
//--- (end of generated code: YSms return codes)
//--- (generated code: YSms definitions)
//--- (end of generated code: YSms definitions)

//--- (generated code: YSms class start)
/**
 * YSms Class: SMS message sent or received
 *
 *
 */
//--- (end of generated code: YSms class start)

class YSms {
    constructor(obj_mbox) {
        //--- (generated code: YSms constructor)
        /** @member {YMessageBox} **/
        this._mbox = null;
        /** @member {number} **/
        this._slot = 0;
        /** @member {boolean} **/
        this._deliv = 0;
        /** @member {string} **/
        this._smsc = '';
        /** @member {number} **/
        this._mref = 0;
        /** @member {string} **/
        this._orig = '';
        /** @member {string} **/
        this._dest = '';
        /** @member {number} **/
        this._pid = 0;
        /** @member {number} **/
        this._alphab = 0;
        /** @member {number} **/
        this._mclass = 0;
        /** @member {string} **/
        this._stamp = '';
        /** @member {Uint8Array} **/
        this._udh = new Uint8Array(0);
        /** @member {Uint8Array} **/
        this._udata = new Uint8Array(0);
        /** @member {number} **/
        this._npdu = 0;
        /** @member {Uint8Array} **/
        this._pdu = new Uint8Array(0);
        /** @member {YSms[]} **/
        this._parts = [];
        /** @member {string} **/
        this._aggSig = '';
        /** @member {number} **/
        this._aggIdx = 0;
        /** @member {number} **/
        this._aggCnt = 0;
        //--- (end of generated code: YSms constructor)
        this._mbox = obj_mbox;
    }

    //--- (generated code: YSms implementation)

    get_slot() {
        var _this = this;

        return _asyncToGenerator(function* () {
            return _this._slot;
        })();
    }

    get_smsc() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            return _this2._smsc;
        })();
    }

    get_msgRef() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            return _this3._mref;
        })();
    }

    get_sender() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            return _this4._orig;
        })();
    }

    get_recipient() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            return _this5._dest;
        })();
    }

    get_protocolId() {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            return _this6._pid;
        })();
    }

    isReceived() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            return _this7._deliv;
        })();
    }

    get_alphabet() {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            return _this8._alphab;
        })();
    }

    get_msgClass() {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            if ((_this9._mclass & 16) == 0) {
                return -1;
            }
            return _this9._mclass & 3;
        })();
    }

    get_dcs() {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            return _this10._mclass | _this10._alphab << 2;
        })();
    }

    get_timestamp() {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return _this11._stamp;
        })();
    }

    get_userDataHeader() {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            return _this12._udh;
        })();
    }

    get_userData() {
        var _this13 = this;

        return _asyncToGenerator(function* () {
            return _this13._udata;
        })();
    }

    get_textData() {
        var _this14 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let isolatin;
            /** @type {number} **/
            let isosize;
            /** @type {number} **/
            let i;
            if (_this14._alphab == 0) {
                // using GSM standard 7-bit alphabet
                return yield _this14._mbox.gsm2str(_this14._udata);
            }
            if (_this14._alphab == 2) {
                // using UCS-2 alphabet
                isosize = _this14._udata.length >> 1;
                isolatin = new Uint8Array(isosize);
                i = 0;
                while (i < isosize) {
                    isolatin.set([_this14._udata[2 * i + 1]], i);
                    i = i + 1;
                }
                return _this14._yapi.imm_bin2str(isolatin);
            }
            // default: convert 8 bit to string as-is
            return _this14._yapi.imm_bin2str(_this14._udata);
        })();
    }

    get_unicodeData() {
        var _this15 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let unisize;
            /** @type {number} **/
            let unival;
            /** @type {number} **/
            let i;
            if (_this15._alphab == 0) {
                // using GSM standard 7-bit alphabet
                return yield _this15._mbox.gsm2unicode(_this15._udata);
            }
            if (_this15._alphab == 2) {
                // using UCS-2 alphabet
                unisize = _this15._udata.length >> 1;
                res.length = 0;
                i = 0;
                while (i < unisize) {
                    unival = 256 * _this15._udata[2 * i] + _this15._udata[2 * i + 1];
                    res.push(unival);
                    i = i + 1;
                }
            } else {
                // return straight 8-bit values
                unisize = _this15._udata.length;
                res.length = 0;
                i = 0;
                while (i < unisize) {
                    res.push(_this15._udata[i] + 0);
                    i = i + 1;
                }
            }
            return res;
        })();
    }

    get_partCount() {
        var _this16 = this;

        return _asyncToGenerator(function* () {
            if (_this16._npdu == 0) {
                yield _this16.generatePdu();
            }
            return _this16._npdu;
        })();
    }

    get_pdu() {
        var _this17 = this;

        return _asyncToGenerator(function* () {
            if (_this17._npdu == 0) {
                yield _this17.generatePdu();
            }
            return _this17._pdu;
        })();
    }

    get_parts() {
        var _this18 = this;

        return _asyncToGenerator(function* () {
            if (_this18._npdu == 0) {
                yield _this18.generatePdu();
            }
            return _this18._parts;
        })();
    }

    get_concatSignature() {
        var _this19 = this;

        return _asyncToGenerator(function* () {
            if (_this19._npdu == 0) {
                yield _this19.generatePdu();
            }
            return _this19._aggSig;
        })();
    }

    get_concatIndex() {
        var _this20 = this;

        return _asyncToGenerator(function* () {
            if (_this20._npdu == 0) {
                yield _this20.generatePdu();
            }
            return _this20._aggIdx;
        })();
    }

    get_concatCount() {
        var _this21 = this;

        return _asyncToGenerator(function* () {
            if (_this21._npdu == 0) {
                yield _this21.generatePdu();
            }
            return _this21._aggCnt;
        })();
    }

    set_slot(val) {
        var _this22 = this;

        return _asyncToGenerator(function* () {
            _this22._slot = val;
            return _this22._yapi.SUCCESS;
        })();
    }

    set_received(val) {
        var _this23 = this;

        return _asyncToGenerator(function* () {
            _this23._deliv = val;
            return _this23._yapi.SUCCESS;
        })();
    }

    set_smsc(val) {
        var _this24 = this;

        return _asyncToGenerator(function* () {
            _this24._smsc = val;
            _this24._npdu = 0;
            return _this24._yapi.SUCCESS;
        })();
    }

    set_msgRef(val) {
        var _this25 = this;

        return _asyncToGenerator(function* () {
            _this25._mref = val;
            _this25._npdu = 0;
            return _this25._yapi.SUCCESS;
        })();
    }

    set_sender(val) {
        var _this26 = this;

        return _asyncToGenerator(function* () {
            _this26._orig = val;
            _this26._npdu = 0;
            return _this26._yapi.SUCCESS;
        })();
    }

    set_recipient(val) {
        var _this27 = this;

        return _asyncToGenerator(function* () {
            _this27._dest = val;
            _this27._npdu = 0;
            return _this27._yapi.SUCCESS;
        })();
    }

    set_protocolId(val) {
        var _this28 = this;

        return _asyncToGenerator(function* () {
            _this28._pid = val;
            _this28._npdu = 0;
            return _this28._yapi.SUCCESS;
        })();
    }

    set_alphabet(val) {
        var _this29 = this;

        return _asyncToGenerator(function* () {
            _this29._alphab = val;
            _this29._npdu = 0;
            return _this29._yapi.SUCCESS;
        })();
    }

    set_msgClass(val) {
        var _this30 = this;

        return _asyncToGenerator(function* () {
            if (val == -1) {
                _this30._mclass = 0;
            } else {
                _this30._mclass = 16 + val;
            }
            _this30._npdu = 0;
            return _this30._yapi.SUCCESS;
        })();
    }

    set_dcs(val) {
        var _this31 = this;

        return _asyncToGenerator(function* () {
            _this31._alphab = val >> 2 & 3;
            _this31._mclass = val & 16 + 3;
            _this31._npdu = 0;
            return _this31._yapi.SUCCESS;
        })();
    }

    set_timestamp(val) {
        var _this32 = this;

        return _asyncToGenerator(function* () {
            _this32._stamp = val;
            _this32._npdu = 0;
            return _this32._yapi.SUCCESS;
        })();
    }

    set_userDataHeader(val) {
        var _this33 = this;

        return _asyncToGenerator(function* () {
            _this33._udh = val;
            _this33._npdu = 0;
            yield _this33.parseUserDataHeader();
            return _this33._yapi.SUCCESS;
        })();
    }

    set_userData(val) {
        var _this34 = this;

        return _asyncToGenerator(function* () {
            _this34._udata = val;
            _this34._npdu = 0;
            return _this34._yapi.SUCCESS;
        })();
    }

    convertToUnicode() {
        var _this35 = this;

        return _asyncToGenerator(function* () {
            /** @type {number[]} **/
            let ucs2 = [];
            /** @type {number} **/
            let udatalen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let uni;
            if (_this35._alphab == 2) {
                return _this35._yapi.SUCCESS;
            }
            if (_this35._alphab == 0) {
                ucs2 = yield _this35._mbox.gsm2unicode(_this35._udata);
            } else {
                udatalen = _this35._udata.length;
                ucs2.length = 0;
                i = 0;
                while (i < udatalen) {
                    uni = _this35._udata[i];
                    ucs2.push(uni);
                    i = i + 1;
                }
            }
            _this35._alphab = 2;
            _this35._udata = new Uint8Array(0);
            yield _this35.addUnicodeData(ucs2);
            return _this35._yapi.SUCCESS;
        })();
    }

    addText(val) {
        var _this36 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let udata;
            /** @type {number} **/
            let udatalen;
            /** @type {Uint8Array} **/
            let newdata;
            /** @type {number} **/
            let newdatalen;
            /** @type {number} **/
            let i;
            if (val.length == 0) {
                return _this36._yapi.SUCCESS;
            }
            if (_this36._alphab == 0) {
                // Try to append using GSM 7-bit alphabet
                newdata = yield _this36._mbox.str2gsm(val);
                newdatalen = newdata.length;
                if (newdatalen == 0) {
                    // 7-bit not possible, switch to unicode
                    yield _this36.convertToUnicode();
                    newdata = _this36._yapi.imm_str2bin(val);
                    newdatalen = newdata.length;
                }
            } else {
                newdata = _this36._yapi.imm_str2bin(val);
                newdatalen = newdata.length;
            }
            udatalen = _this36._udata.length;
            if (_this36._alphab == 2) {
                // Append in unicode directly
                udata = new Uint8Array(udatalen + 2 * newdatalen);
                i = 0;
                while (i < udatalen) {
                    udata.set([_this36._udata[i]], i);
                    i = i + 1;
                }
                i = 0;
                while (i < newdatalen) {
                    udata.set([newdata[i]], udatalen + 1);
                    udatalen = udatalen + 2;
                    i = i + 1;
                }
            } else {
                // Append binary buffers
                udata = new Uint8Array(udatalen + newdatalen);
                i = 0;
                while (i < udatalen) {
                    udata.set([_this36._udata[i]], i);
                    i = i + 1;
                }
                i = 0;
                while (i < newdatalen) {
                    udata.set([newdata[i]], udatalen);
                    udatalen = udatalen + 1;
                    i = i + 1;
                }
            }
            return yield _this36.set_userData(udata);
        })();
    }

    addUnicodeData(val) {
        var _this37 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let arrlen;
            /** @type {number} **/
            let newdatalen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let uni;
            /** @type {Uint8Array} **/
            let udata;
            /** @type {number} **/
            let udatalen;
            /** @type {number} **/
            let surrogate;
            if (_this37._alphab != 2) {
                yield _this37.convertToUnicode();
            }
            // compute number of 16-bit code units
            arrlen = val.length;
            newdatalen = arrlen;
            i = 0;
            while (i < arrlen) {
                uni = val[i];
                if (uni > 65535) {
                    newdatalen = newdatalen + 1;
                }
                i = i + 1;
            }
            // now build utf-16 buffer
            udatalen = _this37._udata.length;
            udata = new Uint8Array(udatalen + 2 * newdatalen);
            i = 0;
            while (i < udatalen) {
                udata.set([_this37._udata[i]], i);
                i = i + 1;
            }
            i = 0;
            while (i < arrlen) {
                uni = val[i];
                if (uni >= 65536) {
                    surrogate = uni - 65536;
                    uni = (surrogate >> 10 & 1023) + 55296;
                    udata.set([uni >> 8], udatalen);
                    udata.set([uni & 255], udatalen + 1);
                    udatalen = udatalen + 2;
                    uni = (surrogate & 1023) + 56320;
                }
                udata.set([uni >> 8], udatalen);
                udata.set([uni & 255], udatalen + 1);
                udatalen = udatalen + 2;
                i = i + 1;
            }
            return yield _this37.set_userData(udata);
        })();
    }

    set_pdu(pdu) {
        var _this38 = this;

        return _asyncToGenerator(function* () {
            _this38._pdu = pdu;
            _this38._npdu = 1;
            return yield _this38.parsePdu(pdu);
        })();
    }

    set_parts(parts) {
        var _this39 = this;

        return _asyncToGenerator(function* () {
            /** @type {YSms[]} **/
            let sorted = [];
            /** @type {number} **/
            let partno;
            /** @type {number} **/
            let initpartno;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let retcode;
            /** @type {number} **/
            let totsize;
            /** @type {YSms} **/
            let subsms;
            /** @type {Uint8Array} **/
            let subdata;
            /** @type {Uint8Array} **/
            let res;
            _this39._npdu = parts.length;
            if (_this39._npdu == 0) {
                return _this39._yapi.INVALID_ARGUMENT;
            }
            sorted.length = 0;
            partno = 0;
            while (partno < _this39._npdu) {
                initpartno = partno;
                i = 0;
                while (i < _this39._npdu) {
                    subsms = parts[i];
                    if ((yield subsms.get_concatIndex()) == partno) {
                        sorted.push(subsms);
                        partno = partno + 1;
                    }
                    i = i + 1;
                }
                if (initpartno == partno) {
                    partno = partno + 1;
                }
            }
            _this39._parts = sorted;
            _this39._npdu = sorted.length;
            // inherit header fields from first part
            subsms = _this39._parts[0];
            retcode = yield _this39.parsePdu((yield subsms.get_pdu()));
            if (retcode != _this39._yapi.SUCCESS) {
                return retcode;
            }
            // concatenate user data from all parts
            totsize = 0;
            partno = 0;
            while (partno < _this39._parts.length) {
                subsms = _this39._parts[partno];
                subdata = yield subsms.get_userData();
                totsize = totsize + subdata.length;
                partno = partno + 1;
            }
            res = new Uint8Array(totsize);
            totsize = 0;
            partno = 0;
            while (partno < _this39._parts.length) {
                subsms = _this39._parts[partno];
                subdata = yield subsms.get_userData();
                i = 0;
                while (i < subdata.length) {
                    res.set([subdata[i]], totsize);
                    totsize = totsize + 1;
                    i = i + 1;
                }
                partno = partno + 1;
            }
            _this39._udata = res;
            return _this39._yapi.SUCCESS;
        })();
    }

    encodeAddress(addr) {
        var _this40 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let bytes;
            /** @type {number} **/
            let srclen;
            /** @type {number} **/
            let numlen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let val;
            /** @type {number} **/
            let digit;
            /** @type {Uint8Array} **/
            let res;
            bytes = _this40._yapi.imm_str2bin(addr);
            srclen = bytes.length;
            numlen = 0;
            i = 0;
            while (i < srclen) {
                val = bytes[i];
                if (val >= 48 && val < 58) {
                    numlen = numlen + 1;
                }
                i = i + 1;
            }
            if (numlen == 0) {
                res = new Uint8Array(1);
                res.set([0], 0);
                return res;
            }
            res = new Uint8Array(2 + (numlen + 1 >> 1));
            res.set([numlen], 0);
            if (bytes[0] == 43) {
                res.set([145], 1);
            } else {
                res.set([129], 1);
            }
            numlen = 4;
            digit = 0;
            i = 0;
            while (i < srclen) {
                val = bytes[i];
                if (val >= 48 && val < 58) {
                    if ((numlen & 1) == 0) {
                        digit = val - 48;
                    } else {
                        res.set([digit + 16 * (val - 48)], numlen >> 1);
                    }
                    numlen = numlen + 1;
                }
                i = i + 1;
            }
            // pad with F if needed
            if ((numlen & 1) != 0) {
                res.set([digit + 240], numlen >> 1);
            }
            return res;
        })();
    }

    decodeAddress(addr, ofs, siz) {
        var _this41 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let addrType;
            /** @type {Uint8Array} **/
            let gsm7;
            /** @type {string} **/
            let res;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let rpos;
            /** @type {number} **/
            let carry;
            /** @type {number} **/
            let nbits;
            /** @type {number} **/
            let byt;
            if (siz == 0) {
                return '';
            }
            res = '';
            addrType = addr[ofs] & 112;
            if (addrType == 80) {
                // alphanumeric number
                siz = parseInt(4 * siz / 7, 10);
                gsm7 = new Uint8Array(siz);
                rpos = 1;
                carry = 0;
                nbits = 0;
                i = 0;
                while (i < siz) {
                    if (nbits == 7) {
                        gsm7.set([carry], i);
                        carry = 0;
                        nbits = 0;
                    } else {
                        byt = addr[ofs + rpos];
                        rpos = rpos + 1;
                        gsm7.set([carry | byt << nbits & 127], i);
                        carry = byt >> 7 - nbits;
                        nbits = nbits + 1;
                    }
                    i = i + 1;
                }
                return yield _this41._mbox.gsm2str(gsm7);
            } else {
                // standard phone number
                if (addrType == 16) {
                    res = '+';
                }
                siz = siz + 1 >> 1;
                i = 0;
                while (i < siz) {
                    byt = addr[ofs + i + 1];
                    res = res + '' + (byt & 15).toString(16) + '' + (byt >> 4).toString(16);
                    i = i + 1;
                }
                // remove padding digit if needed
                if (addr[ofs + siz] >> 4 == 15) {
                    res = res.substr(0, res.length - 1);
                }
                return res;
            }
        })();
    }

    encodeTimeStamp(exp) {
        var _this42 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let explen;
            /** @type {number} **/
            let i;
            /** @type {Uint8Array} **/
            let res;
            /** @type {number} **/
            let n;
            /** @type {Uint8Array} **/
            let expasc;
            /** @type {number} **/
            let v1;
            /** @type {number} **/
            let v2;
            explen = exp.length;
            if (explen == 0) {
                res = new Uint8Array(0);
                return res;
            }
            if (exp.substr(0, 1) == '+') {
                n = _this42._yapi.imm_atoi(exp.substr(1, explen - 1));
                res = new Uint8Array(1);
                if (n > 30 * 86400) {
                    n = 192 + parseInt((n + 6 * 86400) / (7 * 86400), 10);
                } else {
                    if (n > 86400) {
                        n = 166 + parseInt((n + 86399) / 86400, 10);
                    } else {
                        if (n > 43200) {
                            n = 143 + parseInt((n - 43200 + 1799) / 1800, 10);
                        } else {
                            n = -1 + parseInt((n + 299) / 300, 10);
                        }
                    }
                }
                if (n < 0) {
                    n = 0;
                }
                res.set([n], 0);
                return res;
            }
            if (exp.substr(4, 1) == '-' || exp.substr(4, 1) == '/') {
                // ignore century
                exp = exp.substr(2, explen - 2);
                explen = exp.length;
            }
            expasc = _this42._yapi.imm_str2bin(exp);
            res = new Uint8Array(7);
            n = 0;
            i = 0;
            while (i + 1 < explen && n < 7) {
                v1 = expasc[i];
                if (v1 >= 48 && v1 < 58) {
                    v2 = expasc[i + 1];
                    if (v2 >= 48 && v2 < 58) {
                        v1 = v1 - 48;
                        v2 = v2 - 48;
                        res.set([(v2 << 4) + v1], n);
                        n = n + 1;
                        i = i + 1;
                    }
                }
                i = i + 1;
            }
            while (n < 7) {
                res.set([0], n);
                n = n + 1;
            }
            if (i + 2 < explen) {
                // convert for timezone in cleartext ISO format +/-nn:nn
                v1 = expasc[i - 3];
                v2 = expasc[i];
                if ((v1 == 43 || v1 == 45) && v2 == 58) {
                    v1 = expasc[i + 1];
                    v2 = expasc[i + 2];
                    if (v1 >= 48 && v1 < 58 && v1 >= 48 && v1 < 58) {
                        v1 = parseInt((10 * (v1 - 48) + (v2 - 48)) / 15, 10);
                        n = n - 1;
                        v2 = 4 * res[n] + v1;
                        if (expasc[i - 3] == 45) {
                            v2 += 128;
                        }
                        res.set([v2], n);
                    }
                }
            }
            return res;
        })();
    }

    decodeTimeStamp(exp, ofs, siz) {
        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let n;
            /** @type {string} **/
            let res;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let byt;
            /** @type {string} **/
            let sign;
            /** @type {string} **/
            let hh;
            /** @type {string} **/
            let ss;
            if (siz < 1) {
                return '';
            }
            if (siz == 1) {
                n = exp[ofs];
                if (n < 144) {
                    n = n * 300;
                } else {
                    if (n < 168) {
                        n = (n - 143) * 1800;
                    } else {
                        if (n < 197) {
                            n = (n - 166) * 86400;
                        } else {
                            n = (n - 192) * 7 * 86400;
                        }
                    }
                }
                return '+' + String(Math.round(n));
            }
            res = '20';
            i = 0;
            while (i < siz && i < 6) {
                byt = exp[ofs + i];
                res = res + '' + (byt & 15).toString(16) + '' + (byt >> 4).toString(16);
                if (i < 3) {
                    if (i < 2) {
                        res = res + '-';
                    } else {
                        res = res + ' ';
                    }
                } else {
                    if (i < 5) {
                        res = res + ':';
                    }
                }
                i = i + 1;
            }
            if (siz == 7) {
                byt = exp[ofs + i];
                sign = '+';
                if ((byt & 8) != 0) {
                    byt = byt - 8;
                    sign = '-';
                }
                byt = 10 * (byt & 15) + (byt >> 4);
                hh = String(Math.round(byt >> 2));
                ss = String(Math.round(15 * (byt & 3)));
                if (hh.length < 2) {
                    hh = '0' + hh;
                }
                if (ss.length < 2) {
                    ss = '0' + ss;
                }
                res = res + '' + sign + '' + hh + ':' + ss;
            }
            return res;
        })();
    }

    udataSize() {
        var _this43 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            /** @type {number} **/
            let udhsize;
            udhsize = _this43._udh.length;
            res = _this43._udata.length;
            if (_this43._alphab == 0) {
                if (udhsize > 0) {
                    res = res + parseInt((8 + 8 * udhsize + 6) / 7, 10);
                }
                res = parseInt((res * 7 + 7) / 8, 10);
            } else {
                if (udhsize > 0) {
                    res = res + 1 + udhsize;
                }
            }
            return res;
        })();
    }

    encodeUserData() {
        var _this44 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let udsize;
            /** @type {number} **/
            let udlen;
            /** @type {number} **/
            let udhsize;
            /** @type {number} **/
            let udhlen;
            /** @type {Uint8Array} **/
            let res;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let wpos;
            /** @type {number} **/
            let carry;
            /** @type {number} **/
            let nbits;
            /** @type {number} **/
            let thisb;
            // nbits = number of bits in carry
            udsize = yield _this44.udataSize();
            udhsize = _this44._udh.length;
            udlen = _this44._udata.length;
            res = new Uint8Array(1 + udsize);
            udhlen = 0;
            nbits = 0;
            carry = 0;
            // 1. Encode UDL
            if (_this44._alphab == 0) {
                // 7-bit encoding
                if (udhsize > 0) {
                    udhlen = parseInt((8 + 8 * udhsize + 6) / 7, 10);
                    nbits = 7 * udhlen - 8 - 8 * udhsize;
                }
                res.set([udhlen + udlen], 0);
            } else {
                // 8-bit encoding
                res.set([udsize], 0);
            }
            // 2. Encode UDHL and UDL
            wpos = 1;
            if (udhsize > 0) {
                res.set([udhsize], wpos);
                wpos = wpos + 1;
                i = 0;
                while (i < udhsize) {
                    res.set([_this44._udh[i]], wpos);
                    wpos = wpos + 1;
                    i = i + 1;
                }
            }
            // 3. Encode UD
            if (_this44._alphab == 0) {
                // 7-bit encoding
                i = 0;
                while (i < udlen) {
                    if (nbits == 0) {
                        carry = _this44._udata[i];
                        nbits = 7;
                    } else {
                        thisb = _this44._udata[i];
                        res.set([carry | thisb << nbits & 255], wpos);
                        wpos = wpos + 1;
                        nbits = nbits - 1;
                        carry = thisb >> 7 - nbits;
                    }
                    i = i + 1;
                }
                if (nbits > 0) {
                    res.set([carry], wpos);
                }
            } else {
                // 8-bit encoding
                i = 0;
                while (i < udlen) {
                    res.set([_this44._udata[i]], wpos);
                    wpos = wpos + 1;
                    i = i + 1;
                }
            }
            return res;
        })();
    }

    generateParts() {
        var _this45 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let udhsize;
            /** @type {number} **/
            let udlen;
            /** @type {number} **/
            let mss;
            /** @type {number} **/
            let partno;
            /** @type {number} **/
            let partlen;
            /** @type {Uint8Array} **/
            let newud;
            /** @type {Uint8Array} **/
            let newudh;
            /** @type {YSms} **/
            let newpdu;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let wpos;
            udhsize = _this45._udh.length;
            udlen = _this45._udata.length;
            mss = 140 - 1 - 5 - udhsize;
            if (_this45._alphab == 0) {
                mss = parseInt((mss * 8 - 6) / 7, 10);
            }
            _this45._npdu = parseInt((udlen + mss - 1) / mss, 10);
            _this45._parts.length = 0;
            partno = 0;
            wpos = 0;
            while (wpos < udlen) {
                partno = partno + 1;
                newudh = new Uint8Array(5 + udhsize);
                newudh.set([0], 0); // IEI: concatenated message
                newudh.set([3], 1); // IEDL: 3 bytes
                newudh.set([_this45._mref], 2);
                newudh.set([_this45._npdu], 3);
                newudh.set([partno], 4);
                i = 0;
                while (i < udhsize) {
                    newudh.set([_this45._udh[i]], 5 + i);
                    i = i + 1;
                }
                if (wpos + mss < udlen) {
                    partlen = mss;
                } else {
                    partlen = udlen - wpos;
                }
                newud = new Uint8Array(partlen);
                i = 0;
                while (i < partlen) {
                    newud.set([_this45._udata[wpos]], i);
                    wpos = wpos + 1;
                    i = i + 1;
                }
                newpdu = new YSms(_this45._mbox);
                yield newpdu.set_received((yield _this45.isReceived()));
                yield newpdu.set_smsc((yield _this45.get_smsc()));
                yield newpdu.set_msgRef((yield _this45.get_msgRef()));
                yield newpdu.set_sender((yield _this45.get_sender()));
                yield newpdu.set_recipient((yield _this45.get_recipient()));
                yield newpdu.set_protocolId((yield _this45.get_protocolId()));
                yield newpdu.set_dcs((yield _this45.get_dcs()));
                yield newpdu.set_timestamp((yield _this45.get_timestamp()));
                yield newpdu.set_userDataHeader(newudh);
                yield newpdu.set_userData(newud);
                _this45._parts.push(newpdu);
            }
            return _this45._yapi.SUCCESS;
        })();
    }

    generatePdu() {
        var _this46 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let sca;
            /** @type {Uint8Array} **/
            let hdr;
            /** @type {Uint8Array} **/
            let addr;
            /** @type {Uint8Array} **/
            let stamp;
            /** @type {Uint8Array} **/
            let udata;
            /** @type {number} **/
            let pdutyp;
            /** @type {number} **/
            let pdulen;
            /** @type {number} **/
            let i;
            // Determine if the message can fit within a single PDU
            _this46._parts.length = 0;
            if ((yield _this46.udataSize()) > 140) {
                // multiple PDU are needed
                _this46._pdu = new Uint8Array(0);
                return yield _this46.generateParts();
            }
            sca = yield _this46.encodeAddress(_this46._smsc);
            if (sca.length > 0) {
                sca.set([sca.length - 1], 0);
            }
            stamp = yield _this46.encodeTimeStamp(_this46._stamp);
            udata = yield _this46.encodeUserData();
            if (_this46._deliv) {
                addr = yield _this46.encodeAddress(_this46._orig);
                hdr = new Uint8Array(1);
                pdutyp = 0;
            } else {
                addr = yield _this46.encodeAddress(_this46._dest);
                _this46._mref = yield _this46._mbox.nextMsgRef();
                hdr = new Uint8Array(2);
                hdr.set([_this46._mref], 1);
                pdutyp = 1;
                if (stamp.length > 0) {
                    pdutyp = pdutyp + 16;
                }
                if (stamp.length == 7) {
                    pdutyp = pdutyp + 8;
                }
            }
            if (_this46._udh.length > 0) {
                pdutyp = pdutyp + 64;
            }
            hdr.set([pdutyp], 0);
            pdulen = sca.length + hdr.length + addr.length + 2 + stamp.length + udata.length;
            _this46._pdu = new Uint8Array(pdulen);
            pdulen = 0;
            i = 0;
            while (i < sca.length) {
                _this46._pdu.set([sca[i]], pdulen);
                pdulen = pdulen + 1;
                i = i + 1;
            }
            i = 0;
            while (i < hdr.length) {
                _this46._pdu.set([hdr[i]], pdulen);
                pdulen = pdulen + 1;
                i = i + 1;
            }
            i = 0;
            while (i < addr.length) {
                _this46._pdu.set([addr[i]], pdulen);
                pdulen = pdulen + 1;
                i = i + 1;
            }
            _this46._pdu.set([_this46._pid], pdulen);
            pdulen = pdulen + 1;
            _this46._pdu.set([yield _this46.get_dcs()], pdulen);
            pdulen = pdulen + 1;
            i = 0;
            while (i < stamp.length) {
                _this46._pdu.set([stamp[i]], pdulen);
                pdulen = pdulen + 1;
                i = i + 1;
            }
            i = 0;
            while (i < udata.length) {
                _this46._pdu.set([udata[i]], pdulen);
                pdulen = pdulen + 1;
                i = i + 1;
            }
            _this46._npdu = 1;
            return _this46._yapi.SUCCESS;
        })();
    }

    parseUserDataHeader() {
        var _this47 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let udhlen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let iei;
            /** @type {number} **/
            let ielen;
            /** @type {string} **/
            let sig;
            _this47._aggSig = '';
            _this47._aggIdx = 0;
            _this47._aggCnt = 0;
            udhlen = _this47._udh.length;
            i = 0;
            while (i + 1 < udhlen) {
                iei = _this47._udh[i];
                ielen = _this47._udh[i + 1];
                i = i + 2;
                if (i + ielen <= udhlen) {
                    if (iei == 0 && ielen == 3) {
                        // concatenated SMS, 8-bit ref
                        sig = _this47._orig + '-' + _this47._dest + '-' + ('00' + _this47._mref.toString(16)).slice(-2) + '-' + ('00' + _this47._udh[i].toString(16)).slice(-2);
                        _this47._aggSig = sig;
                        _this47._aggCnt = _this47._udh[i + 1];
                        _this47._aggIdx = _this47._udh[i + 2];
                    }
                    if (iei == 8 && ielen == 4) {
                        // concatenated SMS, 16-bit ref
                        sig = _this47._orig + '-' + _this47._dest + '-' + ('00' + _this47._mref.toString(16)).slice(-2) + '-' + ('00' + _this47._udh[i].toString(16)).slice(-2) + '' + ('00' + _this47._udh[i + 1].toString(16)).slice(-2);
                        _this47._aggSig = sig;
                        _this47._aggCnt = _this47._udh[i + 2];
                        _this47._aggIdx = _this47._udh[i + 3];
                    }
                }
                i = i + ielen;
            }
            return _this47._yapi.SUCCESS;
        })();
    }

    parsePdu(pdu) {
        var _this48 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let rpos;
            /** @type {number} **/
            let addrlen;
            /** @type {number} **/
            let pdutyp;
            /** @type {number} **/
            let tslen;
            /** @type {number} **/
            let dcs;
            /** @type {number} **/
            let udlen;
            /** @type {number} **/
            let udhsize;
            /** @type {number} **/
            let udhlen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let carry;
            /** @type {number} **/
            let nbits;
            /** @type {number} **/
            let thisb;
            _this48._pdu = pdu;
            _this48._npdu = 1;
            // parse meta-data
            _this48._smsc = yield _this48.decodeAddress(pdu, 1, 2 * (pdu[0] - 1));
            rpos = 1 + pdu[0];
            pdutyp = pdu[rpos];
            rpos = rpos + 1;
            _this48._deliv = (pdutyp & 3) == 0;
            if (_this48._deliv) {
                addrlen = pdu[rpos];
                rpos = rpos + 1;
                _this48._orig = yield _this48.decodeAddress(pdu, rpos, addrlen);
                _this48._dest = '';
                tslen = 7;
            } else {
                _this48._mref = pdu[rpos];
                rpos = rpos + 1;
                addrlen = pdu[rpos];
                rpos = rpos + 1;
                _this48._dest = yield _this48.decodeAddress(pdu, rpos, addrlen);
                _this48._orig = '';
                if ((pdutyp & 16) != 0) {
                    if ((pdutyp & 8) != 0) {
                        tslen = 7;
                    } else {
                        tslen = 1;
                    }
                } else {
                    tslen = 0;
                }
            }
            rpos = rpos + (addrlen + 3 >> 1);
            _this48._pid = pdu[rpos];
            rpos = rpos + 1;
            dcs = pdu[rpos];
            rpos = rpos + 1;
            _this48._alphab = dcs >> 2 & 3;
            _this48._mclass = dcs & 16 + 3;
            _this48._stamp = yield _this48.decodeTimeStamp(pdu, rpos, tslen);
            rpos = rpos + tslen;
            // parse user data (including udh)
            nbits = 0;
            carry = 0;
            udlen = pdu[rpos];
            rpos = rpos + 1;
            if ((pdutyp & 64) != 0) {
                udhsize = pdu[rpos];
                rpos = rpos + 1;
                _this48._udh = new Uint8Array(udhsize);
                i = 0;
                while (i < udhsize) {
                    _this48._udh.set([pdu[rpos]], i);
                    rpos = rpos + 1;
                    i = i + 1;
                }
                if (_this48._alphab == 0) {
                    // 7-bit encoding
                    udhlen = parseInt((8 + 8 * udhsize + 6) / 7, 10);
                    nbits = 7 * udhlen - 8 - 8 * udhsize;
                    if (nbits > 0) {
                        thisb = pdu[rpos];
                        rpos = rpos + 1;
                        carry = thisb >> nbits;
                        nbits = 8 - nbits;
                    }
                } else {
                    // byte encoding
                    udhlen = 1 + udhsize;
                }
                udlen = udlen - udhlen;
            } else {
                udhsize = 0;
                _this48._udh = new Uint8Array(0);
            }
            _this48._udata = new Uint8Array(udlen);
            if (_this48._alphab == 0) {
                // 7-bit encoding
                i = 0;
                while (i < udlen) {
                    if (nbits == 7) {
                        _this48._udata.set([carry], i);
                        carry = 0;
                        nbits = 0;
                    } else {
                        thisb = pdu[rpos];
                        rpos = rpos + 1;
                        _this48._udata.set([carry | thisb << nbits & 127], i);
                        carry = thisb >> 7 - nbits;
                        nbits = nbits + 1;
                    }
                    i = i + 1;
                }
            } else {
                // 8-bit encoding
                i = 0;
                while (i < udlen) {
                    _this48._udata.set([pdu[rpos]], i);
                    rpos = rpos + 1;
                    i = i + 1;
                }
            }
            yield _this48.parseUserDataHeader();
            return _this48._yapi.SUCCESS;
        })();
    }

    send() {
        var _this49 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let retcode;
            /** @type {YSms} **/
            let pdu;

            if (_this49._npdu == 0) {
                yield _this49.generatePdu();
            }
            if (_this49._npdu == 1) {
                return yield _this49._mbox._upload('sendSMS', _this49._pdu);
            }
            retcode = _this49._yapi.SUCCESS;
            i = 0;
            while (i < _this49._npdu && retcode == _this49._yapi.SUCCESS) {
                pdu = _this49._parts[i];
                retcode = yield pdu.send();
                i = i + 1;
            }
            return retcode;
        })();
    }

    deleteFromSIM() {
        var _this50 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let retcode;
            /** @type {YSms} **/
            let pdu;

            if (_this50._slot > 0) {
                return yield _this50._mbox.clearSIMSlot(_this50._slot);
            }
            retcode = _this50._yapi.SUCCESS;
            i = 0;
            while (i < _this50._npdu && retcode == _this50._yapi.SUCCESS) {
                pdu = _this50._parts[i];
                retcode = yield pdu.deleteFromSIM();
                i = i + 1;
            }
            return retcode;
        })();
    }

    //--- (end of generated code: YSms implementation)
}

exports.YSms = YSms; //--- (generated code: Sms functions)
//--- (end of generated code: Sms functions)

//--- (generated code: YMessageBox return codes)
//--- (end of generated code: YMessageBox return codes)
//--- (generated code: YMessageBox definitions)

var Y_SLOTSINUSE_INVALID = exports.Y_SLOTSINUSE_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_SLOTSCOUNT_INVALID = exports.Y_SLOTSCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_SLOTSBITMAP_INVALID = exports.Y_SLOTSBITMAP_INVALID = _yocto_api.YAPI.INVALID_STRING;
var Y_PDUSENT_INVALID = exports.Y_PDUSENT_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_PDURECEIVED_INVALID = exports.Y_PDURECEIVED_INVALID = _yocto_api.YAPI.INVALID_UINT;
var Y_COMMAND_INVALID = exports.Y_COMMAND_INVALID = _yocto_api.YAPI.INVALID_STRING;
//--- (end of generated code: YMessageBox definitions)

//--- (generated code: YMessageBox class start)
/**
 * YMessageBox Class: MessageBox function interface
 *
 * YMessageBox functions provides SMS sending and receiving capability to
 * GSM-enabled Yoctopuce devices.
 */
//--- (end of generated code: YMessageBox class start)

class YMessageBox extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YMessageBox constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'MessageBox';
        /** @member {number} **/
        this._slotsInUse = Y_SLOTSINUSE_INVALID;
        /** @member {number} **/
        this._slotsCount = Y_SLOTSCOUNT_INVALID;
        /** @member {string} **/
        this._slotsBitmap = Y_SLOTSBITMAP_INVALID;
        /** @member {number} **/
        this._pduSent = Y_PDUSENT_INVALID;
        /** @member {number} **/
        this._pduReceived = Y_PDURECEIVED_INVALID;
        /** @member {string} **/
        this._command = Y_COMMAND_INVALID;
        /** @member {number} **/
        this._nextMsgRef = 0;
        /** @member {string} **/
        this._prevBitmapStr = '';
        /** @member {YSms[]} **/
        this._pdus = [];
        /** @member {YSms[]} **/
        this._messages = [];
        /** @member {boolean} **/
        this._gsm2unicodeReady = 0;
        /** @member {number[]} **/
        this._gsm2unicode = [];
        /** @member {Uint8Array} **/
        this._iso2gsm = new Uint8Array(0);
        this.imm_setConst({
            SLOTSINUSE_INVALID: _yocto_api.YAPI.INVALID_UINT,
            SLOTSCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            SLOTSBITMAP_INVALID: _yocto_api.YAPI.INVALID_STRING,
            PDUSENT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            PDURECEIVED_INVALID: _yocto_api.YAPI.INVALID_UINT,
            COMMAND_INVALID: _yocto_api.YAPI.INVALID_STRING
        });
        //--- (end of generated code: YMessageBox constructor)
    }

    //--- (generated code: YMessageBox implementation)

    get_syncProxy() {
        var _this51 = this;

        return _asyncToGenerator(function* () {
            if (_this51._cacheExpiration <= _this51._yapi.GetTickCount()) {
                try {
                    yield _this51.load(_this51._yapi.defaultCacheValidity);
                } catch (e) {
                    // device might be offline
                }
            }
            var res = new YMessageBoxProxy(_this51);
            yield res._asyncInit();
            res._module = yield (yield _this51.module()).get_syncProxy();
            return res;
        })();
    }

    imm_parseAttr(name, val) {
        switch (name) {
            case 'slotsInUse':
                this._slotsInUse = parseInt(val);
                return 1;
            case 'slotsCount':
                this._slotsCount = parseInt(val);
                return 1;
            case 'slotsBitmap':
                this._slotsBitmap = val;
                return 1;
            case 'pduSent':
                this._pduSent = parseInt(val);
                return 1;
            case 'pduReceived':
                this._pduReceived = parseInt(val);
                return 1;
            case 'command':
                this._command = val;
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return {number} an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSINUSE_INVALID.
     */
    get_slotsInUse() {
        var _this52 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this52._cacheExpiration <= _this52._yapi.GetTickCount()) {
                if ((yield _this52.load(_this52._yapi.defaultCacheValidity)) != _this52._yapi.SUCCESS) {
                    return Y_SLOTSINUSE_INVALID;
                }
            }
            res = _this52._slotsInUse;
            return res;
        })();
    }

    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return {number} an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns YMessageBox.SLOTSCOUNT_INVALID.
     */
    get_slotsCount() {
        var _this53 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this53._cacheExpiration <= _this53._yapi.GetTickCount()) {
                if ((yield _this53.load(_this53._yapi.defaultCacheValidity)) != _this53._yapi.SUCCESS) {
                    return Y_SLOTSCOUNT_INVALID;
                }
            }
            res = _this53._slotsCount;
            return res;
        })();
    }

    get_slotsBitmap() {
        var _this54 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this54._cacheExpiration <= _this54._yapi.GetTickCount()) {
                if ((yield _this54.load(_this54._yapi.defaultCacheValidity)) != _this54._yapi.SUCCESS) {
                    return Y_SLOTSBITMAP_INVALID;
                }
            }
            res = _this54._slotsBitmap;
            return res;
        })();
    }

    /**
     * Returns the number of SMS units sent so far.
     *
     * @return {number} an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns YMessageBox.PDUSENT_INVALID.
     */
    get_pduSent() {
        var _this55 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this55._cacheExpiration <= _this55._yapi.GetTickCount()) {
                if ((yield _this55.load(_this55._yapi.defaultCacheValidity)) != _this55._yapi.SUCCESS) {
                    return Y_PDUSENT_INVALID;
                }
            }
            res = _this55._pduSent;
            return res;
        })();
    }

    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval {number} : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduSent(newval) {
        var _this56 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this56._setAttr('pduSent', rest_val);
        })();
    }

    /**
     * Returns the number of SMS units received so far.
     *
     * @return {number} an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns YMessageBox.PDURECEIVED_INVALID.
     */
    get_pduReceived() {
        var _this57 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let res;
            if (_this57._cacheExpiration <= _this57._yapi.GetTickCount()) {
                if ((yield _this57.load(_this57._yapi.defaultCacheValidity)) != _this57._yapi.SUCCESS) {
                    return Y_PDURECEIVED_INVALID;
                }
            }
            res = _this57._pduReceived;
            return res;
        })();
    }

    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval {number} : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduReceived(newval) {
        var _this58 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = String(newval);
            return yield _this58._setAttr('pduReceived', rest_val);
        })();
    }

    get_command() {
        var _this59 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let res;
            if (_this59._cacheExpiration <= _this59._yapi.GetTickCount()) {
                if ((yield _this59.load(_this59._yapi.defaultCacheValidity)) != _this59._yapi.SUCCESS) {
                    return Y_COMMAND_INVALID;
                }
            }
            res = _this59._command;
            return res;
        })();
    }

    set_command(newval) {
        var _this60 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let rest_val;
            rest_val = newval;
            return yield _this60._setAttr('command', rest_val);
        })();
    }

    /**
     * Retrieves a MessageBox interface for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the MessageBox interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the MessageBox interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MessageBox interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the MessageBox interface
     *
     * @return {YMessageBox} a YMessageBox object allowing you to drive the MessageBox interface.
     */
    static FindMessageBox(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('MessageBox', func);
        if (obj == null) {
            obj = new YMessageBox(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('MessageBox', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a MessageBox interface for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the MessageBox interface is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YMessageBox.isOnline() to test if the MessageBox interface is
     * indeed online at a given time. In case of ambiguity when looking for
     * a MessageBox interface by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the MessageBox interface
     *
     * @return {YMessageBox} a YMessageBox object allowing you to drive the MessageBox interface.
     */
    static FindMessageBoxInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'MessageBox', func);
        if (obj == null) {
            obj = new YMessageBox(yctx, func);
            _yocto_api.YFunction._AddToCache('MessageBox', func, obj);
        }
        return obj;
    }

    nextMsgRef() {
        var _this61 = this;

        return _asyncToGenerator(function* () {
            _this61._nextMsgRef = _this61._nextMsgRef + 1;
            return _this61._nextMsgRef;
        })();
    }

    clearSIMSlot(slot) {
        var _this62 = this;

        return _asyncToGenerator(function* () {
            _this62._prevBitmapStr = '';
            return yield _this62.set_command('DS' + String(Math.round(slot)));
        })();
    }

    fetchPdu(slot) {
        var _this63 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let binPdu;
            /** @type {string[]} **/
            let arrPdu = [];
            /** @type {string} **/
            let hexPdu;
            /** @type {YSms} **/
            let sms;

            binPdu = yield _this63._download('sms.json?pos=' + String(Math.round(slot)) + '&len=1');
            arrPdu = _this63.imm_json_get_array(binPdu);
            hexPdu = _this63.imm_decode_json_string(arrPdu[0]);
            sms = new YSms(_this63);
            yield sms.set_slot(slot);
            yield sms.parsePdu(_this63._yapi.imm_hexstr2bin(hexPdu));
            return sms;
        })();
    }

    initGsm2Unicode() {
        var _this64 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let uni;
            _this64._gsm2unicode.length = 0;
            // 00-07
            _this64._gsm2unicode.push(64);
            _this64._gsm2unicode.push(163);
            _this64._gsm2unicode.push(36);
            _this64._gsm2unicode.push(165);
            _this64._gsm2unicode.push(232);
            _this64._gsm2unicode.push(233);
            _this64._gsm2unicode.push(249);
            _this64._gsm2unicode.push(236);
            // 08-0F
            _this64._gsm2unicode.push(242);
            _this64._gsm2unicode.push(199);
            _this64._gsm2unicode.push(10);
            _this64._gsm2unicode.push(216);
            _this64._gsm2unicode.push(248);
            _this64._gsm2unicode.push(13);
            _this64._gsm2unicode.push(197);
            _this64._gsm2unicode.push(229);
            // 10-17
            _this64._gsm2unicode.push(916);
            _this64._gsm2unicode.push(95);
            _this64._gsm2unicode.push(934);
            _this64._gsm2unicode.push(915);
            _this64._gsm2unicode.push(923);
            _this64._gsm2unicode.push(937);
            _this64._gsm2unicode.push(928);
            _this64._gsm2unicode.push(936);
            // 18-1F
            _this64._gsm2unicode.push(931);
            _this64._gsm2unicode.push(920);
            _this64._gsm2unicode.push(926);
            _this64._gsm2unicode.push(27);
            _this64._gsm2unicode.push(198);
            _this64._gsm2unicode.push(230);
            _this64._gsm2unicode.push(223);
            _this64._gsm2unicode.push(201);
            // 20-7A
            i = 32;
            while (i <= 122) {
                _this64._gsm2unicode.push(i);
                i = i + 1;
            }
            // exceptions in range 20-7A
            _this64._gsm2unicode[36] = 164;
            _this64._gsm2unicode[64] = 161;
            _this64._gsm2unicode[91] = 196;
            _this64._gsm2unicode[92] = 214;
            _this64._gsm2unicode[93] = 209;
            _this64._gsm2unicode[94] = 220;
            _this64._gsm2unicode[95] = 167;
            _this64._gsm2unicode[96] = 191;
            // 7B-7F
            _this64._gsm2unicode.push(228);
            _this64._gsm2unicode.push(246);
            _this64._gsm2unicode.push(241);
            _this64._gsm2unicode.push(252);
            _this64._gsm2unicode.push(224);
            // Invert table as well wherever possible
            _this64._iso2gsm = new Uint8Array(256);
            i = 0;
            while (i <= 127) {
                uni = _this64._gsm2unicode[i];
                if (uni <= 255) {
                    _this64._iso2gsm.set([i], uni);
                }
                i = i + 1;
            }
            i = 0;
            while (i < 4) {
                // mark escape sequences
                _this64._iso2gsm.set([27], 91 + i);
                _this64._iso2gsm.set([27], 123 + i);
                i = i + 1;
            }
            // Done
            _this64._gsm2unicodeReady = true;
            return _this64._yapi.SUCCESS;
        })();
    }

    gsm2unicode(gsm) {
        var _this65 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let gsmlen;
            /** @type {number} **/
            let reslen;
            /** @type {number[]} **/
            let res = [];
            /** @type {number} **/
            let uni;
            if (!_this65._gsm2unicodeReady) {
                yield _this65.initGsm2Unicode();
            }
            gsmlen = gsm.length;
            reslen = gsmlen;
            i = 0;
            while (i < gsmlen) {
                if (gsm[i] == 27) {
                    reslen = reslen - 1;
                }
                i = i + 1;
            }
            res.length = 0;
            i = 0;
            while (i < gsmlen) {
                uni = _this65._gsm2unicode[gsm[i]];
                if (uni == 27 && i + 1 < gsmlen) {
                    i = i + 1;
                    uni = gsm[i];
                    if (uni < 60) {
                        if (uni < 41) {
                            if (uni == 20) {
                                uni = 94;
                            } else {
                                if (uni == 40) {
                                    uni = 123;
                                } else {
                                    uni = 0;
                                }
                            }
                        } else {
                            if (uni == 41) {
                                uni = 125;
                            } else {
                                if (uni == 47) {
                                    uni = 92;
                                } else {
                                    uni = 0;
                                }
                            }
                        }
                    } else {
                        if (uni < 62) {
                            if (uni == 60) {
                                uni = 91;
                            } else {
                                if (uni == 61) {
                                    uni = 126;
                                } else {
                                    uni = 0;
                                }
                            }
                        } else {
                            if (uni == 62) {
                                uni = 93;
                            } else {
                                if (uni == 64) {
                                    uni = 124;
                                } else {
                                    if (uni == 101) {
                                        uni = 164;
                                    } else {
                                        uni = 0;
                                    }
                                }
                            }
                        }
                    }
                }
                if (uni > 0) {
                    res.push(uni);
                }
                i = i + 1;
            }
            return res;
        })();
    }

    gsm2str(gsm) {
        var _this66 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let gsmlen;
            /** @type {number} **/
            let reslen;
            /** @type {Uint8Array} **/
            let resbin;
            /** @type {string} **/
            let resstr;
            /** @type {number} **/
            let uni;
            if (!_this66._gsm2unicodeReady) {
                yield _this66.initGsm2Unicode();
            }
            gsmlen = gsm.length;
            reslen = gsmlen;
            i = 0;
            while (i < gsmlen) {
                if (gsm[i] == 27) {
                    reslen = reslen - 1;
                }
                i = i + 1;
            }
            resbin = new Uint8Array(reslen);
            i = 0;
            reslen = 0;
            while (i < gsmlen) {
                uni = _this66._gsm2unicode[gsm[i]];
                if (uni == 27 && i + 1 < gsmlen) {
                    i = i + 1;
                    uni = gsm[i];
                    if (uni < 60) {
                        if (uni < 41) {
                            if (uni == 20) {
                                uni = 94;
                            } else {
                                if (uni == 40) {
                                    uni = 123;
                                } else {
                                    uni = 0;
                                }
                            }
                        } else {
                            if (uni == 41) {
                                uni = 125;
                            } else {
                                if (uni == 47) {
                                    uni = 92;
                                } else {
                                    uni = 0;
                                }
                            }
                        }
                    } else {
                        if (uni < 62) {
                            if (uni == 60) {
                                uni = 91;
                            } else {
                                if (uni == 61) {
                                    uni = 126;
                                } else {
                                    uni = 0;
                                }
                            }
                        } else {
                            if (uni == 62) {
                                uni = 93;
                            } else {
                                if (uni == 64) {
                                    uni = 124;
                                } else {
                                    if (uni == 101) {
                                        uni = 164;
                                    } else {
                                        uni = 0;
                                    }
                                }
                            }
                        }
                    }
                }
                if (uni > 0 && uni < 256) {
                    resbin.set([uni], reslen);
                    reslen = reslen + 1;
                }
                i = i + 1;
            }
            resstr = _this66._yapi.imm_bin2str(resbin);
            if (resstr.length > reslen) {
                resstr = resstr.substr(0, reslen);
            }
            return resstr;
        })();
    }

    str2gsm(msg) {
        var _this67 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let asc;
            /** @type {number} **/
            let asclen;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let ch;
            /** @type {number} **/
            let gsm7;
            /** @type {number} **/
            let extra;
            /** @type {Uint8Array} **/
            let res;
            /** @type {number} **/
            let wpos;
            if (!_this67._gsm2unicodeReady) {
                yield _this67.initGsm2Unicode();
            }
            asc = _this67._yapi.imm_str2bin(msg);
            asclen = asc.length;
            extra = 0;
            i = 0;
            while (i < asclen) {
                ch = asc[i];
                gsm7 = _this67._iso2gsm[ch];
                if (gsm7 == 27) {
                    extra = extra + 1;
                }
                if (gsm7 == 0) {
                    // cannot use standard GSM encoding
                    res = new Uint8Array(0);
                    return res;
                }
                i = i + 1;
            }
            res = new Uint8Array(asclen + extra);
            wpos = 0;
            i = 0;
            while (i < asclen) {
                ch = asc[i];
                gsm7 = _this67._iso2gsm[ch];
                res.set([gsm7], wpos);
                wpos = wpos + 1;
                if (gsm7 == 27) {
                    if (ch < 100) {
                        if (ch < 93) {
                            if (ch < 92) {
                                gsm7 = 60;
                            } else {
                                gsm7 = 47;
                            }
                        } else {
                            if (ch < 94) {
                                gsm7 = 62;
                            } else {
                                gsm7 = 20;
                            }
                        }
                    } else {
                        if (ch < 125) {
                            if (ch < 124) {
                                gsm7 = 40;
                            } else {
                                gsm7 = 64;
                            }
                        } else {
                            if (ch < 126) {
                                gsm7 = 41;
                            } else {
                                gsm7 = 61;
                            }
                        }
                    }
                    res.set([gsm7], wpos);
                    wpos = wpos + 1;
                }
                i = i + 1;
            }
            return res;
        })();
    }

    checkNewMessages() {
        var _this68 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let bitmapStr;
            /** @type {Uint8Array} **/
            let prevBitmap;
            /** @type {Uint8Array} **/
            let newBitmap;
            /** @type {number} **/
            let slot;
            /** @type {number} **/
            let nslots;
            /** @type {number} **/
            let pduIdx;
            /** @type {number} **/
            let idx;
            /** @type {number} **/
            let bitVal;
            /** @type {number} **/
            let prevBit;
            /** @type {number} **/
            let i;
            /** @type {number} **/
            let nsig;
            /** @type {number} **/
            let cnt;
            /** @type {string} **/
            let sig;
            /** @type {YSms[]} **/
            let newArr = [];
            /** @type {YSms[]} **/
            let newMsg = [];
            /** @type {YSms[]} **/
            let newAgg = [];
            /** @type {string[]} **/
            let signatures = [];
            /** @type {YSms} **/
            let sms;

            bitmapStr = yield _this68.get_slotsBitmap();
            if (bitmapStr == _this68._prevBitmapStr) {
                return _this68._yapi.SUCCESS;
            }
            prevBitmap = _this68._yapi.imm_hexstr2bin(_this68._prevBitmapStr);
            newBitmap = _this68._yapi.imm_hexstr2bin(bitmapStr);
            _this68._prevBitmapStr = bitmapStr;
            nslots = 8 * newBitmap.length;
            newArr.length = 0;
            newMsg.length = 0;
            signatures.length = 0;
            nsig = 0;
            // copy known messages
            pduIdx = 0;
            while (pduIdx < _this68._pdus.length) {
                sms = _this68._pdus[pduIdx];
                slot = yield sms.get_slot();
                idx = slot >> 3;
                if (idx < newBitmap.length) {
                    bitVal = 1 << (slot & 7);
                    if ((newBitmap[idx] & bitVal) != 0) {
                        newArr.push(sms);
                        if ((yield sms.get_concatCount()) == 0) {
                            newMsg.push(sms);
                        } else {
                            sig = yield sms.get_concatSignature();
                            i = 0;
                            while (i < nsig && sig.length > 0) {
                                if (signatures[i] == sig) {
                                    sig = '';
                                }
                                i = i + 1;
                            }
                            if (sig.length > 0) {
                                signatures.push(sig);
                                nsig = nsig + 1;
                            }
                        }
                    }
                }
                pduIdx = pduIdx + 1;
            }
            // receive new messages
            slot = 0;
            while (slot < nslots) {
                idx = slot >> 3;
                bitVal = 1 << (slot & 7);
                prevBit = 0;
                if (idx < prevBitmap.length) {
                    prevBit = prevBitmap[idx] & bitVal;
                }
                if ((newBitmap[idx] & bitVal) != 0) {
                    if (prevBit == 0) {
                        sms = yield _this68.fetchPdu(slot);
                        newArr.push(sms);
                        if ((yield sms.get_concatCount()) == 0) {
                            newMsg.push(sms);
                        } else {
                            sig = yield sms.get_concatSignature();
                            i = 0;
                            while (i < nsig && sig.length > 0) {
                                if (signatures[i] == sig) {
                                    sig = '';
                                }
                                i = i + 1;
                            }
                            if (sig.length > 0) {
                                signatures.push(sig);
                                nsig = nsig + 1;
                            }
                        }
                    }
                }
                slot = slot + 1;
            }
            _this68._pdus = newArr;
            // append complete concatenated messages
            i = 0;
            while (i < nsig) {
                sig = signatures[i];
                cnt = 0;
                pduIdx = 0;
                while (pduIdx < _this68._pdus.length) {
                    sms = _this68._pdus[pduIdx];
                    if ((yield sms.get_concatCount()) > 0) {
                        if ((yield sms.get_concatSignature()) == sig) {
                            if (cnt == 0) {
                                cnt = yield sms.get_concatCount();
                                newAgg.length = 0;
                            }
                            newAgg.push(sms);
                        }
                    }
                    pduIdx = pduIdx + 1;
                }
                if (cnt > 0 && newAgg.length == cnt) {
                    sms = new YSms(_this68);
                    yield sms.set_parts(newAgg);
                    newMsg.push(sms);
                }
                i = i + 1;
            }
            _this68._messages = newMsg;
            return _this68._yapi.SUCCESS;
        })();
    }

    get_pdus() {
        var _this69 = this;

        return _asyncToGenerator(function* () {
            yield _this69.checkNewMessages();
            return _this69._pdus;
        })();
    }

    /**
     * Clear the SMS units counters.
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearPduCounters() {
        var _this70 = this;

        return _asyncToGenerator(function* () {
            /** @type {number} **/
            let retcode;

            retcode = yield _this70.set_pduReceived(0);
            if (retcode != _this70._yapi.SUCCESS) {
                return retcode;
            }
            retcode = yield _this70.set_pduSent(0);
            return retcode;
        })();
    }

    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message {string} : the text to be sent in the message
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendTextMessage(recipient, message) {
        var _this71 = this;

        return _asyncToGenerator(function* () {
            /** @type {YSms} **/
            let sms;

            sms = new YSms(_this71);
            yield sms.set_recipient(recipient);
            yield sms.addText(message);
            return yield sms.send();
        })();
    }

    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message {string} : the text to be sent in the message
     *
     * @return {number} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendFlashMessage(recipient, message) {
        var _this72 = this;

        return _asyncToGenerator(function* () {
            /** @type {YSms} **/
            let sms;

            sms = new YSms(_this72);
            yield sms.set_recipient(recipient);
            yield sms.set_msgClass(0);
            yield sms.addText(message);
            return yield sms.send();
        })();
    }

    /**
     * Creates a new empty SMS message, to be configured and sent later on.
     *
     * @param recipient {string} : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     *
     * @return {YSms} YAPI.SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    newMessage(recipient) {
        var _this73 = this;

        return _asyncToGenerator(function* () {
            /** @type {YSms} **/
            let sms;
            sms = new YSms(_this73);
            yield sms.set_recipient(recipient);
            return sms;
        })();
    }

    /**
     * Returns the list of messages received and not deleted. This function
     * will automatically decode concatenated SMS.
     *
     * @return {YSms[]} an YSms object list.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_messages() {
        var _this74 = this;

        return _asyncToGenerator(function* () {
            yield _this74.checkNewMessages();
            return _this74._messages;
        })();
    }

    /**
     * Continues the enumeration of MessageBox interfaces started using yFirstMessageBox().
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         a MessageBox interface currently online, or a null pointer
     *         if there are no more MessageBox interfaces to enumerate.
     */
    nextMessageBox() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YMessageBox.FindMessageBoxInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of MessageBox interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next MessageBox interfaces.
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         the first MessageBox interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBox() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('MessageBox');
        if (next_hwid == null) return null;
        return YMessageBox.FindMessageBox(next_hwid);
    }

    /**
     * Starts the enumeration of MessageBox interfaces currently accessible.
     * Use the method YMessageBox.nextMessageBox() to iterate on
     * next MessageBox interfaces.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
     *         the first MessageBox interface currently online, or a null pointer
     *         if there are none.
     */
    static FirstMessageBoxInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('MessageBox');
        if (next_hwid == null) return null;
        return YMessageBox.FindMessageBoxInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YMessageBox implementation)
}

exports.YMessageBox = YMessageBox; //
// YMessageBoxProxy Class: synchronous proxy to YMessageBox objects
//
// This class is used to provide a pseudo-synchronous API on top
// of YMessageBox objects, that normally use async methods since
// they involve I/O. Getters retrieve the cached value, and
// setters trigger the set action but return synchronously.
// The load_async callback-based method is provided for
// backward-compatibility in order to trigger a background
// reload of cached values.
//
// To get a function proxy from a function, use get_syncProxy
//
/** @extends {YFunctionProxy} **/

class YMessageBoxProxy extends _yocto_api.YFunctionProxy {
    constructor(obj_func) {
        super(obj_func);
    }

    //--- (generated code: YMessageBox accessors declaration)

    /**
     * Returns the number of message storage slots currently in use.
     *
     * @return an integer corresponding to the number of message storage slots currently in use
     *
     * On failure, throws an exception or returns Y_SLOTSINUSE_INVALID.
     */
    get_slotsInUse() {
        return this.liveFunc._slotsInUse;
    }

    /**
     * Returns the total number of message storage slots on the SIM card.
     *
     * @return an integer corresponding to the total number of message storage slots on the SIM card
     *
     * On failure, throws an exception or returns Y_SLOTSCOUNT_INVALID.
     */
    get_slotsCount() {
        return this.liveFunc._slotsCount;
    }

    get_slotsBitmap() {
        return this.liveFunc._slotsBitmap;
    }

    /**
     * Returns the number of SMS units sent so far.
     *
     * @return an integer corresponding to the number of SMS units sent so far
     *
     * On failure, throws an exception or returns Y_PDUSENT_INVALID.
     */
    get_pduSent() {
        return this.liveFunc._pduSent;
    }

    /**
     * Changes the value of the outgoing SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the outgoing SMS units counter
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduSent(newval) {
        this.liveFunc.set_pduSent(newval);
        return this._yapi.SUCCESS;
    }

    /**
     * Returns the number of SMS units received so far.
     *
     * @return an integer corresponding to the number of SMS units received so far
     *
     * On failure, throws an exception or returns Y_PDURECEIVED_INVALID.
     */
    get_pduReceived() {
        return this.liveFunc._pduReceived;
    }

    /**
     * Changes the value of the incoming SMS units counter.
     *
     * @param newval : an integer corresponding to the value of the incoming SMS units counter
     *
     * @return YAPI_SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    set_pduReceived(newval) {
        this.liveFunc.set_pduReceived(newval);
        return this._yapi.SUCCESS;
    }

    get_command() {
        return this.liveFunc._command;
    }

    set_command(newval) {
        this.liveFunc.set_command(newval);
        return this._yapi.SUCCESS;
    }

    nextMsgRef() {
        this.liveFunc.nextMsgRef();
        return _yocto_api.YAPI_SUCCESS;
    }

    clearSIMSlot(slot) {
        this.liveFunc.clearSIMSlot(slot);
        return _yocto_api.YAPI_SUCCESS;
    }

    initGsm2Unicode() {
        this.liveFunc.initGsm2Unicode();
        return _yocto_api.YAPI_SUCCESS;
    }

    checkNewMessages() {
        this.liveFunc.checkNewMessages();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Clear the SMS units counters.
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    clearPduCounters() {
        this.liveFunc.clearPduCounters();
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a regular text SMS, with standard parameters. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText and addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendTextMessage(recipient, message) {
        this.liveFunc.sendTextMessage(recipient, message);
        return _yocto_api.YAPI_SUCCESS;
    }

    /**
     * Sends a Flash SMS (class 0 message). Flash messages are displayed on the handset
     * immediately and are usually not saved on the SIM card. This function can send messages
     * of more than 160 characters, using SMS concatenation. ISO-latin accented characters
     * are supported. For sending messages with special unicode characters such as asian
     * characters and emoticons, use newMessage to create a new message and define
     * the content of using methods addText et addUnicodeData.
     *
     * @param recipient : a text string with the recipient phone number, either as a
     *         national number, or in international format starting with a plus sign
     * @param message : the text to be sent in the message
     *
     * @return YAPI_SUCCESS when the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    sendFlashMessage(recipient, message) {
        this.liveFunc.sendFlashMessage(recipient, message);
        return _yocto_api.YAPI_SUCCESS;
    }
    //--- (end of generated code: YMessageBox accessors declaration)
}

exports.YMessageBoxProxy = YMessageBoxProxy; //--- (generated code: MessageBox functions)

/**
 * Retrieves a MessageBox interface for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the MessageBox interface is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YMessageBox.isOnline() to test if the MessageBox interface is
 * indeed online at a given time. In case of ambiguity when looking for
 * a MessageBox interface by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the MessageBox interface
 *
 * @return {YMessageBox} a YMessageBox object allowing you to drive the MessageBox interface.
 */

function yFindMessageBox(func) {
    return YMessageBox.FindMessageBox(func);
}

/**
 * Starts the enumeration of MessageBox interfaces currently accessible.
 * Use the method YMessageBox.nextMessageBox() to iterate on
 * next MessageBox interfaces.
 *
 * @return {YMessageBox} a pointer to a YMessageBox object, corresponding to
 *         the first MessageBox interface currently online, or a null pointer
 *         if there are none.
 */
function yFirstMessageBox() {
    return YMessageBox.FirstMessageBox();
}

//--- (end of generated code: MessageBox functions)
