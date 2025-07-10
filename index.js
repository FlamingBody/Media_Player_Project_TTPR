
var selected = false
var playing = false;
var shuffle = false;
const rootElement = document.documentElement;
const title = document.querySelector("h3.title");
const audio = document.querySelector("audio");
const volumeBar = document.querySelector(".volumeBar");
const progressBar = document.querySelector(".progressBar");
const scrollList = document.querySelector("#scrollList");
const computerStyle = getComputedStyle(rootElement)
const scrollAmount = 150; 
const testing = computerStyle.getPropertyValue('--playList-size');
alert(testing);

//Setting up Songs:
//const songs = ["Castle_in_the_Sky",
//    "fnaf1", "fnaf2"]

const songs = [{title: "Castle in the Sky", author: "AI", value: "Castle_in_the_Sky", song: "Castle_in_the_Sky"},
        {title: "FNAF 1 Song", author: "The Living Tomestone", value: "fnaf1", song: "fnaf1"}, 
        {title: "FNAF 2 Song", author: "The Living Tomestone", value: "fnaf2", song: "fnaf2"}]

songs.forEach(song => {
    var songIcon = document.createElement("div");
    songIcon.classList.add("song");
    songIcon.setAttribute("value", `${song.value}`) 
    songIcon.style.backgroundImage = "url(" + `img/${song.song}.png` + ")"

    document.querySelector("div#playList div#scrollList").appendChild(songIcon);
});

$("#shuffle").click(function(){
    shuffle = !shuffle;
    if (shuffle){
        pause(".start");

        songSelector(songs[generateRandomNumber()].value)
        start(".start");
    }
    
})

$(".soundBTN").click(function(){
    $(".volumeBar").toggle();
})

$("#scrollLeft").click(function(){
    scrollList.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
    //scrollList.scrollLeft -= scrollAmount;
})

$("#scrollRight").click(function(){
    scrollList.scrollTo({
        right: scrollAmount,
        behavior: 'smooth'
    });
    //scrollList.scrollLeft += scrollAmount;
})

$(".song").click(function(){
    var song = $(this).attr("value");
    $(".start").attr("src", "img/play_icon.png")
    songSelector(song);
    //var duration = formatTime(audio.duration);
    if (!selected){
        $("main").css("justify-content", "space-around");
        $(".play").css("display", "flex");
        //document.querySelector(".end").innerHTML = `${duration}`;
        selected = true;
    }
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

function volumeControl(){
    var volumePercentage = audio.volume * 100;
    $(".volume").css("width", `${volumePercentage}`);

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
    $(".end").html(formatTime(audio.duration));
    $("#duration").html(formatTime(audio.duration));
};

function formatSong(index){
    $("img.title").attr("src", `img/${songs[index].song}.png`)
    audio.setAttribute("src", `songs/${songs[index].song}.mp3`);

    //var duration = formatTime(audio.duration);

    title.innerHTML = `${songs[index].title}`;
    document.querySelector("#songTitle").innerHTML = `${songs[index].title}`;
    document.querySelector("#author").innerHTML = `${songs[index].author}`;
    //document.querySelector("#duration").innerHTML = `${duration}`;
}

function songSelector(key){
    switch (key){
        case `${songs[0].value}`:
            formatSong(0)
            break;
        case `${songs[1].value}`:
            formatSong(1)
            break;
        case `${songs[2].value}`:
            formatSong(2)
            break;

        default:
            formatSong(0)
            break;
    }
}

function generateRandomNumber(){
    let randomNum = Math.floor(Math.random() * songs.length)
    return randomNum
}

volumeBar.addEventListener("click", (e) => {
    const width = volumeBar.clientWidth;
    const clickX = e.offsetX;
    const maxVolume = 1;
    audio.volume = (clickX/width)*maxVolume;
    
})

progressBar.addEventListener("click", (e) => {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
})

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener("timeupdate", volumeControl);

audio.addEventListener("ended", ()=>{
    if (shuffle){
        pause(".start");

        songSelector(songs[generateRandomNumber()].value)
        start(".start");
    }
    
})

$(".volumeBar").toggle();