const screenColor = document.getElementById("sColor");
var currentColor = "DARK"
const wrapper = document.getElementById("wrapper");
const inputDiv = document.getElementById("haha");
const btn = document.getElementById("btn");
const url = "https://api.github.com/users/";

function toLight(){
    document.getElementById("sun").classList.add("active");
        document.getElementById("moon").classList.add("active");
        document.getElementById("devdetect").classList.add("active");
        document.getElementById("currentMode").classList.add("active");
        document.getElementById("currentMode").textContent = "LIGHT";
        document.querySelector(".infoSection").classList.add("active");
        document.querySelector("#person-name").classList.add("active");
        document.querySelector("#date").classList.add("active");
        document.querySelector("#bio").classList.add("active");
        document.querySelector(".accountInfo").classList.add("active");
        document.getElementById("num1").classList.add("active");
        document.getElementById("num2").classList.add("active");
        document.getElementById("num3").classList.add("active");
        document.getElementById("tt1").classList.add("active");
        document.getElementById("tt2").classList.add("active");
        document.getElementById("tt3").classList.add("active");
}

function toDark(){
    document.getElementById("sun").classList.remove("active");
        document.getElementById("moon").classList.remove("active");
        document.getElementById("devdetect").classList.remove("active");
        document.getElementById("currentMode").classList.remove("active");
        document.getElementById("currentMode").textContent = "DARK";
        document.querySelector(".infoSection").classList.remove("active");
        document.querySelector("#person-name").classList.remove("active");
        document.querySelector("#date").classList.remove("active");
        document.querySelector("#bio").classList.remove("active");
        document.querySelector(".accountInfo").classList.remove("active");
        document.getElementById("num1").classList.remove("active");
        document.getElementById("num2").classList.remove("active");
        document.getElementById("num3").classList.remove("active");
        document.getElementById("tt1").classList.remove("active");
        document.getElementById("tt2").classList.remove("active");
        document.getElementById("tt3").classList.remove("active");
        document.getElementById("loc").classList.remove("active");
}


// light and dark mode
screenColor.addEventListener("click", ()=>{
    if(currentColor === "DARK"){
        wrapper.classList.add("active");
        currentColor = "LIGHT";
        inputDiv.classList.add("active");
        toLight();
    }

    else{
        wrapper.classList.remove("active");
        currentColor = "DARK";
        inputDiv.classList.remove("active");
        toDark();
    }
    
});

function updateData(data){
    // update name of person
    const pName = document.getElementById("person-name");
    pName.textContent = data["name"];

    // update date
    const date = document.getElementById("date");
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateSegment = data?.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;

    // update bio
    const bio = document.getElementById("bio");
    bio.textContent = data["bio"];

    // update image
    const photo = document.getElementById("photo");
    photo.src = data["avatar_url"];

    // update topInfo
    const repos = document.getElementById("num1");
    const followers = document.getElementById("num2");
    const following = document.getElementById("num3");
    followers.textContent = data["followers"];
    following.textContent = data["following"];
    repos.textContent = data["public_repos"];

    //update down info
    const loc = document.getElementById("loc");
    if (data["location"] == null) {
        loc.textContent = "Not Available";
    }
    else {
        loc.textContent = data["location"];
    }
    const linkPage = document.getElementById("linkedin");
    const twitter = document.getElementById("twitter");
    const company = document.getElementById("linkpage");

    if(data["twitter_username"] == null) {
        twitter.textContent = "Not Available";
    }
    else twitter.textContent = data["twitter_username"];

    if(data["blog"] == null){
        linkPage.innerHTML = "Not Available";
        linkPage.href = "/";
    }
    else {
        linkPage.href = data["blog"];
    }

    if(data["company"] == null){
        company.textContent = "Not Available";
    }
    else company.textContent = data["company"];
}

async function getUser(){
    var username = document.getElementById("input").value;
    const myUrl = url + username;
    try{
        const gitData = await fetch(myUrl);
        const data = await gitData.json();
        if (data["message"] === "Not Found") {
            throw new Error("Invalid Username!");
        }
        console.log(data);
        updateData(data);
    }
    catch(err){
        window.alert(err);
    }
}



btn.addEventListener("click", ()=>{
    getUser();
});

