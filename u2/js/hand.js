


var hand2=[];
var hand1=[];







function showHand2()
{
    document.getElementById('hand2').style.visibility = 'visible';
    for(var i=0;i<hand2.length;i++)
    {
        show(hand2[i]);
    }
    applyVisibility();
}

function showHand1(e)
{
    document.getElementById('hand1').style.visibility = 'visible';
    for(var i=0;i<hand1.length;i++)
    {
        show(hand1[i]);
    }
    applyVisibility();
}

function hideHand2(e)
{
    if(e.clientX > get("hand2").offsetWidth-215 || e.clientY < get("hand2").offsetTop)
    {
        document.getElementById('hand2').style.visibility = 'hidden';
        refreshHand2();
        for(var i=0;i<hand2.length;i++)
        {
            hide(hand2[i]);
        }
        applyVisibility();
    }
}

function hideHand1(e)
{
    if(e.clientX > get("hand1").offsetWidth-215 || e.clientY > get("hand1").offsetHeight)
    {
        document.getElementById('hand1').style.visibility = 'hidden';
        refreshHand1();
        for(var i=0;i<hand1.length;i++)
        {
            hide(hand1[i]);
        }
        applyVisibility();
    }
}

function attachHand2(id)
{
    newh1=true;
    newdata[id]=true;
    zone[id]='hand2';
    hand2[hand2.length]=id;
    card = get(id);
    move(id,5,window.innerHeight - 5);
    bringToTop(id);
    refreshHand2();
}

function attachHand1(id)
{
    newh1=true;
    newdata[id]=true;
    zone[id]='hand1';
    hand1[hand1.length]=id;
    card = get(id);
    move(id,5,5);
    bringToTop(id);
    refreshHand1();
}

function detachHand2(id)
{
    newh2=3;
    zone[id]='field';
    hand2.splice(hand2.indexOf(id),1);
    show(id);
    applyOneVisibility(id);
}

function detachHand1(id)
{
    newh1=3;
    zone[id]='field';
    hand1.splice(hand1.indexOf(id),1);
    show(id);
    applyOneVisibility(id);
}

function refreshHand2()
{
    var card;
    var div = get("hand2");


    for(var i=hand2.length-1;i>=0;i--)
    {
        if(hand2.indexOf(hand2[i])!=i)
        {
            hand2.splice(hand2.indexOf(hand2[i]),1);
            continue;
        }
    }

    var spacing = min((window.innerWidth - 215 - 100 - 5)/(hand2.length - 1), 110);
    for(var i=0;i<hand2.length;i++)
    {
        card = get(hand2[i]);
        if(yPos(card.id) < div.offsetTop || (xPos(card.id) + card.offsetWidth) > (window.innerWidth-215))
        {
            detachHand2(hand2[i]);
            i--;
            continue;
        }

        zIndex[card.id]=i + 1000;
        visibility[card.id]=div.style.visibility;
        move(card.id, 5 + spacing*i, window.innerHeight - 5 - card.offsetHeight);
        //card.style.top = window.innerHeight - 5 - card.offsetHeight;
        //card.style.left = 5 + (window.innerWidth - 215 - 100 - 5)/(hand2.length - 1)*i;
    }

    applyZIndex();
    applyVisibility();
    applyLoc();
}

function refreshHand1()
{
    var card;
    var div = get("hand1");


    for(var i=hand1.length-1;i>=0;i--)
    {
        if(hand1.indexOf(hand1[i])!=i)
        {
            hand1.splice(hand1.indexOf(hand1[i]),1);
            continue;
        }
    }

    var spacing = min((window.innerWidth - 215 - 100 - 5)/(hand1.length - 1), 110);
    for(var i=0;i<hand1.length;i++)
    {
        card = get(hand1[i]);
        if(yPos(card.id) + card.offsetHeight > (div.offsetHeight + div.offsetTop) || (xPos(card.id) + card.offsetWidth) > window.innerWidth-215)
        {
            detachHand1(hand1[i]);
            i--;
            continue;
        }

        zIndex[card.id]=1000+i;
        visibility[card.id]=div.style.visibility;

        move(card.id,5 + spacing*i,5)
        //card.style.top = 5;
        //card.style.left = 5 + (window.innerWidth - 215 - 100 - 5)/(hand2.length - 1)*i;

    }
    applyZIndex();
    applyVisibility();
    applyLoc();
}

function drawCard2()
{
    if(deck2.length==0)
    {
        get('deck2').style.backgroundImage = '';
    }
    else
    {
        get('deck2').style.backgroundImage = 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card")';
        attachHand2(deck2[0]);
        deck2 = deck2.slice(1,deck2.length);
        if(deck2.length==0)
            get('deck2').style.backgroundImage = '';
    }
}

function drawCard1()
{
    if(deck1.length==0)
    {
        get('deck1').style.backgroundImage = '';
    }
    else
    {
        get('deck1').style.backgroundImage = 'url("http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=0&type=card")';
        attachHand1(deck1[0]);
        deck1 = deck1.slice(1,deck1.length);
        if(deck1.length==0)
            get('deck1').style.backgroundImage = '';
    }

}

function min(a,b)
{
    return (a>b)?(b):(a);
}

function max(a,b)
{
    return (a>b)?(a):(b);
}
