@REM @Author: Cube
@REM @Date:   2020-05-07 23:30:05
@REM @Last Modified by:   Cube
@REM Modified time: 2020-05-08 13:05:04



@echo off
:loop
cmd /c "@npm run watch"
pause
goto :loop