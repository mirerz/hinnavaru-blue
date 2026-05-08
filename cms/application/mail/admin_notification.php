<?php
defined('C5_EXECUTE') or die("Access Denied.");

$subject = "[URGENT] New Mission Inquiry - Hinnavaru Blue Platform";

/**
 * HTML Body
 */
?>
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #020b18; }
        .header { background: #020b18; color: #0dd3c5; padding: 20px; text-align: center; }
        .content { padding: 30px; border: 1px solid #e1e1e1; }
        .label { font-weight: bold; color: #020b18; }
        .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>HINNAVARU BLUE INITIATIVE</h1>
    </div>
    <div class="content">
        <h2>Hello Admin / Founder,</h2>
        <p>A new visitor has submitted an inquiry through the <strong>Hinnavaru Blue</strong> platform.</p>
        <hr>
        <p><span class="label">Date:</span> <?php echo date('Y-m-d H:i:s'); ?></p>
        <p><span class="label">Project Interest:</span> <?php echo $formName; ?></p>
        <div style="background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #0dd3c5;">
            <?php foreach ($questionAnswerPairs as $pair): ?>
                <p><span class="label"><?php echo $pair->getQuestion(); ?>:</span><br>
                <?php echo nl2br($pair->getAnswer()); ?></p>
            <?php endforeach; ?>
        </div>
        <hr>
        <p>You can manage this submission and all archival records in the Concrete CMS Dashboard:</p>
        <p><a href="https://hinnavarublueinitiative.org/index.php/dashboard/reports/forms" style="display: inline-block; padding: 10px 20px; background: #0dd3c5; color: #020b18; text-decoration: none; border-radius: 5px; font-weight: bold;">OPEN DASHBOARD</a></p>
    </div>
    <div class="footer">
        <p>&copy; <?php echo date('Y'); ?> Hinnavaru Blue Initiative. All Rights Reserved.</p>
    </div>
</body>
</html>
