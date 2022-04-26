const rootStyles = window.getComputedStyle(document.documentElement);

  const coverWidth = rootStyles.getPropertyValue('product-cover-width-large')
  const coverAspect = rootStyles.getPropertyValue('product-cover-aspect-ratio')
  const coverHeight = coverWidth/coverAspect
  FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
)

FilePond.setOptions({
  stylePanelAspectRatio: 250 / 200,
  imageResizeTargetWidth: 200,
  imageResizeTargetHeight: 250
})

FilePond.parse(document.body);