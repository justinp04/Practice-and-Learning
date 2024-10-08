# TL:DR
This directory will explore the observer pattern through a simple notification application.

## What is the observer pattern?
The observer pattern is a design pattern that essentially defines a callback for a certain set of 'subscribers' or objects that require that desired behavior. Once a change is 'observed', an action will take place for those objects. 

This is implemented through a adding the listeners/subscribers to a list in a common 'publisher' object, which will be the object to notify all the listeners.