module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: true
            },
            my_target: {
                files: {
                    'javascript/app.common.min.js': ['build/js/app.common.js'],
                    'javascript/app.init.min.js': ['build/js/app.init.js'],
                    'javascript/app.toolkit.min.js':['build/js/toolkit.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    compress:true
                },
                files: {
                    'css/app.css': ['build/css/css.reset.less','build/css/css.frame.less','build/css/css.style.less','build/css/css.animate.less']
                }

            }
        },
        jshint: {
            options:{
                asi:true,
                boss:true,
                eqeqeq:true
            },
            all: ['Gruntfile.js', 'build/js/app.common.js', 'build/js/app.init.js']
        }

    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
            grunt.loadNpmTasks('grunt-contrib-jshint');
                grunt.loadNpmTasks('grunt-contrib-less');
                    //grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['jshint','uglify','less']);

};