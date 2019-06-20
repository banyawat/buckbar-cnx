import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ALL_ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const getAllAssignment = async () => {
  const result = await axios.get(ALL_ASSIGNMENT_URL)
  return result.data
}

export default getAllAssignment
