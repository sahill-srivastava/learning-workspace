const { Server } = require("socket.io");

const getRoomId = (userId, targetUserId) => {
    return [userId, targetUserId].sort().join("_");
};


const initializeSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    })

    io.on("connection", (socket) => {
        // Handle events

        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {

             const roomId = getRoomId(userId, targetUserId);


            console.log(firstName + " joined the room: " + roomId)



            socket.join(roomId)

        });

        socket.on("sendMessage", ({
            firstName,
            userId,
            targetUserId,
            text,
        }) => {

             const roomId = getRoomId(userId, targetUserId);


            io.to(roomId).emit("messageReceived", { firstName, text })

        });

        socket.on("disconnect", () => {

        });

    });
}


module.exports = initializeSocket;




