#include <napi.h>
#include <fcntl.h>
#include <cstring>

using namespace Napi;

Number Fcntl(const CallbackInfo& info) {
    Env env = info.Env();

    int fd = (int64_t)info[0].As<Number>();
    int cmd = (int64_t)info[1].As<Number>();
    if (cmd != F_SETLK && cmd != F_SETLKW && cmd != F_GETLK)
        throw Error::New(env, "Only POSIX advisory record locking is supported.");

    flock lock;
    lock.l_type = (int64_t)info[2].As<Object>().Get("l_type").As<Number>();
    lock.l_whence = (int64_t)info[2].As<Object>().Get("l_whence").As<Number>();
    lock.l_start = (int64_t)info[2].As<Object>().Get("l_start").As<Number>();
    lock.l_len = (int64_t)info[2].As<Object>().Get("l_len").As<Number>();
    lock.l_pid = (int64_t)info[2].As<Object>().Get("l_pid").As<Number>();

    int r = fcntl(fd, cmd, &lock);
    if (r == -1) throw Error::New(env, strerror(errno));

    info[2].As<Object>().Set("l_type", lock.l_type);
    info[2].As<Object>().Set("l_whence", lock.l_whence);
    info[2].As<Object>().Set("l_start", lock.l_start);
    info[2].As<Object>().Set("l_len", lock.l_len);
    info[2].As<Object>().Set("l_pid", lock.l_pid);
    return Number::New(env, r);
}

Object Init(Env env, Object exports) {
    exports.Set(
        String::New(env, "fcntl"),
        Function::New(env, Fcntl)
    );
    exports.Set(
        String::New(env, "F_SETLK"),
        Number::New(env, F_SETLK)
    );
    exports.Set(
        String::New(env, "F_SETLKW"),
        Number::New(env, F_SETLKW)
    );
    exports.Set(
        String::New(env, "F_GETLK"),
        Number::New(env, F_GETLK)
    );
    exports.Set(
        String::New(env, "F_RDLCK"),
        Number::New(env, F_RDLCK)
    );
    exports.Set(
        String::New(env, "F_WRLCK"),
        Number::New(env, F_WRLCK)
    );
    exports.Set(
        String::New(env, "F_UNLCK"),
        Number::New(env, F_UNLCK)
    );
    exports.Set(
        String::New(env, "SEEK_SET"),
        Number::New(env, SEEK_SET)
    );
    exports.Set(
        String::New(env, "SEEK_CUR"),
        Number::New(env, SEEK_CUR)
    );
    exports.Set(
        String::New(env, "SEEK_END"),
        Number::New(env, SEEK_END)
    );
    return exports;
}

NODE_API_MODULE(addon, Init)
