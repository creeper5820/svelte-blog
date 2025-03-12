<script lang="ts">
    import Terminal from "$lib/terminal/terminal.svelte";
    import TopBar from "$lib/component/top-bar.svelte";
</script>

<main class="flex flex-col items-center">
    <TopBar />
    <h2 class="title">Hello World!</h2>
    <Terminal />
</main>

<style>
    .title {
        font-size: 5rem;
        font-weight: 800;
        font-family:
            JetBrains Mono NL,
            serif;

        background: linear-gradient(to bottom right, #39c5bb, #eebb88);
        background-clip: text;
        color: transparent;
        text-shadow: 2px 2px 8px rgba(0, 0, 0.1, 0.2);
    }

    @supports not (background-clip: text) {
        .title {
            color: #39c5bb;
        }
    }
</style>
