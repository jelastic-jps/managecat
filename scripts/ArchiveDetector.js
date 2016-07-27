import com.hivext.api.environment.Environment;

var APPID = hivext.local.getParam("TARGET_APPID"),
    SESSION = hivext.local.getParam("session"),
    oUrlsMap,
    oEnv;

oUrlsMap = {
    "default" : "https://download.jelastic.com/public.php?service=files&t=5ca7aaf6b5ba91a663c155a4cbdc2745&download",
    "tomcat6" : "https://download.jelastic.com/public.php?service=files&t=31425f8c427225a1391f79c378f9376b&download",
    "tomcat7" : "https://download.jelastic.com/public.php?service=files&t=5ca7aaf6b5ba91a663c155a4cbdc2745&download",
    "tomcat8" : "https://download.jelastic.com/public.php?service=files&t=209c20c1464029f0c2df7e2ac0f81e4f&download",
    "tomee" : "https://download.jelastic.com/public.php?service=files&t=5ca7aaf6b5ba91a663c155a4cbdc2745&download",
};

oEnv = hivext.local.exp.wrapRequest(new Environment(APPID, SESSION));

return oEnv.deployApp({
    fileUrl : oUrlsMap["${nodes.cp.nodeType}"] || oUrlsMap["default"],
    fileName : "console.war",
    context : "console"
});