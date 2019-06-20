import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const USER_URL = `${SERVICE_URL}/users`

const submitUser = async (name, score) => {
  await axios.post(USER_URL, {
    name,
    score,
  })
}

export default submitUser
