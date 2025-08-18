@echo off
echo Committing current changes...
git add -A
git commit -m "Dashboard fixes and improvements before merge"

echo Merging Gerson branch into Vincent...
git merge gerson

echo Merge completed!
pause