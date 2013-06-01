/*
 * Responsy.js
 *
 * Copyright 2013 Sebastian Rosengren
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */
 
var responsy = (function() {
        //Private properties and functions
    var privateObject = (function(privateModule){
            privateModule = {
                activeBreakpoints: [],
                breakpoints: {
                    phone: {
                        name: 'phone',
                        upperBound: 480
                    },
                    phoneTablet: {
                        name: 'phoneTablet',
                        upperBound: 767
                    },
                    tablet: {
                        name: 'tablet',
                        lowerBound: 768,
                        upperBound: 979
                    },
                    desktop: {
                        name: 'desktop',
                        lowerBound: 980,
                        upperBound: 1199
                    },
                    large: {
                        name: 'large',
                        lowerBound: 1200
                    }
                },
                triggerCallbacks: function(breakpoint) {
                    for (var callback in breakpoint.callbacks) {
                        if (breakpoint.callbacks.hasOwnProperty(callback)) {
                            breakpoint.callbacks[callback]();
                        }
                    }
                },
                addActive: function(breakpoint){
                    if(!privateModule.isActive(breakpoint)){
                        privateModule.activeBreakpoints.push(breakpoint.name);
                    }
                },
                removeActive: function(breakpoint){
                    var i = 0;
                    for(; i < privateModule.activeBreakpoints.length; i++){
                        if(privateModule.activeBreakpoints[i] === breakpoint.name){
                            privateModule.activeBreakpoints.splice(i,1);
                            break;
                        }
                    }
                },
                isWithinBounds: function(width, breakpoint) {
                    var withinBounds = breakpoint.upperBound || breakpoint.lowerBound;
                    if(breakpoint.upperBound && breakpoint.upperBound <= width){
                        withinBounds = false;
                    }
                    if(breakpoint.lowerBound && breakpoint.lowerBound >= width){
                        withinBounds = false;
                    }
                    return withinBounds;
                },
                isActive: function(breakpoint){
                    for(var i = 0; i < privateModule.activeBreakpoints.length; i++) {
                        if (breakpoint.name === privateModule.activeBreakpoints[i]){
                            return true;
                        }
                    }
                    return false;
                }
            };
            return privateModule;
        }({})),
        //The object that contains all public methods and properties
        publicObject = (function(publicModule){
            publicModule = {
                addBreakpoint: function(breakpoint) {
                    if (breakpoint && breakpoint.name) {
                        privateObject.breakpoints[breakpoint.name] = breakpoint;
                    }
                },
                //Adds a named callback to the specified breakpoint
                addCallback: function(breakpointName, callbackName, callback) {
                    if(privateObject.breakpoints[breakpointName]){
                        privateObject.breakpoints[breakpointName].callbacks = privateObject.breakpoints[breakpointName].callbacks || {};
                        privateObject.breakpoints[breakpointName].callbacks[callbackName] = callback;
                    }
                },
                removeBreakpoint: function(breakpointName) {
                    delete privateObject[breakpointName];
                },
                //Removes a named callback from the specified breakpoint
                removeCallback: function(breakpointName, callbackName) {
                    if (privateObject[breakpointName]) {
                        delete privateObject[breakpointName][callbackName];
                    }
                },
                getActiveBreakpoints: function(){
                    return privateObject.activeBreakpoints;
                }
            };
            return publicModule;
        }({})),
        //The handler that we later attach to window.resize event
        resizeHandler = function() {
            var width = window.innerWidth;
            for (var prop in privateObject.breakpoints) {
                //Iterate over all breakpoints
                if (privateObject.breakpoints.hasOwnProperty(prop)) {
                    (function(breakpoint){
                        if (!privateObject.isActive(breakpoint) && privateObject.isWithinBounds(width,breakpoint)) {
                            privateObject.triggerCallbacks(breakpoint);
                            privateObject.addActive(breakpoint);
                        }
                        else if (privateObject.isActive(breakpoint) && !privateObject.isWithinBounds(width,breakpoint)) {
                            privateObject.removeActive(breakpoint);
                        }
                    }(privateObject.breakpoints[prop]));

                }
            }
        }

    //Attach eventhandler for the windows resize event
    if (window.addEventListener) {
        window.addEventListener('resize', resizeHandler, true);
    } else if (window.attachEvent) {
        window.attachEvent('onresize', resizeHandler);
    }

    return publicObject;
}());