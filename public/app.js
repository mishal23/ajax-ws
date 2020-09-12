$(function() {

    particlesJS.load('particles-js', './static/particles.json', function() {
		  console.log('callback - particles.json config loaded');
    });
    
    var ajax_total = 0;
    var sockets_total = 0;
    
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