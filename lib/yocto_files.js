'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YFiles = exports.Y_FREESPACE_INVALID = exports.Y_FILESCOUNT_INVALID = undefined;
exports.yFindFiles = yFindFiles;
exports.yFirstFiles = yFirstFiles;

var _yocto_api = require('./yocto_api');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; } /*********************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                                              * $Id: yocto_files.js 19607 2015-03-05 10:36:54Z seb $
                                                                                                                                                                                                                                                                                                                                                                                                                                                              *
                                                                                                                                                                                                                                                                                                                                                                                                                                                              * Implements yFindFiles(), the high-level API for Files functions
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

//--- (generated code: YFiles definitions)
const Y_FILESCOUNT_INVALID = exports.Y_FILESCOUNT_INVALID = _yocto_api.YAPI.INVALID_UINT;
const Y_FREESPACE_INVALID = exports.Y_FREESPACE_INVALID = _yocto_api.YAPI.INVALID_UINT;
//--- (end of generated code: YFiles definitions)

//--- (generated code: YFileRecord definitions)
//--- (end of generated code: YFileRecord definitions)

//--- (generated code: YFileRecord class start)
/**
 * YFileRecord Class: Description of a file on the device filesystem
 *
 *
 */
//--- (end of generated code: YFileRecord class start)

class YFileRecord {
    constructor(str_json) {
        //--- (generated code: YFileRecord constructor)
        /** @member {string} **/
        this._name = '';
        /** @member {number} **/
        this._size = 0;
        /** @member {number} **/
        this._crc = 0;
        //--- (end of generated code: YFileRecord constructor)
        var loadval = JSON.parse(str_json);
        this._name = loadval.name;
        this._size = loadval.size;
        this._crc = loadval.crc;
    }

    //--- (generated code: YFileRecord implementation)

    get_name() {
        var _this = this;

        return _asyncToGenerator(function* () {
            return _this._name;
        })();
    }

    get_size() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            return _this2._size;
        })();
    }

    get_crc() {
        var _this3 = this;

        return _asyncToGenerator(function* () {
            return _this3._crc;
        })();
    }

    //--- (end of generated code: YFileRecord implementation)
}

//--- (generated code: YFiles class start)
/**
 * YFiles Class: Files function interface
 *
 * The filesystem interface makes it possible to store files
 * on some devices, for instance to design a custom web UI
 * (for networked devices) or to add fonts (on display
 * devices).
 */
//--- (end of generated code: YFiles class start)

class YFiles extends _yocto_api.YFunction {
    constructor(obj_yapi, str_func) {
        //--- (generated code: YFiles constructor)
        super(obj_yapi, str_func);
        /** @member {string} **/
        this._className = 'Files';
        /** @member {number} **/
        this._filesCount = Y_FILESCOUNT_INVALID;
        /** @member {number} **/
        this._freeSpace = Y_FREESPACE_INVALID;
        this.imm_setConst({
            FILESCOUNT_INVALID: _yocto_api.YAPI.INVALID_UINT,
            FREESPACE_INVALID: _yocto_api.YAPI.INVALID_UINT
        });
        //--- (end of generated code: YFiles constructor)
    }

    //--- (generated code: YFiles implementation)

    imm_parseAttr(name, val) {
        switch (name) {
            case 'filesCount':
                this._filesCount = parseInt(val);
                return 1;
            case 'freeSpace':
                this._freeSpace = parseInt(val);
                return 1;
        }
        return super.imm_parseAttr(name, val);
    }

    /**
     * Returns the number of files currently loaded in the filesystem.
     *
     * @return {number} an integer corresponding to the number of files currently loaded in the filesystem
     *
     * On failure, throws an exception or returns YFiles.FILESCOUNT_INVALID.
     */
    get_filesCount() {
        var _this4 = this;

        return _asyncToGenerator(function* () {
            if (_this4._cacheExpiration <= _this4._yapi.GetTickCount()) {
                if ((yield _this4.load(_this4._yapi.defaultCacheValidity)) != _this4._yapi.SUCCESS) {
                    return Y_FILESCOUNT_INVALID;
                }
            }
            return _this4._filesCount;
        })();
    }

    /**
     * Returns the free space for uploading new files to the filesystem, in bytes.
     *
     * @return {number} an integer corresponding to the free space for uploading new files to the filesystem, in bytes
     *
     * On failure, throws an exception or returns YFiles.FREESPACE_INVALID.
     */
    get_freeSpace() {
        var _this5 = this;

        return _asyncToGenerator(function* () {
            if (_this5._cacheExpiration <= _this5._yapi.GetTickCount()) {
                if ((yield _this5.load(_this5._yapi.defaultCacheValidity)) != _this5._yapi.SUCCESS) {
                    return Y_FREESPACE_INVALID;
                }
            }
            return _this5._freeSpace;
        })();
    }

    /**
     * Retrieves a filesystem for a given identifier.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param func {string} : a string that uniquely characterizes the filesystem
     *
     * @return {YFiles} a YFiles object allowing you to drive the filesystem.
     */
    static FindFiles(func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCache('Files', func);
        if (obj == null) {
            obj = new YFiles(_yocto_api.YAPI, func);
            _yocto_api.YFunction._AddToCache('Files', func, obj);
        }
        return obj;
    }

    /**
     * Retrieves a filesystem for a given identifier in a YAPI context.
     * The identifier can be specified using several formats:
     * <ul>
     * <li>FunctionLogicalName</li>
     * <li>ModuleSerialNumber.FunctionIdentifier</li>
     * <li>ModuleSerialNumber.FunctionLogicalName</li>
     * <li>ModuleLogicalName.FunctionIdentifier</li>
     * <li>ModuleLogicalName.FunctionLogicalName</li>
     * </ul>
     *
     * This function does not require that the filesystem is online at the time
     * it is invoked. The returned object is nevertheless valid.
     * Use the method YFiles.isOnline() to test if the filesystem is
     * indeed online at a given time. In case of ambiguity when looking for
     * a filesystem by logical name, no error is notified: the first instance
     * found is returned. The search is performed first by hardware name,
     * then by logical name.
     *
     * @param yctx {YAPIContext} : a YAPI context
     * @param func {string} : a string that uniquely characterizes the filesystem
     *
     * @return {YFiles} a YFiles object allowing you to drive the filesystem.
     */
    static FindFilesInContext(yctx, func) {
        /** @type {YFunction} **/
        let obj;
        obj = _yocto_api.YFunction._FindFromCacheInContext(yctx, 'Files', func);
        if (obj == null) {
            obj = new YFiles(yctx, func);
            _yocto_api.YFunction._AddToCache('Files', func, obj);
        }
        return obj;
    }

    sendCommand(command) {
        var _this6 = this;

        return _asyncToGenerator(function* () {
            /** @type {string} **/
            let url;
            url = 'files.json?a=' + command;
            // may throw an exception
            return yield _this6._download(url);
        })();
    }

    /**
     * Reinitialize the filesystem to its clean, unfragmented, empty state.
     * All files previously uploaded are permanently lost.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    format_fs() {
        var _this7 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let json;
            /** @type {string} **/
            let res;
            json = yield _this7.sendCommand('format');
            res = _this7.imm_json_get_key(json, 'res');
            if (!(res == 'ok')) {
                return _this7._throw(_this7._yapi.IO_ERROR, 'format failed', _this7._yapi.IO_ERROR);
            }
            return _this7._yapi.SUCCESS;
        })();
    }

    /**
     * Returns a list of YFileRecord objects that describe files currently loaded
     * in the filesystem.
     *
     * @param pattern {string} : an optional filter pattern, using star and question marks
     *         as wildcards. When an empty pattern is provided, all file records
     *         are returned.
     *
     * @return {YFileRecord[]} a list of YFileRecord objects, containing the file path
     *         and name, byte size and 32-bit CRC of the file content.
     *
     * On failure, throws an exception or returns an empty list.
     */
    get_list(pattern) {
        var _this8 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let json;
            /** @type {string[]} **/
            let filelist = [];
            /** @type {YFileRecord[]} **/
            let res = [];
            json = yield _this8.sendCommand('dir&f=' + pattern);
            filelist = _this8.imm_json_get_array(json);
            res.length = 0;
            for (let ii in filelist) {
                res.push(new YFileRecord(filelist[ii]));
            }
            return res;
        })();
    }

    /**
     * Test if a file exist on the filesystem of the module.
     *
     * @param filename {string} : the file name to test.
     *
     * @return {boolean} a true if the file existe, false ortherwise.
     *
     * On failure, throws an exception.
     */
    fileExist(filename) {
        var _this9 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let json;
            /** @type {string[]} **/
            let filelist = [];
            if (filename.length == 0) {
                return false;
            }
            json = yield _this9.sendCommand('dir&f=' + filename);
            filelist = _this9.imm_json_get_array(json);
            if (filelist.length > 0) {
                return true;
            }
            return false;
        })();
    }

    /**
     * Downloads the requested file and returns a binary buffer with its content.
     *
     * @param pathname {string} : path and name of the file to download
     *
     * @return {Uint8Array} a binary buffer with the file content
     *
     * On failure, throws an exception or returns an empty content.
     */
    download(pathname) {
        var _this10 = this;

        return _asyncToGenerator(function* () {
            return yield _this10._download(pathname);
        })();
    }

    /**
     * Uploads a file to the filesystem, to the specified full path name.
     * If a file already exists with the same path name, its content is overwritten.
     *
     * @param pathname {string} : path and name of the new file to create
     * @param content {Uint8Array} : binary buffer with the content to set
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    upload(pathname, content) {
        var _this11 = this;

        return _asyncToGenerator(function* () {
            return yield _this11._upload(pathname, content);
        })();
    }

    /**
     * Deletes a file, given by its full path name, from the filesystem.
     * Because of filesystem fragmentation, deleting a file may not always
     * free up the whole space used by the file. However, rewriting a file
     * with the same path name will always reuse any space not freed previously.
     * If you need to ensure that no space is taken by previously deleted files,
     * you can use format_fs to fully reinitialize the filesystem.
     *
     * @param pathname {string} : path and name of the file to remove.
     *
     * @return {number} YAPI.SUCCESS if the call succeeds.
     *
     * On failure, throws an exception or returns a negative error code.
     */
    remove(pathname) {
        var _this12 = this;

        return _asyncToGenerator(function* () {
            /** @type {Uint8Array} **/
            let json;
            /** @type {string} **/
            let res;
            json = yield _this12.sendCommand('del&f=' + pathname);
            res = _this12.imm_json_get_key(json, 'res');
            if (!(res == 'ok')) {
                return _this12._throw(_this12._yapi.IO_ERROR, 'unable to remove file', _this12._yapi.IO_ERROR);
            }
            return _this12._yapi.SUCCESS;
        })();
    }

    /**
     * Continues the enumeration of filesystems started using yFirstFiles().
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         a filesystem currently online, or a null pointer
     *         if there are no more filesystems to enumerate.
     */
    nextFiles() {
        /** @type {object} **/
        let resolve = this._yapi.imm_resolveFunction(this._className, this._func);
        if (resolve.errorType != _yocto_api.YAPI_SUCCESS) return null;
        /** @type {string|null} **/
        let next_hwid = this._yapi.imm_getNextHardwareId(this._className, resolve.result);
        if (next_hwid == null) return null;
        return YFiles.FindFilesInContext(this._yapi, next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFiles() {
        /** @type {string|null} **/
        let next_hwid = _yocto_api.YAPI.imm_getFirstHardwareId('Files');
        if (next_hwid == null) return null;
        return YFiles.FindFiles(next_hwid);
    }

    /**
     * Starts the enumeration of filesystems currently accessible.
     * Use the method YFiles.nextFiles() to iterate on
     * next filesystems.
     *
     * @param yctx {YAPIContext} : a YAPI context.
     *
     * @return {YFiles} a pointer to a YFiles object, corresponding to
     *         the first filesystem currently online, or a null pointer
     *         if there are none.
     */
    static FirstFilesInContext(yctx) {
        /** @type {string|null} **/
        let next_hwid = yctx.imm_getFirstHardwareId('Files');
        if (next_hwid == null) return null;
        return YFiles.FindFilesInContext(yctx, next_hwid);
    }

    //--- (end of generated code: YFiles implementation)
}

exports.YFiles = YFiles; //--- (generated code: Files functions)

/**
 * Retrieves a filesystem for a given identifier.
 * The identifier can be specified using several formats:
 * <ul>
 * <li>FunctionLogicalName</li>
 * <li>ModuleSerialNumber.FunctionIdentifier</li>
 * <li>ModuleSerialNumber.FunctionLogicalName</li>
 * <li>ModuleLogicalName.FunctionIdentifier</li>
 * <li>ModuleLogicalName.FunctionLogicalName</li>
 * </ul>
 *
 * This function does not require that the filesystem is online at the time
 * it is invoked. The returned object is nevertheless valid.
 * Use the method YFiles.isOnline() to test if the filesystem is
 * indeed online at a given time. In case of ambiguity when looking for
 * a filesystem by logical name, no error is notified: the first instance
 * found is returned. The search is performed first by hardware name,
 * then by logical name.
 *
 * @param func {string} : a string that uniquely characterizes the filesystem
 *
 * @return {YFiles} a YFiles object allowing you to drive the filesystem.
 */

function yFindFiles(func) {
    return YFiles.FindFiles(func);
}

/**
 * Starts the enumeration of filesystems currently accessible.
 * Use the method YFiles.nextFiles() to iterate on
 * next filesystems.
 *
 * @return {YFiles} a pointer to a YFiles object, corresponding to
 *         the first filesystem currently online, or a null pointer
 *         if there are none.
 */
function yFirstFiles() {
    return YFiles.FirstFiles();
}

//--- (end of generated code: Files functions)
