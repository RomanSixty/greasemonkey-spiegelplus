// ==UserScript==
// @name        Spiegel Plus
// @namespace   LX
// @description zeigt vollständige Spiegel Plus Artikel an
// @include     http://www.spiegel.de/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

String.prototype.rot1 = rot1 = function(s)
{
	return (s = (s) ? s : this).split('').map(function(_)
	{
		if ( _ == ' ' ) return ' ';
		if ( _ == '´' ) return ';';
		if ( _ == '²' ) return '!';
//		if ( _ == '&' ) return '&';

		return String.fromCharCode(_.charCodeAt(0) - 1);
	}).join('');
};

$('.js-spiegelplus-obfuscated-intro').remove();
$('.obfuscated').removeClass('obfuscated').addClass('decrypt');
$('.decrypt').each(function(){

	var $paragraph = $(this);

	// Links sind unverschluesselt, die nehmen wir also vorher raus
	var $links = [];

	$('a.text-link-int', $paragraph).each(function(){
		$links.push($(this)[0].outerHTML);
		$(this).replaceWith('§§§§§'+$links.length);
	});

	var decrypted = $paragraph.text().rot1();


	$paragraph.text( decrypted );

	// dann Links wieder einfügen
	$.each($links, function(i, link){
		var regexp = new RegExp('¦¦¦¦¦'+i, 'g');
		$paragraph.html($paragraph.html().replace(regexp, link));
	});
});
var content = $('.obfuscated-content').html();
$('.article-section > div:last').remove();
$('.article-section > div:last').remove();

$('.article-section').append(content);

$('#laterpay-replacement').remove();
