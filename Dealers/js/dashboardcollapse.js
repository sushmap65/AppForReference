        var collapse = "open"
        $('#dashboarditems').on('click', function() {         
                //console.log("Hiiii");           
                console.log("clicked on aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+event.target.tagName);
                console.log("work aknilaaa");
                //alert("ooooo");

                   //alert("Are you want to logout");
                  //$('#containerdata').addClass('rowalignshow');
                 if (event.target.tagName == 'LI' || event.target.tagName == 'SPAN' || event.target.tagName == 'I' || event.target.tagName == 'A' || event.target.tagName == 'P') {
                    $('span.sidebarItemText').show();
                    document.getElementById("dashboardHide").style.width = "15%";
                    document.getElementById("logouticon").style.display = "none";
                    $('.logouttxt').show(); 
                         console.log("work akvoooooooooooooooooooooooo?");                 
                }         
                else{
                          if (document.getElementById("dashboardHide").style.width == "50px"){
                            console.log("chadichaasaneeee");
                            $('#containerdata').removeClass('rowalignhide');
                            $('#containerdata').addClass('rowalignshow');
                            $('#containerdata').removeClass("container");
                            $('#searchcollid').addClass("searchButton");
                            $('#searchcollid').removeClass("searchButtoncollapse");
                              $('#searchfleetdataId').removeClass('searchfleetdataCollapse');
                            $('#searchfleetdataId').addClass('searchfleetdata');

                            $('span.sidebarItemText').show();

                            document.getElementById("dashboardHide").style.width = "15%";
                            document.getElementById("logouticon").style.display = "none";                             
                            $('.logouttxt').show();
                            console.log("footeer not working");
                            document.getElementById("footerid").style.marginLeft = "240px";                                                   
                            console.log("footeer not working");
                          }
                          else{
                               //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                               //$('#containerdata').addClass("container");
                                 $('#searchcollid').removeClass("searchButton");
                            $('#searchcollid').addClass("searchButtoncollapse");
                            $('#searchfleetdataId').addClass('searchfleetdataCollapse');
                            $('#searchfleetdataId').removeClass('searchfleetdata');

                               $('#containerdata').removeClass('rowalignshow');
                               $('#containerdata').addClass('rowalignhide');                            
                               document.getElementById("footerid").style.marginLeft = "135px";  
                               console.log(" evde collapse  work aayi");
                               console.log("This is",event.target.tagName);
                               console.log("type"+typeof(event.target.tagName))
                               $('span.sidebarItemText').hide();
                               $('panel li span').hide();
                               $('.logouttxt').hide();
                               document.getElementById("dashboardHide").style.width = "50px";
                               document.getElementById("logouticon").style.display = "inline";
                          }                       

                    }               

        });
        
