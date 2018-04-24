function App(){

    // Main Element Start
    this.header = function(){
        return document.getElementById("app-header");
    };

    this.body = function(){
        return document.getElementById("app-body");
    };
    // Main Element Stop

    // Mail Linked Start
    this.checkRequest = function(){
        let xmlhttp;
        if(window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        else
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        return xmlhttp;
    };

    this.include = function(objectBind){
        let xmlhttp = this.checkRequest();
        xmlhttp.open("GET", objectBind.url, false);
        xmlhttp.onreadystatechange = function(){
            let script = xmlhttp.response || xmlhttp.responseText;
            if(xmlhttp.readyState == 4){
                if(xmlhttp.status == 200)
                    eval.apply(window, [script]);
                else
                    console.log("ERROR : Cannot load script");
            }
        }
        xmlhttp.send(null);
    }

    
    // Mail Linked Start

}