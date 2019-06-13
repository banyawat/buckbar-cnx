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
            'background-color': 'black',
            'margin-left': '30px',
            'margin-right': '30px',
            'border': '2px solid grey',
            'border-radius': '4px',
            'padding': '20px',
            'width': '400px',
            'background-color': 'rgb(22, 27, 31)',
            'box-shadow': '0 3px 6px rgb(12, 12, 12)',
            'position': 'fixed',
            'bottom': '0',
            'right': '0',
            'z-index':'999',
        }}>
            <div className="Countdown-header" style={{
                'color': 'white',
                'font-size': '40px',
                'font-weight': 'bold',
            }}>Countdown</div>
            <div className="Countdown-label" style={{
                'color': 'white',
                'font-size': '18px',
                'margin-top': '5px',
                'margin-bottom': '10px',
            }}>Seconds</div>
            <div className="Countdown-display" style={{
                'margin-top': '5px',
                "margin-bottom": '20px',
            }}>
                <div className="Countdown-time" style={{
                    'color': 'white',
                    'font-size': '36px',
                    'margin': '5px 0',
                }}>
                    {seconds}
                </div>
            </div>
        </div>
        )
    }
}
export default Countdown