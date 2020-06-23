module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: '/wp-content/themes/totonis/constructor/front/dist/',
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    }
}