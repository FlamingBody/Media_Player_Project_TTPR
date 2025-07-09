
var selected = false
var playing = false;
//var audio = new Audio("songs/Castle_in_the_Sky.mp3");;
const audio = document.querySelector("audio")
const progressBar = document.querySelector(".progressBar");

//Setting up Songs:
const songs = ["Castle_in_the_Sky",
    "fnaf1", "fnaf2"]

songs.forEach(song => {
    var songIcon = document.createElement("div");
    songIcon.classList.add("song");
    songIcon.setAttribute("value", `${song}`) 
    songIcon.style.backgroundImage = "url(" + `img/${song}.png` + ")"

    document.querySelector("#playList").appendChild(songIcon);
});

$(".soundBTN").click(function(){
    $(".volumnBar").toggle();
})

$(".song").click(function(){
    var song = $(this).attr("value");
    $(".start").attr("src", "img/play_icon.png")
    if (!selected){
        $("main").css("justify-content", "space-around");
        $(".play").css("display", "flex");
        selected = true;
    }
    songSelector(song);
    start($(".start"));
});

$("button.close").click(function(){
    if (selected){
        $("main").css("justify-content", "center");
        $(".play").css("display", "none");
        selected = false;
        audio.currentTime = 0;
        audio.pause();
    }
})

$(".start").click(function(){
    if (selected && !playing){
        start(this);
    } else {
        pause(this);
    }
})

$(".fast_forward").click(function(){
    fastForward(this);
});

$(".rewind").click(function(){
    rewind(this);
});

function start(button){
    $(button).attr("src", "img/pause_icon.png");
    playing = true;
    audio.play();
}

function pause(button){
    $(button).attr("src", "img/play_icon.png");
    playing = false;
    audio.pause();
}

function fastForward(button){
    $(button).attr("src", "img/foward_clicked.png");

    setTimeout(function(){
        $(button).attr("src", "img/fast_forward_icon.png");
    }, 100)

    const duration = audio.duration
    let forward = audio.currentTime + 10;

    if (forward >= duration){
        forward = duration;
    }

    audio.currentTime = forward;
}

function rewind(button){
    $(button).attr("src", "img/rewind_clicked.png");

    setTimeout(function(){
        $(button).attr("src", "img/rewind_icon.png");
    }, 100)
    let rewind = audio.currentTime - 10;

    if (rewind <= 0){
        rewind = 0;
    }

    audio.currentTime = rewind;
}

function formatTime(currentTime){
    const minutes = Math.floor(currentTime/60);
    const sec = Math.floor(currentTime % 60);
    const time = `${minutes}:${sec < 10 ? '0' : ''}${sec}`
    return time;
}

function updateProgress() {
    var progressPercent = (audio.currentTime / audio.duration) * 100;
    //alert(progressPercent);
    $(".progress").css("width", `${progressPercent}%`);
    $(".current").html(formatTime(audio.currentTime));
};


function songSelector(key){
    switch (key){
        case `${songs[0]}`:
            $("img.title").attr("src", `img/${songs[0]}.png`)
            audio.setAttribute("src", `songs/${songs[0]}.mp3`);
            break;
        case `${songs[1]}`:
            $("img.title").attr("src", `img/${songs[1]}.png`);
            audio.setAttribute("src", `songs/${songs[1]}.mp3`);
            break;
        case `${songs[2]}`:
            $("img.title").attr("src", `img/${songs[2]}.png`);
            audio.setAttribute("src", `songs/${songs[2]}.mp3`);
            break;

        default:
            $("img.title").attr("src", `img/${songs[0]}.png`);
            audio.setAttribute("src", `songs/${songs[0]}.mp3`);
            break;
    }
}

function generateRandomNumber(){
    let randomNum = Math.floor(Math.random() * songs.length)
    return randomNum
}

progressBar.addEventListener("click", (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener("ended", ()=>{
    pause(".start");

    songSelector(songs[generateRandomNumber()])
    start(".start");

})

$(".volumnBar").toggle();