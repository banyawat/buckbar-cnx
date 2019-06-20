import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const removeAssignment = async (id) => {
  if(id) {
    const result = await axios.delete(`${ASSIGNMENT_URL}/${id}`)
    return result
  }
}

export default removeAssignment
