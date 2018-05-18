
var deck2=[];
var deck1=[];

function shuffle(deck)
{
    var ret=[];
    var index;
    for(var i=0;deck.length>0;i++)
    {
        index = getRandomInt(0,deck.length);
        ret[i]=deck[index];
        deck.splice(index,1);
    }
    return ret;
}


function attachDeck2(id)
{
    if(get(id) == null)return;
    newd2=3;
    deck2 = [id].concat(deck2);
    get('deck2').style.backgroundImage = 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card")';
    hide(id);
    applyOneVisibility(id);
    zone[id]='deck2';
    flipped[id]=false;
}

function attachDeck1(id)
{
    if(get(id) == null)return;
    newd1=3;
    deck1 = [id].concat(deck1);
    get('deck1').style.backgroundImage = 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card")';
    hide(id);
    applyOneVisibility(id);
    zone[id]='deck1';
    flipped[id]=false;
}

function removeDeck2(id)
{
    deck2.splice(deck2.indexOf(id),1);
}

function removeDeck1(id)
{
    deck1.splice(deck1.indexOf(id),1);
}

function deckClick1(e)
{
    if(e.target == get("deck2"))
        drawCard2();
}

function deckClick2(e)
{
    if(e.target == get("deck1"))
        drawCard1();
}

function openDeck2Interface()
{
    closeAllInterface();
    get("deck2Interface").style.visibility = 'visible';
}

function openDeck1Interface()
{
    closeAllInterface();
    get("deck1Interface").style.visibility = 'visible';
}

function openSearchDeck2Interface()
{
    closeAllInterface();
    get("searchDeck2Interface").style.visibility = 'visible';
    d2window = get("d2window");
    for(var i=0;i<deck2.length;i++)
    {
        d2window.innerHTML += '<img style="position:static;background-image:url(\'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[deck2[i]]+'&type=card\');transform:rotate(0deg);" class="card" onclick="removeDeck2(\''+deck2[i]+'\');attachHand2(\''+deck2[i]+'\');this.parentNode.removeChild(this)" onmouseover="setBigImg(this)"></img>';
    }
}

function openSearchDeck1Interface()
{
    closeAllInterface();
    get("searchDeck1Interface").style.visibility = 'visible';
    d1window = get("d1window");
    for(var i=0;i<deck1.length;i++)
    {
        d1window.innerHTML += '<img style="position:static;background-image:url(\'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+multiverseid[deck1[i]]+'&type=card\');transform:rotate(0deg);" class="card" onclick="removeDeck1(\''+deck1[i]+'\');attachHand1(\''+deck1[i]+'\');this.parentNode.removeChild(this)" onmouseover="setBigImg(this)"></img>';
    }
}

function closeDeck2Interface()
{
    get("deck2Interface").style.visibility = 'hidden';
}

function closeDeck1Interface()
{
    get("deck1Interface").style.visibility = 'hidden';
}

function closeSearchDeck2Interface()
{
    get("searchDeck2Interface").style.visibility = 'hidden';
    get("d2window").innerHTML = '';
}

function closeSearchDeck1Interface()
{
    get("searchDeck1Interface").style.visibility = 'hidden';
    get("d1window").innerHTML = '';
}
