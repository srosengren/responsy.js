Responsy.js
===========

A simple tool for firing callbacks when the browsers width changes.

Usage
-----------
Simply drop in responsy.js in your html and attach callbacks to the breakpoints that you need.
Responsy.js exposes the following functions:

**addBreakpoint(brekpoint)**

Takes a breakpoint object in the following format.

*name:* A unique string identifier. Required.

*lowerBound:* Integer that indicates the lower part of the breakpoint, Optional.

*upperBound:* Integer that indicates the upper part of the breakpoint, Optional.

*callbacks:* An object with named functions that gets called when the browser width is within the breakpoints upper and lower bounds.

**addCallback(breakpointName, callbackName, callback)**

Adds a callback to an existing breakpoint.

*breakpointName:* String identifier of a existing breakpoint.

*callbackName:* The name of your new callback.

*callback:* a function.

**removeBreakpoint(breakpointName)**

Simply removes a breakpoint from responsy.

**removeCallback(breakpointName, callbackName)**

Removes a named callback from the specified breakpoint.

Defaults
---------

Responsy have 5 default breakpoints that you can add callbacks to. These correspond to **bootstraps** responsive breakpoints.

* phone <= 480
* phoneTablet <= 767
* tablet 768 - 979
* desktop 980 - 1199
* large >= 1200

Examples
---------

Add a new callback named output to the default **large** breakpoint

`responsy.addCallback('large','output',outputFunction);`