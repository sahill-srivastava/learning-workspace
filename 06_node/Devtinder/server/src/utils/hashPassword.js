const bcrypt = require("bcrypt");

const hashPassword = async (req) => {

    const { password } = req.body

   const passwordHash = await bcrypt.hash(password, 10);

   return passwordHash;

}

module.exports = {
    hashPassword,
}


