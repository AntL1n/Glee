const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();
const scss = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-html-minifier-terser');
const concat = require('gulp-concat');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');

const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
        notify: false,
    });
};

const watching = () => {
    watch(['app/*.html']).on('change', browserSync.reload);
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/index.js', '!app/js/index.min.js', '!app/js/index.min.js.map'], scripts);
    watch('app/images/icons/**.svg', svgSprites);
};

const styles = () => {
    return src('app/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 10 version'],
                grid: true,
            }),
        )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
};

const scripts = () => {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'app/js/index.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('index.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
};

function svgSprites() {
    return src('app/images/icons/**/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: '../sprite.svg',
                    },
                },
            }),
        )
        .pipe(dest('app/images'));
}

const cleanDist = () => {
    return del('dist');
};

const htmls = () => {
    return src('app/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
};

const build = () => {
    return src(
        [
            'app/css/style.min.css',
            'app/css/style.min.css.map',
            'app/js/index.min.js',
            'app/js/index.min.js.map',
            'app/fonts/**/*',
            'app/images/**/*',
        ],
        {
            base: 'app',
        },
    ).pipe(dest('dist'));
};

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.build = build;
exports.cleanDist = cleanDist;
exports.svgSprites = svgSprites;
exports.htmls = htmls;
exports.build = series(cleanDist, htmls, build);
exports.default = parallel(styles, scripts, browsersync, svgSprites, watching);
