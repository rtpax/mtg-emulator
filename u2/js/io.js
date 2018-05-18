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
    if(pageid.length == 0)data = "type=init&"
    for(var i=0;i<pageid.length;i++)
    {
        data+="id["+i+"]="+pageid[i]+"&z["+i+"]="+zIndex[pageid[i]]+"&x["+i+"]="+xLoc[pageid[i]]+"&y["+i+"]="+(1 - (yLoc[pageid[i]]+140/window.innerHeight))+"&mid["+i+"]="+multiverseid[pageid[i]]+"&zone["+i+"]="+zone[pageid[i]]+"&f["+i+"]="+flipped[pageid[i]]+"&a["+i+"]="+angle[pageid[i]]+"&";
    }

    data+="hand1[0]=&hand1[1]=&"
    for(var i=0;i<hand1.length;i++)
    {
        data+="hand1["+(i+2)+"]="+hand1[i]+"&";
    }
    data+="hand2[0]=&hand2[1]=&"
    for(var i=0;i<hand2.length;i++)
    {
        data+="hand2["+(i+2)+"]="+hand2[i]+"&";
    }
    data+="deck1[0]=&deck1[1]=&"
    for(var i=0;i<deck1.length;i++)
    {
        data+="deck1["+(i+2)+"]="+deck1[i]+"&";
    }
    data+="deck2[0]=&deck2[1]=&"
    for(var i=0;i<deck2.length;i++)
    {
        data+="deck2["+(i+2)+"]="+deck2[i]+"&";
    }
    data+="grave1[0]=&grave1[1]=&"
    for(var i=0;i<grave1.length;i++)
    {
        data+="grave1["+(i+2)+"]="+grave1[i]+"&";
    }
    data+="grave2[0]=&grave2[1]=&"
    for(var i=0;i<grave2.length;i++)
    {
        data+="grave2["+(i+2)+"]="+grave2[i]+"&";
    }

    xhr.send(data);
}

xhr.onreadystatechange = function(e)
{
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
    {
        //console.log(xhr.responseText);
        var rt = xhr.responseText.split('&');
        //d1&d2&h1&h2&cl
        //console.log("----------");
        //for(var i=0;i<rt.length;i++)
        //    console.log(rt[i]);

        for(var i=0;i<rt.length;i++)
        {
            rt[i]=decodeURIComponent(rt[i]);
            //console.log(rt[i]);
        }

        console.log(rt[8]);

        var type = rt[7];

        if(type != "fail")
        {

            if(rt[0][0] == 'u1' || type == 'init'){
                deck1 = rt[0].split('\r\n').slice(2);
                removeEmpty(deck1);
            }
            if(rt[1][0] == 'u1' || type == 'init'){
                deck2 = rt[1].split('\r\n').slice(2);
                removeEmpty(deck2);
            }
            if(rt[2][0] == 'u1' || type == 'init'){
                hand1 = rt[2].split('\r\n').slice(2);
                removeEmpty(hand1);
            }
            if(rt[3][0] == 'u1' || type == 'init'){
                hand2 = rt[3].split('\r\n').slice(2);
                removeEmpty(hand2);
            }
            if(rt[4][0] == 'u1' || type == 'init'){
                grave1 = rt[4].split('\r\n').slice(2);
                removeEmpty(grave1);
            }
            if(rt[5][0] == 'u1' || type == 'init'){
                grave2 = rt[5].split('\r\n').slice(2);
                removeEmpty(grave2);
            }

            cl = rt[6].split('\r\n');

            for(var i=0;i<cl.length;i++)
            {
                //[0]    [1]          [2]  [3]  [4]  [5]     [6]   [7]    [8] [9]
                //pageid,multiverseid,zone,xLoc,yLoc,flipped,angle,zIndex,user,timestamp

                cl[i] = cl[i].split(',');
                if(cl[i].length != 10){continue;}//in case of empty line/empty file

                if(pageid.indexOf(cl[i][0]) == -1)//card does not exist
                {
                    createCard(cl[i][1], cl[i][0]);
                }

                if(cl[i][8] == 'u1' || type == 'init')
                {
                    visibility[cl[i][0]] = (cl[i][2] == 'field')?'visible':'hidden';
                    zone[cl[i][0]] = cl[i][2];
                    //zIndex[cl[i][0]] = cl[i][7];
                    xLoc[cl[i][0]] = parseFloat(cl[i][3]);
                    yLoc[cl[i][0]] = 1 - (parseFloat(cl[i][4])+140/window.innerHeight);
                    flipped[cl[i][0]] = (cl[i][5] == 'true' || cl[i][5] == true);
                    angle[cl[i][0]] = parseInt(cl[i][6]);
                    lock[cl[i][0]] = true;
                }
                else
                    lock[cl[i][0]] = false;
            }
            applyLoc();
            applyVisibility();
            applyFlip();
            applyAngle();

            refreshHand1();
            refreshHand2();
            //console.log(zone);
        }
        setTimeout(_exchange,100);
    }
}
