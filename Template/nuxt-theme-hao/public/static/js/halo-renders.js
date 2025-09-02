vditorRender.addExternal((conf) => {
    document.querySelectorAll(".language-halo").forEach(el => {
        el.outerHTML = HaloJs.renderHalo(
            el.textContent,
            "/plugins/vditor-mde/assets/static/halo-renders"
        );
    })
})