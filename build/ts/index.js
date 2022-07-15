"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockPidFile = void 0;
const fcntl_1 = require("../build/Release/fcntl");
const fs_1 = require("fs");
const process = require("process");
const identifier_cases_1 = require("identifier-cases");
const assert = require("assert");
const path_1 = require("path");
const { O_WRONLY, O_CREAT } = fs_1.constants;
const XDG_RUNTIME_DIR = process.env['XDG_RUNTIME_DIR'];
assert(XDG_RUNTIME_DIR);
assert((0, path_1.isAbsolute)(XDG_RUNTIME_DIR));
function lockPidFile(appName) {
    assert(identifier_cases_1.kebabCase.test(appName));
    const pidFilePath = (0, path_1.join)(XDG_RUNTIME_DIR, `${appName}.pid`);
    const fd = (0, fs_1.openSync)(pidFilePath, O_WRONLY | O_CREAT, 0o777);
    (0, fcntl_1.fcntl)(fd, fcntl_1.F_SETLK, {
        l_type: fcntl_1.F_WRLCK,
        l_whence: fcntl_1.SEEK_SET,
        l_start: 0,
        l_len: 0,
        l_pid: 0,
    });
    (0, fs_1.ftruncateSync)(fd, 0);
    (0, fs_1.writeSync)(fd, Buffer.from(`${process.pid}\n`));
}
exports.lockPidFile = lockPidFile;
exports.default = lockPidFile;
//# sourceMappingURL=index.js.map