const fs = require("fs").promises;
const path = require("path");
const glob = require("glob");

async function deleteFilesAndDirectories(directoryPath, patterns) {
  directoryPath = path.resolve(directoryPath);

  for (const pattern of patterns) {
    const filesAndDirectories = glob.sync(pattern, {
      cwd: directoryPath,
      dot: true,
    });

    for (const fileOrDir of filesAndDirectories) {
      const fullPath = path.join(directoryPath, fileOrDir);
      try {
        if ((await fs.lstat(fullPath)).isDirectory()) {
          await fs.rm(fullPath, { recursive: true });
        } else {
          await fs.unlink(fullPath);
        }
      } catch (error) {
        console.error(`Error deleting ${fullPath}: ${error.message}`);
      }
    }
  }
}

module.exports = deleteFilesAndDirectories;
