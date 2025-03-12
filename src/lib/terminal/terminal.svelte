<script lang="ts">
    import { onMount } from "svelte";
    import { ShellCore } from "./terminal";

    export let username: string = "creeper";

    let container: HTMLElement;
    let shell = new ShellCore(username);

    onMount(async () => {
        let xterm = await import("@xterm/xterm");
        let { FitAddon: XTermAddon } = await import("@xterm/addon-fit");

        let terminal = new xterm.Terminal({
            fontFamily:
                "JetBrains Mono, Mono, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            fontSize: 14,
            allowTransparency: true,
            lineHeight: 1,
            theme: {
                background: "#232136",
                cursor: "#faf4ed",
            },
        });
        let addon = new XTermAddon();

        terminal.loadAddon(addon);
        terminal.open(container);
        terminal.write(shell.fast_fetch());
        terminal.write(shell.standard_output(""));

        addon.fit();
        terminal.focus();

        terminal.onData((byte) => {
            let callback = shell.handle_terminal_data(byte);
            terminal.write(callback);
        });
    });
</script>

<main>
    <link rel="stylesheet" href="https://unpkg.com/xterm/css/xterm.css" />
    <div bind:this={container} class="terminal"></div>
</main>

<style lang="postcss">
    .terminal {
        border-radius: 0.5rem;
        border-color: #232136;
        border-width: 5px;
    }
</style>
