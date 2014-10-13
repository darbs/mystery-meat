module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            test: {
                options: {
                    reporter: 'nyan',
                    require: 'coverage/blanket',
                    quiet: false
                },
                src: ['test/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'coverage.html'
                },
                src: ['test/**/*.js'],
                dest: 'coverage/src'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
//        blanket: {
//            options: {
//                reporter: 'html-cov',
//                // use the quiet flag to suppress the mocha console output
//                quiet: true,
//                // specify a destination file to capture the mocha
//                // output (the quiet option does not suppress this)
//                captureFile: 'coverage.html'
//            },
//            src: ['src/'],
//            dest: 'coverage/src/'
//        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint'] //qunit
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-blanket');


    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('default', ['jshint', 'mochaTest']);

    // TODO
    //grunt.registerTask('train', []);
};