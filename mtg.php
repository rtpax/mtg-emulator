<?php

function changelist(&$a,$_a,$_u,$_t)
{
    if($a[0] == $_u || $_t - $a[1])
    {
        for($i=2;$i<count($_a);$i++)
            $a[$i] = $_a[$i];
        for($i=count($_a);$i<count($a);$i++)
            unset($a[$i]);
    }
}

function readtostr($file)
{
    $ret = '';
    $tempfile = fopen($file,'r');
    if(flock($tempfile, LOCK_EX | LOCK_NB))
    {
        $ret = filesize($file) > 0 ? fread($tempfile,filesize($file)) : '';
        flock($tempfile, LOCK_UN);
    }
    else $_POST['type'] = 'fail';

    fclose($tempfile);
    return $ret;
}

function writestrs($filenames, $strs)
{
    $files = array();
    for($i=0;$i<count($filenames);$i++)
    {
        $files[$i] = fopen($filenames[$i],"r+");
        if(!flock($files[$i], LOCK_EX | LOCK_NB))$_POST['type']="fail";
    }
    if($_POST['type'] !== "fail")
    {
        for($i=0;$i<count($filenames);$i++)
        {
            ftruncate($files[$i],0);
            fwrite($files[$i],$strs[$i]);
        }
    }
    for($i=0;$i<count($filenames);$i++)
    {
        flock($files[$i], LOCK_UN);
        fclose($files[$i]);
    }
}

function setzone(&$zone, $haystack, $needles, $str)
{
    for($i=0;$i<count($needles);$i++)
    {
        $loc = array_search($needles[$i],$haystack);
        if($loc !== FALSE)
            $zone[$loc] = $str;
    }
}

//return data

if($_POST['type'] != "load")
{
    $log = '';




    $d1 = explode("\r\n",readtostr('./files/deck1.txt'));
    $d2 = explode("\r\n",readtostr('./files/deck2.txt'));
    $h1 = explode("\r\n",readtostr('./files/hand1.txt'));
    $h2 = explode("\r\n",readtostr('./files/hand2.txt'));
    $g1 = explode("\r\n",readtostr('./files/grave1.txt'));
    $g2 = explode("\r\n",readtostr('./files/grave2.txt'));
    $cl = explode("\r\n",readtostr('./files/cardlist.txt'));

    $pageid = array();
    $multiverseid = array();
    $zone = array();
    $xLoc = array();
    $yLoc = array();
    $zIndex = array();
    $flipped = array();
    $angle = array();
    $user = array();
    $timestamp = array();

    for($i=0;$i<count($cl);$i++)
    {
        $tempcard = explode(",",$cl[$i]);
        if(count($tempcard) != 10 || $tempcard[0] == "" || $tempcard[0] == "\r\n")
            continue;
        $pageid[$i] = $tempcard[0];
        $multiverseid[$i] = $tempcard[1];
        $zone[$i] = $tempcard[2];
        $xLoc[$i] = $tempcard[3];
        $yLoc[$i] = $tempcard[4];
        $flipped[$i] = $tempcard[5];
        $angle[$i] = $tempcard[6];
        $zIndex[$i] = $tempcard[7];
        $user[$i] = $tempcard[8];
        $timestamp[$i] = $tempcard[9];
    }



    $_d1 = array();
    $_d2 = array();
    $_h1 = array();
    $_h2 = array();
    $_g1 = array();
    $_g2 = array();
    $_cl = array();

    $_pageid = array();
    $_multiverseid = array();
    $_zone = array();
    $_xLoc = array();
    $_yLoc = array();
    $_flipped = array();
    $_angle = array();
    $_user = array();
    $_timestamp = 0;

    $fullpid = array();

    if($_POST['type'] == 'exchange')
    {
        $_pageid = $_POST['id'];
        $_multiverseid = $_POST['mid'];

        $_xLoc = $_POST['x'];
        $_yLoc = $_POST['y'];
        $_zIndex = $_POST['z'];

        $_flipped = $_POST['f'];
        $_angle = $_POST['a'];

        $_zone = $_POST['zone'];

        $_user = $_POST['user'];
        $_timestamp = $_SERVER['REQUEST_TIME'];


        $_d1 = $_POST['deck1'];
        $_d2 = $_POST['deck2'];
        $_h1 = $_POST['hand1'];
        $_h2 = $_POST['hand2'];
        $_g1 = $_POST['grave1'];
        $_g2 = $_POST['grave2'];

        changelist($d1,$_d1,$_user,$_timestamp);
        changelist($d2,$_d2,$_user,$_timestamp);
        changelist($h1,$_h1,$_user,$_timestamp);
        changelist($h2,$_h2,$_user,$_timestamp);
        changelist($g1,$_g1,$_user,$_timestamp);
        changelist($g2,$_g2,$_user,$_timestamp);

        $fi=count($pageid);
        for($i=0;$i<count($pageid);$i++)
            $fullpid[$i] = $pageid[$i];
        for($i=0;$i<count($_pageid);$i++)
        {
            if(array_search($_pageid[$i], $fullpid) === FALSE)
            {
                $fullpid[$fi] = $_pageid[$i];
                $fi++;
            }
        }

        for($i=0;$i<count($fullpid);$i++)
        {
            $_pi = array_search($fullpid[$i],$_pageid);
            $pi = array_search($fullpid[$i],$pageid);

            if($_pi !== FALSE && ($pi === FALSE || $_POST['user'] == $user[$pi] || $user[$pi] == 'none' || $user[$pi] == 'load' || $_SERVER['REQUEST_TIME'] - $timestamp[$pi] > 5))
            {
                $log .= "_pi=".$_pi . " pi=".$pi . " _user=".$_POST['user'] . " user=".$user[$pi] . " time_elapsed=".($_SERVER['REQUEST_TIME'] - $timestamp[$pi]);
                if($pi === FALSE || $multiverseid[$pi] != $_multiverseid[$_pi] || $xLoc[$pi] != $_xLoc[$_pi] || $yLoc[$pi] != $_yLoc[$_pi] || /*$zIndex[$pi] != $_zIndex[$_pi] ||*/ $flipped[$pi] != $_flipped[$_pi] || $angle[$pi] != $_angle[$_pi] || $zone[$pi] != $_zone[$_pi])
                {
                    $log .= " in";

                    if($pi === FALSE)$pi = count(pageid);

                    $pageid[$pi] = $fullpid[$i];//should aready be true unless it does not exist ($pi === FALSE)

                    $multiverseid[$pi] = $_multiverseid[$_pi];

                    $xLoc[$pi] = $_xLoc[$_pi];
                    $yLoc[$pi] = $_yLoc[$_pi];
                    $zIndex[$pi] = $_zIndex[$_pi];

                    $flipped[$pi] = $_flipped[$_pi];
                    $angle[$pi] = $_angle[$_pi];

                    $zone[$pi] = $_zone[$_pi];

                    $user[$pi] = $_POST['user'];

                    $log .= " ots[".$pageid[$pi]."]=".$timestamp[$pi];
                    $timestamp[$pi] = $_SERVER['REQUEST_TIME'];
                    $log .= " nts[".$pageid[$pi]."]=".$timestamp[$pi];

                }
                $log .= "\r\n";
            }
        }

        setzone($zone,$pageid,$pageid,"field");
        setzone($zone,$pageid,array_slice($d1,2), "deck1");
        setzone($zone,$pageid,array_slice($d2,2), "deck2");
        setzone($zone,$pageid,array_slice($h1,2), "hand1");
        setzone($zone,$pageid,array_slice($h2,2), "hand2");
        setzone($zone,$pageid,array_slice($g1,2), "grave1");
        setzone($zone,$pageid,array_slice($g2,2), "grave2");


        //pageid,multiverseid,zone,xLoc,yLoc,flipped,angle
        for($i=0;$i<count($_pageid);$i++)
        {
            //$log .= "pid=".$_pageid[$i] . " ts=".$timestamp[$pi] . "\r\n";
            $cl[$i] = ($pageid[$i] . "," . $multiverseid[$i] . "," . $zone[$i] . "," . $xLoc[$i] . "," . $yLoc[$i] . "," . $flipped[$i] . "," . $angle[$i] . "," . $zIndex[$i] . "," . $user[$i] . "," . $timestamp[$i]);
        }


        //writestr('./files/deck1.txt',implode($d1,"\r\n"));
        //writestr('./files/deck2.txt',implode($d2,"\r\n"));
        //writestr('./files/hand1.txt',implode($h1,"\r\n"));
        //writestr('./files/hand2.txt',implode($h2,"\r\n"));
        //writestr('./files/grave1.txt',implode($g1,"\r\n"));
        //writestr('./files/grave2.txt',implode($g2,"\r\n"));
        //writestr('./files/cardlist.txt',implode($cl,"\r\n"));

        writestrs([ './files/deck1.txt',
                    './files/deck2.txt',
                    './files/hand1.txt',
                    './files/hand2.txt',
                    './files/grave1.txt',
                    './files/grave2.txt',
                    './files/cardlist.txt'],
                [   implode($d1,"\r\n"),
                    implode($d2,"\r\n"),
                    implode($h1,"\r\n"),
                    implode($h2,"\r\n"),
                    implode($g1,"\r\n"),
                    implode($g2,"\r\n"),
                    implode($cl,"\r\n")]);

    }




    echo rawurlencode(implode($d1,"\r\n")) . "&" . rawurlencode(implode($d2,"\r\n")) . "&" . rawurlencode(implode($h1,"\r\n")) . "&" . rawurlencode(implode($h2,"\r\n")) . "&" . rawurlencode(implode($g1,"\r\n")) . "&" . rawurlencode(implode($g2,"\r\n")) . "&" . rawurlencode(implode($cl,"\r\n")) . "&" . rawurlencode($_POST["type"]) . "&" . rawurlencode("$log");

}
else//user == load
{
        $_pageid = $_POST['id'];
        $_multiverseid = $_POST['mid'];

        $_xLoc = $_POST['x'];
        $_yLoc = $_POST['y'];
        $_zIndex = $_POST['z'];

        $_flipped = $_POST['f'];
        $_angle = $_POST['a'];

        $_zone = $_POST['zone'];

        $_user = $_POST['user'];
        $_timestamp = $_SERVER['REQUEST_TIME'];


        $_d1 = $_POST['deck1'];
        $_d2 = $_POST['deck2'];
        $_h1 = $_POST['hand1'];
        $_h2 = $_POST['hand2'];
        $_g1 = $_POST['grave1'];
        $_g2 = $_POST['grave2'];

        for($i=0;$i<count($_pageid);$i++)
        {
            $_cl[$i] = ($_pageid[$i] . "," . $_multiverseid[$i] . "," . $_zone[$i] . "," . $_xLoc[$i] . "," . $_yLoc[$i] . "," . $_flipped[$i] . "," . $_angle[$i] . "," . $_zIndex[$i] . "," . $_POST['user'] . "," . $_SERVER['REQUEST_TIME']);
        }

        writestrs([ './files/deck1.txt',
                    './files/deck2.txt',
                    './files/hand1.txt',
                    './files/hand2.txt',
                    './files/grave1.txt',
                    './files/grave2.txt',
                    './files/cardlist.txt'],
                [   implode($_d1,"\r\n"),
                    implode($_d2,"\r\n"),
                    implode($_h1,"\r\n"),
                    implode($_h2,"\r\n"),
                    implode($_g1,"\r\n"),
                    implode($_g2,"\r\n"),
                    implode($_cl,"\r\n")]);

        echo $_POST["type"];

}

 ?>





