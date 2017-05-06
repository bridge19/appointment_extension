
//Jerry
jQuery.sap.registerModulePath("cus.crm.mycalendar",'/sap/bc/ui5_ui5/sap/crm_mycal');
jQuery.sap.declare("cus.crm.mycalendar.CRM_MYCALExtension.Component");
//Jerry
jQuery.sap.require("cus.crm.mycalendar.Component");
jQuery.sap.require("cus.crm.mycalendar.CRM_MYCALExtension.util.Util");
jQuery.sap.require("cus.crm.mycalendar.CRM_MYCALExtension.util.Common");
jQuery.sap.require("cus.crm.mycalendar.CRM_MYCALExtension.util.OverwriteMethods");

//use the load function for getting the optimized preload file if present
/* Jerry comment out
sap.ui.component.load({
	name: "cus.crm.mycalendar",

	// Use the below URL to run the extended application when SAP-delivered application located in a local cloud environment:
	url: jQuery.sap.getModulePath("cus.crm.mycalendar.CRM_MYCALExtension") + "/../CRM_MYCAL"
	// Use the below url to run the extended application when SAP-delivered application located in a cloud environment:
	//url: jQuery.sap.getModulePath("cus.crm.mycalendar.CRM_MYCALExtension") + "/../orion/file/p165548trial$P165548-OrionContent/CRM_MYCAL"
	//url: jQuery.sap.getModulePath("cus.crm.mycalendar.CRM_MYCALExtension") + "/../orion/file/a49f0d223$S0001513322-OrionContent/CRM_MYCAL"

	// we use a URL relatve to our own component
	// extension application is deployed with customer namespace
});*/

this.cus.crm.mycalendar.Component.extend("cus.crm.mycalendar.CRM_MYCALExtension.Component", {
	// init: function() {
 //   	$(document).ready(function() {
	// 		$('head').append( '<meta name="format-detection" content="date=no">' );
	// 		$('head').append( '<meta name="format-detection" content="telephone=no">' );
	// 		$('head').append( '<meta name="format-detection" content="address=no">' );
 //   	});
	// },
	metadata: {
		version: "1.0",

		config: {
    "sap.ca.i18Nconfigs": {
        "bundleName": "cus.crm.mycalendar.CRM_MYCALExtension.i18n.i18n"
    },
    "sap.ca.serviceConfigs": [
        {
            name: "CRM_APPOINTMENT_SRV",
            serviceUrl: "/sap/opu/odata/sap/CRM_APPOINTMENT_SRV/",
            isDefault: true,
            mockedDataSource: "./model/metadata.xml"
        }
    ]
},

		customizing: {
    "sap.ui.viewExtensions": {
        "cus.crm.mycalendar.view.AppointmentDetail": {
            "extensionDetail1": {
                className: "sap.ui.core.Fragment",
                fragmentName: "cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentDetail_extensionDetail1Custom",
                type: "XML"
            },
            "extensionDetail2": {
                className: "sap.ui.core.Fragment",
                fragmentName: "cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentDetail_extensionDetail2Custom",
                type: "XML"
            }
        },
        "cus.crm.mycalendar.view.NewAppointment": {
            "extensionEdit1": {
                className: "sap.ui.core.Fragment",
                fragmentName: "cus.crm.mycalendar.CRM_MYCALExtension.view.NewAppointment_extensionEdit1Custom",
                type: "XML"
            }
        }
    },
    "sap.ui.controllerExtensions": {
        "cus.crm.mycalendar.view.AppointmentList": {
            controllerName: "cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentListCustom"
        },
        "cus.crm.mycalendar.view.AppointmentDetail": {
            controllerName: "cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentDetailCustom"
        },
        "cus.crm.mycalendar.view.NewAppointment": {
            controllerName: "cus.crm.mycalendar.CRM_MYCALExtension.view.NewAppointmentCustom"
        },
        "cus.crm.mycalendar.view.Attachments": {
            controllerName: "cus.crm.mycalendar.CRM_MYCALExtension.view.AttachmentsCustom"
        }
    },
    "sap.ui.viewModifications": {
        "cus.crm.mycalendar.view.AppointmentDetail": {
            "panelattachment": {
                "visible": false
            }
        }
    }
}
	}
});