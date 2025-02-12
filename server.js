const  express=require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app=express();
// Enable CORS for all routes
const   CustomerRouter=require("./routes/customerRoutes")
const HotelRouter=require("./routes/hotelRoutes");
const BookingRouter=require("./routes/bookingRoutes");
const AuthRouter=require("./routes/authRoutes");
const contactRouter=require("./routes/contactRoutes");
const path=require('path');
const paymentRoutes = require("./routes/paymentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");






connectDB();
app.use(cors()); 
app.use(express.json());
app.use("/api/customers",CustomerRouter)
app.use("/api/hotels",HotelRouter)
app.use("/api/booking",BookingRouter)
app.use("/api/auth",AuthRouter)
app.use('/hotel_images', express.static(path.join(__dirname, 'hotel_images')));
app.use("/api/contact",contactRouter)

// Use Routes
app.use("/api", dashboardRoutes);
const port=5000;
app.use("/api/payment", paymentRoutes);
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})


