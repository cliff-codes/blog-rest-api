
//create user
export const createUser = async(req, res) => {
    const {username, email, password } = req.body

    console.log(username, email, password)
    res.json({
        message: 'User created successfully'
    })
}

