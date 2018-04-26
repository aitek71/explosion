function AppRoute(){

    // Main Route Start
    this.getQueryAddress = function(){
        return location.search.substr(1);
    };

    this.checkQueryAddress = function(){
        if(this.getQueryAddress() != null || this.getQueryAddress() != "")
            true;
        else
            false;
    };

    this.getController = function(){
        let queryAddress = "default";
        if(this.checkQueryAddress())
            queryAddress = this.getQueryAddress().split('=')[0];
        return queryAddress;
    };

    this.getView = function(){
        let queryAddress = "index";
        if(this.checkQueryAddress())
            queryAddress = this.getQueryAddress().split('=')[1];
        return queryAddress;
    };
    // Main Route Stop

}