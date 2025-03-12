const colors: { [key: string]: number } = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    bright_black: 90,
    bright_red: 91,
    bright_green: 92,
    bright_yellow: 93,
    bright_blue: 94,
    bright_magenta: 95,
    bright_cyan: 96,
    bright_white: 97,
}

const CLEAR_ALL: string = "\x1b[2J\x1b[3J\x1b[H"
const CLEAR_LINE: string = "\x1b[2K\r"
const NEXT_LINE: string = "\r\n"

export class ShellCore {
    private user_name: string = "default"
    private github: string = "https://github.com/creeper5820"
    private blog: string = "https://creeper5820.com"

    private current_path: string = "/blog/shell"
    private buffer: string = ""

    private handle_token: { [key: string]: () => string } = {
        // ENTER
        '\r': () => {
            return "\n\r" + this.standard_output(this.command_parsing())
        },

        // CTRL + L
        "\x0c": () => {
            return CLEAR_ALL + this.standard_output(this.buffer)
        },

        // BACKSPACE
        "\x7f": () => {
            let result: string = ""
            if (this.buffer.length != 0)
                result = "\b \b"
            this.buffer = this.buffer.slice(0, -1)
            return result
        },

        // TAB
        "\t": () => {
            return "想啥呢，没补全" + NEXT_LINE + this.standard_output(this.buffer)
        },

        // DIRECTION
        "\x1b[A": () => {
            return ""
        },
        "\x1b[B": () => {
            return ""
        },
        "\x1b[C": () => {
            return ""
        },
        "\x1b[D": () => {
            return ""
        },

    }
    private handle_command: { [key: string]: (args: string[]) => string } = {
        "help": () => {
            let result = ""
            let commands = Object.keys(this.handle_command)
            result =
                CLEAR_LINE + "可用命令: " +
                commands.join(", ") + "\r\n" +
                this.standard_output("");
            return result
        },

        "pwd": () =>
            CLEAR_LINE + this.current_path + "\r\n" + this.standard_output(""),

        "echo": (args: string[]) =>
            args.slice(1).join(" ") + "\r\n" + this.standard_output(""),

        "clear": () =>
            CLEAR_ALL + this.standard_output(""),

        "fastfetch": () =>
            this.fast_fetch() + this.standard_output(""),

        "ls": () =>
            CLEAR_LINE + "不准看我的文件系统！\n\r" + this.standard_output(""),

        "cd": () =>
            CLEAR_LINE + "你要去哪里！?\n\r" + this.standard_output(""),
    }

    constructor(user_name: string) {
        this.user_name = user_name
    }

    public colorize(color: string, background: string, text: string): string {
        let color_code: number | undefined = colors[color];
        let background_code: number | undefined = colors[background] + 10

        if (color_code === undefined)
            return text;

        let result = `\x1b[${color_code}m`;

        if (background_code < 108 && background_code > 39)
            result += `\x1b[${background_code}m`;

        result += `${text}\x1b[0m`;
        return result;
    }

    public standard_output(text: string): string {
        let result: string = ""
        result += " " + this.colorize("bright_blue", "", this.user_name)
        result += " " + this.colorize("bright_black", "", this.current_path + ":")
        result += " " + this.colorize("white", "", text)
        return result
    }

    public fast_fetch(): string {
        const lines = [
            "  ____ ____  _____ _____ ____  _____ ____  ",
            " / ___|  _ \\| ____| ____|  _ \\| ____|  _ \\ ",
            "| |   | |_) |  _| |  _| | |_) |  _| | |_) |",
            "| |___|  _ <| |___| |___|  __/| |___|  _ < ",
            " \\____|_| \\_\\_____|_____|_|   |_____|_| \\_\\",
            "===========================================",
            " Wellcome to creeper's workbench! Hello World!",
            " You can use this terminal to find and sort blogs.",
            ` github: ${this.github}`,
            ` blogs : ${this.blog}`,
            "",
        ];
        const fetch = CLEAR_ALL + lines.map(line => `  ${line}`).join("\r\n");
        return this.colorize("bright_magenta", "", fetch) + "\n\r"
    }


    public handle_terminal_data(data: string): string {
        const handler = this.handle_token[data]
        if (handler) return handler();
        this.buffer += data
        return data
    }

    private command_parsing(): string {
        if (this.buffer == "") return ""

        const args = this.buffer.split(" ")
        const command = args[0]

        let result: string = ""
        const handler = this.handle_command[command]
        if (handler) {
            result = handler(args)
        } else {
            result = "unknown command: " + command + "\n\r"
            result += this.standard_output("")
        }

        this.buffer = ""
        return result
    }
}
