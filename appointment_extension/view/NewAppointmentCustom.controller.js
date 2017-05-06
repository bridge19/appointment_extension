/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("cus.crm.mycalendar.util.Conversions");
jQuery.sap.require("cus.crm.mycalendar.util.Util");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.ui.utils.resourcebundle");
jQuery.sap.require("cus.crm.mycalendar.util.Schema");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("cus.crm.mycalendar.util.Schema");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("cus.crm.mycalendar.CRM_MYCALExtension.util.Common");
jQuery.sap.require("cus.crm.mycalendar.CRM_MYCALExtension.util.Util");
sap.ui.controller("cus.crm.mycalendar.CRM_MYCALExtension.view.NewAppointmentCustom", {
	SalesOrgs: [],
	SalesOffs: [],
	SalesGrps: [],
	MyOpportunities: [],
	onInit: function() {
		var that = this;
		this.oRouter.attachRouteMatched(function(e) {
			var v = e.getParameter("name").toLowerCase();
			var p = e.getParameter("arguments").processType;
			if (p !== undefined) {
				switch (v) {
					case "newappointmentfromnote":
					case "followupappointmentfromtask":
					case "newappointmentfromoppt":
					case "newappointmentfromaccount":
					case "newappointment":
					case "followupappointment":
						that.setStatusDefault(p);
						break;
					case "editappointment":
					case "week":
					case "fullscreen":
					default:
						break;
				}
			}
		});
		// 		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
		// 		if (!this.oApplicationFacade.getApplicationModel("customizing")) {
		// 			cus.crm.mycalendar.util.Util.initCustomizingModel(this);
		// 		}
		// 		this.oModel = this.oApplicationFacade.getODataModel();
		// 		this.oModel.setRefreshAfterChange(false);
		// 		this.isMock = this.oApplicationFacade.isMock();
		// 		this.getView().setModel(this.oModel);
		// 		this.sBackendVersion = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
		// 		this.followupappointment = false;
		// 		this.followupappointmentfromtask = false;
		// 		this.newappointmentfromoppt = false;
		// 		this.newappointmentfromaccount = false;
		// 		this.createFromAccount = false;
		// 		this.newAppointment = false;
		// 		this.sViewId = this.getView().getId();
		// 		this.oBusyDialog = new sap.m.BusyDialog();
		// 		this.oRouter.attachRouteMatched(function(e) {
		// 			jQuery.sap.log.info("### nav target:  " + e.getParameter("name"));
		// 			this._interopChecks(this.sBackendVersion);
		// 			var S = this.getView().getModel("startupParameters");
		// 			if (e.getParameter("name") === "newappointmentfromnote") {
		// 				this.byId("p").scrollTo(0);
		// 				if (S && S.oData) {
		// 					if (S.oData.parameters) {
		// 						for (var a in S.oData.parameters) {
		// 							if (S.oData.parameters[a].key == "itemPaths") {
		// 								this.createdfromNotes = true;
		// 								var I = S.oData.parameters[a].value.split(",");
		// 								this.oModelHandler = new cus.crm.notes.handler.ModelHandler();
		// 								this.sNote = this.oModelHandler.getSectionsText(I);
		// 							}
		// 							if (S.oData.parameters[a].key == "privateFlag") {
		// 								this.privateFlag = jQuery.parseJSON(S.oData.parameters[a].value);
		// 							}
		// 							if (S.oData.parameters[a].key == "processType") {
		// 								this.processType = S.oData.parameters[a].value;
		// 							}
		// 						}
		// 					}
		// 					delete S.oData.parameters[a];
		// 				}
		// 				var t = this;
		// 				var b = [];
		// 				var m = this.getView().getModel();
		// 				var P = "/TransactionTypes";
		// 				b.push(m.createBatchOperation(P, "GET"));
		// 				m.addBatchReadOperations(b);
		// 				var c = 1;
		// 				var o = this;
		// 				m.submitBatch(jQuery.proxy(function(R) {
		// 					if (R.__batchResponses[0].data) {
		// 						for (var i = 0; i < R.__batchResponses[0].data.results.length; i++) {
		// 							if (R.__batchResponses[0].data.results[i].ProcessTypeCode === o.processType) {
		// 								o.processTypeDesFromNote = R.__batchResponses[0].data.results[i].Description;
		// 								o.privateFlag = R.__batchResponses[0].data.results[i].PrivateFlag;
		// 								break;
		// 							}
		// 						}
		// 					}
		// 				}, this), jQuery.proxy(function() {}, this), false);
		// 				var d = e.getParameter("arguments").processType;
		// 				this.createAppointment(new Date(), d);
		// 				if (this.sNote) {
		// 					var v = this.getView().getModel("vm");
		// 					v.oData.Note = this.sNote;
		// 				}
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (e.getParameter("name") === "followupappointmentfromtask") {
		// 				this.followupappointmentfromtask = true;
		// 				this.byId("p").scrollTo(0);
		// 				if (S && S.oData) {
		// 					if (S.oData.parameters) {
		// 						for (var a in S.oData.parameters) {
		// 							if (S.oData.parameters[a].key == "taskId") {
		// 								this.taskId = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "title") {
		// 								this.title = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "FUA") {
		// 								this.createFromTasks = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "AccountID") {
		// 								this.AccountID = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "ContactID") {
		// 								this.ContactID = S.oData.parameters[a].value;
		// 							}
		// 						}
		// 					}
		// 					delete S.oData.parameters[a];
		// 				}
		// 				var d = e.getParameter("arguments").processType;
		// 				this.processTypeDesFromTask = d;
		// 				var t = this;
		// 				var b = [];
		// 				var m = this.getView().getModel();
		// 				var f = [];
		// 				f.push("/TransactionTypes");
		// 				if (this.AccountID !== "") f.push("/AccountCollection(" + m.formatValue(this.AccountID, "Edm.String") + ")");
		// 				if (this.ContactID !== "") {
		// 					var F = m.formatValue(this.ContactID, "Edm.String");
		// 					var E = jQuery.sap.encodeURL("contactID eq " + F);
		// 					f.push("/ContactCollection?$filter=" + E);
		// 				}
		// 				for (var i = 0; i < f.length; i++) {
		// 					b.push(m.createBatchOperation(f[i], "GET"));
		// 				}
		// 				m.addBatchReadOperations(b);
		// 				var c = 3;
		// 				var o = this;
		// 				m.submitBatch(jQuery.proxy(function(R) {
		// 					for (var j = 0; j < R.__batchResponses.length; j++) {
		// 						switch (j) {
		// 							case 0:
		// 								if (R.__batchResponses[0].data) {
		// 									for (var i = 0; i < R.__batchResponses[0].data.results.length; i++) {
		// 										if (R.__batchResponses[0].data.results[i].ProcessTypeCode === o.processTypeDesFromTask) {
		// 											o.processTypeDesFromTask = R.__batchResponses[0].data.results[i].Description;
		// 											o.privateFlag = R.__batchResponses[0].data.results[i].PrivateFlag;
		// 										}
		// 									}
		// 								}
		// 								break;
		// 							default:
		// 								if (R.__batchResponses[j].data.__metadata)
		// 									if (R.__batchResponses[j].data.__metadata.type.search("Account") !== -1) this.AccountName = R.__batchResponses[j].data.fullName;
		// 								if (R.__batchResponses[j].data.results)
		// 									if (R.__batchResponses[j].data.results[0].__metadata.type.search("Contact") !== -1) this.ContactName = R.__batchResponses[j].data
		// 										.results[0].fullName;
		// 								break;
		// 						}
		// 					}
		// 				}, this), jQuery.proxy(function() {}, this), false);
		// 				this.createAppointment(new Date(), d);
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (e.getParameter("name") === "newappointmentfromoppt") {
		// 				if (!this.oApplicationFacade.getApplicationModel("fromOpportunity")) {
		// 					cus.crm.mycalendar.util.Util.initFollowUpModel(this, "fromOpportunity");
		// 				}
		// 				var g = {
		// 					key: e.getParameter("name")
		// 				};
		// 				this.oApplicationFacade.getApplicationModel("fromOpportunity").setData(g);
		// 				this.newappointmentfromoppt = true;
		// 				this.byId("p").scrollTo(0);
		// 				if (S && S.oData) {
		// 					if (S.oData.parameters) {
		// 						for (var a in S.oData.parameters) {
		// 							if (S.oData.parameters[a].key == "AccountID") {
		// 								this.AccountID = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "EmpID") {
		// 								this.Responsible = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "opportunityId") {
		// 								this.opportunityId = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "title") {
		// 								this.title = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "createFromOppt") {
		// 								this.createFromOppt = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "ContactID") {
		// 								this.ContactID = S.oData.parameters[a].value;
		// 							}
		// 							if (S.oData.parameters[a].key == "processType") {
		// 								this.processTypefromoppt = S.oData.parameters[a].value;
		// 							}
		// 						}
		// 					}
		// 					delete S.oData.parameters[a];
		// 				}
		// 				var t = this;
		// 				var b = [];
		// 				var m = this.getView().getModel();
		// 				var h = "/AccountCollection('" + this.AccountID + "')";
		// 				var k = "/ContactCollection(contactID='" + this.ContactID + "',accountID='" + this.AccountID + "')";
		// 				var l = "/EmployeeCollection('" + this.Responsible + "')";
		// 				var P = "/TransactionTypes";
		// 				b.push(m.createBatchOperation(h, "GET"));
		// 				b.push(m.createBatchOperation(k, "GET"));
		// 				b.push(m.createBatchOperation(l, "GET"));
		// 				b.push(m.createBatchOperation(P, "GET"));
		// 				m.addBatchReadOperations(b);
		// 				var c = 4;
		// 				var o = this;
		// 				m.submitBatch(jQuery.proxy(function(R) {
		// 					t.AccountName = R.__batchResponses[0].data.fullName;
		// 					t.ContactName = R.__batchResponses[1].data.fullName;
		// 					t.ResponsibleTxt = R.__batchResponses[2].data.fullName;
		// 					if (R.__batchResponses[3].data) {
		// 						for (var i = 0; i < R.__batchResponses[3].data.results.length; i++) {
		// 							if (R.__batchResponses[3].data.results[i].ProcessTypeCode === o.processTypefromoppt) {
		// 								o.processTypeDescriptionfromoppt = R.__batchResponses[3].data.results[i].Description;
		// 								o.privateFlag = R.__batchResponses[3].data.results[i].PrivateFlag;
		// 								break;
		// 							}
		// 						}
		// 					}
		// 				}, this), jQuery.proxy(function() {}, this), false);
		// 				var d = e.getParameter("arguments").processType;
		// 				this.createAppointment(new Date(), d);
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (e.getParameter("name") === "newappointmentfromaccount") {
		// 				this.byId("p").scrollTo(0);
		// 				this.newappointmentfromaccount = true;
		// 				this.createFromAccount = true;
		// 				var m = this.oConnectionManager.getModel();
		// 				var d = e.getParameter("arguments").processType;
		// 				var n = m.getProperty("TransactionTypeSet");
		// 				var B = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
		// 				if (!n) m.read(((parseFloat(B) >= 4.0)) ? "TransactionTypes" : "TransactionTypeSet", null, null, false, function(j, R) {
		// 					n = {
		// 						TransactionTypeSet: R.data.results
		// 					};
		// 				});
		// 				for (var i = 0; i < n.TransactionTypeSet.length; i++) {
		// 					if (n.TransactionTypeSet[i].ProcessTypeCode === d) {
		// 						this.processTypeDescriptionFromAccount = n.TransactionTypeSet[i].Description;
		// 						this.privateFlag = n.TransactionTypeSet[i].PrivateFlag;
		// 						break;
		// 					}
		// 				};
		// 				var q = e.getParameter("arguments").accountContextPath;
		// 				var A = m.getProperty(q);
		// 				var t = this;
		// 				var r = function(A) {
		// 					t.AccountID = A.accountID;
		// 					if (A.fullName) t.AccountName = A.fullName;
		// 					else t.AccountName = A.name1;
		// 				};
		// 				if (!A) {
		// 					m.createBindingContext("/" + q, "", function() {
		// 						A = m.getProperty("/" + q);
		// 						r(A);
		// 						t.createAppointment(null, d);
		// 						window.setTimeout(jQuery.proxy(t._scrollToTop, t), 10);
		// 					}, true);
		// 				} else {
		// 					r(A);
		// 					this.createAppointment(null, d);
		// 					window.setTimeout(jQuery.proxy(t._scrollToTop, t), 10);
		// 				}
		// 			}
		// 			if (e.getParameter("name") === "newappointment") {
		// 				this.newAppointment = true;
		// 				this.byId("p").scrollTo(0);
		// 				var D = e.getParameter("arguments").Date;
		// 				var d = e.getParameter("arguments").processType;
		// 				this.privateFlag = jQuery.parseJSON(e.getParameter("arguments").privateFlag);
		// 				this.createAppointment(this.getDatefromParameterString(D), d);
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (e.getParameter("name") === "editappointment") {
		// 				this.byId("p").scrollTo(0);
		// 				var u = e.getParameter("arguments").AppointmentID;
		// 				this.Context = "/AppointmentSet(guid'" + u + "')";
		// 				if (this.isMock) {
		// 					this.Context = "/AppointmentSet(Guid='" + u + "')";
		// 				}
		// 				this.getView().bindElement(this.Context);
		// 				this.editAppointment(this.Context, u);
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (e.getParameter("name") === "followupappointment") {
		// 				this.followupappointment = true;
		// 				this.byId("p").scrollTo(0);
		// 				var u = e.getParameter("arguments").AppointmentGuid;
		// 				var d = e.getParameter("arguments").processType;
		// 				this.privateFlag = jQuery.parseJSON(e.getParameter("arguments").privateFlag);
		// 				this.Context = "/AppointmentSet(guid'" + u + "')";
		// 				if (this.isMock) {
		// 					this.Context = "/AppointmentSet(Guid='" + u + "')";
		// 				}
		// 				this.getView().bindElement(this.Context);
		// 				this.followupAppointment(this.Context, u, d);
		// 				window.setTimeout(jQuery.proxy(this._scrollToTop, this), 10);
		// 			}
		// 			if (this.extHookCustomLogicOnRouteMatched) {
		// 				this.extHookCustomLogicOnRouteMatched(e);
		// 			}
		// 		}, this);
		// 		var s = new sap.ui.model.json.JSONModel({});
		// 		this.getView().setModel(s, "statusmodel");
		// 		if (parseFloat(this.sBackendVersion) >= 4) {
		// 			var p = new sap.ui.model.json.JSONModel({});
		// 			this.getView().setModel(p, "priomodel");
		// 		}
		// 		this.oViewModel = new sap.ui.model.json.JSONModel({});
		// 		this.getView().setModel(this.oViewModel, "vm");
		// 		this.getView().setModel(new sap.ui.model.json.JSONModel({}), "vmh");
		// 		this.getView().setModel(new sap.ui.model.json.JSONModel({}), "viewState");
		// 		this.bUpdate = false;
		// 		this.followup = false;
		// 		this.oBundle = this.oApplicationFacade.getResourceBundle();
		//  ERCO on
		this.Common = cus.crm.mycalendar.CRM_MYCALExtension.util.Common;
		this.byId("bs").mProperties.type = "";
		//  ERCO off
	},
	// 	getDatefromParameterString: function parse(s) {
	// 		if (!/^(\d){8}$/.test(s)) return null;
	// 		var y = s.substr(0, 4),
	// 			m = s.substr(4, 2) - 1,
	// 			d = s.substr(6, 2);
	// 		return new Date(y, m, d);
	// 	},
	// 	onBeforeRendering: function() {
	// 		var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
	// 		this.byId("fd").setFirstDayOffset(l.getFirstDayOfWeek());
	// 		this.byId("td").setFirstDayOffset(l.getFirstDayOfWeek());
	// 		if (this.createFromOppt) {
	// 			if (this.AccountName != null) {
	// 				this.byId("ia").setValue(this.AccountName);
	// 				this.getView().getModel('vm').oData.AccountTxt = this.AccountName;
	// 			}
	// 			if (this.ContactName != null) {
	// 				this.byId("ic").setValue(this.ContactName);
	// 			}
	// 			if (this.title != null) {
	// 				this.byId("desc").setValue(this.title);
	// 			}
	// 		}
	// 		if (this.createFromTasks) {
	// 			if (this.title != "") {
	// 				this.byId("desc").setValue(this.title);
	// 			}
	// 		}
	// 		this.enableSaveBtn();
	// 	},
	// 	onAfterRendering: function() {
	// 		var a = this.byId("attachmentsView_chg1");
	// 		var A = a.getController();
	// 		var o = A.byId("attachments");
	// 		if (o.oNumberOfAttachmentsLabel) {
	// 			o.oNumberOfAttachmentsLabel.setVisible(false);
	// 			o.oNumberOfAttachmentsLabel.setText("");
	// 		}
	// 	},
	// 	getViewEntity: function() {
	// 		return this.getView().getModel("vm").getData();
	// 	},
	// 	createAppointment: function(s, p) {
	// 		var t = this;
	// 		this.byId("attachmentsView_chg1").setVisible(false);
	// 		this.byId("attachmentsView_chg1").setVisible(false);
	// 		var f, T;
	// 		this.bUpdate = false;
	// 		this.followup = false;
	// 		this.iCounter = 50;
	// 		this._setViewMode("CREATE");
	// 		if (this.privateFlag == false) {
	// 			this.byId("pf").setEnabled(false);
	// 		} else {
	// 			this.byId("pf").setEnabled(true);
	// 		} if (p === undefined) {
	// 			var n = {
	// 				"Description": "",
	// 				"PrivatFlag": false,
	// 				"AllDay": false,
	// 				"FromDate": "",
	// 				"ToDate": "",
	// 				"Location": "",
	// 				"Account": (this.AccountID != null) ? this.AccountID : "",
	// 				"AccountTxt": (this.AccountName != null) ? this.AccountName : "",
	// 				"Contact": (this.ContactID != null) ? this.ContactID : "",
	// 				"ContactTxt": "",
	// 				"Note": "",
	// 				"Status": "",
	// 				"StatusTxt": ""
	// 			};
	// 		} else {
	// 			var P = "";
	// 			if (this.createFromOppt) {
	// 				P = this.opportunityId;
	// 			}
	// 			if (this.createFromTasks) {
	// 				P = this.taskId;
	// 			}
	// 			var n = {
	// 				"Description": "",
	// 				"PrivatFlag": false,
	// 				"AllDay": false,
	// 				"FromDate": "",
	// 				"ToDate": "",
	// 				"Location": "",
	// 				"Responsible": (this.Responsible) ? this.Responsible : "",
	// 				"ResponsibleTxt": (this.ResponsibleTxt) ? this.ResponsibleTxt : "",
	// 				"Account": (this.AccountID) ? this.AccountID : "",
	// 				"AccountTxt": (this.AccountName) ? this.AccountName : "",
	// 				"Contact": (this.ContactID) ? this.ContactID : "",
	// 				"ContactTxt": (this.ContactName) ? this.ContactName : "",
	// 				"Note": "",
	// 				"Status": "",
	// 				"StatusTxt": "",
	// 				"TransactionType": p,
	// 				"PredecessorID": P,
	// 			};
	// 		} if (!this.oNewStatus) {
	// 			if (this.isMock) {
	// 				this.getView().getModel("statusmodel").loadData("/cus.crm.mycalendar/model/Status.json", "", true);
	// 				this.getView().getModel("statusmodel").attachRequestCompleted(this, function() {
	// 					t.oNewStatus = t.getView().getModel("statusmodel").getData();
	// 					n.Status = t.oNewStatus.results[0].StatusID;
	// 					var d = t.getView().getModel('vm').oData;
	// 					var g = d.AccountTxt;
	// 					var h = d.Account;
	// 					t.byId('ia').setValue(cus.crm.mycalendar.util.Conversions.formatAccountText(g, h));
	// 					var j = d.ContactTxt;
	// 					t.byId("ic").setValue(j);
	// 					window.setTimeout(function() {
	// 						t.oStartEntityString = JSON.stringify(d);
	// 						t.enableSaveBtn();
	// 					}, 10);
	// 				}, this);
	// 			} else {
	// 				var r = cus.crm.mycalendar.util.Util.getCustomizing(p, this);
	// 				if (r === false) {
	// 					window.setTimeout(jQuery.proxy(function() {
	// 						var V = this._getViewMode();
	// 						if (V === "ERROR") {
	// 							cus.crm.mycalendar.util.Util.showErrMsgBox(this.sErrMsg);
	// 						}
	// 					}, this), 10);
	// 					return;
	// 				}
	// 				var v = this.getView().getModel("vm");
	// 				if (parseFloat(this.sBackendVersion) >= 4) {
	// 					var c = this.oApplicationFacade.getApplicationModel("customizing");
	// 					var d = c.oData;
	// 					var a = this.getView().getModel("statusmodel");
	// 					var b = this.getView().getModel("priomodel");
	// 					b.setData({
	// 						results: d.UserPriorities
	// 					});
	// 					a.setData({
	// 						results: d.mStatuses[p]
	// 					});
	// 					var D = cus.crm.mycalendar.util.Util.getDefaultPriority(p, this);
	// 					if (D !== null && D !== undefined) {
	// 						n.Priority = D.Priority;
	// 						n.PriorityTxt = D.TxtLong;
	// 					} else {
	// 						n.Priority = d.UserPriorities[0].Priority;
	// 						n.PriorityTxt = d.UserPriorities[0].TxtLong;
	// 					}
	// 					var o = cus.crm.mycalendar.util.Util.getDefaultStatus(d.mStatuses[p]);
	// 					if (o !== null && o !== undefined) {
	// 						n.Status = o.statusID;
	// 						n.StatusTxt = o.StatusTxt;
	// 					} else {
	// 						n.Status = d.mStatuses[p].statusID;
	// 						n.StatusTxt = d.mStatuses[p].StatusTxt;
	// 					}
	// 					var e = cus.crm.mycalendar.util.Util.getLoggedInEmployee(this);
	// 					this.EmpResId = e.PartnerNo;
	// 					n.Responsible = e.PartnerNo;
	// 					n.ResponsibleTxt = e.Fullname;
	// 				} else {
	// 					var c = this.oApplicationFacade.getApplicationModel("customizing");
	// 					var d = c.oData;
	// 					var a = this.getView().getModel("statusmodel");
	// 					a.setData({
	// 						results: d.mStatuses[p]
	// 					});
	// 					var o = cus.crm.mycalendar.util.Util.getDefaultStatus(d.mStatuses[p]);
	// 					if (o !== null) {
	// 						n.Status = o.statusID;
	// 						n.StatusTxt = o.StatusTxt;
	// 					}
	// 				}
	// 				var t = this;
	// 				var g = v.oData.AccountTxt;
	// 				var h = v.oData.Account;
	// 				this.byId('ia').setValue(cus.crm.mycalendar.util.Conversions.formatAccountText(g, h));
	// 				var j = v.oData.ContactTxt;
	// 				this.byId("ic").setValue(j);
	// 				window.setTimeout(function() {
	// 					t.oStartEntityString = JSON.stringify(d);
	// 					t.enableSaveBtn();
	// 				}, 10);
	// 				v.updateBindings();
	// 			}
	// 		} else {
	// 			this.getView().getModel("statusmodel").setData(this.oNewStatus);
	// 			if (this.oNewStatus.results) {
	// 				var i;
	// 				for (i = 0; i < this.oNewStatus.results.length; i++) {
	// 					if (this.oNewStatus.results[i].Default == true) {
	// 						n.Status = this.oNewStatus.results[i].StatusID;
	// 						this.byId("st").setSelectedKey(n.Status);
	// 						break;
	// 					}
	// 				}
	// 			}
	// 		} if (p !== undefined) {
	// 			n.TransactionType = p;
	// 		}
	// 		if (s) {
	// 			f = new Date(s.getFullYear(), s.getMonth(), s.getDate());
	// 			T = new Date(s.getFullYear(), s.getMonth(), s.getDate());
	// 		} else {
	// 			f = new Date();
	// 			T = new Date();
	// 		}
	// 		this.setDefaultTimes(f, T);
	// 		this.setTimeHelperModel(f, T);
	// 		n.FromDate = f;
	// 		n.ToDate = T;
	// 		this.byId("p").bindProperty("title", "i18n>view.Appointment.newapptitle");
	// 		this.getView().getModel("vm").setData(n);
	// 		this.getView().getModel("vm").updateBindings();
	// 		this.setAllDay(n.AllDay);
	// 		if (!this.isMock) {
	// 			var k = {
	// 				results: []
	// 			};
	// 			var A = this.byId("attachmentsView_chg1");
	// 			var l = A.getController();
	// 			var m = 1;
	// 			l.refresh("", k, m);
	// 		}
	// 		var q = this.getAttendeeStrings(n.Attendee);
	// 		this.byId("atin").setText(q.internal);
	// 		this.byId("atex").setText(q.external);
	// 		this.byId("desc").setMaxLength(40);
	// 		this.byId("loc").setMaxLength(100);
	// 		var d = t.getView().getModel('vm').oData;
	// 		var g = d.AccountTxt;
	// 		var h = d.Account;
	// 		t.byId('ia').setValue(cus.crm.mycalendar.util.Conversions.formatAccountText(g, h));
	// 		var j = d.ContactTxt;
	// 		t.byId("ic").setValue(j);
	// 		this.getView().byId("TypecFormElement").setVisible(false);
	// 		this.getView().byId("ProcessTypeLabel").setVisible(false);
	// 		this.getView().byId("ProcessTypeText").setVisible(false);
	// 		var u = null;
	// 		if (this.createFromTasks) u = this.processTypeDesFromTask;
	// 		else if (this.createFromOppt) u = this.processTypeDescriptionfromoppt;
	// 		else if (this.createdfromNotes) u = this.processTypeDesFromNote;
	// 		else if (this.createFromAccount) u = this.processTypeDescriptionFromAccount;
	// 		else {
	// 			if (this.getView().getModel("controllers")) {
	// 				var w = this.getView().getModel("controllers").getData().apptListController;
	// 				if (w != null || w != undefined) {
	// 					u = w.processTypeDesc;
	// 				}
	// 			}
	// 		} if (u != null) {
	// 			this.getView().byId("TypecFormElement").setVisible(true);
	// 			this.getView().byId("ProcessTypeLabel").setVisible(true);
	// 			this.getView().byId("ProcessTypeText").setVisible(true);
	// 			this.getView().byId("ProcessTypeText").setText(u);
	// 		}
	// 		window.setTimeout(function() {
	// 			t.oStartEntityString = JSON.stringify(d);
	// 			t.enableSaveBtn();
	// 		}, 10);
	// 		if (this.extHookCreateAppointment) {
	// 			this.extHookCreateAppointment();
	// 		}
	// 	},
	// 	editAppointment: function(e, a) {
	// 		var s;
	// 		var b;
	// 		var c;
	// 		var d;
	// 		this.sEntityPath = e;
	// 		this.sApptGuid = a;
	// 		this._setViewMode("EDIT");
	// 		this.followup = false;
	// 		this.bUpdate = true;
	// 		this.iCounter = 50;
	// 		this.byId("responsible").setVisible(true);
	// 		this.byId("attachmentsView_chg1").setVisible(true);
	// 		var t = this;
	// 		var p;
	// 		if (this.oModel.read) {
	// 			this.oModel.read(e, null, ["$expand=Attendee,AppointmentToAttachment"], false, function(o, h) {
	// 				jQuery.sap.log.info("edit view - oData read success");
	// 				if (parseFloat(t.sBackendVersion) >= 4) {
	// 					cus.crm.mycalendar.util.Util._saveETag(o.__metadata.etag);
	// 				}
	// 				var A = o.Attendee.results;
	// 				var E = o;
	// 				p = o.TransactionType;
	// 				E.Attendee = A;
	// 				if (o.ProcessTypeDescription == null) {
	// 					t.getView().byId("TypecFormElement").setVisible(false);
	// 					t.getView().byId("ProcessTypeLabel").setVisible(false);
	// 					t.getView().byId("ProcessTypeText").setVisible(false);
	// 				} else {
	// 					t.getView().byId("TypecFormElement").setVisible(true);
	// 					t.getView().byId("ProcessTypeLabel").setVisible(true);
	// 					t.getView().byId("ProcessTypeText").setVisible(true);
	// 					t.getView().byId("ProcessTypeText").setText(o.ProcessTypeDescription);
	// 				} if (parseFloat(t.sBackendVersion) >= 3) {
	// 					if (E.PrivateAllowed == false) {
	// 						t.byId("responsibleText").setEnabled(true);
	// 					} else {
	// 						if (o.MyOwn == false) {
	// 							t.byId("pf").setEnabled(false);
	// 							t.byId("responsibleText").setEnabled(true);
	// 						} else {
	// 							if (t.byId("pf").getState()) {
	// 								t.byId("responsibleText").setEnabled(false);
	// 							} else {
	// 								t.byId("responsibleText").setEnabled(true);
	// 							}
	// 							t.byId("pf").setEnabled(true);
	// 						}
	// 					}
	// 				}
	// 				if (t.isMock) {
	// 					o.FromDate = t.adaptMockDate(o.FromDate);
	// 					o.ToDate = t.adaptMockDate(o.ToDate);
	// 				}
	// 				if (E.AllDay) {
	// 					s = E.FromDate.getTimezoneOffset();
	// 					b = E.ToDate.getTimezoneOffset();
	// 					c = s * 60 * 1000;
	// 					d = b * 60 * 1000;
	// 					E.FromDate.setTime(E.FromDate.getTime() + c);
	// 					E.ToDate.setTime(E.ToDate.getTime() + d);
	// 				}
	// 				t.getView().getModel("vm").setData(E);
	// 				t.getView().getModel("vm").updateBindings();
	// 				t.statusCode = t.getView().getModel("vm").oData.Status;
	// 				t.setTimeHelperModel(E.FromDate, E.ToDate);
	// 				t.byId("ft").setVisible(!E.AllDay);
	// 				t.byId("tt").setVisible(!E.AllDay);
	// 				if (!t.isMock) {
	// 					var i = t.byId("attachmentsView_chg1");
	// 					var j = i.getController();
	// 					i.bindElement(e);
	// 					var m = 1;
	// 					j.refresh(e, o.AppointmentToAttachment, m);
	// 				}
	// 				var k = t.getAttendeeStrings(E.Attendee);
	// 				t.byId("atin").setText(k.internal);
	// 				t.byId("atex").setText(k.external);
	// 				t.byId("p").bindProperty("title", "i18n>view.Appointment.editappointment");
	// 				t.byId("desc").setMaxLength(40);
	// 				t.byId("loc").setMaxLength(100);
	// 				var D = t.getView().getModel('vm').oData;
	// 				var l = D.AccountTxt;
	// 				var n = D.Account;
	// 				t.byId('ia').setValue(cus.crm.mycalendar.util.Conversions.formatAccountText(l, n));
	// 			}, function(E) {
	// 				jQuery.sap.log.error("edit view - oData read request failed");
	// 			});
	// 			if (this.isMock) {
	// 				if (!this.oNewStatus) {
	// 					this.getView().getModel("statusmodel").loadData("/cus.crm.mycalendar/model/Status.json", "", true);
	// 					this.getView().getModel("statusmodel").attachRequestCompleted(this, function() {
	// 						this.oNewStatus = this.getView().getModel("statusmodel").getData();
	// 					}, this);
	// 				}
	// 			} else {
	// 				var r = cus.crm.mycalendar.util.Util.getCustomizing(p, this);
	// 				if (r === false) {
	// 					window.setTimeout(jQuery.proxy(function() {
	// 						var V = this._getViewMode();
	// 						if (V === "ERROR") {
	// 							cus.crm.mycalendar.util.Util.showErrMsgBox(this.sErrMsg);
	// 						}
	// 					}, this), 10);
	// 					return;
	// 				}
	// 				var v = this.getView().getModel("vm");
	// 				var C = this.oApplicationFacade.getApplicationModel("customizing");
	// 				var D = C.oData;
	// 				var f = this.getView().getModel("statusmodel");
	// 				var S = (parseFloat(this.sBackendVersion) >= 4) ? D.mNextPossibleStatuses[p] : D.mStatuses[p];
	// 				f.setData({
	// 					results: S
	// 				});
	// 				if (parseFloat(this.sBackendVersion) >= 4) {
	// 					var g = this.getView().getModel("priomodel");
	// 					g.setData({
	// 						results: D.UserPriorities
	// 					});
	// 				}
	// 				v.updateBindings();
	// 			}
	// 		}
	// 		if (this.extHookEditAppointment) {
	// 			this.extHookEditAppointment(e, a);
	// 		}
	// 		window.setTimeout(function() {
	// 			t.oStartEntityString = JSON.stringify(t.getView().getModel("vm").getData());
	// 		}, 10);
	// 	},
	// 	followupAppointment: function(e, a, p) {
	// 		var s;
	// 		var b;
	// 		var c;
	// 		var d;
	// 		this.bUpdate = false;
	// 		this._setViewMode("CREATE");
	// 		this.followup = true;
	// 		this.iCounter = 50;
	// 		this.byId("responsible").setVisible(true);
	// 		var t = this;
	// 		var P;
	// 		if (this.oModel.read) {
	// 			this.oModel.read(e, null, ["$expand=Attendee,AppointmentToAttachment"], false, function(o, h) {
	// 				jQuery.sap.log.info("edit view - oData read success");
	// 				var A = o.Attendee.results;
	// 				var E = o;
	// 				P = p;
	// 				E.TransactionType = p;
	// 				E.PrivatFlag = t.privateFlag;
	// 				E.Attendee = A;
	// 				E.PredecessorGUID = a;
	// 				if (t.isMock) {
	// 					o.FromDate = t.adaptMockDate(o.FromDate);
	// 					o.ToDate = t.adaptMockDate(o.ToDate);
	// 				}
	// 				var F = new Date();
	// 				var T = new Date();
	// 				t.setDefaultTimes(F, T);
	// 				E.FromDate = F;
	// 				E.ToDate = T;
	// 				E.Guid = undefined;
	// 				t.getView().getModel("vm").setData(E);
	// 				t.getView().getModel("vm").updateBindings();
	// 				t.setTimeHelperModel(E.FromDate, E.ToDate);
	// 				t.byId("ft").setVisible(!E.AllDay);
	// 				t.byId("tt").setVisible(!E.AllDay);
	// 				var i = t.getView().getBindingContext().getPath();
	// 				var j = t.getAttendeeStrings(E.Attendee);
	// 				t.byId("atin").setText(j.internal);
	// 				t.byId("atex").setText(j.external);
	// 				t.byId("p").bindProperty("title", "i18n>view.Appointment.newapptitle");
	// 				t.byId("desc").setMaxLength(40);
	// 				t.byId("loc").setMaxLength(100);
	// 				t.byId("loc").setValue("");
	// 				var D = t.getView().getModel('vm').oData;
	// 				var k = D.AccountTxt;
	// 				var l = D.Account;
	// 				t.byId('ia').setValue(cus.crm.mycalendar.util.Conversions.formatAccountText(k, l));
	// 				t.getView().byId("TypecFormElement").setVisible(false);
	// 				t.getView().byId("ProcessTypeLabel").setVisible(false);
	// 				t.getView().byId("ProcessTypeText").setVisible(false);
	// 				var m = null;
	// 				var n = t.oApplicationFacade.getApplicationModel("detailController").getData().detailController;
	// 				if (n != null || n != undefined) {
	// 					m = n.ProcessTypeDescription;
	// 					if (m != null) {
	// 						t.getView().byId("TypecFormElement").setVisible(true);
	// 						t.getView().byId("ProcessTypeLabel").setVisible(true);
	// 						t.getView().byId("ProcessTypeText").setVisible(true);
	// 						t.getView().byId("ProcessTypeText").setText(m);
	// 					}
	// 				}
	// 				window.setTimeout(function() {
	// 					t.oStartEntityString = JSON.stringify(D);
	// 					t.enableSaveBtn();
	// 				}, 10);
	// 			}, function(E) {
	// 				jQuery.sap.log.error("edit view - oData read request failed");
	// 			});
	// 			if (this.isMock) {
	// 				if (!this.oNewStatus) {
	// 					this.getView().getModel("statusmodel").loadData("/cus.crm.mycalendar/model/Status.json", "", true);
	// 					this.getView().getModel("statusmodel").attachRequestCompleted(this, function() {
	// 						this.oNewStatus = this.getView().getModel("statusmodel").getData();
	// 					}, this);
	// 				}
	// 			} else {
	// 				var r = cus.crm.mycalendar.util.Util.getCustomizing(p, this);
	// 				if (r === false) {
	// 					window.setTimeout(jQuery.proxy(function() {
	// 						var V = this._getViewMode();
	// 						if (V === "ERROR") {
	// 							cus.crm.mycalendar.util.Util.showErrMsgBox(this.sErrMsg);
	// 						}
	// 					}, this), 10);
	// 					return;
	// 				}
	// 				var v = this.getView().getModel("vm");
	// 				if (parseFloat(this.sBackendVersion) >= 4) {
	// 					var C = this.oApplicationFacade.getApplicationModel("customizing");
	// 					var D = C.oData;
	// 					var f = this.getView().getModel("statusmodel");
	// 					var g = this.getView().getModel("priomodel");
	// 					g.setData({
	// 						results: D.UserPriorities
	// 					});
	// 					f.setData({
	// 						results: D.mStatuses[p]
	// 					});
	// 				}
	// 				v.updateBindings();
	// 			}
	// 		}
	// 		this.enableSaveBtn();
	// 		window.setTimeout(function() {
	// 			t.oStartEntityString = JSON.stringify(t.getView().getModel("vm").getData());
	// 			t.enableSaveBtn();
	// 		}, 10);
	// 	},
	// 	getAttendeeStrings: function(a) {
	// 		var I = "",
	// 			e = "",
	// 			A = 0;
	// 		if (a) {
	// 			for (var i = 0, l = a.length; i < l; i++) {
	// 				if (a[i].IntAttendee) {
	// 					if (I) {
	// 						I += "; " + a[i].FullName;
	// 					} else {
	// 						I = a[i].FullName;
	// 					}
	// 				} else {
	// 					if (e) {
	// 						e += "; " + a[i].FullName;
	// 					} else {
	// 						e = a[i].FullName;
	// 					}
	// 				}
	// 			}
	// 			A = a.length;
	// 		}
	// 		I = I || this.oBundle.getText("view.Appointment.attinternaladd");
	// 		e = e || this.oBundle.getText("view.Appointment.attexternaladd");
	// 		this.byId("atttit").setTitle(this.oBundle.getText("view.Appointment.additionalAttendeeNumber", [A]));
	// 		return {
	// 			internal: I,
	// 			external: e
	// 		};
	// 	},
	// 	onAllDayChanged: function(e) {
	// 		var a = e.getParameter("state");
	// 		this.setAllDay(a);
	// 	},
	// 	setAllDay: function(a) {
	// 		var s = a;
	// 		this.byId("ft").setVisible(!s);
	// 		this.byId("tt").setVisible(!s);
	// 		if (s) {
	// 			var d = this.oViewModel.getData(),
	// 				h, m, H = this.getView().getModel("vmh");
	// 			d.FromDate.setHours(0, 0, 0, 0);
	// 			d.ToDate.setHours(23, 59, 59, 0);
	// 		} else {
	// 			var d = this.oViewModel.getData();
	// 			var v = this.getView().getModel("vmh").getData();
	// 			var m = v.FromDateTime.getMinutes();
	// 			var h = v.FromDateTime.getHours();
	// 			d.FromDate.setHours(h, m, 0, 0);
	// 			m = v.ToDateTime.getMinutes();
	// 			h = v.ToDateTime.getHours();
	// 			d.ToDate.setHours(h, m, 0, 0);
	// 		}
	// 	},
	// 	setDefaultTimes: function(s, t) {
	// 		var d = new Date(),
	// 			a = d.getHours(),
	// 			h = a,
	// 			b = d.getMinutes(),
	// 			m = b;
	// 		if (m > 30) {
	// 			a = h = h + 1;
	// 			m = 0;
	// 			b = 30;
	// 		} else {
	// 			a = h + 1;
	// 			m = 30;
	// 			b = 0;
	// 		}
	// 		s.setHours(h);
	// 		s.setMinutes(m);
	// 		t.setHours(a);
	// 		t.setMinutes(b);
	// 	},
	// 	setTimeHelperModel: function(f, t) {
	// 		var F = new Date(f),
	// 			T = new Date(t);
	// 		this.getView().getModel("vmh").setData({
	// 			FromDateTime: F,
	// 			ToDateTime: T
	// 		});
	// 	},
	// 	onTimeToChanged: function() {
	// 		var d = this.oViewModel.getData(),
	// 			h, m, H = this.getView().getModel("vmh");
	// 		m = H.oData.FromDateTime.getMinutes();
	// 		h = H.oData.FromDateTime.getHours();
	// 		d.FromDate.setHours(h, m, 0, 0);
	// 		m = H.oData.ToDateTime.getMinutes();
	// 		h = H.oData.ToDateTime.getHours();
	// 		d.ToDate.setHours(h, m, 0, 0);
	// 		var s = new Date(d.FromDate);
	// 		var e = new Date(d.ToDate);
	// 		s.setHours(0, 0, 0, 0);
	// 		e.setHours(0, 0, 0, 0);
	// 		var a = s.getTime();
	// 		var b = e.getTime();
	// 		if (a == b) {
	// 			var c = d.FromDate.getHours();
	// 			var f = d.FromDate.getMinutes();
	// 			var g = d.ToDate.getHours();
	// 			var i = d.ToDate.getMinutes();
	// 			if ((c * 60 + f) > (g * 60 + i)) {
	// 				d.FromDate = new Date(d.ToDate.getTime() - 30 * 60000);
	// 				h = d.FromDate.getHours();
	// 				m = d.FromDate.getMinutes();
	// 				H.oData.FromDateTime.setHours(h, m, 0, 0);
	// 				var D = new Date(H.oData.FromDateTime);
	// 				var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
	// 				var v = this.byId("tt").getValueFormat();
	// 				var t = sap.ui.core.format.DateFormat.getTimeInstance({
	// 					pattern: v
	// 				});
	// 				this.byId("ft").setValue(t.format(D));
	// 			}
	// 		}
	// 	},
	// 	onTimeFromChanged: function() {
	// 		var d = this.oViewModel.getData(),
	// 			h, m, H = this.getView().getModel("vmh");
	// 		m = H.oData.FromDateTime.getMinutes();
	// 		h = H.oData.FromDateTime.getHours();
	// 		d.FromDate.setHours(h, m, 0, 0);
	// 		m = H.oData.ToDateTime.getMinutes();
	// 		h = H.oData.ToDateTime.getHours();
	// 		d.ToDate.setHours(h, m, 0, 0);
	// 		var s = new Date(d.FromDate);
	// 		var e = new Date(d.ToDate);
	// 		s.setHours(0, 0, 0, 0);
	// 		e.setHours(0, 0, 0, 0);
	// 		var a = s.getTime();
	// 		var b = e.getTime();
	// 		if (a == b) {
	// 			var c = d.FromDate.getHours();
	// 			var f = d.FromDate.getMinutes();
	// 			var g = d.ToDate.getHours();
	// 			var i = d.ToDate.getMinutes();
	// 			if ((c * 60 + f) > (g * 60 + i)) {
	// 				d.ToDate = new Date(d.FromDate.getTime() + 30 * 60000);
	// 				h = d.ToDate.getHours();
	// 				m = d.ToDate.getMinutes();
	// 				H.oData.ToDateTime.setHours(h, m, 0, 0);
	// 				var D = new Date(H.oData.ToDateTime);
	// 				var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
	// 				var v = this.byId("tt").getValueFormat();
	// 				var t = sap.ui.core.format.DateFormat.getTimeInstance({
	// 					pattern: v
	// 				});
	// 				this.byId("tt").setValue(t.format(D));
	// 			}
	// 		}
	// 	},
	// 	isStartEndDateCorrect: function() {
	// 		var d = this.byId("fd").getValue();
	// 		var p = this.parseDate(d);
	// 		var a = this.byId("td").getValue();
	// 		var b = this.parseDate(a);
	// 		if (!p && !b) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.WARNING,
	// 				message: this.oBundle.getText("view.Appointment.validStartEndDate")
	// 			});
	// 			return false;
	// 		}
	// 		if (!p) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.WARNING,
	// 				message: this.oBundle.getText("view.Appointment.validStartDate")
	// 			});
	// 			return false;
	// 		}
	// 		if (!b) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.WARNING,
	// 				message: this.oBundle.getText("view.Appointment.validEndDate")
	// 			});
	// 			return false;
	// 		}
	// 		return true;
	// 	},
	// 	onFromDateChanged: function(e) {
	// 		this.enableSaveBtn();
	// 		if (!this.isStartEndDateCorrect()) {
	// 			return;
	// 		}
	// 		var d = this.byId("fd").getValue();
	// 		var p = this.parseDate(d);
	// 		var D = new Date(),
	// 			a = this.byId("fd").getValue(),
	// 			b, c, h, m, y, f, g, t, i, j;
	// 		D.setHours(0, 0, 0, 0);
	// 		b = new Date(p);
	// 		c = this.oViewModel.getData();
	// 		t = this.getView().getModel("vmh").getData();
	// 		m = t.FromDateTime.getMinutes();
	// 		h = t.FromDateTime.getHours();
	// 		c.FromDate.setHours(h, m, 0, 0);
	// 		if (c.FromDate.getTime() > c.ToDate.getTime()) {
	// 			this.byId("td").setValue(a);
	// 			y = b.getFullYear();
	// 			f = b.getMonth();
	// 			g = b.getDate();
	// 			m = t.ToDateTime.getMinutes();
	// 			h = t.ToDateTime.getHours();
	// 			c.ToDate.setFullYear(y, f, g);
	// 			c.ToDate.setHours(h, m, 0, 0);
	// 			i = t.FromDateTime.getMinutes();
	// 			j = t.FromDateTime.getHours();
	// 			if ((j * 60 + i) > (h * 60 + m)) {
	// 				c.ToDate = new Date(c.FromDate.getTime() + 30 * 60000);
	// 				t.ToDateTime.setMinutes(c.ToDate.getMinutes());
	// 				t.ToDateTime.setHours(c.ToDate.getHours());
	// 				var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
	// 				var v = this.byId("tt").getValueFormat();
	// 				var k = sap.ui.core.format.DateFormat.getTimeInstance({
	// 					pattern: v
	// 				});
	// 				this.byId("tt").setValue(k.format(t.ToDateTime));
	// 			}
	// 		}
	// 		if (b < D) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.WARNING,
	// 				message: this.oBundle.getText("view.Appointment.occurspast")
	// 			});
	// 		}
	// 	},
	// 	onToDateChanged: function(e) {
	// 		this.enableSaveBtn();
	// 		if (!this.isStartEndDateCorrect()) {
	// 			return;
	// 		}
	// 		var d = this.byId("td").getValue();
	// 		var p = this.parseDate(d);
	// 		var y, a, b, m, h, c, f, g, q, t, i, j = this.oViewModel.getData();
	// 		g = new Date(p);
	// 		y = g.getFullYear();
	// 		a = g.getMonth();
	// 		b = g.getDate();
	// 		j.ToDate.setFullYear(y, a, b);
	// 		t = this.getView().getModel("vmh").getData();
	// 		m = t.ToDateTime.getMinutes();
	// 		h = t.ToDateTime.getHours();
	// 		j.ToDate.setHours(h, m, 0, 0);
	// 		if (j.FromDate.getTime() > j.ToDate.getTime()) {
	// 			i = this.byId("fd").getValue();
	// 			this.byId("td").setValue(i);
	// 			q = this.parseDate(i);
	// 			y = q.getFullYear();
	// 			a = q.getMonth();
	// 			b = q.getDate();
	// 			j.ToDate.setFullYear(y, a, b);
	// 			c = t.FromDateTime.getMinutes();
	// 			f = t.FromDateTime.getHours();
	// 			if ((f * 60 + c) > (h * 60 + m)) {
	// 				j.ToDate = new Date(j.FromDate.getTime() + 30 * 60000);
	// 				t.ToDateTime.setMinutes(j.ToDate.getMinutes());
	// 				t.ToDateTime.setHours(j.ToDate.getHours());
	// 				var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
	// 				var v = this.byId("tt").getValueFormat();
	// 				var k = sap.ui.core.format.DateFormat.getTimeInstance({
	// 					pattern: v
	// 				});
	// 				this.byId("tt").setValue(k.format(t.ToDateTime));
	// 			}
	// 		}
	// 	},
	// ERCO on
	initAccountF4: function(i) {
		var f = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
		cus.crm.mycalendar.util.AccountF4 = {
			getLIItem: function() {
				var l = new sap.m.StandardListItem({
					title: (f === "fullName") ? "{parts:[{path:'fullName'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Title'}" : "{parts:[{path:'name1'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Title'}",
					description: (f !== "fullName") ?
						"{parts:['MainAddress/city', 'MainAddress/country'], formatter: 'cus.crm.mycalendar.util.Util.formatAccountPlace'}" : "{parts:[{path:'MainAddress/city'}, {path:'MainAddress/country'}, {path:'accountID'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Description'}",
					active: true
				});
				return l;
			},
			create: function() {
				var a = new sap.m.SelectDialog();
				a.myLItemplate = this.getLIItem();
				var F = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
				this.myLItemplate = a.myLItemplate;
				a.attachSearch(cus.crm.mycalendar.CRM_MYCALExtension.util.Util.getSearch(f));
				a.attachLiveChange(cus.crm.mycalendar.CRM_MYCALExtension.util.Util.getLiveSearch(f));
				a.triggerSearch = function(v) {
					var b = this.getBinding("items");
					var c = [];
					if (v) {
						var s = new sap.ui.model.Filter(f, sap.ui.model.FilterOperator.Contains, v);
						c.push(s);
					}
					c.push(new sap.ui.model.Filter("isMyAccount", sap.ui.model.FilterOperator.EQ, true));
					if (b !== undefined) {
						b.aApplicationFilters = [];
					}
					this.bindAggregation("items", {
						path: "/AccountCollection",
						parameters: {
							expand: 'MainAddress',
							select: 'accountID,MainAddress/city,MainAddress/country,' + ((F !== "fullName") ? 'name1' : 'fullName')
						},
						template: this.myLItemplate,
						filters: c
					});
					b = this.getBinding("items");
				};
				return a;
			}
		};
		this.oAccF4 = cus.crm.mycalendar.util.AccountF4.create();
		this.oAccF4.setModel(this.getView().getModel("i18n"), "i18n");
		this.oAccF4.setModel(cus.crm.mycalendar.util.Util.getSearchModel(this.oModel.sServiceUrl, this.isMock, this));
		if (this.oAccF4._searchField) {
			this.oAccF4._searchField.setPlaceholder(this.oBundle.getText("view.Appointment.searchfieldplaceholder"));
		}
		if (this.oAccF4._dialog) {
			this.oAccF4._dialog.setContentWidth("480px");
			this.oAccF4._list.setGrowingThreshold(40);
		}
		var t = this;
		this.oAccF4.attachConfirm(function(e) {
			var s = e.getParameter("selectedItem");
			if (s) {
				var a = s.getBindingContext().getObject();
				var A;
				var F = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
				A = (F === "fullName") ? a.fullName : a.name1;
				if (A === "") {
					i.setValue(a.accountID);
				} else {
					i.setValue(A);
				}
				var d = t.oViewModel.getData();
				d.Account = a.accountID;
				d.AccountTxt = A;
				t.enableSaveBtn();
			}
		});
		this.oAccF4.attachCancel(function(e) {
			var E = t.getViewEntity();
			E.Account = "";
			E.AccountTxt = "";
		});
		this.oAccF4._list.attachUpdateStarted(function(e) {
			e.getSource().setNoDataText(t.oBundle.getText("view.Appointment.searchlistinfo"));
			t.oAccF4.setTitle(t.oBundle.getText("view.Appointment.acsea_title", ["0"]));
		});
		this.oAccF4._list.attachUpdateFinished(function(e) {
			e.getSource().setNoDataText(t.oBundle.getText("view.Appointment.acsea_nodata"));
			t.oAccF4.setTitle(t.oBundle.getText("view.Appointment.acsea_title", [e.getParameter("total")]));
		});
		// 		var f = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
		// 		cus.crm.mycalendar.util.AccountF4 = {
		// 			getLIItem: function() {
		// 				var l = new sap.m.StandardListItem({
		// 					title: (f === "fullName") ? "{parts:[{path:'fullName'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Title'}" : "{parts:[{path:'name1'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Title'}",
		// 					description: (f !== "fullName") ?
		// 						"{parts:['MainAddress/city', 'MainAddress/country'], formatter: 'cus.crm.mycalendar.util.Util.formatAccountPlace'}" : "{parts:[{path:'MainAddress/city'}, {path:'MainAddress/country'}, {path:'accountID'}], formatter: 'cus.crm.mycalendar.util.Util.getAccountF4Description'}",
		// 					active: true
		// 				});
		// 				return l;
		// 			},
		// 			create: function() {
		// 				var a = new sap.m.SelectDialog();
		// 				a.myLItemplate = this.getLIItem();
		// 				var F = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
		// 				this.myLItemplate = a.myLItemplate;
		// 				a.attachSearch(cus.crm.mycalendar.util.Util.getSearch(f));
		// 				a.attachLiveChange(cus.crm.mycalendar.util.Util.getLiveSearch(f));
		// 				a.triggerSearch = function(v) {
		// 					var b = this.getBinding("items");
		// 					var c = [];
		// 					if (v) {
		// 						var s = new sap.ui.model.Filter(f, sap.ui.model.FilterOperator.Contains, v);
		// 						c.push(s);
		// 					}
		// 					if (b !== undefined) {
		// 						b.aApplicationFilters = [];
		// 					}
		// 					this.bindAggregation("items", {
		// 						path: "/AccountCollection",
		// 						parameters: {
		// 							expand: 'MainAddress',
		// 							select: 'accountID,MainAddress/city,MainAddress/country,' + ((F !== "fullName") ? 'name1' : 'fullName')
		// 						},
		// 						template: this.myLItemplate,
		// 						filters: c
		// 					});
		// 					b = this.getBinding("items");
		// 				};
		// 				return a;
		// 			}
		// 		};
		// 		this.oAccF4 = cus.crm.mycalendar.util.AccountF4.create();
		// 		this.oAccF4.setModel(this.getView().getModel("i18n"), "i18n");
		// 		this.oAccF4.setModel(cus.crm.mycalendar.util.Util.getSearchModel(this.oModel.sServiceUrl, this.isMock, this));
		// 		if (this.oAccF4._searchField) {
		// 			this.oAccF4._searchField.setPlaceholder(this.oBundle.getText("view.Appointment.searchfieldplaceholder"));
		// 		}
		// 		if (this.oAccF4._dialog) {
		// 			this.oAccF4._dialog.setContentWidth("480px");
		// 			this.oAccF4._list.setGrowingThreshold(40);
		// 		}
		// 		var t = this;
		// 		this.oAccF4.attachConfirm(function(e) {
		// 			var s = e.getParameter("selectedItem");
		// 			if (s) {
		// 				var a = s.getBindingContext().getObject();
		// 				var A;
		// 				var F = cus.crm.mycalendar.util.Schema.getFilterString(this.oModel);
		// 				A = (F === "fullName") ? a.fullName : a.name1;
		// 				if (A === "") {
		// 					i.setValue(a.accountID);
		// 				} else {
		// 					i.setValue(A);
		// 				}
		// 				var d = t.oViewModel.getData();
		// 				d.Account = a.accountID;
		// 				d.AccountTxt = A;
		// 			}
		// 		});
		// 		this.oAccF4.attachCancel(function(e) {
		// 			var E = t.getViewEntity();
		// 			E.Account = "";
		// 			E.AccountTxt = "";
		// 		});
		// 		this.oAccF4._list.attachUpdateStarted(function(e) {
		// 			e.getSource().setNoDataText(t.oBundle.getText("view.Appointment.searchlistinfo"));
		// 			t.oAccF4.setTitle(t.oBundle.getText("view.Appointment.acsea_title", ["0"]));
		// 		});
		// 		this.oAccF4._list.attachUpdateFinished(function(e) {
		// 			e.getSource().setNoDataText(t.oBundle.getText("view.Appointment.acsea_nodata"));
		// 			t.oAccF4.setTitle(t.oBundle.getText("view.Appointment.acsea_title", [e.getParameter("total")]));
		// 		});
	},
	// 	onF4Account: function(e) {
	// 		var i = e.getSource();
	// 		var v = i.getValue();
	// 		if (!this.oAccF4) {
	// 			this.initAccountF4(i);
	// 		}
	// 		this.oAccF4.triggerSearch(v);
	// 		this.oAccF4.open(v);
	// 	},
	// 	onAccountChanged: function(e) {
	// 		if (e.getSource().getValue()) {
	// 			this.onF4Account(e);
	// 		}
	// 	},
	// 	onAccountInputFieldChanged: function(e) {
	// 		var a = e.getSource();
	// 		this._setAccount("", a.getValue());
	// 		a.setShowSuggestion(true);
	// 		a.setFilterSuggests(false);
	// 		var c = function(A) {
	// 			a.removeAllSuggestionItems();
	// 			if (a.getValue().length > 0) {
	// 				for (var i = 0 in A) {
	// 					var o = A[i];
	// 					if (o.fullName.toUpperCase() == a.getValue().toUpperCase()) {
	// 						this._setAccount(o.accountID, o.fullName);
	// 					}
	// 					var C = new sap.ui.core.CustomData({
	// 						key: "oAccount",
	// 						value: o
	// 					});
	// 					if (o.fullName != "") {
	// 						var I = new sap.ui.core.Item({
	// 							text: o.fullName,
	// 							customData: C
	// 						});
	// 						a.addSuggestionItem(I);
	// 					} else {
	// 						var b = new sap.ui.core.Item({
	// 							text: o.accountID,
	// 							customData: C
	// 						});
	// 						a.addSuggestionItem(b);
	// 					}
	// 				}
	// 			}
	// 		};
	// 		this._readAccount(a.getValue(), c);
	// 	},
	// ERCO on
	_setAccount: function(a, b) {
		var d = this.oViewModel.getData();
		var c = this.getView().byId("accountIDInput");
		if (c) {
			d.Account = a;
		}
		var e = this.getView().byId("ia");
		if (b != "") {
			e.setValue(b);
			d.AccountTxt = b;
		} else {
			e.setValue(a);
			d.AccountTxt = a;
		}
		this.enableSaveBtn();
		// 		var d = this.oViewModel.getData();
		// 		var c = this.getView().byId("accountIDInput");
		// 		if (c) {
		// 			d.Account = a;
		// 		}
		// 		var e = this.getView().byId("ia");
		// 		if (b != "") {
		// 			e.setValue(b);
		// 			d.AccountTxt = b;
		// 		} else {
		// 			e.setValue(a);
		// 			d.AccountTxt = a;
		// 		}
	},
	// ERCO off
	// 	_readAccount: function(s, c) {
	// 		var t = this;
	// 		this.oModel.read("/AccountCollection", null, '$top=10&$filter=substringof(%27' + encodeURIComponent(s) + '%27,fullName,accountID)', true,
	// 			function(d, r) {
	// 				var a = jQuery.parseJSON(JSON.stringify(d));
	// 				if (c) c.call(t, a.results);
	// 			}, function(e) {
	// 				jQuery.sap.log.error("Read failed in NewAppointment->_readAccount:" + e.response.body);
	// 			});
	// 	},
	// 	onAccountSuggestItemSelected: function(e) {
	// 		var I = e.getParameter("selectedItem");
	// 		var a = null;
	// 		for (var i in I.getCustomData()) {
	// 			var c = I.getCustomData()[i];
	// 			if (c.getKey() == "oAccount") a = c.getValue();
	// 		}
	// 		this._setAccount(a.accountID, a.fullName);
	// 	},
	// 	_setContact: function(c) {
	// 		var a = this.getView().byId("ic");
	// 		if (a) a.setValue(c);
	// 	},
	// 	onContactSuggestItemSelected: function(e) {
	// 		var I = e.getParameter("selectedItem");
	// 		var c = null;
	// 		for (var i in I.getCustomData()) {
	// 			var C = I.getCustomData()[i];
	// 			if (C.getKey() == "oContact") c = C.getValue();
	// 		}
	// 		this.byId('ic').setValue(c.fullName);
	// 		var d = this.getViewEntity();
	// 		d.ContactTxt = c.fullName;
	// 		d.Contact = c.contactID;
	// 	},
	// 	onContactInputFieldChanged: function(e) {
	// 		this.byId('ic').setValueState(sap.ui.core.ValueState.None);
	// 		var c = e.getSource();
	// 		this._setContact(c.getValue());
	// 		c.setShowSuggestion(true);
	// 		c.setFilterSuggests(false);
	// 		var C = function(a) {
	// 			c.removeAllSuggestionItems();
	// 			if (c.getValue().length > 0) {
	// 				for (var i = 0 in a) {
	// 					var o = a[i];
	// 					if (o.fullName.toUpperCase() == c.getValue().toUpperCase()) {
	// 						this._setContact(o.fullName);
	// 					}
	// 					var b = new sap.ui.core.CustomData({
	// 						key: "oContact",
	// 						value: o
	// 					});
	// 					var I = new sap.ui.core.Item({
	// 						text: o.fullName,
	// 						customData: b
	// 					});
	// 					c.addSuggestionItem(I);
	// 				}
	// 			}
	// 		};
	// 		this._readContact(c.getValue(), C);
	// 	},
	// 	_readContact: function(s, c) {
	// 		var t = this.oModel = this.getView().getModel();
	// 		this.oModel.read("/ContactCollection", null, '$top=10&$filter=substringof(%27' + encodeURIComponent(s) + '%27,fullName)', true, function(
	// 			d, r) {
	// 			var a = jQuery.parseJSON(JSON.stringify(d));
	// 			if (c) c.call(t, a.results);
	// 		}, function(e) {
	// 			jQuery.sap.log.error("Read failed in NewAppointment->_readContact:" + e.response.body);
	// 		});
	// 	},
	// 	_setEmployee: function(e) {
	// 		var a = this.getView().byId("responsibleText");
	// 		if (a) a.setValue(e);
	// 	},
	// 	onEmployeeSuggestItemSelected: function(e) {
	// 		var I = e.getParameter("selectedItem");
	// 		var E = null;
	// 		for (var i in I.getCustomData()) {
	// 			var c = I.getCustomData()[i];
	// 			if (c.getKey() == "oEmployee") E = c.getValue();
	// 		}
	// 		this.byId('responsibleText').setValue(E.fullName);
	// 		this._setPrivateFlag(E);
	// 		var d = this.getViewEntity();
	// 		d.ResponsibleTxt = E.fullName;
	// 		d.Responsible = E.employeeID;
	// 	},
	// 	_setPrivateFlag: function(e) {
	// 		if (e.employeeID !== this.EmpResId) {
	// 			this.byId("pf").setEnabled(false);
	// 		} else {
	// 			this.byId("pf").setEnabled(true);
	// 		}
	// 	},
	// 	onEmployeeInputFieldChanged: function(e) {
	// 		this.byId('responsibleText').setValueState(sap.ui.core.ValueState.None);
	// 		var a = e.getSource();
	// 		this._setEmployee(a.getValue());
	// 		a.setShowSuggestion(true);
	// 		a.setFilterSuggests(false);
	// 		var c = function(E) {
	// 			a.removeAllSuggestionItems();
	// 			if (a.getValue().length > 0) {
	// 				for (var i = 0 in E) {
	// 					var o = E[i];
	// 					if (o.fullName.toUpperCase() == a.getValue().toUpperCase()) {
	// 						this._setEmployee(o.fullName);
	// 					}
	// 					var C = new sap.ui.core.CustomData({
	// 						key: "oEmployee",
	// 						value: o
	// 					});
	// 					var I = new sap.ui.core.Item({
	// 						text: o.fullName,
	// 						customData: C
	// 					});
	// 					a.addSuggestionItem(I);
	// 				}
	// 			}
	// 		};
	// 		this._readEmployee(a.getValue(), c);
	// 	},
	// 	_readEmployee: function(s, c) {
	// 		var t = this.oModel = this.getView().getModel();
	// 		this.oModel.read("/EmployeeCollection", null, '$top=10&$filter=substringof(%27' + encodeURIComponent(s) + '%27,fullName)', true,
	// 			function(d, r) {
	// 				var e = jQuery.parseJSON(JSON.stringify(d));
	// 				if (c) c.call(t, e.results);
	// 			}, function(e) {
	// 				jQuery.sap.log.error("Read failed in NewAppointment->_readEmployee:" + e.response.body);
	// 			});
	// 	},
	// 	initContactF4: function(i) {
	// 		if (!this.contactF4Frag) {
	// 			this.initConSearchFragment();
	// 		}
	// 		var l = new sap.m.Button();
	// 		this.oConF4 = new sap.m.Dialog(this.sViewId + "cd", {
	// 			stretch: sap.ui.Device.system.phone,
	// 			title: this.oBundle.getText("view.Appointment.consea_title", ["0"]),
	// 			content: [this.contactF4Frag[1]],
	// 			leftButton: l,
	// 			contentWidth: "480px",
	// 			contentHeight: "2000px",
	// 			subHeader: new sap.m.Bar({
	// 				contentMiddle: [this.contactF4Frag[0]]
	// 			})
	// 		});
	// 		this.oConF4.addStyleClass("sapMSelectDialog");
	// 		this.oConF4._iVMargin = 8 * parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize") || 16, 10);
	// 		this.oConF4.setModel(this.getView().getModel("i18n"), "i18n");
	// 		this.oConF4.setModel(cus.crm.mycalendar.util.Util.getSearchModel(this.oModel.sServiceUrl, this.isMock, this), "sm");
	// 		l.bindProperty("text", "i18n>view.Appointment.cancel");
	// 		var t = this;
	// 		l.attachPress(function(e) {
	// 			t.oConF4.close();
	// 			t.bConF4clicked = false;
	// 		});
	// 	},
	// 	onF4Contact: function(e) {
	// 		var i = e.getSource();
	// 		if (!this.oConF4) {
	// 			this.initContactF4(i);
	// 		}
	// 		var v = i.getValue();
	// 		var d = this.getViewEntity();
	// 		this.bConF4clicked = true;
	// 		this.contactF4Frag.triggerSearch({
	// 			accountid: d.Account,
	// 			accounttext: d.AccountTxt,
	// 			searchvalue: v
	// 		});
	// 		this.oConF4.open();
	// 	},
	// 	onContactChanged: function(e) {
	// 		if (e.getSource().getValue()) {
	// 			this.onF4Contact(e);
	// 		}
	// 	},
	// 	addNewAttendee: function(i, a, f, b, s) {
	// 		var d = this.getViewEntity(),
	// 			g = d.Guid,
	// 			e = "";
	// 		if (!g) {
	// 			g = "00000000-0000-0000-0000-000000000001";
	// 		}
	// 		if (d.Attendee === undefined) {
	// 			d.Attendee = [];
	// 		}
	// 		this.iCounter += 1;
	// 		e = '000000000000' + this.iCounter;
	// 		e = e.slice(-12);
	// 		var A = {
	// 			Guid: g,
	// 			PartnerGuid: "00000000-0000-0000-0000-" + e,
	// 			PartnerNo: i,
	// 			IntAttendee: a,
	// 			Function: s,
	// 			AccountNo: b,
	// 			FullName: f
	// 		};
	// 		var D = this.oEditAttendeeModel.getData();
	// 		D.Attendee.splice(0, 0, A);
	// 		this.oEditAttendeeModel.setData(D);
	// 		this.adaptAttendeePopupTitle();
	// 	},
	// 	initAttEditFragment: function() {
	// 		this.oAttFrag = sap.ui.xmlfragment(this.sViewId + "attFrag", "cus.crm.mycalendar.view.AttendeeEdit", this);
	// 		this.oAttFrag.setStretch(sap.ui.Device.system.phone);
	// 		this.oAttFrag.addStyleClass("sapMSelectDialog");
	// 		this.oAttFrag._iVMargin = 8 * parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize") || 16, 10);
	// 		this.oEditAttendeeModel = new sap.ui.model.json.JSONModel({});
	// 		this.oAttFrag.setModel(this.oEditAttendeeModel, "em");
	// 		this.oAttFrag.setModel(this.getView().getModel("i18n"), "i18n");
	// 		this.oAttFrag.setModel(cus.crm.mycalendar.util.Util.getSearchModel(this.oModel.sServiceUrl, this.isMock, this), "sm");
	// 	},
	// ERCO on
	initConSearchFragment: function() {
		this.contactF4Frag = cus.crm.mycalendar.CRM_MYCALExtension.util.Util.createContactSearchFragment(this.sViewId + "contF4", this);
		//this.contactF4Frag = cus.crm.mycalendar.util.Util.createContactSearchFragment(this.sViewId + "contF4", this);
	},
	// ERCO on
	// 	openEditAttendeeInput: function(s, i) {
	// 		this.oEditAttendeeModel.setData({});
	// 		var h = {
	// 			Attendee: []
	// 		};
	// 		var d = this.getViewEntity();
	// 		if (d.Attendee) {
	// 			jQuery.each(d.Attendee, function(b, v) {
	// 				var V = jQuery.extend({}, v);
	// 				h.Attendee.push(V);
	// 			});
	// 		}
	// 		this.oEditAttendeeModel.setData(h);
	// 		var p = sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2");
	// 		p.removeAllContent();
	// 		p.setSubHeader(new sap.m.Bar({
	// 			contentMiddle: [s[0]]
	// 		}));
	// 		p.addContent(s[1]);
	// 		var l = this.oAttFrag.getContent()[0].getPages()[0].getContent()[0];
	// 		var a = l.getBinding("items");
	// 		var f = [];
	// 		var F = new sap.ui.model.Filter("IntAttendee", sap.ui.model.FilterOperator.EQ, i);
	// 		f.push(F);
	// 		a.filter(f);
	// 		l.data("internal", i);
	// 		this.adaptAttendeePopupTitle();
	// 		var k;
	// 		if (i) {
	// 			k = "view.Appointment.internal_titlenew";
	// 		} else {
	// 			k = "view.Appointment.external_titlenew";
	// 		}
	// 		sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2").setTitle(this.oBundle.getText(k));
	// 		var t;
	// 		if (i) {
	// 			t = this.oBundle.getText("view.Appointment.nointattendees");
	// 		} else {
	// 			t = this.oBundle.getText("view.Appointment.noextattendees");
	// 		}
	// 		l.setNoDataText(t);
	// 		this.oAttFrag.open();
	// 		if (a.getLength() === 0) {
	// 			this.onAddClicked();
	// 		}
	// 	},
	// 	formatContactName: function(f, i) {
	// 		return f || ("Name not available " + i);
	// 	},
	// 	formatEmployeeName: function(f, l) {
	// 		return this.oBundle.getText("view.Appointment.employeename", [f, l]);
	// 	},
	// 	onEditExternalAttendees: function(e) {
	// 		this.bExternalSearch = true;
	// 		this.bConF4clicked = false;
	// 		if (!this.extAttF4Frag) {
	// 			this.extAttF4Frag = cus.crm.mycalendar.util.Util.createContactSearchFragment(this.sViewId + "extAttF4", this);
	// 		}
	// 		if (!this.oAttFrag) {
	// 			this.initAttEditFragment();
	// 		}
	// 		this.openEditAttendeeInput(this.extAttF4Frag, false);
	// 	},
	// ERCO on
	onContactFilterHide: function(e) {
		// 		e.getSource().setVisible(false);
		// 		var f = [];
		// 		var p = "sm>/ContactCollection";
		// 		var i = e.getSource().getId();
		// 		var F = i.split("--")[0];
		// 		var l = sap.ui.core.Fragment.byId(F, "lsci");
		// 		var s = sap.ui.core.Fragment.byId(F, "sfc");
		// 		if (s.getValue()) {
		// 			f.push(new sap.ui.model.Filter("lastName", sap.ui.model.FilterOperator.Contains, s.getValue()));
		// 		}
		// 		e.getSource().getParent().bindAggregation("items", {
		// 			path: p,
		// 			template: l,
		// 			filters: f
		// 		});
	},
	// ERCO off
	// 	onSelectContact: function(e) {
	// 		jQuery.sap.log.info("External Attendee / contact selected");
	// 		var s = e.getParameter("listItem").getBindingContext("sm").getObject();
	// 		if (this.bConF4clicked) {
	// 			var i = this.byId("ic");
	// 			if (s.fullName) {
	// 				i.setValue(s.fullName);
	// 			} else {
	// 				i.setValue(s.contactID);
	// 			}
	// 			var d = this.getViewEntity();
	// 			d.Contact = s.contactID;
	// 			d.ContactAccount = s.accountID;
	// 			this.oConF4.close();
	// 			this.bConF4clicked = false;
	// 		} else {
	// 			this.addNewAttendee(s.contactID, false, s.fullName, s.accountID, s["function"]);
	// 			var n = this.oAttFrag.getContent()[0];
	// 			n.backToPage(this.sViewId + "attFrag--p1");
	// 		}
	// 	},
	// ERCO on
	onEditEmployees: function(e) {
		this.bExternalSearch = false;
		if (!this.employeeF4Frag) {
			this.employeeF4Frag = sap.ui.xmlfragment(this.sViewId + "emplSearch", "cus.crm.mycalendar.CRM_MYCALExtension.view.EmployeeSearch", this);
			var m = sap.ui.core.Fragment.byId(this.sViewId + "emplSearch", "lse");
			this.onEmployeeSearch = cus.crm.mycalendar.util.Util.getSearch("lastName", m);
			this.onEmployeeLiveChange = cus.crm.mycalendar.util.Util.getLiveSearch("lastName", m);
			var t = this;
			this.employeeF4Frag.triggerSearch = function() {
				var s = sap.ui.core.Fragment.byId(t.sViewId + "emplSearch", "sfe");
				var l = sap.ui.core.Fragment.byId(t.sViewId + "emplSearch", "lsei");
				s.setValue("");
				m.removeItem(l);
				m.bindAggregation("items", {
					path: "sm>/EmployeeCollection",
					parameters: {
						expand: 'WorkAddress,Company'
					},
					template: l
				});
			};
		}
		if (!this.oAttFrag) {
			this.initAttEditFragment();
		}
		this.openEditAttendeeInput(this.employeeF4Frag, true);
		// 		this.bExternalSearch = false;
		// 		if (!this.employeeF4Frag) {
		// 			this.employeeF4Frag = sap.ui.xmlfragment(this.sViewId + "emplSearch", "cus.crm.mycalendar.view.EmployeeSearch", this);
		// 			var m = sap.ui.core.Fragment.byId(this.sViewId + "emplSearch", "lse");
		// 			this.onEmployeeSearch = cus.crm.mycalendar.util.Util.getSearch("lastName", m);
		// 			this.onEmployeeLiveChange = cus.crm.mycalendar.util.Util.getLiveSearch("lastName", m);
		// 			var t = this;
		// 			this.employeeF4Frag.triggerSearch = function() {
		// 				var s = sap.ui.core.Fragment.byId(t.sViewId + "emplSearch", "sfe");
		// 				var l = sap.ui.core.Fragment.byId(t.sViewId + "emplSearch", "lsei");
		// 				s.setValue("");
		// 				m.removeItem(l);
		// 				m.bindAggregation("items", {
		// 					path: "sm>/EmployeeCollection",
		// 					parameters: {
		// 						expand: 'WorkAddress,Company'
		// 					},
		// 					template: l
		// 				});
		// 			};
		// 		}
		// 		if (!this.oAttFrag) {
		// 			this.initAttEditFragment();
		// 		}
		// 		this.openEditAttendeeInput(this.employeeF4Frag, true);
	},
	// ERCO off	
	// 	onNavBack: function(e) {
	// 		var n = this.oAttFrag.getContent()[0];
	// 		n.backToPage(this.sViewId + "attFrag--p1");
	// 	},
	// 	onOKDialog: function(e) {
	// 		this.oAttFrag.close();
	// 		var E = this.oEditAttendeeModel.getData();
	// 		var d = this.getViewEntity();
	// 		d.Attendee = E.Attendee;
	// 		if (d.delAttendee) {
	// 			d.delAttendee = d.delAttendee.concat(d.delAttendeeTemp);
	// 		} else {
	// 			d.delAttendee = d.delAttendeeTemp;
	// 		}
	// 		delete d.delAttendeeTemp;
	// 		var D = this.getAttendeeStrings(d.Attendee);
	// 		this.byId("atin").setText(D.internal);
	// 		this.byId("atex").setText(D.external);
	// 	},
	// 	onCancelDialog: function(e) {
	// 		this.oAttFrag.close();
	// 		var d = this.getViewEntity();
	// 		delete d.delAttendeeTemp;
	// 	},
	// 	onDeleteAttendee: function(e) {
	// 		var I = e.getParameter("listItem");
	// 		var l = I.getParent();
	// 		var s = I.getBindingContext("em").getObject();
	// 		if (s.PartnerGuid.substring(0, 23) !== "00000000-0000-0000-0000") {
	// 			var d = {
	// 				Guid: s.Guid,
	// 				PartnerGuid: s.PartnerGuid,
	// 				PartnerNo: "",
	// 				PartnerPft: "",
	// 				PartnerFct: ""
	// 			};
	// 			var a = this.getViewEntity();
	// 			if (!a.delAttendeeTemp) {
	// 				a.delAttendeeTemp = [];
	// 			}
	// 			a.delAttendeeTemp.push(d);
	// 		}
	// 		var a = this.oEditAttendeeModel.getData();
	// 		for (var i = 0; i < a.Attendee.length; i++) {
	// 			if (a.Attendee[i].PartnerGuid === s.PartnerGuid) {
	// 				a.Attendee.splice(i, 1);
	// 				break;
	// 			}
	// 		}
	// 		this.oEditAttendeeModel.refresh();
	// 		this.adaptAttendeePopupTitle();
	// 	},
	// 	adaptAttendeePopupTitle: function() {
	// 		var l = this.oAttFrag.getContent()[0].getPages()[0].getContent()[0];
	// 		var i = l.data("internal");
	// 		var k;
	// 		if (i) {
	// 			k = "view.Appointment.internal_title";
	// 		} else {
	// 			k = "view.Appointment.external_title";
	// 		}
	// 		var a = l.getBinding("items");
	// 		var A = a.getLength();
	// 		var t = this.oBundle.getText(k, [A]);
	// 		sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "tit").setText(t);
	// 	},
	// 	onSelectEmployee: function(e) {
	// 		var l = e.getParameter("listItem"),
	// 			f = l.getTitle();
	// 		var a = l.data("compid"),
	// 			F = l.data("func"),
	// 			E = l.data("empid");
	// 		this.addNewAttendee(E, true, f, a, F);
	// 		this.oAttFrag.getContent()[0].backToPage(this.sViewId + "attFrag--p1");
	// 	},
	// 	onCancelSearch: function(e) {
	// 		this.oAttFrag.close();
	// 		var d = this.getViewEntity();
	// 		delete d.delAttendeeTemp;
	// 	},
	// 	onPrivateChanged: function(e) {
	// 		var d = this.getView().getModel("vm").oData;
	// 		if (this.newAppointment) {
	// 			this.byId("responsibleText").setValue(this.ResponsibleTxt);
	// 		}
	// 		if (d.Responsible !== "" && d.Responsible !== null && d.Responsible !== undefined && d.Responsible == this.EmpResId && this.byId("pf").getState()) {
	// 			this.byId("responsibleText").setEnabled(false);
	// 		} else {
	// 			this.byId("responsibleText").setEnabled(true);
	// 		}
	// 	},
	// 	onAddClicked: function(e) {
	// 		if (this.bExternalSearch) {
	// 			var d = this.getViewEntity();
	// 			this.extAttF4Frag.triggerSearch({
	// 				accountid: d.Account,
	// 				accounttext: d.AccountTxt
	// 			});
	// 		} else {
	// 			this.employeeF4Frag.triggerSearch();
	// 		}
	// 		var n = this.oAttFrag.getContent()[0];
	// 		n.to(this.sViewId + "attFrag--p2");
	// 	},
	// 	onEmployeeSearch: function(e) {
	// 		this.onEmployeeSearch(e);
	// 	},
	// 	onEmployeeLiveChange: function(e) {
	// 		this.onEmployeeLiveChange(e);
	// 	},
	// 	onContactSearch: function(e) {
	// 		if (this.bConF4clicked) {
	// 			this.contactF4Frag.onContactSearch(e);
	// 		} else {
	// 			this.extAttF4Frag.onContactSearch(e);
	// 		}
	// 	},
	// 	onContactLiveChange: function(e) {
	// 		if (this.bConF4clicked) {
	// 			this.contactF4Frag.onContactLiveChange(e);
	// 		} else {
	// 			this.extAttF4Frag.onContactLiveChange(e);
	// 		}
	// 	},
	// 	onContactListUpdateStart: function(e) {
	// 		var t = "";
	// 		e.getSource().setNoDataText(this.oBundle.getText("view.Appointment.searchlistinfo"));
	// 		if (this.bConF4clicked) {
	// 			t = this.oBundle.getText("view.Appointment.consea_title", ["0"]);
	// 			this.oConF4.setTitle(t);
	// 		} else {
	// 			t = this.oBundle.getText("view.Appointment.external_titlenew", ["0"]);
	// 			sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2").setTitle(t);
	// 		}
	// 	},
	// 	onContactListUpdateFinished: function(e) {
	// 		var t = "";
	// 		e.getSource().setNoDataText(this.oBundle.getText("view.Appointment.consea_nodata"));
	// 		if (this.bConF4clicked) {
	// 			t = this.oBundle.getText("view.Appointment.consea_title", [e.getParameter("actual")]);
	// 			this.oConF4.setTitle(t);
	// 		} else {
	// 			t = this.oBundle.getText("view.Appointment.external_titlenew", [e.getParameter("actual")]);
	// 			sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2").setTitle(t);
	// 		}
	// 	},
	// 	onEmployeeListUpdateStart: function(e) {
	// 		e.getSource().setNoDataText(this.oBundle.getText("view.Appointment.searchlistinfo"));
	// 		var t = this.oBundle.getText("view.Appointment.internal_titlenew", ["0"]);
	// 		sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2").setTitle(t);
	// 	},
	// 	onEmployeeListUpdateFinished: function(e) {
	// 		e.getSource().setNoDataText(this.oBundle.getText("view.Appointment.nointattendees"));
	// 		var t = this.oBundle.getText("view.Appointment.internal_titlenew", [e.getParameter("actual")]);
	// 		sap.ui.core.Fragment.byId(this.sViewId + "attFrag", "p2").setTitle(t);
	// 	},
	// 	getParentApptId: function() {
	// 		var s = this.getView().getBindingContext().getPath();
	// 		s = s.slice(21);
	// 		s = s.slice(0, -2);
	// 		return s;
	// 	},
	// 	onBackNavigate: function() {
	// 		var g = this.getAppointment().Guid;
	// 		if (this.followup) {
	// 			g = this.getParentApptId();
	// 		}
	// 		this.getView().unbindElement();
	// 		var a = this.byId("attachmentsView_chg1");
	// 		a.unbindElement();
	// 		var h = new sap.ui.core.routing.History.getInstance();
	// 		if (this.bUpdate) {
	// 			var d = this.oRouter.getURL("appointment", {
	// 				AppointmentID: g
	// 			});
	// 			if (h.getDirection(d) === sap.ui.core.routing.HistoryDirection.Backwards) {
	// 				window.history.go(-1);
	// 			} else if (h.getDirection("") == sap.ui.core.routing.HistoryDirection.Unknown) {
	// 				window.history.go(-1);
	// 			} else {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 			}
	// 		} else if (this.followup) {
	// 			this.oRouter.navTo("appointment", {
	// 				AppointmentID: g
	// 			}, true);
	// 		} else {
	// 			var b = h.getDirection("");
	// 			if (b && b == sap.ui.core.routing.HistoryDirection.Unknown) {
	// 				if (this.createdfromNotes) {
	// 					window.history.go(-2);
	// 					this.createdfromNotes = false;
	// 				} else if (this.createFromOppt) {
	// 					window.history.go(-2);
	// 					this.createFromOppt = false;
	// 				} else if (this.createFromTasks) {
	// 					window.history.back();
	// 					this.createFromTasks = false;
	// 				} else if (this.createFromAccount) {
	// 					window.history.go(-1);
	// 					this.createFromAccount = false;
	// 				} else {
	// 					var D = this.getAppointment().FromDate;
	// 					var s = this.getDateParameterfromDate(D);
	// 					this.oRouter.navTo("week", {
	// 						Date: s
	// 					}, true);
	// 				}
	// 			} else {
	// 				if (this.createdfromNotes) {
	// 					window.history.go(-2);
	// 					this.createdfromNotes = false;
	// 				} else if (this.createFromOppt) {
	// 					window.history.go(-2);
	// 					this.createFromOppt = false;
	// 				} else if (this.createFromTasks) {
	// 					window.history.back();
	// 					this.createFromTasks = false;
	// 				} else if (this.createFromAccount) {
	// 					window.history.go(-1);
	// 					this.createFromAccount = false;
	// 				} else this.navigateToCalendar();
	// 			}
	// 		}
	// 	},
	// 	onBack: function(e) {
	// 		var t = this;
	// 		var v = this._getViewMode();
	// 		if (this.checkEntityChanged()) {
	// 			sap.m.MessageBox.show(this.oBundle.getText("view.Appointment.leaveeditmessage"), sap.m.MessageBox.Icon.WARNING, sap.ca.ui.utils.resourcebundle
	// 				.getText("messagetype.warning"), [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL], function(a) {
	// 					if (a === sap.m.MessageBox.Action.OK) {
	// 						t.onBackNavigate();
	// 					}
	// 				});
	// 		} else {
	// 			this.onBackNavigate();
	// 		}
	// 	},
	// 	checkEntityChanged: function() {
	// 		var c = false;
	// 		if (this.oStartEntityString) {
	// 			var s = JSON.parse(this.oStartEntityString);
	// 			var v = this.getViewEntity();
	// 			var k;
	// 			this._deepSanitize(s, v);
	// 			if (JSON.stringify(s) === JSON.stringify(v)) {
	// 				c = false;
	// 			} else {
	// 				c = true;
	// 			}
	// 		}
	// 		return c;
	// 	},
	// 	onCancel: function(e) {
	// 		this.onBack();
	// 		this.followupappointment = false;
	// 		this.followupappointmentfromtask = false;
	// 		this.newappointmentfromoppt = false;
	// 		this.newappointmentfromaccount = false;
	// 		this.newAppointment = false;
	// 	},
	// 	onSave: function(e) {
	// 		if (this.validateNewAppointment()) {
	// 			var E = this.getAppointment();
	// 			this.saveAppointment(E);
	// 			this.byId("responsibleText").setEnabled(true);
	// 		}
	// 	},
	// 	enableSaveBtn: function() {
	// 		var e = this.getAppointment();
	// 		if (e) {
	// 			if (e.Description !== "" && e.FromDate !== null && e.ToDate !== null) {
	// 				this.byId("bs").setEnabled(true);
	// 			} else {
	// 				this.byId("bs").setEnabled(false);
	// 			}
	// 		}
	// 		if (this.extHookEnableSaveBtn) {
	// 			this.extHookEnableSaveBtn();
	// 		}
	// 	},
	// 	validateNewAppointment: function() {
	// 		var o = true,
	// 			e = this.getAppointment();
	// 		var s;
	// 		var a;
	// 		var b;
	// 		var c;
	// 		e.Description = jQuery.trim(e.Description);
	// 		e.Location = jQuery.trim(e.Location);
	// 		if (!this.isStartEndDateCorrect()) {
	// 			o = false;
	// 		}
	// 		if (e.AllDay) {
	// 			s = e.FromDate.getTimezoneOffset();
	// 			a = e.ToDate.getTimezoneOffset();
	// 			b = s * 60 * 1000;
	// 			c = a * 60 * 1000;
	// 			e.FromDate.setTime(e.FromDate.getTime() - b);
	// 			e.ToDate.setTime(e.ToDate.getTime() - c);
	// 		}
	// 		if (!e.Description) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.WARNING,
	// 				message: this.oBundle.getText("view.Appointment.notitle")
	// 			});
	// 			o = false;
	// 		}
	// 		if (this.extHookValidateAdditionalFields) {
	// 			o = this.extHookValidateAdditionalFields();
	// 		}
	// 		return o;
	// 	},
	// 	getAppointment: function() {
	// 		var e = this.getViewEntity();
	// 		e = this.prepareEntity(e);
	// 		return e;
	// 	},
	// 	prepareEntity: function(e) {
	// 		if (e.Attendee) {
	// 			for (var i = 0; i < e.Attendee.length; i++) {
	// 				delete e.Attendee[i].__metadata;
	// 			}
	// 		}
	// 		if (e.Contact && !e.ContactTxt) {
	// 			e.Contact = "";
	// 		}
	// 		delete e.AppointmentToAttachment;
	// 		delete e.PriorityTxt;
	// 		delete e.StatusTxt;
	// 		delete e.__metadata;
	// 		delete e.AccountRel;
	// 		delete e.ContactRel;
	// 		delete e.EmployeeRel;
	// 		if (this.extHookPrepareEntity) {
	// 			e = this.extHookPrepareEntity(e);
	// 		}
	// 		return e;
	// 	},
	// 	saveAppointment: function(e) {
	// 		var b = [],
	// 			t = this;
	// 		this.oBusyDialog.open();
	// 		if (this.isMock) {
	// 			this.successSave({}, null);
	// 			return;
	// 		}
	// 		if (e.Guid) {
	// 			if (e.delAttendee) {
	// 				this.oDelAttendeeBackup = e.delAttendee;
	// 				jQuery.each(e.delAttendee, function(i, v) {
	// 					b.push(t.oModel.createBatchOperation("/AttendeeSet(Guid=guid'" + v.Guid + "',PartnerGuid=guid'" + v.PartnerGuid + "')", "PUT", v));
	// 				});
	// 			}
	// 			delete e.delAttendee;
	// 			delete e.delAttendeeTemp;
	// 			var a = e.Attendee;
	// 			this.oAttendeesToUpdateBackup = e.Attendee;
	// 			if (a) {
	// 				t = this;
	// 				jQuery.each(a, function(i, v) {
	// 					if (v.PartnerGuid.substring(0, 23) === "00000000-0000-0000-0000") {
	// 						b.push(t.oModel.createBatchOperation("/AttendeeSet(Guid=guid'" + v.Guid + "',PartnerGuid=guid'" + v.PartnerGuid + "')", "PUT", v));
	// 					}
	// 				});
	// 			}
	// 			delete e.Attendee;
	// 			var E = null;
	// 			if (parseFloat(this.sBackendVersion) >= 4.0) {
	// 				E = {
	// 					sETag: cus.crm.mycalendar.util.Util._getETag()
	// 				};
	// 			}
	// 			b.push(this.oModel.createBatchOperation("/AppointmentSet(guid'" + e.Guid + "')", "PUT", e, E));
	// 			if (this.extHookSaveAppointmentOnEdit) {
	// 				this.extHookSaveAppointmentOnEdit(e, b);
	// 			}
	// 			this.oModel.addBatchChangeOperations(b);
	// 			this.oModel.submitBatch(jQuery.proxy(this.successSave, this), jQuery.proxy(this.errorSave, this));
	// 		} else {
	// 			delete e.Id;
	// 			delete e.delAttendee;
	// 			delete e.delAttendeeTemp;
	// 			b.push(this.oModel.createBatchOperation("/AppointmentSet", "POST", e));
	// 			if (this.extHookSaveAppointmentOnCreate) {
	// 				this.extHookSaveAppointmentOnCreate(e, b);
	// 			}
	// 			this.oModel.addBatchChangeOperations(b);
	// 			this.oModel.submitBatch(jQuery.proxy(this.successSave, this), jQuery.proxy(this.errorSave, this));
	// 		}
	// 	},
	// 	successSave: function(d, r) {
	// 		var t = this,
	// 			e = false,
	// 			b, m;
	// 		var f;
	// 		var a = false;
	// 		var v = this._getViewMode();
	// 		if (v === "CREATE") {
	// 			f = r.data.__batchResponses[0].__changeResponses[0].data.Guid;
	// 		} else {
	// 			f = this.getParentApptId();
	// 		}
	// 		this.oBusyDialog.close();
	// 		if (d.hasOwnProperty("__batchResponses")) {
	// 			jQuery.sap.log.info("start read batch responses");
	// 			for (var i = 0; i < d.__batchResponses.length; i++) {
	// 				b = d.__batchResponses[i];
	// 				if (b.hasOwnProperty("response") && b.response.statusCode >= '400') {
	// 					if (b.response.statusCode === '412') {
	// 						a = true;
	// 						break;
	// 					}
	// 					jQuery.sap.log.error("response error from batch call");
	// 					t.errorSave(b);
	// 					e = true;
	// 				}
	// 			}
	// 		}
	// 		if (a) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.ERROR,
	// 				message: sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('MSG_CONFLICTING_DATA')
	// 			}, jQuery.proxy(function() {
	// 				this._refreshAppointment();
	// 			}, this));
	// 			return;
	// 		}
	// 		if (!e) {
	// 			jQuery.sap.log.info("all responses ok");
	// 			if (this.isMock) {
	// 				sap.ca.ui.message.showMessageToast("Not yet suppported in mock mode");
	// 			} else {
	// 				if (this.followupappointment || this.followupappointmentfromtask || this.newappointmentfromoppt || this.newappointmentfromaccount) {
	// 					if (this.newappointmentfromaccount) {
	// 						sap.ui.getCore().getEventBus().publish("cus.crm.mycalendar", "appointmentCreated");
	// 						var c = this.oBundle.getText("view.Appointment.savesuccess");
	// 						sap.m.MessageToast.show(c, {
	// 							closeOnBrowserNavigation: false
	// 						});
	// 					} else {
	// 						sap.ui.getCore().getEventBus().publish("cus.crm.mycalendar", "followUpAppointmentCreated");
	// 						var c = this.oBundle.getText("view.Appointment.followupsuccessful");
	// 						sap.m.MessageToast.show(c, {
	// 							closeOnBrowserNavigation: false
	// 						});
	// 					};
	// 				} else {
	// 					if (this.Context) {
	// 						sap.ui.getCore().getEventBus().publish("cus.crm.mycalendar", "appointmentChanged", {
	// 							contextPath: this.Context
	// 						});
	// 					}
	// 					m = this.oBundle.getText("view.Appointment.savesuccess");
	// 					sap.m.MessageToast.show(m, {
	// 						closeOnBrowserNavigation: false
	// 					});
	// 				}
	// 			} if (this.followup || this.createFromOppt || this.createFromTasks || this.createdfromNotes || this.newAppointment) {
	// 				var g = f;
	// 			}
	// 			this.getView().unbindElement();
	// 			var A = this.byId("attachmentsView_chg1");
	// 			A.unbindElement();
	// 			if (this.createdfromNotes) {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 				this.createdfromNotes = false;
	// 			} else if (this.followup) {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 			} else if (this.createFromOppt) {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 				this.createFromOppt = false;
	// 			} else if (this.createFromTasks) {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 				this.createFromTasks = false;
	// 			} else if (this.newAppointment) {
	// 				this.oRouter.navTo("appointment", {
	// 					AppointmentID: g
	// 				}, true);
	// 				this.newAppointment = false;
	// 			} else if (this.createFromAccount) {
	// 				window.history.back();
	// 				this.createFromAccount = false;
	// 			} else {
	// 				this.navigateToCalendar();
	// 			}
	// 		}
	// 		this.followupappointment = false;
	// 		this.followupappointmentfromtask = false;
	// 		this.newappointmentfromoppt = false;
	// 		this.newappointmentfromaccount = false;
	// 		this.newAppointment = false;
	// 	},
	// 	navigateToCalendar: function() {
	// 		var d = this.getViewEntity().FromDate;
	// 		if (!d) {
	// 			d = new Date();
	// 		}
	// 		var D = this.getDateParameterfromDate(d);
	// 		if (this.bUpdate) window.history.go(-1);
	// 		else if (this.followup) {
	// 			this.oRouter.navTo("week", {
	// 				Date: D
	// 			}, true);
	// 		} else this.oRouter.navTo("week", {
	// 			Date: D
	// 		}, true);
	// 	},
	// 	errorSave: function(e) {
	// 		var E = this.getViewEntity();
	// 		E.Attendee = this.oAttendeesToUpdateBackup;
	// 		E.delAttendee = this.oDelAttendeeBackup;
	// 		jQuery.sap.log.error("oData batch save failed");
	// 		this.oBusyDialog.close();
	// 		cus.crm.mycalendar.util.Util.showErrorMessagePopup(e);
	// 	},
	// 	validateTimes: function(s, e) {
	// 		var a = new Date(s);
	// 		var b = new Date(e);
	// 		a.setHours(0, 0, 0, 0);
	// 		b.setHours(0, 0, 0, 0);
	// 		var c = a.getTime();
	// 		var d = b.getTime();
	// 		if (c > d) {
	// 			sap.ca.ui.message.showMessageBox({
	// 				type: sap.ca.ui.message.Type.ERROR,
	// 				message: this.oBundle.getText("view.Appointment.wrongDates")
	// 			});
	// 			return false;
	// 		}
	// 		if (c === d) {
	// 			var f = new Date(s);
	// 			var g = new Date(e);
	// 			f.setSeconds(0, 0);
	// 			g.setSeconds(0, 0);
	// 			if (f.getTime() > g.getTime()) {
	// 				sap.ca.ui.message.showMessageBox({
	// 					type: sap.ca.ui.message.Type.ERROR,
	// 					message: this.oBundle.getText("view.Appointment.wrongTimes")
	// 				});
	// 				return false;
	// 			}
	// 		}
	// 		return true;
	// 	},
	// 	parseDate: function(d) {
	// 		var a = sap.ui.core.format.DateFormat.getDateInstance({
	// 			style: "long"
	// 		});
	// 		var D = a.parse(d);
	// 		return D;
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
	// 	adaptMockDate: function(d) {
	// 		var D = d.replace("/Date(", "").replace(")/", "");
	// 		D = parseInt(D);
	// 		return D = new Date(D);
	// 	},
	// 	descriptionChanged: function(e) {
	// 		var t = e.getParameters().newValue;
	// 		var d = this.getView().getModel('vm').oData;
	// 		d.Description = t;
	// 		this.enableSaveBtn();
	// 	},
	// 	onF4Employee: function(e) {
	// 		var m = this.getView().getModel('vm');
	// 		var E = this.byId('responsibleText').getValue();
	// 		var d = m.oData;
	// 		if (!this.oEmpF4) {
	// 			cus.crm.mycalendar.util.Util.initEmployeeF4(this, e.getSource(), m);
	// 		}
	// 		cus.crm.mycalendar.util.Util.showEmployeeF4(this, E, d.Account, d.AccountTxt);
	// 		this.ResponsibleID = d.Responsible;
	// 	},
	// 	_removeCrossAppAttributes: function() {
	// 		delete this.Responsible;
	// 		delete this.ResponsibleTxt;
	// 		delete this.ContactName;
	// 		delete this.ContactID;
	// 		delete this.AccountName;
	// 		delete this.AccountID;
	// 	},
	// 	_deepSanitize: function(a, b) {
	// 		var k;
	// 		if (a instanceof Array && b instanceof Array) {
	// 			for (k in b) {
	// 				this._deepSanitize(a[k], b[k]);
	// 			}
	// 			return;
	// 		}
	// 		if (a instanceof Object && b instanceof Object) {
	// 			for (k in a) {
	// 				if (!b.hasOwnProperty(k)) {
	// 					delete a[k];
	// 				} else {
	// 					this._deepSanitize(a[k], b[k]);
	// 				}
	// 			}
	// 		}
	// 	},
	// 	_scrollToTop: function() {
	// 		this.byId("p").scrollTo(0);
	// 	},
	// 	_setViewMode: function(m) {
	// 		this.getView().getModel("viewState").oData.Mode = m;
	// 	},
	// 	_getViewMode: function() {
	// 		return this.getView().getModel("viewState").oData.Mode;
	// 	},
	// 	_interopChecks: function(b) {
	// 		if (parseFloat(b) >= 4) {
	// 			this.byId("priority").setVisible(true);
	// 		} else {
	// 			this.byId("priority").setVisible(false);
	// 		}
	// 	},
	// 	_refreshAppointment: function() {
	// 		this.editAppointment(this.sEntityPath, this.sApptGuid);
	// 		cus.crm.mycalendar.util.Util._fetchETag(this.sEntityPath, this.oModel);
	// 	}
	// ***************************************************************************
	// Ab hier Custom-Implementierung
	// ***************************************************************************
	extHookCustomLogicOnRouteMatched: function(e) {
		this.byId("privateLabel").setVisible(false);
		this.byId("allDayFormElement").setVisible(false);
		this.byId("priority").setVisible(false);
		this.byId("responsible").setVisible(false);
		this.byId("externalFormElement").setVisible(false);

		// if (this.followupappointment || this.followupappointmentfromtask || this.newappointmentfromoppt ||
		// 	// this.newappointmentfromaccount || this.createFromAccount ||
		// 	this.newAppointment) {
		// 	// Try and fix standard selection of appointment status
		// 	var processType = e.getParameter("arguments").processType;

		// 	if (processType !== undefined) {
		// 		// Try and fix standard selection of appointment status
		// 		var c = this.oApplicationFacade.getApplicationModel("customizing");
		// 		var d = c.oData;
		// 		var oDefaultStatus = cus.crm.mycalendar.util.Util.getDefaultStatus(d.mStatuses[processType]);

		// 		var vm = this.getView().getModel("vm");
		// 		vm.oData.Status = oDefaultStatus.StatusID;
		// 		vm.oData.StatusTxt = oDefaultStatus.StatusTxt;
		// 		vm.updateBindings();
		// 	}
		// }
	},
	extHookEditAppointment: function(e, a) {
		this.byId("TypecFormElement").setVisible(false);
		this.byId("ProcessTypeLabel").setVisible(false);
		this.byId("ProcessTypeText").setVisible(false);
		this.byId("responsible").setVisible(false);
		this.byId("attachmentsView_chg1").setVisible(false);
		this.byId("externalFormElement").setVisible(false);
		this.initSalesFields(false);
	},
	initSalesFields: function(create) {
		var w = this.getView().getModel("controllers").getData().apptListController;
		if (w == null) {
			cus.crm.mycalendar.CRM_MYCALExtension.util.Util.getCustomData(this);
		} else {
			this.SalesOrgs = w.SalesOrgs;
			this.SalesOffs = w.SalesOffs;
			this.SalesGrps = w.SalesGrps;
			this.MyOpportunities = w.MyOpportunities;
		}
		this.initSalesArea(create);
	},
	extHookCreateAppointment: function() {
		if (this.processTypeHelper) {
			this.setStatusDefault(this.processTypeHelper);
		}
		// if (this.followupappointment || this.followupappointmentfromtask || this.newappointmentfromoppt ||
		// 	this.newappointmentfromaccount || this.createFromAccount ||
		// 	this.newAppointment) {
		// 	// Try and fix standard selection of appointment status

		// 	if (this.processTypeHelper !== undefined) {
		// 		// Try and fix standard selection of appointment status
		// 		var c = this.oApplicationFacade.getApplicationModel("customizing");
		// 		var d = c.oData;
		// 		var oDefaultStatus = cus.crm.mycalendar.util.Util.getDefaultStatus(d.mStatuses[this.processTypeHelper]);

		// 		var vm = this.getView().getModel("vm");
		// 		vm.oData.Status = oDefaultStatus.StatusID;
		// 		vm.oData.StatusTxt = oDefaultStatus.StatusTxt;
		// 		vm.updateBindings();
		// 	}
		// }

		this.byId("TypecFormElement").setVisible(false);
		this.byId("ProcessTypeLabel").setVisible(false);
		this.byId("ProcessTypeText").setVisible(false);
		this.initSalesFields(true);
		if (this.newappointmentfromoppt) {
			this.title = decodeURIComponent(this.title);
			this.byId("myOpp").setEditable(false);
			this._setMyOpp(this.opportunityId, this.title)
		} else {
			this.byId("myOpp").setEditable(true);
		}
	},
	extHookEnableSaveBtn: function() {
		var a = this.getAppointment();

		if (a.SalesOrganization === null || a.SalesOffice === null || a.SalesGroup === null)
			this.byId("bs").setEnabled(false);

		if (a.Account == "")
			this.byId("bs").setEnabled(false);
	},
	extHookPrepareEntity: function(e) {
		e.SalesOrganization = this.SalesOrgKey;
		e.SalesOrganizationDescription = this.SalesOrgTxt;
		e.SalesOffice = this.SalesOffKey;
		e.SalesOfficeTxt = this.SalesOffTxt;
		e.SalesGroup = this.SalesGrpKey;
		e.SalesGroupTxt = this.SalesGrpTxt;
		e.ZOppIdPrev = this.initialMyOppId;
		e.ZOppId = this.MyOppKey;
		e.ZOppDesc = this.MyOppTxt;
		delete e.PredecessorID;
		return e;
	},
	extHookValidateAdditionalFields: function() {
		var e = this.getAppointment();
		if (e.Account == "")
			return false;
		return true;
	},
	initSalesArea: function(create) {
		var f = this.enableSaveBtn;
		this.enableSaveBtn = function() {};
		if (!create) {
			var v = this.getView().getModel("vm").oData;

			this.initialSalesOrgId = v.SalesOrganization;
			this.initialSalesOrgTxt = v.SalesOrganizationDescription;
			this.initialSalesOffId = v.SalesOffice;
			this.initialSalesOffTxt = v.SalesOfficeTxt;
			this.initialSalesGrpId = v.SalesGroup;
			this.initialSalesGrpTxt = v.SalesGroupTxt;
			this.initialMyOppId = v.ZOppId;
			this.initialMyOppTxt = v.ZOppDesc;

			this._setSalesOrg(this.initialSalesOrgId, this.initialSalesOrgTxt);
			this._setSalesOff(this.initialSalesOffId, this.initialSalesOffTxt);
			this._setSalesGrp(this.initialSalesGrpId, this.initialSalesGrpTxt);
			this._setMyOpp(this.initialMyOppId, this.initialMyOppTxt);
		} else {
			this.initialSalesOrgId = null;
			this.initialSalesOrgTxt = "";
			this.initialSalesOffId = null;
			this.initialSalesOffTxt = "";
			this.initialSalesGrpId = null;
			this.initialSalesGrpTxt = "";
			this.initialMyOppId = "";
			this.initialMyOppTxt = "";

			var r = this.Common.getSalesOrgDefault(this.SalesOrgs);
			this._setSalesOrg(r.key, r.txt);
			this._setMyOpp(this.initialMyOppId, this.initialMyOppTxt);
		}
		this.enableSaveBtn = f;
	},
	buildCustomData: function(k, v) {
		var cd = new sap.ui.core.CustomData();
		cd.setKey(k);
		cd.setValue(v);
		return cd;
	},
	// F4 SalesOrg
	searchSalesOrg: function(e) {
		var v = e.getParameter("value");
		var f;
		if (v !== undefined) {
			f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
				new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
			], true);
		} else {
			f = new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X");
		}
		e.getParameter("itemsBinding").filter([f]);
	},
	setSalesOrg: function(e) {
		var c = e.getParameter("selectedItem");
		this._setSalesOrg(c.data("SalesOrgIdO"), c.data("TxtLong"));
	},
	_setSalesOrg: function(ido, txl) {
		var ms = this.byId("salesOrg");
		ms.setValue(txl);
		ms.setValueState(sap.ui.core.ValueState.None);
		this.SalesOrgKey = ido;
		this.SalesOrgTxt = txl;
		var r = this.Common.getSalesOffDefault(this.SalesOffs, this.SalesOrgKey);
		this._setSalesOff(r.key, r.txt, ido !== null);

	},
	liveSearchSalesOrg: function(e) {
		var v = e.getParameter("value");
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
			new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
		], true);
		e.getParameter("itemsBinding").filter([f]);
	},
	onSalesOrgSuggest: function(e) {
		var s = e.getSource();
		var v = e.getParameters().suggestValue.toLowerCase();
		var sug = this.SalesOrgs.filter(function(el) {
			if (el._txtLongLower === undefined) {
				el._txtLongLower = el.TxtLong.toLocaleLowerCase();
			}
			return (el._txtLongLower.indexOf(v) !== -1 && el.Mine === "X");
		});
		// 		sug.sort(function(a, b) {
		// 			if (a._clustTxtLower === b._clustTxtLower)
		// 				return a._msegTxtLower.localeCompare(b._msegTxtLower);
		// 			else
		// 				return a._clustTxtLower.localeCompare(b._clustTxtLower);
		// 		});
		s.removeAllSuggestionItems();
		for (var i = 0; i < sug.length; i++) {
			var si = new sap.ui.core.Item();
			si.setKey(sug[i].SalesOrgIdO);
			si.setText(sug[i].TxtLong);
			si.addCustomData(this.buildCustomData(sug[i].SalesOrgIdO, sug[i].TxtLong));
			s.addSuggestionItem(si);
		}
	},
	onSalesOrgSuggestItemSelected: function(e) {
		var I = e.getParameter("selectedItem");
		var cd = I.getCustomData();
		cd = cd[0];
		this._setSalesOrg(cd.getKey(), cd.getValue());
	},
	onSalesOrgInputFieldChanged: function(e) {
		this.byId('salesOrg').setValueState(sap.ui.core.ValueState.None);
		this._setSalesOff(null, "", false);
	},
	showSalesOrgF4: function() {
		this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.CRM_MYCALExtension.view.SalesOrgSelectDialog", this);
		this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
		var m = this.oModel;
		var j = new sap.ui.model.json.JSONModel();
		var d;
		if (this.SalesOrgs.length === 0) {
			var t = this;
			m.read("SalesOrgs", null, null, false, function(D, r) {
				d = {
					SalesOrgs: r.data.results
				};
				t.SalesOrgs = r.data.results;
			});
		} else {
			d = {
				SalesOrgs: this.SalesOrgs
			};
		}
		j.setData(d);
		this.oActionSheet.setModel(j, "json");
		var i = this.oActionSheet.getBinding("items");
		var f = new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X");
		i.filter(f);
		this.oActionSheet.open();
	},
	// F4 SalesOff
	searchSalesOff: function(e) {
		var v = e.getParameter("value");
		var p = this.SalesOrgKey;
		var f;
		if (v !== undefined) {
			f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
				new sap.ui.model.Filter("ParentSalesOrgIdO", sap.ui.model.FilterOperator.EQ, p),
				new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
			], true);
		} else {
			f = new sap.ui.model.Filter([new sap.ui.model.Filter("ParentSalesOrgIdO", sap.ui.model.FilterOperator.EQ, p),
				new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
			], true);
		}
		e.getParameter("itemsBinding").filter([f]);
	},
	setSalesOff: function(e) {
		var c = e.getParameter("selectedItem");
		this._setSalesOff(c.data("SalesOffIdO"), c.data("TxtLong"));
	},
	_setSalesOff: function(ido, txl, state) {
		var ms = this.byId("salesOff");
		ms.setValue(txl);
		ms.setValueState(sap.ui.core.ValueState.None);
		if (typeof state !== "undefined")
			ms.setEnabled(state);
		this.SalesOffKey = ido;
		this.SalesOffTxt = txl;
		var r = this.Common.getSalesGrpDefault(this.SalesGrps, this.SalesOffKey);
		this._setSalesGrp(r.key, r.txt, ido !== null);
		this.enableSaveBtn();
	},
	liveSearchSalesOff: function(e) {
		var v = e.getParameter("value");
		var p = this.SalesOrgKey;
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
			new sap.ui.model.Filter("ParentSalesOrgIdO", sap.ui.model.FilterOperator.EQ, p),
			new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
		], true);
		e.getParameter("itemsBinding").filter([f]);
	},
	onSalesOffSuggest: function(e) {
		var s = e.getSource();
		var v = e.getParameters().suggestValue.toLowerCase();
		var org = this.SalesOrgKey;
		var sug = this.SalesOffs.filter(function(el) {
			if (el._txtLongLower === undefined) {
				el._txtLongLower = el.TxtLong.toLocaleLowerCase();
			}
			return (el._txtLongLower.indexOf(v) !== -1 && el.ParentSalesOrgIdO === org && el.Mine === "X");
		});
		// 		sug.sort(function(a, b) {
		// 			if (a._clustTxtLower === b._clustTxtLower)
		// 				return a._msegTxtLower.localeCompare(b._msegTxtLower);
		// 			else
		// 				return a._clustTxtLower.localeCompare(b._clustTxtLower);
		// 		});
		s.removeAllSuggestionItems();
		for (var i = 0; i < sug.length; i++) {
			var si = new sap.ui.core.Item();
			si.setKey(sug[i].SalesOffIdO);
			si.setText(sug[i].TxtLong);
			si.addCustomData(this.buildCustomData(sug[i].SalesOffIdO, sug[i].TxtLong));
			s.addSuggestionItem(si);
		}
	},
	onSalesOffSuggestItemSelected: function(e) {
		var I = e.getParameter("selectedItem");
		var cd = I.getCustomData();
		cd = cd[0];
		this._setSalesOff(cd.getKey(), cd.getValue());
	},
	onSalesOffInputFieldChanged: function(e) {
		this.byId('salesOff').setValueState(sap.ui.core.ValueState.None);
		this._setSalesGrp(null, "", false);
	},
	showSalesOffF4: function() {
		this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.CRM_MYCALExtension.view.SalesOffSelectDialog", this);
		this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
		var m = this.oModel;
		var j = new sap.ui.model.json.JSONModel();
		var d;
		if (this.SalesOffs.length === 0) {
			var t = this;
			m.read("SalesOffs", null, null, false, function(D, r) {
				d = {
					SalesOffs: r.data.results
				};
				t.SalesOffs = r.data.results;
			});
		} else {
			d = {
				SalesOffs: this.SalesOffs
			};
		}
		j.setData(d);
		this.oActionSheet.setModel(j, "json");
		var i = this.oActionSheet.getBinding("items");
		var v = this.SalesOrgKey;
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("ParentSalesOrgIdO", sap.ui.model.FilterOperator.EQ, v),
			new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
		], true);
		i.filter(f);
		this.oActionSheet.open();
	},
	// F4 SalesGrp
	searchSalesGrp: function(e) {
		var v = e.getParameter("value");
		var p = this.SalesOffKey;
		var f;
		if (v !== undefined) {
			f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
				new sap.ui.model.Filter("ParentSalesOffIdO", sap.ui.model.FilterOperator.EQ, p),
				new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
			], true);
		} else {
			f = new sap.ui.model.Filter([new sap.ui.model.Filter("ParentSalesOffIdO", sap.ui.model.FilterOperator.EQ, p),
				new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
			], true);
		}
		e.getParameter("itemsBinding").filter([f]);
	},
	setSalesGrp: function(e) {
		var c = e.getParameter("selectedItem");
		this._setSalesGrp(c.data("SalesGrpIdO"), c.data("TxtLong"));
	},
	_setSalesGrp: function(ido, txl, state) {
		var ms = this.byId("salesGrp");
		ms.setValue(txl);
		ms.setValueState(sap.ui.core.ValueState.None);
		if (typeof state !== "undefined")
			ms.setEnabled(state);
		this.SalesGrpKey = ido;
		this.SalesGrpTxt = txl;
		this.enableSaveBtn();
	},
	liveSearchSalesGrp: function(e) {
		var v = e.getParameter("value");
		var p = this.SalesOffKey;
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("TxtLong", sap.ui.model.FilterOperator.Contains, v),
			new sap.ui.model.Filter("ParentSalesOffIdO", sap.ui.model.FilterOperator.EQ, p),
			new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
		], true);
		e.getParameter("itemsBinding").filter([f]);
	},
	onSalesGrpSuggest: function(e) {
		var s = e.getSource();
		var v = e.getParameters().suggestValue.toLowerCase();
		var off = this.SalesOffKey;
		var sug = this.SalesGrps.filter(function(el) {
			if (el._txtLongLower === undefined) {
				el._txtLongLower = el.TxtLong.toLocaleLowerCase();
			}
			return (el._txtLongLower.indexOf(v) !== -1 && el.ParentSalesOffIdO === off && el.Mine === "X");
		});
		// 		sug.sort(function(a, b) {
		// 			if (a._clustTxtLower === b._clustTxtLower)
		// 				return a._msegTxtLower.localeCompare(b._msegTxtLower);
		// 			else
		// 				return a._clustTxtLower.localeCompare(b._clustTxtLower);
		// 		});
		s.removeAllSuggestionItems();
		for (var i = 0; i < sug.length; i++) {
			var si = new sap.ui.core.Item();
			si.setKey(sug[i].SalesGrpIdO);
			si.setText(sug[i].TxtLong);
			si.addCustomData(this.buildCustomData(sug[i].SalesGrpIdO, sug[i].TxtLong));
			s.addSuggestionItem(si);
		}
	},
	onSalesGrpSuggestItemSelected: function(e) {
		var I = e.getParameter("selectedItem");
		var cd = I.getCustomData();
		cd = cd[0];
		this._setSalesGrp(cd.getKey(), cd.getValue());
	},
	onSalesGrpInputFieldChanged: function(e) {
		this.byId('salesGrp').setValueState(sap.ui.core.ValueState.None);
		this._setSalesGrp(null, e.mParameters.newValue, true);
	},
	showSalesGrpF4: function() {
		this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.CRM_MYCALExtension.view.SalesGrpSelectDialog", this);
		this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
		var m = this.oModel;
		var j = new sap.ui.model.json.JSONModel();
		var d;
		if (this.SalesGrps.length === 0) {
			var t = this;
			m.read("SalesGrps", null, null, false, function(D, r) {
				d = {
					SalesGrps: r.data.results
				};
				t.SalesGrps = r.data.results;
			});
		} else {
			d = {
				SalesGrps: this.SalesGrps
			};
		}
		j.setData(d);
		this.oActionSheet.setModel(j, "json");
		var i = this.oActionSheet.getBinding("items");
		var v = this.SalesOffKey;
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("ParentSalesOffIdO", sap.ui.model.FilterOperator.EQ, v),
			new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X")
		], true);
		i.filter(f);
		this.oActionSheet.open();
	},
	// F4 MyOpp	
	searchMyOpp: function(e) {
		var v = e.getParameter("value");
		if (v !== undefined) {
			var f = new sap.ui.model.Filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v),
				new sap.ui.model.Filter("ObjectId", sap.ui.model.FilterOperator.Contains, v)
			], false);
			e.getParameter("itemsBinding").filter([f]);
		}
	},
	setMyOpp: function(e) {
		var c = e.getParameter("selectedItem");
		this._setMyOpp(c.data("ObjectId"), c.data("Description"));
	},
	_setMyOpp: function(id, desc) {
		var ms = this.byId("myOpp");
		ms.setValue(desc);
		ms.setValueState(sap.ui.core.ValueState.None);
		this.MyOppKey = id;
		this.MyOppTxt = desc;
	},
	liveSearchMyOpp: function(e) {
		var v = e.getParameter("value");
		var f = new sap.ui.model.Filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v),
			new sap.ui.model.Filter("ObjectId", sap.ui.model.FilterOperator.Contains, v)
		], false);
		e.getParameter("itemsBinding").filter([f]);
	},
	onMyOppSuggest: function(e) {
		var s = e.getSource();
		var v = e.getParameters().suggestValue.toLowerCase();
		var sug = this.MyOpportunities.filter(function(el) {
			if (el._descriptionLower === undefined) {
				el._descriptionLower = el.Description.toLocaleLowerCase();
			}
			return (el._descriptionLower.indexOf(v) !== -1 || el.ObjectId.indexOf(v) !== -1);
		});
		// 		sug.sort(function(a, b) {
		// 			if (a._clustTxtLower === b._clustTxtLower)
		// 				return a._msegTxtLower.localeCompare(b._msegTxtLower);
		// 			else
		// 				return a._clustTxtLower.localeCompare(b._clustTxtLower);
		// 		});
		s.removeAllSuggestionItems();
		for (var i = 0; i < sug.length; i++) {
			var si = new sap.ui.core.Item();
			si.setKey(sug[i].ObjectId);
			si.setText(sug[i].Description);
			si.addCustomData(this.buildCustomData(sug[i].ObjectId, sug[i].Description));
			s.addSuggestionItem(si);
		}
	},
	onMyOppSuggestItemSelected: function(e) {
		var I = e.getParameter("selectedItem");
		var cd = I.getCustomData();
		this._setMyOpp(cd[0].getKey(), cd[0].getValue());
	},
	onMyOppInputFieldChanged: function(e) {
		this.byId('myOpp').setValueState(sap.ui.core.ValueState.None);
		this.MyOppKey = "";
	},
	showMyOppF4: function() {
		this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.CRM_MYCALExtension.view.MyOppSelectDialog", this);
		this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
		var m = this.oModel;
		var j = new sap.ui.model.json.JSONModel();
		var d;
		if (this.MyOpportunities.length === 0) {
			var t = this;
			m.read("MyOpportunities", null, null, false, function(D, r) {
				d = {
					MyOpportunities: r.data.results
				};
				t.MyOpportunities = r.data.results;
			});
		} else {
			d = {
				MyOpportunities: this.MyOpportunities
			};
		}
		j.setData(d);
		this.oActionSheet.setModel(j, "json");
		// var i = this.oActionSheet.getBinding("items");
		// var f = new sap.ui.model.Filter("Mine", sap.ui.model.FilterOperator.EQ, "X");
		// i.filter(f);
		this.oActionSheet.open();
	},
	setStatusDefault: function(processType) {
		this.processTypeHelper = processType;
		// Try and fix standard selection of appointment status
		var c = this.oApplicationFacade.getApplicationModel("customizing");
		var d = c.oData;
		if (!d.mStatuses) {
			cus.crm.mycalendar.util.Util.getCustomizing(processType, this);
		}
		if (d.mStatuses) {
			var oDefaultStatus = cus.crm.mycalendar.util.Util.getDefaultStatus(d.mStatuses[processType]);

			var vm = this.getView().getModel("vm");
			vm.oData.Status = oDefaultStatus.StatusID;
			vm.oData.StatusTxt = oDefaultStatus.StatusTxt;
			vm.updateBindings();
		}
	}
});