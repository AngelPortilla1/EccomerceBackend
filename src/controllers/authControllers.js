

export const registerUser = async (req, res) => {
    try{

        console.log(req.body);
        const JWT_SECRET = process.env.JWT_SECRET;

        // console.log(JWT_SECRET);
        // res.json({claveSecreta : JWT_SECRET })
        const { username, email, password } = req.body;
        console.log(username, email, password);

        res.json({ username, email, password, JWT_SECRET })

    }catch(error) {
        res.json({ error: error.message });

    }
}