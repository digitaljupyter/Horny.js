var hornySession = {
    stack: [],

    /* Return the last item in the stack */
    getLastItem: function () {
        return this.stack[this.stack.length - 1]
    }
}

let hornyExecuteChunk = (chunk, session) => {
    let arg = []
    let stack = session.stack

    let ps = 0;
    let buffer = "";
    let state
        = 7
    for (let i = 0; i < chunk.length; ++i) {
        let s = chunk[i]
        if (s == '\'' && (state == 7 || state == 10)) {
            ps = state;
            state = 9;
        }

        else if (s == '\'' && state == 9) { state = ps; }

        else if (s == '!' && state == 7) {
            if (arg.length == 0 && buffer.length > 0) {
                // try to fill in a missing argument
                arg.push(buffer.trim());
            }
            console.log(arg[0]);
            buffer = "";
            state = 7;
            arg = [];
        } else if (s == '@' && state == 7) {
            stack.push(arg[0]);
            buffer = "";
            arg = [];
        } else if (s == '+' && state == 7) {
            stack += eval((arg[0]) + " + " + (arg[1]));
            buffer = "";
            arg = [];
        } else if (s == ';' && state == 7) {
            state = 0;
        } else if (s == ';' && state == 0) {
            state = 7;
            buffer = "";
        } else if (s == '*' && (state != 9 && state > 1)) {
            buffer += stack[stack.length - 1];
        } else if (s == '(' && state == 7) {
            state = 10;
            buffer = "";
        } else if (s == ',' && state == 10) {
            arg.push(buffer.trim());
            buffer = "";
        } else if (s == ')' && state == 10) {
            state = 7;
            if (buffer.length > 0) arg.push(buffer.trim());
        }
        else {
            buffer += s;
        }
    }
}

module.exports.hornySession = hornySession
module.exports.executeHorny = hornyExecuteChunk
