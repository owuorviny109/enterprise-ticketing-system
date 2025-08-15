# PowerShell script to merge Gerson into Vincent
Write-Host "Starting merge process..." -ForegroundColor Green

# Step 1: Add all changes
Write-Host "Adding all changes..." -ForegroundColor Yellow
git add -A

# Step 2: Commit current changes
Write-Host "Committing current dashboard fixes..." -ForegroundColor Yellow
git commit -m "Dashboard fixes and improvements before merge"

# Step 3: Merge Gerson branch
Write-Host "Merging Gerson branch into Vincent..." -ForegroundColor Yellow
git merge gerson

# Check if merge was successful
$mergeStatus = $LASTEXITCODE
if ($mergeStatus -eq 0) {
    Write-Host "Merge completed successfully!" -ForegroundColor Green
} else {
    Write-Host "Merge conflicts detected. Please resolve conflicts manually." -ForegroundColor Red
    Write-Host "After resolving conflicts, run: git add -A && git commit" -ForegroundColor Yellow
}

Write-Host "Merge process completed." -ForegroundColor Green