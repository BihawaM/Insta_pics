sleep=(ms)=>{
    return new Promise(resolve => setTimeout(resolve, ms));
};
async function nowsleep(x) {
await sleep(x);
}
document.onscroll = ()=>
    {
        if (document.body.scrollTop > 100 ) {
            $("#brand").removeClass("logo");
            $("#brand").addClass("mainicon");
        } else {
            $("#brand").removeClass("mainicon");
            $("#brand").addClass("logo");
        }
    };
choose= (id)=>{
if ($("#likeicon"+id).hasClass("loved")){
    return unlike(id)
}
like(id)
};
like = (id)=>{
    $.get('/like/'+id,(newlikes)=>{
        anim=$("#likeheart"+id);
        anim.show(300);
        nowsleep(600).then(()=>{
                anim.hide(50);
                $("#likeicon"+id).addClass("loved")
                $("#likespan"+id).text(newlikes)
            }
        )
    });
};
unlike = (id)=>{
    $.get('/unlike/'+id,(newlikes)=>{
        nowsleep(600).then(()=>{
                $("#likeicon"+id).removeClass("loved");
                $("#likespan"+id).text(newlikes)
            }
        )
    });
};
togglefollow = (id)=>{
    $.get('/follow_or_not/'+id,(newfollows)=>{
        $("#following").text(newfollows[1]);
        $("#followers").text(newfollows[0]);
        let follow=$("#follow");
        let following=$("#follown");
        if (follow.hasClass("d-none")){
            follow.removeClass("d-none");
            following.addClass("d-none")
        }else{
            following.removeClass("d-none");
            follow.addClass("d-none")
        }
    });
};
togglesave = (id)=>{
    $.get('/save/'+id,()=>{
        let anim=$("#saveicon"+id);
        anim.toggleClass("saved");
    });
};
function chelewa(){
    userinput.toggleClass('loading');
    return nowsleep(100).then(()=>{
        userinput.toggleClass('loading');
    })
};

$(document).ready(()=> {
    userinput = $("#searching");
    $("#searchform").keyup(() => {
        let key = userinput.val();
        let place = $("#resultsplace");
        let plc = $("#resultsbody");
        if (key.length < 1) {
            place.empty();
            plc.hide();
            return
        }
        chelewa().then(()=>{
            $.get('/search/' + key, '', function (data) {
                plc.show();
                place.empty();
                place.append(data);
            })
        })
    })
});

$(function(){
	$(document).one('click', '.like-review', function(e) {
		$(this).html('<i class="fa fa-heart" aria-hidden="true"></i> You liked this');
		$(this).children('.fa-heart').addClass('animate-like');
	});
});  

$(document).ready(function(){				

    $("#follow-button").click(function(){
      if ($("#follow-button").text() == "+ Follow"){
        // *** State Change: To Following ***      
        // We want the button to squish (or shrink) by 10px as a reaction to the click and for it to last 100ms    
        $("#follow-button").animate({ width: '-=10px' }, 100, 'easeInCubic', function () {});
        
        // then now we want the button to expand out to it's full state
        // The left translation is to keep the button centred with it's longer width
        $("#follow-button").animate({ width: '+=45px', left: '-=15px' }, 600, 'easeInOutBack', function () { 
          $("#follow-button").css("color", "#fff");
          $("#follow-button").text("Following");
  
          // Animate the background transition from white to green. Using JQuery Color
          $("#follow-button").animate({
            backgroundColor: "#2EB82E",
            borderColor: "#2EB82E"
          }, 1000 );
        });
      }else{
        
        // *** State Change: Unfollow ***     
        // Change the button back to it's original state
        $("#follow-button").animate({ width: '-=25px', left: '+=15px' }, 600, 'easeInOutBack', function () { 
          $("#follow-button").text("+ Follow");
          $("#follow-button").css("color", "#3399FF");
          $("#follow-button").css("background-color", "#ffffff");
          $("#follow-button").css("border-color", "#3399FF");
        });
      }
    }); 
  });