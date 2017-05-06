jQuery.sap.declare("cus.crm.mycalendar.CRM_MYCALExtension.util.Common");

cus.crm.mycalendar.CRM_MYCALExtension.util.Common = {
    orgDefault: null,
    getSalesOrgDefault: function(sos){
        if(this.orgDefault !== null)
        {
            return this.orgDefault;
        }
        var r = { key: null, txt: "" };
        var found = false;
        for (var i in sos) {
 			var so = sos[i];
 			if(so.Mine === "X")
 			{
 			    if(found)
 			    {
 			        r = { key: null, txt: "" };
 			        this.orgDefault = r;
 			        return r;
 			    }
 			    else
 			    {
 			        found = true;
 			        r = { key: so.SalesOrgIdO, txt: so.TxtLong };
 			    }
 			}
        }
        if(sos.length > 0)
        {
	        this.orgDefault = r;
        }
        return r;
    },
    offDefault: [],
    getSalesOffDefault: function(soffs, sorg){
        var r = { key: null, txt: "" };
        if(sorg === null)
        {
            return r;
        }
        if(this.offDefault[sorg] !== undefined)
        {
            return this.offDefault[sorg];
        }
        var found = false;
        for (var i in soffs) {
 			var soff = soffs[i];
 			if(soff.Mine === "X" && soff.ParentSalesOrgIdO === sorg)
 			{
 			    if(found)
 			    {
 			        r = { key: null, txt: "" };
 			        this.offDefault[sorg] = r;
 			        return r;
 			    }
 			    else
 			    {
 			        found = true;
 			        r = { key: soff.SalesOffIdO, txt: soff.TxtLong };
 			    }
 			}
        }
        if(soffs.length > 0)
        {
	        this.offDefault[sorg] = r;
        }
        return r;
    },
    grpDefault: [],
    getSalesGrpDefault: function(sgrps, soff){
        var r = { key: null, txt: "" };
        if(soff === null)
        {
            return r;
        }
        if(this.grpDefault[soff] !== undefined)
        {
            return this.grpDefault[soff];
        }
        var found = false;
        for (var i in sgrps) {
 			var sgrp = sgrps[i];
 			if(sgrp.Mine === "X" && sgrp.ParentSalesOffIdO === soff)
 			{
 			    if(found)
 			    {
 			        r = { key: null, txt: "" };
 			        this.grpDefault[soff] = r;
 			        return r;
 			    }
 			    else
 			    {
 			        found = true;
 			        r = { key: sgrp.SalesGrpIdO, txt: sgrp.TxtLong };
 			    }
 			}
        }
        if(sgrps.length > 0)
        {
        	this.grpDefault[soff] = r;
        }
        return r;
    }
};