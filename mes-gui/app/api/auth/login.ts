import users from '@/data/mock-users.json'

import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body
    
    let login = false;

    users.forEach(user => {
        if ((user.email == email) && (user.password == password)) {
            login = true
        }
    })

    if (login) {
        res.status(200).json({ success: true })
    } else {
        res.status(200).json({ success: false })
    }
 
  } catch (error) {
    res.status(400).json({error: error})
  }
}