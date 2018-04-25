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

This is default xml in helloworld project:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>helloworld</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  <servlet>
    <description></description>
    <display-name>HelloWorldServlet</display-name>
    <servlet-name>HelloWorldServlet</servlet-name>
    <servlet-class>helloworld.HelloWorldServlet</servlet-class>
  </servlet>
  <servlet-mapping>
    <servlet-name>HelloWorldServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

hello world application does not work as well!!!

some other guy have the same issue: https://open.sap.com/courses/cp1-2/sections/98a8fddb-7a8f-4392-85b7-8db2d3ac4d8d/question/0d03d320-4252-4378-950c-e50560e71c51

From the Runtime dropdown box, select a specific runtime. If you leave the Automatic option, the server will load the target runtime of your application.

SAP Cloud Platform applications run on **a modular and lightweight application runtime container** where they can use the platform services APIs and Java EE APIs according to standard patterns.

Depending on the runtime type and corresponding SDK you are using, SAP Cloud Platform provides the following profiles of the application runtime container.
难道我SDK用的不对？6:51PM
Demo里老外用的tomcat 8，Java EE 6 Web Profile他说的不需要。
6:57PM 我的错误极有可能是runtime配置里的SDK和的download的tomcat 8的SDK不匹配造成。
