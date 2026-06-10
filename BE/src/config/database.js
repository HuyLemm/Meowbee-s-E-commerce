import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: "postgres",
    logging: false,
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      "✅ Database connected successfully"
    );

    return true;
  } catch (error) {
    console.error(
      "❌ Database connection failed"
    );

    console.error(error.message);

    return false;
  }
};

export default sequelize;