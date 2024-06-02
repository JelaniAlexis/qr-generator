<script lang="ts">
    import '../app.css';
</script>

<slot />

<style lang="postcss">
    :global(body > div) {
        min-height: 100vh;
    }
</style>