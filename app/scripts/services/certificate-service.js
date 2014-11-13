'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('certificateFactory', function($q) {
        // Certificate FIELDS
        var FIELDS = {
            objectId: "objectId",
            name: "name",
            authority: "authority",
            licenseNumber: "licenseNumber",
            url: "url",
            month: "month",
            year: "year",
            expirationMonth: "expirationMonth",
            expirationYear: "expirationYear",
            noExpiration: "noExpiration",
            user: "user"
        }
        var Certificate = Parse.Object.extend('Certificate', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing certificate");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.name, attrs[FIELDS.name]);
                this.set(FIELDS.authority, attrs[FIELDS.authority]);
                this.set(FIELDS.licenseNumber, attrs[FIELDS.licenseNumber]);
                this.set(FIELDS.url, attrs[FIELDS.url]);
                this.set(FIELDS.month, attrs[FIELDS.month]);
                this.set(FIELDS.year, attrs[FIELDS.year]);
                this.set(FIELDS.expirationMonth, attrs[FIELDS.expirationMonth]);
                this.set(FIELDS.expirationYear, attrs[FIELDS.expirationYear]);
                this.set(FIELDS.noExpiration, attrs[FIELDS.noExpiration]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            createCertificate: function(attrs) {
                var certificate = new Certificate(attrs);
                certificate.initializeAttrs(attrs);
                return certificate;
            }
        });

        return Certificate;
    });