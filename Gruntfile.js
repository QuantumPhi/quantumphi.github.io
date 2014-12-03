module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['*.html', 'dist/*'],

        jade: {
            index: {
                files: {
                    'index.html' : ['templates/index.jade']
                }
            }
        },

        shell: {
            'serve': {
                command: [
                    'grunt',
                    'jekyll serve'
                ].join(' && ')
            }
        },

        uglify: {
            options: {
                preserveComments: false
            },

            main: {
                src: 'js/index.js',
                dest: 'dist/index.min.js'
            },

            libs: {
                files: grunt.file.expandMapping(['bower_components/**/*.js'], 'dist/', {
                    flatten: true,
                    rename: function(destBase, destPath) {
                        return destBase + destPath.replace('.js', '.min.js')
                    }
                })
            }
        },

        watch: {
            html: {
                files: ['templates/*.jade', 'templates/*.layout.jade'],
                tasks: ['jade']
            },

            scripts: {
                files: ['js/index.js'],
                tasks: ['uglify:main']
            }
        }
    })

    grunt.registerTask('default', ['jade', 'uglify'])
    grunt.registerTask('serve', ['shell:serve'])
}
