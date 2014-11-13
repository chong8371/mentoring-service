'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('awardFactory', function($q) {
        // AWARD FIELDS
        var FIELDS = {
            objectId: "objectId",
            name: "name",
            issuer: "issuer",
            month: "month",
            year: "year",
            description: "description",
            user: "user"
        }
        var Award = Parse.Object.extend('Award', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing award");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.name, attrs[FIELDS.name]);
                this.set(FIELDS.issuer, attrs[FIELDS.issuer]);
                this.set(FIELDS.month, attrs[FIELDS.month]);
                this.set(FIELDS.year, attrs[FIELDS.year]);
                this.set(FIELDS.description, attrs[FIELDS.description]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            createAward: function(attrs) {
                var award = new Award(attrs);
                award.initializeAttrs(attrs);
                return award;
            }
        });

        return Award;
    });