<?php

//return data
$c=0;



$deck1 = fopen('./files/deck1.txt','r');
for($c=0;$c<100 && !flock($deck1, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $d1 = filesize('./files/deck1.txt') > 0 ? fread($deck1,filesize('./files/deck1.txt')) : '';
else
    $d1 = 'fileerror';
fclose($deck1);
//////////////////////////////////////////
$deck2 = fopen('./files/deck2.txt','r');
for($c=0;$c<100 && !flock($deck2, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $d2 = filesize('./files/deck2.txt') > 0 ? fread($deck2,filesize('./files/deck2.txt')) : '';
else
    $d2 = 'fileerro';
fclose($deck2);
//////////////////////////////////////////
$hand1 = fopen('./files/hand1.txt','r');
for($c=0;$c<100 && !flock($hand1, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $h1 = filesize('./files/hand1.txt') > 0 ? fread($hand1,filesize('./files/hand1.txt')) : '';
else
    $h1 = 'fileerror';
fclose($hand1);
///////////////////////////////////////////
$hand2 = fopen('./files/hand2.txt','r');
for($c=0;$c<100 && !flock($hand2, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $h2 = filesize('./files/hand2.txt') > 0 ? fread($hand2,filesize('./files/hand2.txt')) : '';
else
    $h2 = 'fileerror';
fclose($hand2);
///////////////////////////////////////////
$grave1 = fopen('./files/grave1.txt','r');
for($c=0;$c<100 && !flock($grave1, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $g1 = filesize('./files/grave1.txt') > 0 ? fread($grave1,filesize('./files/grave1.txt')) : '';
else
    $g1 = 'fileerror';
fclose($grave1);
///////////////////////////////////////////
$grave2 = fopen('./files/grave2.txt','r');
for($c=0;$c<100 && !flock($grave2, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $g2 = filesize('./files/grave2.txt') > 0 ? fread($grave2,filesize('./files/grave2.txt')) : '';
else
    $g2 = 'fileerror';
fclose($grave2);
/////////////////////////////////////////////
$cardlist = fopen('./files/cardlist.txt','r');
for($c=0;$c<100 && !flock($cardlist, LOCK_EX | LOCK_NB);$c++)
    usleep(1000);
if($c<100)
    $cl = filesize('./files/cardlist.txt') > 0 ? fread($cardlist,filesize('./files/cardlist.txt')) : '';
else
    $cl = 'fileerror';
fclose($cardlist);


echo rawurlencode($d1) . "&" . rawurlencode($d2) . "&" . rawurlencode($h1) . "&" . rawurlencode($h2) . "&" . rawurlencode($g1) . "&" . rawurlencode($g2) . "&" . rawurlencode($cl) . "&";



if($_POST['type'] == 'exchange')
{

    $pageid = $_POST['id'];
    $multiverseid = $_POST['mid'];

    $xLoc = $_POST['x'];
    $yLoc = $_POST['y'];
    $zIndex = $_POST['z'];

    $flipped = $_POST['f'];
    $angle = $_POST['a'];

    $zone = $_POST['zone'];

    $d1 = $_POST['deck1'];
    $d2 = $_POST['deck2'];
    $h1 = $_POST['hand1'];
    $h2 = $_POST['hand2'];
    $g1 = $_POST['grave1'];
    $g2 = $_POST['grave2'];


    //accept data
    $deck1 = fopen('./files/deck1.txt','w');

    for($i=0;$i<count($d1);$i++)
    {
        fwrite($deck1,$d1[$i] . "\r\n");
    }
    fclose($deck1);
    //////////////////////////////////////////
    $deck2 = fopen('./files/deck2.txt','w');
    for($i=0;$i<count($d2);$i++)
    {
        fwrite($deck2,$d2[$i] . "\r\n");
    }
    fclose($deck2);
    //////////////////////////////////////////
    $hand1 = fopen('./files/hand1.txt','w');
    for($i=0;$i<count($h1);$i++)
    {
        fwrite($hand1,$h1[$i] . "\r\n");
    }
    fclose($hand1);
    ///////////////////////////////////////////
    $hand2 = fopen('./files/hand2.txt','w');
    for($i=0;$i<count($h2);$i++)
    {
        fwrite($hand2,$h2[$i] . "\r\n");
    }
    fclose($hand2);
    ///////////////////////////////////////////
    $grave1 = fopen('./files/grave1.txt','w');
    for($i=0;$i<count($g1);$i++)
    {
        fwrite($grave1,$g1[$i] . "\r\n");
    }
    fclose($grave1);
    ///////////////////////////////////////////
    $grave2 = fopen('./files/grave2.txt','w');
    for($i=0;$i<count($g2);$i++)
    {
        fwrite($grave2,$g2[$i] . "\r\n");
    }
    fclose($grave2);
    /////////////////////////////////////////////
    $cardlist = fopen('./files/cardlist.txt','w');
    //pageid,multiverseid,zone,xLoc,yLoc,flipped,angle
    for($i=0;$i<count($pageid);$i++)
    {
        fwrite($cardlist,$pageid[$i] . "," . $multiverseid[$i] . "," . $zone[$i] . "," . $xLoc[$i] . "," . $yLoc[$i] . "," . $flipped[$i] . "," . $angle[$i] . "," . $zIndex[$i] . "\r\n");
    }
    fclose($cardlist);











    //write based on input paremeters











}

 ?>
