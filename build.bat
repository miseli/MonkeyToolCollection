@REM @Author: Cube
@REM @Date:   2020-05-07 23:30:05
@REM @Last Modified by:   Cube
@REM Modified time: 2020-05-08 13:05:21



set NODE_OPTIONS=--openssl-legacy-provider
@cmd /k "@npm run build & exit"
@pause&exit