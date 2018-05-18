var xhr = new XMLHttpRequest();
var inited = false;

function _init()
{
    xhr.open("post","../mtg.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("type=init");
    inited = true;
}

function _exchange()
{
    xhr.open("post","../mtg.php", true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "type=exchange&user=u2&";
    for(var i=0;i<pageid.length;i++)
    {
        data+="id["+i+"]="+pageid[i]+"&z["+i+"]="+zIndex[pageid[i]]+"&x["+i+"]="+xLoc[pageid[i]]+"&y["+i+"]="+yLoc[pageid[i]]+"&mid["+i+"]="+multiverseid[pageid[i]]+"&zone["+i+"]="+zone[pageid[i]]+"&f["+i+"]="+flipped[pageid[i]]+"&a["+i+"]="+angle[pageid[i]]+"&";
    }

    if(hand1.length==0)data+="hand1[0]=&"
    for(var i=0;i<hand1.length;i++)
    {
        data+="hand1["+i+"]="+hand1[i]+"&";
    }
    if(hand2.length==0)data+="hand2[0]=&"
    for(var i=0;i<hand2.length;i++)
    {
        data+="hand2["+i+"]="+hand2[i]+"&";
    }
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
    if(grave1.length==0)data+="grave1[0]=&"
    for(var i=0;i<grave1.length;i++)
    {
        data+="grave1["+i+"]="+grave1[i]+"&";
    }
    if(grave2.length==0)data+="grave2[0]=&"
    for(var i=0;i<grave2.length;i++)
    {
        data+="grave2["+i+"]="+grave2[i]+"&";
    }

    xhr.send(data);
}

xhr.onreadystatechange = function(e)
{
    //cardlist.txt//pageid,multiverseid,zone,xLoc,yLoc,flipped,angle
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
    {
        //console.log(xhr.responseText);
        var rt = xhr.responseText.split('&');
        //d1&d2&h1&h2&cl
        for(var i=0;i<rt.length;i++)
        {

            rt[i]=decodeURIComponent(rt[i]);
            //console.log(rt[i]);
            if(rt[i] === 'fileerror')
                console.log('fileerror@'+i+': '+rt[i]);

        }

        if(newd1<=0)
        {
            deck1 = rt[0].split('\r\n');
            removeEmpty(deck1);
        }
        else newd1--;
        if(newd2<=0)
        {
            deck2 = rt[1].split('\r\n');
            removeEmpty(deck2);
        }
        else newd2--;
        if(newh1<=0)
        {
            hand1 = rt[2].split('\r\n');
            removeEmpty(hand1);
        }
        else newh1--;
        if(newh2<=0)
        {
            hand2 = rt[3].split('\r\n');
            removeEmpty(hand2);
        }
        else newh2--;
        if(newg1<=0)
        {
            grave1 = rt[4].split('\r\n');
            removeEmpty(grave1);
        }
        else newg1--;
        if(newg2<=0)
        {
            grave2 = rt[5].split('\r\n');
            removeEmpty(grave2);
        }
        else newg2--;


        cl = rt[6].split('\r\n');
        for(var i=0;i<cl.length;i++)
        {
            //[0]    [1]          [2]  [3]  [4]  [5]     [6]   [7]
            //pageid,multiverseid,zone,xLoc,yLoc,flipped,angle,zIndex
            cl[i] = cl[i].split(',');
            if(cl[i].length != 8){continue;}//in case of empty line/empty file

            /*var tchar;
            for(var char=0;char<cl[i][0].length;char++)
            {
                tchar = cl[i][0].charAt(char);
                if(tchar != 'c' && tchar != 'a' && tchar != 'r' && tchar != 'd');
                {
                    if(isNaN(parseInt(tchar)))
                        spliceStr(cl[i][0],char,1);
                }
            }*/
            if(pageid.indexOf(cl[i][0]) == -1)//card does not exist
            {
                createCard(cl[i][1], cl[i][0]);
            }

            if(newdata[cl[i][0]] <= 0)
            {
                visibility[cl[i][0]] = (cl[i][2] == 'deck1' || cl[i][2] == 'deck2' || cl[i][2] == 'grave1' || cl[i][2] == 'grave2')?'hidden':'visible';
                zone[cl[i][0]] = cl[i][2];
                if(newz<=0)
                    zIndex[cl[i][0]] = cl[i][7];
                xLoc[cl[i][0]] = parseFloat(cl[i][3]);
                yLoc[cl[i][0]] = parseFloat(cl[i][4]);
                flipped[cl[i][0]] = (cl[i][5] == 'true' || cl[i][5] == true);
                angle[cl[i][0]] = parseInt(cl[i][6]);
            }
            else
            {
                newdata[cl[i][0]]--;

            }

        }
        applyLoc();
        applyVisibility();
        applyFlip();
        applyAngle();

        refreshHand1();
        refreshHand2();
        //_exchange();
    }
}
