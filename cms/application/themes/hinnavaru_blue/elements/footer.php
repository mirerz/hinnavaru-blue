<?php defined('C5_EXECUTE') or die("Access Denied."); ?>
    <footer>
        <div class="container">
            <div class="footer-content">
                <?php
                $a = new Area('Footer Contact');
                $a->display($c);
                ?>
                <p>&copy; <?php echo date('Y'); ?> Hinnavaru Blue Initiative. 🌊 Locally-led marine conservation.</p>
            </div>
        </div>
    </footer>

</div>
<?php View::element('footer_required'); ?>
</body>
</html>
