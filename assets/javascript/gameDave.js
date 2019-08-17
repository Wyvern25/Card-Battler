var playerCards = ["whopper", "fries", "cookie"];
var foodCard0 = mainFoods;
var foodCard1 = sideFoods;
var foodCard2 = desserts;
//tracy & dave save variable 
//tracy dynamic these to db please
var userWins = 0;
var computerWins = 0;
var globalTies = 0;
var globalPlays = 0;
// if you have time to link back to steve's 
//var userFood[foodObj1.Name, foodObj2.Name, foodObj3.Name];

/************** */
// whopper carb + 20
// hot dog carb + 40
/************** */

var weatherRandomizer = {
    Name: '??',
    Card: 1, //1-3
    Stat: 2, //1-4
    Value: .75, //75-1.25
    stageSelect: 1, //dont know if she finishes, for now background color changes
    modColor:
        function () {
            if (this.Value < 1) {
                return 'red';
            } else if (this.Value > 1) {
                return 'green';
            } else { return 'white'; }
        }
}


var scoreGlobal = [];
var battleToggle = true;
var globalHPA = [];
var globalAtkA = [];
var globalDefA = [];
var globalCriA = [];

var globalHPB = [];
var globalAtkB = [];
var globalDefB = [];
var globalCriB = [];
var m = [];




var ties = 0;
var aScore = 0;
var bScore = 0;


var displayValue;

var z = 0;
/*
//debug buttons
$(document).on('click', '#allGemSpawn', function () {
    allA();
    allB();
})

$(document).on('click', '#teamAAll', function () {
    allA();
})

$(document).on('click', '#teamBAll', function () {
    allB();
})
*/

setTimeout(function () {
    allA();
    allB();

}, 1000);

function userCardChoice() {


    //fail to pick 3, get default
    if (myThreeFoods.includes("")) {
        m[0] = mainFoods.map(function (e) { return e.searchTerm; }).indexOf(playerCards[0]);


        m[1] = sideFoods.map(function (e) { return e.searchTerm; }).indexOf(playerCards[1]);


        m[2] = desserts.map(function (e) { return e.searchTerm; }).indexOf(playerCards[2]);

        //user choice preserved if 3 chosen
    } else {
        m[0] = mainFoods.map(function (e) { return e.searchTerm; }).indexOf(myThreeFoods[0]);


        m[1] = sideFoods.map(function (e) { return e.searchTerm; }).indexOf(myThreeFoods[1]);


        m[2] = desserts.map(function (e) { return e.searchTerm; }).indexOf(myThreeFoods[2]);

    }

    //else if

    //var i = Math.floor(Math.random() * 6);
    //playerCards.push(foodCard0[i].searchTerm, foodCard1[i].searchTerm, foodCard2[i].searchTerm);

}

function allA() {
    console.log(m);
    userCardChoice();
    $('#foodA1Value').text("");
    $('#foodA2Value').text("");
    $('#foodA3Value').text("");
    imageSwap = [];
    teamA = [];
    teamA2 = [];
    teamA3 = [];
    teamA4 = [];



    //image swap will replace w/ firebase

    imageSwap.push(foodCard0[m[0]].displayImg, foodCard1[m[1]].displayImg, foodCard2[m[2]].displayImg);


    //generates 1st stat, hp from KCal

    teamA.push(foodCard0[m[0]].Calories, foodCard1[m[1]].Calories, foodCard2[m[2]].Calories);
    globalHPA = teamA;

    //generates 2nd stat, atk from Carbs
    teamA2.push(foodCard0[m[0]].Carbs, foodCard1[m[1]].Carbs, foodCard2[m[2]].Carbs);
    globalAtkA = teamA2;

    //generates 3rd stat, def from Protein
    teamA3.push(foodCard0[m[0]].Protein, foodCard1[m[1]].Protein, foodCard2[m[2]].Protein);
    globalDefA = teamA3;


    //generates 4th stat, cri from fat
    teamA4.push(foodCard0[m[0]].Fat, foodCard1[m[1]].Fat, foodCard2[m[2]].Fat);
    globalCriA = teamA4;



    $('#foodA1').attr('src', imageSwap[0]);
    $('#foodA2').attr('src', imageSwap[1]);
    $('#foodA3').attr('src', imageSwap[2]);
    //adds 4 STATS and displays on click

    $('#foodA1Value').text(teamA2[0] + " / " + teamA3[0] + " / " + teamA4[0] + " / " + teamA[0]);
    $('#foodA2Value').text(teamA2[1] + " / " + teamA3[1] + " / " + teamA4[1] + " / " + teamA[1]);
    $('#foodA3Value').text(teamA2[2] + " / " + teamA3[2] + " / " + teamA4[2] + " / " + teamA[2]);
}

function allB() {
    imageSwap = [];
    teamB = [];
    teamB2 = [];
    teamB3 = [];
    teamB4 = [];

    var z = Math.floor(Math.random() * 6);

    //image swap will replace w/ firebase

    imageSwap.push(foodCard0[z].displayImg, foodCard1[z].displayImg, foodCard2[z].displayImg);

    //generates 1st stat, hp from KCal
    teamB.push(foodCard0[z].Calories, foodCard1[z].Calories, foodCard2[z].Calories);
    globalHPB = teamB;

    //generates 2nd stat, atk from Carbs
    teamB2.push(foodCard0[z].Carbs, foodCard1[z].Carbs, foodCard2[z].Carbs);
    globalAtkB = teamB2;

    //generates 3rd stat, def from Protein
    teamB3.push(foodCard0[z].Protein, foodCard1[z].Protein, foodCard2[z].Protein);
    globalDefB = teamB3;


    //generates 4th stat, cri from fat
    teamB4.push(foodCard0[z].Fat, foodCard1[z].Fat, foodCard2[z].Fat);
    globalCriB = teamB4;


    $('#foodB1').attr('src', imageSwap[0]);
    $('#foodB2').attr('src', imageSwap[1]);
    $('#foodB3').attr('src', imageSwap[2]);
    //adds 2 stats attribute and displays on click 
    $('#foodB1Value').text(teamB2[0] + " / " + teamB3[0] + " / " + teamB4[0] + " / " + teamB[0]);
    $('#foodB2Value').text(teamB2[1] + " / " + teamB3[1] + " / " + teamB4[1] + " / " + teamB[1]);
    $('#foodB3Value').text(teamB2[2] + " / " + teamB3[2] + " / " + teamB4[2] + " / " + teamB[2]);

}




$(document).on('click', '#weather', function () {
    wRandom();
});

function wRandom() {
    weatherRandomizer.Card = Math.ceil(Math.random() * 3);
    weatherRandomizer.Stat = Math.ceil(Math.random() * 4);
    weatherRandomizer.Value = Math.ceil(Math.random() * 51 + 74) / 100;
    weatherRandomizer.stageSelect = Math.ceil(Math.random() * 4);
    wcolor = weatherRandomizer.modColor();

    $('#stageEffects').text(weatherRandomizer.Card + ' / ' + weatherRandomizer.Stat + ' / ' + weatherRandomizer.Value);/* + ' / ' + wcolor);*/
    /*weatherRandomizer.modColor();
    console.log(weatherRandomizer.Card);
    console.log(weatherRandomizer.Stat);
    console.log(weatherRandomizer.Value);
    //console.log(weatherRandomizer.modColor);
    */
}

function weatherToGlobal() {

    var i = weatherRandomizer.Card;
    var statName;
    if (weatherRandomizer.Stat == 1) {
        globalHPA[i - 1] *= weatherRandomizer.Value;
        globalHPB[i - 1] *= weatherRandomizer.Value;
        globalHPA[i - 1] = parseFloat(globalHPA[i - 1].toFixed(2));
        globalHPB[i - 1] = parseFloat(globalHPB[i - 1].toFixed(2));
        statName = 'hp';
    } else if (weatherRandomizer.Stat == 2) {
        globalAtkA[i - 1] *= weatherRandomizer.Value;
        globalAtkB[i - 1] *= weatherRandomizer.Value;
        globalAtkA[i - 1] = parseFloat(globalAtkA[i - 1].toFixed(2));
        globalAtkB[i - 1] = parseFloat(globalAtkB[i - 1].toFixed(2));
        statName = 'atk';
    } else if (weatherRandomizer.Stat == 3) {
        globalDefA[i - 1] *= weatherRandomizer.Value;
        globalDefB[i - 1] *= weatherRandomizer.Value;
        globalDefA[i - 1] = parseFloat(globalDefA[i - 1].toFixed(2));
        globalDefB[i - 1] = parseFloat(globalDefB[i - 1].toFixed(2));
        statName = 'def';
    } else {
        globalCriA[i - 1] *= weatherRandomizer.Value;
        globalCriB[i - 1] *= weatherRandomizer.Value;
        globalCriA[i - 1] = parseFloat(globalCriA[i - 1].toFixed(2));
        globalCriB[i - 1] = parseFloat(globalCriB[i - 1].toFixed(2));
        statName = 'cri';
    }

    //console.log('card ' + i);
    //console.log('stat ' + statName);

    //console.log(globalHPA[i - 1]);

    $('#foodA1Value').text(globalAtkA[0] + " / " + globalDefA[0] + " / " + globalCriA[0] + " / " + globalHPA[0]);
    $('#foodA2Value').text(globalAtkA[1] + " / " + globalDefA[1] + " / " + globalCriA[1] + " / " + globalHPA[1]);
    $('#foodA3Value').text(globalAtkA[2] + " / " + globalDefA[2] + " / " + globalCriA[2] + " / " + globalHPA[2]);
    $('#foodB1Value').text(globalAtkB[0] + " / " + globalDefB[0] + " / " + globalCriB[0] + " / " + globalHPB[0]);
    $('#foodB2Value').text(globalAtkB[1] + " / " + globalDefB[1] + " / " + globalCriB[1] + " / " + globalHPB[1]);
    $('#foodB3Value').text(globalAtkB[2] + " / " + globalDefB[2] + " / " + globalCriB[2] + " / " + globalHPB[2]);

}
/*
var globalHPA = [];
var globalAtkA = [];
var globalDefA = [];
var globalCriA = [];
*/



/*
var weatherRandomizer = {
    Name: '??',
    Card: 1, //1-3
    Stat: 2, //1-4
    Value: .75, //.75-1.25
    modColor:
        function () {
            if (this.Value < 1) {
                return 'red';
            } else if (this.Value > 1) {
                return 'green';
            } else { return 'white' }
        }
}
*/
stager();
function stager() {
    wRandom();
    if (weatherRandomizer.stageSelect == 1) {
        document.body.style.backgroundImage = "url('assets/images/burger.png')";
    } else if (weatherRandomizer.stageSelect == 2) {
        document.body.style.backgroundImage = "url('assets/images/pasta.png')";
    } else if (weatherRandomizer.stageSelect == 3) {
        document.body.style.backgroundImage = "url('assets/images/cake.png')";
    } else { document.body.style.backgroundImage = "url('assets/images/fries.png')"; }
}

$(document).on('click', '#battle', function move() {
    allA();
    allB();
    wRandom();
    weatherToGlobal();
    var timer = 125;
    if ((globalHPA.length >= 3) && (globalHPB.length >= 3) && (battleToggle == true)) {
        battleToggle = false;
        var hpScore = [];
        stager();
        var elem = document.getElementById('lostA1');
        var width = 100 / (globalHPA[0] / (globalAtkB[0] - globalDefA[0]));
        var wide = 0;
        var id = setInterval(frame, timer);
        function frame() {
            if ((wide >= 100) || (wideb >= 100)) {
                clearInterval(id);
            } else {
                wide += width * (1 + 1 * (Math.ceil(globalCriB[0] / 100 - Math.random())));
                //console.log('b' + wide);
                if (wide > 100) { wide = 100 }
                elem.style.width = wide + '%';
                hpScore[0] = wide;
            }
        }


        var elemb = document.getElementById('lostB1');
        var widthb = 100 / (globalHPB[0] / (globalAtkA[0] - globalDefB[0]));
        var wideb = 0;
        var idb = setInterval(frameb, timer);
        function frameb() {
            if ((wideb >= 100) || (wide >= 100)) {
                clearInterval(idb);
            } else {
                wideb += widthb * (1 + 1 * (Math.ceil(globalCriA[0] / 100 - Math.random())));
                //console.log('b' + wideb);
                if (wideb > 100) { wideb = 100 }
                elemb.style.width = wideb + '%';
                hpScore[1] = wideb;
            }
        }

        var elem1 = document.getElementById('lostA2');
        var width1 = 100 / (globalHPA[1] / (globalAtkB[1] - globalDefA[1]));
        var id1 = setInterval(frame1, timer);
        var wide1 = 0;
        function frame1() {
            if ((wide1 >= 100) || (wideb1 >= 100)) {
                clearInterval(id1);
            } else {
                wide1 += width1 * (1 + 1 * (Math.ceil(globalCriB[1] / 100 - Math.random())));
                //console.log('a' + wide1);
                if (wide1 > 100) { wide1 = 100 }
                elem1.style.width = wide1 + '%';
                hpScore[2] = wide1;
            }
        }


        var elemb1 = document.getElementById('lostB2');
        var widthb1 = 100 / (globalHPB[1] / (globalAtkA[1] - globalDefB[1]));
        var wideb1 = 0;
        var idb1 = setInterval(frameb1, timer);
        function frameb1() {
            if ((wideb1 >= 100) || (wide1 >= 100)) {
                clearInterval(idb1);
            } else {
                wideb1 += widthb1 * (1 + 1 * (Math.ceil(globalCriA[1] / 100 - Math.random())));
                //console.log('b' + wideb1);
                if (wideb1 > 100) { wideb1 = 100 }
                elemb1.style.width = wideb1 + '%';
                hpScore[3] = wideb1;
            }
        }


        var elem2 = document.getElementById('lostA3');
        var width2 = 100 / (globalHPA[2] / (globalAtkB[2] - globalDefA[2]));
        var id2 = setInterval(frame2, timer);
        var wide2 = 0;
        function frame2() {
            if ((wide2 >= 100) || (wideb2 >= 100)) {
                clearInterval(id2);
            } else {
                wide2 += width2 * (1 + 1 * (Math.ceil(globalCriB[2] / 100 - Math.random())));
                //console.log('a' + wide2);
                if (wide2 > 100) { wide2 = 100 }
                elem2.style.width = wide2 + '%';
                hpScore[4] = wide2;
            }
        }


        var elemb2 = document.getElementById('lostB3');
        var widthb2 = 100 / (globalHPB[2] / (globalAtkA[2] - globalDefB[2]));
        var wideb2 = 0;
        var idb2 = setInterval(frameb2, timer);
        function frameb2() {
            if ((wideb2 >= 100) || (wide2 >= 100)) {
                clearInterval(idb2);
            } else {
                wideb2 += widthb2 * (1 + 1 * (Math.ceil(globalCriA[2] / 100 - Math.random())));
                //console.log('b' + wideb2);
                if (wideb2 > 100) { wideb2 = 100 }
                elemb2.style.width = wideb2 + '%';
                hpScore[5] = wideb2;
            }
        }

        //ties


        scoreGlobal = hpScore;
        //console.log(scoreGlobal);

        //setTimeout(function () { console.log("Hello"); }, 3000);
        setTimeout(function globalScorer() {

            for (var k = 0; k < 6; k += 2) {

                if ((scoreGlobal[k] >= 100) && (scoreGlobal[k + 1] >= 100)) {
                    ties++;
                    //console.log('t' + ties);
                }
                else if (scoreGlobal[k + 1] >= 100) {
                    aScore++;
                    //console.log('a' + aScore);
                }
                else {
                    bScore++;
                    //console.log('b' + bScore);
                }


            }
            if (aScore > bScore) {
                alert('You Win!');
                userWins++;
                $('#aWin').text(userWins);

            }
            else if (bScore > aScore) {
                alert('You Lose!');
                computerWins++;
                $('#bWin').text(computerWins);
            }
            else {
                alert('Tie');
                globalTies++;
                $('#tie').text(globalTies);


            }
            battleToggle = true;
            globalPlays++;
            $('#play').text(globalPlays);
            //console.log('play again?');

        }, 1500);


        reset();








        // for (var j = 0; j < 6; j++) {
        //     if (scoreGlobal[j] == 100) {
        //         console.log('finally')
        //     }
        // }



    }
})

/* my own responsive formating cut for time constraints
function windowH() {
    var wH = $(window).height();
    //$(document).css({ height: wH * 1 });
    $('html').css({ height: wH * .95 });
    $('#container').css({ height: wH * .70 });
    $('#battle').css({ height: wH * .02 });
    $('#battleWrapper').css({ height: wH * .60 });
    $('.body').css({ font: wH * .02 });
    $('.body').css({ height: wH * .90 });/*height: 90 + 'vh' });
    $('#foodStats, #foodA1Value, #foodA2Value, #foodA3Value, #foodB1Value, #foodB2Value, #foodB3Value, #foodA1Compare, #foodA2Compare, #foodA3Compare, #foodB1Compare, #foodB2Compare, #foodB3Compare')
        .css({ height: wH * .02 })
    $('#cardA1, #cardA2, #cardA3, #cardB1, #cardB2, #cardB3')
        .css({ height: wH * .02 });
    $('#lostA1, #lostA2, #lostA3, #lostB1, #lostB2, #lostB3')
        .css({ height: wH * .02 });
    $('#lifeA1, #lifeA2, #lifeA3')
        .css({ height: wH * .02 });
    $('.span').css({ height: wH * .02 });
}

windowH();


window.onresize = function (event) {
    windowH();
}
*/


function reset() {
    globalHPA = [];
    globalAtkA = [];
    globalHPB = [];
    globalAtkB = [];
    fightRound = 0;
    finalA = [0, 0, 0, 0];
    finalB = [0, 0, 0, 0];
    aScore = 0;
    bScore = 0;
    ties = 0;


    $('#aWin').text(userWins);
    $('#bWin').text(computerWins);
    $('#tie').text(globalTies);
}

$('#aWin').text(userWins);
$('#bWin').text(computerWins);
$('#tie').text(globalTies);
$('#play').text(globalPlays);

