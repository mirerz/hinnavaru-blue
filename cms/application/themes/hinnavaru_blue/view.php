<?php
defined('C5_EXECUTE') or die("Access Denied.");
$this->inc('elements/header.php');
?>

<main>
    <div class="container">
        <?php
        echo $innerContent;
        ?>
    </div>
</main>

<?php
$this->inc('elements/footer.php');
?>
