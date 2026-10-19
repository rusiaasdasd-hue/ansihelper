import { commands } from "@vendetta/commands";

// Map color names to ANSI escape codes
const ANSI_COLORS = {
    red: "[31m",
    green: "[32m",
    yellow: "[33m",
    blue: "[34m",
    magenta: "[35m",
    cyan: "[36m",
    white: "[37m"
};

const RESET_CODE = "[0m";

let unregisterCommand;

export default {
    onLoad: () => {
        // Register the /ansi command in Discord's chat input
        unregisterCommand = commands.registerCommand({
            name: "ansi",
            displayName: "ansi",
            description: "Formats text with ANSI color codes inside a code block",
            displayDescription: "Formats text with ANSI color codes inside a code block",
            options: [
                {
                    name: "text",
                    displayName: "text",
                    description: "The text you want to color",
                    type: 3, // String type
                    required: true
                },
                {
                    name: "color",
                    displayName: "color",
                    description: "Color choice (red, green, yellow, blue, magenta, cyan)",
                    type: 3, // String type
                    required: false,
                    choices: [
                        { name: "Red", value: "red" },
                        { name: "Green", value: "green" },
                        { name: "Yellow", value: "yellow" },
                        { name: "Blue", value: "blue" },
                        { name: "Magenta", value: "magenta" },
                        { name: "Cyan", value: "cyan" }
                    ]
                }
            ],
            // Function that executes when the command is sent
            execute: (args) => {
                const textArg = args.find(a => a.name === "text")?.value || "";
                const colorArg = args.find(a => a.name === "color")?.value || "red";

                const colorCode = ANSI_COLORS[colorArg] || ANSI_COLORS.red;

                // Format as an ANSI code block for Discord
                const formattedMessage = "```ansi\n" + colorCode + textArg + RESET_CODE + "\n```";

                return {
                    content: formattedMessage
                };
            }
        });
    },

    onUnload: () => {
        // Unregister the command when the plugin is disabled or uninstalled
        if (unregisterCommand) {
            unregisterCommand();
        }
    }
};