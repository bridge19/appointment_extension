/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.ca.ui.quickoverview.CompanyLaunch");
jQuery.sap.require("cus.crm.mycalendar.util.Conversions");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.ExpansibleFeedListItem");
jQuery.sap.require("cus.crm.mycalendar.util.Schema");
sap.ui.controller("cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentDetailCustom", {
// 	Attachments: null,
 	onInit: function() {
 	    // ERCO on
		this.getView().byId('prioText_Detail').setVisible(false);
		this.getView().byId('pf_Detail').setVisible(false);
		this.getView().byId('responsibleField').setVisible(false);
		//this.getView().byId('panelattachment').setVisible(false);
		this.followUpButton.setVisible(false);
		this.byId('transactionHistoryData').setVisible(false);
		this.getView().byId("messages").setVisible(false);
		this.byId("update").mProperties.type = "";
		this.oRouter.attachRouteMatched(function(e) {
			jQuery.sap.log.info("### nav target:  " + e.getParameter("name"));
			if (e.getParameter("name") === "appointment") {
				this.appointment = true;
				this.Context = "/AppointmentSet(guid'" + e.getParameter("arguments").AppointmentID + "')";
				var t = this;
				if (this.byId("transactionHistoryData").setExpanded) this.byId("transactionHistoryData").setExpanded(false);
				if (this.isMock) {
					this.Context = "/AppointmentSet(Guid='" + e.getParameter("arguments").AppointmentID + "')";
				}
				this.oModel.createBindingContext(this.Context, "", {
					expand: "Attendee,AccountRel/Logo,DocumentHistory,AppointmentLogSet,AppointmentToAttachment"
				}, function(C) {
					t.getView().bindElement(t.Context);
					var a = t.getView().getBindingContext().getObject().AppointmentLogSet.__list;
					var d = a.length;
					if (d != 0) {
						t.getView().byId("messages").setEnabled(true);
					} else t.getView().byId("messages").setEnabled(false);
					t.onDataReceived();
				}, true);
				var s = this.getView().getModel("startupParameters");
				if (s && s.oData) {
					if (s.oData.parameters) {
						for (var p in s.oData.parameters) {}
					}
					delete s.oData.parameters[p];
				}
				this.getView().byId("delbut").setVisible(true);
				//this.getView().byId("followup").setVisible(true);
				this.getView().byId("followup").setVisible(false);
			}
		}, this);
		// ERCO off
// 		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
// 		if (!this.oApplicationFacade.getApplicationModel("customizing")) {
// 			cus.crm.mycalendar.util.Util.initCustomizingModel(this);
// 		}
// 		var c = new sap.ui.model.json.JSONModel({
// 			detailController: this
// 		});
// 		this.oApplicationFacade.setApplicationModel("detailController", c);
// 		this.oModel = this.oApplicationFacade.getODataModel();
// 		this.isMock = this.oApplicationFacade.isMock();
// 		this.getView().setModel(this.oModel);
// 		this.followUpButton = this.byId("followup");
// 		var b = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
// 		if (parseFloat(b) >= 3) {
// 			this.followUpButton.setVisible(true);
// 		} else {
// 			this.followUpButton.setVisible(false);
// 		} if (parseFloat(b) >= 4) {
// 			this.byId('transactionHistoryData').setVisible(true);
// 			this.getView().byId("messages").setVisible(true);
// 		} else {
// 			this.byId('transactionHistoryData').setVisible(false);
// 			this.getView().byId("messages").setVisible(false);
// 		}
// 		this.oBundle = this.oApplicationFacade.getResourceBundle();
// 		this.marginStyle = jQuery.device.is.phone ? "sapUiSmallMargin" : "sapUiMediumMargin";
// 		this.byId("ohdetail").addStyleClass(this.marginStyle);
// 		this.showErrorMsgFragment = sap.ui.xmlfragment(this.createId("show_Error_Msg_Fragment"), "cus.crm.mycalendar.view.ShowErrorMsg", this);
// 		this.oRouter.attachRouteMatched(function(e) {
// 			jQuery.sap.log.info("### nav target:  " + e.getParameter("name"));
// 			if (e.getParameter("name") === "appointment") {
// 				this.appointment = true;
// 				this.Context = "/AppointmentSet(guid'" + e.getParameter("arguments").AppointmentID + "')";
// 				var t = this;
// 				if (this.byId("transactionHistoryData").setExpanded) this.byId("transactionHistoryData").setExpanded(false);
// 				if (this.isMock) {
// 					this.Context = "/AppointmentSet(Guid='" + e.getParameter("arguments").AppointmentID + "')";
// 				}
// 				this.oModel.createBindingContext(this.Context, "", {
// 					expand: "Attendee,AccountRel/Logo,DocumentHistory,AppointmentLogSet,AppointmentToAttachment"
// 				}, function(C) {
// 					t.getView().bindElement(t.Context);
// 					var a = t.getView().getBindingContext().getObject().AppointmentLogSet.__list;
// 					var d = a.length;
// 					if (d != 0) {
// 						t.getView().byId("messages").setEnabled(true);
// 					} else t.getView().byId("messages").setEnabled(false);
// 					t.onDataReceived();
// 				}, true);
// 				var s = this.getView().getModel("startupParameters");
// 				if (s && s.oData) {
// 					if (s.oData.parameters) {
// 						for (var p in s.oData.parameters) {}
// 					}
// 					delete s.oData.parameters[p];
// 				}
// 				this.getView().byId("delbut").setVisible(true);
// 				this.getView().byId("followup").setVisible(true);
// 			}
// 		}, this);
 	},
//  ERCO on
 	onDataReceived: function() {
		var p = this.Context;
		var d = this.getView().getModel().getData(p, null, true);
		if (d) {
			this.getView().byId("ProcessTypeDescription").setVisible(false);
			this.setAttendees_AccountLogo(d);
			this.getAttachments(d.AppointmentToAttachment);
			this.setDocumentHistory(d);
			if (d.ZOppId != null && d.ZOppDesc != null && d.ZOppId.length > 0 && d.ZOppDesc.length > 0) {
				var t = d.ZOppDesc + ' / ' + d.ZOppId;
				this.byId('ZRelatedOpportunity').setText(t);
				this.byId('ZRelatedOpportunity').setVisible(true);
			} else {
				this.byId('ZRelatedOpportunity').setText("");
				this.byId('ZRelatedOpportunity').setVisible(false);
			}
		} else {
			this.byId('ZRelatedOpportunity').setText("");
			this.getView().unbindElement();
			this.clearAttendees_AccountLogo();
			this.clearAttachments();
		}
// 		var p = this.Context;
// 		var d = this.getView().getModel().getData(p, null, true);
// 		if (d) {
// 			if (d.ProcessTypeDescription == null) {
// 				this.getView().byId("ProcessTypeDescription").setVisible(false);
// 			} else {
// 				this.byId("ProcessTypeDescription").setText(cus.crm.mycalendar.util.Conversions.formatTypeTxt(d.ProcessTypeDescription));
// 			}
// 			this.setAttendees_AccountLogo(d);
// 			this.getAttachments(d.AppointmentToAttachment);
// 			this.setDocumentHistory(d);
// 		} else {
// 			this.getView().unbindElement();
// 			this.clearAttendees_AccountLogo();
// 			this.clearAttachments();
// 		}
 	},
//  ERCO off
// 	onBack: function() {
// 		if (this.oApplicationFacade.getApplicationModel("fromOpportunity")) {
// 			this.oApplicationFacade.getApplicationModel("fromOpportunity").destroy();
// 			window.history.go(-2);
// 		} else window.history.go(-1);
// 	},
// 	getDateParameterfromDate: function(d) {
// 		var D = d.getDate().toString();
// 		D = (D.length === 1) ? "0" + D : D;
// 		var m = d.getMonth() + 1;
// 		m = m.toString();
// 		m = (m.length === 1) ? "0" + m : m;
// 		var y = d.getFullYear();
// 		var s = "" + y + m + D;
// 		return s;
// 	},
// 	onUpdate: function(e) {
// 		var b = this.Context;
// 		var u = this.oModel.getProperty(b).Guid;
// 		var m = this.oModel;
// 		var t = this;
// 		var c = cus.crm.mycalendar.util.Schema;
// 		if (parseFloat(c._getServiceSchemaVersion(this.oModel, "Appointment")) >= 3) {
// 			m.read("EditAuthorizationCheck", null, {
// 				ObjectGuid: m.formatValue(u, "Edm.Guid")
// 			}, false, function(d, r) {
// 				if (r.data.EditAuthorizationCheck.ActionSuccessful == "X") {
// 					t.oRouter.navTo("editappointment", {
// 						AppointmentID: u
// 					}, false);
// 				} else {
// 					sap.ca.ui.message.showMessageBox({
// 						type: sap.ca.ui.message.Type.ERROR,
// 						message: r.data.EditAuthorizationCheck.Message,
// 						details: null
// 					});
// 				}
// 			}, null);
// 		} else {
// 			this.oRouter.navTo("editappointment", {
// 				AppointmentID: u
// 			}, false);
// 		}
// 	},
// 	onDelete: function(e) {
// 		var c = this.Context;
// 		var C = jQuery.proxy(function(r) {
// 			if (r.isConfirmed) {
// 				this.deleteAppointment(c);
// 			}
// 		}, this);
// 		var d = this.oBundle.getText("view.Appointment.deleteTitle");
// 		var D = this.oBundle.getText("view.Appointment.deleteInstruction");
// 		var o = this.oBundle.getText("view.Appointment.deleteYes");
// 		sap.ca.ui.dialog.confirmation.open({
// 			question: D,
// 			showNote: false,
// 			title: d,
// 			confirmButtonLabel: o
// 		}, C);
// 	},
// 	onFollowup: function(e) {
// 		var t = this;
// 		this._actionSheet = new sap.m.ActionSheet({
// 			placement: sap.m.PlacementType.Top,
// 			buttons: [new sap.m.Button({
// 				text: this.getView().getModel("i18n").getProperty("view.Appointment.appointmentDetail"),
// 				press: function(a) {
// 					t.navToAppointmentDialog(a);
// 				},
// 			}), new sap.m.Button({
// 				text: this.getView().getModel("i18n").getProperty("view.Appointment.Task"),
// 				press: function(a) {
// 					t.navToTaskDialog(a);
// 				},
// 			}), new sap.m.Button({
// 				text: this.getView().getModel("i18n").getProperty("view.Appointment.Opportunity"),
// 				press: function(a) {
// 					t.navToOpptDialog(a);
// 				},
// 			}), ]
// 		});
// 		if (this.extHookHandleOpen) {
// 			this.extHookHandleOpen(e);
// 		}
// 		this._actionSheet.openBy(e.getSource());
// 	},
// 	navToAppointmentDialog: function(e) {
// 		var m = this.getView().getModel();
// 		var h = this.oModel.getContext("/" + this.sPath).getObject();
// 		var a;
// 		var b = this.Context;
// 		var g = this.oModel.getProperty(b).Guid;
// 		var t = this.oModel.getProperty(b).TransactionType;
// 		m.read("AppFollowupTransTypes", null, {
// 			Guid: m.formatValue(g, "Edm.Guid"),
// 			TransactionType: m.formatValue(t, "Edm.String")
// 		}, false, function(d, r) {
// 			a = {
// 				TransactionTypeSet: r.data.results
// 			};
// 		});
// 		this.appointmentFlag = true;
// 		if (a.TransactionTypeSet.length == 0) {
// 			sap.ca.ui.message.showMessageBox({
// 				type: sap.ca.ui.message.Type.ERROR,
// 				message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("view.Appointment.FOLLOWUPERROR")
// 			});
// 			this.appointmentFlag = false;
// 		} else if (a.TransactionTypeSet.length == 1) {
// 			this.onlyOneProcessType = true;
// 			this.processType = a.TransactionTypeSet[0].ProcessTypeCode;
// 			this.ProcessTypeDescription = a.TransactionTypeSet[0].Description;
// 			this.PrivateFlag = a.TransactionTypeSet[0].PrivateFlag;
// 			this.selectProcess();
// 		} else {
// 			this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
// 			var j = new sap.ui.model.json.JSONModel();
// 			j.setData(a);
// 			this.oActionSheet.setModel(j, "json");
// 			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
// 				"view.Appointment.searchfieldplaceholder"));
// 			this.oActionSheet._list.setGrowingScrollToLoad(true);
// 			this.oActionSheet._dialog.setVerticalScrolling(true);
// 			this.oActionSheet.open();
// 		}
// 	},
// 	navToTaskDialog: function(e) {
// 		var m = this.getView().getModel();
// 		var b = this.Context;
// 		var g = this.oModel.getProperty(b).Guid;
// 		var t = this.oModel.getProperty(b).TransactionType;
// 		var a;
// 		m.read("TaskFollowupTransTypes", null, {
// 			Guid: m.formatValue(g, "Edm.Guid"),
// 			TransactionType: m.formatValue(t, "Edm.String")
// 		}, false, function(d, r) {
// 			a = {
// 				TransactionTypeSet: r.data.results
// 			};
// 		});
// 		this.taskFlag = true;
// 		if (a.TransactionTypeSet.length == 0) {
// 			sap.ca.ui.message.showMessageBox({
// 				type: sap.ca.ui.message.Type.ERROR,
// 				message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("view.Appointment.FOLLOWUPERROR")
// 			});
// 			this.taskFlag = false;
// 		} else if (a.TransactionTypeSet.length == 1) {
// 			this.onlyOneTaskProcessType = true;
// 			this.processType = a.TransactionTypeSet[0].ProcessTypeCode;
// 			this.ProcessTypeDescription = a.TransactionTypeSet[0].Description;
// 			this.selectProcess();
// 		} else {
// 			this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
// 			var j = new sap.ui.model.json.JSONModel();
// 			j.setData(a);
// 			this.oActionSheet.setModel(j, "json");
// 			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
// 				"view.Appointment.searchfieldplaceholder"));
// 			this.oActionSheet._list.setGrowingScrollToLoad(true);
// 			this.oActionSheet._dialog.setVerticalScrolling(true);
// 			this.oActionSheet.open();
// 		}
// 	},
// 	navToOpptDialog: function(e) {
// 		var m = this.getView().getModel();
// 		var b = this.Context;
// 		var g = this.oModel.getProperty(b).Guid;
// 		var t = this.oModel.getProperty(b).TransactionType;
// 		var o;
// 		m.read("OpptFollowupTransTypes", null, {
// 			Guid: m.formatValue(g, "Edm.Guid"),
// 			TransactionType: m.formatValue(t, "Edm.String")
// 		}, false, function(d, r) {
// 			o = {
// 				TransactionTypeSet: r.data.results
// 			};
// 		});
// 		this.oppFlag = true;
// 		if (o.TransactionTypeSet.length == 0) {
// 			sap.ca.ui.message.showMessageBox({
// 				type: sap.ca.ui.message.Type.ERROR,
// 				message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText("view.Appointment.FOLLOWUPERROR")
// 			});
// 			this.oppFlag = false;
// 		} else if (o.TransactionTypeSet.length == 1) {
// 			this.onlyOneOppProcessType = true;
// 			this.processType = o.TransactionTypeSet[0].ProcessTypeCode;
// 			this.ProcessTypeDescription = o.TransactionTypeSet[0].Description;
// 			this.selectProcess();
// 		} else {
// 			this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
// 			var j = new sap.ui.model.json.JSONModel();
// 			j.setData(o);
// 			this.oActionSheet.setModel(j, "json");
// 			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
// 				"view.Appointment.searchfieldplaceholder"));
// 			this.oActionSheet._list.setGrowingScrollToLoad(true);
// 			this.oActionSheet._dialog.setVerticalScrolling(true);
// 			this.oActionSheet.open();
// 		}
// 	},
// 	cancelProcess: function(e) {
// 		this.oppFlag = false;
// 		this.taskFlag = false;
// 		this.appointmentFlag = false;
// 	},
// 	selectProcess: function(e) {
// 		var b = this.Context;
// 		var h = this.oModel.getProperty(b).Guid;
// 		var p = "/AppointmentSet(guid'" + h + "')";
// 		var a = this.oModel.getProperty(b).Id;
// 		var s = this.oModel.getProperty(b).StatusTxt;
// 		var S = this.oModel.getProperty(b).FromDate;
// 		var A = this.oModel.getProperty(b).Account;
// 		var c = this.oModel.getProperty(b).AccountTxt;
// 		var C = this.oModel.getProperty(b).Contact;
// 		var d = this.oModel.getProperty(b).ContactTxt;
// 		var t = this.oModel.getProperty(b).Description;
// 		var G = this.oModel.getProperty(b).Guid;
// 		var R = this.oModel.getProperty(b).Responsible;
// 		var f = this.oModel.getProperty(b).ResponsibleTxt;
// 		if (!(this.onlyOneOppProcessType || this.onlyOneTaskProcessType || this.onlyOneProcessType)) {
// 			var g = e.getParameter("selectedItem");
// 			if (g) {
// 				this.processType = g.data("ProcessTypeCode");
// 				this.ProcessTypeDescription = g.data("ProcessTypeDescription");
// 				this.PrivateFlag = g.data("PrivateFlag");
// 			}
// 		}
// 		var i = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
// 		this.oCrossAppNavigator = i && i("CrossApplicationNavigation");
// 		if (this.appointmentFlag) {
// 			var b = this.Context;
// 			var u = this.oModel.getProperty(b).Guid;
// 			sap.ca.ui.utils.busydialog.requireBusyDialog();
// 			this.PrivateFlag = false;
// 			this.oRouter.navTo("followupappointment", {
// 				processType: this.processType,
// 				AppointmentGuid: u,
// 				privateFlag: this.PrivateFlag
// 			}, false);
// 			this.appointmentFlag = false;
// 			this.onlyOneProcessType = false;
// 			sap.ca.ui.utils.busydialog.releaseBusyDialog();
// 		} else if (this.oppFlag) {
// 			var j = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Opportunity",
// 					action: "manageOpportunity"
// 				},
// 				appSpecificRoute: ["&", "fulScrCreateFollowup", this.Context.substr(1), this.processType].join("/"),
// 				params: {
// 					"createFromAppt": "X",
// 					"processType": this.processType,
// 					"appointmentId": a,
// 					"StartDate": S,
// 					"title": t,
// 					"appointmentGuid": G,
// 					"Responsible": R,
// 					"ResponsibleTxt": f,
// 					"AccountId": A,
// 					"ContactId": C,
// 					"ProcessTypeDescription": this.ProcessTypeDescription
// 				}
// 			}) || "";
// 			this.oppFlag = false;
// 			this.onlyOneOppProcessType = false;
// 			window.location = j;
// 		} else if (this.taskFlag) {
// 			var j = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Task",
// 					action: "manageTasks"
// 				},
// 				params: {
// 					"createFromAppt": "X",
// 					"AccountId": A,
// 					"ContactId": C,
// 					"appointmentId": a,
// 					"appointmentGuid": G,
// 					"title": t,
// 				},
// 				appSpecificRoute: ["&", "newTask", this.processType].join("/")
// 			}) || "";
// 			this.taskFlag = false;
// 			this.onlyOneTaskProcessType = false;
// 			window.location = j;
// 		}
// 	},
// 	searchProcess: function(e) {
// 		var v = e.getParameter("value");
// 		if (v !== undefined) {
// 			e.getParameter("itemsBinding").filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v)]);
// 		}
// 	},
    // ERCO on
	onAccount: function() {
		var m = this.getView().getModel();
		var c = this.getView().getBindingContext();
		var d = c.getObject();
		var p = "/AccountCollection('" + d.Account + "')";
		var u = "$expand=MainAddress,MainContact/WorkAddress,Logo";
		if (this.isMock) {
			p = "/AccountCollection(accountID='" + d.Account + "')";
			u = "";
		}
		var t = this;
		m.read(p, null, [u], true, function(o, r) {
			jQuery.sap.log.info("oData account response");
			var C = jQuery.proxy(function(k) {
				var n = {};
				n.target = {};
				n.target.semanticObject = "ZAccount";
				n.target.action = "MyAccounts&/detail/AccountCollection('" + d.Account + "')";
				this.navToOtherApp = true;
				return n;
			}, this);
			var T = t.oBundle.getText("view.Appointment.account_title");
			var a = "";
			var b = "";
			var e = "";
			var M = "";
			var O = "";
			var E = "";
			var f = "";
			var l = "";
			if (o.MainAddress) {
				a = o.MainAddress.address;
				b = o.MainAddress.phone;
			}
			if (o.MainContact) {
				e = o.MainContact.fullName;
				if (o.MainContact.WorkAddress !== null) {
					M = o.MainContact.WorkAddress.mobilePhone;
					O = o.MainContact.WorkAddress.phone;
					E = o.MainContact.WorkAddress.email;
				}
			}
			if (o.name1 && o.name1 !== "") {
				f = o.name1;
			}
			if (o.Logo && o.Logo.__metadata) {
				var g = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Logo.__metadata.media_src);
				l = cus.crm.mycalendar.util.Conversions.urlConverter(g);
			}
			var h = {
				title: T,
				imgurl: l,
				companyname: f,
				companyphone: b,
				companyaddress: a,
				maincontactname: e,
				maincontactmobile: M,
				maincontactphone: O,
				maincontactemail: E,
				beforeExtNav: C
			};
			var i = t.getView().byId("accountField");
			var j = new sap.ca.ui.quickoverview.CompanyLaunch(h);
			j.openBy(i);
		}, function(e) {
			jQuery.sap.log.error("oData request for Account failed");
		});
// 		var m = this.getView().getModel();
// 		var c = this.getView().getBindingContext();
// 		var d = c.getObject();
// 		var p = "/AccountCollection('" + d.Account + "')";
// 		var u = "$expand=MainAddress,MainContact/WorkAddress,Logo";
// 		if (this.isMock) {
// 			p = "/AccountCollection(accountID='" + d.Account + "')";
// 			u = "";
// 		}
// 		var t = this;
// 		m.read(p, null, [u], true, function(o, r) {
// 			jQuery.sap.log.info("oData account response");
// 			var C = jQuery.proxy(function(k) {
// 				var n = {};
// 				n.target = {};
// 				n.target.semanticObject = "Account";
// 				n.target.action = "MyAccounts&/detail/AccountCollection('" + d.Account + "')";
// 				this.navToOtherApp = true;
// 				return n;
// 			}, this);
// 			var T = t.oBundle.getText("view.Appointment.account_title");
// 			var a = "";
// 			var b = "";
// 			var e = "";
// 			var M = "";
// 			var O = "";
// 			var E = "";
// 			var f = "";
// 			var l = "";
// 			if (o.MainAddress) {
// 				a = o.MainAddress.address;
// 				b = o.MainAddress.phone;
// 			}
// 			if (o.MainContact) {
// 				e = o.MainContact.fullName;
// 				if (o.MainContact.WorkAddress !== null) {
// 					M = o.MainContact.WorkAddress.mobilePhone;
// 					O = o.MainContact.WorkAddress.phone;
// 					E = o.MainContact.WorkAddress.email;
// 				}
// 			}
// 			if (o.name1 && o.name1 !== "") {
// 				f = o.name1;
// 			}
// 			if (o.Logo && o.Logo.__metadata) {
// 				var g = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Logo.__metadata.media_src);
// 				l = cus.crm.mycalendar.util.Conversions.urlConverter(g);
// 			}
// 			var h = {
// 				title: T,
// 				imgurl: l,
// 				companyname: f,
// 				companyphone: b,
// 				companyaddress: a,
// 				maincontactname: e,
// 				maincontactmobile: M,
// 				maincontactphone: O,
// 				maincontactemail: E,
// 				beforeExtNav: C
// 			};
// 			var i = t.getView().byId("accountField");
// 			var j = new sap.ca.ui.quickoverview.CompanyLaunch(h);
// 			j.openBy(i);
// 		}, function(e) {
// 			jQuery.sap.log.error("oData request for Account failed");
// 		});
	},
	// ERCO off
// 	onExtAttendee: function(e) {
// 		var c = this.getView().getBindingContext();
// 		var a = c.getObject().Account;
// 		var b = e.getSource().AccountNo;
// 		if (a == b || b == "") {
// 			if (e.getSource().PartnerNo !== '') {
// 				var A = "contactID='" + e.getSource().PartnerNo + "',accountID='" + a;
// 				var p = "/ContactCollection(" + A + "')";
// 				var u = "$expand=WorkAddress,Account/MainAddress,Photo";
// 				if (this.isMock) {
// 					u = "";
// 				}
// 				var s = e.getSource();
// 				var t = this;
// 				this.oModel.read(p, null, [u], true, function(o, r) {
// 					jQuery.sap.log.info("oData account response");
// 					var j = new sap.ui.model.json.JSONModel(o);
// 					var C = j.getProperty("/function");
// 					var T = t.oBundle.getText("view.Appointment.contact_title");
// 					var d = "";
// 					var f = "";
// 					var g = "";
// 					var h = "";
// 					var i = "";
// 					var k = "";
// 					var P = "";
// 					if (o.WorkAddress) {
// 						d = o.WorkAddress.mobilePhone;
// 						f = o.WorkAddress.phone;
// 						g = o.WorkAddress.email;
// 					}
// 					if (o.Account) {
// 						if (o.Account.MainAddress) {
// 							h = o.Account.MainAddress.address;
// 						}
// 						if (o.Account.name1 && o.Account.name1 !== "") {
// 							i = o.Account.name1;
// 						}
// 					}
// 					if (o.fullName && o.fullName !== "") {
// 						k = o.fullName;
// 					}
// 					if (o.Photo && o.Photo.__metadata) {
// 						var M = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Photo.__metadata.media_src);
// 						P = cus.crm.mycalendar.util.Conversions.urlConverter(M);
// 					}
// 					var E = {
// 						title: T,
// 						name: k,
// 						imgurl: P,
// 						department: C,
// 						contactmobile: d,
// 						contactphone: f,
// 						contactemail: g,
// 						contactemailsubj: "",
// 						companyname: i,
// 						companyaddress: h
// 					};
// 					var l = new sap.ca.ui.quickoverview.EmployeeLaunch(E);
// 					l.openBy(s);
// 				}, function(E) {
// 					if (E.response.body.search("Specify at least one number for the business partner")) {
// 						var m = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel.getResourceBundle().getText("NOT_IN_MAIN_CONTACT");
// 						sap.ca.ui.message.showMessageToast(m);
// 					} else {
// 						jQuery.sap.log.error("oData request for Contact failed");
// 					}
// 				});
// 			}
// 		} else {
// 			var m = sap.ca.scfld.md.app.Application.getImpl().AppI18nModel.getResourceBundle().getText("NOT_IN_MAIN_CONTACT");
// 			sap.ca.ui.message.showMessageToast(m);
// 		}
// 	},
// 	onIntAttendee: function(e) {
// 		if (e.getSource().PartnerNo !== '') {
// 			var p = "/EmployeeCollection('" + e.getSource().PartnerNo + "')";
// 			var u = "$expand=WorkAddress,Company,Photo";
// 			if (this.isMock) {
// 				p = "/EmployeeCollection(employeeID='" + e.getSource().PartnerNo + "')";
// 				u = "";
// 			}
// 			var s = e.getSource();
// 			var t = this;
// 			this.oModel.read(p, null, [u], true, function(o, r) {
// 				jQuery.sap.log.info("oData employee response");
// 				var T = t.oBundle.getText("view.Appointment.employee_title");
// 				var E = "";
// 				var a = "";
// 				var b = "";
// 				var c = "";
// 				var C = "";
// 				var d = "";
// 				var f = "";
// 				var P = "";
// 				if (o.WorkAddress) {
// 					E = o.WorkAddress.mobilePhone;
// 					a = o.WorkAddress.phone;
// 					b = o.WorkAddress.email;
// 					c = o.WorkAddress.department;
// 					C = o.WorkAddress.address;
// 				}
// 				if (o.Company && o.Company.name1) {
// 					d = o.Company.name1;
// 				}
// 				if (o.fullName && o.fullName !== "") {
// 					f = o.fullName;
// 				}
// 				if (o.Photo && o.Photo.__metadata) {
// 					var m = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Photo.__metadata.media_src);
// 					P = cus.crm.mycalendar.util.Conversions.urlConverter(m);
// 				}
// 				var g = {
// 					title: T,
// 					name: f,
// 					imgurl: P,
// 					department: c,
// 					contactmobile: E,
// 					contactphone: a,
// 					contactemail: b,
// 					contactemailsubj: "",
// 					companyname: d,
// 					companyaddress: C
// 				};
// 				var h = new sap.ca.ui.quickoverview.EmployeeLaunch(g);
// 				h.openBy(s);
// 			}, function(E) {
// 				jQuery.sap.log.error("oData request for employee failed");
// 			});
// 		}
// 	},
    // ERCO on
	onContact: function() {
		var m = this.getView().getModel();
		var c = this.getView().getBindingContext();
		var d = c.getObject();
		var a = "";
		if (d.Contact !== '') {
			if (d.ContactAccount !== '') {
				a = "contactID='" + d.Contact + "',accountID='" + d.ContactAccount;
			} else if (d.Account !== '') {
				a = "contactID='" + d.Contact + "',accountID='" + d.Account;
			}
			if (a !== '') {
				var p = "/ContactCollection(" + a + "')";
				var u = "$expand=WorkAddress,Account/MainAddress,Photo";
				if (this.isMock) {
					u = "";
				}
				var t = this;
				m.read(p, null, [u], true, function(o, r) {
					jQuery.sap.log.info("oData account response");
					var j = new sap.ui.model.json.JSONModel(o);
					var C = jQuery.proxy(function(E) {
						var N = {};
						N.target = {};
						N.target.semanticObject = "ZContactPerson";
						if (d.ContactAccount !== '') {
							N.target.action = "MyContacts&/display/ContactCollection(contactID='" + d.Contact + "',accountID='" + d.ContactAccount + "')";
						} else if (d.Account !== '') {
							N.target.action = "MyContacts&/display/ContactCollection(contactID='" + d.Contact + "',accountID='" + d.Account + "')";
						}
						this.navToOtherApp = true;
						return N;
					}, this);
					var T = t.oBundle.getText("view.Appointment.contact_title");
					var b = j.getProperty("/function");
					var e = "";
					var f = "";
					var g = "";
					var h = "";
					var i = "";
					var k = "";
					var P = "";
					if (o.WorkAddress !== null) {
						e = o.WorkAddress.mobilePhone;
						f = o.WorkAddress.phone;
						g = o.WorkAddress.email;
					}
					if (o.Account !== null) {
						if (o.Account.MainAddress !== null) {
							h = o.Account.MainAddress.address;
						}
						if (o.Account.name1 !== null) {
							i = o.Account.name1;
						}
					}
					if (o.fullName !== null && o.fullName !== "") {
						k = o.fullName;
					}
					if (o.Photo && o.Photo.__metadata) {
						var M = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Photo.__metadata.media_src);
						P = cus.crm.mycalendar.util.Conversions.urlConverter(M);
					}
					var l = {
						title: T,
						name: k,
						imgurl: P,
						department: b,
						contactmobile: e,
						contactphone: f,
						contactemail: g,
						contactemailsubj: "",
						companyname: i,
						companyaddress: h,
						beforeExtNav: C
					};
					var n = t.getView().byId("contactField");
					var q = new sap.ca.ui.quickoverview.EmployeeLaunch(l);
					q.openBy(n);
				}, function(e) {
					jQuery.sap.log.error("oData request for Contact failed");
				});
			}
		}
// 		var m = this.getView().getModel();
// 		var c = this.getView().getBindingContext();
// 		var d = c.getObject();
// 		var a = "";
// 		if (d.Contact !== '') {
// 			if (d.ContactAccount !== '') {
// 				a = "contactID='" + d.Contact + "',accountID='" + d.ContactAccount;
// 			} else if (d.Account !== '') {
// 				a = "contactID='" + d.Contact + "',accountID='" + d.Account;
// 			}
// 			if (a !== '') {
// 				var p = "/ContactCollection(" + a + "')";
// 				var u = "$expand=WorkAddress,Account/MainAddress,Photo";
// 				if (this.isMock) {
// 					u = "";
// 				}
// 				var t = this;
// 				m.read(p, null, [u], true, function(o, r) {
// 					jQuery.sap.log.info("oData account response");
// 					var j = new sap.ui.model.json.JSONModel(o);
// 					var C = jQuery.proxy(function(E) {
// 						var N = {};
// 						N.target = {};
// 						N.target.semanticObject = "ContactPerson";
// 						if (d.ContactAccount !== '') {
// 							N.target.action = "MyContacts&/display/ContactCollection(contactID='" + d.Contact + "',accountID='" + d.ContactAccount + "')";
// 						} else if (d.Account !== '') {
// 							N.target.action = "MyContacts&/display/ContactCollection(contactID='" + d.Contact + "',accountID='" + d.Account + "')";
// 						}
// 						this.navToOtherApp = true;
// 						return N;
// 					}, this);
// 					var T = t.oBundle.getText("view.Appointment.contact_title");
// 					var b = j.getProperty("/function");
// 					var e = "";
// 					var f = "";
// 					var g = "";
// 					var h = "";
// 					var i = "";
// 					var k = "";
// 					var P = "";
// 					if (o.WorkAddress !== null) {
// 						e = o.WorkAddress.mobilePhone;
// 						f = o.WorkAddress.phone;
// 						g = o.WorkAddress.email;
// 					}
// 					if (o.Account !== null) {
// 						if (o.Account.MainAddress !== null) {
// 							h = o.Account.MainAddress.address;
// 						}
// 						if (o.Account.name1 !== null) {
// 							i = o.Account.name1;
// 						}
// 					}
// 					if (o.fullName !== null && o.fullName !== "") {
// 						k = o.fullName;
// 					}
// 					if (o.Photo && o.Photo.__metadata) {
// 						var M = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Photo.__metadata.media_src);
// 						P = cus.crm.mycalendar.util.Conversions.urlConverter(M);
// 					}
// 					var l = {
// 						title: T,
// 						name: k,
// 						imgurl: P,
// 						department: b,
// 						contactmobile: e,
// 						contactphone: f,
// 						contactemail: g,
// 						contactemailsubj: "",
// 						companyname: i,
// 						companyaddress: h,
// 						beforeExtNav: C
// 					};
// 					var n = t.getView().byId("contactField");
// 					var q = new sap.ca.ui.quickoverview.EmployeeLaunch(l);
// 					q.openBy(n);
// 				}, function(e) {
// 					jQuery.sap.log.error("oData request for Contact failed");
// 				});
// 			}
// 		}
	},
	// ERCO off
// 	onResponsible: function() {
// 		var e;
// 		var m = this.getView().getModel();
// 		var c = this.getView().getBindingContext();
// 		var d = c.getObject();
// 		if (d.Responsible !== '') {
// 			var p = "/EmployeeCollection('" + d.Responsible + "')";
// 			var u = "$expand=WorkAddress,Company,Photo";
// 			if (this.isMock) {
// 				p = "/EmployeeCollection(employeeID='" + e.getSource().PartnerNo + "')";
// 				u = "";
// 			}
// 			var t = this;
// 			this.oModel.read(p, null, [u], true, function(o, r) {
// 				jQuery.sap.log.info("oData employee response");
// 				var T = t.oBundle.getText("view.Appointment.employee_title");
// 				var E = "";
// 				var a = "";
// 				var b = "";
// 				var f = "";
// 				var C = "";
// 				var g = "";
// 				var h = "";
// 				var P = "";
// 				if (o.WorkAddress) {
// 					E = o.WorkAddress.mobilePhone;
// 					a = o.WorkAddress.phone;
// 					b = o.WorkAddress.email;
// 					f = o.WorkAddress.department;
// 					C = o.WorkAddress.address;
// 				}
// 				if (o.Company && o.Company.name1) {
// 					g = o.Company.name1;
// 				}
// 				if (o.fullName && o.fullName !== "") {
// 					h = o.fullName;
// 				}
// 				if (o.Photo && o.Photo.__metadata) {
// 					var M = cus.crm.mycalendar.util.Conversions.formatPhotoUrl(o.Photo.__metadata.media_src);
// 					P = cus.crm.mycalendar.util.Conversions.urlConverter(M);
// 				}
// 				var i = {
// 					title: T,
// 					name: h,
// 					imgurl: P,
// 					department: f,
// 					contactmobile: E,
// 					contactphone: a,
// 					contactemail: b,
// 					contactemailsubj: "",
// 					companyname: g,
// 					companyaddress: C
// 				};
// 				var j = t.getView().byId("responsibleField");
// 				var k = new sap.ca.ui.quickoverview.EmployeeLaunch(i);
// 				k.openBy(j);
// 			}, function(E) {
// 				jQuery.sap.log.error("oData request for employee failed");
// 			});
// 		}
// 	},
// 	setDocumentHistory: function(o) {
// 		var d = o.DocumentHistory.results;
// 		this.newResult = o.DocumentHistory.results;
// 		var t = this;
// 		var a = t.getView().byId("DocHistory_Tab");
// 		var b = o.DocumentHistory.results.length;
// 		var c = {
// 			AppointmentDocHistory: []
// 		};
// 		for (var i = 0; i < b; i++) {
// 			var e = d[i];
// 			c.AppointmentDocHistory.push(e);
// 		}
// 		var j = new sap.ui.model.json.JSONModel();
// 		j.setData(c);
// 		a.setModel(j, "json");
// 	},
// 	navigateDocHistory: function(e) {
// 		var t = e.getSource().getText();
// 		var O = "";
// 		var g = "";
// 		for (var i = 0; i < this.newResult.length; i++) {
// 			if (t == this.newResult[i].ObjectId) {
// 				O = this.newResult[i].ObjectType;
// 				g = this.newResult[i].Guid;
// 				break;
// 			}
// 		}
// 		var f = sap.ushell && sap.ushell.Container && sap.ushell.Container.getService;
// 		this.oCrossAppNavigator = f && f("CrossApplicationNavigation");
// 		if (O === "BUS2000111") {
// 			var a = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Opportunity",
// 					action: "manageOpportunity&/display/Opportunities(guid'" + g + "')"
// 				}
// 			}) || "";
// 			window.location = a;
// 		} else if (O === "BUS2000125") {
// 			var a = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Task",
// 					action: "manageTasks&/taskOverview/Tasks(guid'" + g + "')"
// 				}
// 			}) || "";
// 			window.location = a;
// 		} else if (O === "BUS2000126") {
// 			var a = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Appointment",
// 					action: "myAppointments&/appointment/" + g
// 				}
// 			}) || "";
// 			window.location = a;
// 		} else if (O === "BUS2000108") {
// 			var a = this.oCrossAppNavigator && this.oCrossAppNavigator.hrefForExternal({
// 				target: {
// 					semanticObject: "Lead",
// 					action: "manageLead&/display/Leads(guid'" + g + "')"
// 				}
// 			}) || "";
// 			window.location = a;
// 		}
// 	},
// 	setAttendees_AccountLogo: function(o) {
// 		this.getView().byId("attContainer").setVisible(true);
// 		this.getView().byId("noteContainer").setVisible(true);
// 		this.getView().byId("note").removeAllFields();
// 		var e = this.getView().byId("externalAtt");
// 		e.removeAllFields();
// 		e.destroyLabel();
// 		var a = this.getView().byId("internalAtt");
// 		a.removeAllFields();
// 		a.destroyLabel();
// 		var b = [];
// 		b = o.Attendee.results;
// 		var A = 0;
// 		var c = 0;
// 		var C = 0;
// 		var h = new sap.ui.layout.HorizontalLayout({
// 			allowWrapping: true
// 		});
// 		var H = new sap.ui.layout.HorizontalLayout({
// 			allowWrapping: true
// 		});
// 		if (b && b !== []) {
// 			for (var i = 0; i < b.length; i++) {
// 				if (!b[i].IntAttendee && b[i].FullName !== "") {
// 					c = i;
// 					A++;
// 				} else if (b[i].IntAttendee && b[i].FullName !== "") {
// 					C = i;
// 					A++;
// 				}
// 			}
// 			for (var i = 0; i < b.length; i++) {
// 				var f;
// 				if (!b[i].IntAttendee && b[i].FullName !== "") {
// 					if (i < c) {
// 						f = b[i].FullName + ";\u00A0";
// 					} else {
// 						f = b[i].FullName;
// 					}
// 					var d = new sap.m.Link({
// 						press: [this.onExtAttendee, this],
// 						text: f
// 					});
// 					d.PartnerNo = b[i].PartnerNo;
// 					d.AccountNo = b[i].AccountNo;
// 					h.addContent(d);
// 					if (i === c) {
// 						e.addField(h);
// 						e.setLabel(new sap.m.Label({
// 							text: "{i18n>view.Appointment.external}"
// 						}));
// 					}
// 				} else if (b[i].IntAttendee && b[i].FullName !== "") {
// 					if (i < C) {
// 						f = b[i].FullName + ";\u00A0";
// 					} else {
// 						f = b[i].FullName;
// 					}
// 					var g = new sap.m.Link({
// 						press: [this.onIntAttendee, this],
// 						text: f
// 					});
// 					g.PartnerNo = b[i].PartnerNo;
// 					H.addContent(g);
// 					if (i === C) {
// 						a.addField(H);
// 						a.setLabel(new sap.m.Label({
// 							text: "{i18n>view.Appointment.internal}"
// 						}));
// 					}
// 				}
// 			}
// 			if (A === 0) {
// 				this.getView().byId("attContainer").setVisible(false);
// 			}
// 			var t = this.oBundle.getText("view.Appointment.additionalAttendeeNumber", [A]);
// 			var j = this.oBundle.getText("APPOITMENT_ATTACHMENTS", [o.AppointmentToAttachment.results.length]);
// 			this.getView().byId("formAtt").setTitle(t);
// 			this.getView().byId("panelattachment").getHeaderToolbar().getContent()[0].setText(j);
// 		}
// 		if (o.Note === "") {
// 			this.getView().byId("noteContainer").setVisible(false);
// 		} else {
// 			var n = new sap.ca.ui.ExpansibleFeedListItem({
// 				showIcon: false,
// 				maxLines: 5,
// 				text: o.Note
// 			});
// 			this.getView().byId("note").addField(n);
// 		}
// 		var k = this.getView().byId("ohdetail");
// 		k.setIcon("sap-icon://appointment");
// 		if (o.AccountRel.results && o.AccountRel.results[0] && o.AccountRel.results[0].Logo) {
// 			var m = o.AccountRel.results[0].Logo.__metadata;
// 			if (m) {
// 				var l = cus.crm.mycalendar.util.Conversions.urlConverter(cus.crm.mycalendar.util.Conversions.formatPhotoUrl(m.media_src));
// 				k.setIcon(l);
// 			}
// 		}
// 	},
// 	clearAttendees_AccountLogo: function() {
// 		this.getView().byId("formAtt").setTitle(this.oBundle.getText("view.Appointment.attendeeDataNumber", ["0"]));
// 		this.getView().byId("externalAtt").removeAllFields();
// 		this.getView().byId("internalAtt").removeAllFields();
// 		var a = this.getView().byId("ohdetail");
// 		a.setIcon("sap-icon://appointment");
// 	},
	// ERCO on
	clearAttachments: function() {
		if (this.isMock) {
			return;
		}
		var d = {
			results: []
		};
		var a = this.byId("attachmentsView");
		var A = a.getController();
		A.refresh("", d);
		this.byId('ZRelatedOpportunity').setText("");
		// if (this.isMock) {
		// 	return;
		// }
		// var d = {
		// 	results: []
		// };
		// var a = this.byId("attachmentsView");
		// var A = a.getController();
		// A.refresh("", d);
	},
	// ERCO off
// 	onExpand: function() {},
// 	getAttachments: function(a) {
// 		if (this.isMock) {
// 			return;
// 		}
// 		var A = this.byId("attachmentsView");
// 		var o = A.getController();
// 		o.refresh(this.Context, a);
// 	},
// 	deleteAppointment: function(c) {
// 		this.getView().unbindElement();
// 		if (this.isMock) {
// 			sap.ca.ui.message.showMessageToast("Not suppported in mock mode");
// 			window.history.go(-1);
// 		} else {
// 			this.oModel.remove(c, {
// 				fnSuccess: jQuery.proxy(this.successDelete, this),
// 				fnError: jQuery.proxy(this.errorSave, this)
// 			});
// 		}
// 	},
//	successDelete: function(d, r) {
// 		sap.ui.getCore().getEventBus().publish("cus.crm.mycalendar", "appointmentDeleted");
// 		var m = this.oBundle.getText("view.Appointment.deletesuccess");
// 		sap.ca.ui.message.showMessageToast(m);
// 		this.getView().unbindElement();
// 		this.clearAttendees_AccountLogo();
// 		this.clearAttachments();
// 		var h = new sap.ui.core.routing.History.getInstance();
// 		var a = h.getDirection("");
// 		if ((a && a == sap.ui.core.routing.HistoryDirection.Unknown) || (a && a == sap.ui.core.routing.HistoryDirection.Backwards)) {
// 			window.history.go(-1);
// 		} else {
// 			var D = this.getDateParameterfromDate(new Date());
// 			this.oRouter.navTo("week", {
// 				Date: D
// 			}, true);
// 		}
//	},
// 	errorSave: function(e) {
// 		this.getView().bindElement(this.Context, {
// 			expand: "Attendee,AccountRel/Logo,AppointmentToAttachment"
// 		});
// 		jQuery.sap.log.error("oData delete failed");
// 		cus.crm.mycalendar.util.Util.showErrorMessagePopup(e);
// 	},
// 	formatFromDateInHeader: function(f, t, a) {
// 		var d = "";
// 		var b;
// 		var c;
// 		if (f !== null && t !== null && a !== null) {
// 			if (typeof f === "string") {
// 				if (f.substring(0, 6) === "/Date(") {
// 					f = f.replace("/Date(", "").replace(")/", "");
// 					f = parseInt(f);
// 					f = new Date(f);
// 				} else {
// 					f = new Date(f);
// 				}
// 			}
// 			if (typeof t === "string") {
// 				if (t.substring(0, 6) === "/Date(") {
// 					t = t.replace("/Date(", "").replace(")/", "");
// 					t = parseInt(t);
// 					t = new Date(t);
// 				} else {
// 					t = new Date(t);
// 				}
// 			}
// 			var e = new Date(f);
// 			var g = new Date(t);
// 			if (a) {
// 				b = e.getTimezoneOffset();
// 				c = g.getTimezoneOffset();
// 				e.setTime(e.getTime() + b * 60 * 1000);
// 				g.setTime(g.getTime() + c * 60 * 1000);
// 			}
// 			var h = new Date(e);
// 			h.setHours(0, 0, 0, 0);
// 			var i = h.getTime();
// 			var j = new Date(g);
// 			j.setHours(0, 0, 0, 0);
// 			var k = j.getTime();
// 			var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
// 			var p = l.getDatePattern("full");
// 			var m = sap.ui.core.format.DateFormat.getDateInstance({
// 				pattern: p
// 			});
// 			var D = m.format(h);
// 			if (k == i) {
// 				d = D;
// 			} else {
// 				var n = l.getTimePattern("short");
// 				var o = sap.ui.core.format.DateFormat.getDateTimeInstance({
// 					pattern: n
// 				});
// 				if (!a) {
// 					var T = o.format(f);
// 					d = this.oBundle.getText("view.Appointment.fromTimeDate", [T, D]);
// 				} else {
// 					d = D;
// 				}
// 			}
// 		}
// 		return d;
// 	},
// 	formatToDateInHeader: function(f, t, a) {
// 		var d;
// 		var D = "";
// 		var b;
// 		var c;
// 		if (f !== null && t !== null && a !== null) {
// 			if (typeof f === "string") {
// 				if (f.substring(0, 6) === "/Date(") {
// 					f = f.replace("/Date(", "").replace(")/", "");
// 					f = parseInt(f);
// 					f = new Date(f);
// 				} else {
// 					f = new Date(d);
// 				}
// 			}
// 			if (typeof t === "string") {
// 				if (t.substring(0, 6) === "/Date(") {
// 					t = t.replace("/Date(", "").replace(")/", "");
// 					t = parseInt(t);
// 					t = new Date(t);
// 				} else {
// 					t = new Date(t);
// 				}
// 			}
// 			var e = new Date(f);
// 			var g = new Date(t);
// 			if (a) {
// 				b = e.getTimezoneOffset();
// 				c = g.getTimezoneOffset();
// 				e.setTime(e.getTime() + b * 60 * 1000);
// 				g.setTime(g.getTime() + c * 60 * 1000);
// 			}
// 			var h = new Date(e);
// 			h.setHours(0, 0, 0, 0);
// 			var i = h.getTime();
// 			var j = new Date(g);
// 			j.setHours(0, 0, 0, 0);
// 			var k = j.getTime();
// 			var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
// 			var p = l.getTimePattern("short");
// 			var m = sap.ui.core.format.DateFormat.getTimeInstance({
// 				pattern: p
// 			});
// 			var T = m.format(t);
// 			if (k == i) {
// 				if (!a) {
// 					var s = m.format(f);
// 					D = this.oBundle.getText("view.Appointment.timeToTime", [s, T]);
// 				} else {
// 					D = this.oBundle.getText("view.Appointment.alldayevent");
// 				}
// 			} else {
// 				p = l.getDatePattern("full");
// 				var n = sap.ui.core.format.DateFormat.getDateInstance({
// 					pattern: p
// 				});
// 				var o = n.format(j);
// 				if (!a) {
// 					D = this.oBundle.getText("view.Appointment.toTimeDate", [T, o]);
// 				} else {
// 					D = o;
// 				}
// 			}
// 		}
// 		return D;
// 	},
// onAfterRendering: function() {
// 	var a = this.byId("attachmentsView");
// 	var A = a.getController();
// 	var o = A.byId("attachments");
// 	o.oHeaderToolbar.setVisible(false);
// },
// 	openErrorFrag: function(e) {
// 		this.errorDetails();
// 		this.showErrorMsgFragment.open();
// 	},
// 	errorDetails: function(e) {
// 		var t = this;
// 		var m = this.getView().getModel();
// 		var v = this.getView();
// 		var o;
// 		var V = v.getBindingContext();
// 		var a;
// 		m.read(V.getPath() + "/" + "AppointmentLogSet", null, null, false, function(d, r) {
// 			a = {
// 				AppointmentLogSet: r.data.results
// 			};
// 			t.omsgcount = r.data.results.length;
// 		});
// 		this.showErrorMsgFragment.setModel(this.getView().getModel("i18n"), "i18n");
// 		var b = cus.crm.mycalendar.util.Util.geti18NText1("view.Appointment.errorMessage", this.omsgcount);
// 		this.showErrorMsgFragment.setTitle(b);
// 		var j = new sap.ui.model.json.JSONModel();
// 		j.setData(a);
// 		this.showErrorMsgFragment.setModel(j, "json");
// 	},
// 	closeErrorFrag: function() {
// 		this.showErrorMsgFragment.close();
// 	},
});