var xhr = new XMLHttpRequest();

var pageid=[];
var multiverseid=[];
var zone=[];
var angle=[];

var deck1=[];
var deck2=[];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function removeEmpty(arr)
{
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i] == '')
        {
            arr.splice(i,1);
            i--;
        }
    }
    return arr;
}

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

function parseDecks()
{




    var d1 = removeEmpty(document.getElementById('deck1').value.split('\n'));
    var d2 = removeEmpty(document.getElementById('deck2').value.split('\n'));

    for(var i=0;i<d1.length;i++)
    {
        pageid[i]="card"+(i+1);
        multiverseid[pageid[i]]=d1[i];
        zone[pageid[i]]='deck1';
        angle[pageid[i]]='0';
        deck1[i] = pageid[i];
        console.log("deck1"+pageid[i]);
    }
    for(var i=0;i<d2.length;i++)
    {
        pageid[i+d1.length]="card"+(i+d1.length+1);
        multiverseid[pageid[i+d1.length]]=d2[i];
        zone[pageid[i+d1.length]]='deck2';
        angle[pageid[i+d1.length]]='180';
        console.log("deck2"+pageid[i+d1.length]);
        deck2[i] = pageid[i+d1.length];
    }

}

function loadDecks()
{
    pageid=[];
    multiverseid=[];
    zone=[];
    angle=[];

    deck1=[];
    deck2=[];


    parseDecks();
    deck1 = shuffle(deck1);
    deck2 = shuffle(deck2);

    xhr.open("post","./mtg.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "type=exchange&";
    for(var i=0;i<pageid.length;i++)
    {
        data+="id["+i+"]="+pageid[i]+"&z["+i+"]=0&x["+i+"]=0&y["+i+"]=0&mid["+i+"]="+multiverseid[pageid[i]]+"&zone["+i+"]="+zone[pageid[i]]+"&f["+i+"]=false&a["+i+"]="+angle[pageid[i]]+"&";
    }

    data+="hand1[0]=&"
    data+="hand2[0]=&"
    if(deck1.length==0)data+="deck1[0]=&"
    for(var i=0;i<deck1.length;i++)
    {
        data+="deck1["+i+"]="+deck1[i]+"&";
    }
    if(deck2.length==0)data+="deck2[0]=&"
    for(var i=0;i<deck2.length;i++)
    {
        data+="deck2["+i+"]="+deck2[i]+"&";
    }
    data+="grave1[0]=&"
    data+="grave2[0]=&"

    console.log(data);
    xhr.send(data);
}
