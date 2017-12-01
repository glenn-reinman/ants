var is_sim = true;

function swapPanel() {
    if (is_sim){
        document.getElementById('sim').style.display = "none";
        document.getElementById('editor').style.display = "block";
        is_sim = false;
    }
    else{
        document.getElementById('sim').style.display = "block";
        document.getElementById('editor').style.display = "none";
        is_sim = true;
    }

}