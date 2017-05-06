/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
//jQuery.sap.require("cus.crm.mycalendar.util.Util");
jQuery.sap.require("cus.crm.mycalendar.util.Conversions");
jQuery.sap.require("sap.ca.ui.utils.busydialog");
jQuery.sap.require("sap.ca.ui.message.message");
jQuery.sap.require("sap.ca.scfld.md.controller.BaseFullscreenController");
jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("cus.crm.mycalendar.util.Schema");
sap.ui.controller("cus.crm.mycalendar.CRM_MYCALExtension.view.AppointmentListCustom", {
    // ERCO on
	SalesOrgs: [],
	SalesOffs: [],
	SalesGrps: [],
    MyOpportunities: [],
    // ERCO off
    
// 	filterAccountID: null,
// 	filterDate: new Date(),
// 	createFromNote: false,
// 	bTodayClicked: false,
// 	createFromOppt: false,
// 	processType: null,
// 	AccountName: null,
// 	title: null,
// 	ContactName: null,
// 	opportunityId: null,
// 	StartDate: null,
 	onInit: function() {
        // ERCO on
 	    this.calendarsButton = this.byId("Calendar_type");
        this.calendarsButton.setVisible(false);
        cus.crm.mycalendar.CRM_MYCALExtension.util.Util.getCustomData(this);
        // ERCO off
// 		sap.ca.scfld.md.controller.BaseFullscreenController.prototype.onInit.call(this);
// 		if (!this.oApplicationFacade.getApplicationModel("customizing")) {
// 			cus.crm.mycalendar.util.Util.initCustomizingModel(this);
// 		}
// 		this.calendarType = "W";
// 		this.isMock = this.oApplicationFacade.isMock();
// 		this.bIsPhone = jQuery.device.is.phone;
// 		this.oPage = this.byId("appointmentListPage");
// 		this.oList = this.byId("l");
// 		this.getView().setModel(new sap.ui.model.json.JSONModel({
// 			isSharedCalendar: false
// 		}), "vm");
// 		this.sharedCalendar = sap.ui.xmlfragment(this.createId("sharedCalendarFragment"), "cus.crm.mycalendar.view.sharedDialog", this);
// 		this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 		this.mycalendar = this.byId("mycalendar");
// 		this.oList.addEventDelegate({
// 			onAfterRendering: jQuery.proxy(function() {
// 				var n = new Date(new Date().toDateString());
// 				if (this.oList.getItems().length > 0 && this.bTodayClicked) {
// 					window.setTimeout(jQuery.proxy(function() {
// 						this.oCal.fireTapOnDate({
// 							didSelect: true,
// 							date: n
// 						});
// 					}, this), 100);
// 					this.bTodayClicked = false;
// 				}
// 			}, this)
// 		});
// 		this.oCal = this.byId("cal");
// 		this.oScroll = this.byId("scroll");
// 		this.oFilterBar = this.byId("filterPanel");
// 		this.oFilterText = this.byId("filtertext");
// 		this.oFooterBar = this.byId("master_footer");
// 		this.osbtnTimeSwitch = this.byId("sbtnTimeSwitch");
// 		this.oBundle = this.oApplicationFacade.getResourceBundle();
// 		var l = new sap.ui.core.LocaleData(sap.ui.getCore().getConfiguration().getLocale());
// 		this.oCal.setFirstDayOffset(l.getFirstDayOfWeek());
// 		this.byId("btnAdd").setIcon("sap-icon://add");
// 		this.oModel = this.oApplicationFacade.getODataModel();
// 		this.oModel.attachRequestCompleted(this, this.onRequestCompleted, this);
// 		this.oModel.setCountSupported(false);
// 		this.oModel.setSizeLimit(5000);
// 		this.calendarsButton = this.byId("Calendar_type");
// 		var b = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
// 		this.sBackendVersion = b;
// 		if (parseFloat(b) >= 3) {
// 			this.calendarsButton.setVisible(true);
// 		} else {
// 			this.calendarsButton.setVisible(false);
// 		}
// 		this.oRouter.attachRouteMatched(function(e) {
// 			jQuery.sap.log.info("### nav target:  " + e.getParameter("name"));
// 			var d;
// 			if (e.getParameter("name") === "start" || e.getParameter("name") === "catchall") {
// 				jQuery.sap.log.info("### AppointmentList Calendar   ### reRendering");
// 				this.onDisplayWeek();
// 				this.oCal.rerender();
// 				this.filterDate = new Date(new Date().toDateString());
// 				this.oCal.toggleDatesSelection([this.filterDate], true);
// 				this.getAppointmentList();
// 			}
// 			if ((e.getParameter("name") === "month") || (e.getParameter("name") === "month_phone")) {
// 				this.onDisplayMonth();
// 				if (e.getParameter("arguments").Date) {
// 					if (e.getParameter("arguments").Date.charAt(0) === "_") {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date.substring(1));
// 						this.oCal.toggleDatesSelection(this.oCal.getSelectedDates(), false);
// 					} else {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date);
// 						this.oCal.toggleDatesSelection([d], true);
// 						this.filterDate = d;
// 					}
// 					this.oCal.setCurrentDate(d);
// 					if (e.getParameter("name") === "month_phone") {
// 						this.oList.setVisible(true);
// 						this.oPage.setEnableScrolling(true);
// 					} else {
// 						this.oPage.setEnableScrolling(false);
// 						this.oList.setVisible(true);
// 					}
// 					jQuery.sap.log.info("### AppointmentList Calendar   ### reRendering");
// 					this.oCal.rerender();
// 					this.getAppointmentList();
// 				}
// 			}
// 			if (e.getParameter("name") === "week") {
// 				this.onDisplayWeek();
// 				if (e.getParameter("arguments").Date) {
// 					if (e.getParameter("arguments").Date.charAt(0) === "_") {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date.substring(1));
// 						this.oCal.toggleDatesSelection(this.oCal.getSelectedDates(), false);
// 					} else {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date);
// 						this.oCal.toggleDatesSelection([d], true);
// 						this.filterDate = d;
// 					}
// 					this.oCal.setCurrentDate(d);
// 					this.oList.setVisible(true);
// 					jQuery.sap.log.info("### AppointmentList Calendar   ### reRendering");
// 					this.oCal.rerender();
// 					this.getAppointmentList();
// 				}
// 			}
// 			if ((e.getParameter("name") === "month/account") || (e.getParameter("name") === "month_phone/account")) {
// 				this.onDisplayMonth();
// 				if (e.getParameter("arguments").AccountID) {
// 					this.filterAccountID = e.getParameter("arguments").AccountID;
// 					this.setAccountFilterText();
// 				}
// 				if (e.getParameter("arguments").Date) {
// 					if (e.getParameter("arguments").Date.charAt(0) === "_") {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date.substring(1));
// 						this.oCal.toggleDatesSelection(this.oCal.getSelectedDates(), false);
// 					} else {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date);
// 						this.oCal.toggleDatesSelection([d], true);
// 						this.filterDate = d;
// 					}
// 					this.oCal.setCurrentDate(d);
// 					if (e.getParameter("name") === "month_phone/account") {
// 						this.oList.setVisible(false);
// 					} else {
// 						this.oList.setVisible(true);
// 					}
// 					jQuery.sap.log.info("### AppointmentList Calendar   ### reRendering");
// 					this.oCal.rerender();
// 					this.getAppointmentList();
// 				}
// 			}
// 			if (e.getParameter("name") === "week/account") {
// 				this.onDisplayWeek();
// 				if (e.getParameter("arguments").AccountID) {
// 					this.filterAccountID = e.getParameter("arguments").AccountID;
// 					this.setAccountFilterText();
// 				}
// 				if (e.getParameter("arguments").Date) {
// 					if (e.getParameter("arguments").Date.charAt(0) === "_") {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date.substring(1));
// 						this.oCal.toggleDatesSelection(this.oCal.getSelectedDates(), false);
// 					} else {
// 						d = this.getDatefromParameterString(e.getParameter("arguments").Date);
// 						this.oCal.toggleDatesSelection([d], true);
// 						this.filterDate = d;
// 					}
// 					this.oCal.setCurrentDate(d);
// 					this.oList.setVisible(true);
// 					jQuery.sap.log.info("### AppointmentList Calendar   ### reRendering");
// 					this.oCal.rerender();
// 					this.getAppointmentList();
// 				}
// 			}
// 			var t = this;
// 			if (this.filterDate) {
// 				window.setTimeout(function() {
// 					jQuery.sap.log.info("### AppointmentList Calendar   ### scroll timer");
// 					t.scrollToDate(t.filterDate, t);
// 					t.filterDate = null;
// 					t.setScrollSize();
// 				}, 1800);
// 			}
// 		}, this);
// 		var t = this;
// 		window.onresize = function(e) {
// 			t.setScrollSize();
// 		};
// 		var b = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
// 		this.oVersioningModel = new sap.ui.model.json.JSONModel({});
// 		this._loadVersionSpecificUI(b);
 	},
// 	_loadVersionSpecificUI: function(b) {
// 		if (b >= 2) this._loadWave4UI();
// 		else this._loadWave3UI();
// 	},
// 	_loadWave3UI: function() {
// 		this.byId('btnAdd').attachPress(jQuery.proxy(this.onCreate1, this));
// 	},
// 	_loadWave4UI: function() {
// 		this.byId('btnAdd').attachPress(jQuery.proxy(this.onCreate, this));
// 	},
// 	onBeforeRendering: function() {
// 		jQuery.sap.log.info("### AppointmentList Controller   ### beforeRendering");
// 		this.getView().getModel('controllers').getData().apptListController = this;
// 		this.defineButtons();
// 		this.checkStartupParameter();
// 		this.setAccountFilterText();
// 	},
// 	onAfterRendering: function() {
// 		jQuery.sap.log.info("### AppointmentList Controller   ### afterRendering");
// 		if (this.createFromNote) {
// 			this.oRouter.navTo("newappointmentfromnote", {
// 				processType: this.processType,
// 			});
// 			this.createFromNote = false;
// 		}
// 		if (this.createFromOppt) {
// 			this.oRouter.navTo("newappointmentfromoppt", {
// 				processType: this.processType,
// 			});
// 			this.createFromOppt = false;
// 		}
// 	},
// 	setAccountFilterText: function() {
// 		var t = this.oBundle.getText("view.Appointment.filteraccount");
// 		if (this.filterAccountID) {
// 			this.oFilterText.setText(t + " " + this.filterAccountID);
// 			this.oFilterBar.setHeight("32px");
// 			this.oFilterBar.setVisible(true);
// 		} else {
// 			this.oFilterBar.setVisible(false);
// 		} if (this.filterAccountID && !this.isMock) {
// 			var s = this.oApplicationFacade.getODataModel();
// 			var a = this;
// 			s.read("/AccountCollection('" + this.filterAccountID + "')", null, null, false, function(d, r) {
// 				if (d.name1) {
// 					var t = a.oBundle.getText("view.Appointment.filteraccount");
// 					a.oFilterText.setText(t + " " + d.name1);
// 				}
// 			});
// 		}
// 	},
// 	checkStartupParameter: function() {
// 		if (!this.firstTime) {
// 			this.firstTime = true;
// 			var s = this.getView().getModel("startupParameters");
// 			this.filterAccountID = null;
// 			if (s && s.oData) {
// 				if (s.oData.parameters) {
// 					for (var p in s.oData.parameters) {
// 						if (s.oData.parameters[p].key == "createFromNote") {
// 							this.createFromNote = true;
// 						}
// 						if (s.oData.parameters[p].key == "createFromOppt") {
// 							this.createFromOppt = true;
// 						}
// 						if (s.oData.parameters[p].key == "processType") {
// 							this.processType = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "AccountName") {
// 							this.AccountName = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "title") {
// 							this.title = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "ContactName") {
// 							this.ContactName = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "opportunityId") {
// 							this.opportunityId = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "StartDate") {
// 							this.StartDate = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "accountID") {
// 							this.filterAccountID = s.oData.parameters[p].value;
// 						}
// 						if (s.oData.parameters[p].key == "Date") {
// 							this.filterDate = s.oData.parameters[p].value;
// 						}
// 					}
// 					if (this.filterDate) {
// 						var d = this.getDatefromParameterString(this.filterDate);
// 						if (d) {
// 							this.oCal.setCurrentDate(d);
// 						}
// 					}
// 					if (this.filterAccountID) {
// 						this.getAppointmentList();
// 					}
// 				}
// 			}
// 		}
// 	},
// 	onRequestCompleted: function(e) {
// 		jQuery.sap.log.info("### AppointmentList Controller   ### oData request completed");
// 		var t = this.oBundle.getText("view.Appointment.appointment_nodata");
// 		this.oList.setNoDataText(t);
// 		this.setScrollSize();
// 		if (this.oList.getBinding('items')) {
// 			var n = this.oList.getBinding('items').getLength();
// 			if (typeof cus.crm.myaccounts !== 'undefined' && typeof cus.crm.myaccounts.NavigationHelper !== 'undefined' && typeof cus.crm.myaccounts
// 				.NavigationHelper.qty !== 'undefined') {
// 				if (cus.crm.myaccounts.NavigationHelper.qty > n && typeof this.filterAccountID !== 'undefined') {
// 					sap.ca.ui.message.showMessageToast(this.oApplicationFacade.getResourceBundle().getText("LIST_FILTERED_BY_MYITEMS", [n, cus.crm.myaccounts
// 						.NavigationHelper.qty]));
// 				}
// 				cus.crm.myaccounts.NavigationHelper.qty = undefined;
// 			}
// 		}
// 	},
// 	getAppointmentList: function() {
// 		jQuery.sap.log.info("### AppointmentList Controller   ### getAppointmentList");
// 		var t = this;
// 		if (this.selectedEmp) {
// 			this.oPage.setTitle(t.employeeName + " " + t.oBundle.getText("view.Appointment.apptitle"));
// 		} else {
// 			this.oPage.setTitle(t.oBundle.getText("view.Appointment.apptitle"));
// 		}
// 		var T = this.oBundle.getText("view.Appointment.loaddatatext");
// 		this.oList.setNoDataText(T);
// 		var l = this.byId("AppListItem");
// 		this.oList.removeItem(l);
// 		var f = this.getViewFilters();
// 		var t = this;
// 		var d = new sap.ui.model.Sorter("FromDate", false, function(c) {
// 			var D = c.getProperty("FromDate");
// 			var s = c.getProperty("ToDate");
// 			if (typeof D === "string") {
// 				D = D.replace("/Date(", "").replace(")/", "");
// 				var i = parseInt(D);
// 				D = new Date(i);
// 				s = s.replace("/Date(", "").replace(")/", "");
// 				i = parseInt(s);
// 				s = new Date(i);
// 			}
// 			var a = c.getProperty("AllDay");
// 			if (a) {
// 				var b = D.getTimezoneOffset();
// 				var e = s.getTimezoneOffset();
// 				D.setTime(D.getTime() + b * 60 * 1000);
// 				s.setTime(s.getTime() + e * 60 * 1000);
// 			}
// 			var g = sap.ui.core.format.DateFormat.getDateInstance({
// 				style: "full"
// 			});
// 			return {
// 				key: t.getDateString(D),
// 				text: g.format(D)
// 			};
// 		});
// 		this.oCal.removeTypesOfAllDates();
// 		this.oCal._removeStyleClassOfAllDates("sapMeCalendarTypeDot");
// 		this.oList.bindAggregation("items", {
// 			path: "/AppointmentSet",
// 			template: l,
// 			sorter: d,
// 			filters: f,
// 			groupHeaderFactory: function(g) {
// 				var h = new sap.m.GroupHeaderListItem({
// 					title: g.text
// 				});
// 				if (g.key === t.getDateString(new Date())) {
// 					h.addStyleClass("sapMLabelBold");
// 				}
// 				t.oCal.toggleDatesType([g.key], "TypeDot", true);
// 				h.setUpperCase(false);
// 				return h;
// 			}
// 		});
// 	},
// 	onTodayClick: function(t) {
// 		var n;
// 		if (t) {
// 			n = t;
// 		} else {
// 			n = new Date(new Date().toDateString());
// 		} if (n < this.calFromRange || this.calToRange < n) {
// 			this.getAppointmentList();
// 			this.bTodayClicked = true;
// 		} else {
// 			this.oCal.fireTapOnDate({
// 				didSelect: true,
// 				date: n
// 			});
// 		}
// 		this.filterDate = n;
// 	},
// 	onDateClicked: function(e) {
// 		if (this.calendarType == "D") {
// 			this.getAppointmentList();
// 		}
// 		if (this.bIsPhone && this.calendarType == "M") {
// 			var c = new Date(e.getParameter("date"));
// 			this.oCal.setCurrentDate(c);
// 			this._buttonDisplayWeek();
// 			return;
// 		}
// 		if (this.calendarType !== "D") {
// 			var c = new Date(e.getParameter("date"));
// 			if (e.getSource().getSelectedDates.length == 0) {
// 				this.oCal.toggleDatesSelection([c], true);
// 			}
// 			this.scrollToDate(c, this);
// 		}
// 	},
// 	scrollToDate: function(d, t) {
// 		var a = sap.ui.core.format.DateFormat.getDateInstance({
// 			style: 'full'
// 		});
// 		var b = a.format(d);
// 		var c = t.oList.getItems();
// 		var s = c[0].getDomRef().getBoundingClientRect().top;
// 		var e = 0;
// 		var f = false;
// 		for (var i = 0; i < c.length; i++) {
// 			if (!c[i].getBindingContext()) {
// 				c[i].removeStyleClass("sapMLabelBold");
// 				if (c[i].getTitle() === b) {
// 					f = true;
// 					e = c[i].getDomRef().getBoundingClientRect().top;
// 					c[i].addStyleClass("sapMLabelBold");
// 				}
// 			}
// 		}
// 		if (f) {
// 			t.byId('scroll').scrollTo(0, t.modulus(s - e), 500);
// 		}
// 	},
// 	setScrollSize: function() {
// 		var p = this.oFooterBar.getDomRef();
// 		var a = this.oCal.getDomRef();
// 		if (p && a) {
// 			var b = p.getBoundingClientRect();
// 			var c = a.getBoundingClientRect();
// 			var s = (b.top - c.bottom);
// 			var S = "" + s + "px";
// 			if (s > 0 && S != this.oScroll.getHeight()) {
// 				this.oScroll.setHeight(S);
// 				jQuery.sap.log.info("### Set scroll size   ### size -- " + s);
// 				this.oScroll.rerender();
// 			}
// 		}
// 	},
// 	defineButtons: function() {
// 		this.oFooterBar.destroyContentLeft();
// 		var b;
// 		if (this.bIsPhone) {
// 			b = new sap.m.Button({
// 				press: jQuery.proxy(this._buttonToday, this),
// 				icon: "sap-icon://appointment-2"
// 			});
// 		} else {
// 			b = new sap.m.Button({
// 				press: jQuery.proxy(this._buttonToday, this),
// 				text: "{i18n>view.Appointment.today_tt}"
// 			});
// 		}
// 		this.oFooterBar.addContentLeft(b);
// 		this.oCal.addStyleClass("calendarBoarder");
// 	},
// 	onCurrentDateChanged: function(e) {
// 		this.getAppointmentList();
// 		this.oCal.toggleDatesSelection(this.oCal.getSelectedDates(), false);
// 	},
// 	onDateRangeChanged: function() {},
// 	onDisplayMonth: function(e) {
// 		this.oCal.setMonthsPerRow(1);
// 		this.oCal.setWeeksPerRow(1);
// 		this.oCal.setSingleRow(false);
// 		this.oCal.setVisible(true);
// 		this.calendarType = "M";
// 		this.oCal.setSwipeToNavigate(true);
// 		this.oCal.unselectAllDates();
// 	},
// 	onDisplayDay: function(e) {
// 		this.oCal.setMonthsPerRow(1);
// 		this.oCal.setWeeksPerRow(1);
// 		this.oCal.setSingleRow(true);
// 		this.oCal.setVisible(true);
// 		this.calendarType = "D";
// 		this.oCal.setSwipeToNavigate(true);
// 		this.oCal.unselectAllDates();
// 	},
// 	onDisplayWeek: function(e) {
// 		this.oCal.setMonthsPerRow(1);
// 		this.oCal.setWeeksPerRow(1);
// 		this.oCal.setSingleRow(true);
// 		this.oCal.setVisible(true);
// 		this.calendarType = "W";
// 		this.oCal.setSwipeToNavigate(true);
// 		this.oCal.unselectAllDates();
// 	},
// 	getViewFilters: function() {
// 		var d = [];
// 		var c = this.byId("cal");
// 		var D = c.getCurrentDate();
// 		var s = new Date(D);
// 		var o = new Date(D);
// 		var a = new Date(D);
// 		var i = s.getDay();
// 		var f = 0;
// 		var t = 0;
// 		if (this.isMock) {
// 			return d;
// 		}
// 		if (this.calendarType == "W") {
// 			var O = c.getFirstDayOffset();
// 			var b = i - O;
// 			var e = 7 - b;
// 			o.setDate(s.getDate() - b);
// 			a.setDate(s.getDate() + e);
// 			a.setTime(a.getTime() - 1);
// 			this.calFromRange = o;
// 			this.calToRange = a;
// 		} else if (this.calendarType == "M") {
// 			var y = s.getFullYear();
// 			var m = s.getMonth();
// 			o = new Date(y, m, 1);
// 			a = new Date(y, m + 1, 1);
// 			a.setTime(a.getTime() - 1);
// 			this.calFromRange = o;
// 			this.calToRange = a;
// 		} else if (this.calendarType == "D") {
// 			var S = this.oCal.getSelectedDates()[0];
// 			if (!S) {
// 				S = c.getCurrentDate();
// 			}
// 			var g = new Date(S);
// 			o = g;
// 			a = g;
// 			a.setDate(a.getDate() + 1);
// 			a.setTime(a.getTime() - 1);
// 			this.calFromRange = g;
// 			this.calToRange = g;
// 		}
// 		var F;
// 		jQuery.sap.log.info("### Query filter   ### search from    -- " + o);
// 		jQuery.sap.log.info("### Query filter   ### search to      -- " + a);
// 		F = new sap.ui.model.odata.Filter("FromDate", [{
// 			operator: "BT",
// 			value1: o,
// 			value2: a
// 		}]);
// 		d.push(F);
// 		f = o.getTimezoneOffset();
// 		t = a.getTimezoneOffset();
// 		F = new sap.ui.model.odata.Filter("FromOffset", [{
// 			operator: "EQ",
// 			value1: f
// 		}]);
// 		d.push(F);
// 		F = new sap.ui.model.odata.Filter("ToOffset", [{
// 			operator: "EQ",
// 			value1: t
// 		}]);
// 		d.push(F);
// 		if (this.filterAccountID) {
// 			F = new sap.ui.model.odata.Filter("Account", [{
// 				operator: "EQ",
// 				value1: this.filterAccountID
// 			}]);
// 			d.push(F);
// 		}
// 		if (this.selectedEmp) {
// 			F = new sap.ui.model.odata.Filter("ResponsArea", [{
// 				operator: "EQ",
// 				value1: '0'
// 			}]);
// 			d.push(F);
// 			var h = new sap.ui.model.Filter("Responsible", sap.ui.model.FilterOperator.EQ, this.selectedEmp);
// 			d.push(h);
// 		} else {
// 			F = new sap.ui.model.odata.Filter("ResponsArea", [{
// 				operator: "EQ",
// 				value1: 'X'
// 			}]);
// 			d.push(F);
// 		}
// 		return d;
// 	},
// 	getDateString: function(d) {
// 		var D = d.getDate().toString();
// 		D = (D.length === 1) ? "0" + D : D;
// 		var m = d.getMonth() + 1;
// 		m = m.toString();
// 		m = (m.length === 1) ? "0" + m : m;
// 		var y = d.getFullYear();
// 		var s = y + "/" + m + "/" + D;
// 		return s;
// 	},
// 	getDatefromString: function(d) {
// 		d = d.replace("/Date(", "").replace(")/", "");
// 		d = parseInt(d);
// 		d = new Date(d);
// 		return d;
// 	},
// 	getDatefromParameterString: function parse(s) {
// 		if (!/^(\d){8}$/.test(s)) return null;
// 		var y = s.substr(0, 4),
// 			m = s.substr(4, 2) - 1,
// 			d = s.substr(6, 2);
// 		return new Date(y, m, d);
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
// 	onAppointmentClicked: function(e) {
// 		var c = e.getSource().getBindingContext();
// 		var b = c.getPath();
// 		var d = c.getObject();
// 		var a = d.PrivatFlag;
// 		var f = d.Description;
// 		if (a == true && this.selectedEmp) {
// 			sap.ca.ui.message.showMessageToast(this.oApplicationFacade.getResourceBundle().getText("view.Appointment.privateMessage"));
// 		} else {
// 			if (this.dayActionSheet != undefined) this.dayActionSheet = undefined;
// 			var u = this.oModel.getProperty(b).Guid;
// 			this.oRouter.navTo("appointment", {
// 				AppointmentID: u
// 			}, false);
// 		}
// 	},
// 	onDay: function(e) {
// 		var t = this;
// 		if (!this.dayActionSheet) {
// 			this.dayActionSheet = new sap.m.ActionSheet({
// 				placement: sap.m.PlacementType.Top,
// 				buttons: [new sap.m.Button({
// 					text: this.getView().getModel("i18n").getProperty("view.Appointment.week"),
// 					enabled: false,
// 					press: function(a) {
// 						t._buttonDisplayWeek();
// 					},
// 				}), new sap.m.Button({
// 					text: this.getView().getModel("i18n").getProperty("view.Appointment.month"),
// 					press: function(a) {
// 						t._buttonDisplayMonth();
// 					},
// 				}), ]
// 			});
// 		}
// 		this.dayActionSheet.openBy(e.getSource());
// 	},
// 	onCalendar: function(e) {
// 		var t = this;
// 		if (!this.calendarActionSheet) {
// 			this.calendarActionSheet = new sap.m.ActionSheet({
// 				placement: sap.m.PlacementType.Top,
// 				buttons: [new sap.m.Button({
// 					text: this.getView().getModel("i18n").getProperty("view.Appointment.mycalendar"),
// 					enabled: false,
// 					press: function(a) {
// 						t._buttonDisplayMyCalendar();
// 					},
// 				}), new sap.m.Button({
// 					text: this.getView().getModel("i18n").getProperty("view.Appointment.sharedCalendars"),
// 					press: function(a) {
// 						t._buttonDisplaySharedCalendar();
// 					},
// 				}), ]
// 			});
// 		}
// 		this.calendarActionSheet.openBy(e.getSource());
// 	},
// 	onClearFilter: function() {
// 		this.filterAccountID = null;
// 		this.byId('filterbar').setVisible(false);
// 		if (this.calendarType == "M") {
// 			this._buttonDisplayMonth();
// 		} else if (this.calendarType == "W") {
// 			this._buttonDisplayWeek();
// 		} else if (this.calendarType == "D") {
// 			this._buttonDisplayDay();
// 		}
// 	},
// 	onCreate: function(e) {
// 		var m = this.getView().getModel();
// 		var d;
// 		var b = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
// 		var u;
// 		if (parseFloat(b) >= 4.0) {
// 			u = "TransactionTypes";
// 		} else {
// 			u = "TransactionTypeSet";
// 		}
// 		var t = this;
// 		m.read(u, null, null, false, function(D, r) {
// 			d = {
// 				TransactionTypeSet: r.data.results
// 			};
// 			if (parseFloat(b) >= 4) {
// 				var c = t.oApplicationFacade.getApplicationModel("customizing");
// 				var D = c.oData;
// 				D.TransactionTypeSet = d.TransactionTypeSet;
// 			}
// 		});
// 		if (d.TransactionTypeSet.length == 1) {
// 			this.onlyOneProcessType = true;
// 			this.processType = d.TransactionTypeSet[0].ProcessTypeCode;
// 			this.ProcessTypeDescription = d.TransactionTypeSet[0].Description;
// 			this.PrivateFlag = d.TransactionTypeSet[0].PrivateFlag;
// 			this.selectProcess();
// 		} else {
// 			this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
// 			var j = new sap.ui.model.json.JSONModel();
// 			j.setData(d);
// 			this.oActionSheet.setModel(j, "json");
// 			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
// 				"view.Appointment.searchfieldplaceholder"));
// 			this.oActionSheet._list.setGrowingScrollToLoad(true);
// 			this.oActionSheet._dialog.setVerticalScrolling(true);
// 			this.oActionSheet.open();
// 		}
// 	},
// 	selectProcess: function(e) {
// 		var t;
// 		if (this.onlyOneProcessType) {
// 			t = this.processType;
// 		} else {
// 			t = e.getParameters().selectedItem.getBindingContext("json").getObject().ProcessTypeCode;
// 		}
// 		var r = cus.crm.mycalendar.util.Util.getCustomizing(t, this);
// 		if (r === false) {
// 			return;
// 		}
// 		if (this.dayActionSheet != undefined) this.dayActionSheet = undefined;
// 		if (!this.onlyOneProcessType) {
// 			var s = e.getParameter("selectedItem");
// 			if (s) {
// 				this.processType = s.data("ProcessTypeCode");
// 				this.processTypeDesc = s.data("ProcessTypeDescription");
// 				this.PrivateFlag = s.data("PrivateFlag");
// 			}
// 		}
// 		var c = this.oCal.getSelectedDates()[0] || this.oCal.getCurrentDate();
// 		if (typeof c === "string") {
// 			c = new Date(c);
// 		}
// 		var C = this.getDateParameterfromDate(c);
// 		sap.ca.ui.utils.busydialog.requireBusyDialog();
// 		if (this.createFromOppt === "X") {
// 			this.oRouter.navTo("newappointmentfromnote", {
// 				processType: this.processType
// 			}, true);
// 		} else if (this.createFromNote === "X") {
// 			this.oRouter.navTo("newappointmentfromnote", {
// 				processType: this.processType
// 			}, true);
// 		} else {
// 			if (this.PrivateFlag == undefined) this.PrivateFlag = false;
// 			this.oRouter.navTo("newappointment", {
// 				Date: C,
// 				processType: this.processType,
// 				privateFlag: this.PrivateFlag
// 			}, false);
// 		}
// 		this.onlyOneProcessType = false;
// 		sap.ca.ui.utils.busydialog.releaseBusyDialog();
// 	},
// 	searchProcess: function(e) {
// 		var i = e.getParameter("itemsBinding");
// 		var t = this;
// 		var d;
// 		var T = this.oBundle.getText("view.Appointment.loaddatatext");
// 		this.oActionSheet.setNoDataText(T);
// 		var v = e.getParameter("value");
// 		if (v !== undefined) {
// 			i.filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v)]);
// 			d = i.filter([new sap.ui.model.Filter("Description", sap.ui.model.FilterOperator.Contains, v)]);
// 			if (d.iLength == 0) {
// 				var T = this.oBundle.getText("view.Appointment.no_data_text");
// 				t.oActionSheet.setNoDataText(T);
// 			}
// 		}
// 	},
// 	onSharedSearch: function(e) {
// 		var f = [];
// 		var p = "";
// 		var v = this.sharedCalendar.getSubHeader().getContentLeft()[0].getValue();
// 		var i = this.sharedCalendar.getContent()[0].getInfoToolbar();
// 		var m = this.getView().getModel();
// 		var d;
// 		if (v == "") {
// 			p = "EmployeeCollection?$filter=IsMyEmployee eq true";
// 			i.setVisible(true);
// 		} else {
// 			p = "EmployeeCollection";
// 			i.setVisible(false);
// 		} if (v != "") {
// 			f.push(new sap.ui.model.Filter("fullName", sap.ui.model.FilterOperator.Contains, v));
// 		}
// 		var t = this;
// 		m.read(p, {
// 			async: true,
// 			context: null,
// 			urlParameters: null,
// 			filters: f,
// 			success: function(D, r) {
// 				d = {
// 					EmployeeCollection: r.data.hasOwnProperty("results") ? r.data.results : [r.data]
// 				};
// 				var j = new sap.ui.model.json.JSONModel();
// 				j.setData(d);
// 				t.sharedCalendar.setModel(j, "showJson");
// 			},
// 			error: function(E) {}
// 		});
// 		this.sharedCalendar.setModel(this.getView().getModel("i18n"), "i18n");
// 	},
// 	onCreate1: function(e) {
// 		var c = this.oCal.getSelectedDates()[0] || this.oCal.getCurrentDate();
// 		if (typeof c === "string") {
// 			c = new Date(c);
// 		}
// 		var C = this.getDateParameterfromDate(c);
// 		this.oRouter.navTo("newappointmentw3", {
// 			Date: C
// 		}, false);
// 	},
// 	_buttonDisplaySharedCalendar: function(e) {
// 		var m = this.getView().getModel();
// 		var d;
// 		m.read("EmployeeCollection?$filter=IsMyEmployee eq true", null, null, false, function(D, r) {
// 			d = {
// 				EmployeeCollection: r.data.results
// 			};
// 		});
// 		this.sharedCalendar.setModel(this.getView().getModel("i18n"), "i18n");
// 		var j = new sap.ui.model.json.JSONModel();
// 		j.setData(d);
// 		this.sharedCalendar.setModel(j, "showJson");
// 		this.getView().getModel("vm").oData.isSharedCalendar = false;
// 		this.sharedCalendar.getAggregation("subHeader").getAggregation("contentLeft")[0].setValue("");
// 		this.sharedCalendar.open();
// 	},
// 	closeSharedCalendar: function(e) {
// 		this.sharedCalendar.close();
// 	},
// 	sharedAppointment: function(e) {
// 		var s = e.getParameter("listItem");
// 		if (s) {
// 			this.selectedEmp = s.getBindingContext('showJson').getObject().employeeID;
// 			this.employeeName = s.getBindingContext('showJson').getObject().fullName;
// 			this.getAppointmentList();
// 			this.calendarActionSheet.getAggregation("buttons")[0].setEnabled(true);
// 			this.getView().getModel("vm").oData.isSharedCalendar = true;
// 		} else {
// 			this.getView().getModel("vm").oData.isSharedCalendar = false;
// 		}
// 		this.sharedCalendar.close();
// 	},
// 	_buttonDisplayMyCalendar: function(e) {
// 		this.getView().getModel("vm").oData.isSharedCalendar = false;
// 		this.selectedEmp = null;
// 		this.getAppointmentList();
// 		this.calendarActionSheet.getAggregation("buttons")[0].setEnabled(false);
// 	},
// 	_buttonToday: function() {
// 		this.oCal.setCurrentDate(new Date());
// 		this.oCal.unselectAllDates();
// 		this.oCal.toggleDatesSelection([new Date()], true);
// 		this.onTodayClick();
// 	},
// 	_buttonDisplayMonth: function() {
// 		var d;
// 		this.dayActionSheet.getAggregation("buttons")[0].setEnabled(true);
// 		this.dayActionSheet.getAggregation("buttons")[1].setEnabled(false);
// 		if (this.oCal.getSelectedDates().length > 0) {
// 			d = this.getDateParameterfromDate(new Date(this.oCal.getSelectedDates()[0]));
// 		} else {
// 			d = "_" + this.getDateParameterfromDate(this.calToRange);
// 		}
// 		this.onDisplayMonth(null);
// 		if (this.bIsPhone) {
// 			if (!this.filterAccountID) {
// 				this.oRouter.navTo("month_phone", {
// 					Date: d
// 				}, true);
// 			} else {
// 				this.oRouter.navTo("month_phone/account", {
// 					Date: d,
// 					AccountID: this.filterAccountID
// 				}, true);
// 			}
// 		} else {
// 			if (!this.filterAccountID) {
// 				this.oRouter.navTo("month", {
// 					Date: d
// 				}, true);
// 			} else {
// 				this.oRouter.navTo("month/account", {
// 					Date: d,
// 					AccountID: this.filterAccountID
// 				}, true);
// 			}
// 		}
// 	},
// 	_buttonDisplayWeek: function() {
// 		var d;
// 		this.dayActionSheet.getAggregation("buttons")[0].setEnabled(false);
// 		this.dayActionSheet.getAggregation("buttons")[1].setEnabled(true);
// 		if (this.oCal.getSelectedDates().length > 0) {
// 			d = this.getDateParameterfromDate(new Date(this.oCal.getSelectedDates()[0]));
// 		} else {
// 			d = "_" + this.getDateParameterfromDate(this.calFromRange);
// 		}
// 		this.onDisplayWeek(null);
// 		if (!this.filterAccountID) {
// 			this.oRouter.navTo("week", {
// 				Date: d
// 			}, true);
// 		} else {
// 			this.oRouter.navTo("week/account", {
// 				Date: d,
// 				AccountID: this.filterAccountID
// 			}, true);
// 		}
// 	},
// 	_expandFollowup: function(e) {
// 		var t = this;
// 		this._actionSheet = new sap.m.ActionSheet({
// 			placement: sap.m.PlacementType.Top,
// 			buttons: [new sap.m.Button({
// 				text: this.getView().getModel("i18n").getProperty("Appointment"),
// 				press: function(a) {
// 					t.navToAppointmentDialog(a);
// 				},
// 			}), ]
// 		});
// 		this._actionSheet.openBy(e.getSource());
// 	},
// 	navToAppointmentDialog: function(e) {
// 		var m = this.getView().getModel();
// 		var h = this.oModel.getContext("/" + this.sPath).getObject();
// 		var d;
// 		var b = cus.crm.mycalendar.util.Schema._getServiceSchemaVersion(this.oModel, "Appointment");
// 		m.read(((parseFloat(b) >= 4.0)) ? "TransactionTypes" : "TransactionTypeSet", null, null, false, function(D, r) {
// 			d = {
// 				TransactionTypeSet: r.data.results
// 			};
// 		});
// 		if (d.TransactionTypeSet.length == 1) {
// 			this.onlyOneProcessType = true;
// 			this.processType = d.TransactionTypeSet[0].ProcessTypeCode;
// 			this.selectProcess();
// 		} else {
// 			this.oActionSheet = sap.ui.xmlfragment("cus.crm.mycalendar.view.ProcessTypeDialog", this);
// 			this.oActionSheet.setModel(this.getView().getModel("i18n"), "i18n");
// 			var j = new sap.ui.model.json.JSONModel();
// 			j.setData(d);
// 			this.oActionSheet.setModel(j, "json");
// 			this.oActionSheet._searchField.setPlaceholder(sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText(
// 				"view.Appointment.searchfieldplaceholder"));
// 			this.oActionSheet._list.setGrowingScrollToLoad(true);
// 			this.oActionSheet._dialog.setVerticalScrolling(true);
// 			this.oActionSheet.open();
// 		}
// 	},
// 	_buttonDisplayDay: function() {},
// 	modulus: function(n) {
// 		if (n < 0) {
// 			return -n;
// 		}
// 		return n;
// 	},
});