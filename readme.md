<h1>Gulp Web Starter</h1>
<p>Lightweight startup HTML5 template, based on Gulp.</p>


<p><strong>Gulp Web Starter</strong> - lightweight startup HTML5 template with <strong>Gulp 4</strong>, <strong>SCSS</strong>, <strong>Browsersync</strong>, <strong>Autoprefixer</strong>, <strong>Uglify-ES</strong>, <strong>Clean-CSS</strong>, <strong>Rsync</strong>, <strong>CSS Reboot</strong> (Bootstrap reboot).</p>
 <p>It uses best practices for <strong>responsive images</strong> optimizing and contains a <strong>.htaccess</strong> file for resources caching (images, fonts, HTML, CSS, JS and other content types).</p>

<h2>How to use:</h2>

<pre>git clone https://github.com/zikju/GulpWebStarter.git</pre>

<ol>
	<li>Clone or <a href="https://github.com/zikju/GulpWebStarter/archive/master.zip">Download</a> from GitHub</li>
	<li>Install Node Modules: <strong>npm i</strong></li>
	<li>Run: <strong>gulp</strong></li>
</ol>

<h2>Main Gulp tasks:</h2>

<ul>
	<li><strong title="gulp task"><em>gulp</em></strong>: run default gulp task (images, styles, scripts, browsersync, startwatch)</li>
	<li><strong title="cleanimg task"><em>cleanimg</em></strong>: Clean all compressed images</li>
	<li><strong title="styles, scripts, images, assets tasks"><em>styles, scripts, images, assets</em></strong>: build assets (css, js, images or all)</li>
	<li><strong title="rsync task"><em>rsync</em></strong>: project deployment via <strong>RSYNC</strong></li>
</ul>

<h2>Basic rules</h2>

<ol>
	<li>All custom <strong title="scripts task"><em>scripts</em></strong> located in <strong>app/js/app.js</strong></li>
	<li>All custom <strong title="styles task"><em>styles</em></strong> located in <strong>app/scss/main.scss</strong></li>
	<li>All preprocessor <strong>configs</strong> placed in <strong>app/scss/_config.scss</strong></li>
	<li>All <strong>images</strong> sources placed in <strong>app/images/src/</strong> folder.</li>
</ol>

<h2>Included features</h2>

<ol>
	<li><a href="https://getbootstrap.com/docs/4.0/content/reboot/">bootstrap-reboot</a> - Bootstrap Reboot CSS collection</li>
	<li>
		<a href="https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints">_breakpoints.scss</a> - Bootstrap Breakpoints mixin (available only for sass and scss)</li>
		<li><a href="https://getbootstrap.com/docs/4.0/layout/grid/">bootstrap-grid</a> (optional) - Bootstrap Grid collection</li>
		<li><a href="https://jquery.com/">jQuery (latest)</a> - jQuery library</li>
		<li><a href="https://github.com/verlok/lazyload">Vanilla LazyLoad</a> - LazyLoad is a lightweight and flexible script that speeds up your web application by deferring the loading of your below-the-fold images, videos and iframes to when they will enter the viewport.</li>
</ol>

<h2>Caching</h2>

<p>Rename <strong>ht.access</strong> to <strong>.htaccess</strong> before place it in your web server. This file contain rules for htaccess resources caching.</p>


<h2>Issues</h2>

<ol>
	<li>Long Preprocessor compile: Disable the "safe write" option in PHPStorm settings.</li>
</ol>
