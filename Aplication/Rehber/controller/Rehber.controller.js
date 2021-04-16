sap.ui.define([
    'sap/ui/core/message/ControlMessageProcessor',
    'sap/ui/core/message/Message',
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/library',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessagePopover',
    'sap/m/MessagePopoverItem',
    'sap/m/MessageToast'
], function(ControlMessageProcessor, Message, Controller, coreLibrary, JSONModel, MessagePopover, MessagePopoverItem, MessageToast) {
"use strict";

var MessageType = coreLibrary.MessageType;
var PageController = Controller.extend("BurhanRehber.Aplication.Rehber.controller.Rehber", {

    onInit: function () {
        this.getView().setModel(oModel);
        this.clear();
        oModel.setProperty("/personellist" ,[])
    },
    // listeye bilgileri aktarma
    add:function(){ 
        // personel modelinden verileri getirir ekrandaki bilgileri alıp listeye eklemek için kullanılır
        var item = oModel.getProperty("/personel");
        // ad, soyad, telefon göre kontrol yapar boşsa hata verir
        if (item.ad && item.soyad && item.telno){
            var items =  oModel.getProperty("/personellist")
            //  güncelleme yaparken tel personellistteki telnolara bakılır tel no ya göre diğer veriler getirilir
            if(this.update){
                items.forEach(x => {
                    if(x.telno == item.telno){
                        x.ad = item.ad ;
                        x.soyad = item.soyad ;
                        x.mail = item.mail ;
                        x.telno = item.telno ;
                        x.foto = item.foto ;
                    }
                });
                MessageToast.show("Güncellendi");
            }else{
                var x =  items.find(function(x){return x.telno == item.telno})
                if(x && x.telno) {
                    MessageToast.show("Telefon numarası zaten var");
                    return             
                }else if(item.mail && !this.validateEmail(item.mail)){
                    MessageToast.show("Mail Hatalı");
                    return
                }
                else {
                    items.push(item)
                    MessageToast.show("Kaydedildi");
                }
            }
            oModel.setProperty("/personellist" ,items)
            this.clear();
            this.update = false
        }
        else {
            MessageToast.show("Gerekli Alanları Doldur");
        }
        this.getView().byId("deleteBtn").setVisible(false)
        if (this.getView().byId("add").getText("") == "Düzenle") {
            this.getView().byId("add").setText("Ekle");
        }
    },
     validateEmail:function(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    clear:function(){
        oModel.setProperty("/personel", {
            ad:"",
            soyad:"",
            mail:"",
            telno:"",
            foto:"",
        })
    },
    itemselect:function(oEvent){
        this.update = true
        oModel.setProperty("/personel", oModel.getProperty(oEvent.getSource().getBindingContextPath()))
        this.getView().byId("ShortProductList").removeSelections();
        this.getView().byId("deleteBtn").setVisible(true)
        this.getView().byId("add").setText("Düzenle");
        
    },
    addPerson:function(){
        this.update = false
        this.clear();
        this.getView().byId("deleteBtn").setVisible(false)
    },
    getItem:function(oEvent){
        this.update = true
        oModel.setProperty("/personel", oModel.getProperty(oEvent.getParameter("listItem").getBindingContext().sPath))

    },
});
return PageController;
});