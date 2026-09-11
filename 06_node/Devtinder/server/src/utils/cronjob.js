const cron = require("node-cron")
const { subDays, startOfDay, endOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest")

cron.schedule("0 8 * * *", () => {

    try {

        const yesterday = subDays(new Date(), 1)


        const yesterdayStart = startOfDay(yesterday)
        const yesterdayEnd = endOfDay(yesterday)

        const pendingRequests = ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserIds.emailId))];

        for (const email of listOfEmails) {
            // Send Emails

        }

    } catch (err) {
        console.log(err)
    }
})


