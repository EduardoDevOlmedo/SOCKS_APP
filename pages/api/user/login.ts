import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import bcrypt from "bcryptjs"
import { User } from '../../../models/User'

type Data = 
|{message: string}
|{
        userName: string;
        role: string;
} 

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res)
        default:
            return res.status(404).json({
                message: 'Method not found'
            })
    }
}

const loginUser = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
  
    const {user = '', password = ''} = req.body 

    await db.connect()
    
    const userName = await User.find({user})

    await db.disconnect()



    if(!userName){
        return res.status(404).json({message: 'El usuario o contraseña no existe.'})
    }

    if(!bcrypt.compareSync(password, userName[0].password || "")){
        return res.status(404).json({message: 'Contraseña incorrecta.'})
    }




    return res.status(200).json(
        {
                userName: userName[0].user,
                role: userName[0].role
        }
    )

} 