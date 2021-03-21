# Documentation

## `class FileUtilities`

The FileUtilities class has all of the features of the FileUtilities module.

## `static renameFile(target, name)`

Renames the file to the name, the file stays in the same directory. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `string` — the filepath of the file to rename
   * `name` — `string` — the new name of the file, not including the filepath
 * **Returns:** `boolean` — whether or not the rename was successful

## `static moveFile(target, destination, replace)`

Moves the target file to the destination. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `string` — the filepath of the file to move
   * `destination` — `string` — the filepath of the moved file
 * **Returns:** `boolean` — whether or not the move was successful

## `static renameDirectory(target, name)`

Renames the directory to the name, the directory stays in the same directory. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `string` — the filepath of the directory to rename
   * `name` — `string` — the filepath of the renamed directory, not including the filepath
 * **Returns:** `boolean` — whether or not the rename was successful

## `static moveDirectory(target, destination)`

Renames/moves the target directory to the destination. If the destination does not exist new directories will be made.

 * **Parameters:**
   * `target` — `string` — the filepath of the directory to move
   * `destination` — `string` — the filepath of the moved directory
 * **Returns:** `boolean` — whether or not the move was successful

## `static newFile(destination)`

Creates a new file at the destination. If the destination does not exist new directories will be made.

 * **Parameters:** `destination` — `string` — the filepath of the new file
 * **Returns:** `boolean` — whether or not the file was successfully created

## `static newDirectory(destination)`

Creates a new directory at the destination. If the destination does not exist new directories will be made.

 * **Parameters:** `destination` — `string` — the filepath of the new directory
 * **Returns:** `boolean` — whether or not the directory was successfully created

## `static delete(target)`

Deletes the target file/directory.

 * **Parameters:** `target` — `string` — the filepath if the file/directory to delete
 * **Returns:** `boolean` — whether or not the delete was successful

## `static copyFile(target, destination, replace)`

Copies a file from the target to the destination.

 * **Parameters:**
   * `target` — `string` — the filepath of the file to copy
   * `destination` — `string` — the filepath to copy it to, including the name of the file
   * `[replace]` — `boolean` — whether or not to repalce existing files (optional)

## `static copyDirectory(target, destination, replace)`

Copies a directory, any subdirectories, and any files from the target to the destination.

 * **Parameters:**
   * `target` — `string` — the filepath of the directory to copy
   * `destination` — `string` — the filepath to copy it to, including the name of the directory
   * `[replace]` — `boolean` — whether or not to repalce existing files and directories (optional)

## `static exists(target)`

Checks if the target file exists.

 * **Parameters:** `target` — `string` — the filepath to check
 * **Returns:** `boolean` — if the file exists

## `static isDirectory(target)`

Checks if the target is a directory.

 * **Parameters:** `target` — `string` — the filepath to check
 * **Returns:** `boolean` — if the file is a directory

## `static isFile(target)`

Checks if the target is a file.

 * **Parameters:** `target` — `string` — the filepath to check
 * **Returns:** `boolean` — if the file is a file

## `static clearDirectory(target, onlyFiles)`

Deletes all files and directories in the target directory.

 * **Parameters:**
   * `target` — `string` — the filepath of the directory to clear
   * `[onlyFiles]` — `boolean` — whether or not to leave directories (optional), default is false

## `static getFileSize(target)`

Returns the size of a file in bytes

 * **Parameters:** `target` — `string` — the filepath of the file to get the size of
 * **Returns:** `number` — the size of the file in bytes

## `static ZIP(target)`

Zips a file recursively to filepath.zip.

 * **Parameters:** `target` — `string` — the filepath of the file to zip

## `static unGZIP(target, destination)`

Extracts a GZipped file.

 * **Parameters:**
   * `target` — `string` — the filepath of the gzipped file
   * `[destination]` — `string` — the filepath to extract the file to (optional), otherwise it will remove the last extension (usually .gz)
 * **Returns:** `string` — the ungzipped data that has been written to the file

## `static GZIP(target)`

GZips a file to file.extension.gz.

 * **Parameters:** `target` — `string` — the filepath of the file to gzip

## `static unGZIPURL(url, destination, connecttimeout, readtimeout)`

Gets gzipped data from a url and decodes it to the destination.

 * **Parameters:**
   * `url` — `string` — the url to get the gzipped data from
   * `destination` — `string` — the filepath to write the data to
   * `connecttimeout` — `number` — the connect timeout of the connection in ms
   * `readtimeout` — `number` — the read timeout of the connection in ms
 * **Returns:** `string` — the ungzipped data written to the file

## `static urlToFile(url, destination, connecttimeout, readtimeout)`

Gets data from a url and writes it to the destination.

 * **Parameters:**
   * `url` — `string` — the url to get the  data from
   * `destination` — `string` — the filepath to write the data to
   * `connecttimeout` — `number` — the connect timeout of the connection in ms
   * `readtimeout` — `number` — the read timeout of the connection in ms
 * **Returns:** `string` — the data written to the file

## `static listFilesRecursive(target)`

Returns an array of files, and files in subdirectories, within a directory.

 * **Parameters:** `target` — `string` — the directory to recursively list the files from
 * **Returns:** `string[] | boolean` —  an array of files in the target directory and its subdirectories, or false if the target is not a directory

## `static listFiles(target)`

Returns an array of files within a directory.

 * **Parameters:** `target` — `string` — the file to list the files from
 * **Returns:** `string[] | boolean` — an array of files in the target directory, or false if the target is not a directory

## `static listDirectories(target)`

Returns an array of subdirectories within a directory.

 * **Parameters:** `target` — `string` — the file to list the directories from
 * **Returns:** `string[] | boolean` — an array of directories in the target directory, or false if the target is not a directory

## `static listFileAndDirectories(target)`

Returns an array of files and subdirectories within a directory.

 * **Parameters:** `target` — `string` — the file to list the file and directories from
 * **Returns:** `string[] | boolean` — an array of files and directories in the target directory, or false if the target is not a directory