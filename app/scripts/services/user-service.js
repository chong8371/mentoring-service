'use strict';

/* Services */

angular.module('mentoringServiceApp')
    .value('version', '0.1')
    .factory('userFactory', function($q) {
        var FIELDS = {
            objectId: "objectId",
            username: "username",
            password: "password",
            email: "email",
            firstName: "firstName",
            lastName: "lastName",
            role: "role",
            linkedinUrl: "linkedinUrl",
            educations: "educations",
            experiences: "experiences",
            awards: "awards",
            certificates: "certificates",
            testScores: "testScores",
            languages: "languages",
            mentorings: "mentorings"
        }

        // pre-defined roles
        var ROLES = {
            mentor: "mentor",
            mentee: "mentee"
        }

        // role fields
        var ROLE_FIELDS = {
            name: "name"
        }

        var roleQuery = new Parse.Query(Parse.Role);

        var User = Parse.User.extend({
            // instance methods
            update: function(email, firstName, lastName) {
                this.set(FIELDS.email, email);
                this.set(FIELDS.firstName, firstName);
                this.set(FIELDS.lastName, lastName);
                this.save();
            },
            resetPassword: function(id, password) {
                this.set(password);
                this.save();
            },
            addEducation: function(education) {
                this.relation(FIELDS.educations).add(education);
                this.save();
            },
            getEducations: function() {
                var defer = $q.defer();
                this.relation(FIELDS.educations).query().find({
                   success: function(educations) {
                       defer.resolve(educations);
                   },
                   error: function(error) {
                       defer.resolve(error);
                   }
                });
                return defer.promise;
            },
            addExperience: function(experience) {
                this.relation(FIELDS.experiences).add(experience);
                this.save();
            },
            getExperiences: function() {
                var defer = $q.defer();
                this.relation(FIELDS.experiences).query().find({
                    success: function(experiences) {
                        defer.resolve(experiences);
                    },
                    error: function(error) {
                        defer.resolve(error);
                    }
                });
                return defer.promise;
            },
            addAward: function(award) {
                this.relation(FIELDS.awards).add(award);
                this.save();
            },
            getAwards: function() {
                var defer = $q.defer();
                this.relation(FIELDS.awards).query().find({
                   success: function(awards) {
                       defer.resolve(awards);
                   },
                   error: function(error) {
                       defer.resolve(error);
                   }
                });
                return defer.promise;
            },
            addCertificate: function(certificate) {
                this.relation(FIELDS.certificates).add(certificate);
                this.save();
            },
            getCertificates: function() {
                var defer = $q.defer();
                this.relation(FIELDS.certificates).query().find({
                    success: function(certificates) {
                        defer.resolve(certificates);
                    },
                    error: function(error) {
                        defer.resolve(error);
                    }
                });
                return defer.promise;
            },
            addTestScore: function(testScore) {
                this.relation(FIELDS.testScores).add(testScore);
                this.save();
            },
            getTestScores: function() {
                var defer = $q.defer();
                this.relation(FIELDS.testScores).query().find({
                    success: function(testScores) {
                        defer.resolve(testScores);
                    },
                    error: function(error) {
                        defer.resolve(error);
                    }
                });
                return defer.promise;
            },
            addLanguage: function(language) {
                this.relation(FIELDS.languages).add(language);
                this.save();
            },
            getLanguages :function() {
                var defer = $q.defer();
                this.relation(FIELDS.languages).query().find({
                    success: function(languages) {
                        defer.resolve(languages);
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
            }
        }, {
            // class methods
            getUser: function(id) {
                var defer = $q.defer();

                var query = new Parse.Query(Parse.User);
                query.equalTo("objectId", id);
                query.first({
                    success: function(user) {
                        defer.resolve(user);
                    },
                    error :function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            findMentors: function() {
                return User.findUsers(ROLES.mentor);
            },
            findMentees: function() {
                return User.findUsers(ROLES.mentee);
            },
            findUsers: function(roleName) {
                var defer = $q.defer();

                roleQuery.equalTo(ROLE_FIELDS.name, roleName);

                roleQuery.first({
                    success: function(role) {
                        if(!role) {
                            console.log("no role found for " + roleName);
                            defer.resolve(null);
                        } else {
                            console.log(role);
                            role.getUsers().query().find({
                                success: function(users) {
                                    $.each(users,function(i,item){
                                        console.log(i+":"+JSON.stringify(item));
                                    });

                                    defer.resolve(users);
                                },
                                error: function(error) {
                                    defer.reject(error);
                                }
                            });
                        }
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            signup: function(username, password, email, firstName, lastName, roleName) {
                var defer = $q.defer();

                roleQuery.equalTo(ROLE_FIELDS.name, roleName);
                roleQuery.first({
                    success: function(role) {
                        var newUser = new Parse.User();
                        newUser.set(FIELDS.username, username);
                        newUser.set(FIELDS.password, password);
                        newUser.set(FIELDS.email, email);
                        newUser.set(FIELDS.firstName, firstName);
                        newUser.set(FIELDS.lastName, lastName);
                        newUser.set(FIELDS.role, role);

                        var userACL = new Parse.ACL();
                        userACL.setPublicReadAccess(true);
                        userACL.setPublicWriteAccess(true);

                        //newUser.setACL(userACL);

                        newUser.signUp(null, {
                            success: function(user) {
                                role.getUsers().add(user);
                                role.save();

                                defer.resolve(user);
                            },
                            error: function (error) {
                                defer.reject(error);
                            }
                        });
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            }
        });

        return User;
    });