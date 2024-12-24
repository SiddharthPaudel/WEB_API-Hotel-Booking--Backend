const  express=require("express");
const connectDB = require("./config/db");
const app=express();
const   CustomerRouter=require("./routes/customerRoutes")
// const HotelRouter=require("./Routes/hotelRoutes");
// const BookingRouter=require("./Routes/bookingRoutes");


connectDB();
app.use(express.json());
app.use("/api/customers",CustomerRouter)
// app.use("/api/hotel",HotelRouter)
// app.use("/api/booking",BookingRouter)
const port=4000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})


