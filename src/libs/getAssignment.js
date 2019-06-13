import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT

const getAssignment = async () => {
  const result = await axios.get(`${SERVICE_URL}/assignments`)
  return result.data
}

export default getAssignment
