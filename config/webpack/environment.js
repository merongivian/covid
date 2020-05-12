const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery/src/jquery',
    jQuery: 'jquery/src/jquery',
    Popper: ['popper.js', 'default']
  })
)

// TODO: dont know what this do exactly, search for a better
// solution to run mapbox, this looks dangerous
environment.loaders.delete('nodeModules')

module.exports = environment
