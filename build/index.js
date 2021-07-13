"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockPidFile = void 0;
const posix_lock_1 = require("posix-lock");
const fs_1 = require("fs");
const process = require("process");
const identifier_cases_1 = require("identifier-cases");
const assert = require("assert");
const path_1 = require("path");
const { O_WRONLY, O_CREAT } = fs_1.constants;
const XDG_RUNTIME_DIR = process.env['XDG_RUNTIME_DIR'];
assert(XDG_RUNTIME_DIR);
assert(path_1.isAbsolute(XDG_RUNTIME_DIR));
function lockPidFile(appName) {
    assert(identifier_cases_1.kebabCase.test(appName));
    const pidFilePath = path_1.join(XDG_RUNTIME_DIR, `${appName}.pid`);
    const fd = fs_1.openSync(pidFilePath, O_WRONLY | O_CREAT, 0o777);
    posix_lock_1.fcntl(fd, posix_lock_1.F_SETLK, {
        l_type: posix_lock_1.F_WRLCK,
        l_whence: posix_lock_1.SEEK_SET,
        l_start: 0,
        l_len: 0,
        l_pid: 0,
    });
    fs_1.ftruncateSync(fd, 0);
    fs_1.writeSync(fd, Buffer.from(`${process.pid}\n`));
}
exports.lockPidFile = lockPidFile;
exports.default = lockPidFile;
//# sourceMappingURL=index.js.map