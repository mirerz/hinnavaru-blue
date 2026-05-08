<?php

return [
    'email' => [
        'method' => 'smtp',
        'smtp' => [
            'server' => 'smtp.gmail.com',
            'port' => '587',
            'encryption' => 'tls',
            'username' => 'hinnavarublue@gmail.com',
            'password' => 'YOUR_GOOGLE_APP_PASSWORD', // Replace with Google App Password
        ],
        'default' => [
            'address' => 'hinnavarublue@gmail.com',
            'name' => 'Hinnavaru Blue Initiative',
        ],
    ],
];
