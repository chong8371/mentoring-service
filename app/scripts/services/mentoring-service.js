'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('mentoringFactory', function($q) {
        // pre-defined types
        var TYPES = {
            request: "request",
            service: "service"
        };

        // pre-defined methods
        var METHODS = {
            videoChat: {
                key: "videoChat",
                en: "Video Chat",
                kr: "화상 채팅"
            },
            audioChat: {
                key: "audioChat",
                en: "Audio Chat",
                kr: "전화"
            },
            im: {
                key: "im",
                en: "Instant Messaging (IM)",
                kr: "채팅"
            },
            email: {
                key: "email",
                en: "Email",
                kr: "이메일"
            }
        };

        // pre-defined price unit
        var PRICE_UNITS = {
            won: "₩",
            dollar: "$"
        };

        // pre-defined duration unit
        var DURATION_UNITS = {
            min: {
                key: "min",
                en: "minute",
                kr: "분"
            },
            hour: {
                key: "min",
                en: "hour",
                kr: "시간"
            },
            day: {
                key: "day",
                en: "day",
                kr: "일"
            },
            week: {
                key: "week",
                en: "week",
                kr: "주"
            }
        }


        // Mentoring fields
        var FIELDS = {
            objectId: "objectId",
            title: "title",
            description: "description",
            duration: "duration",
            durationUnit: "durationUnit",
            category: "category",
            method: "method",
            price: "price",
            priceUnit: "priceUnit",
            mentor: "mentor",
            mentee: "mentee"
        }
        var Mentoring = Parse.Object.extend('Mentoring', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing mentoring");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.title, attrs[FIELDS.title]);
                this.set(FIELDS.description, attrs[FIELDS.description]);
                this.set(FIELDS.duration, attrs[FIELDS.duration]);
                this.set(FIELDS.category, attrs[FIELDS.category]);
                this.set(FIELDS.method, attrs[FIELDS.method]);
                this.set(FIELDS.price, attrs[FIELDS.price]);
                this.set(FIELDS.mentor, attrs[FIELDS.mentor]);
                this.set(FIELDS.mentee, attrs[FIELDS.mentee]);
            }
        }, {
            // class methods
            getTypes: function() {
                return TYPES;
            },
            getMethods:  function() {
                return METHODS;
            },
            getPriceUnits: function() {
                return  PRICE_UNITS;
            },
            getDurationUnits: function() {
                return DURATION_UNITS;
            },
            createMentoring: function(attrs) {
                var mentoring = new Mentoring(attrs);
                mentoring.initializeAttrs(attrs);
                return mentoring;
            }
        });

        return Mentoring;
    });