function App(){

    let route;

    // Main Element Start
    this.header = () => { return document.getElementById("app-header") };

    this.body = () => { return document.getElementById("app-body") };
    // Main Element Stop

    // Main Directory Start
    this.appDirectory = () => { return "./app/" };

    this.coreDirectory = () => { return "./core/" };

    this.publicDirectory = () => { return "./public/" };

    this.checkExistFile = path => {
        let xmlhttp = this.checkRequest()
        try{
            xmlhttp.open("HEAD", path, false)
            xmlhttp.send()
        }
        catch(e){}
        finally{
            if(xmlhttp.status == 200) return true
            else return false
        }
    }
    // Main Directory Stop

    // Main Linked Start
    this.checkRequest = () => {
        let xmlhttp;
        if(window.XMLHttpRequest) xmlhttp = new XMLHttpRequest()
        else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
        return xmlhttp
    };

    this.include = async url => {
        let xmlhttp = this.checkRequest()
        xmlhttp.open("GET", url, false)
        xmlhttp.onreadystatechange = () => {
            let script = xmlhttp.response || xmlhttp.responseText
            if(xmlhttp.readyState == 4){
                if(xmlhttp.status == 200) eval.apply(window, [script])
                else console.log("ERROR : Cannot load script")
            }
        }
        xmlhttp.send(null)
    };

    this.server = async (req, res) => {
        let xmlhttp = this.checkRequest()
        if(req.meth == "GET" || req.meth == "get"){
            xmlhttp.open("GET", req.url + "?" + req.data)
            xmlhttp.send()
        }
        else{
            xmlhttp.open("POST", req.url)
            xmlhttp.send(req.data)
        }
        xmlhttp.onload = () => {
            if(xmlhttp.readyState == 4 && xmlhttp.status == 200) res(xmlhttp.responseText)
            else res(null)
        }
    };
    // Main Linked Start

    // Main Thread Start
    this.importList = () => {
        this.include(this.coreDirectory() + "appRoute.js")
        route = new AppRoute()
    };

    this.route = () => { return route };

    this.execute = () => {
        this.importList()
        let routeAddress = this.appDirectory() + this.route().getController() + "/" + this.route().getView() + ".js"
        if(this.checkExistFile(routeAddress)) this.include(routeAddress)
        else this.include(this.appDirectory() + "404.js")
    };
    // Main Thread Stop

}