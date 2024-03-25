"use strict";

const deleteFilesAndDirectories = require("./delete-files-and-dirs");

function deleteDeclarationFilesPlugin(files) {
  return {
    name: "rollup-plugin-delete-declaration-files",
    buildEnd: () => {
      deleteFilesAndDirectories("lib", files);
    },
  };
}

module.exports = deleteDeclarationFilesPlugin;
