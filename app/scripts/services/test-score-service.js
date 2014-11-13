'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('testScoreFactory', function($q) {
        // Test Score FIELDS
        var FIELDS = {
            objectId: "objectId",
            name: "name",
            score: "score",
            month: "month",
            year: "year",
            description: "description",
            user: "user"
        }
        var TestScore = Parse.Object.extend('TestScore', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing test score");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.name, attrs[FIELDS.name]);
                this.set(FIELDS.score, attrs[FIELDS.score]);
                this.set(FIELDS.month, attrs[FIELDS.month]);
                this.set(FIELDS.year, attrs[FIELDS.year]);
                this.set(FIELDS.description, attrs[FIELDS.description]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            createTestScore: function(attrs) {
                var testScore = new TestScore(attrs);
                testScore.initializeAttrs(attrs);
                return testScore;
            }
        });

        return TestScore;
    });