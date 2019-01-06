var store = {
    debug: true,
    state: {
        message:''
    },
    setMessageAction (newValue) {
        this.debug && console.log('setMessageAction triggered with', newValue)
        this.state.message = newValue
    },
    clearMessageAction () {
        this.debug && console.log('here')
        this.state.message = ''
    }
}
export default store;