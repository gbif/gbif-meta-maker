<html>
	<head>
		<title>GBIF - Darwin Core Archive Assistant v1.1</title>
		<meta name="ROBOTS" content="INDEX, FOLLOW">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="keywords" content="metamaker, dwca, dwc-a, darwin core archive, meta maker" />
		<meta name="description" content="" />
	
		<style type="text/css">
			#loading-mask {	position:absolute; left:0; top:0; width:100%; height:100%;	z-index:20000; background-color:white; }
			#loading { position:absolute;	left:38%; top:40%; padding:2px; z-index:20002; height:auto; }
			#loading img { margin-bottom:5px; }
			#loading .loading-indicator{ background:white; color:#555;	font:bold 13px tahoma,arial,helvetica; padding:10px;	margin:0;	text-align:center; height:auto;	}
		</style>
	</head>
<body>
	<div id="loading-mask"></div>
	<div id="loading">
		<div class="loading-indicator"><img src="resources/images/gbif.jpg" style="margin-right:8px;" align="absmiddle"/><br/><img src="resources/images/default/grid/loading.gif" style="margin-right:6px;" align="absmiddle"/><span id="loading-msg">Loading Darwin Core Archive Assistant...</span></div>
	</div>

	<link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.4.0/resources/css/ext-all.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/xtheme-gray.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/style.css" />

	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/ext-all.js"></script>
	<script type="text/javascript" src="resources/js/GBIF.MetaMaker.MetaMaker.js"></script>
	<script>
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                ga('create', 'UA-18593842-1', 'auto');
                ga('send', 'pageview');
	</script>

  <?php
	if (isset($_REQUEST['lang'])) {
		print '<script type="text/javascript" src="resources/languages/GBIF.MetaMaker.language.' . $_REQUEST['lang'] . '.js"></script>';
		print '<script type="text/javascript" src="resources/locale/ext-lang-' . $_REQUEST['lang'] . '.js"></script>';
	} else {
		print '<script type="text/javascript" src="resources/languages/GBIF.MetaMaker.language.en.js"></script>';
		print '<script type="text/javascript" src="resources/locale/ext-lang-en.js"></script>';
	}
  ?>
  
</body>
</html>