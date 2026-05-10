<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
<!DOCTYPE html>
<html lang="<?php echo Localization::activeLanguage()?>">
<head>
    <?php View::element('header_required'); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Montserrat:wght@700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $view->getThemePath(); ?>/css/typography.css">
    <link rel="stylesheet" href="<?php echo $view->getThemePath(); ?>/css/main.css">
</head>
<body class="ccm-page">

<div class="<?php echo $c->getPageWrapperClass()?>">
    <header>
        <div class="container">
            <h1>Hinnavaru Blue <span>Initiative</span></h1>
            <?php
            $a = new Area('Header Navigation');
            $a->display($c);
            ?>
        </div>
    </header>
