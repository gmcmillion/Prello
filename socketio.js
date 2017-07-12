var instance;

module.exports = {
    instance, 
	getInstance: function() {
        return instance;
    },
	setup: function(server) {
		instance  = require('socket.io')(server);

		instance.on('connection', function(socket){
            console.log('a user connected');
            socket
            .on('send list', function(data) {
                instance.emit('new list', data);
            }) 
            .on('delete list', function(data) {
                instance.emit('updated lists', data);
            })
            .on('disconnect', function(){
                console.log('user disconnected');
            });
        });
		//return io;
	}
};