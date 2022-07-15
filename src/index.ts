import { fcntl, F_SETLK, F_WRLCK, SEEK_SET } from '../build/Release/fcntl';
import { openSync, constants, ftruncateSync, writeSync } from 'fs';
import process = require('process');
import { kebabCase } from '@zimtsui/identifier-cases';
import assert = require('assert');
import { isAbsolute, join } from 'path';
const { O_WRONLY, O_CREAT } = constants;
const XDG_RUNTIME_DIR = process.env['XDG_RUNTIME_DIR'];
assert(XDG_RUNTIME_DIR);
assert(isAbsolute(XDG_RUNTIME_DIR));

export function lockPidFile(appName: string) {
    assert(kebabCase.test(appName));

    const pidFilePath = join(<string>XDG_RUNTIME_DIR, `${appName}.pid`);
    const fd = openSync(
        pidFilePath,
        O_WRONLY | O_CREAT,
        0o777,
    );
    fcntl(fd, F_SETLK, {
        l_type: F_WRLCK,
        l_whence: SEEK_SET,
        l_start: 0,
        l_len: 0,
        l_pid: 0,
    });
    ftruncateSync(fd, 0);
    writeSync(fd, Buffer.from(`${process.pid}\n`));
}

export default lockPidFile;
