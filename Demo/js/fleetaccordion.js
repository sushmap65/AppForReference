   //fleet accordian
        var acc = document.getElementsByClassName("accordion");
        document.getElementById("fleetPanelId").style.display = "inline";
        console.log("fleet to sold page size marunund");
                    console.log("eragy varan");         
                    $('.fleetSidebarItemLi').removeClass("fleetSidebarItem");

                    document.getElementById("logoutpadding").style.marginTop = "0px";




                    $('.fleetSidebarItemLi').addClass("accordion");
                    document.getElementById("fleetPanelId").style.display = "block";
                    $('.fleetSidebarItemLi').removeClass("sidebarItem");
                    $('li').addClass("liItemdasboard");
                    console.log("space kuranju");  

           

        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                console.log("accordion click chythy------------------");
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";

                        console.log("keri poakn");                   
                      
                       //-----------------------------------------
                       $('li').removeClass("liItemdasboard");
                       $(".logoutLi").removeClass("fleetLogoutcol");
                       $('.fleetSidebarItemLi').removeClass("fleetSidebarItem");

                       $('li').addClass("sidebarItem");
                       $(".logoutLi").addClass("logoutcol");
                       console.log("panipaaaali"); 
                       document.getElementById("logoutpadding").style.marginTop = "160px";                    
                      
                     //$(".logoutLi").removeClass("fleetlogottxt");
                      
                                                
                }
                 else {
                    //$('sidebarItem li').removeClass("active")
                    panel.style.display = "block";
                    console.log("eragy varan"); 

                    $("li").removeClass("active");
                    $('li').removeClass("sidebarItem");
                    $(".logoutLi").removeClass("logoutcol"); 

                    $('.fleetSidebarItemLi').addClass("fleetSidebarItem");
                    $(".logoutLi").addClass("fleetLogoutcol");                   
                    $('li').addClass("liItemdasboard");

                     document.getElementById("logoutpadding").style.marginTop = "0px";  

                    var fleet=document.getElementById("fleetId");
                    fleet.classList.add("active");                 

                }

            }
        }

      
