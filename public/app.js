$(function() {

    particlesJS.load('particles-js', './static/particles.json', function() {
		  console.log('callback - particles.json config loaded');
    });
    
    var ajax_total = 0;
    var sockets_total = 0;

    $("#submitRequests").click(function(){
      var numOfRequests = $("#requests").val();
      console.log(numOfRequests);

      doGET(numOfRequests);

      setTimeout(function(){}, 5000);

      doSocket(numOfRequests);

      setTimeout(drawGraph, 7000);
    });

    function doGET(numOfRequests){
      var ajax_start = new Date().getTime();
      for(var i=0;i<numOfRequests;i++){
        $.get("/ajax", function(data, status){
          var ajax_elapsed = new Date().getTime() - ajax_start;
          ajax_total = ajax_elapsed;
        });
      }
    }

    function doSocket(numOfRequests){
      var socket_start = new Date().getTime();
      var socket = io();
      for(var i=0;i<numOfRequests;i++){
        socket.emit('silly-hacks', i);
      }

      socket.on('resp', function(data){
        if(data == numOfRequests -1){
          var webs_elapsed = new Date().getTime() - socket_start;
          sockets_total = webs_elapsed;
        }
      })
    }
    
    
    function drawGraph(){
        var data = [
            {
              x: ['ajax', 'socket.io'],
              y: [ajax_total, sockets_total],
              type: 'bar'
            }
          ];

          Plotly.newPlot('chart', data);
    }

});