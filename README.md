# grunt-extract-css-js

> 自动合并页面中的所有外链javascript 和css，并分别生成一个独立的javascript 和css文件

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-extract-css-js --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-extract-css-js');
```

## 工作原理

下面的页面源码中有两个外链javascript文件，两个外链css文件。把该页面发布到线上时，为了减少页面的请求量，我们需要把javascript合并为一个文件，把css合并为一个文件。

```

	<!DOCTYPE html>
	<html>
	<head>
	  <title>test</title>
	  <meta charset="utf-8" />
	
	<!-- 外部javascript开始 -->
	<script type="text/javascript" src="a.js"></script>
	<script type="text/javascript" src="b.js"></script>
	<!-- 外部javascript结束 -->
	
	
	
	<!-- 外部css文件开始 -->
	<link rel="stylesheet" type="text/css" href="a.css">
	<link rel="stylesheet" type="text/css" href="b.css">
	<!-- 外部css文件结束 -->
	
	</head>
	<body>
	
	</body>
	</html>


```
为了完成上面的任务，插件工作流程如下

1. 读取源码文件。
2. 通过正则表达式匹配出所有的外链javascript标签，并分析出每个外链javascript文件的路径。
3. 根据2中分析出的路径，分别读取每个外部javascript文件的内容，并合并为一个字符串，然后写入到一个新的文件中。
4. css文件重复2-3过程。
5. 最终结果会生成一个合并后的javascript文件和一个css文件。

## 配置示例

具体说明，请看注释

```
	/**
	 * 本文件是 Gruntfile.js
	 */
	module.exports = function (grunt) {
		//
	    grunt.initConfig({
			//任务名称
			extractall: {
			      main:{
			        files: {
			        	
			            'build/player'/*合并后的文件路径*/: ['src/test/index_test.html']/*html源码文件路径*/
			        }
			    }
			}
	
	
	    });
	
		// ======================= 载入grunt-extract-css-js模块 ==========================
		
		grunt.loadNpmTasks('grunt-extract-css-js');
	
	};

```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
