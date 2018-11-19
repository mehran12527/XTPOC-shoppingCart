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
function calculateTotal(data){
    var totalPrice = 0;
    data.products.forEach(function(product) {
        if(product.offerPrice){
            totalPrice+=parseFloat(product.offerPrice);
        }
        else{
            totalPrice+=parseFloat(product.orignalPrice);
        }
    });
    console.log(totalPrice)
    if(totalPrice>50){
        $("#freeShipping").removeClass("hide");
        $("#shippingCharged").addClass("hide");
        $("#shippingCharged").removeClass("show-table-row");
    }
    else{
        $("#shippingCharged").removeClass("hide");
        $("#freeShipping").addClass("hide");
    }
    return totalPrice;
}
function applyPromo(){
    var discount = 0;
    var total = calculateTotal(window.data);
    var promo = $("#promoInput").val().toUpperCase();
    if(promoCodes[promo]){
        $(".promo-error").addClass("hide");
        discount = total*parseInt(promoCodes[promo])*0.01;
        $(".promo-added ").removeClass("hide");
        $("#promoApplied").html("Promotion code "+promo+" applied");
        $("#discountedPrice").html(discount.toFixed( 2 ));
        $("#finalPrice").html(caclulateFinal(total,discount));
    }
    else{
        $(".promo-error").removeClass("hide");
    }

}
function caclulateFinal(totalPrice, promoDiscount){
    if(promoDiscount){
        totalPrice-=promoDiscount;
    }
    if(totalPrice<50){
        totalPrice+=5;
    }
    return totalPrice;
}

function quantprice(event,productId){
    var finalPrice = 0;
    var tempData =  JSON.parse(JSON.stringify(data));
    data.products.forEach(function(product,idx) {
        if(product.productId === productId){
            if(product.offerPrice){
               var qty = event.target.value;
               if(qty){
                    finalPrice = parseFloat(qty* parseFloat(product.offerPrice)).toFixed(2);
                   
               }
               else{
                   finalPrice =  parseFloat(product.offerPrice).toFixed(2);
                   
               }
               tempData.products[idx].offerPrice = finalPrice;
               $(event.target).parent().siblings(".productPrice").children(".currentPrice").html("<p><sup>&dollar;</sup>"+finalPrice+"</p>");
            }
            else{
                var qty = event.target.value;
               if(qty){
                    finalPrice =  parseFloat(qty* parseFloat(product.orignalPrice)).toFixed(2);
               }
               else{
                   finalPrice = parseFloat(product.orignalPrice).toFixed(2);
               }
               tempData.products[idx].orignalPrice = finalPrice;
               $(event.target).parent().siblings(".productPrice").html("<p><sup>&dollar;</sup>"+finalPrice+"</p>");
               
            }
        }    
    });
    $("#totalPrice").html("<span>$</span>"+calculateTotal(tempData))
     $("#finalPrice").html(caclulateFinal(calculateTotal(tempData)))
  
    
    
}