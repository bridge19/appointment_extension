# 2017-05-28

github url: https://github.com/i042416/appointment_extension.git

# 2018-04-25

3:51PM Java build path->default output folder should be: WebContent\WEB-INF\classes

wdf proxy can download artifacts in Maven remote repository, however hangs when trying to run application in SCP!!!!

SCN discussion: https://archive.sap.com/discussions/thread/3578829

hanatrial.ondemand.com - can be accessed in SAP internet!

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

!ENTRY org.eclipse.core.net 1 0 2018-04-25 16:58:11.857
!MESSAGE System property http.proxyHost has been set to proxy.hkg.sap.corp by an external source. This value will be overwritten using the values from the preferences

# Eclipse proxy

Specifies the settings profile to be used when opening connections. Choosing the Direct provider causes all the connections to be opened without the use of a proxy server. Selecting Manual causes settings defined in Eclipse to be used. On some platforms there is also a Native provider available, selecting this one causes settings that were discovered in the OS to be used.

2018-04-25 5:31PM install a new version of Eclipse and works under SAP internet network. 

2018-04-25 6:01PM deployed to SCP successfully, however 404 error when testing in SCP.

Create a new dummy servlet project and check whether it works - 6:24PM

Servlet could be created via wizard