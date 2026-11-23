@echo off
cd /d "%~dp0"
start "" http://127.0.0.1:8080/index.html
py -3 -m http.server 8080 --bind 127.0.0.1
pause
