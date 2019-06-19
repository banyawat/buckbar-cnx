import axios from 'axios'
import CONSTANT from '../constants'

const { SERVICE_URL } = CONSTANT

const createNewQuestion = async (title, questionCode, answerCode) => {
  const result = await axios.post(`${SERVICE_URL}/assignments/add`, {
    title,
    questionCode,
    answerCode
  })
  if (result.status === 200) {
    return result.data
  } else {
    return undefined
  }
}

export default createNewQuestion
