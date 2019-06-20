import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT
const ASSIGNMENT_URL = `${SERVICE_URL}/assignments`

const submitAssignment = async (name, assignmentID) => {
  await axios.post(ASSIGNMENT_URL, {
    name,
    assignmentID,
  })
}

export default submitAssignment
