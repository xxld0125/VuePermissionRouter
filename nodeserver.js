const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.get("/routes", (req, res) => {
  console.error("req.query.id", req.query.id === "1000");
  if (req.query.id === "1000") {
    res.json({
      data: [
        {
          path: "/path1",
          name: "PageOne",
          component: "/page1.vue",
        },
        {
          path: "/path2",
          name: "PageTwo",
          component: "/page2.vue",
        },
      ],
    });
  } else if (req.query.id === "1001") {
    res.json({
      data: [
        {
          path: "/path1",
          name: "PageOne",
          component: "/page1.vue",
        },
        {
          path: "/path2",
          name: "PageTwo",
          component: "/page2.vue",
        },
        {
          path: "/path3",
          name: "PageThree",
          component: "/page3.vue",
        },
        {
          path: "/path4",
          name: "PageFour",
          component: "/page4.vue",
        },
      ],
    });
  }
});

app.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (username === "user" && password === "12345") {
    res.json({
      id: 1000,
      token: "adadasdasda",
    });
  } else if (username === "admin" && password === "12345") {
    res.json({
      id: 1001,
      token: "adadasdasda",
    });
  } else {
    res.json({
      message: "400",
    });
  }
});

app.listen(3000, (err) => {
  if (!err) console.log("服务已启动 端口号3000");
});
