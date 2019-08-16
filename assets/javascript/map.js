$('button').hover(function () {
    $(this).css("background-color", "yellow")
    var winds = Math.floor(Math.random() * 100);
    $('#wind').text(winds);
    var temps = Math.floor(Math.random() * 100);
    $('#temp').text(temps);
    var humiditys = Math.floor(Math.random() * 100);
    $('#humidity').text(humiditys + '%');
    //need to grab button name
    console.log($(this.id));
},
    function () {
        $(this).css("background-color", "white");
    }

);
/*
function statswindow() {
    $(this).css("background-color", "yellow")
    var winds = Math.floor(Math.random() * 100);
    $('#wind').text(winds);
}
*/