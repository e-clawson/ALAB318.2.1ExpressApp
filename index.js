const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("./styles"));

const fs = require("fs");

app.engine("stuff", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);
   
    const rendered = content 
        .toString()
        .replaceAll("#title#", `${options.title}`)
        .replace("#content#", `${options.content}`)
        .replace("#info#", `${options.info}`);
    return callback(null, rendered);
    });
});
app.set("views", "./stuff");
app.set("view engine", "stuff");

app.get("/", (req,res) => {
    const options = {
        title: "hi!",
        content: "this is our thing!", 
        info: "yaaay"
        //add the a tag here to get us to index2
    };
    res.render("index1", options);
})

app.listen(port, () => {
  console.log(`server is listening on port: ${port}.`);  
});

