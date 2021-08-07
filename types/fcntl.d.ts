export interface flock {
    l_type: number;
    l_whence: number;
    l_start: number;
    l_len: number;
    l_pid: number;
}

export function fcntl(fd: number, cmd: number, lock: flock): number;

export const F_SETLK: number;
export const F_SETLKW: number;
export const F_GETLK: number;
export const F_WRLCK: number;
export const F_UNLCK: number;
export const SEEK_SET: number;
export const SEEK_CUR: number;
export const SEEK_END: number;
