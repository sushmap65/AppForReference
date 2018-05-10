jQuery(document).ready(function($){
$('.dealertypeul li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('#searchDealer').on('keyup', function(){
var searchTerm = $(this).val().toLowerCase();
    $('.dealertypeul li').each(function(){
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});

$('.modelnumbertypeul li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});
$('#searchModel	').on('keyup', function(){
var searchTerm = $(this).val().toLowerCase();
    $('.modelnumbertypeul li').each(function(){
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
$('.locationtypeul li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});
$('#searchLocation').on('keyup', function(){
var searchTerm = $(this).val().toLowerCase();
    $('.locationtypeul li').each(function(){
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
$('.maketypeul li').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});
$('#searchMake').on('keyup', function(){
var searchTerm = $(this).val().toLowerCase();
    $('.maketypeul li').each(function(){
        if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
});