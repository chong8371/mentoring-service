'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('experienceFactory', function($q) {
        // EXPERIENCE FIELDS
        var FIELDS = {
            objectId: "objectId",
            companyName: "companyName",
            title: "title",
            location: "location",
            startMonth: "startMonth",
            startYear: "startYear",
            endMonth: "endMonth",
            endYear: "endYear",
            description: "description",
            isCurrent: "isCurrent",
            user: "user"
        }
        var Experience = Parse.Object.extend('Experience', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing experience");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.companyName, attrs[FIELDS.companyName]);
                this.set(FIELDS.title, attrs[FIELDS.title]);
                this.set(FIELDS.location, attrs[FIELDS.location]);
                this.set(FIELDS.startMonth, attrs[FIELDS.startMonth]);
                this.set(FIELDS.startYear, attrs[FIELDS.startYear]);
                this.set(FIELDS.endMonth, attrs[FIELDS.endMonth]);
                this.set(FIELDS.endYear, attrs[FIELDS.endYear]);
                this.set(FIELDS.description, attrs[FIELDS.description]);
                this.set(FIELDS.isCurrent, attrs[FIELDS.isCurrent]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            createExperience: function(attrs) {
                var experience = new Experience(attrs);
                experience.initializeAttrs(attrs);
                return experience;
            }
        });

        return Experience;
    });