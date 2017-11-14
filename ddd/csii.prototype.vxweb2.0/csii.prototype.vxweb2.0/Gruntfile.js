'use strict';
/************************************************配置************************************************/
// 源码、生产环境路径
var SOURCE_PATH = "./static/";
var PRODUCT_PATH = "./dist/"; //是否压缩取决于任务,prod压缩,prep不压缩

// 读取要压缩的js和css文件列表
var jsFiles = require(SOURCE_PATH + 'lib/config.preload.js').jsFiles;
var cssFiles = require(SOURCE_PATH + "lib/config.preload.js").cssFiles;

//懒加载文件
var lazyFilesModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_Modules;
var lazyFilesNoModule = require(SOURCE_PATH + 'lib/config.lazyload.js').lazyLoad_NoModules;

var TaskResult = {// 合并和压缩后的js和css文件目标路径
	concat: {
		allJs: PRODUCT_PATH + 'lib/min/all.js',
		allCss: PRODUCT_PATH + 'css/all.css',
	},
	minify: {
		allMinJs: PRODUCT_PATH + 'lib/min/all.min.js',
		allMinCss: PRODUCT_PATH + 'css/all.min.css',
	},
};
var copyRule = [/**通用文件**/
	'login.html',  //login resource
	'css/login.css', //login resource
	'css/fonts/**', //字体文件
	'css/img/**', //图片文件
	'data/**', //模拟数据,按需
	'fonts/**', //字体文件
	'htmls/**', //htmls
	'images/**', //img标签引入的文件
	'lib/template/**', //模板文件
	'lib/min/jquery-1.11.1.min.js', //index.html引入的js
	'lib/min/vx2.min.js', //index.html引入的js
].concat(wrapLazy(lazyFilesModule, true) /**有模块懒加载文件**/).concat(wrapLazy(lazyFilesNoModule, false)/**无模块懒加载文件**/);
/************************************************结束************************************************/
// 组装压缩用到的js和css的源码路径
function wrap(dirname, files) {
	var gruntFiles = [];
	files.forEach(function (file) {
		gruntFiles.push(dirname + "/" + file);
	});
	return gruntFiles;
}

function wrapLazy(files, hasMod) {
	var gruntFiles = [];
	if (hasMod) {
		files.forEach(function (temp) {
			gruntFiles.push.apply(gruntFiles,temp.files);
		});
	} else {
		for (var key in files) {
			gruntFiles.push.apply(gruntFiles,files[key]);
		}
	}
	return gruntFiles;
}
var bannerTpl = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
	'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>* Copyright (c) <%= grunt.template.today("yyyy") %>' +
	'<%= pkg.author.name %>;\n' + '* Licensed : <%= pkg.license  %> \n*/\n';

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: { //复制文件
			toProduct: {
				files: [{
					expand: true,
					cwd: SOURCE_PATH,
					flatten: false,
					src: copyRule,
					dest: PRODUCT_PATH
				}]
			}
		},
		'compile-handlebars': { //使用模板生成目标index.html
			prod: {
				files: [{
					src: SOURCE_PATH + 'index.handlebars',
					dest: PRODUCT_PATH + 'index.html'
				}],
				templateData: {productMode: true}
			},
			preProd: {
				files: [{
					src: SOURCE_PATH + 'index.handlebars',
					dest: PRODUCT_PATH + 'index.html'
				}],
				templateData: {productMode: false}
			}
		},
		clean: [PRODUCT_PATH+'**'], //清楚文件
		// 从backup/last中合并all.js和all.css到preProduct
		concat: { //合并文件
			allJs: {
				options: {
					separator: ";\n/*---------------------------separator javascript--------------------------------*/\n",
				},
				src: wrap(SOURCE_PATH, jsFiles),
				dest: TaskResult.concat.allJs
			},
			allCss: {
				options: {
					separator: "\r\n/*--------------------------separator css--------------------------------*/\r\n",
				},
				src: wrap(SOURCE_PATH, cssFiles),
				dest: TaskResult.concat.allCss
			}
		},
		// 将preProduct的all.js压缩成all.min.js，发送到product
		uglify: {
			options: {
				banner: bannerTpl
			},
			vx2ui: {
				src: TaskResult.concat.allJs,
				dest: TaskResult.minify.allMinJs
			}
		},
		// 将preProduct的all.css压缩成all.min.css，发送到product
		cssmin: {
			options: {
				keepSpecialComments: 0,
				advanced: false,
				aggressiveMerging: false,
				mediaMerging: false,
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			minify: {
				src: TaskResult.concat.allCss,
				dest: TaskResult.minify.allMinCss
			}
		},
		// jshint检测
		jshint: {
			// grunt-contrib-jshint的详细参数介绍，请参考：https://github.com/gruntjs/grunt-contrib-jshint
			// 配置jshint的校验规则，参数详细参考DOC目录下面的《jshint参数详解.pdf》
			options: {
				'-W064': true, // 忽略错误代码为 W064 的错误
				"strict": true,
				// "curly": true,
				"eqnull": true,
				// "eqeqeq": true,
				"undef": true,
				"globals": {
					"$": true,
					"window": true,
					"angular": true,
					"vx": true,
					"document": true,
					"jQuery": true,
					"console": true
				},
				"force": true, // 强制执行，即使出现错误也会执行下面的任务
				// reporterOutput : 'jshint/report.txt'//将jshint校验的结果输出到文件
			},
			beforeconcat: wrap(PRODUCT_PATH, jsFiles), // 合并之前检测
			afterconcat: TaskResult.concat.allJs // 合并之后检测
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					env: {
						PORT: '9090',
						NODE_ENV:"development"
					},
					watch: ['./devServer'],
					callback: function (nodemon) {
						nodemon.on('config:update', function () {
							console.log('[devServer] config update...')
						});
						nodemon.on('restart', function () {
							console.log('[devServer] restart...')
						});
					}
				}
			},
			dist: {
				script: 'server.js',
				options: {
					env: {
						PORT: '9090',
					},
					watch: ['./devServer'],
					callback: function (nodemon) {
						nodemon.on('config:update', function () {
							console.log('[devServer] config update...')
						});
						nodemon.on('restart', function () {
							console.log('[devServer] restart...')
						});
					}
				}
			}
		}
	});
	// 加载grunt任务依赖模块
	grunt.loadNpmTasks('grunt-compile-handlebars');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-nodemon');
	//clean last file ==> step1 (复制文件) ==> step2 (编译handlebar模板) ==> step3 (合并文件)==> step4 (压缩代码) ?生产任务prod用到
	grunt.registerTask('prep', ['clean', 'copy:toProduct', 'compile-handlebars:preProd', 'concat']);
	grunt.registerTask('prod', ['clean', 'copy:toProduct', 'compile-handlebars:prod', 'concat','uglify:vx2ui', 'cssmin:minify']);
	grunt.registerTask('default', ['prod']);
	grunt.registerTask('dev', ['nodemon:dev']);
	grunt.registerTask('dist', ['nodemon:dist']);
};