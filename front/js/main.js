function displayChange(){
    let bttn=document.querySelector("header nav");    
    if(bttn.style.display==="none"){
        bttn.style.display="block";
    }else{
        bttn.style.display="none";
    }
}

/** */
//acordeon preguntas frecuentes
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}
/** */

