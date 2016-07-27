#!/bin/bash

WGET=$(which wget) || { echo "wget not found"; exit 1; };
SERIAL="$1";

CATALINA_HEADER="Y29tLm1hbmFnZWNhdC5jb25zb2xlLmFnZW50LnNlcnZlcm5hbWU9U0VSVkVSTkFNRVBBVFRFUk4KI2hvc3RuYW1lIG9mIHRoZSBhZ2VudApjb20ubWFuYWdlY2F0LmNvbnNvbGUuYWdlbnQuaG9zdG5hbWU9U0VSVkVSTkFNRVBBVFRFUk4KI3BvcnQgb2YgdGhlIGFnZW50CmNvbS5tYW5hZ2VjYXQuY29uc29sZS5hZ2VudC5wb3J0PTgwCiNNYW5hZ2VDYXQgY29udHJvbGxlciBVUkwgYWRkcmVzcywgbXVzdCBiZSBlbmQgd2l0aCAvLgpjb20ubWFuYWdlY2F0LmNvbnRyb2xsZXIudXJsPWh0dHBzOi8vc2Fhcy5tYW5hZ2VjYXQuY29tLwojTWFuYWdlQ2F0IGNvbGxlY3RvciBVUkwgYWRkcmVzcywgbXVzdCBiZSBlbmQgd2l0aCAvLgpjb20ubWFuYWdlY2F0LmNvbGxlY3Rvci51cmw9aHR0cHM6Ly9jb2xsZWN0b3IubWFuYWdlY2F0LmNvbS8KI2dyb3VwIG5hbWUgb2YgdGhlIGFnZW50LCBhbnkgdXNlciBmcmllbmRseSBuYW1lCmNvbS5tYW5hZ2VjYXQuY29uc29sZS5hZ2VudC5ncm91cG5hbWU9ZGVmYXVsdAojYWdlbnQgY29udGV4dCBuYW1lCmNvbS5tYW5hZ2VjYXQuY29uc29sZS5hZ2VudC5jb250ZXh0bmFtZT1jb25zb2xlCiNpZiB5b3UgdXNlIFNhYVMsIHRoaXMgaXMgdGhlIGFjY291bnQga2V5Lgpjb20ubWFuYWdlY2F0LmNvbnNvbGUuYWdlbnQuYWNjb3VudGtleT1TRVJJQUwK"

[ -f  "/opt/tomcat/conf/catalina.properties" ] && CATALINA_PROP="/opt/tomcat/conf/catalina.properties";
[ -f  "/opt/tomcat8/conf/catalina.properties" ] && CATALINA_PROP="/opt/tomcat8/conf/catalina.properties";

grep -q managecat  $CATALINA_PROP || echo "$CATALINA_HEADER" | base64 -d >> $CATALINA_PROP;

sed -i "s@SERIAL@$SERIAL@g" "$CATALINA_PROP";



