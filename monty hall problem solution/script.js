/************************************\
|   Code Created by Mario Tijerino   |
|   November 1st, 2018               |
|   For Project #2                   |
|   Math 1030                        |
\************************************/

// Parameters:

const numOfDoors = 3;



var Door = function(hasPrize){
    this.hasPrize = hasPrize;
}

function Simulate(forceSwitch){
    var results = {};

    var prizeDoor;
    var goatDoor1;
    var goatDoor2;

    // Set up doors
    prizeDoor = Math.floor(Math.random()*numOfDoors);
    switch(prizeDoor){
        case 0:
            goatDoor1 = 1;
            goatDoor2 = 2;
        break;

        case 1:
            goatDoor1 = 0;
            goatDoor2 = 2;
        break;

        case 2:
            goatDoor1 = 0;
            goatDoor2 = 1;
        break;
    }

    var doorPicked = pick()
    results.switched = switchDoors(forceSwitch);

    // if bot picked the prize door...
    if(doorPicked == prizeDoor){
        results.PickedPrizeFirst = true;
        if(results.switched){
            // it gets a goat
            results.win = false;
        }
        else{
            // it gets the prize
            results.win = true;
        }
    }
    // if the bot picked a goat door...
    else{
        results.PickedPrizeFirst = false;
        if(results.switched){
            // it gets the prize
            results.win = true;
        }else{
            // it gets a goat
            results.win = false;
        }
    }
    return results;
}

function pick(){
    return Math.floor(Math.random()*numOfDoors);
}
function switchDoors(forceSwitch){
    if(forceSwitch == 0){
        if(Math.floor(Math.random()*2)){
            return true;
        }else{
            return false;
        }
    }
    else if(forceSwitch == 1){
        return true;
    }
    else if(forceSwitch == 2){
        return false;
    }
}

function runSimulations(numOfSims, halfSwitch){
    var results;
    var finalresults = {};
    finalresults.rawResults = [];

    finalresults.totalSims = numOfSims;
    finalresults.totalSwitched = 0;
    finalresults.totalNoSwitched = 0;
    finalresults.totalWins = 0;

    finalresults.switchWins = 0;
    finalresults.switchLosses = 0;
    finalresults.noSwitchWins = 0;
    finalresults.noSwitchLosses = 0;

    finalresults.percents = {};

    for(var i = 0; i < numOfSims; i++){
        if(halfSwitch){
            if(i < numOfSims/2){
                results = Simulate(1);
            }else{
                results = Simulate(2);
            }
        }else{
            results = Simulate(0);
        }
        finalresults.rawResults[i] = results;
        if(results.switched){
            finalresults.totalSwitched++;

            if(results.win){
                finalresults.totalWins++;

                finalresults.switchWins++;
            }
            else{
                finalresults.switchLosses++;
            }
        }
        else{
            finalresults.totalNoSwitched++;
            if(results.win){
                finalresults.totalWins++;
                finalresults.noSwitchWins++;
            }
            else{
                finalresults.noSwitchLosses++;
            }
        }
        
    }
    percents = finalresults.percents;

    percents.won = finalresults.totalWins / finalresults.totalSims;
    percents.lost = 1 - percents.won;

    percents.switch = finalresults.totalSwitched / finalresults.totalSims;
    percents.noSwitch = 1 - percents.switch;

    percents.switchWon = finalresults.switchWins / finalresults.totalSwitched;
    percents.switchLost = finalresults.switchLosses / finalresults.totalSwitched;
    percents.noSwitchWon = finalresults.noSwitchWins / finalresults.totalNoSwitched;
    percents.noSwitchLost = finalresults.noSwitchLosses / finalresults.totalNoSwitched;

    return finalresults;
}
console.log(runSimulations(40));