# lock-pid-file

[![Npm package version](https://flat.badgen.net/npm/v/@zimtsui/lock-pid-file)](https://www.npmjs.com/package/@zimtsui/lock-pid-file)

This function creates a `.pid` file in [XDG_RUNTIME_DIR](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) with the process ID written into it, and sets a [POSIX Advisory Record Lock](https://man7.org/linux/man-pages/man2/fcntl.2.html) on the entire file.

If the file is already locked by any other processes, it throws.

## Examples

```ts
import { lockPidFile } from 'lock-pid-file';
lockPidFile('app-name-in-kebab-case');
```
