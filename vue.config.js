const express = require("express");
const app = express();
var apiRoutes = express.Router();
app.use("/api", apiRoutes);

var appData = require("./src/data/data.json");
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

module.exports = {
  devServer: {
    before(app) {
      app.get("/api/seller", (req, res) => {
        res.json({
          errno: 0,
          data: seller
        });
      });

      app.get("/api/goods", (req, res) => {
        res.json({
          errno: 0,
          data: goods
        });
      });

      app.get("/api/ratings", (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        });
      });
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("components", "/src/components")
      .set("src", "/src")
      .set("common", "/src/common");
  }
};
