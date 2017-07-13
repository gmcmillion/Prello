var instance;

module.exports = {
	getInstance: function() {
        return instance;
    },
	setup: function(server) {
		instance  = require('socket.io')(server);

		instance.on('connection', function(socket){
            console.log('a user connected');      
            socket
            .on('send list', function(data) {
                socket.broadcast.emit('new list', data);
            }) 
            .on('delete list', function(col) {
                socket.broadcast.emit('updated list', col);
            })
            .on('send card', function(data, col, row) {
                socket.broadcast.emit('new card', data, col, row);
            })
            .on('delete card', function(col, row) {
                socket.broadcast.emit('updated card', col, row);
            })
            .on('disconnect', function(){
                console.log('user disconnected');
            });
        });
	}
};