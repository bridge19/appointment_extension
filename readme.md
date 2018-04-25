# 2017-05-28

github url: https://github.com/i042416/appointment_extension.git

# 2018-04-25

3:51PM Java build path->default output folder should be: WebContent\WEB-INF\classes

wdf proxy can download artifacts in Maven remote repository, however hangs when trying to run application in SCP!!!!

SCN discussion: https://archive.sap.com/discussions/thread/3578829

hanatrial.ondemand.com 

check information in workspace log under .metadata folder:
!MESSAGE System property https.proxyHost is set to proxy but should be proxy.hkg.salesforce.corp.

new error: System property https.proxyHost is not set but should be proxy.hkg.sap.corp.

-Dorg.eclipse.ecf.provider.filetransfer.excludeContributors=org.eclipse.ecf.provider.filetransfer.httpclient
-Dhttp.proxyPort=8080
-Dhttp.proxyHost=XXX
-Dhttp.proxyUser=XXX
-Dhttp.proxyPassword=XXX
-Dhttp.nonProxyHosts=localhost|127.0.0.1

# Eclipse start log

!SESSION 2018-04-25 16:57:56.904 -----------------------------------------------
eclipse.buildId=4.6.3.M20170301-0400
java.version=1.8.0_161
java.vendor=Oracle Corporation
BootLoader constants: OS=win32, ARCH=x86_64, WS=win32, NL=en_US
Framework arguments:  -product org.eclipse.epp.package.jee.product
Command-line arguments:  -os win32 -ws win32 -arch x86_64 -product org.eclipse.epp.package.jee.product -clean
