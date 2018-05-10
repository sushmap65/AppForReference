	


	//------------------------------------------ search icon hide and show

	$(document).ready(function(){
	    $("input").focus(function(){

	    				 //console.log($(this).closest('input').attr('id'));
	    				 var idd=event.target.id;
	    				 if(idd == 'searchDealer')
	    				 {
	    	             	document.getElementById("iconSearchidDealer").style.color = "white"; 
	    	             	document.getElementById("iconSearchidModel").style.color = "#545454";
	    	             	document.getElementById("iconSearchidLocation").style.color = "#545454";
	    	             	document.getElementById("iconSearchidMake").style.color = "#545454"; 

	    	             } 
	    	             else if(idd=='searchModel')
	    	             {
	    	             	document.getElementById("iconSearchidDealer").style.color = "#545454"; 
	    	             	document.getElementById("iconSearchidModel").style.color = "white";
	    	             	document.getElementById("iconSearchidLocation").style.color = "#545454";
	    	             	document.getElementById("iconSearchidMake").style.color = "#545454"; 
	    	             }
	    	             else if(idd=='searchLocation')
	    	             {
	    	             	document.getElementById("iconSearchidDealer").style.color = "#545454"; 
	    	             	document.getElementById("iconSearchidModel").style.color = "#545454";
	    	             	document.getElementById("iconSearchidLocation").style.color = "white";
	    	             	document.getElementById("iconSearchidMake").style.color = "#545454"; 
	    	             }
	    	             else if(idd=='searchMake')
	    	             {
	    	             	document.getElementById("iconSearchidDealer").style.color = "#545454"; 
	    	             	document.getElementById("iconSearchidModel").style.color = "#545454";
	    	             	document.getElementById("iconSearchidLocation").style.color = "#545454";
	    	             	document.getElementById("iconSearchidMake").style.color = "white";
	    	             }
	    	             else
	    	             {
	    	             	document.getElementById("iconSearchidDealer").style.color = "#545454"; 
	    	             	document.getElementById("iconSearchidModel").style.color = "#545454";
	    	             	document.getElementById("iconSearchidLocation").style.color = "#545454";
	    	             	document.getElementById("iconSearchidMake").style.color = "#545454";
	    	             }
	    	            //console.log(idd);
	    });
	   
	});
		

	//-----------------------------------card title fix when scrolling

	$('#assettypescroll').scroll(function(){
	  
	  $('.titleclassAsset').css('top',$('#assettypescroll').scrollTop());

	  
	});
	$('#dealernamescroll').scroll(function(){
	  
	  $('.titleclassDealer').css('top',$('#dealernamescroll').scrollTop());

	  
	});

	$('#modelnumberscroll').scroll(function(){
	  
	  $('.titleclassModelNo').css('top',$('#modelnumberscroll').scrollTop());

	  
	}); 
	$('#locationscroll').scroll(function(){
	  
	  $('.titleclassLocation').css('top',$('#locationscroll').scrollTop());

	  
	});
	$('#makescroll').scroll(function(){
	  
	  $('.titleclassmake').css('top',$('#makescroll').scrollTop());

	  
	});  

	//-------------------------------------------------checkbox check and uncheck its own chips generate



	//-----------------
	$(function() {
		 $('.chips-initial').material_chip({
 	     readOnly: true
 	 });
    var testing = [],
        render_testing = function() {
        	console.log(testing)
            $('#testing').html('<div class="chip"><div class="chips-initial" >'+testing.join(' | ')+'</div></div>');
            var e = jQuery.Event("keydown");
           // e.which = 13; // # Some key code value
              //$(".chips-initial input").val(testing);
         	  //$(".chips-initial input").trigger(e);
        	
        };
    $('input[type="checkbox"]').change(function() {
        testing = $.map($('input[type="checkbox"]:checked'), function(a) { return a.value; })
        console.log(testing);


        render_testing();
    });
});
    
	//------------------
	
// $(function() {
// 		  	var keys = [];
//  	  $('.chips-initial').material_chip({
//  	     readOnly: true
// // 	  //   data: myData
//  	  });
// // 	  // var x = 1;
//  	  $("input[type='checkbox']").on("click",function(e){

 
//  	  	    if($(this).prop("checked") == true){
//  	  	    	//alert("checked"); 
//  	  	    	  var text = $('label[for="' + this.id + '"]').html();
//  	  	    	   keys.push(text);
//  	  	    	//console.log("checked"+text);
//  	  	    	console.log("arrayPush"+keys);

// // 	  	    	var text = $('label[for="' + this.id + '"]').html();
// // 	  	    	alert("checked"+text);
// // 	            // var text=$(this).next('label').text();  
// // 	            console.log("this is checked get it"+text);      
// // 	   	    	var e = jQuery.Event("keydown");
// // 			    e.which = 13; // # Some key code value
// // 	  $(".chips-initial input").val(text);
// // 	  $(".chips-initial input").trigger(e);
// // 	      //$(".chips").append(text);
// // 	  	  // console.log($(".chips").append(text)); 
//  	}
//     else if($(this).prop("checked") == false)
//     {     
	      
// 	      	                  //var text=$(this).next('label').text();
//  	                  var text = $('label[for="' + this.id + '"]').html();
//  	                  //console.log("unchecked"+text);
//  	                    keys.pop(text);
//  	                    console.log("arrayPop",+keys);
// // 	                  console.log("this is Unchecked "+text); 

// // 	                  // alert("Checkbox is unchecked."+text);
// // 	                  var vvv=$(".chip").hide();
// // 	                  console.log(vvv);
// // 	                  // $('.chip').remove(text);
// // 	                  // $('.chip').hide();                
//  	       }
//  	});
	
//  });


// $(document).ready(function(){

	    // $("input[type='checkbox']").focus(function(){
	    // 	 var value = $(this).val();
	    // 	 console.log("Checkbox value......"+value)
	    // 				 if(value =='BBackloader')
	    // 				 {	    				 	  
	    // 	             	var text =document.getElementById("lbltxtbackloader").innerHTML; 
	    // 	             	console.log("Checkbox label text......"+text);  
	    // 	             	console.log("kkkk"); 
	    // 	             	$(".caption").append(text);  	             	
	    	                

	    // 	             } 
	    // 	             else if( value == 'Excavator')
	    // 	             {
	    // 	             	var text =document.getElementById("lbltxtexcovator").innerHTML; 
	    // 	             	console.log("Checkbox label text......"+text);   
	    // 	             }
	    // 	             else if( value == 'Compactors')
	    // 	             {
	    // 	             	var text =document.getElementById("lbltxtCompactors").innerHTML; 
	    // 	             	console.log("Checkbox label text......"+text);   
	    // 	             }
	    // 	             else if( value == 'Telkggg')
	    // 	             {
	    // 	             	var text =document.getElementById("lbltxtTelkggg").innerHTML; 
	    // 	             	console.log("Checkbox label text......"+text);   
	    // 	             }
	    // 	             else if( value == 'Telkgggg')
	    // 	             {
	    // 	             	var text =document.getElementById("lbltxtTelkgggg").innerHTML; 
	    // 	             	console.log("Checkbox label text......"+text);   
	    // 	             }

	    // 	         })
	