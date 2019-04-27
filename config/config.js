module.exports = {
    PORT: process.env.PORT || 8080,
    secrectKey: "Admin!123977463hao.phanthanh98@gmail.com",
    session : {
        key: 'user_sid',
        secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000
        }
    }
};