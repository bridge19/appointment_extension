/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.quickoverview.EmployeeLaunch");
jQuery.sap.require("sap.ca.ui.quickoverview.CompanyLaunch");
jQuery.sap.require("cus.crm.mycalendar.util.Conversions");
jQuery.sap.require("sap.ca.ui.model.format.FileSizeFormat");
jQuery.sap.require("sap.ca.ui.model.type.FileSize");
sap.ui.controller("cus.crm.mycalendar.CRM_MYCALExtension.view.AttachmentsCustom", {
	// ERCO on
	onInit: function() {
		this.refresh = function() {};
	},
	byId: function(oId) {
		if( oId == "attachments"){
			return {
		        oHeaderToolbar:{
                   setVisible: function(){                                    
                       }
		        }
			};
		}
		return sap.ui.getCore().byId(oId);
	}
	// ERCO off
	// Context: "",
	// onInit: function() {},
	// refresh: function(c, a, m) {
	// 	this.Context = c;
	// 	var _ = cus.crm.mycalendar.util.Conversions.uploadUrlConverter(c);
	// 	var b;
	// 	var d = {
	// 		AppointmentToAttachment: []
	// 	};
	// 	$.each(a.results, function(i, v) {
	// 		var o = {
	// 			name: v.RelativeUrl + "." + v.Filename.split('.').pop(),
	// 			size: parseFloat(v.FileSize),
	// 			url: (v.UrlAttachment === "") ? cus.crm.mycalendar.util.Conversions.urlConverter(v.__metadata.media_src) : v.UrlAttachment,
	// 			uploadedDate: v.UploadedDate,
	// 			contributor: v.CreatedBy,
	// 			fileExtension: v.Filename.split('.').pop(),
	// 			fileId: v.DocId,
	// 			media_src: v.__metadata.media_src
	// 		};
	// 		d.AppointmentToAttachment.unshift(o);
	// 	});
	// 	this.byId('attachments').setModel(new sap.ui.model.json.JSONModel(d), "attachments");
	// 	this.byId('attachments').setUploadUrl(_);
	// 	this.getView().byId("attConti").setVisible(true);
	// 	if (d.AppointmentToAttachment.length == 0) {
	// 		b = cus.crm.mycalendar.util.Util.geti18NText1("view.Appointment.attachmentDataNumber", "0");
	// 		if (!m) {
	// 			this.getView().byId("attConti").setVisible(false);
	// 		}
	// 	} else {
	// 		b = cus.crm.mycalendar.util.Util.geti18NText1("view.Appointment.attachmentDataNumber", d.AppointmentToAttachment.length);
	// 	} if (c == "" && m) {
	// 		b = cus.crm.mycalendar.util.Util.geti18NText("view.Appointment.attachmentSaveRequest");
	// 	}
	// 	if (this.getView().byId("attTitle")) this.getView().byId("attTitle").setTitle(b);
	// },
	// onAttachmentChange: function(e) {
	// 	var m = this.getView().getModel();
	// 	var u = e.getSource();
	// 	var f = e.getParameter("mParameters").files[0];
	// 	var t = this.sToken || m.getSecurityToken();
	// 	u.removeAllHeaderParameters();
	// 	var h = m.getProperty(this.Context + "/Guid");
	// 	var n = h.replace(/-/g, '');
	// 	var c = new sap.m.UploadCollectionParameter({
	// 		name: "slug",
	// 		value: f.name + ";" + "AppointmentMain" + ";" + n
	// 	});
	// 	u.addHeaderParameter(c);
	// 	var C = new sap.m.UploadCollectionParameter({
	// 		name: "x-csrf-token",
	// 		value: t
	// 	});
	// 	u.addHeaderParameter(C);
	// 	var o = new sap.m.UploadCollectionParameter({
	// 		name: "content-disposition",
	// 		value: "attachment; filename=\"" + encodeURIComponent(f.name) + "\""
	// 	});
	// 	u.addHeaderParameter(o);
	// 	if (!f.type) {
	// 		var a;
	// 		var F = f.name.split(".");
	// 		var b = "";
	// 		if (F.length) b = F[F.length - 1];
	// 		if (b && (b.toUpperCase() === "RAR" || b.toUpperCase() === "LOG")) {
	// 			a = new sap.m.UploadCollectionParameter({
	// 				name: "content-type",
	// 				value: "application/octet-stream"
	// 			});
	// 		} else {
	// 			a = new sap.m.UploadCollectionParameter({
	// 				name: "content-type",
	// 				value: "multipart/mixed"
	// 			});
	// 		}
	// 		u.addHeaderParameter(a);
	// 	}
	// },
	// onUploadComplete: function() {
	// 	var p = this.getView().getBindingContext().getPath();
	// 	this._fetchAttachments(p);
	// },
	// onFileDeleted: function(e) {
	// 	var m = this.getView().getModel();
	// 	var f = e.getParameter("item");
	// 	var d = e.getParameters().documentId;
	// 	var t = this;
	// 	var i = this.byId('attachments').getItems();
	// 	var r = $.grep(i, function(b) {
	// 		return b.getDocumentId() == d;
	// 	});
	// 	if (r.length == 1) {
	// 		var A = f.getUrl();
	// 		var a = A.split("'");
	// 		var u = "/AttachmentSet('" + a[1] + "')";
	// 		m.remove(u, null, function(b, c) {
	// 			t.successSave(c);
	// 		}, function(b) {});
	// 	}
	// },
	// onFilenameLengthExceed: function() {
	// 	sap.m.MessageToast.show(this.getView().getModel("i18n").getProperty("MSG_EXCEEDING_FILE_NAME_LENGTH"));
	// },
	// onFileRenamed: function(e) {
	// 	var m = this.getView().getModel();
	// 	var n = e.getParameter("fileName");
	// 	var f = n.split('.').pop();
	// 	var a = n.substring(0, n.length - f.length - 1);
	// 	var d = e.getParameter("documentId");
	// 	var t = this;
	// 	var o = {
	// 		"RelativeUrl": a,
	// 		"Description": a,
	// 		"DocId": d
	// 	};
	// 	var A = e.getParameter("item").getUrl();
	// 	var b = A.split("'");
	// 	var u = "/AttachmentSet('" + b[1] + "')";
	// 	m.update(u, o, null, function(D, r) {
	// 		cus.crm.mycalendar.util.Util._fetchETag(t.getView().getBindingContext().getPath(), t.getView().getModel());
	// 	}, function(M) {
	// 		t.displayResponseErrorMessage(M, sap.ca.scfld.md.app.Application.getImpl().getResourceBundle().getText('SAVE_FAILED'));
	// 	});
	// },
	// displayResponseErrorMessage: function(m, d) {
	// 	var M;
	// 	if (m.response) {
	// 		M = jQuery.parseJSON(m.response.body).error.message.value;
	// 	} else M = d;
	// 	sap.ca.ui.message.showMessageBox({
	// 		type: sap.ca.ui.message.Type.ERROR,
	// 		message: M,
	// 	});
	// },
	// successSave: function(r) {
	// 	var p = this.getView().getBindingContext().getPath();
	// 	this._fetchAttachments(p);
	// },
	// _fetchAttachments: function(e) {
	// 	var t = this;
	// 	this.getView().getModel().read(e, null, ["$expand=AppointmentToAttachment"], false, function(o, r) {
	// 		cus.crm.mycalendar.util.Util._saveETag(o.__metadata.etag);
	// 		t.refresh(e, o.AppointmentToAttachment, 1);
	// 	});
	// }
});