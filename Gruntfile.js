module.exports = function (grunt) {

    var compileLessFiles = ['pages/**/*.less', 'components/**/*.less', 'app-css/app.less'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      // 监听 *.less 文件修改
      less: {
          files: ['app-css/**/*.less', ...compileLessFiles],
          tasks: ['less:wxss']
      }
    },
    less: {
      // 将*.less编译成*.wxss
      wxss: {
        options: {
            paths: ['.'] //解析less中的@import相对于根目录
        },
        files: [{
          expand: true,
          cwd: '.',
          src: compileLessFiles,
          dest: '.',
          ext: '.wxss'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // 监听 less 并编译
  grunt.registerTask('dev', ['watch']);
  // 编译 less
  grunt.registerTask('default', ['less']);

};
