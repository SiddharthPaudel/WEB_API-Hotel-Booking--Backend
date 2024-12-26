const  express=require("express");
const connectDB = require("./config/db");
const app=express();
const   CustomerRouter=require("./routes/customerRoutes")
const HotelRouter=require("./routes/hotelRoutes");
const BookingRouter=require("./routes/bookingRoutes");
const AuthRouter=require("./routes/authRoutes")


connectDB();
app.use(express.json());
app.use("/api/customers",CustomerRouter)
app.use("/api/hotel",HotelRouter)
app.use("/api/booking",BookingRouter)
app.use("/api/auth",AuthRouter)
const port=9000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})


