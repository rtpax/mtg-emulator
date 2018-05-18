
<?php
/*
var pageid=[];
idcounter = 0;//TODO: set value with php script from file, load every time it updates
//all lower arrays indexed by pageid rather than standard indices
//if loop needed, for(...)zIndex[pageid[n]];
//pageid = ['card1','card2','card3',...,'cardn']; (not necessarily in order or hitting every number
var multiverseid=[];
var xLoc=[];//in % of width to preserve across different browser sizes (prevent drift by never converting back except to drag)
var yLoc=[];//----^
var angle=[];//0 - 90 - 180 - 270 (flipped 180 across u1/u2)
var faceUp=[];//boolean true or false;
var zIndex=[];
var counterTexts=[];//array of arrays, last in line when formatted to allow variable length
var zone=[];//zone is a string containing "graveyard", "hand", "battlefield", or "undefined"
            //note that exiled is intentionally not included as it's unnecessary -- just "battlefield"
            //note deck is note defined, only a member in a list
var middrag=[];//corallory - inaccessable
var remove=[];  //signal to other page to remove the specified card. When it's removed on the other page, it can be removed here
                //if recieved, remove immediately
//NOTE: all numerical values are NOT string representations above

*/


    $u1 = fopen("u1.txt", "w");
    $u2 = fopen("u2.txt", "w");

    fwrite($myfile, $_POST['deck1']);
    fwrite($myfile, $_POST['deck2']);
    fclose($myfile);
?>
