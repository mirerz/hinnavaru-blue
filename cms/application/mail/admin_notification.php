<?php
defined('C5_EXECUTE') or die("Access Denied.");

$subject = "[URGENT] New Mission Inquiry - Hinnavaru Blue Platform";
$body = "
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; color: #333; }
        .header { background: #0077be; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { font-size: 12px; color: #777; padding: 20px; border-top: 1px solid #eee; }
        .btn { display: inline-block; padding: 10px 20px; background: #0077be; color: #fff; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>Hinnavaru Blue Initiative</h1>
    </div>
    <div class='content'>
        <p>Hello Admin / Founder,</p>
        <p>A new inquiry has been submitted via the mission platform. Details below:</p>
        <hr>
        <ul>";

foreach ($submittedData as $field) {
    $body .= "<li><strong>" . h($field->label) . ":</strong> " . h($field->value) . "</li>";
}

$body .= "
        </ul>
        <hr>
        <p><a href='" . URL::to('/dashboard') . "' class='btn'>View in Dashboard</a></p>
    </div>
    <div class='footer'>
        <p>This is an automated alert from the Hinnavaru Blue CMS.</p>
    </div>
</body>
</html>
";
