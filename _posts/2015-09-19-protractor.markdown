---
layout: post
title:  "End-2-End Testing with Protractor"
date:   2015-09-19 11:14:58
categories: Posts
---

Where do I start. 
Not having the greatest insight into automated testing, and being asked to look and create the tests using this new cool end-to-end testing framework for angular.js and non-angular.js web apps as well, you could say was very daunting. 

But what the hell!

Learning new skills, technologies and being out your comfort zone, is the experience everyone goes through on a daily basis, in this industry I have chosen to be a part of. 

The first place I began to learn was [Protractors website.](https://angular.github.io/protractor/#/)

It gave you an outline of how to set up and provided a simple tutorial to get you up and running to be able to complete a test, however there wasn't much detail or explanation.

I was set a task to use protractor on a non-angluar project. This sounded pretty straight forward, until I realised protractor is aimed for testing angular.js applications. It took a while to figure out what needed to be done, as everyone seemed to have a different view, which I guess so do I now. 

Hopefully I wont be adding to the confusion which I encountered, so below I thought it would be useful for later projects to have a simple guide to provide guidance on how to set up and start running the tests. 

##Guide to using Protractor - What is Protractor?

> [Protractor](https://angular.github.io/protractor/#/) is an end-to-end test framework for AngularJS applications
> built on top of WebDriverJS. Protractor runs tests against your
> application running in a real browser, interacting with it as a user
> would.

##Getting started

### Installing Locally

In order to access the script, you will need to install Protractor locally in the top-level directory of the repository we want to test.

    npm install protractor 
    
 When installing Protractor it also installed *webdriver-manager* command line tool.  

The webdriver-manager is a helper tool to easily get an instance of a Selenium Server running. 

To get Selenium Server installed run:
 
    ./node_modules/protractor/bin/webdriver-manager update

Now start up a server with:

    webdriver-manager start
    
### Installing Globally
*You can install protractor globally as well but it is not recommended.*

Install Protractor using npm:

    npm install -g protractor

To make sure you have it installed run:

    Protractor --version 
    
Install webdriver-manager:

    webdriver-manager update

Now start up a server with:

    webdriver-manager start

### Setting up your files

You will need two files : configuration and spec file. 

#### Configuration file
Protractor needs a configuration file for it to know how to run and when to connect to the selenium server.

Create a file in the test directory.

Create a configuration file in your test directory and call it `conf.js`. An example of the configuration file can be found in the protractor folder you installed locally.

     ./node_modules/protractor/example/conf.js 

Here is a basic example of conf.js, for more configuration options checkout the GitHub - [referenceConf.js](https://github.com/angular/protractor/blob/master/docs/referenceConf.js) 

    exports.config = {
      seleniumAddress: 'http://localhost:4444',
		  suites: {
			 base: ['base/*.js'],
			 content: ['content/*.js'],
			 event: ['event/*.js'],
		},
		
		// configure browsers to run tests
		capabilities: {
			'browserName': 'chrome'
		},

	    // testing framework, jasmine is the default
	    jasmineNodeOpts: {
		   showColors: true,
		   defaultTimeoutInterval: 30000
		}

	    // Testing on Angular site or not
	    onPrepare: function() {
		    global.isAngularSite = function(flag){
			    browser.ignoreSynchronization = !flag;
		    };
	    }
    };

#### Spec files
Spec are where you write your tests and should be created in the same test directory as the config file. 

Example of the spec file below which came from the [Protractor site](https://angular.github.io/protractor/#/tutorial).

    // spec.js
    describe('Protractor Demo App', function() {
      it('should have a title', function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    	expect(browser.getTitle()).toEqual('Super Calculator');
      });
    });

##Running the tests

### Locally

Run this command to get the test running, within the your test directory :

    protractor conf.js

### On SauceLabs

You can run your tests through SauceLabs and to do this you will need to add these two lines of code in your conf.js file

      // Saucelabs credentials.
      sauceUser: process.env.SAUCE_USERNAME,
      sauceKey: process.env.SAUCE_ACCESS_KEY,

#### Setting up Sauce Connect

You will need to follow the instructions here to install Sauce Connect: 
https://docs.saucelabs.com/reference/sauce-connect/

You can either:

 - Run these commands through the command line every time you work on these tests
 - Or add the following lines to your .bash_profile


          // Saucelabs credentials
          export SAUCE_USERNAME=
          export SAUCE_ACCESS_KEY=
          export SAUCE_TUNNEL_ID=can-be-called-anything

 - USERNAME - what ever you choose.
 - ACCESS-KEY - Is unique every time, which can be found on the [SauceLabs account page](https://saucelabs.com/account).
 - TUNNEL_ID - variable to something unique to yourself

#### Running SauceLabs locally

To be able to get the tests running from you local machine on SauceLabs, run the following command with the correct variables

    ./bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -i $SAUCE_TUNNEL_ID

*(This should be executed in the directory where your Sauce Connect downloaded)*

On another tab you will still need run the webdrive-manager (on the doc root of the directory)

    webdriver-manager start

*Note: If you receive an error message saying `No Selenium jar found [...]`, then run the following command:*

    webdriver-manager update

##Continuous integration

###CircleCi 

> CircleCI is the fastest way to run your test suite no matter how large. We divide up your tests intelligently based on average execution time and run an even workload on multiple containers in parallel, all on the fastest hardware available.

#### Setting up CircleCi
Go to [CircleCi](https://circleci.com/) website sign up with your GitHub account and add a project on GitHub, and start building and testing!

#### Creating circle.yml file

Add a circle.yml file to the root directory of your repository. The circle.yml file should at least consist of the follow 5 steps:

 - Configure the test machine
 - Check out your code
 - Set up your test dependencies
 - Set up your test databases
 - Run your tests

You can change the order in which the commands are run by adding override, pre, and/or post when needed - more info found [here](https://circleci.com/docs/manually).

A sample of the circle.yml file can be found on [CircleCi](https://circleci.com/docs/config-sample) website where it explains each commands. 

#### Testing with SauceLabs

In the circle.yml file you will need to include the following snippet of code for it to run with SauceLabs:

    # Download SauceLabs secure tunnel
    # https://circleci.com/docs/browser-testing-with-sauce-labs
    dependencies:
      post:
        wget https://saucelabs.com/downloads/sc-latest-linux.tar.gz
        tar -xzf sc-latest-linux.tar.gz

    test:
      override:
	    # Run SauceLabs tests
        ./bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -f ~/sc_ready:
            background: true
            pwd: sc-4.3-linux
	    # Wait for tunnel to be ready
        while [ ! -e ~/sc_ready ]; do sleep 1; done
        protractor config.js --params.url 'http://localhost:8888' 
        --params.isSauceLabs 1:
        pwd: tests/saucelabs/protractor_tests


##Views on Protractor

###Setting up

Installing Protractor with the project was quite simple, the only issue was finding a way round it not being an AngularJS application. But as mentioned before it only needed an extra couple of lines in the files to get it running.

###Choosing a Framework for the tests

Why Jasmine?

 - Default framework
 - Lots of documentation
 - Being used on other projects
 - Easy to write, once you have done a few (not pints)

You can use other frameworks such as Mocha and Chai. As trialling Protractor with previous tests being written in Chai, I did try and carry on using Chai with protractor but was just getting error after error.

The only main issue with Jasmine is the results printed in the console log. They were messy and hard to read, however there is a npm module - [jasmine-spec-reporter](https://github.com/bcaudan/jasmine-spec-reporter)  - that solves all of this:

Install via npm:

    npm install jasmine-spec-reporter --save-dev

In your conf.js file:

    exports.config = {
       // your config here ...
    
       onPrepare: function() {
          var SpecReporter = require('jasmine-spec-reporter');
          // add jasmine spec reporter
          jasmine.getEnv().addReporter(new SpecReporter({
          displayStacktrace: true}));
       }
    }

Then remove Jasmines' dot reporter:

    jasmineNodeOpts: {
       ...
       print: function() {}
    }

Then once running your tests locally the report should look all pretty! 

In addition if using CircleCi as well it can now understand the results of any test runner that can produce JUnit-formatted XML.  There is a module [Jasmine Reporters](https://github.com/larrymyers/jasmine-reporters) that allows you to do this:

Firstly you need to install Jasmine Reporters:

    npm install --save-dev jasmine-reporters@^2.0.0

Then add this snipped of code to your conf.js file with the path you want your test results saved:

    framework: 'jasmine2',
    onPrepare: function() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.
        JUnitXmlReporter({
            consolidateAll: true,
            savePath: 'test_results',
            filePrefix: 'xmloutput'
        }));
    }

##Further reading

Below I have listed some really interesting reads that definitely helped and answered many questions that I had and maybe you will have to:

 - [Using Page Objects to overcome Protractors shortcomings](http://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings)
 - [Get Hands-on with Protractor in 3 steps](http://www.thoughtworks.com/insights/blog/hands-protractor-3-steps?)
 - [Protractor - Testing Angular and Non Angular Sites](http://ng-learn.org/2014/02/Protractor_Testing_With_Angular_And_Non_Angular_Sites/#)
 - [Setting up Sauce Connect](https://docs.saucelabs.com/reference/sauce-connect/)
 - [Protractor API](https://angular.github.io/protractor/#/api)
 - [Protractor for AngularJS - Writing end-to-end tests has never been so
   fun](http://ramonvictor.github.io/protractor/slides/#/)
