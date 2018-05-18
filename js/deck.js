
var deck1=['card1','card2','card3','card4','card5','card6','card7','card8','card9','card10','card11','card12','card13','card14','card15','card16','card17','card18','card19','card20','card21','card22'];
var deck2=[];

function shuffle(deck)
{
    var ret=[];
    var index;
    for(var i=0;deck.length>0;i++)
    {
        index = Math.getRandomInt(0,deck.length);
        ret[i]=deck[index];
        deck.splice(index,1);
    }
    return ret;
}


function attachDeck1(id)
{
    if(get(id) == null)return;
    deck1 = [id].concat(deck1);
    hide(id);
    applyOneVisibility(id);
    zone[id]='deck1';
}

function attachDeck2(id)
{
    if(get(id) == null)return;
    deck2 = [id].concat(deck2);
    hide(id);
    applyOneVisibility(id);
    zone[id]='deck2';
}
