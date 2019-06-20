import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT

const getAssignment = async (name) => {
  if(name) {
    const result = await axios.get(`${SERVICE_URL}/assignments/random`, {
      params: {
        name,
      }
    })
    return result.data
  }
  return
}

export default getAssignment
