import React, { Component } from "react"

class Countdown extends Component {
    state = {
        timerOn: false,
        timerStart: 30000,
        timerTime: 30000
    }

    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime
        })
        this.timer = setInterval(() => {
          const newTime = this.state.timerTime - 10
          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            })
          } else {
            const { callback } = this.props
            clearInterval(this.timer)
            callback()
            this.setState({ 
                timerOn: false, 
            })
          }
          this.props.getValue(newTime)
        }, 10)
    }

    stopTimer = () => {
        clearInterval(this.timer)
        this.setState({ 
            timerOn: false, 
            visible: true,
        })
    }

    resetTimer = () =>{
        this.setState({ timerTime: 30000 })
    }

    componentDidMount = () =>{
        this.startTimer()
    }

    render() {
        const { timerTime } = this.state
        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2)
        return (
        <div className="Countdown" style={{
            backgroundColor: 'black',
            marginLeft: '30px',
            marginRight: '30px',
            border: '2px solid grey',
            borderRadius: '4px',
            padding: '20px',
            width: '400px',
            backgroundColor: 'rgb(22, 27, 31)',
            boxShadow: '0 3px 6px rgb(12, 12, 12)',
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex:999,
        }}>
            <div className="Countdown-header" style={{
                color: 'white',
                fontSize: '40px',
                fontWeight: 'bold',
            }}>Countdown</div>
            <div className="Countdown-label" style={{
                color: 'white',
                fontSize: '18px',
                marginTop: '5px',
                marginBottom: '10px',
            }}>Seconds</div>
            <div className="Countdown-display" style={{
                marginTop: '5px',
                marginBottom: '20px',
            }}>
                <div className="Countdown-time" style={{
                    color: 'white',
                    fontSize: '36px',
                    margin: '5px 0',
                }}>
                    {seconds}
                </div>
            </div>
        </div>
        )
    }
}
export default Countdown