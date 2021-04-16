sap.ui.define(["sap/ui/core/mvc/Controller"],
 function(Controller) {
    "use strict";
    return Controller.extend("BurhanRehber.BaseController", {
      
        getRouter: function() {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },
        getModel: function(sName) {
            return this.getView().getModel(sName);
        },
        setModel: function(oModel, sName) {
            return this.getView().setModel(oModel, sName);
        },
        getResourceBundle: function(value) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle(value);
        },
        getI18nText: function(value) {
            return this.getView().getModel("i18n").getResourceBundle().getText(value);
        },
        onShareEmailPress: function() {
            var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
            sap.m.URLHelper.triggerEmail(null, oViewModel.getProperty("/shareSendEmailSubject"), oViewModel.getProperty("/shareSendEmailMessage"));
        },
        
      
    });
});
