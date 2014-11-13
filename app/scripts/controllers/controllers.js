'use strict';

/* Controllers */

angular.module('mentoringServiceApp')
  .controller('loginCtrl', ['$scope', function($scope) {

  }])

  .controller('signupCtrl', ['$scope', function($scope) {

  }])

  .controller('usersCtrl', function($scope, ergastAPIservice, userFactory, educationFactory, experienceFactory, awardFactory, certificateFactory, testScoreFactory, languageFactory, categoryFactory, mentoringFactory) {
    $scope.nameFilter = null;
    $scope.driversList = [];

        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
        };

    ergastAPIservice.getDrivers().success(function (response) {
        //Dig into the responde to get the relevant data
        $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    });

        userFactory.findMentors().then(function(mentors) {
            $scope.mentors = mentors;
        });

//        userFactory.signup("mentor5", "password", "test5@test.com", "chong", "chung", "mentor").then(function(user) {
//            $scope.newuser = user;
//        });

        // Queries
        var query = new Parse.Query("User");
        query.equalTo("username", "mentor5");
        query.first()
            .then(function(user){
                console.log("User");
                console.log(JSON.stringify(user));
                user.getEducations().then(function(educations) {
                    console.log(JSON.stringify(educations));
                });

                $scope.user = user;
                console.log(JSON.stringify(user.getEducations()));

                var educationTypes = educationFactory.getTypes();
                var educationAttrs = {
                    school: "University of Washington",
                    type: educationTypes.bachelor.key,
                    major: "Sociology",
                    startYear: 2004,
                    endYear: 2008,
                    city: "Seattle",
                    state: "WA",
                    country: "USA",
                    isCurrent: false,
                    user: $scope.user
                };
//                var education = educationFactory.createEducation(educationAttrs);
//                education.save().then(function(success) {
//                    $scope.user.addEducation(education);
//                }, function(error) {
//                    // failed to save
//                });

                var experienceAttrs = {
                    companyName: "Apple",
                    title: "Software Engineer",
                    location: "Cupertino, CA, USA",
                    startYear: 2014,
                    startMonth: 1,
                    isCurrent: true,
                    description: "iTunes Store Engineering",
                    user: $scope.user
                };
//                var experience = experienceFactory.createExperience(experienceAttrs);
//                experience.save().then(function(success) {
//                    $scope.user.addExperience(experience);
//                }, function(error) {
//                    // failed to save
//                });

                var awardAttrs = {
                    name: "Math Competition in North America",
                    issuer: "M.I.T.",
                    month: 10,
                    year: 2000,
                    description: "1st place among 10,000 people",
                    user: $scope.user

                };

//                var award = awardFactory.createAward(awardAttrs);
//                award.save().then(function(success){
//                    $scope.user.addAward(award);
//                }, function(error) {
//                    // failed to save
//                });
                var certificateAttrs = {
                    name: "Java Certificate",
                    authority: "Java Inc.",
                    licenseNumber: "123-123-1234",
                    url: "java.com",
                    month: 10,
                    year: 2000,
                    noExpiration: true,
                    user: $scope.user
                };
//                var certificate = certificateFactory.createCertificate(certificateAttrs);
//                certificate.save().then(function(success) {
//                    $scope.user.addCertificate(certificate);
//                }, function(error) {
//                    // failed to save
//                });

                var testScoreAttrs = {
                    name: "TOEFL",
                    score: 110.5,
                    month: 10,
                    year: 2000,
                    user: $scope.user
                };
//                var testScore = testScoreFactory.createTestScore(testScoreAttrs);
//                testScore.save().then(function(success) {
//                    $scope.user.addTestScore(testScore);
//                }, function(error) {
//                    // failed to save
//                });
                var levels = languageFactory.getProficiencyLevels();
                var languageAttrs = {
                    name: "Korean",
                    proficiency: levels.fullProfessional.key,
                    user:$scope.user
                };
//                var language = languageFactory.createLanguage(languageAttrs);
//                language.save().then(function(success) {
//                    $scope.user.addLanguage(language);
//                }, function(error) {
//                    // failed to save
//                });

                var types = mentoringFactory.getTypes();
                var methods = mentoringFactory.getMethods();
                console.log("CHONG");
                console.log(methods.videoChat.name);
[]
                var priceUnits = mentoringFactory.getPriceUnits();
                var durationUnits = mentoringFactory.getDurationUnits();

                var categoryAttrs = {
                    name: "미국 대학 진학"
                };
//                var category = categoryFactory.createCategory(categoryAttrs);
//                category.save().then(function(success) {
//                    var mentoringAttrs = {
//                        title: "미국 대학 진학에 대해 맨토링 해드립니다",
//                        description: "한국 대학에서 미국 대학으로의 편입 혹은 고등학교에서 미국 대학 입학하는 것에 대해 멘토링 해드립니다",
//                        type: types.service,
//                        method: methods.videoChat.key,
//                        price: 100,
//                        priceUnit: priceUnits.dollar.key,
//                        duration: 60,
//                        durationUnit: durationUnits.min.key,
//                        mentor: $scope.user,
//                        category: category
//                    }
//
//                    var mentoring = mentoringFactory.createMentoring(mentoringAttrs);
//                    mentoring.save().then(function(success) {
//                        $scope.user.addMentoring(mentoring);
//                        category.addMentoring(mentoring);
//                    }, function(error) {
//                        // failed to add mentoring
//                    });
//
//                }, function(error) {
//                    // failed to save category
//                })


            });








  })

/* Driver controller */
  .controller('userCtrl', function($scope, $routeParams, ergastAPIservice, userFactory, educationFactory) {
    $scope.id = $routeParams.id;
    $scope.races = [];
    $scope.driver = null;

    ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
        $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
    });

    ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
        $scope.races = response.MRData.RaceTable.Races;
    });
  });

