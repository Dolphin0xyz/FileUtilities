// import FileUtilities from "..FileUtilities/main";

const GZIPInputStream = Java.type("java.util.zip.GZIPInputStream");
const GZIPOutputStream = Java.type("java.util.zip.GZIPOutputStream");
const FileInputStream = Java.type("java.io.FileInputStream");
const FileOutputStream = Java.type("java.io.FileOutputStream");
const ZipOutputStream = Java.type("java.util.zip.ZipOutputStream")
const ZipEntry = Java.type("java.util.zip.ZipEntry");
const Byte = Java.type("java.lang.Byte");
const PrintStream = Java.type("java.io.PrintStream");
const URL = Java.type("java.net.URL");
const File = Java.type("java.io.File");
const Files = Java.type("java.nio.file.Files");
const Paths = Java.type("java.nio.file.Paths")
const StandardCopyOption = Java.type("java.nio.file.StandardCopyOption");
const JavaArrayList = Java.type("java.util.ArrayList");

/**
 * The FileUtilities class has all of the features of the FileUtilities module.
 */
export default class FileUtilities {

  /**
   * Renames the file to the name, the file stays in the same directory.
   * If the destination does not exist new directories will be made.
   * @param {string} target - the filepath of the file to rename
   * @param {string} name - the new name of the file
   * @returns {boolean} whether or not the rename was successful
   */

  static renameFile(target, name) {
    const destination = new File(target).getParent() + "/" + name;
    return FileUtilities.moveFile(target, destination);
  }


  /**
   * Moves the target file to the destination.
   * If the destination does not exist new directories will be made.
   * @param {string} target - the filepath of the file to move
   * @param {string} destination - the filepath of the moved file
   * @returns {boolean} whether or not the move was successful
   */

  static moveFile(target, destination, replace) {
    const f = new File(target);
    const d = new File(destination);
    d.getParentFile().mkdirs();
    return f.renameTo(d);
  }


  /**
   * Renames the directory to the name, the directory stays in the same directory.
   * If the destination does not exist new directories will be made.
   * @param {string} target - the filepath of the directory to rename
   * @param {string} name - the filepath of the renamed directory
   * @returns {boolean} whether or not the rename was successful
   */

  static renameDirectory(target, name) {
    const destination = new File(target).getParent() + "/" + name;
    return FileUtilities.moveDirectory(target, destination);
  }


  /**
   * Renames/moves the target directory to the destination.
   * If the destination does not exist new directories will be made.
   * @param {string} target - the filepath of the directory to move
   * @param {string} destination - the filepath of the moved directory
   * @returns {boolean} whether or not the move was successful
   */

  static moveDirectory(target, destination) {
    const f = new File(target);
    const d = new File(destination);
    d.getParentFile().mkdirs();
    return f.renameTo(d);
  }


  /**
   * Creates a new file at the destination.
   * If the destination does not exist new directories will be made.
   * @param {string} destination - the filepath of the new file
   * @returns {boolean} whether or not the file was successfully created
   */

  static newFile(destination) {
    const f = new File(destination);
    f.getParentFile().mkdirs();
    f.createNewFile();
  }

  
  /**
   * Creates a new directory at the destination.
   * If the destination does not exist new directories will be made.
   * @param {string} destination - the filepath of the new directory
   * @returns {boolean} whether or not the directory was successfully created
   */

  static newDirectory(destination) {
    const f = new File(destination);
    return f.mkdirs();
  }


  /**
   * Deletes the target file/directory.
   * @param {string} target - the file to delete
   * @returns {boolean} whether or not the delete was successful
   */

  static delete(target) {
    new Thread(() => {
      new File(target).listFiles().forEach(file => {
        if (file.isDirectory()) {
          FileUtilities.delete(file);
        } else {
          file.delete();
        }
      });
      new File(target).delete();
    }).start();
    return FileUtilities.exists(target);
  }


  /**
   * Copies a file from the target to the destination.
   * @param {string} target - the filepath of the file to copy
   * @param {string} destination - the filepath to copy it to
   * @param {boolean} [replace] - whether or not to repalce existing files (optional)
   */

  static copyFile(target, destination, replace) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const p = new File(target).toPath();
      const q = new File(destination).toPath();
      if (replace === true) {
        Files.copy(p, q, StandardCopyOption.REPLACE_EXISTING);
      } else {
        Files.copy(p, q);
      }
    }).start();
  }


  /**
   * Copies a directory, any subdirectories, and any files from the target to the destination.
   * @param {string} target - the filepath of the directory to copy
   * @param {string} destination - the filepath to copy it to
   * @param {boolean} [replace] - whether or not to repalce existing files and directories (optional)
   */

  static copyDirectory(target, destination, replace) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const p = new File(target).toPath();
      const q = new File(destination).toPath();
      Files.walk(p).forEach(file => {
        const f = q.resolve(p.relativize(file));
        if (replace === true) {
          Files.copy(file, f, StandardCopyOption.REPLACE_EXISTING);
        } else {
          Files.copy(file, f);
        }
      });
    }).start();
  }


  /**
   * Checks if the target file exists.
   * @param {string} target - the filepath to check
   * @returns {boolean} if the file exists
   */

  static exists(target) {
    const f = new File(target);
    return f.exists();
  }


  /**
   * Checks if the target is a directory.
   * @param {string} target - the file to check
   * @returns {boolean} if the file is a directory
   */

  static isDirectory(target) {
    const f = new File(target);
    return f.isDirectory();
  }


  /**
   * Checks if the target is a file.
   * @param {string} target - the file to check
   * @returns {boolean} if the file is a file
   */

  static isFile(target) {
    const f = new File(target);
    return f.isFile();
  }


  /**
   * Deletes all files and directories in the target directory.
   * @param {string} target - the directory to clear
   * @param {boolean} [onlyFiles] - whether or not to leave directories (optional), default is false
   */

  static clearDirectory(target, onlyFiles) {
    new Thread(() => {
      const f = new File(target)
      f.listFiles().forEach(file => {
        if (file.isDirectory()) {
          if (onlyFiles) {
            FileUtilities.clearDirectory(file, true)
          } else {
            FileUtilities.delete(file);
          }
        } else {
          file.delete();
        }
      });
    }).start();
  }


  /**
   * Returns the size of a file in bytes
   * @param {string} target - the file to get the size of
   * @returns {number} the size of the file in bytes
   */

  static getFileSize(target) {
    const f = Paths.get(target);
    return Files.size(f);
  }


  /**
   * Zips a file recursively to filepath.extension.zip.
   * @param {string} target - the file to zip
   */
  
  static ZIP(target) {
    new Thread(() => {
      const destination = target + ".zip"
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const fileList = FileUtilities.listFilesRecursive(target);
      const FileOS = new FileOutputStream(destination);
      const ZIPOS = new ZipOutputStream(FileOS);
      fileList.forEach(strfile => {
        const file = new File(strfile)
        const filePath = file.getCanonicalPath();
        const lengthDirectoryPath = new File(target).getCanonicalPath().length;
        const lengthFilePath = filePath.length;
        const zipFilePath = filePath.substring(lengthDirectoryPath + 1, lengthFilePath);
        ZIPOS.putNextEntry(new ZipEntry(zipFilePath));
        const FileIS = new FileInputStream(file);
        let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
        let len;
        while ((len = FileIS.read(buf)) > 0) {
          ZIPOS.write(buf, 0, len);
        }
        ZIPOS.closeEntry();
      });
      ZIPOS.close();
    }).start();
  }


  /**
   * Extracts a GZipped file.
   * @param {string} target - the filepath of the gzipped file
   * @param {string} [destination] - the filepath to extract the file to (optional), otherwise it will remove the last extension
   * @returns {string} the ungzipped data written to the file
   */

  static unGZIP(target, destination) {
    new Thread(() => {
      const d = (destination !== undefined) ? new File(destination) : new File(target.split(".").pop().join(""));
      d.getParentFile().mkdirs();
      const FileIS = new FileInputStream(target);
      const FilePS = new PrintStream(destination);
      const GZIPIS = new GZIPInputStream(FileIS);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len
      while ((len = GZIPIS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      GZIPIS.close();
      FileIS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }
  

  /**
   * GZips a file to file.extension.gz.
   * @param {string} target - the file to gzip
   */

  static GZIP(target) {
    new Thread(() => {
      const destination = target + ".gz"
      const FileIS = new FileInputStream(target);
      const FilePS = new PrintStream(destination);
      const GZIPOS = new GZIPOutputStream(FilePS);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = FileIS.read(buf)) > 0) {
        GZIPOS.write(buf, 0, len);
      }
      FileIS.close();
      GZIPOS.close();
      FilePS.close();
    }).start();
  }


  /**
   * Gets gzipped data from a url and decodes it to the destination.
   * @param {string} url - the url to get the gzipped data from
   * @param {string} destination - the file to write the data to
   * @param {number} connecttimeout - the connect timeout of the connection in ms
   * @param {number} readtimeout - the read timeout of the connection in ms
   * @returns {string} the ungzipped data written to the file
   */
  
  static unGZIPURL(url, destination, connecttimeout, readtimeout) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const connection = new URL(url).openConnection();
      connection.setDoOutput(true);
      connection.setConnectTimeout(connecttimeout);
      connection.setReadTimeout(readtimeout);
      const GZIPIS = new GZIPInputStream(connection.getInputStream());
      const FilePS = new PrintStream(destination);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = GZIPIS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      GZIPIS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }

  /**
   * Gets  data from a url and writes it to the destination.
   * @param {string} url - the url to get the  data from
   * @param {string} destination - the file to write the data to
   * @param {number} connecttimeout - the connect timeout of the connection in ms
   * @param {number} readtimeout - the read timeout of the connection in ms
   * @returns {string} the data written to the file
   */

  static urlToFile(url, destination, connecttimeout, readtimeout) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const connection = new URL(url).openConnection();
      connection.setDoOutput(true);
      connection.setConnectTimeout(connecttimeout);
      connection.setReadTimeout(readtimeout);
      const IS = connection.getInputStream();
      const FilePS = new PrintStream(destination);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      IS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }


  /**
   * Returns an array of files, and files in subdirectories, within a directory.
   * @param {string} target - the file/directory to add to the list
   * @returns {string[] | boolean} Returns the list with the files added, or false if the target is not a directory
   */

  static listFilesRecursive(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    let r = [];
    f.listFiles().forEach(file => {
      if (file.isDirectory()) {
        r = r.concat(FileUtilities.listFilesRecursive(file));
      } else {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of files within a directory.
   * @param {string} target - the file to list the files from
   * @returns {string[] | boolean} an array of files in the target file, or false if the target is not a directory
   */

  static listFiles(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      if (file.isFile()) {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of subdirectories within a directory.
   * @param {string} target - the file to list the directories from
   * @returns {string[] | boolean} an array of directories in the target file, or false if the target is not a directory
   */

  static listDirectories(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      if (file.isDirectory()) {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of files and subdirectories within a directory.
   * @param {string} target - the file to list the file and directories from
   * @returns {string[] | boolean} an array of files and directories in the target file, or false if the target is not a directory
   */

  static listFileAndDirectories(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      r.push(file.getAbsolutePath());
    });
    return r;
  }
}




export function unGZIP(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let FileIS = new FileInputStream(target);
    let FilePS = new PrintStream(destination);
    let GZIPIS = new GZIPInputStream(FileIS);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len
    while ((len = GZIPIS.read(buf)) > 0) {
      FilePS.write(buf, 0, len);
    }
    GZIPIS.close();
    FileIS.close();
    FilePS.close();
  }).start();
}
  
export function GZIP(target) {
  new Thread(() => {
    let destination = target + ".gz"
    let FileIS = new FileInputStream(target);
    let FilePS = new PrintStream(destination);
    let GZIPOS = new GZIPOutputStream(FilePS);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    while ((len = FileIS.read(buf)) > 0) {
      GZIPOS.write(buf, 0, len);
    }
    FileIS.close();
    GZIPOS.close();
    FilePS.close();
  }).start();
}
  
export function unGZIPURL(url, destination, connecttimeout, readtimeout) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let connection = new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setConnectTimeout(connecttimeout);
    connection.setReadTimeout(readtimeout);
    let GZIPIS = new GZIPInputStream(connection.getInputStream());
    let FilePS = new PrintStream(destination);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    while ((len = GZIPIS.read(buf)) > 0) {
      FilePS.write(buf, 0, len);
    }
    GZIPIS.close();
    FilePS.close();
    }).start();
}

export function renameFile(target, destination) {
  new Thread(() => {
    let f = new File(target);
    let d = new File(destination);
    d.getParentFile().mkdirs();
    f.renameTo(d);
  }).start();
}

export function renameDirectory(target, destination) {
  new Thread(() => {
    let f = new File(target);
    let d = new File(destination);
    d.getParentFile().mkdirs();
    f.renameTo(d);
  }).start();
}

export function newFile(destination) {
  new Thread(() => {
    let f = new File(destination);
    f.getParentFile().mkdirs();
    f.createNewFile();
  }).start();
}

export function newDirectory(destination) {
  new Thread(() => {
    let f = new File(destination);
    f.mkdirs();
  }).start();
}

export function deleteFile(target) {
  new Thread(() => {
    let f = new File(target);
    f.delete();
  }).start();
}

export function copyFile(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let p = Paths.get(target);
    let q = Paths.get(destination);
    Files.copy(p, q, StandardCopyOption.REPLACE_EXISTING);
  }).start();
}

export function copyDirectory(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let p = Paths.get(target);
    let q = Paths.get(destination);
    Files.walk(p).forEach(file => {
      let r = q.resolve(p.relativize(file));
      Files.copy(file, r, StandardCopyOption.REPLACE_EXISTING);
    });
  }).start();
}

export function ZIP(target) {
  new Thread(() => {
    let destination = target + ".zip"
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let fileList = new JavaArrayList();
    fileList = listFiles(fileList, target);
    let FileOS = new FileOutputStream(destination);
    let ZIPOS = new ZipOutputStream(FileOS);
    fileList.forEach(file => {
      let filePath = file.getCanonicalPath();
      let lengthDirectoryPath = new File(target).getCanonicalPath().length;
      let lengthFilePath = filePath.length;
      let zipFilePath = filePath.substring(lengthDirectoryPath + 1, lengthFilePath);
      ZIPOS.putNextEntry(new ZipEntry(zipFilePath));
      let FileIS = new FileInputStream(file);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = FileIS.read(buf)) > 0) {
        ZIPOS.write(buf, 0, len);
      }
      ZIPOS.closeEntry();
    });
    ZIPOS.close();
  }).start();
}

function listFiles(list, target) {
  new File(target).listFiles().forEach(file => {
    if (file.isDirectory()) {
      listFiles(list, file);
    } else {
      list.add(file);
    }
  });
  return list;
}