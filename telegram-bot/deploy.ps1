# deploy.ps1

Write-Host "Checking for .env.yaml..."
if (-Not (Test-Path ".env.yaml")) {
    Write-Host "❌ .env.yaml not found. Please create it and add your TELEGRAM_BOT_TOKEN, GITHUB_PAT, and GOOGLE_SERVICE_ACCOUNT_JSON." -ForegroundColor Red
    exit 1
}

# Read content of .env.yaml to ensure it's not the default
$content = Get-Content ".env.yaml" -Raw
if ($content -match "your_bot_token") {
    Write-Host "❌ It looks like .env.yaml still has the placeholder text. Please replace it with your actual tokens." -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to Google Cloud Run..." -ForegroundColor Cyan

gcloud run deploy hinnavaru-telegram-bot `
    --source . `
    --project adhu-492602 `
    --region us-central1 `
    --allow-unauthenticated `
    --env-vars-file .env.yaml

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    
    $url = gcloud run services describe hinnavaru-telegram-bot --project adhu-492602 --region us-central1 --format="value(status.url)"
    Write-Host "Cloud Run URL: $url" -ForegroundColor Yellow

    Write-Host ""
    Write-Host "Now registering webhook with Telegram..." -ForegroundColor Cyan
    $tokenMatch = $content -match 'TELEGRAM_BOT_TOKEN:\s*"([^"]+)"'
    if ($tokenMatch) {
        $token = $matches[1]
        node set-webhook.js "$url/webhook" "$token"
    } else {
        Write-Host "Could not find TELEGRAM_BOT_TOKEN in .env.yaml to register webhook." -ForegroundColor Red
    }
    
    Write-Host "All done! Your bot should now be live and responding to messages." -ForegroundColor Green
} else {
    Write-Host "❌ Deployment failed." -ForegroundColor Red
}
