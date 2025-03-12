<script lang="ts">
    const rectangle_width = 30;
    const rectangle_height = 20;

    const rectangles = [
        {
            width: `${rectangle_width}px`,
            height: `${rectangle_height}px`,
            color: "#ff7f50",
            borderRadius: "15px",
        },
        {
            width: `${rectangle_width}px`,
            height: `${rectangle_height}px`,
            color: "#6495ed",
            borderRadius: "15px",
        },
        {
            width: `${rectangle_width}px`,
            height: `${rectangle_height}px`,
            color: "#32cd32",
            borderRadius: "20px",
        },
        {
            width: `${rectangle_width}px`,
            height: `${rectangle_height}px`,
            color: "#ff69b4",
            borderRadius: "25px",
        },
    ];
</script>

<main class="flex flex-row w-full h-15">
    <div class="w-1/3 flex justify-start items-center">
        <div class="label-text">CREEPER</div>
    </div>
    <div class="w-1/3 flex justify-center items-center">Hello World</div>
    <div class="w-1/3 flex justify-end items-center">Hello World</div>

    <div class="container">
        {#each rectangles as rectangle}
            <div
                class="rectangle"
                style=" width: {rectangle.width}; height: {rectangle.height}; 
                background-color: {rectangle.color}; border-radius: {rectangle.borderRadius};"
            ></div>
        {/each}
    </div>
</main>

<style>
    main {
        background: #eeeeee;
    }

    .label-text {
        font-family: serif;
        font-weight: 600;
        font-size: 1.3rem;
        color: #b0c4de;
        padding-left: 20px;
    }

    .container {
        display: flex;
        gap: 10px;
        padding: 10px;
    }

    .rectangle {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: white;
    }
</style>
