module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    open: true,
    https: false, // https： {type: Booleam}
    hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:8085/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {

    loaderOptions: {

      postcss: {

        plugins: [

          require("postcss-pxtorem")({

            // 换算基数，

            rootValue: 16,

            //允许REM单位增长到的十进制数字,小数点后保留的位数

            unitPrecision: 5,

            propList: ["*"],

            //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值

            exclude: /(node_module)/,

            //（布尔值）允许在媒体查询中转换px。

            mediaQuery: false,

            //要忽略并保留为px的选择器，本项目我是用的element ui框架，所以忽略他

            selectorBlackList: [".el"],

            //设置要替换的最小像素值

            minPixelValue: 1,

          }),

        ],

      },

    },

  },
}
