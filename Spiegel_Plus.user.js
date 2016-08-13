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

$('.obfuscated').removeClass('obfuscated').addClass('decrypt');
var content = $('.obfuscated-content').html();

$('#laterpay-replacement').remove();
$('.article-section > div:last').remove();

$('.article-section').append(content);

$('.decrypt').each(function(){
	var decrypted = $(this).text().rot1();

	$(this).text( decrypted );
});
