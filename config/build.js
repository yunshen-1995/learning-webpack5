const path = require("path");
module.exports = {
  // 可以为相对路径或绝对路径
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    // 必须为绝对路径
    path: path.resolve(__dirname, '../dist'),
    // 输出文件名
    filename: "main.js",

  },
  module:{
    rules: [
      // Rule对象
      {
        // 处理css
        test: /\.css$/,
        // 简写
        // loader: 'css-loader',
        use: [
          // Use对象,从后往前，从右往左
          // 简写
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 后方需要重新loader的数量
              importLoaders: 1,
              // 启用commonjs语法
              esModule: false
            }
          },
          // 单独抽离文件
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions:{
          //       plugins:[
          //         // require('autoprefixer'),
          //         require('postcss-preset-env') // 包含autoprefixer
          //       ]
          //     }
          //   }
          // }
          'postcss-loader',
        ]
      },
      {
        // 处理less
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 后方需要重新loader的数量
              importLoaders: 2,
              // 启用commonjs语法
              esModule: false
            }
          },
          'postcss-loader',
          'less-loader',
        ]
      },
      {
        // 处理图片
        test: /\.(jpe?g|png|gif)$/,
        // webpack5配置
        // type: 'asset/resource', // file-loader

        // asset/resource 配置
        // generator:{
        //   filename: '[name].[hash:6][ext]',
        //   // 拼接路径
        //   publicPath: './dist/img/',
        //   // 输出路径
        //   outputPath: 'img',
        // }

        // type: 'asset/inline', // url-loader

        type: 'asset', // 自动判断大小打包
        // asset配置
        generator:{
          filename: '[name].[hash:6][ext]',
          // 拼接路径
          publicPath: './dist/img/',
          // 输出路径
          outputPath: 'img',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 4kb
          }
        }

        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8 * 1024,
        //       // 拼接路径
        //       publicPath: './dist/img',
        //       // 输出路径
        //       outputPath: 'img',
        //       // 文件名称占位符
        //       name: '[name].[hash:6].[ext]'
        //     }
        //   }
        // ]
      },
      {
        test: /\.(ttf|woff|woff2|otf)$/,
        type: 'asset/resource',
        generator: {
          outputPath: 'font/',
          filename: '[name].[hash:6][ext]',
          publicPath: './dist/font/'
        }
      }
    ]
  }
}
