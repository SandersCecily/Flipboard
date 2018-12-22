$(function(){

     // Initialize Firebase
     var config = {
        apiKey: "AIzaSyDwVjGxhEh3TUqMSfU5nznQkjnUAdDwxrM",
        authDomain: "rps-multi-4406f.firebaseapp.com",
        databaseURL: "https://rps-multi-4406f.firebaseio.com",
        projectId: "rps-multi-4406f",
        storageBucket: "rps-multi-4406f.appspot.com",
        messagingSenderId: "317148259043"
      };
      firebase.initializeApp(config);


      let database = firebase.database();

      database.ref().once("value", function(snapshot){
        if(snapshot.exists()){
            let content = "";
            snapshot.forEach(function(snapshot){
                content +="<tr>";
                content += "<td>" + snapshot.val().name + "</td>";
                content += "<td>" + snapshot.val().des + "</td>";
                content += "<td>" + snapshot.val().newdate+ "</td>";
                content += "<td>" + snapshot.val().rate + "</td>";
                content += "<td>" + snapshot.val().arrivalmin + "</td>";
                content += "</tr>";
            });
            $("tbody").append(content);
        }
      });

      $("#enter").click(function(){
        
        //prevent reload
        event.preventDefault();
        $("tbody").empty();

        //get data
        let name = $("#name").val().trim();
        let des = $("#des").val().trim();
        let starttime = $("#time").val().trim();
        let rate = $("#rate").val().trim();

        //clear form
        $("#name").val("");
        $("#des").val("");
        $("#time").val("");
        $("#rate").val("");

        //work with start time
        let hours = parseInt(starttime.slice(0,2));
        let mins = parseInt(starttime.slice(2,4));
        let date = moment({hour: hours, minute: mins}).format("HH:mm");
        rate = parseInt(rate);
        let newdate = moment(date, "HH:mm").add(rate, "minutes").format('hh:mm a');

        //get the difference of current time to newdate in minutes
        let current = moment();
        let arrivalmin = Math.floor(moment(newdate, "HH:mm").diff(current, "minutes",true));


        //firebase!
        database.ref().push({
            name: name,
            des: des,
            time: date,
            newdate: newdate,
            rate: rate,
            arrivalmin: arrivalmin,
            dateAdded : firebase.database.ServerValue.TIMESTAMP
        });//END REF PUSH

        database.ref().on("child_added", function(snapshot){

            // Change the HTML to reflect
            let tdname = $("<td>").text(snapshot.val().name);
            let tddes = $("<td>").text(snapshot.val().des);
            let tdtime = $("<td>").text(snapshot.val().newdate);
            let tdrate = $("<td>").text(snapshot.val().rate);
            let tdarrivalmin = $("<td>").text(snapshot.val().arrivalmin);

            //append 
            let tr = $("<tr>")
            tr.append(tdname);
            tr.append(tddes);
            tr.append(tdtime);
            tr.append(tdrate);
            tr.append(tdarrivalmin);
            $("tbody").append(tr);
          }, function (error){
              alert("Herp Derp");
          });//END CHILD ADDED
        
      });//END CLICK FUNCTION

});