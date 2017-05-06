// does not work
// jQuery.sap.require("cus.crm.mycalendar.util.Util");
// jQuery.sap.declare("cus.crm.mycalendar.CRM_MYCALExtension.util.Util");
// jQuery.sap.declare("cus.crm.mycalendar.CRM_MYCALExtension.util.Util");
// cus.crm.mycalendar.util.Util.getSearch = function(sAttr, oList) {
// 		var doSearch = function(oEvent) {
// 			jQuery.sap.log.info("in do search");
// 			var aFilter = [];
// 			var itemsBinding;
// 			var sVal;
// 			if (oList) {
// 				sVal = oEvent.getSource().getValue();
// 			} else {
// 				sVal = oEvent.getParameter("value");
// 			}
// 			if (sVal !== undefined) {
// 				// Get the binded items
// 				if (oList) {
// 					itemsBinding = oList.getBinding("items");
// 				} else {
// 					// for the SearchDialog
// 					itemsBinding = oEvent.getParameter("itemsBinding");
// 				}
// 				//clear aApplicationFilters
// 				itemsBinding.aApplicationFilters = [];
// 				// filter on lastName -> anyway search on all attr due to enterprise search
// 				var selectFilter = new sap.ui.model.Filter(sAttr, sap.ui.model.FilterOperator.Contains, sVal);
// 				aFilter.push(selectFilter);
// 				aFilter.push(new sap.ui.model.Filter('isMyAccount', sap.ui.model.FilterOperator.EQ, true));
// 				// and apply the filter to the bound items, and the Select Dialog will update
// 				itemsBinding.filter(aFilter);
// 			}
// 		};
// 		return doSearch;
// 	};
// cus.crm.mycalendar.util.Util.getLiveSearch = function(sAttr, oList) {
// 		var liveChangeTimer;
// 		var doSearch = function(oEvent) {
// 			jQuery.sap.log.info("in do live search");
// 			var aFilter = [];
// 			var itemsBinding;
// 			var sVal;
// 			if (oList) {
// 				sVal = oEvent.getSource().getValue();
// 			} else {
// 				sVal = oEvent.getParameter("value");
// 			}
// 			if (sVal.length === 0 || sVal.length > 3) {
// 				// Get the binded items
// 				// Get the binded items
// 				if (oList) {
// 					itemsBinding = oList.getBinding("items");
// 				} else {
// 					itemsBinding = oEvent.getParameter("itemsBinding");
// 				}
// 				// filter on lastName -> anyway search on all attr due to
// 				// enterprise search
// 				var selectFilter = new sap.ui.model.Filter(sAttr, sap.ui.model.FilterOperator.Contains, sVal);
// 				aFilter.push(selectFilter);
// 				aFilter.push(new sap.ui.model.Filter('isMyAccount', sap.ui.model.FilterOperator.EQ, true));
// 				// and apply the filter to the bound items, and the Select
// 				// Dialog will update
// 				clearTimeout(liveChangeTimer);
// 				liveChangeTimer = setTimeout(function(oEvent) {
// 					itemsBinding.filter(aFilter);
// 				}, 1000);
// 			}
// 		};
// 		return doSearch;
// 	};
// cus.crm.mycalendar.util.Util.createContactSearchFragment = function(id, oController) {
// 		var oFragment = sap.ui.xmlfragment(id, "cus.crm.mycalendar.view.ContactSearch", oController);
// 		var oSearchList = sap.ui.core.Fragment.byId(id, "lsc");
// 		var oIB = oSearchList.getInfoToolbar();
// 		var oLIT = sap.ui.core.Fragment.byId(id, "lsci");
// 		var oSF = sap.ui.core.Fragment.byId(id, "sfc");
// 		oSearchList.removeItem(oLIT);
// 		// get function object for search and keep it in the fragment
// 		oFragment.onContactSearch = cus.crm.mycalendar.util.Util.getSearch("lastName", oSearchList);
// 		oFragment.onContactLiveChange = cus.crm.mycalendar.util.Util.getLiveSearch("lastName", oSearchList);
// 		// helper method to trigger contact search -> 2 different collections
// 		oFragment.triggerSearch = function(input) {
// 			var aFilter = [];
// 			// remove template, because data binding will clone this template / avoid empty oData call
// 			oSearchList.removeItem(oLIT);
// 			if (input.searchvalue) {
// 				var selectFilter = new sap.ui.model.Filter("lastName", sap.ui.model.FilterOperator.Contains, input.searchvalue);
// 				aFilter.push(selectFilter);
// 				oSF.setValue(input.searchvalue);
// 			} else {
// 				oSF.setValue("");
// 			}
// 			var xButton;
// 			var sFilteredby;
// 			if (input.accountid) {
// 				// add account txt to the label of the info tool bar
// 				sFilteredby = oController.oBundle.getText("view.Appointment.filteredby");
// 				sFilteredby = sFilteredby + " " + (input.accounttext === "" ? input.accountid : input.accounttext);
// 				oIB.getContent()[0].setProperty("text", sFilteredby);
// 				xButton = oSearchList.getInfoToolbar().getContent()[2];
// 				xButton.setVisible(false);
// 				oSearchList.getInfoToolbar().setVisible(true);
// 				// and set search collection to the Contacts collection of the specific account
// 				var sPath = "sm>/AccountCollection('" + input.accountid + "')/Contacts";
// 				oSearchList.bindAggregation("items", {
// 					path: sPath,
// 					template: oLIT,
// 					filters: aFilter
// 				});
// 			} else {
// 				// no account info passed -> normal f4 contact collection
// 				// oIB.setVisible(false);
// 				// var sPath = "sm>/ContactCollection";
// 				// oSearchList.bindAggregation("items", {
// 				// 	path : sPath,
// 				// 	template : oLIT,
// 				// 	filters : aFilter
// 				// });
// 				sFilteredby = oController.oBundle.getText("erco.contact.noaccount");
// 				oIB.getContent()[0].setProperty("text", sFilteredby);
// 				xButton = oSearchList.getInfoToolbar().getContent()[2];
// 				xButton.setVisible(false);
// 				oSearchList.getInfoToolbar().setVisible(true);
// 			}
// 		};
// 		return oFragment;
// 	};

jQuery.sap.declare("cus.crm.mycalendar.CRM_MYCALExtension.util.Util");

cus.crm.mycalendar.CRM_MYCALExtension.util.Util = {
	getCustomData: function(oController) {
		var oCustModel = oController.oApplicationFacade.getApplicationModel("customizing");
		var oData = oCustModel.oData;
		var mRequests = {};
		var i = 0;
		if (!oData.SalesOrgs || !oData.SalesOffs || !oData.SalesGrps) {
			oController.oModel.addBatchReadOperations([oController.oModel.createBatchOperation("SalesOrgs", "GET")]);
			mRequests.SalesOrgs = i++;
			oController.oModel.addBatchReadOperations([oController.oModel.createBatchOperation("SalesOffs", "GET")]);
			mRequests.SalesOffs = i++;
			oController.oModel.addBatchReadOperations([oController.oModel.createBatchOperation("SalesGrps", "GET")]);
			mRequests.SalesGrps = i++;
			oController.oModel.addBatchReadOperations([oController.oModel.createBatchOperation("MyOpportunities", "GET")]);
			mRequests.MyOpportunities = i++;

			var that = oController;

			oController.oModel.submitBatch(function(aResponses) {
				cus.crm.mycalendar.CRM_MYCALExtension.util.Util.handleBatchCustomDataRead(aResponses, that, mRequests);
			}, function(oError) {
				cus.crm.mycalendar.util.Util.handleErrors(oError);
			}, false);
		}
	},
	handleBatchCustomDataRead: function(aResponses, oController, mRequests) {
		var oCustModel = oController.oApplicationFacade.getApplicationModel("customizing");
		var oData = oCustModel.oData;
		for (var sRequest in mRequests) {
			if (parseInt(aResponses.__batchResponses[mRequests[sRequest]].statusCode) == 200) {
				switch (sRequest) {
					case "SalesOrgs":
						oData.SalesOrgs = aResponses.__batchResponses[mRequests[sRequest]].data.results;
						oController.SalesOrgs = oData.SalesOrgs;
						break;
					case "SalesOffs":
						oData.SalesOffs = aResponses.__batchResponses[mRequests[sRequest]].data.results;
						oController.SalesOffs = oData.SalesOffs;
						break;
					case "SalesGrps":
						oData.SalesGrps = aResponses.__batchResponses[mRequests[sRequest]].data.results;
						oController.SalesGrps = oData.SalesGrps;
						break;
					case "MyOpportunities":
					    oData.MyOpportunities = aResponses.__batchResponses[mRequests[sRequest]].data.results;
						oController.MyOpportunities = oData.MyOpportunities;
						break;
				}
			}
		}
	},
	// search function object to attach to search dialogs
	getSearch: function(sAttr, oList) {
		debugger;
		var doSearch = function(oEvent) {
			jQuery.sap.log.info("in do search");
			var aFilter = [];
			var itemsBinding;
			var sVal;
			if (oList) {
				sVal = oEvent.getSource().getValue();
			} else {
				sVal = oEvent.getParameter("value");
			}
			if (sVal !== undefined) {
				// Get the binded items
				if (oList) {
					itemsBinding = oList.getBinding("items");
				} else {
					// for the SearchDialog
					itemsBinding = oEvent.getParameter("itemsBinding");
				}
				//clear aApplicationFilters
				itemsBinding.aApplicationFilters = [];
				// filter on lastName -> anyway search on all attr due to enterprise search
				var selectFilter = new sap.ui.model.Filter(sAttr, sap.ui.model.FilterOperator.Contains, sVal);
				aFilter.push(selectFilter);
				aFilter.push(new sap.ui.model.Filter('isMyAccount', sap.ui.model.FilterOperator.EQ, true));
				// and apply the filter to the bound items, and the Select Dialog will update
				itemsBinding.filter(aFilter);
			}
		};
		return doSearch;
	},

	// live search function object to attach to search dialogs
	getLiveSearch: function(sAttr, oList) {
		debugger;
		var liveChangeTimer;
		var doSearch = function(oEvent) {
			jQuery.sap.log.info("in do live search");
			var aFilter = [];
			var itemsBinding;
			var sVal;
			if (oList) {
				sVal = oEvent.getSource().getValue();
			} else {
				sVal = oEvent.getParameter("value");
			}
			if (sVal.length === 0 || sVal.length > 3) {
				// Get the binded items
				// Get the binded items
				if (oList) {
					itemsBinding = oList.getBinding("items");
				} else {
					itemsBinding = oEvent.getParameter("itemsBinding");
				}
				// filter on lastName -> anyway search on all attr due to
				// enterprise search
				var selectFilter = new sap.ui.model.Filter(sAttr, sap.ui.model.FilterOperator.Contains, sVal);
				aFilter.push(selectFilter);
				aFilter.push(new sap.ui.model.Filter('isMyAccount', sap.ui.model.FilterOperator.EQ, true));
				// and apply the filter to the bound items, and the Select
				// Dialog will update
				clearTimeout(liveChangeTimer);
				liveChangeTimer = setTimeout(function(oEvent) {
					itemsBinding.filter(aFilter);
				}, 1000);
			}
		};
		return doSearch;
	},

	// creates a contactsearch fragment with a given id
	createContactSearchFragment: function(id, oController) {
		debugger;
		var oFragment = sap.ui.xmlfragment(id, "cus.crm.mycalendar.view.ContactSearch", oController);
		var oSearchList = sap.ui.core.Fragment.byId(id, "lsc");
		var oIB = oSearchList.getInfoToolbar();
		var oLIT = sap.ui.core.Fragment.byId(id, "lsci");
		var oSF = sap.ui.core.Fragment.byId(id, "sfc");
		oSearchList.removeItem(oLIT);
		// get function object for search and keep it in the fragment
		oFragment.onContactSearch = cus.crm.mycalendar.util.Util.getSearch("lastName", oSearchList);
		oFragment.onContactLiveChange = cus.crm.mycalendar.util.Util.getLiveSearch("lastName", oSearchList);
		// helper method to trigger contact search -> 2 different collections
		oFragment.triggerSearch = function(input) {
			var aFilter = [];

			// remove template, because data binding will clone this template / avoid empty oData call
			oSearchList.removeItem(oLIT);
			if (input.searchvalue) {
				var selectFilter = new sap.ui.model.Filter("lastName", sap.ui.model.FilterOperator.Contains, input.searchvalue);
				aFilter.push(selectFilter);
				oSF.setValue(input.searchvalue);
			} else {
				oSF.setValue("");
			}
			var xButton;
			var sFilteredby;
			if (input.accountid) {
				// add account txt to the label of the info tool bar
				sFilteredby = oController.oBundle.getText("view.Appointment.filteredby");
				sFilteredby = sFilteredby + " " + (input.accounttext === "" ? input.accountid : input.accounttext);
				oIB.getContent()[0].setProperty("text", sFilteredby);
				xButton = oSearchList.getInfoToolbar().getContent()[2];
				xButton.setVisible(false);
				oSearchList.getInfoToolbar().setVisible(true);
				// and set search collection to the Contacts collection of the specific account
				var sPath = "sm>/AccountCollection('" + input.accountid + "')/Contacts";
				oSearchList.bindAggregation("items", {
					path: sPath,
					template: oLIT,
					filters: aFilter
				});
			} else {
				// no account info passed -> normal f4 contact collection
				// oIB.setVisible(false);
				// var sPath = "sm>/ContactCollection";
				// oSearchList.bindAggregation("items", {
				// 	path : sPath,
				// 	template : oLIT,
				// 	filters : aFilter
				// });
				sFilteredby = oController.oBundle.getText("erco.contact.noaccount");
				oIB.getContent()[0].setProperty("text", sFilteredby);
				xButton = oSearchList.getInfoToolbar().getContent()[2];
				xButton.setVisible(false);
				oSearchList.getInfoToolbar().setVisible(true);
			}
		};
		return oFragment;
	}
};

// //cus.crm.mycalendar.util.Util = jQuery.extend(cus.crm.mycalendar.util.Util, cus.crm.mycalendar.CRM_MYCALExtension.util.Util);