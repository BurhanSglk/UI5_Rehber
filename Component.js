sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
    "use strict";
    var Component = UIComponent.extend("BurhanRehber.Component", {
        metadata: {
            rootView: "BurhanRehber.Aplication.App.view.App",
            routing: {
                config: {
                    routerClass: "sap.m.routing.Router",
                    viewPath: "BurhanRehber.view",
                    controlId: "rootControl",
                    controlAggregation: "pages",
                    viewType: "XML",
                    clearTarget: true
                },
                routes: [
                //     {
                //     name: "Login",
                //     viewPath: "BurhanRehber.Aplication.Login.view",
                //     pattern: "Login",
                //     view: "Login",
                //     viewLevel: 0,
                //     transition: "show"
                // }, 
                {
                    name: "Rehber",
                    viewPath: "BurhanRehber.Aplication.Rehber.view",
                    pattern: "",
                    view: "Rehber",
                    viewLevel: 1,
                    transition: "show",
                }
            ]
            }
        },
        init: function() {
        
            var _this = this;
            UIComponent.prototype.init.apply(this, arguments);
    
              _this.getRouter().initialize();
           
            
        },

    });
    return Component;
}, /* bExport= */ true);
