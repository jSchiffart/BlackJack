// pcm 20172018a Blackjack oop

// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){


    game = new BlackJack();

    dealer_new_card();
    dealer_new_card();
    player_new_card()
    player_new_card();
    let cards=game.get_dealer_cards();
    cards[1] = "X";



    document.getElementById("dealer").innerHTML = cards;
    document.getElementById("resultado").innerHTML = "";

    document.getElementById("player").innerHTML = game.get_player_cards();


    buttons_initialization();
    debug(game);

    update_player();


}



function update_dealer(state){


    document.getElementById("dealer").innerHTML = game.get_dealer_cards();

    let dealer_cards_value=game.get_cards_value(game.get_dealer_cards());
    let player_cards_value=game.get_cards_value(game.get_player_cards());

    if (state.gameEnded) {
        if (dealer_cards_value > player_cards_value && dealer_cards_value <= 21) {
            document.getElementById("resultado").innerHTML = "DEALER WON WITH " + dealer_cards_value + " POINTS";
            finalize_buttons();
        }
        else if(player_cards_value == 21){
            document.getElementById("resultado").innerHTML = "YOU WON WITH " + player_cards_value + " POINTS";
            finalize_buttons();
        }
        else {
            document.getElementById("resultado").innerHTML = "DEALER BUSTED WITH " + dealer_cards_value + " POINTS";
            finalize_buttons();
        }

    }
}

function update_player(state){


    let dealer_cards_value=game.get_cards_value(game.get_dealer_cards());
    let player_cards_value=game.get_cards_value(game.get_player_cards());



    if (player_cards_value == 21) {
        document.getElementById("resultado").innerHTML = "YOU WON WITH " + player_cards_value + " POINTS";
        finalize_buttons();
    }

    document.getElementById("player").innerHTML = game.get_player_cards();

    if (state.gameEnded) {
        if (dealer_cards_value < player_cards_value && player_cards_value <= 21) {
            document.getElementById("resultado").innerHTML = "YOU WON WITH " + player_cards_value + " POINTS";
            finalize_buttons();
        }
        else {
            document.getElementById("resultado").innerHTML = "YOU  BUSTED WITH " + player_cards_value + " POINTS";
            finalize_buttons();
        }
    }
}

function dealer_new_card(){
    game.dealer_move();
    update_dealer(game.get_game_state());
    return game.get_game_state();
}

function player_new_card(){
    game.player_move();
    update_player(game.get_game_state());
    return game.get_game_state();

}

function dealer_finish() {

    game.setDealerTurn(true);

    while (!game.state.gameEnded) {
        game.state=game.get_game_state();
        update_dealer(game.state);
        if (!game.state.gameEnded){
            game.state=dealer_new_card();
        }
    }
    if (game.state.gameEnded && game.get_cards_value(game.get_player_cards()) == 21) {
        document.getElementById("resultado").innerHTML = "YOU WON WITH 21 POINTS";
        finalize_buttons();
        update_dealer(game.state);
    }
}
