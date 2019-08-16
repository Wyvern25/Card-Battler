var foodCard0 = ["assets/images/burger.png", 'assets/images/sushi.png', 'assets/images/pizza.png', 'assets/images/pasta.png', 'assets/images/hot-dog.png', 'assets/images/taco.png',];
var foodCard1 = ["assets/images/nachos.png", 'assets/images/fries.png', 'assets/images/salad.png', 'assets/images/fruit.png', 'assets/images/soup.png', 'assets/images/rice.png',];
var foodCard2 = ["assets/images/donut.png", 'assets/images/ice-cream.png', 'assets/images/cookie.png', 'assets/images/cake.png', 'assets/images/pie.png', 'assets/images/sno-cone.png',];
//tracy & dave save variable
//var userFood[foodObj1.Name, foodObj2.Name, foodObj3.Name]; 
var weatherRandomizer = {
    Name: '??',
    Card: 1, //1-3
    Stat: 2, //1-4
    Value: .75, //75-1.25
    modColor:
        function () {
            if (this.Value < 1) {
                return 'red';
            } else if (this.Value > 1) {
                return 'green';
            } else { return 'white'; }
        }
}
//
var foodObj1 = [
    {
        Name: "burger",
        imageSource: "assets/images/burger.png",
        KCal: 268,
        Fat: 12.28,
        Fiber: 2.2,
        Protein: 10.36
    },

    {
        Name: "sushi",
        imageSource: "assets/images/sushi.png",
        KCal: 371,
        Fat: 1.51,
        Fiber: 3.2,
        Protein: 13.04
    },

    {
        Name: "pizza",
        imageSource: "assets/images/pizza.png",
        KCal: 273,
        Fat: 13.21,
        Fiber: 1.3,
        Protein: 10.43
    },

    {   //no fiber value; fiber can be def or crit
        Name: "pasta",
        imageSource: "assets/images/pizza.png",
        KCal: 206,
        Fat: 6.22,
        Fiber: 0,
        Protein: 6.48
    },

    {
        Name: "hot-dog",
        imageSource: "assets/images/hot-dog.png",
        KCal: 250,
        Fat: 15.33,
        Fiber: 1,
        Protein: 11.19
    },

    {
        Name: "taco",
        imageSource: "assets/images/taco.png",
        KCal: 440,
        Fat: 17.59,
        Fiber: 2.9,
        Protein: 10.17
    }
];



//
/*
nacho
ENERC_KCAL: 185.78191562913727
FAT: 13.255193476275211
FIBTG: 1.301153110896876
PROCNT: 1.9075888168403532
 
fries
ENERC_KCAL: 77
FAT: 0.09
FIBTG: 2.2
PROCNT: 2.02
 
salad
ENERC_KCAL: 91
FAT: 5.46
FIBTG: 0.91
PROCNT: 3.25
 
fruit
ENERC_KCAL: 31
FAT: 0.22
FIBTG: 2.7
PROCNT: 1.83
 
soup
ENERC_KCAL: 412
FAT: 9.5
FIBTG: 3
PROCNT: 12
 
rice
ENERC_KCAL: 37
FAT: 0.4099999964237213
FIBTG: 0.4000000059604645
PROCNT: 0.4099999964237213
 
//
donut
ENERC_KCAL: 218
FAT: 9.239999771118164
FIBTG: 0.800000011920929
PROCNT: 1.6799999475479126
 
ice cream
ENERC_KCAL: 423
FAT: 22.08
PROCNT: 5.25
//no fiber
 
cookie
ENERC_KCAL: 364.4976068123309
FAT: 17.636980974790205
FIBTG: 1.1757987316526803
PROCNT: 4.703194926610721
 
cake
ENERC_KCAL: 145
FAT: 4.03
PROCNT: 4.53
//no fiber
 
pie
ENERC_KCAL: 207
FAT: 11
FIBTG: 0.7
PROCNT: 3.5
 
sno cone
ENERC_KCAL: 426
FAT: 22.9
FIBTG: 1.5
PROCNT: 5.2
*/




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

//tracy dynamic these to db please
var userWins = 0;
var computerWins = 0;
var globalTies = 0;
var globalPlays = 0;



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
function allA() {
    $('#foodA1Value').text("");
    $('#foodA2Value').text("");
    $('#foodA3Value').text("");
    imageSwap = [];
    teamA = [];
    teamA2 = [];
    teamA3 = [];
    teamA4 = [];

    while (teamA2.length < 3) {
        var z = Math.floor(Math.random() * 6);
        //image swap will replace w/ firebase
        var swap = foodObj1[z].imageSource;
        imageSwap.push(swap);

        //generates 1st stat, hp from KCal
        var statOne = foodObj1[z].KCal;

        teamA.push(statOne);
        globalHPA.push(statOne);

        //generates 2nd stat, atk from Protein
        var statTwo = foodObj1[z].Protein;
        teamA2.push(statTwo);
        globalAtkA.push(statTwo);

        //generates 3rd stat, def from fiber
        var statThree = foodObj1[z].Fiber;
        teamA3.push(statThree);
        globalDefA.push(statThree);

        //generates 3rd stat, def from fiber
        var statFour = foodObj1[z].Fat;
        teamA4.push(statFour);
        globalCriA.push(statFour);
    }

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

    while (teamB2.length < 3) {

        var z = Math.floor(Math.random() * 6);
        //image swap for random opponents
        var swap = foodObj1[z].imageSource;
        imageSwap.push(swap);

        //generates 1st stat, hp from KCal
        var statOne = foodObj1[z].KCal;
        teamB.push(statOne);
        // disable above 
        //teamB.push(foodObj1[z].KCal, foodObj2[z].KCal, foodObj3[z].KCal) 
        globalHPB.push(statOne);

        //generates 2nd stat, atk from Protein
        var statTwo = foodObj1[z].Protein;
        teamB2.push(statTwo);
        // disable above 
        //teamB.push(foodObj1[z].Protein, foodObj2[z].Protein, foodObj3[z].Protein)
        globalAtkB.push(statTwo);

        //generates 3rd stat, def from fiber
        var statThree = foodObj1[z].Fiber;
        teamB3.push(statThree);
        globalDefB.push(statThree);

        //generates 3rd stat, def from fiber
        var statFour = foodObj1[z].Fat;
        teamB4.push(statFour);
        globalCriB.push(statFour);

    }

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
    wcolor = weatherRandomizer.modColor();

    $('#stageEffects').text(weatherRandomizer.Card + ' / ' + weatherRandomizer.Stat + ' / ' + weatherRandomizer.Value + ' / ' + wcolor);
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

    console.log('card ' + i);
    console.log('stat ' + statName);

    console.log(globalHPA[i - 1]);

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



$(document).on('click', '#battle', function move() {
    allA();
    allB();
    wRandom();
    weatherToGlobal();
    if ((globalHPA.length >= 3) && (globalHPB.length >= 3) && (battleToggle == true)) {
        battleToggle = false;
        var hpScore = [];

        var elem = document.getElementById('lostA1');
        var width = 100 / (globalHPA[0] / (globalAtkB[0] - globalDefA[0]));
        var wide = 0;
        var id = setInterval(frame, 50);
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
        var idb = setInterval(frameb, 50);
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
        var id1 = setInterval(frame1, 50);
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
        var idb1 = setInterval(frameb1, 50);
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
        var id2 = setInterval(frame2, 50);
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
        var idb2 = setInterval(frameb2, 50);
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
                console.log('You Win!');
                userWins++;
                $('#aWin').text(userWins);

            }
            else if (bScore > aScore) {
                console.log('You Lose!');
                computerWins++;
                $('#bWin').text(computerWins);
            }
            else {
                console.log('Tie');
                globalTies++;
                $('#tie').text(globalTies);


            }
            battleToggle = true;
            globalPlays++;
            $('#play').text(globalPlays);
            console.log('play again?');

        }, 3500);


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

