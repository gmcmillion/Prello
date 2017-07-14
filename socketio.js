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
            .on('board id', function(id) {
                socket.join(id);
            })
            .on('send list', function(data, id) {
                socket.broadcast.to(id).emit('new list', data);
            }) 
            .on('delete list', function(col, id) {
                socket.broadcast.to(id).emit('updated list', col);
            })
            .on('send card', function(data, col, row, id) {
                socket.broadcast.to(id).emit('new card', data, col, row);
            })
            .on('delete card', function(col, row, id) {
                socket.broadcast.to(id).emit('updated card', col, row);
            })
            .on('disconnect', function(){
                console.log('user disconnected');
            });
        });
	}
};