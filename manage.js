
if (window.innerWidth <= 480){

    let reviews=document.getElementsByClassName( "card-one",  "card-two",  "card-three", "card-four")
    let currentindex=0;
    let startX=0;
    let endX=0;

    function showreviews(index){
        const offset = -index * 100;
        document.querySelector(".reviews-div") .style.transform =`translateX(${offset}%)`;
        document.querySelector(".reviews-div") .style.transition = "transform 0.3s ease";
    }

   const container = document.querySelector(".reviews-div") ;

   container.addEventListener("touchstart", (e) => {
    startX= e.touches[0].clientX;
   });

   container.addEventListener("touchend", (e) => {
    endX= e.changedTouches[0].clientX;
    let diffX= startX - endX

     if( diffX > 50 ) {
            currentindex = (currentindex + 1) % reviews.length;
        }

    else if (diffx < -50){
            currentindex= (currentindex - 1 + reviews.length) % reviews.length;
            
        }

        showreviews(currentindex)

   });

   showreviews(currentindex)

}
