// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
const { DECIMAL } = require("sequelize/lib/data-types");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {
  static upvote(body, models) {
    return models.Category.create({
      category_id: body.category_id,
      category_name: body.category_name,
    }).then(() => {
      return Category.findOne({
        where: {
          id: body.category_id,
        },
      });
    });
  }
}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validator: DECIMAL,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
