/*
 * grunt-extract-css
 * https://github.com/slalx/grunt-extract-css-js
 *
 * Copyright (c) 2014 淘知了
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  function extractCss(html,filepath) {
    var cssHrefPattern = '<link(?:[^>]*) href="(.+)"(?:[^>]*)>',
        reg = new RegExp(cssHrefPattern, "g");

    //匹配出所有的外链css标签
    var cssPaths = null,
        cssSource = '';

    //遍历出页面所有的css路径，并读取css源码
    while ((cssPaths = reg.exec(html)) != null)  {
            //console.log(scripts[1]);
        cssSource += grunt.file.read(path.join(filepath, '../', cssPaths[1])) + '\n';
    }
    //
    return cssSource;
  }



  function extractJs(html,filepath) {
    var jsSrcPattern = '<script(?:[^>]*) src="(.+)"(?:[^>]*)>',
        reg = new RegExp(jsSrcPattern,"g");

    //读取所有html源码，并返回
    //匹配出所有的外链javascript标签
    var scriptPaths = null,
        scriptSrc = '';
    
    //遍历出页面所有的javascript路径，并读取javascript源码
    while ((scriptPaths = reg.exec(html)) != null)  {
            //console.log(scripts[1]);
        scriptSrc += grunt.file.read(path.join(filepath, '../', scriptPaths[1])) + '\n';
    }


    return scriptSrc;    
  }


  function writeJs(html,filepath,dest){
    //提取所有外链javascript文件
    var jsSource = extractJs(html, filepath);
    if(!jsSource){
      grunt.log.writeln('没有外链javascript文件');
    }
    // Write the destination file.
    var jsDest = dest+'.js';
    console.log(jsDest);
    grunt.file.write(jsDest, jsSource);
    // Print a success message.
    grunt.log.writeln('File "' + jsDest + '" created.');
  }

  function writeCss(html,filepath,dest){
      var cssSource = extractCss(html, filepath);
      // Write the destination file.
      if(!cssSource){
        grunt.log.writeln('没有外链css文件');
      }
      var cssDest = dest+'.css';
      grunt.file.write(cssDest, cssSource);
      // Print a success message.
      grunt.log.writeln('File "' + cssDest + '" created.');
  }




  grunt.registerMultiTask('extractall', 'extract css links and javscript files to one file with one tags automatically', function() {

    // Iterate over all specified file groups.
    this.files.forEach(function (f) {

      //合并所有文件
      var src = f.orig.src.filter(function (filepath) {
        //排除非法的源码文件
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function (filepath) {

       //读取所有html源码，并返回
        var html = grunt.file.read(filepath);
        var dest = f.dest;

        //提取所有外链js文件
        writeJs(html, filepath, dest);

        //提取所有外链css文件
        writeCss(html, filepath, dest);


      });
    });
  });

};