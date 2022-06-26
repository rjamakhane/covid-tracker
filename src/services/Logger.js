
class Logger {
    info(message, ...props){
        console.log(`%cInfo: ${message}`,'color: #ffaa04', props);
    }

    log(message, ...props){
        console.log(`%cLog: ${message}`, 'color: #008000', props);
    }

    error(message, ...props){
        console.log(`%cError: ${message}`, 'color: #f00', props);
    }
}

export default new Logger();