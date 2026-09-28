import connectDatabase from "../config/dbConfig.js"

const db = connectDatabase();


export const products = await db.collection("products")

