# Train Flipboard

This project uses moment.js and firebase to make a flip board for train times. Users can add
to the train schedule and it takes four series of information to update the schedule. 

THIS HOMEWORK IS NOT DONE TO THE INSTRUCTIONS. ITS INCOMPLETE.

What are the issues?

Biggest and foremost I didn't include an interval for the information to be updated.
This could be accomplished by taking the data from the firebase database and making an array
then looping through said array to set up multiple intervals for each item in the length of 
the array so values can be edited with ease and less confusion with hard coding. This would
utilize the update feature for firebase and use Moment.js for time manipulation.

The second issue is the minutes away column of data. Its calculating only to the current 
day/the quickest way to get to the date its stuck on. With the interval this wouldn't be a 
problem as it would be correctly updated accordingly. 

Third issue is when you add new data to the database and it goes to appear on screen it adds 
the new data however as many times as data you've previously entered. For instance, if you 
added 3 entries, entry one is done once, entry two gets posted two times, entry three gets 
posted three different times. I'm not sure why this is happening. I have no solution.

Finally as part of extra credit it mentions having the numbers update by the minute for the 
next arrival time. This is easliest done similarly to the first issue but with a set interval 
that updates the current time node and doing the arthmetic from the next arrival time node. 