module.exports = {
  assetsDir: 'static',

  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    disableHostCheck: true,
    port: 8080,
    public: '0.0.0.0:8080'
  },
  publicPath: "/"
}
