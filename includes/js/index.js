$(document ).ready(function(){
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
    var totalPrice = calculateTotal(data);
    var finalPrice = caclulateFinal(totalPrice)
    var context = null;
    if(totalPrice<50){
        context = {data:data, totalPrice:totalPrice, finalPrice:finalPrice, shippingCharge:true}
    }
    else{
        context = {data:data, totalPrice:totalPrice, finalPrice:finalPrice}
    }
    var source   = $("#cart").html();
    var template = Handlebars.compile(source);
    var html   = template(context);
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
function calculateTotal(){
    var totalPrice = 0;
    data.products.forEach(function(product) {
        if(product.offerPrice){
            totalPrice+=parseFloat(product.offerPrice);
        }
        else{
            totalPrice+=parseFloat(product.orignalPrice);
        }
    });
    return totalPrice;
}
function applyPromo(){
    var discount = 0;
    var total = calculateTotal();
    var promo = $("#promoInput").val();
    if(promoCodes[promo]){
        discount = total*parseInt(promoCodes[promo])*0.01;
        $(".promo-added ").removeClass("hide")
        $("#promoApplied").html("Promotion code "+promo+" applied");
        $("#discountedPrice").html(discount.toFixed( 2 ));
        $("#finalPrice").html(caclulateFinal(total,discount));
    }

}
function caclulateFinal(totalPrice, promoDiscount){
    if(promoDiscount){
        totalPrice-=promoDiscount
    }
    if(totalPrice<50){
        totalPrice+=5;
    }
    return totalPrice;
}