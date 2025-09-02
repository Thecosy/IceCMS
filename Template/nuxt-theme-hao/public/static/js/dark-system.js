window.addEventListener("load", () => {
    console.log("Use System Dark Mode")
    let media = window.matchMedia('(prefers-color-scheme: dark)');
    vditorRender.setDarkMode(media.matches)
})