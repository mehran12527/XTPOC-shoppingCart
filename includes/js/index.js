$(document ).ready(function(){
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
    var source   = $("#cart").html();
    var template = Handlebars.compile(source);
    var html   = template(data);
    $("main").append(html);
    
})

function showOverlay(product){
    var modal = $("#overlayModal").html();
    var template = Handlebars.compile(modal);
    var html = template(product);
    $("main").append(html);
}
function hideOverlay(){
    $("#modal").remove();
}