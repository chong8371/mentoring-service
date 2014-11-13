'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('educationFactory', function($q) {
        // pre-defined types
        var TYPES = {
            high_school: {
                key: "high_school",
                en: "High School",
                kr: "고등학교"
            },
            associate: {
                key: "associate",
                en: "Associate's Degree",
                kr: "준학사 학위"
            },
            bachelor: {
                key: "bachelor",
                en: "Bachelor's Degree",
                kr: "학사 학위"
            },
            master: {
                key: "master",
                en: "Master's Degree",
                kr: "석사 학위"
            },
            mba: {
                key: "mba",
                en: "Master of Business Administration (M.B.A.)",
                kr: "경영학 석사 학위(M.B.A.)"
            },
            jd: {
                key: "jd",
                en: "Juris Doctor (J.D.)",
                kr: "법학 박사 학위 (J.D.)"
            },
            md: {
                key: "md",
                en: "Doctor of Medicine",
                kr: "의학 박사 학위 (M.D.)"
            },
            phd: {
                key: "phd",
                en: "Doctor of Philosophy (Ph.D.)",
                kr: "박사 학위 (Ph.D.)"
            },
            engineer: {
                key: "engineer",
                en: "Engineer's Degree",
                kr: "공학계 준박사 학위"
            },
            other: {
                key: "other",
                en: "Other",
                kr: "기타"
            }
        };


        // EDUCATION
        var FIELDS = {
            objectId: "objectId",
            school: "school",
            type: "type",
            major: "major",
            startYear: "startYear",
            endYear: "endYear",
            city: "city",
            state: "state",
            country: "country",
            isCurrent: "isCurrent",
            grade: "grade",
            description: "description",
            user: "user"
        }
        var Education = Parse.Object.extend('Education', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.school, attrs[FIELDS.school]);
                this.set(FIELDS.type, attrs[FIELDS.type]);
                this.set(FIELDS.major, attrs[FIELDS.major]);
                this.set(FIELDS.startYear, attrs[FIELDS.startYear]);
                this.set(FIELDS.endYear, attrs[FIELDS.endYear]);
                this.set(FIELDS.city, attrs[FIELDS.city]);
                this.set(FIELDS.state, attrs[FIELDS.state]);
                this.set(FIELDS.country, attrs[FIELDS.country]);
                this.set(FIELDS.isCurrent, attrs[FIELDS.isCurrent]);
                this.set(FIELDS.grade, attrs[FIELDS.grade]);
                this.set(FIELDS.description, attrs[FIELDS.description]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            getTypes:  function() {
                return TYPES;
            },
            createEducation: function(attrs) {
                var education = new Education(attrs);
                education.initializeAttrs(attrs);
                return education;
            }
        });

        return Education;
    });