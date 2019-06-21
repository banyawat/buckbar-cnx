import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const submitAssignment = async (name, id) => {
  if (name && id) {
    await axios.post(ASSIGNMENT_URL, {
      username: name,
      id,
    })
  }
}

export default submitAssignment
