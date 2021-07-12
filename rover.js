class Rover {
   // Write code here!
    constructor(position, mode, generatorWatts){
        this.position = Number(position);
        this.mode = 'NORMAL';
        this.generatorWatts = 110;     
    }

    receiveMessage(message) {
        // returns response object with 
        // message, and results
        let response = {
            message : message.name,
        }

        let results = [];
        let commands = message.commands;

        // iterate over commands
        for (const idx in commands){

            // Store command type in variable
            let commandType = commands[idx].commandType;

            // Status Check Command
            if (commandType == "STATUS_CHECK") {
                let result = {
                    completed: true,
                    roverStatus: {
                        mode: this.mode,
                        generatorWatts: this.generatorWatts,
                        position: this.position,
                    }
                }

                // Push into results array
                results.push(result)
            }

            else if (commandType == "MODE_CHANGE"){
                let result = {
                    completed: true,
                }
                    this.mode = commands[idx].value;
                    results.push(result)
                }

            else if (commandType == "MOVE"){
                let result = {
                    completed: false
                }
                if (this.mode != "LOW_POWER"){
                
                this.position = commands[idx].value;
                
                }
                results.push(result)
            
            }
        }
        // Store results in response
        response.results = results;
        return response;
    }
}

module.exports = Rover;