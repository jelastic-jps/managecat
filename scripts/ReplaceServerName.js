import com.hivext.api.environment.Environment;
import com.hivext.api.environment.File;

var NODE_MISSION_COMPUTE = "cp",
    PROCEDURE_PROCESS_NODE = "replace",
    APPID = hivext.local.getParam("TARGET_APPID"),
    SESSION = hivext.local.getParam("session"),
    aComputeNodes = [],
    aActions = [],
    item,
    lastCoNode,
    envInfoResponse,
    catalinaPath,
    nodeTypeT,
    isEventNode;

env = hivext.local.exp.wrapRequest(new Environment(APPID, SESSION));
envInfoResponse = env.getEnvInfo();
str  = env.getEnvInfo();
if (!envInfoResponse.isOK()) {
    return envInfoResponse;
}

var nodes = envInfoResponse.getNodes();
var iterator = nodes.iterator();

while(iterator.hasNext()) {
    var softNode = iterator.next();
    var softNodeProperties = softNode.getProperties();

    if (NODE_MISSION_COMPUTE.equals(softNodeProperties.getNodeMission())) {
        aComputeNodes.push(softNode);
        nodeTypeT = softNodeProperties.getNodeType();
    }
}

lastCoNode = aComputeNodes[aComputeNodes.length -1].id;

if ( nodeTypeT == "tomcat7" ||  nodeTypeT == "tomcat6" || nodeTypeT == "tomee" ) {
   catalinaPath = "/opt/tomcat/conf/catalina.properties";
}

if ( nodeTypeT == "tomcat8" ) {
    //catalinaPath = "/opt/tomcat8/conf/catalina.properties";
    catalinaPath = "/opt/tomcat/conf/catalina.properties";
}

for (var i = 0, n = aComputeNodes.length; i < n; i += 1) {
  aActions.push({
      procedure : PROCEDURE_PROCESS_NODE,
      params : {
        nodeid : aComputeNodes[i].getId(),
        path : catalinaPath,
        pattern : "SERVERNAMEPATTERN",
        replacement : String(aComputeNodes[i].getUrl()).replace(new RegExp("https?:\\/\\/(.*?)\\/?"), "$1")
      }
  });
}
  
return {
    result: 0,
    onAfterReturn : {
        call : aActions
    }
};