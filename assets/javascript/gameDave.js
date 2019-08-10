
var globalHPA = [];
var globalAtkA = [];
var globalHPB = [];
var globalAtkB = [];
var fightRound = 0;
var finalA = [0, 0, 0, 0];
var finalB = [0, 0, 0, 0];
var aWins = 0;
var bWins = 0;
var ties = 0;
var isScoring = [true, true, true, true];
var start = true;

function start() {
    teamA = [];
    while (teamA.length < 4) {
        //generates 1st stat from 1-12
        var statOne = Math.ceil(Math.random() * 12);

        teamA.push(statOne);

    }
    $('#emeraldValue').text("??");
    $('#rubyValue').text("??");
    $('#diamondValue').text("??");
    $('#sapphireValue').text("??");
    //adds statOne attribute and displays on click 
    for (var i = 0; i < 4; i++) {
        var gemValue = $('img').eq(i).attr('hiddenv', teamA[i]);
        var displayGemValue = $('img').eq(i).attr('hiddenValue', true);

    }
}
function startTwo() {
    var teamB = [];
    while (teamB.length < 4) {
        //generates 1st stat from 1-12
        var statOne = Math.ceil(Math.random() * 12);

        teamB.push(statOne);

    }
    $('#emeraldValue2').text("??");
    $('#rubyValue2').text("??");
    $('#diamondValue2').text("??");
    $('#sapphireValue2').text("??");
    //adds statOne attribute and displays on click 
    for (var i = 0; i < 4; i++) {
        var gemValue = $('img').eq(4 + i).attr('hiddenv', teamB[i]);
        var displayGemValue = $('img').eq(4 + i).attr('hiddenValue', true);

    }
}
var displayValue;

var z = 0;
//emerald
$('#emerald').on('click', function () {
    var emeralds = $(this).attr("hiddenv");
    var emeraldUpdate = $('#emeraldValue').text(emeralds);
    $('#emeraldValue').show();
})
//ruby
$('#ruby').on('click', function () {
    var rubies = $(this).attr("hiddenv");
    var rubyUpdate = $('#rubyValue').text(rubies);
})
//diamond
$('#diamond').on('click', function () {
    var diamonds = $(this).attr("hiddenv");
    var diamondUpdate = $('#diamondValue').text(diamonds);
})
//sapphire
$('#sapphire').on('click', function () {
    var sapphires = $(this).attr("hiddenv");
    var sapphireUpdate = $('#sapphireValue').text(sapphires);
})

//emerald2
$('#emerald2').on('click', function () {
    var emeralds = $(this).attr("hiddenv");
    var emeraldUpdate = $('#emeraldValue2').text(emeralds);
    $('#emeraldValue2').show();
})
//ruby2
$('#ruby2').on('click', function () {
    var rubies = $(this).attr("hiddenv");
    var rubyUpdate = $('#rubyValue2').text(rubies);
})
//diamond2
$('#diamond2').on('click', function () {
    var diamonds = $(this).attr("hiddenv");
    var diamondUpdate = $('#diamondValue2').text(diamonds);
})
//sapphire2
$('#sapphire2').on('click', function () {
    var sapphires = $(this).attr("hiddenv");
    var sapphireUpdate = $('#sapphireValue2').text(sapphires);
})
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

function allA() {
    $('#emeraldValue').text("");
    $('#rubyValue').text("");
    $('#diamondValue').text("");
    $('#sapphireValue').text("");
    teamA = [];
    teamA2 = [];
    while (teamA2.length < 4) {
        //generates 1st stat, hp from 10-40
        var statOne = Math.ceil(Math.random() * 31 + 9);

        teamA.push(statOne);
        globalHPA.push(statOne);

        //generates 2nd stat, atk from 2-5
        var statTwo = Math.ceil(Math.random() * 4 + 1);
        teamA2.push(statTwo);
        globalAtkA.push(statTwo);
    }

    //adds 2 STATS attribute and displays on click 
    $('#emeraldValue').text(teamA2[0] + " / " + teamA[0]);
    $('#rubyValue').text(teamA2[1] + " / " + teamA[1]);
    $('#diamondValue').text(teamA2[2] + " / " + teamA[2]);
    $('#sapphireValue').text(teamA2[3] + " / " + teamA[3]);
}

function allB() {
    teamB = [];
    teamB2 = [];
    while (teamB2.length < 4) {
        //generates 1st stat, hp from 10-40
        var statOne = Math.ceil(Math.random() * 31 + 9);

        teamB.push(statOne);
        globalHPB.push(statOne);

        //generates 2nd stat, atk from 2-5
        var statTwo = Math.ceil(Math.random() * 4 + 1);
        teamB2.push(statTwo);
        globalAtkB.push(statTwo);
    }

    //adds 2 stats attribute and displays on click 
    $('#emeraldValue2').text(teamB2[0] + " / " + teamB[0]);
    $('#rubyValue2').text(teamB2[1] + " / " + teamB[1]);
    $('#diamondValue2').text(teamB2[2] + " / " + teamB[2]);
    $('#sapphireValue2').text(teamB2[3] + " / " + teamB[3]);

}




/*function for checking single stat comparison
$(document).on('click', function () {
    var compare = [];
    var aScore = 0;
    var bScore = 0;
    if ((globalTeamA.length >= 4) && (globalTeamB.length >= 4)) {
        for (var i = 0; i < 4; i++) {
            compare.push(globalTeamA[i] - globalTeamB[i])
        }
        $('#emeraldCompare').text(compare[0]);
        $('#rubyCompare').text(compare[1]);
        $('#diamondCompare').text(compare[2]);
        $('#sapphireCompare').text(compare[3]);


        for (var i = 0; i < 4; i++) {
            if (compare[i] > 0) {
                aScore++;
            } else if (compare[i] < 0) {
                bScore++;
            }
        }

        if (aScore > bScore) {
            aWins++;
            $('#aWin').text(aWins);
            console.log('Team A Won');

        } else if (bScore > aScore) {
            bWins++;
            $('#bWin').text(bWins);
            console.log('Team B Won');

        } else {
            ties++;
            $('#tie').text(ties);
            console.log('Tie');

        }

        globalTeamA = [];
        globalTeamB = [];
    }



})
*/
//When both fields have stats, hp appears at bottom 
/*$(document).on('click', function () {
    if ((globalTeamA.length >= 4) && (globalTeamB.length >= 4) && (start = true)) {
        $('#emeraldCompare').text(' (' + globalTeamA[0] + ')');
        $('#rubyCompare').text(' (' + globalTeamA[1] + ')');
        $('#diamondCompare').text(' (' + globalTeamA[2] + ')');
        $('#sapphireCompare').text(' (' + globalTeamA[3] + ')');

        $('#emeraldCompare2').text(' (' + globalTeamB[0] + ')');
        $('#rubyCompare2').text(' (' + globalTeamB[1] + ')');
        $('#diamondCompare2').text(' (' + globalTeamB[2] + ')');
        $('#sapphireCompare2').text(' (' + globalTeamB[3] + ')');
    }
});
*/ //giving me trouble atm
var aScore = 0;
var bScore = 0;
$(document).on('click', '#fightOnce', function () {
    if ((aScore + bScore + ties != 4) && (globalHPA.length >= 4) && (globalHPB.length >= 4)) {
        start = false;
        fightRound++;
        console.log('round ' + fightRound);


        if ((globalHPA.length >= 4) && (globalHPB.length >= 4)) {
            var compareA = [];
            var compareB = [];




            for (var i = 0; i < 4; i++) {

                if (isScoring[i] == true) {
                    compareA[i] = (globalHPA[i] - globalAtkB[i] * fightRound);
                    compareB[i] = (globalHPB[i] - globalAtkA[i] * fightRound);
                } else {
                    compareA[i] = finalA[i];
                    compareB[i] = finalB[i];
                }

                //tie
                if ((compareA[i] <= 0) && (compareB[i] <= 0) && (isScoring[i] == true)) {
                    ties++;

                    compareA[i] = 0;
                    compareB[i] = 0;
                    finalA[i] = compareA[i];
                    finalB[i] = compareB[i];
                    $('#tie').text(ties);
                    isScoring[i] = false;

                    //b win
                } else if ((compareA[i] <= 0) && (isScoring[i] == true)) {
                    bScore++
                    compareA[i] = 0;
                    finalA[i] = compareA[i];
                    finalB[i] = compareB[i];
                    $('#bWin').text(bScore);
                    isScoring[i] = false;

                    //a win
                } else if ((compareB[i] <= 0) && (isScoring[i] == true)) {
                    aScore++
                    compareB[i] = 0;
                    finalA[i] = compareA[i];
                    finalB[i] = compareB[i];
                    $('#aWin').text(aScore);
                    isScoring[i] = false;

                }
            }

        }
        console.log('compareA: ' + compareA);
        console.log('compareB: ' + compareB);

        $('#emeraldCompare').text(Math.ceil(compareA[0] / globalHPA[0] * 100) + '%' + ' (' + globalHPA[0] + ')');
        $('#rubyCompare').text(Math.ceil(compareA[1] / globalHPA[1] * 100) + '%' + ' (' + globalHPA[1] + ')');
        $('#diamondCompare').text(Math.ceil(compareA[2] / globalHPA[2] * 100) + '%' + ' (' + globalHPA[2] + ')');
        $('#sapphireCompare').text(Math.ceil(compareA[3] / globalHPA[3] * 100) + '%' + ' (' + globalHPA[3] + ')');

        $('#emeraldCompare2').text(Math.ceil(compareB[0] / globalHPB[0] * 100) + '%' + ' (' + globalHPB[0] + ')');
        $('#rubyCompare2').text(Math.ceil(compareB[1] / globalHPB[1] * 100) + '%' + ' (' + globalHPB[1] + ')');
        $('#diamondCompare2').text(Math.ceil(compareB[2] / globalHPB[2] * 100) + '%' + ' (' + globalHPB[2] + ')');
        $('#sapphireCompare2').text(Math.ceil(compareB[3] / globalHPB[3] * 100) + '%' + ' (' + globalHPB[3] + ')');


        if (aScore + bScore + ties == 4) {
            if (aScore > bScore) {
                console.log('a wins');
            } else if (bScore > aScore) {
                console.log('b wins');
            } else {
                console.log('tie');
            }
            reset();
        }


    }
})






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
    isScoring = [true, true, true, true];
    start = true;
    $('#aWin').text(aScore);
    $('#bWin').text(bScore);
    $('#tie').text(ties);
}
    //globalTeamA = [];
    //globalTeamB = [];




