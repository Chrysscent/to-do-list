import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthList  = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const data = {
    day: dayList,
    month: monthList,
    dateSuffix: () => {
        if (new Date().getDate() % 10 === 1 && new Date().getDate() !== 11) {
            return "st";
        } else if (new Date().getDate() % 10 === 2 && new Date().getDate() !== 12) {
            return "nd";
        } else if (new Date().getDate() % 10 === 3 && new Date().getDate() !== 13) {
            return "rd";
        } else {
            return "th";
        }
    }
}

const tTasks = [];
const wTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        data: data,
        tTaskList: tTasks 
    });
});

app.get("/work", (req, res) => {
    res.render("work.ejs", { wTaskList: wTasks });
});

app.post("/", (req, res) => {
    tTasks.push(req.body["tTask"]);
    res.render("index.ejs", {
        data: data, 
        tTaskList: tTasks
    });
})

app.post("/work", (req, res) => {
    wTasks.push(req.body["wTask"]);
    res.render("work.ejs", { wTaskList: wTasks })
})

app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});