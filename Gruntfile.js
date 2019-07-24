module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// Tasks
		sass: {
			// Begin Sass Plugin
			dist: {
				options: {
					sourcemap: 'none',
				},
				files: [
					{
						expand: true,
						cwd: 'src/sass',
						src: ['src/*.scss'],
						dest: 'public/stylesheets/css',
						ext: '.css'
					},
				],
			},
		},
		postcss: {
			// Begin Post CSS Plugin
			options: {
				map: false,
				processors: [
					require('autoprefixer')({
						overrideBrowserslist: ['last 2 versions, > 1%'],
					}),
				],
			},
			dist: {
				src: 'public/stylesheets/css/style.css',
			},
		},
		cssmin: {
			// Begin CSS Minify Plugin
			target: {
				files: [
					{
						expand: true,
						cwd: 'src/css',
						src: ['*.css', '!*.min.css'],
						dest: 'public/stylesheets/css',
						ext: '.min.css',
					},
				],
			},
		},
		uglify: {
			// Begin JS Uglify Plugin
			build: {
				src: ['src/*.js'],
				dest: 'public/javascripts/script.min.js',
			},
		},
		watch: {
			// Compile everything into one task with Watch Plugin
			css: {
				files: 'src/sass/*.scss',
				tasks: ['sass', 'postcss', 'cssmin'],
			},
			js: {
				files: 'src/*.js',
				tasks: ['uglify'],
			},
		},
	})
	
	// Load Grunt plugins
	grunt.loadNpmTasks('grunt-contrib-sass')
	grunt.loadNpmTasks('grunt-postcss')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-watch')

	// Register Grunt tasks
	grunt.registerTask('default', ['watch'])
}
