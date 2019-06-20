import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const udpateAssignment = async (id, {
  name,
  question,
  answer
}) => {
  const result =  await axios.post(ASSIGNMENT_URL, {
    id,
    name,
    question,
    answer
  })
  return result.data
}

export default udpateAssignment
