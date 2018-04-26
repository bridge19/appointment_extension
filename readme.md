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

SAP help for [Application runtime container](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7613bd28711e1014839a8273b0e91070.html)

**Java Web runtime** is deprecated. Support is discontinued since 31th December 2017. We recommend using **Java Web Tomcat 8**. For more information, see Java Web (Migrating to Java Web Tomcat section).

now could not even publish application to SCP!! Nullpointer exception!! 7:14PM

proxy setting provided by one Chinese colleague: https://answers.sap.com/questions/259118/cannot-deploy-java-application-to-neo-canary-lands.html

error log:

```java
java.lang.NullPointerException
	at com.sap.core.tools.eclipse.server.cloud.util.RuntimeUtil.computeBestRuntimeToUse(RuntimeUtil.java:199)
	at com.sap.core.tools.eclipse.server.cloud.util.CloudPublishUtil.shouldExecuteRepublishAndRestartOperation(CloudPublishUtil.java:648)
	at com.sap.core.tools.eclipse.server.cloud.util.CloudPublishUtil.shouldExecuteRepublishAndRestartOperation(CloudPublishUtil.java:603)
	at com.sap.core.tools.eclipse.server.cloud.publish.CloudPublishOperation.getOperationKind(CloudPublishOperation.java:155)
```

7:34PM hello world project工作了。

8:15PM:  The deployment for the first time will not start application automatically, the second time did the trick!

# 2018-04-26

 * 2018-04-26 10:19AM now test in SAP corporate
 * SDK I am using: C:\MyApp\neon\neo-java-web-sdk-3.51.14
 
 still go to neo environment to find webIDE service
 
 cf-eu10: Cloud foundry trial

 CF-OrgQuotaTotalRoutesExceeded(310006): You have exceeded the total routes for your organization's quota - 2:23PM

我在CF上有两个sub account，和这个有关？？2：26PM
2:39PM 真的是这样，issue resolved.

### SAP Cloud Platform Cloud Foundry CLI Plugins

The SAP Cloud Platform Cloud Foundry Plugins are used to extend the Cloud Foundry CLI with additional commands. 

* MTA Plugin - Perform operations on multi-target applications (MTAs) such as deploying, removing, viewing, etc - cf-cli-mta-plugin-2.0.3-windows-x86_64.exe

* Service Fabrik based B&R - Perform backup and restore operations on service-instances 

cf install-plugin cf-cli-mta-plugin-2.0.3-windows-x86_64.exe - 3:34PM

panic: runtime error: index out of range

goroutine 1 [running]:
github.wdf.sap.corp/xs2ds/cf-mta-plugin/vendor/github.com/cloudfoundry/cli/plugin.Start(0xbd9b00, 0xc8e180)
        /data/xmake/prod-build10010/w/xs2ds/xs2ds-cf-mta-plugin-OD-linuxx86_64/gen/go-workspace/go-path/src/github.wdf.sap.corp/xs2ds/cf-mta-plugin/vendor/github.com/cloudfoundry/cli/plugin/plugin_shim.go:16 +0x3c4
main.main()
        /data/xmake/prod-build10010/w/xs2ds/xs2ds-cf-mta-plugin-OD-linuxx86_64/gen/go-workspace/go-path/src/github.wdf.sap.corp/xs2ds/cf-mta-plugin/mta_plugin.go:65 +0x4e

3:42PM where is MTA.jar? MTA Archive Builder

[Building multi-target applications (MTA) for Cloud Foundry using your favorite IDE](https://blogs.sap.com/2018/02/05/building-multi-target-applications-mta-for-cloud-foundry-using-your-favorite-ide/)

MTA is an SAP construct that allows you to combine modules into a single deployable unit for lifecycle maintenance. These modules could potentially use different runtimes (one on Node.js, one on Python, etc.). For more information on MTAs for the Cloud Foundry environment, please click [here](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/d04fc0e2ad894545aebfd7126384307c.html).

SAP has developed and published an MTA plugin for Cloud Foundry CLI. This MTA plugin allows you to perform lifecycle operations like deployment and un-deployment on multi-target applications. The MTA plugin can be downloaded from SAP cloud platform tools page (search for MTA Plugin and pick your platform):

https://tools.hana.ondemand.com/#cloud

# Multi-target Application Archive Builder

Jerry: See [SAP help](https://help.sap.com/viewer/58746c584026430a890170ac4d87d03b/Cloud/en-US/ba7dd5a47b7a4858a652d15f9673c28d.html)

The multi-target application (MTA) archive builder is a command-line tool that packages an MTA into a deployable archive (MTAR).

The MTA archive builder is a standalone command-line tool that builds a deployment-ready MTAR (.mtar file) from the artifacts of an MTA project according to the project’s MTA development descriptor (mta.yaml file).

[How to install the .jar file](https://help.sap.com/viewer/58746c584026430a890170ac4d87d03b/Cloud/en-US/9f778dba93934a80a51166da3ec64a05.html)

MTABUILDER110_0-80002501.JAR

npm install -g grunt-cli, This will put the grunt command in your system path, allowing it to be run from any directory.

https://gruntjs.com/getting-started

# How the CLI works

Each time grunt is run, it looks for a locally installed Grunt using node's require() system. Because of this, you can run grunt from any subfolder in your project.
If a locally installed Grunt is found, the CLI loads the local installation of the Grunt library, applies the configuration from your Gruntfile, and executes any tasks you've requested for it to run. To really understand what is happening, read the code.

java -jar mta.jar --build-target=CF --mtar=jerry.mtar build under folder mta1

5:05PM build error - C:\Users\i042416\AppData\Roaming\npm-cache\_logs\2018-04-26T09_00_33_125Z-debug.log

no useful log:  npm ERR! May not delete: c:\temp\mta1\frontend\node_modules\.bin

5:12PM 是因为这个plugin没有装？Service Fabrik based B&R

cf install-plugin service-fabrik-cli-plugin-1.0.3-windows-x86_64.exe

5:22PM - 我npm version：5.3.0