import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ALL_ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const getAllAssignment = async (params = {}) => {
  const result = await axios.get(ALL_ASSIGNMENT_URL, {
    params
  })
  return result.data
}

export default getAllAssignment
