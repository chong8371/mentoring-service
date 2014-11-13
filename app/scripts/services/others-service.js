'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('languageFactory', function($q) {
        // LANGUAGE FIELDS
        var FIELDS = {
            objectId: "objectId",
            name: "name",
            proficiency: "proficiency",
            user: "user"
        }

        var PROFICIENCY_LEVELS = {
            elementary: {
                key: "elementary",
                en: "Elementary Proficiency",
                kr: "기초 수준"
            },
            limitedWorking: {
                key: "limitedWorking",
                en: "Limited Working Proficiency",
                kr: "초급 수준"
            },
            professionalWorking: {
                key: "professionalWorking",
                en: "Professional Working Proficiency",
                kr: "중급 수준"
            },
            fullProfessional: {
                key: "fullProfessional",
                en: "Full Professional Proficiency",
                kr: "상급 수준"
            },
            nativeOrBilingual: {
                key: "nativeOrBilingual",
                en: "Native or Bilingual Proficiency",
                kr: "원어민 수준"
            }
        }

        var Language = Parse.Object.extend('Language', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing language");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.name, attrs[FIELDS.name]);
                this.set(FIELDS.proficiency, attrs[FIELDS.proficiency]);
                this.set(FIELDS.user, attrs[FIELDS.user]);
            }
        }, {
            // class methods
            createLanguage: function(attrs) {
                var language = new Language(attrs);
                language.initializeAttrs(attrs);
                return language;
            },
            getProficiencyLevels: function() {
                return PROFICIENCY_LEVELS;
            }
        });

        return Language;
    })
    .factory('categoryFactory', function($q) {
        // Category FIELDS
        var FIELDS = {
            objectId: "objectId",
            name: "name",
            mentorings: "mentorings"
        }

        var PRE_DEFINED_CATEGORIES = {
            // need to add pre-defined categories
        }

        var categoryQuery = new Parse.Query("Category");

        var Category = Parse.Object.extend('Category', {
            // instance methods
            initialize: function(attrs, options) {
                console.log("initializing Category");
            },
            initializeAttrs: function(attrs) {
                this.set(FIELDS.name, attrs[FIELDS.name]);
                this.set(FIELDS.mentorings, attrs[FIELDS.mentorings]);
            },
            getMentorings: function() {
                var defer = $q.defer();
                this.relation(FIELDS.mentorings).query().find({
                    success: function(mentorings) {
                        defer.resolve(mentorings);
                    },
                    error: function(error) {
                        defer.resolve(error);
                    }
                });
                return defer.promise;
            },
            addMentoring: function(mentoring) {
                this.relation(FIELDS.mentorings).add(mentoring);
                this.save();
            }
        }, {
            // class methods
            createCategory: function(attrs) {
                var category = new Category(attrs);
                category.initializeAttrs(attrs);
                return category;
            },
            getPreDefinedCategories: function() {
                return PRE_DEFINED_CATEGORIES;
            },
            getCategoryByName: function(name) {
                var defer = $q.defer();
                categoryQuery.equalTo(FIELDS.name, name);

                categoryQuery.first({
                    success: function(category) {
                        if(!category) {
                            console.log("no category found for " + name);
                            defer.resolve(null);
                        } else {
                            defer.resolve(category);
                        }
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            getMentorings: function(categoryId) {
                var defer = $q.defer();

                categoryQuery.get(categoryId, {
                    success: function(category) {
                        if (!category) {
                            console.log("no category found for " + categoryId);
                            return;
                        }
                        console.log(category);
                        defer.resolve(category.getMentorings());
                    }

                });
                return defer.promise;
            }
        });

        return Category;
    })
;