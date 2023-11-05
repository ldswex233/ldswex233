export const LoaderComponent = createComponent(`
    <div class="loader" style="display: none;">
        <span class="text"></span>
        <div class="circle"></div>
    </div>
`);

LoaderComponent.importStyle('./src/components/loader/LoaderStyle.css');

