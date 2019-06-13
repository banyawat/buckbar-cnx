const compareResult = (correctResult,result) => {
    const value = correctResult.localeCompare(result)
    return !value
}

export default compareResult