import bcrypt from 'bcrypt'; // Fix the import
import prisma from '../lib/prisma.js ';

export const register = async (req, res) => { // Add async here
    const { username, email, password } = req.body;

    try{
    // Hash the PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10); // Correct import name
    
    console.log(hashedPassword);

    // Create a new user and save to db
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });
    console.log(newUser);

    res.status(201).json({message: "User created su ccesfully"});
} catch(err){
    console.log(err)
    res.status(500).json ({message: "Failed to create user"})
}
 
};

export const login = async (req, res) => {
    const {username,password} = req.body;
    
    try{

    

    // check if the user exists

    const user = await prisma.user.findUnique({
        where:{username },
    });

    if(!user) return res.status(404).json({message:"Invalid Creadentials"});
     
    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) return res.status(404).json({message:"Invalid Creadentials"});

    // Generat COKIE TOKEN AND SEND TO THE USE    
} catch(err){
    console.log(err)
    res.status(500).json({message:"Failed to login!"})
}
};
export const logout = (req, res) => {
    // db operation
};


