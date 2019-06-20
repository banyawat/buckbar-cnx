import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const submitAssignment = async (username, id) => {
  await axios.post(ASSIGNMENT_URL, {
    username,
    id,
  })
}

export default submitAssignment
