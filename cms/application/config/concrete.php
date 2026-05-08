<?php

return [
    'security' => [
        'session' => [
            'cookie' => [
                'cookie_secure' => true,
                'cookie_httponly' => true,
            ],
        ],
    ],
    'seo' => [
        'url_rewriting' => true,
    ],
    'ssl' => [
        'hsts' => [
            'enabled' => true,
            'max_age' => 31536000,
            'include_subdomains' => true,
            'preload' => true,
        ],
    ],
];
