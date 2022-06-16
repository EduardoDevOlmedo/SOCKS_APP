// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { IUser } from '../../interfaces'
import { User } from '../../models/User'
import bcrypt from "bcryptjs"

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>) {

    const adminMain: IUser = {
        user: 'Skeletons Socks ADMIN',
        password: bcrypt.hashSync('5s{t]AGG/SCK:QttRY4H'),
        role: 'admin'
    }


    await db.connect()

    await User.deleteMany()

    try {
      await User.insertMany(adminMain)
      return res.status(201).json({message: 'Successfully added user'})
    } catch (error: any) {
      await db.disconnect()
      return res.status(400).json({message: error})
    }
    

}
